/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o        o      o   
 *      o-o-o  o-o   o    o    o-o  
 *     o      o     (_\    o      o 
 *    o      o-o     |\     o    o-o
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

package samples;

import haxe.Timer;
import haxe.Utf8;
#if cpp
import sys.io.File;
#end

import lime.Assets;
import haxe.io.Bytes;

import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;

import Map;

class GlyphUnicodeTextRendering extends Sample
{
	var element_nr:Int = 0;
	public override function run() 
	{
		// set Time
		startTime = Timer.stamp();
					
		peoteView = new PeoteView({
			maxDisplaylists:    10,
			maxPrograms:        10,
			maxTextures:        10,
			maxImages:          10
		});
		
		// -----------------------------------------------------
		// --------------------- TEXTURECACHES -----------------
		// -----------------------------------------------------
		
		peoteView.setTexture( {
			texture: 0,
			w:   2048,        // Texture width
			h:   1994,        // Texture height
			//mipmaps:true, minFilter:1, magFilter:1,
			magFilter:1,
		});
		
		// -----------------------------------------------------
		// ------------------- IMAGES --------------------------
		// -----------------------------------------------------
		
		peoteView.setImage( {
			image: 0,
			texture:0,
			filename: "assets/unifont/unifont_0000.png",
			x:0, y:0,
			w:   2048,        // Texture width
			h:   1994,        // Texture height
			//preload:true
		});
		
		// -----------------------------------------------------
		// ---------------- PROGRAM SHADER ---------------------
		// -----------------------------------------------------
		peoteView.setProgram( {
			program: 0,
			texture: 0,
			#if cpp
			fshader:'assets/gl3font_standard_derivates.frag',
			#else
			fshader:'assets/gl3font.frag',
			#end
			vshader:'assets/unifont/smooth.vert'
		});
		
		
		// -----------------------------------------------------
		// ---------------- DISPLAYLISTS -----------------------
		// -----------------------------------------------------
		peoteView.setDisplaylist( {
			displaylist: 0,
			type: DType.RGBA | DType.ANIM | DType.ROTATION,
			
			maxElements:       10000,
			bufferSegmentSize: 10000,
			bufferSegments:        1,
			
			x: 0, y: 0,

			renderBackground:true,

			r:0.1, g:0, b:0, //a:0.8,
			blend:1 // alpha blending
		});
		
		// -----------------------------------------------------
		// ---------------- ELEMENTS ---------------------------
		// -----------------------------------------------------		

		//var fontinfo:FontInfo = new FontInfo("assets/DejavuSans.dat", function(info:FontInfo) {
		var fontinfo:FontInfo = new FontInfo("assets/unifont/unifont_0000.dat", onFontInfoLoad);
		
	}
	public function onFontInfoLoad(info:FontInfo)
	{
			trace ("Loaded Fontdata complete");
			//var ts:Int = 1024;
			var tw:Int = 2048;
			var th:Int = 1994;
			
			renderTextLine("PeoteView glyph textrendering with ttfcompiled Unifont:", info, 18, -10, 24, tw, th); 
			renderTextLine("----------------------------------------------------------------------------------", info, 18, 20, 16, tw, th); 
			
			var i:Int = 0;
			var l:Int = 40;
			var s = new haxe.Utf8();
			for (char in info.idmap)
			{
				s.addChar( char );
				i++;
				if (i > 100) {
					renderTextLine(s.toString(), info, 20, l, 24, tw, th);
					i = 0; s = new haxe.Utf8(); l += 26;
				}
			}		
	}
	public function renderTextLine(s:String, info:FontInfo, x:Int, y:Int, scale:Float, texturewidth:Int, textureheight:Int):Void
	{	

		var first:Bool = true;
		var penX:Int = x;
		var penY:Int = y+Math.ceil(scale);
		var prev_id:Int = 0;
		var scale:Float = scale;
		
		Utf8.iter(s, function(charcode)	{
			
			var t:Float = Timer.stamp() - startTime;
			var id:Null<Int> = info.idmap.get(charcode);
			
			if (id != null) {
				
				if (!first)	{
					penX += Math.ceil(info.kerning[prev_id][id] * scale);
					//trace("kerning to left letter: " + Math.round(info.kerning[prev_id][id]* scale) );
				}
				else first = false;
				
				prev_id = id;
				var w:Float = info.metrics[id].width  * scale;
				var h:Float = info.metrics[id].height * scale;
				var tx:Float = info.metrics[id].u * texturewidth ;
				var ty:Float = info.metrics[id].v * textureheight;
				var tw:Float = info.metrics[id].w * texturewidth ;
				var th:Float = info.metrics[id].h * textureheight;
				//trace(charcode, "h:"+info.metrics[id].height, "t:"+info.metrics[id].top );
				
				var startx:Int = random(2000) - 800;
				var starty:Int = random(1000) - 400;
				peoteView.setElement({
					element:element_nr++,
					x:startx,
					y:starty,
					w:Math.ceil(w*4),
					h:Math.ceil(h*4),
					rgba:random(256) << 24 | random(256) << 16 | random(256) << 8 | 128+random(128),
					rotation:2000-random(4000),
					pivotX:Math.ceil(w*2),
					pivotY:Math.ceil(h*2),
					time:t,
					end: {
						x:Math.floor((penX + info.metrics[id].left * scale )),
						y:Math.floor((penY + ( info.height - info.metrics[id].top ) * scale )),
						
						w:Math.ceil(w),
						h:Math.ceil(h),
						rgba:0xFEFD12FF,
						rotation:0,
						pivotX:Math.ceil(w / 2),
						pivotY:Math.ceil(h / 2),
						time:t + 1 + (startx+starty)/2000
					},
					displaylist:0,
					program:0,
					tx:Math.floor(tx),
					ty:Math.floor(ty),
					tw:Math.ceil(tw),
					th:Math.ceil(th),
					image:0,
				});
				penX += Math.ceil(info.metrics[id].advance * scale);
			}
			
		});
		
	}
}

// thanks to deltalucas gl3font lib -> https://github.com/deltaluca/gl3font

class FontInfo {
    public var idmap:OrderedMap<Int,Int>; // map glyph to id

    public var metrics:Array<Metric>;
    public var kerning:Array<Array<Float>>;

    public var height:Float;
    public var ascender:Float;
    public var descender:Float;

	var onload: FontInfo->Void;
	
    public function new(file:String, onload:FontInfo->Void) {
		this.onload = onload;
		#if cpp
		onComplete(File.getBytes(file));
		#else
		var future = Assets.loadBytes(file);
		//future.onProgress (function (progress,i) trace ("Loading Fontdata Progress: " + progress,i));
		future.onError (function (msg) trace ("Loading Fontdata Error: " + msg));
		future.onComplete (onComplete);
		#end
	}
	
	public function onComplete(f:Bytes) {
			
			var pos:Int = 0;
			var N:Int = f.getInt32(pos); pos += 4; trace('number of glyphes: $N');
			height    = f.getFloat(pos); pos += 4; trace('height: $height');
			ascender  = f.getFloat(pos); pos += 4; trace('ascender: $ascender');
			descender = f.getFloat(pos); pos += 4; trace('descender: $descender');
			idmap = new OrderedMap<Int,Int>( new Map<Int,Int>() );
			metrics = [for (i in 0...N) {
				idmap.set(f.getInt32(pos), i); pos += 4;
				var m:Metric = {
					advance : f.getFloat(pos),
					left    : f.getFloat(pos+4),
					top     : f.getFloat(pos+8),
					width   : f.getFloat(pos+12),
					height  : f.getFloat(pos+16),
					u       : f.getFloat(pos+20),
					v       : f.getFloat(pos+24),
					w       : f.getFloat(pos+28),
					h       : f.getFloat(pos+32)
				};
				pos += 36;
				m;
			}];
			var y = 0; var x = 0;
			var kern = []; kerning = [kern];
			while (x < N && y < N) {
				var k = f.getFloat(pos); pos += 4;
				var amount:Int = f.getInt32(pos); pos += 4;
				//trace("kerning:" + k + " amount:"+amount);
				for (i in 0...amount) {
					kern[x++] = k;
					if (x == N) {
						x = 0;
						kerning.push(kern = []);
						y++;
					}
				}
			}
			onload(this);
	}
}

typedef Metric = {
    advance:Float,
    left:Float,
    top:Float,
    width:Float,
    height:Float,
    u:Float,
    v:Float,
    w:Float,
    h:Float
}


class OrderedMapIterator<K,V> {

    var map : OrderedMap<K,V>;
    var index : Int = 0;

    public function new(omap:OrderedMap<K,V>)
        map = omap;
    public function hasNext() : Bool
        return index < map._keys.length;
    public function next() : V
        return map.get( map._keys[index++] );

} //OrderedMapIterator

class OrderedMap<K, V> implements IMap<K, V> {

    var map:Map<K, V>;
    @:allow(OrderedMapIterator)
    public var _keys:Array<K>;
    var idx = 0;

    public function new(_map) {
       _keys = [];
       map = _map;
    }

    public function set(key, value) {
        if (!map.exists(key)) _keys.push(key);
        map[key] = value;
    }

    public function toString() {
        var _ret = ''; var _cnt = 0; var _len = _keys.length;
        for(k in _keys) _ret += '$k => ${map.get(k)}${(_cnt++<_len-1?", ":"")}';
        return '{$_ret}';
    }

    public function iterator()          return new OrderedMapIterator<K,V>(this);
    public function remove(key)         return map.remove(key) && _keys.remove(key);
    public function exists(key)         return map.exists(key);
    public function get(key)            return map.get(key);
    public inline function keys()       return _keys.iterator();

} //OrderedMap