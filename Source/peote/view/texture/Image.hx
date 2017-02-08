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

package peote.view.texture;

//import format.png.Reader;
//import format.png.Tools;
import lime.app.Future;
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
	
	// TODO: priority of how much used keep time
	public var used:Int = 0;
	
	public var tx:Int=0;
	public var ty:Int=0;
	public var tw:Int=0;
	public var th:Int=0;
	
	public var x:Int=0;
	public var y:Int=0;
	public var w:Int=0;
	public var h:Int=0;

	public var r:Float=0.0;
	public var g:Float=0.0;
	public var b:Float=0.0;
	public var a:Float=0.0;
	
	public var fit:String = "none"; // "in", "out", "exact"
	public var scaleUp:Bool = true;
	public var keep:Bool = false;
	
	public function new(param:ImageParam, texture:Texture) 
	{
		url = param.filename;
		this.texture = texture;
		
		if (param.x != null) x = param.x;
		if (param.y != null) y = param.y;
		
		//if (param.w != null) w = param.w else w = texture.slotWidth;
		//if (param.h != null) h = param.h else h = texture.slotHeight;
		if (param.w != null) w = param.w;
		if (param.h != null) h = param.h;

		if (param.r != null) r = param.r;
		if (param.g != null) g = param.g;
		if (param.b != null) b = param.b;
		if (param.a != null) a = param.a;
		
		trace("new IMAGE:",w,h);
		
		if (param.slot != null) slot = param.slot;
		if (param.fit != null)
		{
			if (param.fit == "none" || param.fit == "in" || param.fit == "out" || param.fit == "exact" )
			{
				fit = param.fit;
			}
			else trace("Error: Image fit parameter can only be 'none|in|out|exact'");
		}
		if (param.scaleUp != null) scaleUp = param.scaleUp;
		if (param.keep != null) keep = param.keep;
		
		
	}
	
	// TODO: how to cancel loading ?
	#if js
	public function load(onload:Image->UInt8Array->Void, onerror:String->Void):Void
	{
		
		var image:js.html.ImageElement = js.Browser.document.createImageElement();
		image.onload = function(a)
		{
			//onload( this, image.width, image.height,  resize(image) );
			onload( this, resize(image) );
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
	public function load(onload:Image->UInt8Array->Void, onerror:String->Void):Void
	{
		
		if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) // load throught proxy
		{
			// load data from url
			var req = new haxe.Http(url);
			req.onError = onerror;
			req.onData = function (bytes) {
				var image:lime.graphics.Image = lime.graphics.Image.fromBytes(Bytes.ofString(bytes));
				//onload( this, image.width, image.height,  resize(image) );
				onload( this, resize(image) );
			};
			req.request(false);
			
		}
		else
		{
			// load from assets
			var future = Assets.loadImage(url,false); // TODO -> WINDOWS CPP -> NULL POINTER if cache=true
			//future.onProgress (function (progress) trace ("Loading Image Progress: " + progress));
			future.onError (onerror);
			
			future.onComplete (function (image) {
				onload( this, resize(image) );
			});
			
		}
		
	}
	#end
	
	
	function resize(#if js image:js.html.ImageElement #else image:lime.graphics.Image #end):UInt8Array
	{
		var sourceWidth:Int  = image.width;
		var sourceHeight:Int = image.height;
		
		if (w == 0) w = sourceWidth;
		if (h == 0) h = sourceHeight;
		
		var destWidth:Int;
		var destHeight:Int;
		
		var left:Int = 0;
		var right:Int = 0;
		var top:Int = 0;
		var bottom:Int = 0;
		
		if (fit == "in") // ---------------------------------------------------------------------------
		{
			tw = destWidth  = texture.slotWidth;
			th = destHeight = texture.slotHeight;
			if (sourceWidth/sourceHeight < destWidth/destHeight)
			{
				left = right = Math.floor( (destWidth - destHeight * sourceWidth / sourceHeight) / 2 );
			}
			else
			{
				top = bottom = Math.floor( (destHeight - destWidth * sourceHeight / sourceWidth) / 2 );
			}
			tx = (slot % texture.slotsX) * texture.slotWidth;
			ty = Math.floor(slot / texture.slotsX) * texture.slotHeight;
			if (keep)
			{
				tx += left;
				ty += top;
				tw = destWidth   = texture.slotWidth  - left - right ;
				th = destHeight  = texture.slotHeight - top  - bottom ;
				left = right = top = bottom = 0;
			}
		}
		else if (fit == "out") // ----------------------------------------------------------------------
		{
			tw = destWidth  = texture.slotWidth;
			th = destHeight = texture.slotHeight;
			if (destWidth/destHeight < sourceWidth/sourceHeight)
			{
				//left = right = - Math.floor( (sourceWidth - sourceHeight * destWidth / destHeight) / 2 );
				left = right = Math.floor( (destWidth - destHeight * sourceWidth / sourceHeight) / 2 );
			}
			else
			{
				//top = bottom = - Math.floor( (sourceHeight - sourceWidth * destHeight / destWidth) / 2 );
				top = bottom = Math.floor( (destHeight - destWidth * sourceHeight / sourceWidth) / 2 );
			}
			tx = (slot % texture.slotsX) * texture.slotWidth;
			ty = Math.floor(slot / texture.slotsX) * texture.slotHeight;
		}
		else if (fit == "exact") // --------------------------------------------------------------------
		{
			tw = destWidth  = texture.slotWidth;
			th = destHeight = texture.slotHeight;
			tx = (slot % texture.slotsX) * texture.slotWidth;
			ty = Math.floor(slot / texture.slotsX) * texture.slotHeight;
		}
		else // ----------------------------------------------------------------------------------------
		{
			left = x;
			right  = texture.slotWidth - w  - left;
			top  = y;
			bottom = texture.slotHeight - h - top;
			
			tw = destWidth  = texture.slotWidth;
			th = destHeight = texture.slotHeight;
			tx = (slot % texture.slotsX) * texture.slotWidth;
			ty = Math.floor(slot / texture.slotsX) * texture.slotHeight;
			
			if (keep) // TODO : optimize
			{
				
				tx = Math.floor(Math.max(tx, tx +left));
				ty = Math.floor(Math.max(ty, ty +top));
				tw = destWidth = destWidth - Math.floor(Math.max(0, left)) - Math.floor(Math.max(0, right));
				th = destHeight = destHeight - Math.floor(Math.max(0, top)) - Math.floor(Math.max(0, bottom));
				left = Math.floor(Math.min(0, left));
				right = Math.floor(Math.min(0, right));
				top = Math.floor(Math.min(0, top));
				bottom = Math.floor(Math.min(0, bottom));
			}
			x = left;
			y = top;
		}
		
		trace('============> tx=$tx, ty=$ty - tw=$tw, th=$th');
		trace('sourceWidth=$sourceWidth, sourceHeight=$sourceHeight - destWidth=$destWidth, destHeight=$destHeight');
		trace('left=$left, right=$right - top=$top, bottom=$bottom');
		// -------------------- Javascript ----------------------
		#if js
		var tmp_canvas = js.Browser.document.createCanvasElement();
		tmp_canvas.width = destWidth;
		tmp_canvas.height = destHeight;
		
		var tmp_context = tmp_canvas.getContext2d();
		//tmp_context.globalCompositeOperation = 'source-over';
		tmp_context.fillStyle = "rgba("+Math.round(r*255)+","+Math.round(g*255)+","+Math.round(b*255)+","+a+")";
		tmp_context.clearRect( 0, 0, destWidth, destHeight );
		tmp_context.fillRect( 0, 0, destWidth, destHeight );
		tmp_context.drawImage( image, 0, 0, sourceWidth, sourceHeight, left, top, destWidth-left-right, destHeight-top-bottom );
		
		var destData:UInt8Array = new UInt8Array( tmp_context.getImageData( 0, 0, destWidth, destHeight ).data );
		
		tmp_canvas = null;
		tmp_context = null;
		#else
		// -------------------- cpp ----------------------
		
		var sourceData:UInt8Array = image.data;
		var destData:UInt8Array = new UInt8Array(destWidth * destHeight * 4);
		
		// optimize if no scaling:
		if (sourceWidth == destWidth-left-right && sourceHeight == destHeight-top-bottom )
		{	
			var pos, pos_src:Int;
			var j:Int, i:Int;
			for (j in Math.floor(Math.max(0,top))...destHeight - Math.floor(Math.max(0,bottom)))
				for (i in Math.floor(Math.max(0,left))...destWidth - Math.floor(Math.max(0,right)) )
				{
					pos_src = ( i - left + (j - top) * sourceWidth) * 4;
					pos = (i + j*destWidth) * 4;
					
					destData[pos]     = sourceData[pos_src];
					destData[pos + 1] = sourceData[pos_src + 1];
					destData[pos + 2] = sourceData[pos_src + 2];
					destData[pos + 3] = sourceData[pos_src + 3];
				}
			
		}
		else // hermite image sampling algorythm	
		{	
			var ratio_w:Float = sourceWidth  / ( destWidth  - left - right  );
			var ratio_h:Float = sourceHeight / ( destHeight - top  - bottom );
			
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

			for (j in Math.floor(Math.max(0,top))...destHeight - Math.floor(Math.max(0,bottom)))
			{
				for (i in Math.floor(Math.max(0,left))...destWidth - Math.floor(Math.max(0,right)) )
				{
					color_weight = 0.0;
					alpha_weight = 0.0;
					red   = 0.0;
					green = 0.0;
					blue  = 0.0;
					alpha = 0.0;
					
					y_midle = ((j - top) + 0.5) * ratio_h;
					
					for (y in Math.floor((j - top) * ratio_h)...Math.ceil(((j - top) + 1) * ratio_h))
					{
						dydy = Math.abs(y_midle - (y + 0.5)) / ratio_h_half;
						dydy = dydy * dydy;
						
						x_midle = ((i - left) + 0.5) * ratio_w;
						
						for (x in Math.floor((i - left) * ratio_w)...Math.ceil(((i - left) + 1) * ratio_w))
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
					
					pos = (i + j*destWidth) * 4;
					/*destData[pos]     = Math.round(red   / color_weight);
					destData[pos + 1] = Math.round(green / color_weight);
					destData[pos + 2] = Math.round(blue  / color_weight);
					destData[pos + 3] = Math.round(alpha / alpha_weight);
					*/
					var fac:Float = alpha / alpha_weight / 255;
					if (fac == 0.0)
					{
						destData[pos]   = Math.round(r * 255);
						destData[pos+1] = Math.round(g * 255);
						destData[pos+2] = Math.round(b * 255);
						destData[pos+3] = Math.round(a * 255);
					}
					else 
					{
						// TODO: not same as in JS source-over
						destData[pos]     = Math.round(Math.max(0,Math.min(255, (red   / color_weight) + r * 255 * (1.0 - fac))));
						destData[pos + 1] = Math.round(Math.max(0,Math.min(255, (green / color_weight) + g * 255 * (1.0 - fac))));
						destData[pos + 2] = Math.round(Math.max(0,Math.min(255, (blue  / color_weight) + b * 255 * (1.0 - fac))));
						destData[pos + 3] = Math.round(Math.max(0,Math.min(255, (alpha / alpha_weight) + a * 255 * (1.0 - fac))));
						
						// premultiplied didnt work good
						//destData[pos]     = Math.round(Math.max(0,Math.min(255, fac * (red   / color_weight) + r * 255 * (1.0 - fac))));
						//destData[pos + 1] = Math.round(Math.max(0,Math.min(255, fac * (green / color_weight) + g * 255 * (1.0 - fac))));
						//destData[pos + 2] = Math.round(Math.max(0,Math.min(255, fac * (blue  / color_weight) + b * 255 * (1.0 - fac))));
						//destData[pos + 3] = Math.round(Math.max(0,Math.min(255,  fac * (alpha / alpha_weight) + a * 255 * (1.0 - fac))));
					}
				}
			}
			
			// fill border
			for (j in 0...Math.floor(Math.max(0,top)) )
			{
				for (i in 0...destWidth )
				{
					pos = (i + j*destWidth) * 4;
					destData[pos]   = Math.round(r * 255);
					destData[pos+1] = Math.round(g * 255);
					destData[pos+2] = Math.round(b * 255);
					destData[pos+3] = Math.round(a * 255);
				}
			}
			for (j in destHeight - Math.floor(Math.max(0,bottom))...destHeight )
			{
				for (i in 0...destWidth )
				{
					pos = (i + j*destWidth) * 4;
					destData[pos]   = Math.round(r * 255);
					destData[pos+1] = Math.round(g * 255);
					destData[pos+2] = Math.round(b * 255);
					destData[pos+3] = Math.round(a * 255);
				}
			}
			for (j in Math.floor(Math.max(0,top))...destHeight - Math.floor(Math.max(0,bottom)))
			{
				for (i in 0...Math.floor(Math.max(0,left)) )
				{
					pos = (i + j*destWidth) * 4;
					destData[pos]   = Math.round(r * 255);
					destData[pos+1] = Math.round(g * 255);
					destData[pos+2] = Math.round(b * 255);
					destData[pos+3] = Math.round(a * 255);
				}
			}
			for (j in Math.floor(Math.max(0,top))...destHeight - Math.floor(Math.max(0,bottom)))
			{
				for (i in destWidth - Math.floor(Math.max(0,right))...destWidth )
				{
					pos = (i + j*destWidth) * 4;
					destData[pos]   = Math.round(r * 255);
					destData[pos+1] = Math.round(g * 255);
					destData[pos+2] = Math.round(b * 255);
					destData[pos+3] = Math.round(a * 255);
				}
			}
			
		}
		#end
		return(destData);
	}
}