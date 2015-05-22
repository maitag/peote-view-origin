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

import de.peote.view.PeoteView;
import haxe.Timer;

class Example_01
{
	private var peoteView:PeoteView;
	private var startTime:Float;

	var w:Int = 280;
	var h:Int = 180;
	var s:Int = 7;
	var last_y:Int;
	var switchBGanim:Int = 1;
	var speed:Float = 1;
	
	#if cpp // fix for cpp (cpp timer not work in lime yet)
	var cpp_timer_fix:Float;
	#end
	
	public function new()
	{
		last_y = h - 1;
		
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		

		peoteView = new PeoteView(10, 10); // max_displaylists, max_programs(for all displaylists -> TODO)
		
		// set shaders
		peoteView.setProgram(0, "assets/lyapunov_01.frag");
		peoteView.setProgram(1); // default shaders
		
		// set images
		peoteView.setImage(0, "assets/peote_font_green.png", 512, 512);
		peoteView.setImage(1, "assets/peote_tiles.png", 512, 512);
		
		// new Displaylist
		peoteView.setDisplaylist( { displaylist:0,
			//type:TREE|ANIM...
			enable:true, //w:100, h:100,
			max_elements:w*h+1, max_programs:2, buffer_segment_size:1000, // for low-end devices better max_elements < 100 000
			z:0
		});
		
		// fractal BG
		peoteView.setElement( { element:0,displaylist:0,
			time:t,
			x:0, y:0, w:3000, h:3000,
			z: -2,
			program:0, tw:1000, th:1000,
			end: {
				x: -1500, y: -1500, w:11000, h:11000,
				time:t+h/speed
			}
		});
		
		update_time = Timer.stamp();
		// tiles
		
		//var x,y:Int;
		for (x in 0...w)
			for (y in 0...h)
				peoteView.setElement( { element:1 + y*w +x,displaylist:0,
					start: {
						x: x*s, y: y*s-s,
						w:s, h:s,
						time:t
					},
					end: {
						x: x*s, y: y*s-s+h*s,
						w:s, h:s,
						time:t + h/speed
					},
					z: -1,
					program:1, image:random(2), tile:1+random(255)
				});
		
		#if cpp // fix for cpp (lime 2.0.0-alpha issue)
		cpp_timer_fix = Timer.stamp() + 1.0/speed;
		#else
		// Timer every second  - TODO: may own Timer inside RenderLoop
		var timer = new Timer(Math.floor(1000/speed));
		timer.run = moveTilesUp;
		#end
		
		trace("START update_time: " + Math.round((Timer.stamp() - update_time)*100000)/100000);
	}
	
	private inline function moveTilesUp():Void
	{
		
		update_time = Timer.stamp();
		
		var t:Float = Timer.stamp() - startTime;
		//trace("t:"+t);
		
		
		for (x in 0...w)
			peoteView.setElement( { element: 1+last_y*w+x,displaylist:0,
				start: {
					y: -s,
					time:t
				},
				end: {
					y: -s+h*s,
					time: t+h/speed
				}
			});
		
		if (last_y == 0)
		{
			last_y = h - 1;
			// anim BG
			if (switchBGanim == 1)
				peoteView.setElement( { element:0,displaylist:0,
					end: {
						x:0, y:0, w:3000, h:3000,
						time:t+h/speed
					},
					tw:1000, th:1000
				});
			else
				peoteView.setElement( { element:0,displaylist:0,
					end: {
						x: -1500, y: -1500, w:11000, h:11000,
						time:t+h/speed
					},
					tw:1000, th:1000
				});
			switchBGanim = -switchBGanim;
		}
		else last_y--;
		
		
		// FPS:
		trace("FPS: " + frames + " - render time: "+Math.round(render_time/frames*100000)/100000+" - update_time: " + Math.round((Timer.stamp() - update_time)*100000)/100000);
		frames = 0; render_time = 0;
		
	};

	// ------------------------------------------------------------
	// ----------- Render Loop ------------------------------------
	public var frames:Int = 0;
	public var render_time:Float = 0;
	public var update_time:Float = 0;
	
	public inline function render(width:Int, height:Int, mouse_x:Int, mouse_y:Int, zoom:Int ):Void
	{	
		var t:Float = Timer.stamp();
		peoteView.render(Timer.stamp() - startTime, width, height, mouse_x, mouse_y, zoom);
		render_time += Timer.stamp()-t;
		frames++;
		
		#if cpp // fix for cpp (lime 2.0.0-alpha issue)
		if (Timer.stamp() >= cpp_timer_fix)
		{	
			cpp_timer_fix = Timer.stamp() + 1.0/speed;
			moveTilesUp();
		}
		#end
		
	}
	
	// -- Math-Stuff
	private inline function random(n:Int):Int
	{
		return Math.floor(Math.random() * n);
	}
	
}