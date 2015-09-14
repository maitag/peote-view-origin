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

package de.peote.view.displaylist;

import de.peote.view.Program;
import de.peote.view.ProgramCache;
import de.peote.view.texture.TextureCache;
import de.peote.view.element.*;
import de.peote.view.Param;

import lime.graphics.opengl.GLProgram;
import lime.graphics.opengl.GLShader;

import haxe.ds.Vector;
import haxe.Http;

@:generic
class Displaylist<ELEMENT:{function new():Void;}, BUFFER:{function new(t:Int, b:Buffer):Void;}> implements I_Displaylist
{
	public var type:Int = 0;
	
	// double linked circular list
	public var prev:I_Displaylist = this; // pref displaylist (in order)
	public var next:I_Displaylist = this; // next displaylist (in order)
	
	// params
	public var x:Int=0; // x Position
	public var y:Int=0; // y Position
	public var w:Int=0; // width
	public var h:Int=0; // height

	public var zoom:Int=1; // zoom level

	public var xOffset:Int=0; // x Offset for all Elements
	public var yOffset:Int=0; // y Offset for all Elements

	public var z:Int=0; // z order

	public var r:Float=0.0; // red bg
	public var g:Float=0.0; // green bg
	public var b:Float=0.0; // blue bg
	public var a:Float=1.0; // blue bg

	public var renderBackground:Bool = false;
	public var enable:Bool = true;
	// -----------
	
	public var element:Vector<I_Element>;
	
	public var buffer:Buffer;
	public var elemBuff:I_ElementBuffer;
	
	// von parent (peoteView)
	public var texturecache:TextureCache;
	public var programCache:ProgramCache;
	
	// -----------
	
	public function new(param:DParam, programCache:ProgramCache, texturecache:TextureCache) 
	{
		this.texturecache = texturecache;
		this.programCache = programCache;
		this.type = param.type;
		
		z = (param.z != null) ? param.z : 0;
		
		element = new Vector<I_Element>(param.max_elements);
		trace("max_segments: "+(Math.floor( param.max_elements / param.buffer_segment_size ) + param.max_programs));

		buffer = new Buffer(param.buffer_segment_size, Math.floor( param.max_elements/param.buffer_segment_size ) + param.max_programs ); // TODO
		
		elemBuff = cast( new BUFFER(type, buffer), I_ElementBuffer);
		
		programCache.addDisplaylist(type, elemBuff);
		
	}
		
	public inline function delete():Void
	{
		elemBuff.delete();
		buffer.delete();
		programCache.delDisplaylist(type);
		element = null;
	}

	public inline function set(param:DParam):Void
	{
		if (param.x != null) x = param.x;
		if (param.y != null) y = param.y;		
		if (param.w != null) w = param.w;		
		if (param.h != null) h = param.h;		
		if (param.zoom != null) zoom = param.zoom;		
		if (param.xOffset != null) xOffset = param.xOffset;
		if (param.yOffset != null) yOffset = param.yOffset;		
		if (param.r != null) r = param.r;		
		if (param.g != null) g = param.g;		
		if (param.b != null) b = param.b;		
		if (param.a != null) a = param.a;		
		if (param.renderBackground != null) renderBackground = param.renderBackground;		
	}

	public inline function setElement(param:Param):Void
	{		
		var e:I_Element = element.get(param.element);
		
		if (e == null) // create new Element
		{
			e = cast( new ELEMENT(), I_Element);
			
			if (param.program == null) param.program = programCache.program.length-1;

			buffer.addElement( e, programCache.getProgram(param.program, type, elemBuff), param.program );
			element.set( param.element, e );
			//trace("addElement "+param.element+" displaylist:"+param.displaylist+" buf_pos :"+e.buf_pos + " start" + e.act_program.start+ " size" + e.act_program.size);
		}
		else if (param.program != null && param.program != e.act_program.program_nr ) //change program
		{
			elemBuff.del(e);
			buffer.delElement(e);
			buffer.addElement( e, programCache.getProgram(param.program, type, elemBuff), param.program );
		}
		//else trace("set element "+param.element+"--------- buf_pos :"+e.buf_pos);
		
		e.set(elemBuff, param, texturecache);
	}

			
	public inline function getElement(element_nr:Int):Param
	{
		var e:I_Element = element.get(element_nr);
		return (e == null) ? null : e.get();
	}
	
	public inline function hasElement(element_nr:Int):Bool
	{
		return (element.get(element_nr) != null);
	}
	
	public inline function delElement(element_nr:Int):Void
	{
		var e:I_Element = element.get(element_nr);
		
		if (e != null)
		{
			element.set(element_nr, null);
			
			buffer.delElement(e);
			e.del(elemBuff, texturecache);
		}
	}
	
	public inline function delAllElement():Void
	{
		for (element_nr in 0...element.length) delElement(element_nr);
	}
	
}