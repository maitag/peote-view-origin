/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o  \|/   o    o-o   
 *     o      o     <O>    o      o  
 *    o      o-o    /|\     o    o-o 
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

import haxe.ds.IntMap;
import haxe.ds.Vector;
import lime.gl.GLProgram;
import lime.gl.GLShader;

class Displaylist
{
	
	public var element:Vector<Element>;
	public var programsCache:Vector<Program>;
	public var buffer:Buffer;
	
	private var defaultProgram:Program;
	
	public function new(max_elements:Int, max_programs:Int) 
	{
		element = new Vector<Element>(max_elements);
		
		programsCache = new Vector<Program>(max_programs);
		
		// default Shader
		defaultProgram = new Program();
		defaultProgram.compile(Shader.default_fragmentShaderSrc, Shader.default_vertexShaderSrc, onerror);
		
		buffer = new Buffer(1000, 200*2);
	
	}
	
	public function onerror(msg:String):Void { trace(msg); }
	
	public inline function setShaderUrl(shader_nr:Int, url:String):Void
	{
		var program:Program = programsCache.get(shader_nr);
		if (program == null) 
		{
			program = new Program(defaultProgram);
			programsCache.set(shader_nr, program);
		}
		// onload.. setShaderSrc(nr, src)
	}
	
	public inline function setShaderSrc(shader_nr:Int, fragmentShaderSrc:String, vertexShaderSrc:String):Void
	{
		if (programsCache.get(shader_nr) == null) programsCache.set(shader_nr, new Program() );
		programsCache.get(shader_nr).compile(fragmentShaderSrc, vertexShaderSrc, onerror);
	}
	
	public inline function setElement(nr:Int, x:Int, y:Int, z:Int, w:Int, h:Int, shader_nr:Int,
	                           tx:Float, ty:Float, tw:Float, th:Float, image_nr:Int, tile_nr:Int ):Void
	{
		var tile_x:Float = 0.0;
		var tile_y:Float = 0.0;
		var tile_scaleX:Float = 1.0;
		var tile_scaleY:Float = 1.0;
		
		if (tile_nr > -1)
		{
			tile_x = tile_nr % 16;
			tile_y = Math.floor(tile_nr / 16);
			
			tile_scaleX = 1 / 16;
			tile_scaleY = 1 / 16;
		}
		
		var program:Program = programsCache.get(shader_nr);
		if (program == null) 
		{
			program = new Program(defaultProgram);
			programsCache.set(shader_nr, program);
		}
		
		element.set(nr, buffer.addElement(program,
							x,y,z,w,h,
							tx + tile_x * tw * tile_scaleX,
							ty + tile_y * th * tile_scaleY,
							tw * tile_scaleX,
							th * tile_scaleY,
							image_nr) );
	}
	
	public inline function delElement(e:Element):Void
	{
		buffer.delElement(e);
	}
	
	public inline function animElement(nr:Int, x:Int, y:Int, z:Int, w:Int, h:Int, t1:Float, t2:Float):Void
	{
		buffer.animElement(element.get(nr), x, y, z, w, h, t1, t2);
	}
	
	public inline function setElementTexCoord(nr:Int, tx:Float, ty:Float, tw:Float, th:Float, image_nr:Int, tile_nr:Int):Void
	{
		var tile_x:Float = 0.0;
		var tile_y:Float = 0.0;
		var tile_scaleX:Float = 1.0;
		var tile_scaleY:Float = 1.0;
		
		if (tile_nr > -1)
		{
			tile_x = tile_nr % 16;
			tile_y = Math.floor(tile_nr / 16);
			
			tile_scaleX = 1 / 16;
			tile_scaleY = 1 / 16;
		}
		buffer.setElementTexCoord(element.get(nr),
								tx + tile_x * tw * tile_scaleX,
								ty + tile_y * th * tile_scaleY,
								tw * tile_scaleX,
								th * tile_scaleY,
								image_nr);
	}
}
