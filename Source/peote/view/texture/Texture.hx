/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o        o    o-o   
 *     o      o     \|/    o      o  
 *    o      o-o    <o>     o    o-o 
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

package peote.view.texture;

import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLTexture;
import lime.utils.UInt8Array;

import peote.tools.Holes;

class Texture
{
	public var texture:GLTexture;
	
	public var slotHoles:Holes;
	
	public var max_texture_width:Int;
	public var max_texture_height:Int;
	
	public var slotsX:Int;
	public var slotsY:Int;
	
	public var slotWidth:Int;
	public var slotHeight:Int;
	
	public var slots:Int = 1;
	
	public var autoSlots:Null<Bool> = null;
	
	public var mipmaps:Bool = false;
	
	public function new(param:TextureParam) 
	{
		slotWidth = param.w;
		slotHeight = param.h;
		/*
		slotsX = Math.floor(max_texture_width / slotWidth);
		slotsY = Math.floor(max_texture_height / slotHeight);
		*/
		
		if (param.slots == null) param.slots = 1;
		
		//if (param.w != null && param.h != null)
		//{
			var p:Dynamic = optimalTextureSize(param.slots, param.w, param.h);
			if (p != null)
			{
				slots = p.slots;
				slotsX = p.sx;
				slotsY = p.sy;
				//max_texture_width = p.w;
				//max_texture_height = p.h;
				max_texture_width = slotsX*slotWidth;
				max_texture_height = slotsY*slotHeight;
				
				slotHoles = new Holes(slotsX*slotsY);
				//trace('TextureCache: slotsX=$slotsX, slotWidth=$slotWidth, slotsY=$slotsY, slotHeight=$slotHeight');
				
				// TODO
				if (param.mipmaps != null) mipmaps = param.mipmaps;
				texture = createEmptyTexture(
					slotsX * slotWidth, slotsY * slotHeight,
					mipmaps,
					(param.magFilter != null) ? param.magFilter : 0,
					(param.minFilter != null) ? param.minFilter : 0
				);
			}
			else {
				trace("Error: can't create Texture ${param.texture}");
			}
		//}
		//else {
		//	trace("Error: missing texture-slots width(w) and height(h)");
		//}
		
	}
	
	public inline function clear():Void 
	{	
		// TODO: check images and programs that using this texture
		slotHoles = null;
		GL.deleteTexture(texture);
	}
	
	public inline function isFull():Bool 
	{
		return(slotHoles.is_full());
	}
		
	public inline function reserveImageSlot(img:Image):Void
	{
		if (autoSlots) img.slot = slotHoles.getHole();
		//trace("~~~~~~~~~> reserveImageSlot _>"+img.slot);
	}
		
	public inline function storeImage(img:Image, data:UInt8Array):Void
	{
		createSubTexture( texture,
			//(img.slot % slotsX) * slotWidth + img.tx,
			img.tx,
			//Math.floor(img.slot / slotsX) * slotHeight +img.ty,
			img.ty,
			img.tw, img.th, data
		);
	}
	
	public inline function freeImage(img:Image):Void 
	{	
		slotHoles.addHole( img.slot );
	}
	
	public static inline function createEmptyTexture(width:Int, height:Int, mipmap:Bool=false, magFilter:Int=0, minFilter:Int=0):GLTexture
	{
		var t:GLTexture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, t);
		
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, width, height, 0, GL.RGBA, GL.UNSIGNED_BYTE, 0);
		
		// magnification filter (only this values usual):
		switch (magFilter) {
			default:GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST); //bilinear
			case 1: GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);  //trilinear
		}
		
		// minification filter:
		if (mipmap)
		{
			switch (minFilter) {
				default:GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_NEAREST); //bilinear
				case 1: GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);  //trilinear
				case 2:	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_NEAREST);
				case 3:	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR);				
			}
		}
		else
		{
			switch (minFilter) {
				default:GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
				case 1:	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
			}
		}
		
		// firefox needs this texture wrapping for GL.texSubImage2D if imagesize is non power of 2 
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

		//GL.generateMipmap(GL.TEXTURE_2D);
		GL.bindTexture(GL.TEXTURE_2D, null);
		return t;
	}
	
	private inline function createSubTexture(t:GLTexture, x:Int, y:Int, w:Int, h:Int, data:UInt8Array):Void
	{
		GL.bindTexture(GL.TEXTURE_2D, t);
		GL.texSubImage2D(GL.TEXTURE_2D, 0, x, y, w, h, GL.RGBA, GL.UNSIGNED_BYTE,  data );
		
		if (mipmaps) {
			//GL.hint(GL.GENERATE_MIPMAP_HINT, GL.NICEST);
			//GL.hint(GL.GENERATE_MIPMAP_HINT, GL.FASTEST);
			GL.generateMipmap(GL.TEXTURE_2D);
		}
		GL.bindTexture(GL.TEXTURE_2D, null);
	}
	
	public inline function optimalTextureSize(slots:Int, slotWidth:Int, slotHeight:Int, ?maxTextureSize:Int):Dynamic
    {
		if (maxTextureSize == null) maxTextureSize = GL.getParameter(GL.MAX_TEXTURE_SIZE);
		
        maxTextureSize = Math.ceil( Math.log(maxTextureSize) / Math.log(2) );
        //trace('maxTextureSize: ${1<<maxTextureSize}');
        //trace('Texture-slots:${slots}');
        //trace('slot width : ${slotWidth}');
        //trace('slot height: ${slotHeight}');
        
        var a:Int = Math.ceil( Math.log(slots * slotWidth * slotHeight ) / Math.log(2) );  //trace(a);
        
        var r:Int; // unused area -> minimize!
        
        var w:Int = 1;
        var h:Int = a-1;
        var delta:Int = Math.floor(Math.abs(w - h));
        var rmin:Int = (1 << maxTextureSize) * (1 << maxTextureSize);
        
        var found:Bool = false;
		
        var n:Int = Math.floor(Math.min( maxTextureSize, a ));
		var m:Int;
        
        while ((1 << n) >= slotWidth)
        {
 	        m = Math.floor(Math.min( maxTextureSize, a - n + 1 ));
            while ((1 << m) >= slotHeight)
            {
                //trace('  $n,$m - ${1<<n} w ${1<<m}');  
                if (Math.floor((1 << n) / slotWidth) * Math.floor((1 << m) / slotHeight) < slots) break;
				
                r = ( (1 << n) * (1 << m) ) - (slots * slotWidth * slotHeight);    //trace('$r');   
				
				if (r < 0) break;
				
                if (r <= rmin)
                {
                    if (r == rmin)
                    {
                        if (Math.abs(n - m) < delta)
                        {
                            delta = Math.floor(Math.abs(n - m));
                            w = n; h = m;
                            found = true;
                        }
                    }
                    else
                    {
                        w = n; h = m;
                        rmin = r;
                        found = true;
                    } 
                    //trace('$r  -  $n,$m - ${1<<n} w ${1<<m}');
                }
                m--;
            }
            n--;
        }
    	
		var param:Dynamic = {};
        if (found)
        {
            //trace('optimal:$w,$h - ${1<<w} x ${1<<h}');
            param.sx = Math.floor((1 << w) / slotWidth);
            param.sy = Math.floor((1 << h) / slotHeight);
			param.slots = param.sx * param.sy;
			param.w = 1 << w;
			param.h = 1 << h;
            trace('${param.sx * param.sy} Slots (${param.sx} * ${param.sy}) on ${1<<w} x ${1<<h} Texture'); 
        }
        else
		{
			param = null;
			trace("Error: no possible texture size");
			
		}
		return(param);
		
    }
}