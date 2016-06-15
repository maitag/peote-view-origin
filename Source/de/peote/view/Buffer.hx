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

import haxe.ds.IntMap;

import de.peote.view.element.I_Element;
import de.peote.tools.Holes;

class Buffer
{
	public static var VERTEX_COUNT:Int = 6;
		
	public var segment_size:Int;
	public var max_segments:Int;
	
	public var activeProgram:Array<ActiveProgram>;
	private var segment_holes:Holes;
	
	// CHECK:
	private var activeProgramSlots:IntMap<Array<ActiveProgram>>;
	
	public function new(segment_size:Int, max_segments:Int)
	{	
		this.segment_size = segment_size;
		this.max_segments = max_segments;
		
		activeProgram = new Array<ActiveProgram>();
		segment_holes = new Holes(max_segments);
		
		// CHECK:
		activeProgramSlots = new IntMap<Array<ActiveProgram>>();
	}
	
	public inline function delete():Void
	{
		activeProgram = null;
		segment_holes = null;
		activeProgramSlots = null;
	}
	
	public inline function delElement(e:I_Element):Void
	{
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
			
			// CHECK
			//e.act_program.program.activeProgramArray.remove(e.act_program);
			activeProgramSlots.get(e.act_program.program_nr).remove(e.act_program);
			
			this.activeProgram.remove(e.act_program);
			//trace("segment-holes:"+ segment_holes);
		}
			
	}

	public function addElement(e:I_Element, program:Program, program_nr:Int, programTextures:ActiveTextures, slot:Int = 0	 ):Void
	{
		// TODO:
		// var i:Int = program.activeProgram_index[slot];
		var buf_pos:Int = 0;
		var act_program:ActiveProgram = null;
		
		// CHECK
		//if (slot == program.activeProgramArray.length) // program is not in use
		if ( ! activeProgramSlots.exists(program_nr) )  activeProgramSlots.set(program_nr, new Array<ActiveProgram>());
		if (slot == activeProgramSlots.get(program_nr).length) // program is not in use
		{
			//trace("NEUES SEGMENT: ");
			                                          // CHECK
			act_program = new ActiveProgram(program, program_nr, programTextures, segment_size, segment_holes.getHole() * VERTEX_COUNT);
			
			// CHECK
			//program.activeProgramArray.push(act_program);
			activeProgramSlots.get(program_nr).push(act_program);
			
			this.activeProgram.push(act_program);
		}
		else
		{
			// CHECK
			//act_program = program.activeProgramArray[slot]; // TODO: may optimize with holes to
			act_program = activeProgramSlots.get(program_nr)[slot]; // TODO: may optimize with holes to
		}
		
		if (act_program.element_holes.is_full()) // TODO: PROBLEM!!!!
		{
			//trace("SEGMENT full");
			addElement(e, program, program_nr, programTextures, slot+1);
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
			
			
			e.bufferUpdate(act_program, buf_pos);
		}
	}
	
	
	
}