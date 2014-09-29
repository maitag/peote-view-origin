/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o    _   o      o   
 *      o-o-o  o-o  (o)   o    o-o  
 *     o      o     / \    o      o 
 *    o      o-o   /  ))    o    o-o
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

import lime.gl.GL;
import lime.gl.GLBuffer;
import lime.utils.Float32Array;
import lime.utils.Libs;

class Buffer
{
	public static var VERTEX_COUNT:Int = 6;
	public static var STRAW:Int = 10;
	
	public var buffer:GLBuffer;
	
	public var activeProgram:Array<ActiveProgram>;
	public var segment_holes:Holes;
	
	private var segment_size:Int;
	
	public function new(segment_size:Int, max_segments:Int)
	{	
		this.segment_size = segment_size;
		
		this.activeProgram = new Array<ActiveProgram>();
		
		createEmptyBuffer(max_segments * segment_size * VERTEX_COUNT * STRAW);
		segment_holes = new Holes(max_segments);
	}
	
	public inline function delElement(e:Element):Void
	{
		GL.bindBuffer (GL.ARRAY_BUFFER, buffer);
		GL.bufferSubData(GL.ARRAY_BUFFER, e.buf_pos * 10 * 4 , new Float32Array (60));
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		
		e.act_program.element_holes.addHole(Math.floor( (e.buf_pos - e.act_program.buf_start) / VERTEX_COUNT));
		e.act_program.start = e.act_program.buf_start + 1 + e.act_program.element_holes.first() * VERTEX_COUNT;
		e.act_program.size = (e.act_program.element_holes.last() + 1
		                         -e.act_program.element_holes.first() ) * VERTEX_COUNT - 2;
		/*trace("delElement hole = "
		   //+ e.act_program.element_holes
		   + "e.act_program.element_holes.addHole(" + Math.floor( (e.buf_pos - e.act_program.buf_start) / VERTEX_COUNT) +")"
		      +"  e.buf_pos :"+e.buf_pos + " start" + e.act_program.start+ " size" + e.act_program.size);
		*/
		if (e.act_program.element_holes.is_empty())
		{
			//trace("delete SEGMENT: ");
			segment_holes.addHole(  Math.floor(e.act_program.buf_start / segment_size / VERTEX_COUNT) );
			e.act_program.program.activeProgram.remove(e.act_program);
			activeProgram.remove(e.act_program);
			//trace("segment-holes:"+ segment_holes);
		}
			
	}
	public function addElement(program:Program, x:Int, y:Int, z:Int, w:Int, h:Int,
	                                       tx:Float, ty:Float, tw:Float, th:Float, image_nr:Int, slot:Int=0):Element
	{
		// TODO:
		// var i:Int = program.activeProgram_index[slot];
		var buf_pos:Int = 0;
		var act_program:ActiveProgram = null;
		
		if (slot == program.activeProgram.length) // program is not in use
		{
			//trace("NEUES SEGMENT: ");
			act_program = new ActiveProgram(program, segment_size, segment_holes.getHole() * VERTEX_COUNT);
			program.activeProgram.push(act_program);
			activeProgram.push(act_program);
		}
		else
		{
			act_program = program.activeProgram[slot]; // TODO: may optimize with holes to
		}
		
		if (act_program.element_holes.is_full())
		{
			//trace("SEGMENT full");
			return addElement(program, x, y, z, w, h, tx, ty, tw, th, image_nr, slot + 1);			
		}
		else
		{
			buf_pos =  act_program.buf_start + 
					   act_program.element_holes.getHole() * VERTEX_COUNT;
					   
			act_program.start = 
				act_program.buf_start + 1 +
				act_program.element_holes.first() * VERTEX_COUNT;
				
			act_program.size = 
				(act_program.element_holes.last() + 1
				- act_program.element_holes.first()) * VERTEX_COUNT - 2;
			//trace("buf_pos :"+buf_pos + " start" + act_program.start+ " size" + act_program.size);
		}
		
		var xw:Float = x + w;
		var yh:Float = y + h;
		var txw:Float = tx + tw;
		var tyh:Float = ty + th;
		
		GL.bindBuffer (GL.ARRAY_BUFFER, buffer);
		GL.bufferSubData(GL.ARRAY_BUFFER, buf_pos * 10 * 4 , new Float32Array ( // 60 Floats -> 60*4 Bytes
			[
				xw, yh, z,		// 1 VERTEX_START twice
				0, 0, 			// 1 TIME         twice
				xw, yh, z,    	// 1 VERTEX_END   twice
				txw, tyh,		// 1 TEXT COORD   twice
				
				xw, yh, z,		// 1 VERTEX_START
				0, 0,			// 1 TIME
				xw, yh, z,		// 1 VERTEX_END
				txw, tyh,		// 1 TEXT_COORD
				
				x,  yh, z,		// 2 VERTEX_START
				0, 0,			// 2 TIME
				x,  yh, z,		// 2 VERTEX_END
				tx, tyh,		// 2 TEXT_COORD
				
				xw, y,  z,		// 3 VERTEX_START
				0, 0,			// 3 TIME
				xw, y,  z,		// 3 VERTEX_END
				txw, ty,		// 3 TEXT_COORD
				
				x,  y,  z,		// 4 VERTEX_START
				0, 0,			// 4 TIME
				x,  y,  z,		// 4 VERTEX_END
				tx,  ty,		// 4 TEXT_COORD
				
				x,  y,  z,		// 4 VERTEX_START twice
				0, 0,			// 4 TIME         twice
				x,  y,  z,		// 4 VERTEX_END   twice
				tx,  ty,		// 4 TEXT_COORD   twice
			]
		));
		// TODO OPTIMIZE with buffer-copy on GPU ?
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		return(new Element(act_program, buf_pos, image_nr));
	}
	
