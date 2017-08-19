/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o        o      o   
 *      o-o-o  o-o   o    o    o-o  
 *     o      o     (u\    o      o 
 *    o      o-o     |      o    o-o
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

package peote.view;

import haxe.ds.StringMap;
import lime.graphics.opengl.GLActiveInfo;
import lime.graphics.opengl.GLProgram;

import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLUniformLocation;

typedef Uniform = {
	?id:GLUniformLocation,
	?type:Int,
	value:Array<Dynamic>
}

class Uniforms
{
	var uniforms:Array<Uniform>;
	var names:Array<String>;
	
	public static var GLuniformFunc:Array<GLUniformLocation->Dynamic->Void> = [uniform1i, uniform2i, uniform3i, uniform4i, uniform1f, uniform2f, uniform3f, uniform4f];
	public static inline function uniform1i(id:GLUniformLocation, v:Dynamic):Void { GL.uniform1i(id, v[0]); }
	public static inline function uniform2i(id:GLUniformLocation, v:Dynamic):Void { GL.uniform2i(id, v[0], v[1]); }
	public static inline function uniform3i(id:GLUniformLocation, v:Dynamic):Void { GL.uniform3i(id, v[0], v[1], v[2]); }
	public static inline function uniform4i(id:GLUniformLocation, v:Dynamic):Void { GL.uniform4i(id, v[0], v[1], v[2], v[3]); }
	public static inline function uniform1f(id:GLUniformLocation, v:Dynamic):Void { GL.uniform1f(id, v[0]); }
	public static inline function uniform2f(id:GLUniformLocation, v:Dynamic):Void { GL.uniform2f(id, v[0], v[1]); }
	public static inline function uniform3f(id:GLUniformLocation, v:Dynamic):Void { GL.uniform3f(id, v[0], v[1], v[2]); }
	public static inline function uniform4f(id:GLUniformLocation, v:Dynamic):Void { GL.uniform4f(id, v[0], v[1], v[2], v[3]); }
	
	public function new(vars:StringMap<Array<Dynamic>>) 
	{
		// TODO: may optimize here with vector
		names = new Array<String>();
		uniforms = new Array<Uniform>();
		for (key in vars.keys())
		{
			names.push(key);
			uniforms.push({ "value": vars.get(key) });
		}
	}
	
	public function setUniformLocation(activeUniform:GLActiveInfo, glProgram:GLProgram) 
	{	trace("setUniformLocation");
		var type:Int = -1;
		switch (activeUniform.type)
		{
			case GL.INT:        type=0;
			case GL.INT_VEC2:   type=1;
			case GL.INT_VEC3:   type=2;
			case GL.INT_VEC4:   type=3;
			case GL.FLOAT:      type=4;
			case GL.FLOAT_VEC2: type=5;
			case GL.FLOAT_VEC3: type=6;
			case GL.FLOAT_VEC4: type=7;
			default: trace("ERROR: uniform variable not float or int");
		}
		// TODO: Error handling
		var i:Int = names.indexOf(activeUniform.name);
		if (i > -1)
		{
			//trace("uniforms:",activeUniform.name,type);
			uniforms[i].type = type;
			uniforms[i].id = GL.getUniformLocation(glProgram, activeUniform.name);
		}
		else 
		{
			// TODO: Warning msg
			trace("uniform vars not exists:" + activeUniform.name + "type:" + type);
		}
	}
	public function removeUnused():Void
	{
		var len:Int = names.length; //hoisted (performance)
		for (i in 0...len)
		{
			if (uniforms[len-1-i].id == null)
			{
				trace("uniform vars not exists:" + names[len-1-i] + "in shadercode");
				names.splice(len-1-i, 1);
				uniforms.splice(len-1-i, 1);
			}
		}
	
	}
	public function update() 
	{
		var len:Int = names.length; //hoisted (performance)
		for (i in 0...len)
		{
			var u:Uniform = uniforms[i];
			GLuniformFunc[u.type](u.id,  u.value);
		}
	}
	
}