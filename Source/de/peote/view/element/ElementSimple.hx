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

class ElementSimple implements I_Element
{
	public var act_program:ActiveProgram;
	public var buf_pos:Int;
	
	public var image:Int = -1;
	public var tile:Int = -1;
	
	// stored
	public var x:Int;
	public var y:Int;
	public var w:Int;
	public var h:Int;
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
	
	public inline function set(elemBuff:I_ElementBuffer, param:Param, texturecache:TextureCache):Void
	{	
		
		// TODO: nur bestimmte buffer-werte aendern
		// z und tex werte separat
		
		/*
		if (param.sx1 != null) param.w1 = Math.round(param.w1 * param.sx1);
		if (param.sy1 != null) param.h1 = Math.round(param.h1 * param.sy1);
		if (param.sx2 != null) param.w2 = Math.round(param.w2 * param.sx2);
		if (param.sy2 != null) param.h2 = Math.round(param.h2 * param.sy2);
		*/
		if (param.x == null) param.x = x; else x = param.x;
		if (param.y == null) param.y = y; else y = param.y;
		if (param.w == null) param.w = w; else w = param.w;
		if (param.h == null) param.h = h; else h = param.h;
		
		if (param.z == null) param.z = z; else z = param.z;
		
		if (param.rgba == null) param.rgba = PeoteView.elementDefaults.rgba; // TODO -> save this param in element ?
		
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
		elemBuff.set(this, param);
		
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
	
	public inline function del(elemBuff:I_ElementBuffer, texturecache:TextureCache):Void
	{	
		elemBuff.del(this);
		if (image != -1) texturecache.unUseImage(image);
	}
	/*	
	public inline function setTexCoord(elemBuff:I_elemBuff, param:Param):Void
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
		elemBuff.setTexCoord(this, param);
	}
	*/


	
}