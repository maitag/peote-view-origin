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

import de.peote.view.texture.Texture;
import haxe.ds.IntMap;
import haxe.ds.Vector;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLTexture;
import lime.utils.UInt8Array;

import de.peote.tools.Holes;

class TextureCache
{
	public var texture:GLTexture = null;
	public var image:Vector<Image>;
	public var unusedImages:IntMap<Bool>;
	
	public var segment_holes:Holes;
	
	public static var max_texture_size:Int;
	
	public var max_h_segments:Int;
	public var max_v_segments:Int;
	
	public var segment_width:Int;
	public var segment_height:Int;
	
	private var imgLoadQueue:Array<Image>;
	private var isLoading:Int = 0;
	
	public function new(img_width:Int, img_height:Int, max_images:Int) 
	{
		segment_width = img_width;
		segment_height = img_height;
		// TODO TODO TODO
		max_texture_size = Math.floor( GL.getParameter(GL.MAX_TEXTURE_SIZE) / 2 );
		//max_texture_size = 2048; // TODO: firefox and MAX_TEXTURE_SIZE 16384 prbl. on windows
		
		image = new Vector<Image>(max_images);
		unusedImages = new IntMap<Bool>();
		
		imgLoadQueue = new Array<Image>();
		
		// TODO: default Image
		
		max_h_segments = Math.floor(max_texture_size / segment_width);
		max_v_segments = Math.floor(max_texture_size / segment_height);
		
		segment_holes = new Holes(max_h_segments*max_v_segments);
		trace("TextureCache: max_h_segments=" + max_h_segments + " segment_width=" + segment_width
			+ " max_v_segments="+max_v_segments+" segment_height=" + segment_height);
		
		texture = Texture.createEmptyTexture(max_h_segments*segment_width, max_v_segments*segment_height);
	}
	
	public function onerror(msg:String):Void {  trace(msg); }
	
	public inline function setImage(image_nr:Int, imageUrl:String="", w:Int=0, h:Int=0):Void 
	{	
		if (w == 0) w = segment_width;
		if (h == 0) h = segment_height;
		image.set(image_nr, new Image(imageUrl, w, h) );
		// TODO: preload, onLoad 
		// TODO: if image inUse -> load queue
	}
	
	public inline function getImage(image_nr:Int):Image 
	{
		return image.get(image_nr);	
	}
	
	public inline function useImage(image_nr:Int):Image 
	{
		
		var img:Image = image.get(image_nr);		
		//trace("useImage: "+image_nr+" img.used= "+(img.used+1)+" ---");
		
		if (img.used++ == 0) // first use
		{	
			//trace(" first use");
			if (img.holePos == -1) // not loaded into GL Texture
			{
				if (segment_holes.is_full())
				{
					trace("TextureCache is FULL -> clear() ");
					if (clear() == 0)
					{
						trace(" ============ ERROR: TextureCache cant cleaned ==========");
						img = null;
					}
				}
				if (img != null)
				{
					img.holePos = segment_holes.getHole();
					img.tx = (img.holePos % max_h_segments) * segment_width;
					img.ty = Math.floor(img.holePos / max_h_segments) * segment_height;
					
					//trace("lade image " + image_nr + ", holePos:" + img.holePos );
					// img.load(onImageLoad, onerror);
					imgLoadQueue.push(img);
					if (img.url != "") startLoadQueue(); // to keep in simple ALL queued
				}
				
			}
			
		}
		
		return img;
	}
	
	public inline function unUseImage(image_nr:Int):Void 
	{
		var img:Image = image.get(image_nr);
		//trace("unUseImage: "+image_nr+" img.used="+(img.used-1)+"----");
		
		if (--img.used == 0) // no more in use
		{	//trace("  no more in use ");
			unusedImages.set(image_nr, true);
		}
	}
	
	private inline function startLoadQueue():Void
	{	
		if (isLoading++ == 0) imgLoadQueue.shift().load(onImageLoad, onerror);
	}
	
	private inline function loadNextImage():Void
	{	
		if (imgLoadQueue.length == 0) // TODO: possible race condition here ?
			isLoading = 0;
		else 
			imgLoadQueue.shift().load(onImageLoad, onerror);
	}
	
	private function onImageLoad(img:Image, w:Int, h:Int, data:UInt8Array):Void
	{
		//trace("onImageLoad: "+img.url+" to holePos:"+img.holePos+" ----"+ "("+Math.random()+")");
		if (img.holePos > -1)
		{
			Texture.createSubTexture(texture,
						(img.holePos % max_h_segments) * segment_width,
						Math.floor(img.holePos / max_h_segments) * segment_height,
						w, h, data
			);
		}
		loadNextImage();
	}
	
	public inline function clear():Int 
	{	
		//trace("delete unused Images from Cache");	
		// delete unused Images from Cache
		var numCleaned:Int = 0;
		var unusedImg:Image;
		for (i in unusedImages.keys())
		{
			//trace(" delete Image "+i+"  ---");
			// TODO: priority 
			unusedImages.remove(i); // TODO: problem removing inside loop?
			unusedImg = image.get(i);
			if (unusedImg.used == 0)
			{	//trace("    at holePos:"+unusedImg.holePos);
				segment_holes.addHole( unusedImg.holePos );
				unusedImg.holePos = -1;
				numCleaned++;
			}
		}
		return numCleaned;
	}
	
}