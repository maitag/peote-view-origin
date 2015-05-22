/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o        o      o   
 *      o-o-o  o-o   o    o    o-o  
 *     o      o     (_\    o      o 
 *    o      o-o     |\     o    o-o
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

import de.peote.view.texture.TextureCache;
import haxe.ds.Vector.Vector;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLProgram;
import lime.graphics.opengl.GLShader;
import lime.graphics.opengl.GLUniformLocation;

class Program
{
	
	
	//public var fragment_shader_url:String = "";
	
	public var glProgram:GLProgram = null;
	public var uniforms:Vector<GLUniformLocation>;
	
	public static var aPosition:Int = -1; // -1 -> uninitialized
	public static var aTime:Int;
	public static var aZindex:Int;
	public static var aTexCoord:Int;
	
	public static inline var uMODELVIEWMATRIX:Int = 0;
	public static inline var uPROJECTIONMATRIX:Int = 1;
	public static inline var uIMAGE:Int = 2;
	public static inline var uMOUSE:Int = 3;
	public static inline var uRESOLUTION:Int = 4;
	public static inline var uTIME:Int = 5;
	public static inline var uZOOM:Int = 6;
	public static inline var uDELTA:Int = 7;
	
	public inline function new(defaultProgram:Program = null):Void
	{
		if (defaultProgram != null)
		{
			this.glProgram = defaultProgram.glProgram;
			this.uniforms = defaultProgram.uniforms;
		}
		
		// CHECK
		// activeProgramArray = new Array<ActiveProgram>();
	}
	
	public inline function compile(fragmentShaderSrc:String, vertexShaderSrc:String, onerror:String->Void):Void
	{
		// testing regexp shader parsing
		var r = new EReg("//.*?$","gm");
		vertexShaderSrc = r.replace(vertexShaderSrc, "");
		r = new EReg("\r?\n","g");
		vertexShaderSrc = r.replace(vertexShaderSrc, "");
		r = new EReg("\t\t+","g");
		vertexShaderSrc = r.replace(vertexShaderSrc, "");
		
		// TODO ::: Displaylist->Element specific PROGRAM ^~
		//if (type & Displaylist.RGBA ==0) //RGBA
		if (false) //RGBA
		{
			r = new EReg("#if_RGBA(.*?)#else_RGBA(.*?)#end_RGBA","ig");
			vertexShaderSrc = r.replace(vertexShaderSrc, "$1");
			r = new EReg("#if_RGBA(.*?)#end_RGBA","ig");
			vertexShaderSrc = r.replace(vertexShaderSrc, "$1");
		} 
		else
		{
			r = new EReg("#if_RGBA(.*?)#else_RGBA(.*?)#end_RGBA","ig");
			vertexShaderSrc = r.replace(vertexShaderSrc, "$2");
			r = new EReg("#if_RGBA(.*?)#end_RGBA","ig");
			vertexShaderSrc = r.replace(vertexShaderSrc, "");
		}
		
		// reformat to test
		r = new EReg(";","g");
		vertexShaderSrc = r.replace(vertexShaderSrc, ";\n");

		
		// replace template variables
		r = new EReg("%MAX_TEXTURE_SIZE%","g");
		vertexShaderSrc = r.replace(vertexShaderSrc, TextureCache.max_texture_size+".0");
		fragmentShaderSrc = r.replace(fragmentShaderSrc, TextureCache.max_texture_size+".0");

		//trace(vertexShaderSrc);
		//trace(fragmentShaderSrc);
		
		// -----------------------------------------------------------------------
		
		var fs = GL.createShader(GL.FRAGMENT_SHADER);
		GL.shaderSource(fs, fragmentShaderSrc);
		GL.compileShader(fs);
		
		var vs = GL.createShader(GL.VERTEX_SHADER);
		GL.shaderSource(vs, vertexShaderSrc);
		GL.compileShader(vs);
		
		if      (GL.getShaderParameter(fs, GL.COMPILE_STATUS) == 0) onerror("ERROR fragmentShader: " + GL.getShaderInfoLog(fs));
		else if (GL.getShaderParameter(vs, GL.COMPILE_STATUS) == 0) onerror("ERROR vertexShader: " + GL.getShaderInfoLog(vs));
		else
		{
			glProgram = GL.createProgram();
			GL.attachShader(glProgram, vs);
			GL.attachShader(glProgram, fs);
			
			GL.deleteShader(vs);
			GL.deleteShader(fs);
			GL.linkProgram(glProgram);
			
			if (GL.getProgramParameter(glProgram, GL.LINK_STATUS) == 0)
			{
				onerror(GL.getProgramInfoLog(glProgram)
					+ "VALIDATE_STATUS: " + GL.getProgramParameter(glProgram, GL.VALIDATE_STATUS)
					+ "ERROR: " + GL.getError()
				);
			}
			else
			{
				if (aPosition == -1)
				{
					aPosition = GL.getAttribLocation(glProgram, "aPosition");
					aTime     = GL.getAttribLocation(glProgram, "aTime");
					aZindex   = GL.getAttribLocation(glProgram, "aZindex");
					aTexCoord = GL.getAttribLocation(glProgram, "aTexCoord");
				}
				// set uniforms
				uniforms = new Vector<GLUniformLocation>(GL.getProgramParameter(glProgram, GL.ACTIVE_UNIFORMS));
				var name:String;
				for (i in 0 ... GL.getProgramParameter(glProgram, GL.ACTIVE_UNIFORMS))
				{	
					name = GL.getActiveUniform(glProgram, i).name;
					//trace( name + ":" + (GL.getActiveUniform(glProgram, i).type == GL.FLOAT_VEC2) );
					switch (name)
					{
						case "uModelViewMatrix":	uniforms.set(uMODELVIEWMATRIX,  GL.getUniformLocation(glProgram, name) );
						case "uProjectionMatrix":	uniforms.set(uPROJECTIONMATRIX, GL.getUniformLocation(glProgram, name) );
						case "uImage":				uniforms.set(uIMAGE,            GL.getUniformLocation(glProgram, name) );
						case "uMouse":				uniforms.set(uMOUSE,            GL.getUniformLocation(glProgram, name) );
						case "uResolution":			uniforms.set(uRESOLUTION,       GL.getUniformLocation(glProgram, name) );
						case "uTime":				uniforms.set(uTIME,             GL.getUniformLocation(glProgram, name) );
						case "uZoom":				uniforms.set(uZOOM,             GL.getUniformLocation(glProgram, name) );
						case "uDelta":				uniforms.set(uDELTA,            GL.getUniformLocation(glProgram, name) );
					}
				}
			}
		}
	}

}