	public inline function animElement(e:Element, x:Int, y:Int, z:Int, w:Int, h:Int, t1:Float, t2:Float):Void
	{
		var buf_pos:Int = e.buf_pos;
		var xw:Float = x + w;
		var yh:Float = y + h;
		
		GL.bindBuffer (GL.ARRAY_BUFFER, buffer);
		if (e.anim_switch)
		{
			e.anim_switch = false;
			GL.bufferSubData(GL.ARRAY_BUFFER, buf_pos * 10 * 4 + 3*4, new Float32Array (
				[
					t1, t2, 		// 1 TIME       twice
					xw, yh, z,    	// 1 VERTEX_END twice
				]));
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+1) * 10 * 4 + 3*4, new Float32Array (
				[
					t1, t2,			// 1 TIME
					xw, yh, z,		// 1 VERTEX_END
				]));	
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+2) * 10 * 4 + 3*4, new Float32Array (
				[
					t1, t2,			// 2 TIME
					x,  yh, z,		// 2 VERTEX_END
				]));	
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+3) * 10 * 4 + 3*4, new Float32Array (
				[
					t1, t2,			// 3 TIME
					xw, y,  z,		// 3 VERTEX_END
				]));	
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+4) * 10 * 4 + 3*4, new Float32Array (
				[
					t1, t2,			// 4 TIME
					x,  y,  z,		// 4 VERTEX_END
				]));				
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+5) * 10 * 4 + 3*4, new Float32Array (
				[
					t1, t2,			// 4 TIME       twice
					x,  y,  z,		// 4 VERTEX_END twice
				]));
		}
		else
		{
			e.anim_switch = true;
			GL.bufferSubData(GL.ARRAY_BUFFER, buf_pos * 10 * 4 , new Float32Array (
				[
					xw, yh, z,    	// 1 VERTEX_END twice
					t2, t1, 		// 1 TIME       twice
				]));
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+1) * 10 * 4 , new Float32Array (
				[
					xw, yh, z,		// 1 VERTEX_END
					t2, t1,			// 1 TIME
				]));	
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+2) * 10 * 4 , new Float32Array (
				[
					x,  yh, z,		// 2 VERTEX_END
					t2, t1,			// 2 TIME
				]));	
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+3) * 10 * 4 , new Float32Array (
				[
					xw, y,  z,		// 3 VERTEX_END
					t2, t1,			// 3 TIME
				]));	
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+4) * 10 * 4 , new Float32Array (
				[
					x,  y,  z,		// 4 VERTEX_END
					t2, t1,			// 4 TIME
				]));				
			GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+5) * 10 * 4 , new Float32Array (
				[
					x,  y,  z,		// 4 VERTEX_END twice
					t2, t1,			// 4 TIME       twice
				]));
		}
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}
	
	public inline function setElementTexCoord(e:Element, tx:Float, ty:Float, tw:Float, th:Float, image_nr:Int):Void
	{
		var buf_pos:Int = e.buf_pos;
		var txw:Float = tx + tw;
		var tyh:Float = ty + th;
		
		e.image_nr = image_nr;
		
		GL.bindBuffer (GL.ARRAY_BUFFER, buffer);
		GL.bufferSubData(GL.ARRAY_BUFFER, buf_pos * 10 * 4 + 8*4, new Float32Array (
			[	txw, tyh,		// 1 TEXT COORD twice
			]));
		GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+1) * 10 * 4 + 8*4, new Float32Array (
			[	txw, tyh,		// 1 TEXT COORD
			]));	
		GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+2) * 10 * 4 + 8*4, new Float32Array (
			[	tx, tyh,		// 2 TEXT_COORD
			]));	
		GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+3) * 10 * 4 + 8*4, new Float32Array (
			[	txw, ty,		// 3 TEXT_COORD
			]));	
		GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+4) * 10 * 4 + 8*4, new Float32Array (
			[	tx,  ty,		// 4 TEXT_COORD 
			]));				
		GL.bufferSubData(GL.ARRAY_BUFFER, (buf_pos+5) * 10 * 4 + 8*4, new Float32Array (
			[	tx,  ty,		// 4 TEXT_COORD twice
			]));
		GL.bindBuffer (GL.ARRAY_BUFFER, null);		
	}
	
	public inline function createEmptyBuffer(size:Int):Void
	{
		buffer = GL.createBuffer();
		GL.bindBuffer (GL.ARRAY_BUFFER, buffer);
		GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (size), GL.STATIC_DRAW);
		//GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (size), GL.DYNAMIC_DRAW);
		//GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (size), GL.STREAM_DRAW);
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}
	
}