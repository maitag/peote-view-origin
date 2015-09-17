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

package;

import de.peote.view.Param;
import haxe.Timer;
import lime.graphics.Renderer;
import lime.ui.Window;
import lime.ui.KeyCode;
import lime.ui.KeyModifier;

import de.peote.view.PeoteView;
import de.peote.view.displaylist.DType;

class ExampleBunnysGPU extends Example
{
		
	var frames:Int = 0;
	var render_time:Float = 0;
	var update_time:Float = 0;
	
	var timer:Timer;
	var bunny_nr:Int = 0;
	var max_bunnys:Int = 1000000;
	var max_spawn:Int = 100;
	var spawn_time:Int = 1;
	var pause:Bool = false;
	
	var spawn_x:Int;
	var spawn_y:Int;
	
	public override function run()
	{
		// set Time
		startTime = Timer.stamp();

		peoteView = new PeoteView(10, 10); // max_displaylists, max_programs(for all displaylists -> TODO)
		
		// set shaders
		peoteView.setProgramSrc(0, '', vertexShaderSrc); // modified gpu-animation
		peoteView.setProgram(1); // default image shader
		
		// set images
		peoteView.setImage(0, "assets/peote_tiles.png", 512, 512);
		peoteView.setImage(1, "assets/peote_font_white.png", 512, 512);
		
		// Displaylist for massive tiles
		peoteView.setDisplaylist( { displaylist:0, type:DType.ANIM|DType.RGBA,
			enable:true,
			max_elements:max_bunnys, max_programs:1, buffer_segment_size:max_bunnys, // for low-end devices better max_elements < 100 000
			//w:1920, h:1280,
			z:0
		});

		// Displaylist for FPS
		peoteView.setDisplaylist( { displaylist:1, type:DType.SIMPLE|DType.RGBA,
			enable:true,
			max_elements:8, max_programs:1, buffer_segment_size:8, // max 8 chars
			x:240, y:4, w:1, h:1,
			renderBackground:true, a:0.8, r:0.3, g:0.2,
			z:1
		});
		// Displaylist for tile-ammount
		peoteView.setDisplaylist( { displaylist:2, type:DType.SIMPLE|DType.RGBA,
			enable:true,
			max_elements:13, max_programs:1, buffer_segment_size:13, // max 13 chars
			x:8, y:4, w:1, h:1,
			renderBackground:true, a:0.75, r:0.25,
			z:1
		});
		// Displaylist for max_spawn
		peoteView.setDisplaylist( { displaylist:3, type:DType.SIMPLE|DType.RGBA,
			enable:true,
			max_elements:33, max_programs:1, buffer_segment_size:33, // max 33 chars
			x:8, y:34, w:1, h:1,
			renderBackground:true, a:0.75, r:0.2,
			z:1
		});
		// Displaylist for info-text
		peoteView.setDisplaylist( { displaylist:4, type:DType.SIMPLE|DType.RGBA,
			enable:true,
			max_elements:120, max_programs:1, buffer_segment_size:120, // max 120 chars
			x:460, y:0, w:1, h:1,
			renderBackground:true, a:0.8,r:0.25,
			z:1
		});
		
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
			"mouse-wheel:zoom in/out",
			0xbbaa77dd, 14, -6
		);
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
					program:0,
					displaylist:0,
					w: 8,
					h: 8,
					image:0,
					tile:1 + random(31),
					//rgba: random(256) << 24 | random(256) << 16 | random(256) << 8 | 128+random(128), // not implemented yet for gpu animed tiles
					start: {
						x: spawn_x,
						y: spawn_y,
						time:t
					},
					end: {
						x: random(width),
						y: random(height),
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
		
		txtOutput(2, "tiles:" + bunny_nr);
		
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
				if (pause) {pause = false; spawnBunnys();}
			case KeyCode.DOWN:
				max_spawn -= 10;
				updateMaxSpawn();
				if (pause) {pause = false; spawnBunnys();}
			case KeyCode.RIGHT:
				if (spawn_time<60) spawn_time += 1;
				updateMaxSpawn();
				if (pause) {pause = false; spawnBunnys();}
			case KeyCode.LEFT:
				if (spawn_time>1) spawn_time -= 1;
				updateMaxSpawn();
				if (pause) {pause = false; spawnBunnys();}
			default:
		}
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
		
		for (i in 0...peoteView.getDisplaylist({displaylist:d}).max_elements)
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
					program:1,
					displaylist:d,
					x:4 + px,
					y:3 + py,
					w: size,
					h: size,
					image:1,
					tile:letter,
					rgba:color
				});
				px += size+gap;
				if (i < s.length) xmax = Math.floor(Math.max(xmax, px)); 
			}
		}
		
		peoteView.setDisplaylist( { displaylist:d, enable:true, w:xmax-gap + 8, h:py + size + 6 } );
		
	}
	
	public static inline var vertexShaderSrc:String =
	"	precision mediump float;

		// always twice if time dependend
		attribute vec4 aPosition;
		attribute vec2 aTime;
		
		attribute float aZindex;
		attribute vec2 aTexCoord;
		
		#if_RGBA
		attribute vec4 aRGBA;
		varying vec4 vRGBA;
		#end_RGBA

		varying vec2 vTexCoord;
		
		uniform float uTime;
		uniform float uZoom;
		uniform vec2 uResolution;
		uniform vec2 uDelta;
		
		void main(void) {
			#if_RGBA
			vRGBA = 255.0/aRGBA;
			#end_RGBA
			
			vTexCoord = aTexCoord;
			
			vec2 VertexPosStart = vec2( aPosition );
			vec2 VertexPosEnd   = vec2 (aPosition.z, aPosition.w);
			
			float zoom = uZoom;
			float width = uResolution.x;
			float height = uResolution.y;
			float deltaX = floor(uDelta.x);
			float deltaY = floor(uDelta.y);
			
			float right = width-deltaX*zoom;
			float left = -deltaX*zoom;
			float bottom = height-deltaY*zoom;
			float top = -deltaY * zoom;
			
			float x = VertexPosStart.x + floor( 
								(VertexPosEnd.x - VertexPosStart.x)
								* (uTime-aTime.x) / (aTime.y - aTime.x)
								* zoom) / zoom;
			float swapX = mod(floor(x / width), 2.0);

			float y = VertexPosStart.y + floor( 
								(VertexPosEnd.y - VertexPosStart.y)
								* (uTime-aTime.x) / (aTime.y - aTime.x)
								* zoom) / zoom;
			float swapY = mod(floor(y / height), 2.0);
			
			gl_Position = mat4 (
				vec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),
				vec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),
				vec4(0.0, 0.0, -0.001, 0.0),
				vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)
			)
		* vec4 ( swapX * (width - mod(x, width)) + (1.0 - swapX) * mod(x, width),
				 swapY * (height - mod(y, height)) + (1.0 - swapY) * mod(y, height),
				 aZindex, 1.0 );
		}
	";



}