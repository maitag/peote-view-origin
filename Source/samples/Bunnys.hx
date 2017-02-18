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
import lime.graphics.Renderer;
import lime.ui.Window;
import lime.ui.KeyCode;
import lime.ui.KeyModifier;

import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;

class Bunnys extends Sample
{
		
	var frames:Int = 0;
	var render_time:Float = 0;
	var update_time:Float = 0;
	
	var timer:Timer;
	var bunny_nr:Int = 0;
	#if android
	var max_bunnys:Int = 80000;
	var max_spawn:Int  = 1; 
	var spawn_time:Int = 12; // spawns per second
	var tile_size:Int  = 32;
	#else
	var max_bunnys:Int = 1000000;
	var max_spawn:Int  = 20; 
	var spawn_time:Int = 24; // spawns per second
	var tile_size:Int  = 48;
	#end
	
	var pause:Bool = false;
	
	var spawn_x:Int;
	var spawn_y:Int;
	
	var sprite:Int = 0;
	
	public override function run()
	{
		// set Time
		startTime = Timer.stamp();

		peoteView = new PeoteView({
			maxDisplaylists:     6,
			maxPrograms:         3,
			maxTextures:         2,
			maxImages:           4
		});
		
		// ------------------------------------------------------
		// ----------------------- FONT  ------------------------
		// ------------------------------------------------------
		
		
		// --------------------- TEXTURE (font) -----------------
		peoteView.setTexture( {
			texture: 0,
			w:   512,        // Texture width
			h:   512,        // Texture height
		});

		// ------------------- IMAGE (font) --------------------------

		peoteView.setImage({ image:0, texture:0, filename:"assets/peote_font_white.png" });
		
		// ---------------- PROGRAM SHADER (font) ---------------------
		peoteView.setProgram({
			program:0,
			texture:0
		});

		
		
		// ------------------------------------------------------
		// ----------------------- TILES ------------------------
		// ------------------------------------------------------
		

		// --------------------- TEXTURE (flowers, bunnys or letters ;) -----------------
		peoteView.setTexture({
			texture: 1,
			slots: 4,
			w:   512,        // Texture slot width
			h:   512,        // Texture slot height
		});

		// ------------------- IMAGE (flowers, bunnys or letters ;) --------------------------
		peoteView.setImage({ image:1, texture:1, filename:"assets/peote_tiles_flowers_alpha.png" });
		peoteView.setImage({ image:2, texture:1, filename:"assets/peote_tiles_bunnys.png" });
		peoteView.setImage({ image:3, texture:1, filename:"assets/peote_font_white.png" });
		

		
		// ---------------- PROGRAM SHADER (custom "ping pong" vertex position calculation [over {time]] )------
		peoteView.setProgram({
			program:1,
			texture:1,
			//vshader:'assets/ping-pong.vert'
			vshader:'assets/ping-pong_android.vert'
			//vshader:'assets/ping-pong_raspi.vert'
		});
		
		// -----------------------------------------------------
		// ---------------- DISPLAYLISTS -----------------------
		// -----------------------------------------------------

		// Displaylist for massive tiles
		peoteView.setDisplaylist( { displaylist:0, type:DType.ANIM|DType.ROTATION|DType.RGBA,
			maxElements:max_bunnys,
			z:0
		});

		// Displaylist for FPS
		peoteView.setDisplaylist( { displaylist:1, type:DType.SIMPLE|DType.RGBA,
			maxElements:8,
			x:310, y:4, w:1, h:1,
			renderBackground:true, a:0.8, r:0.3, g:0.2,
			z:1
		});
		// Displaylist for tile-ammount
		peoteView.setDisplaylist( { displaylist:2, type:DType.SIMPLE|DType.RGBA,
			maxElements:7,
			x:190, y:4, w:1, h:1,
			renderBackground:true, a:0.75, r:0.25,
			z:1
		});
		// Displaylist for max_spawn
		peoteView.setDisplaylist( { displaylist:3, type:DType.SIMPLE|DType.RGBA,
			maxElements:33,
			x:8, y:34, w:1, h:1,
			renderBackground:true, a:0.75, r:0.2,
			z:1
		});
		// Displaylist for info-text
		peoteView.setDisplaylist( { displaylist:4, type:DType.SIMPLE|DType.RGBA,
			maxElements:200,
			x:460, y:0, w:1, h:1,
			renderBackground:true, a:0.8,r:0.25,
			z:1
		});
		// Displaylist for tile-size
		peoteView.setDisplaylist( { displaylist:5, type:DType.SIMPLE|DType.RGBA,
			maxElements:12,
			x:8, y:4, w:1, h:1,
			renderBackground:true, a:0.75, r:0.25,
			z:1
		});
		
		// -----------------------------------------------------
		// -----------------------------------------------------
		// -----------------------------------------------------
		
		spawn_x = Math.floor(width  / 2);
		spawn_y = Math.floor(height / 2);
		
		updateMaxSpawn();
		spawnBunnys();
		
		var fps_timer:Timer = new Timer(1000);
		fps_timer.run = refreshFPS;
		
		txtOutput(4,
			"up/down:    amount of tiles\n" +
			"left/right: spawn-time\n" +
			"space:      stop/resume\n" +
			"n/m:        tile size\n" +
			"i:          next tilesheet\n" +
			"a:          alpha on/off\n" +
			"mouse-wheel:zoom in/out",
			0xbbaa77dd, 14, -6
		);
		
		txtOutput(5, tile_size+"x" + tile_size+"-tiles:");
		
		//trace("START update_time: " + Math.round((Timer.stamp() - update_time) * 100000) / 100000);
	}
	
