/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o   _-   o      o   
 *      o-o-o  o-o   \/   o    o-o  
 *     o      o     \|-    o      o 
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

package de.peote.view.element;

class ElementTree implements I_Element
{
	public var image_nr:Int = -1;
	public var act_program:ActiveProgram;
	public var buf_pos:Int;
	
	public var switch_anim:Bool = true;

	public var parent:ElementTree = null;
	public var child: ElementTree = null;
	public var sib:   ElementTree = null;
	
	public var x:Int;
	public var y:Int;
	public var w:Int;
	public var h:Int;
	public var sx:Float;
	public var sy:Float;
	
	public inline function new(param:ElementParam, parent:ElementTree = null)
	{
		if (param.image != null) image_nr = param.image;
		
		if (parent != null)
		{
			param.x = parent.x1 + Math.floor( param.x*parent.sx );
			param.y = parent.y1 + Math.floor( param.y*parent.sy );
			
			param.sx *= parent.sx;
			param.sy *= parent.sy;
			
			sib = parent.child;
			parent.child = e;
		}
		
	}
	
	public inline function delElement():Void
	{	
		// TODO: deleta all childs
	}
	
	public inline function animElement(param:ElementParam):Void
	{	
		switch_anim = ! switch_anim;
		
		if (elem.parent != null)
		{
			var parent = elem.parent;
			
			x = Math.floor(x*parent.scaleX) - parent.x;
			y = Math.floor(y*parent.scaleY) - parent.y;
			
			scaleX *= parent.scaleX;
			scaleY *= parent.scaleY;
		}
	}
	
	public inline function bufferUpdate(a:ActiveProgram, b:Int):Void
	{
		act_program = a;
		buf_pos = b;		
	}

	/*
	TODO: in ElementTree ?
	 geht nur mit neuem buffer wo immer auch parent-pos und scale mit gespeichert werden
	public function animTreeElement(nr:Int,
	                                x1:Int, y1:Int, w1:Int, h1:Int,
	                                x2:Int, y2:Int, w2:Int, h2:Int,
	                                scaleX:Float, scaleY:Float, t1:Float, t2:Float):Void
	{
		var elem:Element = element.get(nr);
		var parent_nr:Int = elem.parent;
		
		var elem_old_x1:Int = elem.x1;
		var elem_old_y1:Int = elem.y1;
		
		var elem_old_x2:Int = elem.x2;
		var elem_old_y2:Int = elem.y2;
		
		if (parent_nr != -1)
		{
			var parent = element.get(parent_nr);
			
			x1 = parent.x1 + Math.floor(x1*parent.scaleX);
			y1 = parent.y1 + Math.floor(y1*parent.scaleY);
			
			x2 = parent.x2 + Math.floor(x2*parent.scaleX);
			y2 = parent.y2 + Math.floor(y2*parent.scaleY);
			
			scaleX *= parent.scaleX;
			scaleY *= parent.scaleY;
		}
		
		elem.update(x1, y1, w1, h1,    x2, y2, w2, h2,    scaleX, scaleY);
		
		buffer.animElement( element.get(nr),
		                        x1, y1, Math.round(w1 * scaleX), Math.round(h1 * scaleY),
		                        x2, y2, Math.round(w2 * scaleX), Math.round(h2 * scaleY),
								t1, t2);
		
		// all childs relative
		var child_nr:Int = elem.child;
		while (child_nr != -1)
		{	var child_elem = element.get(child_nr); // elem is child now
			animTreeElement(child_nr,
		                child_elem.x1-elem_old_x1,
						child_elem.y1-elem_old_y1,
						child_elem.w1,
						child_elem.h1,
						
		                child_elem.x2-elem_old_x2,
						child_elem.y2-elem_old_y2,
						child_elem.w2,
						child_elem.h2,
						
		                child_elem.scaleX, 
						child_elem.scaleY,
						t1, t2);
			child_nr = child_elem.sib;
		}
		
	}
	*/
	
}