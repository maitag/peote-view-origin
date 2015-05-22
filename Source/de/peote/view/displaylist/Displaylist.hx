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

import de.peote.view.texture.TextureCache;
import haxe.ds.Vector;
import lime.graphics.opengl.GLProgram;
import lime.graphics.opengl.GLShader;
import lime.Assets;
import haxe.Http;

import de.peote.view.element.*;

class Displaylist
{
	public static inline var ANIM:Int = 1;
	public static inline var TREE:Int = 2;

	public static inline var ZINDEX:Int = 4;
	public static inline var RGBA:Int = 8;
	public static inline var ROTATION:Int = 16;
	public static inline var SCALE:Int = 32;
	public static inline var TILE:Int = 64;
	
	public var type:Int = 0;
	
	// double linked circular list
	public var prev:Displaylist = this; // pref displaylist (in order)
	public var next:Displaylist = this; // next displaylist (in order)
	
	// params
	public var x:Int=0; // x Position
	public var y:Int=0; // y Position
	public var w:Int=0; // width
	public var h:Int=0; // height

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
	public var bufferElement:I_BufferElement;
	
	// von parent (peoteView)
	public var texturecache:TextureCache;
	public var programCache:ProgramCache;
	
	// -----------
	
	public function new(param:DParam, texturecache:TextureCache, programCache:ProgramCache) 
	{
		this.texturecache = texturecache;
		this.programCache = programCache;
		//this.type = type;
		
		z = (param.z != null) ? param.z : 0;
		
		element = new Vector<I_Element>(param.max_elements);
		/*
		programCache = new ProgramCache( param.max_programs,
		                                 Shader.default_fragmentShaderSrc,
		                                 Shader.default_vertexShaderSrc);
		*/
		trace("max_segments: "+(Math.floor( param.max_elements / param.buffer_segment_size ) + param.max_programs));
		buffer = new Buffer(param.buffer_segment_size, Math.floor( param.max_elements/param.buffer_segment_size ) + param.max_programs ); // TODO
		
		// je nach Typ
		bufferElement = new BufferElementSimple(buffer);
		//bufferElement = new BufferElement(buffer);
	}
		
	public inline function delete():Void
	{
		bufferElement.delete();
		buffer.delete();
		element = null;
	}

	public inline function set(param:DParam):Void
	{
		if (param.x != null) x = param.x;
		if (param.y != null) y = param.y;		
		if (param.w != null) w = param.w;		
		if (param.h != null) h = param.h;		
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
			e = new ElementSimple( param ); // oder ElementTree( param );
			
			if (programCache.get(param.program) != null)
			{
				buffer.addElement( e, programCache.get(param.program), param.program ); // TODO: eigene program-cache fuer active-programm-zuordnungen
				
				element.set( param.element, e );
				
				//trace("addElement "+param.element+" displaylist:"+param.displaylist+" buf_pos :"+e.buf_pos + " start" + e.act_program.start+ " size" + e.act_program.size);
			} else trace(" ERROR: no program specified for new element"); // TODO
			
		} //else trace("set element "+param.element+"--------- buf_pos :"+e.buf_pos);
		
		
		e.set(bufferElement, param, texturecache);
	}

			
	public inline function delElement(element_nr:Int):Void
	{
		var e:I_Element = element.get(element_nr);
		
		if (e != null)
		{
			element.set(element_nr, null);
			
			buffer.delElement(e);
			e.del(bufferElement, texturecache);
		}
	}
	
	public inline function delAllElement():Void
	{
		for (element_nr in 0...element.length) delElement(element_nr);
	}
	
}
