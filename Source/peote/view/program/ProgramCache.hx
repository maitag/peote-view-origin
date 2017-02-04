/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o        o    o-o   
 *     o      o     \|/    o      o  
 *    o      o-o  ~ <o> ~   o    o-o 
 * 
 * PEOTE VIEW - haxe 2D OpenGL Render Library
 * Copyright (c) 2014 Sylvio Sell, http://maitag.de
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package peote.view.program;

import peote.view.displaylist.DisplaylistType;
import peote.view.element.ElementAnimBuffer;
import peote.view.element.ElementSimpleBuffer;
import peote.view.element.I_ElementBuffer;
import peote.view.program.Program;
import peote.view.texture.Texture;
import peote.view.program.ProgramParam;
import peote.view.ActiveTextures;
import peote.view.Uniforms;

import haxe.ds.Vector;
import haxe.ds.IntMap;
import haxe.ds.StringMap;

import lime.Assets;

class ProgramCache
{
	public var fragmentShaderSrc:Vector<String>;
	public var vertexShaderSrc:Vector<String>;
	
	public var program:Vector<IntMap<Program>>;
	public var programTextures:Vector<ActiveTextures>;
	public var programUniforms:Vector<Uniforms>;
	
	//public var defaultprogramTexture:ActiveTextures;
	
	public var defaultProgram:IntMap<Program>;
	public var attr:IntMap<Vector<Int>> = null;
	
	public var textures:Vector<Texture>;
	
	public inline function new(max_programs:Int, textures:Vector<Texture>)
	{
		this.textures = textures;
		
		fragmentShaderSrc = new Vector<String>(max_programs);
		vertexShaderSrc = new Vector<String>(max_programs);
		
		program = new Vector<IntMap<Program>>(max_programs);
		programTextures = new Vector<ActiveTextures>(max_programs); // array of texture-numbers to use
		programUniforms = new Vector<Uniforms>(max_programs); // array of custom Uniforms

		for (i in 0...max_programs) {
			program.set(i, new IntMap<Program>() );
			programTextures.set(i, new ActiveTextures() );
		}
		
		// TODO: better set default-program together with avtivetextures to some slot (last one)
		//defaultprogramTexture = new ActiveTextures();
		//defaultprogramTexture.texture.push( textures.get(0) ); // TODO TODO (default texture?)
		
		defaultProgram = new IntMap<Program>();
		attr = new IntMap<Vector<Int>>();
	}
	
	public inline function clear(nr:Int):Void
	{
		var pmap:IntMap<Program> = program.get(nr);
		for (type in pmap.keys())
		{
			pmap.get(type).clear();
			pmap.set(type, null);
		}
		programTextures.get(nr).clear();
	}
	
	public inline function onerror(msg:String):Void { trace(msg); }
	
	public inline function addDisplaylist(type:Int, elemBuff:I_ElementBuffer):Void
	{
		trace("addDisplaylist:" + type);
		if ( ! defaultProgram.exists(type) )
		{
			var p = new Program();
			p.compile( elemBuff, type, null, //defaultprogramTexture, // TODO: fuer alles defaultS
						null,  // no custom uniform vars
						elemBuff.getDefaultFragmentShaderSrc(),
						elemBuff.getDefaultVertexShaderSrc(),
						onerror
			);
			defaultProgram.set(type, p);
			attr.set(type, elemBuff.attr);
		} 
		else elemBuff.attr = attr.get(type);
	}

	public inline function delDisplaylist(type:Int):Void
	{
		// TODO: clear
	}

	public inline function getProgram(nr:Int, type:Int, elemBuff:I_ElementBuffer):Program
	{	
		var p:Program = program.get(nr).get(type);
		if (p == null)
		{
			var fs:String = fragmentShaderSrc.get(nr);
			var vs:String = vertexShaderSrc.get(nr);
			var textureUnits:ActiveTextures = programTextures.get(nr);
			
			if (fs != null || vs != null || textureUnits.texture.length > 0 )
			{
				p = new Program();
				if (fs == null ) fs = elemBuff.getDefaultFragmentShaderSrc();
				if (vs == null ) vs = elemBuff.getDefaultVertexShaderSrc();

				p.compile(elemBuff, type, textureUnits, programUniforms.get(nr), fs, vs, onerror);
			}
			else
			{
				p = new Program(defaultProgram.get(type));
			}
			
			program.get(nr).set(type, p );
		}
		return(p);
	}

	public inline function setProgram(param:ProgramParam):Void
	{
		// assign Textures
		var textureUnits:ActiveTextures = programTextures.get(param.program);
		if (param.texture != null || param.textures != null)
		{
			if (param.textures == null) param.textures = new Array<Int>();
			if (param.texture != null) param.textures.push( param.texture);
			
			var len:Int = Math.floor(Math.max(param.textures.length, textureUnits.texture.length ));
			for (i in 0...len )
			{
				if (i >= param.textures.length)
				{
					textureUnits.texture.pop();
				}
				else
				{
					var t = textures.get( param.textures[i] );
					if (t != null)
					{
						if (i >= textureUnits.texture.length) textureUnits.texture.push( t );
						else textureUnits.texture[i] = t ;
					}
					else
					{
						trace("ERROR: texture "+param.textures[i]+" is not defined");
					}
				}
			}
			// TODO:  re compile shader if changed
		}
		
		// set Shaders if changed
		if (param.fshaderSrc != null || param.vshaderSrc != null)
		{
			var pmap:IntMap<Program> = program.get(param.program);
			var default_fs:String;
			var default_vs:String;
			
			// custom uniform vars
			var customUniforms:Uniforms = null;
			if (param.vars != null)	
			{	
				customUniforms = new Uniforms(param.vars);
				programUniforms.set(param.program, customUniforms );
			}
			
			for (type in pmap.keys())
			{
				if (type & DisplaylistType.ANIM != 0) 
				{
					default_fs = ElementAnimBuffer.defaultFragmentShaderSrc;
					default_vs = ElementAnimBuffer.defaultVertexShaderSrc;
				}
				//else if (type & Dtype.??? != 0) 
				else
				{
					default_fs = ElementSimpleBuffer.defaultFragmentShaderSrc;
					default_vs = ElementSimpleBuffer.defaultVertexShaderSrc;
				}
				trace("setShaderSrc:" + type);
				
				if (param.fshaderSrc == '' )
					pmap.get(type).compile(null, type, textureUnits, customUniforms, default_fs, param.vshaderSrc, onerror);
				else if (param.vshaderSrc == '' )
					pmap.get(type).compile(null, type, textureUnits, customUniforms, param.fshaderSrc, default_vs, onerror);
				else
					pmap.get(type).compile(null, type, textureUnits, customUniforms, param.fshaderSrc, param.vshaderSrc, onerror);
				
			}
			
			if (param.fshaderSrc != '' ) fragmentShaderSrc.set(param.program, param.fshaderSrc);
			if (param.vshaderSrc != '' ) vertexShaderSrc.set(param.program, param.vshaderSrc);	
		}
	}

	public inline function loadShader(url:String):String
	{
		var shadersrc:String = '';
		#if js
		var req = js.Browser.createXMLHttpRequest();
		req.open('GET', url, false);
		req.send();
		shadersrc = req.responseText;
		#else
		shadersrc = Assets.getText(url);
		//shadersrc = Assets.getBytes(url).asString(); // TODO: getText dont work with windows-target
		#end
		return(shadersrc);
	}


	
}