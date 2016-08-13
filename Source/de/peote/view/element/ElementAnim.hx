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
import de.peote.view.element.ElementParam;
import de.peote.view.texture.ImageCache;

//import de.peote.view.ActiveProgram;
@:keep
class ElementAnim implements I_Element
{
	public var act_program:ActiveProgram;
	public var buf_pos:Int;
	
	public var slot:Int = -1;
	public var image:Int = -1;
	public var tile:Int = -1;
	
	// animated per gpu
	public var x:Int;
	public var y:Int;
	public var w:Int;
	public var h:Int;
	public var rgba:Int;
	public var rotation:Float;
	public var pivotX:Int;
	public var pivotY:Int;
	public var time:Float = 0.0;
	
	// not animated
	public var z:Int;
	/*
	public var tx:Int = 0;
	public var ty:Int = 0;
	public var tw:Int = 0;
	public var th:Int = 0;
	*/
	public function new() {
		x = PeoteView.elementDefaults.x;	
		y = PeoteView.elementDefaults.y;	
		w = PeoteView.elementDefaults.w;	
		h = PeoteView.elementDefaults.h;	
		z = PeoteView.elementDefaults.z;
		rgba = PeoteView.elementDefaults.rgba;
		rotation = PeoteView.elementDefaults.rotation;
		pivotX = PeoteView.elementDefaults.pivotX;
		pivotY = PeoteView.elementDefaults.pivotY;
		//image = PeoteView.elementDefaults.image;	
		//tile = PeoteView.elementDefaults.tile;	
	}
	
	public inline function set(elemBuff:I_ElementBuffer, param:ElementParam, imageCache:ImageCache, programCache:ProgramCache):Void
	{	
		
		// TODO: nur bestimmte buffer-werte aendern
		// z und tex werte separat
		
		/*
		if (param.sx1 != null) param.w1 = Math.round(param.w1 * param.sx1);
		if (param.sy1 != null) param.h1 = Math.round(param.h1 * param.sy1);
		if (param.sx2 != null) param.w2 = Math.round(param.w2 * param.sx2);
		if (param.sy2 != null) param.h2 = Math.round(param.h2 * param.sy2);
		*/
		if (param.x == null) param.x = x;
		if (param.y == null) param.y = y;
		if (param.w == null) param.w = w;
		if (param.h == null) param.h = h;
		if (param.rgba == null) param.rgba = rgba;
		if (param.rotation == null) param.rotation = rotation;
		if (param.pivotX == null) param.pivotX = pivotX;
		if (param.pivotY == null) param.pivotY = pivotY;
		if (param.time == null) param.time = time;
		
		if (param.start == null) param.start = {};

		if (param.start.x == null) param.start.x = param.x;
		if (param.start.y == null) param.start.y = param.y;
		if (param.start.w == null) param.start.w = param.w;
		if (param.start.h == null) param.start.h = param.h;
		if (param.start.rgba == null) param.start.rgba = param.rgba;
		if (param.start.rotation == null) param.start.rotation = param.rotation;
		if (param.start.pivotX == null) param.start.pivotX = param.pivotX;
		if (param.start.pivotY == null) param.start.pivotY = param.pivotY;
		if (param.start.time == null) param.start.time = param.time;
			
		if (param.end == null) param.end = {};

		if (param.end.x == null) param.end.x = param.x;
		if (param.end.y == null) param.end.y = param.y;
		if (param.end.w == null) param.end.w = param.w;
		if (param.end.h == null) param.end.h = param.h;
		if (param.end.rgba == null) param.end.rgba = param.rgba;
		if (param.end.rotation == null) param.end.rotation = param.rotation;
		if (param.end.pivotX == null) param.end.pivotX = param.pivotX;
		if (param.end.pivotY == null) param.end.pivotY = param.pivotY;
		if (param.end.time == null) param.end.time = param.time;
			
		
		if (param.z == null) param.z = z;
		
		// SLOT
		if (param.slot == null && PeoteView.elementDefaults.slot != null ) param.slot = PeoteView.elementDefaults.slot;
		if (param.slot!= null && param.slot != slot)
		{
			if (programCache.textures.get(act_program.program_nr) != null)
			{
				slot = param.slot;
			}
		}

		// IMAGE
		if (param.image == null && PeoteView.elementDefaults.image != null ) param.image = PeoteView.elementDefaults.image;
		if (param.image != null && param.image != image)
		{
			if (image != -1) imageCache.unUseImage(image);
			if (imageCache.useImage(param.image) != null)
			{
				image = param.image;
				if (param.slot == null) slot = -1;
			}
		}
		
		if (slot != -1)
		{	
			var texture = programCache.textures.get(act_program.program_nr);
			param.tx = (slot % texture.slotsX) * texture.slotWidth - ( (param.tx == null) ? 0 : param.tx);
			param.ty = Math.floor(slot / texture.slotsX) * texture.slotHeight - ((param.ty == null) ? 0 : param.ty);
			if (param.tw == null) param.tw = texture.slotWidth;
			if (param.th == null) param.th = texture.slotHeight;
		}
		else if (image != -1)
		{	
			var img = imageCache.getImage(image);
			param.tx = img.tx - ((param.tx == null) ? 0 : param.tx);
			param.ty = img.ty - ((param.ty == null) ? 0 : param.ty);
			if (param.tw == null) param.tw = img.tw;
			if (param.th == null) param.th = img.th;
		}
		else 
		{
			var texture = programCache.textures.get(act_program.program_nr);
			if (param.tx == null) param.tx = 0;
			if (param.ty == null) param.ty = 0;
			if (texture != null)
			{
				if (param.tw == null) param.tw = texture.max_texture_width;
				if (param.th == null) param.th = texture.max_texture_height;
			}
			else
			{
				if (param.tw == null) param.tw = param.w;
				if (param.th == null) param.th = param.h;
			}
		}
		
		// TILING IMAGE
		if (param.tile != null) tile = param.tile;
		else if (PeoteView.elementDefaults.tile != null) tile = PeoteView.elementDefaults.tile;
		
		if (tile != -1)
		{	
			param.tx += Math.floor( (tile % 16) * param.tw / 16 );
			param.ty += Math.floor( Math.floor(tile/16) * param.th / 16 );
			param.tw  = Math.floor( param.tw/16 );
			param.th  = Math.floor( param.th/16 );
		}
		
		//trace(param.element, param.tx, param.ty, param.tw, param.th);
		elemBuff.set(this, param);
		
		x = param.end.x;
		y = param.end.y;
		w = param.end.w;
		h = param.end.h;
		rgba = param.end.rgba;
		rotation = param.end.rotation;
		pivotX = param.end.pivotX;
		pivotY = param.end.pivotY;
		time = param.end.time;

		z = param.z;
	}
	
