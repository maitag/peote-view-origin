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
import lime.utils.UInt8Array;


class ImageCache
{
	public var images:Vector<Image>;
	public var unusedImages:IntMap<Bool>;
	
	private var imgLoadQueue:Array<Image>;
	private var isLoading:Int = 0;
	
	private var textures:Vector<Texture>;
	
	public function new(max_imagess:Int, textures:Vector<Texture>) 
	{
		images = new Vector<Image>(max_imagess);
		unusedImages = new IntMap<Bool>();
		imgLoadQueue = new Array<Image>();
		this.textures = textures;
	}
	
	public function onerror(msg:String):Void {  trace(msg); }
	
	public inline function setImage(param:ImageParam):Void 
	{	
		if (param.texture == null) param.texture = 0; // default texture nr
		
		// TODO: onLoad callback
		
		
		var texture:Texture = textures.get(param.texture);

		// set autoSlots on first image ---------------
		if (texture.autoSlots == null)
		{
			if (param.slot == null && texture.slots > 1) texture.autoSlots = true;
			else texture.autoSlots = false;
		}

		if (texture.autoSlots == true )
		{
			if (param.slot != null) trace("Error, slot cant be set manually on autoSlots texture");
		}
		else // texture.autoSlots == false
		{
			if (param.slot == null && texture.slots == 1) param.slot = 0;
			if (param.slot == null) trace("Error, Image cant be inserted automatically into texture-slot. (autoslot-insert is on)");				
		}
		
		// -----------------------------------------------
		
		var img:Image = images.get(param.image);
		
		if (img == null)  // create new image --------------------
		{
			
			if (texture != null)
			{
				//if (param.w == null) param.w = texture.segment_width;
				//if (param.h == null) param.h = texture.segment_height;
				// TODO: load into defined texture-slot
				
				images.set(param.image, new Image(param, texture) );
				
				// preload
				if (param.preload || !texture.autoSlots) useImage(param.image); // TODO: optimize so useImage dont need to get again from vector
			}
			else trace ("Error: no texture specified to put images in");
			
			
		}
		else  // change something ---------------------------------
		{
			// change texture
			if (texture != null && texture != img.texture)
			{
				
				if (img.url == param.filename) 
				{
					// TODO: copy from one texture to another (if filename didnt change!)
				}
				else
				{
					// if some element using this image , there will be PROBLEM
					if (img.used > 0)
					{
						trace ("ERROR: texture-changing while image is in usage by element not implemented yet");
						// TODO
					}
					else
					{
						if (img.slot > -1 ) // not loaded into GL Texture yet
						{
							// TODO: copy from one texture to another
						}
					}
				}
				
			}
			
			
			// change file/url -> load new
			
			if (img.url != param.filename) 
			{
				img.url = param.filename;
				imgLoadQueue.push(img);
				startLoadQueue();
			}
		}
			
			
	}
	
	public inline function getImage(image_nr:Int):Image 
	{
		return images.get(image_nr);	
	}
	
	public inline function useImage(image_nr:Int):Image // by Element
	{
		
		var img:Image = images.get(image_nr);

		if (img != null)
		{
			//trace("useImage: "+image_nr+" img.used= "+(img.used+1)+" ---");
			if (img.used++ == 0) // first use
			{	
				//trace(" first use");
				if (img.slot == -1 || !img.texture.autoSlots) // not loaded into GL Texture yet
				{
					var success:Bool = true;
					if (img.texture.autoSlots)
					{
						if ( img.texture.isFull() )
						{
							trace("Texture is FULL OF IMAGES :) .. try to clear() ");
							if (clear() == 0) // try to clean up texture
							{
								trace(" ============ ERROR: Texture Space can't be cleaned and is FULL of used Images ==========");
								// TODO: create new Texture and store that number inside images
								success = false;
								// TODO: return null at end!
							}
						}
					}
					
					if (success)
					{
						img.texture.reserveImageSlot(img);
						imgLoadQueue.push(img);
						startLoadQueue();
					}
				}
			}
		}
		else trace("Error: image-number "+image_nr+" did not exist");
		
		return img;
	}
	
	public inline function unUseImage(image_nr:Int):Void // by Element
	{
		var img:Image = images.get(image_nr);
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
		trace("onImageLoad: " + img.url + " gl-texture: " + img.texture+" to holePos:" + img.slot + " w:" + w +" h:"+h);
		if (img.slot > -1)
		{
			img.texture.storeImage(img, data);
		}
		loadNextImage();
	}
	
	public inline function clear():Int 
	{	
		trace("delete unused Images from Cache");	
		// delete unused Images from Cache
		var numCleaned:Int = 0;
		var unusedImg:Image;
		for (i in unusedImages.keys())
		{
			//trace(" delete Image "+i+"  ---");
			// TODO: priority 
			unusedImages.remove(i); // TODO: problem removing inside loop?
			unusedImg = images.get(i);
			if (unusedImg.used == 0)
			{	//trace("    at holePos:"+unusedImg.holePos);
				unusedImg.texture.freeImage( unusedImg );
				unusedImg.slot = -1;
				numCleaned++;
			}
		}
		return numCleaned;
	}
	
}