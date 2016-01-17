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

package de.peote.view;

import de.peote.view.displaylist.*;
import de.peote.view.element.*;

import haxe.ds.Vector;
import haxe.ds.IntMap;

import lime.Assets;

class ProgramCache
{
	public var fragmentShaderSrc:Vector<String>;
	public var vertexShaderSrc:Vector<String>;
	public var program:Vector<IntMap<Program>>;
	
	public var defaultProgram:IntMap<Program>;
	public var attr:IntMap<Vector<Int>> = null;
	
	public inline function new(max_programs:Int)
	{
		fragmentShaderSrc = new Vector<String>(max_programs);
		vertexShaderSrc = new Vector<String>(max_programs);
		
		program = new Vector<IntMap<Program>>(max_programs);
		for (i in 0...max_programs) program.set(i, new IntMap<Program>() );
		
		defaultProgram = new IntMap<Program>();
		attr = new IntMap<Vector<Int>>();
	}
	
	public inline function onerror(msg:String):Void { trace(msg); }
	
	public inline function addDisplaylist(type:Int, elemBuff:I_ElementBuffer):Void
	{
		trace("addDisplaylist:" + type);
		if ( ! defaultProgram.exists(type) )
		{
			var p = new Program();
			p.compile( elemBuff, type,
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
			if (fs != null || vs != null)
			{
				p = new Program();
				if (fs == null ) fs = elemBuff.getDefaultFragmentShaderSrc();
				if (vs == null ) vs = elemBuff.getDefaultVertexShaderSrc();

				p.compile(elemBuff, type, fs, vs, onerror);
			}
			else
			{
				p = new Program(defaultProgram.get(type));
			}
			program.get(nr).set(type, p );
		}
		return(p);
	}

	public inline function setShaderSrc(nr:Int, fs:String, vs:String):Void
	{
		if (fs != '' || vs != '')
		{
			var pmap:IntMap<Program> = program.get(nr);
			var default_fs:String;
			var default_vs:String;
			
			for (type in pmap.keys())
			{
				if (type & DType.ANIM != 0) 
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
				
				if (fs == '' )
					pmap.get(type).compile(null, type, default_fs, vs, onerror);
				else if (vs == '' )
					pmap.get(type).compile(null, type, fs, default_vs, onerror);
				else
					pmap.get(type).compile(null, type, fs, vs, onerror);
				
			}
			
			if (fs != '' ) fragmentShaderSrc.set(nr, fs);
			if (vs != '' ) vertexShaderSrc.set(nr, vs);	
		}
	}

	public inline function loadShaderSrc(nr:Int, fsUrl:String, vsUrl:String):Void
	{
		//var fsSrc:String = (fsUrl == '') ? Shader.default_fsSrc : Assets.getText(fsUrl);
		//var vsSrc:String = (vsUrl == '') ? Shader.default_vsSrc : Assets.getText(vsUrl);
		//var fsSrc:String = (fsUrl == '') ? Shader.default_fsSrc :  Http.requestUrl(fsUrl);
		//var vsSrc:String = (vsUrl == '') ? Shader.default_vsSrc : Http.requestUrl(vsUrl);

		// TODO: doesnt work yet with assets.gettext on html5 target (with http.requestUrl sandbox prbl. for easy testing)
		var fsSrc:String = '';
		if (fsUrl != '') 
		{
			#if js
			var req = js.Browser.createXMLHttpRequest();
			req.open('GET', fsUrl, false);
			req.send();
			fsSrc = req.responseText;
			#else
			fsSrc = Assets.getText(fsUrl);
			//fsSrc = Assets.getBytes(fsUrl).asString(); // TODO: getText dont work with windows-target
			#end
		}
		var vsSrc:String = '';
		if (vsUrl != '') 
		{
			#if js
			var req = js.Browser.createXMLHttpRequest();
			req.open('GET', vsUrl, false);
			req.send();
			vsSrc = req.responseText;
			#else
			vsSrc = Assets.getText(vsUrl);
			//vsSrc = Assets.getBytes(vsUrl).asString(); // TODO: getText dont work with windows-target;
			#end
		}
		
		setShaderSrc( nr, fsSrc, vsSrc);
	}


	
}