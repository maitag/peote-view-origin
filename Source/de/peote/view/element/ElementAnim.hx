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
import de.peote.view.Param;
import de.peote.view.texture.TextureCache;

//import de.peote.view.ActiveProgram;

class ElementAnim implements I_Element
{
	public var act_program:ActiveProgram;
	public var buf_pos:Int;
	
	public var image:Int = -1;
	public var tile:Int = -1;
	
	// animated per gpu
	public var x:Int;
	public var y:Int;
	public var w:Int;
	public var h:Int;
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
		//image = PeoteView.elementDefaults.image;	
		//tile = PeoteView.elementDefaults.tile;	
	}
	
	public inline function set(bufferElement:I_ElementBuffer, param:Param, texturecache:TextureCache):Void
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
		if (param.time == null) param.time = time;
		
		if (param.start == null) param.start = {};

		if (param.start.x == null) param.start.x = param.x;
		if (param.start.y == null) param.start.y = param.y;
		if (param.start.w == null) param.start.w = param.w;
		if (param.start.h == null) param.start.h = param.h;
		if (param.start.time == null) param.start.time = param.time;
			
		if (param.end == null) param.end = {};

		if (param.end.x == null) param.end.x = param.x;
		if (param.end.y == null) param.end.y = param.y;
		if (param.end.w == null) param.end.w = param.w;
		if (param.end.h == null) param.end.h = param.h;
		if (param.end.time == null) param.end.time = param.time;
			
		
		if (param.z == null) param.z = z;
		
		// IMAGE
		if (param.image == null && PeoteView.elementDefaults.image != null ) param.image = PeoteView.elementDefaults.image;
		if (param.image!= null && param.image != image)
		{
			if (image != -1) texturecache.unUseImage(image);
			if (texturecache.useImage(param.image) != null)
			{
				image = param.image;
			}
		}
		if (image != -1)
		{	
			var img = texturecache.getImage(image);
			if (param.tx == null) param.tx = img.tx;
			if (param.ty == null) param.ty = img.ty;
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
		else if (PeoteView.elementDefaults.tile != null) tile = PeoteView.elementDefaults.tile;
		
		if (tile != -1)
		{	
			param.tx += Math.floor( (tile % 16) * param.tw / 16 );
			param.ty += Math.floor( Math.floor(tile/16) * param.th / 16 );
			param.tw  = Math.floor( param.tw/16 );
			param.th  = Math.floor( param.th/16 );
		}
		
		//trace(param.element, param.tx, param.ty, param.tw, param.th);
		bufferElement.set(this, param);
		
		x = param.end.x;
		y = param.end.y;
		z = param.z;
		w = param.end.w;
		h = param.end.h;
		time = param.end.time;
	}
	
	public inline function get():Param
	{
		return {
			x: x,
			y: y,
			z: z,
			w: w,
			h: h,
			tile:tile,
			image:image
		};
	}
	
	public inline function bufferUpdate(a:ActiveProgram, b:Int):Void
	{
		act_program = a;
		buf_pos = b;		
	}
	
	public inline function del(bufferElement:I_ElementBuffer, texturecache:TextureCache):Void
	{	
		bufferElement.del(this);
		if (image != -1) texturecache.unUseImage(image);
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