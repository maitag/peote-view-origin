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

import haxe.ds.Vector.Vector;
import lime.gl.GL;
import lime.gl.GLProgram;
import lime.gl.GLShader;
import lime.gl.GLUniformLocation;

class Program
{
	public var activeProgram:Array<ActiveProgram>;
	public var fragment_shader_url:String = "";
	
	public var glProgram:GLProgram = null;
	public var uniforms:Vector<GLUniformLocation>;
	
	public static var aVertexPosStart:Int = -1; // -1 -> uninitialized
	public static var aVertexPosEnd:Int;
	public static var aTime:Int;
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
		activeProgram = new Array<ActiveProgram>();
	}
	
	public inline function compile(fragmentShaderSrc:String, vertexShaderSrc:String, onerror:String->Void):Void
	{
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
				if (aVertexPosStart == -1)
				{
					aVertexPosStart = GL.getAttribLocation(glProgram, "aVertexPosStart");
					aVertexPosEnd   = GL.getAttribLocation(glProgram, "aVertexPosEnd");
					aTime           = GL.getAttribLocation(glProgram, "aTime");
					aTexCoord       = GL.getAttribLocation(glProgram, "aTexCoord");
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