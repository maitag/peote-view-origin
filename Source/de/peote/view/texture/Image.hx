/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o  \|/   o    o-o   
 *     o      o     <O>    o      o  
 *    o      o-o            o    o-o 
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

import format.png.Reader;
import format.png.Tools;

import haxe.io.BytesInput;
import haxe.io.Bytes;

import lime.utils.UInt8Array;
import lime.Assets;

#if js
import js.Browser;
import js.html.ImageElement;
#end

class Image
{
	
	public var url:String="";
	public var holePos:Int = -1;
	
	public var used:Int = 0;
	// TODO: priority 
	
	public var tx:Int;
	public var ty:Int;
	public var tw:Int;
	public var th:Int;
	
	public function new(image_url:String, w:Int, h:Int) 
	{
		url = image_url;
		tw = w;
		th = h;
	}
	
	// TODO: how t ocancel loading ?
	#if js
	public function load(onload:Image->Int->Int->UInt8Array->Void, onerror:String->Void):Void
	{
		var image:js.html.ImageElement = js.Browser.document.createImageElement();
		image.onload = function(a)
		{
			try
			{
				var tmp_canvas = js.Browser.document.createCanvasElement();
				tmp_canvas.width = image.width; 
				tmp_canvas.height = image.height;
				
				var tmp_context = tmp_canvas.getContext2d();
				tmp_context.clearRect( 0,0, tmp_canvas.width, tmp_canvas.height );
				tmp_context.drawImage( image, 0, 0, image.width, image.height );
				
				var image_bytes = tmp_context.getImageData( 0, 0, tmp_canvas.width, tmp_canvas.height );
				var imageData:UInt8Array = new UInt8Array( image_bytes.data );
				
				tmp_canvas = null;
				tmp_context = null;
				image_bytes = null;
				
				onload(this, image.width, image.height, imageData);
				//imageData = null;
			}
			catch(e:Dynamic) { onerror(e); }
		}
		
		image.src = url;
	}
	#else
	public function load(onload:Image->Int->Int->UInt8Array->Void, onerror:String->Void):Void
	{
		var bytes:Bytes = Assets.getBytes(url);
		var byteInput:BytesInput = new BytesInput ( bytes, 0, bytes.length );
		var png = new Reader(byteInput).read();
		var data = Tools.extract32(png);
		var header = Tools.getHeader(png);
		
		var imageData:UInt8Array = new UInt8Array( data.getData() );
		
		// bgra	to rgba 
		for (i in 0 ... header.width * header.height)
		{
			var b = imageData[i*4+0];
			var g = imageData[i*4+1];
			var r = imageData[i*4+2];
			var a = imageData[i*4+3];
			imageData[i*4+0] = r;
			imageData[i*4+1] = g;
			imageData[i*4+2] = b;
			imageData[i*4+3] = a;
		}
		onload(this, header.width, header.height, imageData);
	}
	#end
}