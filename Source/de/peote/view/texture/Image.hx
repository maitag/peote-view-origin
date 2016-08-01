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
import lime.graphics.opengl.GLTexture;

import haxe.io.BytesInput;
import haxe.io.Bytes;

import lime.utils.UInt8Array;
import lime.Assets;

#if js
import js.Browser;
import js.html.ImageElement;
import js.html.FileReader;
import js.html.XMLHttpRequestResponseType;
#else
//import lime.net.HTTPRequest;
//import haxe.remoting.HttpAsyncConnection;
#end

class Image
{
	
	public var url:String="";
	public var texture:Texture;
	public var slot:Int = -1;
	
	// TODO: priority of how much used over time
	public var used:Int = 0;
	
	public var tx:Int;
	public var ty:Int;
	public var tw:Int;
	public var th:Int;
	
	public function new(param:ImageParam, texture:Texture) 
	{
		url = param.filename;
		if (param.slot != null) slot = param.slot;
		this.texture = texture;
		tw = texture.slotWidth;
		th = texture.slotHeight;
	}
	
	// TODO: how to cancel loading ?
	#if js
	public function load(onload:Image->Int->Int->UInt8Array->Void, onerror:String->Void):Void
	{
		
		var image:js.html.ImageElement = js.Browser.document.createImageElement();
		image.onload = function(a)
		{
			try
			{
				var tmp_canvas = js.Browser.document.createCanvasElement();
				tmp_canvas.width = tw;// image.width; 
				tmp_canvas.height = th;// image.height;
				
				// center + keep aspect -> TODO: more fitting options here
				var dx:Int = 0;
				var dy:Int = 0;
				if (image.width/image.height < tw/th)
				{
					dx = Math.floor( (tw - th * image.width / image.height)/2 ); //trace("DX:"+dx);
				}
				else
				{
					dy = Math.floor( (th - tw * image.height / image.width)/2 ); //trace("DY:"+dy);
				}
				
				var tmp_context = tmp_canvas.getContext2d();
				tmp_context.clearRect( 0, 0, tmp_canvas.width, tmp_canvas.height );
				tmp_context.drawImage( image, 0, 0, image.width, image.height, dx, dy, tmp_canvas.width-dx*2, tmp_canvas.height-dy*2 );
				
				var image_bytes = tmp_context.getImageData( 0, 0, tmp_canvas.width, tmp_canvas.height );
				var imageData:UInt8Array = new UInt8Array( image_bytes.data );
				
				tmp_canvas = null;
				tmp_context = null;
				image_bytes = null;
				
				onload(this, tw, th, imageData);
				imageData = null;
			}
			catch(e:Dynamic) { onerror(e); }
		}
		
		if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) // load throught proxy
		{
			var x = js.Browser.createXMLHttpRequest();
			x.open('GET', '//cors-anywhere.herokuapp.com/'+url); // TODO: custom cors-server and same-domain-handling
			x.responseType = XMLHttpRequestResponseType.BLOB;
			x.onload = function() {
				var blob = x.response;
				var fr = new FileReader();
				fr.onloadend = function() {
					image.src = fr.result;
				};
				fr.readAsDataURL(blob);
			};
			x.send();
		}
		else
		{
			image.src = url;			
		}
		
		
	}
	#else
	public function load(onload:Image->Int->Int->UInt8Array->Void, onerror:String->Void):Void
	{
		
		// TODO: load data from url per http
		if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) // load throught proxy
		{
			//trace ("load data from url "+url);
			// crashes on windows 7
			/*
			var req = new lime.net.HTTPRequest();
			var future =  req.load(url);
			future.onProgress (function (progress) trace ("Loading Image Progress: " + progress));
			future.onError (onerror);
			future.onComplete (function (bytes) {
				trace ("Loaded:"+bytes);
				//onload(this, tw, th, resize( image.data, image.width, image.height, tw, th ) );
			});
			*/
			
			
			var req = new haxe.Http(url);
			req.onError = onerror;
			req.onData = function (bytes) {
				//trace ("Loaded");
				
				// jpg and png
				var image:lime.graphics.Image = lime.graphics.Image.fromBytes(Bytes.ofString(bytes));
				onload(this, tw, th, resize( image.data, image.width, image.height, tw, th ) );
				
				// other formats may later with format lib
				/*
				var byteInput:BytesInput = new BytesInput ( Bytes.ofString(bytes), 0, bytes.length );

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
				onload(this, tw, th, resize( imageData, header.width, header.height, tw, th ) );
				*/
				
				
			};
			req.request(false);
			
		}
		else
		{
			// load from assets
			var future = Assets.loadImage (url);
			future.onProgress (function (progress) trace ("Loading Image Progress: " + progress));
			future.onError (onerror);
			
			future.onComplete (function (image) {
				//trace ("Loaded");
				// resize
				onload(this, tw, th, resize( image.data, image.width, image.height, tw, th ) );
			});
			
			/*
			// old asset loading method (png only!!!) 
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
			*/
		}
	}
	#end
	
	function resize(sourceData:UInt8Array, sourceWidth:Int, sourceHeight:Int, destWidth:Int, destHeight:Int):UInt8Array
	{
		var destData:UInt8Array = new UInt8Array(destWidth * destHeight * 4);
		
		var delta_x:Int = 0;
		var delta_y:Int = 0;
		
		if (sourceWidth/sourceHeight < destWidth/destHeight)
		{
			delta_x = Math.floor( (destWidth - destHeight * sourceWidth / sourceHeight)/2 ); trace("DX:"+delta_x);
		}
		else
		{
			delta_y = Math.floor( (destHeight - destWidth * sourceHeight / sourceWidth)/2 ); trace("DY:"+delta_y);
		}
		//-> TODO: more fitting options
		//-> TODO: optimizing - no hermite scaling if fit
		
		destWidth  = destWidth  - 2 * delta_x;
		destHeight = destHeight - 2 * delta_y;
		
		// hermite image sampling algorythm
		
		var ratio_w:Float = sourceWidth / destWidth;
		var ratio_h:Float = sourceHeight / destHeight;
		
		var ratio_w_half:Int = Math.ceil(ratio_w/2);
		var ratio_h_half:Int = Math.ceil(ratio_h/2);
		
		// declare all vars at start to speed up
		var weight:Float;
		var color_weight:Float, alpha_weight:Float;
		var red:Float, green:Float, blue:Float, alpha:Float;
		var y_midle:Float, x_midle:Float;
		var dydy:Float, dx:Float, w:Float;
		var pos:Int;
		var j:Int, i:Int, y:Int, x:Int;
		
		for (j in 0...destHeight)
		{
			for (i in 0...destWidth)
			{
				color_weight = 0.0;
				alpha_weight = 0.0;
				red   = 0.0;
				green = 0.0;
				blue  = 0.0;
				alpha = 0.0;
				
				y_midle = (j + 0.5) * ratio_h;
				
				for (y in Math.floor(j * ratio_h)...Math.ceil((j + 1) * ratio_h))
				{
					dydy = Math.abs(y_midle - (y + 0.5)) / ratio_h_half;
					dydy = dydy * dydy;
					
					x_midle = (i + 0.5) * ratio_w;
					
					for (x in Math.floor(i * ratio_w)...Math.ceil((i + 1) * ratio_w))
					{
						dx = Math.abs(x_midle - (x + 0.5)) / ratio_w_half;
						
						w = Math.sqrt(dydy + dx*dx);
						if ( Math.abs(w) <= 1.0 )
						{
							// hermite filter
							weight = 2.0 * w*w*w - 3.0*w*w + 1.0;
							if (weight > 0.0)
							{
								dx = 4.0 * (x + y * sourceWidth);
								
								// alpha weights
								alpha += weight * sourceData[Math.round(dx) + 3];
								alpha_weight += weight;
								if (sourceData[Math.round(dx) + 3] < 255)
								{
									weight = weight * sourceData[Math.round(dx) + 3] / 250.0;
								}
								
								// color weights								
								red   += weight * sourceData[Math.round(dx)];
								green += weight * sourceData[Math.round(dx) + 1];
								blue  += weight * sourceData[Math.round(dx) + 2];
								color_weight += weight;
								
							}
						}
					}		
				}
				
				// pos = (i + j*destWidth) * 4;
				// fitting in
				pos = (i + delta_x + (j + delta_y) * (destWidth + 2 * delta_x)) * 4;
				
				destData[pos]     = Math.round(red   / color_weight);
				destData[pos + 1] = Math.round(green / color_weight);
				destData[pos + 2] = Math.round(blue  / color_weight);
				destData[pos + 3] = Math.round(alpha / alpha_weight);
			}
		}
		return(destData);
	}
}