	// ----------------------------------------------------------------
	
	private function spawnBunnys():Void
	{
		if (max_spawn > 0)
		{
			var t:Float = Timer.stamp() - startTime;
			for (i in 0...max_spawn) {
				if (bunny_nr >= max_bunnys) {
					pause = true;
					max_spawn = 0;
					updateMaxSpawn();
					break;
				}
				peoteView.setElement( {
					element: bunny_nr++,
					program:1,
					displaylist:0,
					w: tile_size,
					h: tile_size,
					pivotX: Math.floor(tile_size/2),
					pivotY: Math.floor(tile_size/2),
					image: 1+sprite,
					tile:1 + random(31),
					
					start: {
						x: spawn_x,
						y: spawn_y,
						rgba: random(256) << 24 | random(256) << 16 | random(256) << 8 | 128 + random(128),
						rotation: random(1280),
						time:t
					},
					end: {
						x: random(width),
						y: random(height),
						rgba: random(256) << 24 | random(256) << 16 | random(256) << 8 | 128 + random(128),
						rotation: random(1280),
						time: t+5+random(10)
					}
				});
				
			}
		}
		else if (max_spawn < 0)
		{
			for (i in max_spawn...0) {
				if (bunny_nr <= 0) {
					pause = true;
					max_spawn = 0;
					updateMaxSpawn();
					break;
				}
				peoteView.delElement( {displaylist:0, element: --bunny_nr } );
			}
		}
		else pause = true;
		
		txtOutput(2, Std.string(bunny_nr));
		
		if (!pause) Timer.delay(spawnBunnys, Math.floor(1/spawn_time*1000));
	}
	
	private function refreshFPS():Void
	{		
		//update_time = Timer.stamp();		
		// FPS:
		//trace("FPS: " + frames + " - render time: "+Math.round(render_time/frames*100000)/100000+" - update_time: " + Math.round((Timer.stamp() - update_time)*100000)/100000);
		txtOutput(1, "fps: " + frames);
		frames = 0; //render_time = 0;
		
	}
	
	public override function render(renderer:Renderer):Void
	{
		peoteView.render(Timer.stamp() - startTime, width, height, mouse_x, mouse_y, 1, 0, 0);
		frames++;
	}
	
