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
import lime.ui.Window;
import lime.Assets;
import lime.utils.Bytes;

import de.peote.view.PeoteView;
import de.peote.view.displaylist.DisplaylistType;

class GlyphTextRendering extends Sample
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
			w:   600,        // Texture width
			h:   591,        // Texture height
		});
		
		// -----------------------------------------------------
		// ------------------- IMAGES --------------------------
		// -----------------------------------------------------
		
		peoteView.setImage( {
			image: 0,
			texture:0,
			filename: "assets/DejavuSans.png",
			preload:true
		});
		
		// -----------------------------------------------------
		// ---------------- PROGRAM SHADER ---------------------
		// -----------------------------------------------------
		peoteView.setProgram( {
			program: 0,
			texture: 0,
			fshader:'assets/gl3font.frag'
		});
		
		
		// -----------------------------------------------------
		// ---------------- DISPLAYLISTS -----------------------
		// -----------------------------------------------------
		peoteView.setDisplaylist( {
			displaylist: 0,
			type: DType.RGBA | DType.ANIM | DType.ROTATION,
			
			maxElements:    10000,
			maxPrograms:        1,
			bufferSegments:     1,
			
			x: 0, y: 0,	w: 1024, h: 512,

			renderBackground:true,

			// TODO: more alternatives like -> backgroundColor:[0.1, 0.5, 0.8, 0.8]
			r:0.7, g:0.8, b:0.9, //a:0.8,
			blend:1 // alpha blending
		});
		
		// -----------------------------------------------------
		// ---------------- ELEMENTS ---------------------------
		// -----------------------------------------------------		

		var fontinfo:FontInfo = new FontInfo("assets/DejavuSans.dat", function(info:FontInfo) {
			trace ("Loaded Fontdata complete");
			
			renderTextLine("PeoteView glyph textrendering with ttfcompiled font (thx deltaluca's great gl3font \\o/)", info, 18, 10, 20, 1024, 1024); 
			renderTextLine("-----------------------------------------------------------------------------------------------------------------", info, 18, 26, 20, 1024, 1024); 
			renderTextLine("\t!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ", info, 18, 60, 20, 1024, 1024); 
			renderTextLine("[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ", info, 18, 90, 20, 1024, 1024); 
			renderTextLine("¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×Ø", info, 18, 120, 20, 1024, 1024); 
			renderTextLine("ÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ", info, 18, 150, 20, 1024, 1024); 
			renderTextLine("‘’₯―΄΅ΆΈΉΊΌΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ", info, 18, 180, 20, 1024, 1024); 
			//renderTextLine("", info, 10, 180, 20, 1024, 1024); 
			
			
		});
		
	}
	public function renderTextLine(s:String, info:FontInfo, x:Int, y:Int, scale:Float, texturewidth:Int, textureheight:Int):Void
	{
		var t:Float = Timer.stamp() - startTime;

		var first:Bool = true;
		var penX:Int = x;
		var penY:Int = y+Math.ceil(scale);
		var prev_id:Int = 0;
		var scale:Float = scale;
		
		Utf8.iter(s, function(charcode)	{
			
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
				peoteView.setElement({
					element:element_nr++,
					x:random(1024),
					y:random(480),
					w:Math.ceil(w*3),
					h:Math.ceil(h*3),
					rgba:random(256) << 24 | random(256) << 16 | random(256) << 8 | 128+random(128),
					rotation:2000-random(4000),
					pivotX:Math.ceil(w*1.5),
					pivotY:Math.ceil(h*1.5),
					time:t+3,
					end: {
						x:penX + Math.floor(info.metrics[id].left * scale),
						y:penY + Math.floor((info.metrics[id].top - info.metrics[id].height) * scale),
						w:Math.ceil(w),
						h:Math.ceil(h),
						rgba:0x000000FF,
						pivotX:Math.ceil(w / 2),
						pivotY:Math.ceil(h / 2),
						rotation:0,
						time:t+6
					},
					program:0,
					tx:Math.round(info.metrics[id].u * texturewidth)-1,
					ty:Math.round(info.metrics[id].v * textureheight)-1,
					tw:Math.round(info.metrics[id].w * texturewidth)+1,
					th:Math.round(info.metrics[id].h * textureheight)+1,
					image:0,
				});
				penX += Math.ceil(info.metrics[id].advance * scale);
			}
			
		});
		
	}
}

// thanks to deltalucas gl3font lib -> https://github.com/deltaluca/gl3font

class FontInfo {
    public var idmap:Map<Int,Int>; // map glyph to id

    public var metrics:Array<Metric>;
    public var kerning:Array<Array<Float>>;

    public var height:Float;
    public var ascender:Float;
    public var descender:Float;

    public function new(file:String, onload:FontInfo->Void) {
		
		var future = Assets.loadBytes(file);
		future.onProgress (function (progress) trace ("Loading Fontdata Progress: " + progress));
		future.onError (function (msg) trace ("Loading Fontdata Error: " + msg));
		
		future.onComplete (function (f:Bytes) {
			
			var pos:Int = 0;
			var N:Int = f.getInt32(pos); pos += 4; trace('number of glyphes: $N');
			height    = f.getFloat(pos); pos += 4; trace('height: $height');
			ascender  = f.getFloat(pos); pos += 4; trace('ascender: $ascender');
			descender = f.getFloat(pos); pos += 4; trace('descender: $descender');
			idmap = new Map<Int,Int>();
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
		});
		
		
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