	public inline function get():ElementParam
	{
		return {
			x: x,
			y: y,
			z: z,
			w: w,
			h: h,
			rgba: rgba,
			rotation: rotation,
			pivotX: pivotX,
			pivotY: pivotY,
			time: time,
			tile:tile,
			image:image
		};
	}
	
	public inline function bufferUpdate(a:ActiveProgram, b:Int):Void
	{
		act_program = a;
		buf_pos = b;		
	}
	
	public inline function del(elemBuff:I_ElementBuffer, imageCache:ImageCache):Void
	{	
		elemBuff.del(this);
		if (image != -1) imageCache.unUseImage(image);
	}
	/*	
	public inline function setTexCoord(bufferElement:I_BufferElement, param:Param):Void
	{	
		// IMAGE
		if (param.img != img) img = param.img;
		if (img != null)
		{
			if (param.tx == null) param.tx = img.tx;
			if (param.ty == null) param.ty = img.tx;
			if (param.tw == null) param.tw = img.tw;
			if (param.th == null) param.th = img.th;
		}
		else 
		{
			if (param.tx == null) param.tx = 0;
			if (param.ty == null) param.ty = 0;
			if (param.tw == null) param.tw = param.w;
			if (param.th == null) param.th = param.h;
		}
		// TILING IMAGE
		if (param.tile != null) tile = param.tile;
		if (tile != -1)
		{
			param.tx += Math.floor( (tile % 16) * param.tw / 16 );
			param.ty += Math.floor( Math.floor(tile/16) * param.th / 16 );
			param.tw  = Math.floor( param.tw/16 );
			param.th  = Math.floor( param.th/16 );
		}
		trace(param.element,param.tx, param.ty, param.tw, param.th);
		bufferElement.setTexCoord(this, param);
	}
	*/


	
}