	public override function setOffsets():Void {
		super.setOffsets();
		peoteView.setDisplaylist( { displaylist:0, zoom:zoom, xOffset:xOffset, yOffset:yOffset } );
	}

	// keyboard input
	public override function onKeyDown (window:Window, keyCode:KeyCode, modifier:KeyModifier):Void
	{
		switch (keyCode) {
			case KeyCode.SPACE:
				if (pause) {
					if (max_spawn == 0) max_spawn = 10;
					pause = false;
					spawnBunnys();
					updateMaxSpawn();
				}
				else {
					pause = true;
					peoteView.setDisplaylist( { displaylist:3, enable:false } );
				}
				
			case KeyCode.UP:
				max_spawn += 10;
				updateMaxSpawn();
				if (pause) { pause = false; spawnBunnys(); }
				
			case KeyCode.DOWN:
				max_spawn -= 10;
				updateMaxSpawn();
				if (pause) { pause = false; spawnBunnys(); }
				
			case KeyCode.RIGHT:
				if (spawn_time<60) spawn_time++;
				updateMaxSpawn();
				if (pause) { pause = false; spawnBunnys(); }
				
			case KeyCode.LEFT:
				if (spawn_time>1) spawn_time--;
				updateMaxSpawn();
				if (pause) { pause = false; spawnBunnys(); }
				
			case KeyCode.N:
				if (tile_size > 1) {tile_size--; txtOutput(5, tile_size+"x" + tile_size+"-tiles:"); }
			
			case KeyCode.M:
				if (tile_size<384) { tile_size++; txtOutput(5, tile_size+"x" + tile_size+"-tiles:"); }
				
			case KeyCode.A:
				if ( peoteView.getDisplaylist( { displaylist:0 } ).blend == 1)
				     {peoteView.setDisplaylist( { displaylist:0, blend:0 } ); trace("BLEND MODE 0");}
				else {peoteView.setDisplaylist( { displaylist:0, blend:1 } ); trace("BLEND MODE 1");}
				
			case KeyCode.I: sprite = (sprite+1) % 3; // switch sprite image
			//case KeyCode.T: // shift textures -> not YET -> see BunnysTextureSwitch
				
			default:
		}
		super.onKeyDown(window, keyCode, modifier);
	}
	
	public function updateMaxSpawn():Void {
		if (max_spawn > 0) 
			txtOutput(3, "spawn " + max_spawn + " tiles in 1"+((spawn_time==1) ? "" : "/"+spawn_time)+" second", 0x55dd22ee);
		else if (max_spawn < 0) 
			txtOutput(3, "kill " + (0 - max_spawn) + " tiles in 1"+((spawn_time==1) ? "" : "/"+spawn_time)+" second", 0xff7722ff);
		else peoteView.setDisplaylist( { displaylist:3, enable:false } );
	}
	
	public override function onMouseDown (window:Window, x:Float, y:Float, button:Int):Void
	{
		spawn_x = Std.int(x);
		spawn_y = Std.int(y);
	}
	
	private function txtOutput(d:Int, s:String, color:Int = 0xffcc33ee, size:Int = 20, gap:Int = -6):Void
	{
		var letter:Int;
		var px:Int = 0;
		var py:Int = 0;
		var xmax:Int = 0;
		
		for (i in 0...peoteView.getDisplaylist({displaylist:d}).maxElements)
		{
			if (i < s.length)
			     letter = s.charCodeAt(i);
			else letter = 0;
			
			if (letter == 10) {
				px = 0;
				py += size;
			}
			else {
				peoteView.setElement( {
					element: i,
					program:0,
					displaylist:d,
					x:4 + px,
					y:3 + py,
					w: size,
					h: size,
					image:0,
					tile:letter,
					rgba:color
				});
				px += size+gap;
				if (i < s.length) xmax = Math.floor(Math.max(xmax, px)); 
			}
		}
		
		peoteView.setDisplaylist( { displaylist:d, enable:true, w:xmax-gap + 8, h:py + size + 6 } );
		
	}
	

}