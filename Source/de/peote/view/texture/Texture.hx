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

package de.peote.view.texture;

import haxe.ds.IntMap;
import haxe.ds.Vector;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLTexture;
import lime.utils.UInt8Array;

import de.peote.tools.Holes;

class Texture
{
	public var texture:GLTexture;
	
	public var segment_holes:Holes;
	
	public var max_texture_width:Int;
	public var max_texture_height:Int;
	
	public var max_h_segments:Int;
	public var max_v_segments:Int;
	
	public var segment_width:Int;
	public var segment_height:Int;
	
	public function new(param:TextureParam) 
	{
		segment_width = param.iw;
		segment_height = param.ih;

		// TODO TODO TODO
		//max_texture_size = Math.floor( GL.getParameter(GL.MAX_TEXTURE_SIZE)  );
		max_texture_width = param.w;
		max_texture_height = param.h;
		
		max_h_segments = Math.floor(max_texture_width / segment_width);
		max_v_segments = Math.floor(max_texture_height / segment_height);
		
		segment_holes = new Holes(max_h_segments*max_v_segments);
		trace("TextureCache: max_h_segments=" + max_h_segments + " segment_width=" + segment_width
			+ " max_v_segments="+max_v_segments+" segment_height=" + segment_height);
		
		// TODO
		texture = createEmptyTexture(max_h_segments*segment_width, max_v_segments*segment_height);
	}
	
	public inline function isFull():Bool 
	{
		return(segment_holes.is_full());
	}
		
	public inline function reserveImageSlot(img:Image):Void
	{
		img.holePos = segment_holes.getHole();
		img.tx = (img.holePos % max_h_segments) * segment_width;
		img.ty = Math.floor(img.holePos / max_h_segments) * segment_height;
	}
		
	public inline function storeImage(img:Image, w:Int, h:Int, data:UInt8Array):Void
	{
		createSubTexture( texture,
			(img.holePos % max_h_segments) * segment_width,
			Math.floor(img.holePos / max_h_segments) * segment_height,
			w, h, data
		);
	}
	
	public inline function freeImage(img:Image):Void 
	{	
		segment_holes.addHole( img.holePos );
	}
	
	public static inline function createEmptyTexture(width:Int, height:Int):GLTexture
	{
		var t:GLTexture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, t);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, width, height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		
		//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		
		//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);
		
		//GL.generateMipmap(GL.TEXTURE_2D);
		GL.bindTexture(GL.TEXTURE_2D, null);
		return t;
	}
	
	private inline function createSubTexture(t:GLTexture, x:Int, y:Int, w:Int, h:Int, data:UInt8Array):Void
	{
		GL.bindTexture(GL.TEXTURE_2D, t);
		//GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, w, h, 0, GL.RGBA, GL.UNSIGNED_BYTE, data);
		GL.texSubImage2D(GL.TEXTURE_2D, 0, x, y, w, h, GL.RGBA, GL.UNSIGNED_BYTE, data);
		GL.bindTexture(GL.TEXTURE_2D, null);
	}
	
}