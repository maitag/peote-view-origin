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

package peote.view.program;

import peote.view.displaylist.DisplaylistType;
import peote.view.element.I_ElementBuffer;
import lime.graphics.opengl.GLActiveInfo;
import peote.view.ActiveTextures;
import peote.view.Uniforms;

import haxe.ds.Vector;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLProgram;
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
	public static inline var aELEMENT:Int   = 8;
	
	public static inline var uMOUSE:Int = 0;
	public static inline var uRESOLUTION:Int = 1;
	public static inline var uTIME:Int = 2;
	public static inline var uZOOM:Int = 3;
	public static inline var uDELTA:Int = 4;
	public static var uTEXTURE:Array<Int> = [5,6,7,8,9,10,11,12];
	
	
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
	
	public static var rPICKINGstart:   EReg = new EReg("#else_PICKING(.*?)#end_PICKING","ig");
	public static var rPICKINGend:     EReg = new EReg("#if_PICKING(.*?)#end_PICKING","ig");
	
	// to parse Texture-Slots
	public static var rMAX_TEXTURE0:	EReg = new EReg("#MAX_TEXTURE0", "g");
	public static var rTEXTURE0start:   EReg = new EReg("#else_TEXTURE0(.*?)#end_TEXTURE0","ig");
	public static var rTEXTURE0end:     EReg = new EReg("#if_TEXTURE0(.*?)#end_TEXTURE0", "ig");
	
	public static var rMAX_TEXTURE1:	EReg = new EReg("#MAX_TEXTURE1","g");
	public static var rTEXTURE1start:   EReg = new EReg("#else_TEXTURE1(.*?)#end_TEXTURE1","ig");
	public static var rTEXTURE1end:     EReg = new EReg("#if_TEXTURE1(.*?)#end_TEXTURE1","ig");

	
	//public static var rSOMETHING_TO_REPLACE:EReg = new EReg("#SOMETHING_TO_REPLACE","g");

	public var glProgram:GLProgram = null;
	public var uniforms:Vector<GLUniformLocation>;
	
	public var customUniforms:Uniforms;
	
	// -----------------------------------------------------------------------

	public inline function new(defaultProgram:Program = null):Void
	{
		if (defaultProgram != null)
		{
			this.glProgram = defaultProgram.glProgram;
			this.uniforms = defaultProgram.uniforms;
		}
	}
	
	public inline function clear():Void
	{
		uniforms = null;
		GL.deleteProgram(glProgram);
		glProgram = null;
	}
	
	public inline function parseType(type:Int, textureUnits:ActiveTextures, s:String):String
	{
		// regexp shader parsing
		s = rComment.replace(s, "");
		s = rNewline.replace(s, "");
		s = rSpaces.replace(s, "");
		
		if (type & DisplaylistType.ZINDEX != 0) {
			//s = rZINDEXstart.replace(s, "$1"); s = rZINDEXend.replace(s, "$1");
			s = rZINDEXstart.replace(s, "#end_ZINDEX"); s = rZINDEXend.replace(s, "$1");
		} else {
			//s = rZINDEXstart.replace(s, "$2"); s = rZINDEXend.replace(s, "");
			s = rZINDEXstart.replace(s, "#end_ZINDEX$1"); s = rZINDEXend.replace(s, "");
		}
		
		if (type & DisplaylistType.RGBA != 0) {
			s = rRGBAstart.replace(s, "#end_RGBA"); s = rRGBAend.replace(s, "$1");
		} else {
			s = rRGBAstart.replace(s, "#end_RGBA$1"); s = rRGBAend.replace(s, "");
		}
		
		if (type & DisplaylistType.ROTATION != 0) {
			s = rROTATIONstart.replace(s, "#end_ROTATION"); s = rROTATIONend.replace(s, "$1");
		} else {
			s = rROTATIONstart.replace(s, "#end_ROTATION$1"); s = rROTATIONend.replace(s, "");
		}
		
		if (type & DisplaylistType.PICKING != 0) {
			s = rPICKINGstart.replace(s, "#end_PICKING"); s = rPICKINGend.replace(s, "$1");
		} else {
			s = rPICKINGstart.replace(s, "#end_PICKING$1"); s = rPICKINGend.replace(s, "");
		}
		
		// used Texture-Slots
		var slots:Int = 0;
		if (textureUnits != null) slots = textureUnits.texture.length;
		
		if (slots > 0) {
			s = rMAX_TEXTURE0.replace(s, "vec2(" + textureUnits.texture[0].max_texture_width + ".0," + textureUnits.texture[0].max_texture_height + ".0)" );
			s = rTEXTURE0start.replace(s, "#end_TEXTURE0"); s = rTEXTURE0end.replace(s, "$1");
		} else {
			s = rTEXTURE0start.replace(s, "#end_TEXTURE0$1"); s = rTEXTURE0end.replace(s, "");
		}
		
		if (slots > 1) {
			s = rMAX_TEXTURE1.replace(s, "vec2(" + textureUnits.texture[1].max_texture_width + ".0," + textureUnits.texture[1].max_texture_height + ".0)" );
			s = rTEXTURE1start.replace(s, "#end_TEXTURE1"); s = rTEXTURE1end.replace(s, "$1");
		} else {
			s = rTEXTURE1start.replace(s, "#end_TEXTURE1$1"); s = rTEXTURE1end.replace(s, "");
		}
		
		// replace template variables
		//s = rSOMETHING_TO_REPLACE.replace(s, ???what??? );
		
		return s;
	}
	
	public inline function compile(elemBuff:I_ElementBuffer, type:Int, textureUnits:ActiveTextures, programUniforms:Uniforms,
								fragmentShaderSrc:String, vertexShaderSrc:String,
								onerror:String->Void):Void
	{
		customUniforms = programUniforms;
		
		vertexShaderSrc = parseType(type, textureUnits, vertexShaderSrc);
		#if peote_vert_medium_precision
		vertexShaderSrc = "precision mediump float;" + vertexShaderSrc;
		#else
		vertexShaderSrc = "precision highp float;" + vertexShaderSrc;
		#end
		
		fragmentShaderSrc = parseType(type, textureUnits, fragmentShaderSrc);
		#if peote_frag_medium_precision
		fragmentShaderSrc = "precision mediump float;" + fragmentShaderSrc;
		#else
		fragmentShaderSrc = "precision highp float;" + fragmentShaderSrc;
		#end
 
		// TODO:
		#if (cpp || android)
		fragmentShaderSrc = "#extension GL_OES_standard_derivatives : enable\n"+fragmentShaderSrc;
		#end
		
		// reformat to debug
		var r:EReg = new EReg(";", "g");
		#if debugshader
		trace("OES_standard_derivatives support:" + GL.getExtension('OES_standard_derivatives'));
		trace("EXTENSIONS:\n"+GL.getSupportedExtensions());
		trace("VERTEXSHADER:\n"+r.replace(vertexShaderSrc, ";\n"));
		trace("FRAGMENTSHADER:\n"+r.replace(fragmentShaderSrc, ";\n"));
		#end
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
			
			// TODO: set ALL manual depending on dispalylist-type ??
			// set manual (for windows glsl-compiler!!)
			GL.bindAttribLocation(glProgram, aTEXTCOORD, "aTexCoord");
			
		
			// LINK PROGRAM			
			GL.linkProgram(glProgram);

			if (GL.getProgramParameter(glProgram, GL.LINK_STATUS) == 0) // glsl compile error
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
						#if debugshader
						trace( "ANZAHL " + GL.getProgramParameter(glProgram, GL.ACTIVE_ATTRIBUTES) );
						#end
						//elemBuff.attr = new Vector<Int>(GL.getProgramParameter(glProgram, GL.ACTIVE_ATTRIBUTES));
						elemBuff.attr = new Vector<Int>(12); // <- TODO!!! (optimize)
						
						// TODO: set ALL manual depending on dispalylist-type ??
						elemBuff.attr.set(aTEXTCOORD, aTEXTCOORD ); // set manual (for windows glsl-compiler!!)
						
						// TODO: only for CUSTOM Shader and CUSTOM attributes
						for (i in 0 ... GL.getProgramParameter(glProgram, GL.ACTIVE_ATTRIBUTES))
						{	
							name = GL.getActiveAttrib(glProgram, i).name;
							#if debugshader
							trace( name + ":" + GL.getAttribLocation(glProgram, name) );
							#end
							switch (name)
							{
								case "aPosition":	elemBuff.attr.set(aPOSITION,  GL.getAttribLocation(glProgram, name) );
								//case "aTexCoord":	elemBuff.attr.set(aTEXTCOORD, GL.getAttribLocation(glProgram, name) );
								case "aZindex":		elemBuff.attr.set(aZINDEX,    GL.getAttribLocation(glProgram, name) );
								case "aRGBA":		elemBuff.attr.set(aRGBA,      GL.getAttribLocation(glProgram, name) );
								case "aRGBA_END":	elemBuff.attr.set(aRGBA_END,  GL.getAttribLocation(glProgram, name) );
								case "aRotation":	elemBuff.attr.set(aRotation,  GL.getAttribLocation(glProgram, name) );
								case "aPivot":		elemBuff.attr.set(aPivot,     GL.getAttribLocation(glProgram, name) );
								case "aTime":		elemBuff.attr.set(aTIME,      GL.getAttribLocation(glProgram, name) );
								case "aElement":	elemBuff.attr.set(aELEMENT,   GL.getAttribLocation(glProgram, name) );
							}
						}
						
					}
				}
				
				// set uniforms
				uniforms = new Vector<GLUniformLocation>(GL.getProgramParameter(glProgram, GL.ACTIVE_UNIFORMS));
				
				var activeUniform:GLActiveInfo;
				
				for (i in 0 ... GL.getProgramParameter(glProgram, GL.ACTIVE_UNIFORMS))
				{	
					activeUniform = GL.getActiveUniform(glProgram, i);
					name = activeUniform.name;
					
					#if debugshader
					//trace( name + ":" + (GL.getActiveUniform(glProgram, i).type == GL.FLOAT_VEC2) );
					trace( name + ":" + GL.getUniformLocation(glProgram, name) );
					#end
					
					switch (name)
					{
						case "uMouse":				uniforms.set(uMOUSE,            GL.getUniformLocation(glProgram, name) );
						case "uResolution":			uniforms.set(uRESOLUTION,       GL.getUniformLocation(glProgram, name) );
						case "uTime":				uniforms.set(uTIME,             GL.getUniformLocation(glProgram, name) );
						case "uZoom":				uniforms.set(uZOOM,             GL.getUniformLocation(glProgram, name) );
						case "uDelta":				uniforms.set(uDELTA,            GL.getUniformLocation(glProgram, name) );
						case "uTexture0":			uniforms.set(uTEXTURE[0],       GL.getUniformLocation(glProgram, name) );
						case "uTexture1":			uniforms.set(uTEXTURE[1],       GL.getUniformLocation(glProgram, name) );
						case "uTexture2":			uniforms.set(uTEXTURE[2],       GL.getUniformLocation(glProgram, name) );
						case "uTexture3":			uniforms.set(uTEXTURE[3],       GL.getUniformLocation(glProgram, name) );
						case "uTexture4":			uniforms.set(uTEXTURE[4],       GL.getUniformLocation(glProgram, name) );
						case "uTexture5":			uniforms.set(uTEXTURE[5],       GL.getUniformLocation(glProgram, name) );
						case "uTexture6":			uniforms.set(uTEXTURE[6],       GL.getUniformLocation(glProgram, name) );
						case "uTexture7":			uniforms.set(uTEXTURE[7],       GL.getUniformLocation(glProgram, name) );
						default: if (customUniforms != null) customUniforms.setUniformLocation(activeUniform, glProgram);
					}
				}
				if (customUniforms != null) customUniforms.removeUnused();
			}
		}
	}

}

