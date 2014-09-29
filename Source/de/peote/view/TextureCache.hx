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

package de.peote.view;

import haxe.ds.Vector;
import lime.gl.GL;
import lime.gl.GLTexture;
import lime.utils.UInt8Array;

class TextureCache
{
	public var texture:GLTexture = null;
	public var image:Vector<Image>;
	public var unused_images:Array<Int>;
	
	public var segment_holes:Holes;
	
	public var max_texture_size:Int;
	
	public var max_h_segments:Int;
	public var max_v_segments:Int;
	
	public var segment_width:Int;
	public var segment_height:Int;
	
	public var onLoad_callback:Int->Int->Int->Image->Void;
	
	public function new(img_width:Int, img_height:Int, max_images:Int, onLoad:Int->Int->Int->Image->Void) 
	{
		onLoad_callback = onLoad;
		segment_width = img_width;
		segment_height = img_height;
		
		//max_texture_size = GL.getParameter(GL.MAX_TEXTURE_SIZE);
		max_texture_size = 2048; // TODO: firefox and MAX_TEXTURE_SIZE 16384 prbl. on windows
		
		image = new Vector<Image>(max_images); // TODO: checken max_images <= max_h_segments*max_v_segments
		unused_images = new Array<Int>();
		
		// TODO: default Image
		
		max_h_segments = Math.floor(max_texture_size / segment_width);
		max_v_segments = Math.floor(max_texture_size / segment_height);
		
		segment_holes = new Holes(max_images);
		//trace("TextureCache: max_h_segments*segment_width=" + max_h_segments*segment_width + " max_v_segments*segment_height=" + max_v_segments*segment_height);
		
		texture = Texture.createEmptyTexture(max_h_segments*segment_width, max_v_segments*segment_height);
	}
	
	public function onerror(msg:String):Void {  trace(msg); }
	
	public inline function setImage(image_nr:Int, imageUrl:String):Void 
	{
		image.set(image_nr, new Image(imageUrl));
	}
	
	public inline function getImage(image_nr:Int):Image 
	{
		return image.get(image_nr);	
	}
	
	public inline function loadImage(element_nr:Int, image_nr:Int,  tile_nr:Int):Void 
	{
		var img:Image = image.get(image_nr);
		
		img.element_nr.push(element_nr);
		img.image_nr.push(image_nr);
		img.tile_nr.push(tile_nr);
		
		if (img.cache_nr == -2)
		{
			img.cache_nr = -1;
			img.load(onImageLoad, onerror);
		}
	}
	
	private function onImageLoad(img:Image, w:Int, h:Int, data:UInt8Array):Void
	{
		if (segment_holes.is_full())
		{
			trace("TextureCache is FULL"); // TODO
		}
		var holePos:Int = segment_holes.getHole();
		
		img.tx = (holePos % max_h_segments) / max_h_segments;
		img.ty = Math.floor(holePos / max_h_segments) / max_v_segments;
		
		img.tw = w / (max_h_segments*segment_width);
		img.th = h / (max_v_segments*segment_height);
	
		Texture.createSubTexture(texture,
				(holePos % max_h_segments) * segment_width,
				Math.floor(holePos / max_h_segments) * segment_height,
				w, h, data
		);
		
		while (img.element_nr.length > 0) onLoad_callback(img.element_nr.pop(), img.image_nr.pop(), img.tile_nr.pop(), img);
			
		img.cache_nr = holePos;
	}
	
	public function delUnusedImage(image_nr:Int):Void 
	{
		var img:Image = image.get(image_nr);
		if (img.used-- == 1)
		{
			// last used
			if (segment_holes.is_full())
			{
				segment_holes.addHole( img.cache_nr );
				img.cache_nr = -2;
			}
		}
	}
	
}