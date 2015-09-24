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

import de.peote.view.displaylist.Displaylist;
import de.peote.view.displaylist.DType;
import de.peote.view.element.I_ElementBuffer;
import de.peote.view.texture.TextureCache;

import haxe.ds.Vector;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLProgram;
import lime.graphics.opengl.GLShader;
import lime.graphics.opengl.GLUniformLocation;

class Program
{
	public static inline var aPOSITION:Int  = 0;
	public static inline var aTEXTCOORD:Int = 1;
	public static inline var aZINDEX:Int    = 2;
	public static inline var aRGBA:Int      = 3;
	public static inline var aRGBA_END:Int  = 4;
	public static inline var aRotation:Int  = 5;
	public static inline var aPivot:Int     = 6;
	public static inline var aTIME:Int      = 7;
	
	public static inline var uMODELVIEWMATRIX:Int = 0;
	public static inline var uPROJECTIONMATRIX:Int = 1;
	public static inline var uIMAGE:Int = 2;
	public static inline var uMOUSE:Int = 3;
	public static inline var uRESOLUTION:Int = 4;
	public static inline var uTIME:Int = 5;
	public static inline var uZOOM:Int = 6;
	public static inline var uDELTA:Int = 7;
	
	public static var rComment:EReg = new EReg("//.*?$","gm");
	public static var rNewline:EReg = new EReg("\r?\n", "g");
	public static var rSpaces: EReg = new EReg("\t\t+", "g");
	
	//public static var rZINDEXstart: EReg = new EReg("#if_ZINDEX(.*?)#else_ZINDEX(.*?)#end_ZINDEX","ig");
	public static var rZINDEXstart: EReg = new EReg("#else_ZINDEX(.*?)#end_ZINDEX","ig");
	public static var rZINDEXend:   EReg = new EReg("#if_ZINDEX(.*?)#end_ZINDEX","ig");
	
	public static var rRGBAstart:   EReg = new EReg("#else_RGBA(.*?)#end_RGBA","ig");
	public static var rRGBAend:     EReg = new EReg("#if_RGBA(.*?)#end_RGBA","ig");
	
	public static var rROTATIONstart:   EReg = new EReg("#else_ROTATION(.*?)#end_ROTATION","ig");
	public static var rROTATIONend:     EReg = new EReg("#if_ROTATION(.*?)#end_ROTATION","ig");
	
	
	public static var rMAX_TEXTURE_SIZE:EReg = new EReg("#MAX_TEXTURE_SIZE","g");
		

	public var glProgram:GLProgram = null;
	public var uniforms:Vector<GLUniformLocation>;
	
	// -----------------------------------------------------------------------

	public inline function new(defaultProgram:Program = null):Void
	{
		if (defaultProgram != null)
		{
			this.glProgram = defaultProgram.glProgram;
			this.uniforms = defaultProgram.uniforms;
		}
	}
	
	public inline function parseType(type:Int, s:String):String
	{
		// regexp shader parsing
		s = rComment.replace(s, "");
		s = rNewline.replace(s, "");
		s = rSpaces.replace(s, "");
		
		if (type & DType.ZINDEX != 0) {
			//s = rZINDEXstart.replace(s, "$1"); s = rZINDEXend.replace(s, "$1");
			s = rZINDEXstart.replace(s, "#end_ZINDEX"); s = rZINDEXend.replace(s, "$1");
		} else {
			//s = rZINDEXstart.replace(s, "$2"); s = rZINDEXend.replace(s, "");
			s = rZINDEXstart.replace(s, "#end_ZINDEX$1"); s = rZINDEXend.replace(s, "");
		}
		
		if (type & DType.RGBA != 0) {
			s = rRGBAstart.replace(s, "#end_RGBA"); s = rRGBAend.replace(s, "$1");
		} else {
			s = rRGBAstart.replace(s, "#end_RGBA$1"); s = rRGBAend.replace(s, "");
		}
		
		if (type & DType.ROTATION != 0) {
			s = rROTATIONstart.replace(s, "#end_ROTATION"); s = rROTATIONend.replace(s, "$1");
		} else {
			s = rROTATIONstart.replace(s, "#end_ROTATION$1"); s = rROTATIONend.replace(s, "");
		}
		
		// replace template variables
		s = rMAX_TEXTURE_SIZE.replace(s, TextureCache.max_texture_size+".0");
		
		return s;
	}
	
	public inline function compile(elemBuff:I_ElementBuffer, type:Int,
								fragmentShaderSrc:String, vertexShaderSrc:String,
								onerror:String->Void):Void
	{
		fragmentShaderSrc = parseType(type, fragmentShaderSrc);
		vertexShaderSrc = parseType(type, vertexShaderSrc);
		
		// reformat to debug
		var r:EReg = new EReg(";", "g");
		trace("VERTEXSHADER:\n"+r.replace(vertexShaderSrc, ";\n"));
		trace("FRAGMENTSHADER:\n"+r.replace(fragmentShaderSrc, ";\n"));
		
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
				var name:String;
				
				// set attributes
				if (elemBuff != null)
				{	if (elemBuff.attr == null)
					{
						trace( "ANZAHL " + GL.getProgramParameter(glProgram, GL.ACTIVE_ATTRIBUTES) );
						elemBuff.attr = new Vector<Int>(GL.getProgramParameter(glProgram, GL.ACTIVE_ATTRIBUTES));
						for (i in 0 ... GL.getProgramParameter(glProgram, GL.ACTIVE_ATTRIBUTES))
						{	
							name = GL.getActiveAttrib(glProgram, i).name;
							trace( name + ":" + GL.getAttribLocation(glProgram, name) );
							switch (name)
							{
								case "aPosition":	elemBuff.attr.set(aPOSITION,  GL.getAttribLocation(glProgram, name) );
								case "aTexCoord":	elemBuff.attr.set(aTEXTCOORD, GL.getAttribLocation(glProgram, name) );
								case "aZindex":		elemBuff.attr.set(aZINDEX,    GL.getAttribLocation(glProgram, name) );
								case "aRGBA":		elemBuff.attr.set(aRGBA,      GL.getAttribLocation(glProgram, name) );
								case "aRGBA_END":	elemBuff.attr.set(aRGBA_END,  GL.getAttribLocation(glProgram, name) );
								case "aRotation":	elemBuff.attr.set(aRotation,  GL.getAttribLocation(glProgram, name) );
								case "aPivot":		elemBuff.attr.set(aPivot,     GL.getAttribLocation(glProgram, name) );
								case "aTime":		elemBuff.attr.set(aTIME,      GL.getAttribLocation(glProgram, name) );
							}
						}
						
					}
				}
				// set uniforms
				uniforms = new Vector<GLUniformLocation>(GL.getProgramParameter(glProgram, GL.ACTIVE_UNIFORMS));
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