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

import haxe.Timer;
import lime.graphics.Renderer;

import de.peote.view.PeoteView;
import de.peote.view.displaylist.DType;

class ExampleMassAnim extends Example
{
	var w:Int = 400;
	var h:Int = 400;
	var s:Int = 5;
	var last_y:Int;
	var switchBGanim:Int = 1;
	var speed:Float = 1;
		
	var timer:Timer;
	var frames:Int = 0;
	var render_time:Float = 0;
	var update_time:Float = 0;
	//var ok:Bool = false;
	var firstrun:Bool = true;
	
	public override function run()
	{	//peoteView = new PeoteView(10, 10); // max_displaylists, max_programs(for all displaylists -> TODO)
		//Timer.delay(rundelayed,1000);
		//ok = true;
	}
	public function rundelayed()
	{
		last_y = h - 1;
		
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		

		peoteView = new PeoteView(10, 10); // max_displaylists, max_programs(for all displaylists -> TODO)
		
		// set shaders
		peoteView.setProgram(0, "assets/lyapunov_01.frag");
		peoteView.setProgram(1); // default image shader
		
		// set images
		peoteView.setImage(0, "assets/peote_font_green.png", 512, 512);
		peoteView.setImage(1, "assets/peote_tiles.png", 512, 512);
		
		// new Displaylist
		peoteView.setDisplaylist( { displaylist:0, type:DType.SIMPLE,
			enable:true,
			elements:1, programs:1, segments:1,
			//w:1920, h:1280,
			z:0,blend:0
		});
		// new Displaylist
		peoteView.setDisplaylist( { displaylist:1, type:DType.ANIM|DType.ZINDEX,
			enable:true,
			elements:w * h, programs:1, segments:1,
			//w:1920, h:1280,
			z:1,blend:0
		});
		
		// fractal BG
		peoteView.setElement( { element:0, displaylist:0,
			time:t,
			x:0, y:0, w:3000, h:3000,
			//z: -2,
			program:0, tw:1000, th:1000,
			end: {
				x: -1500, y: -1500, w:11000, h:11000,
				time:t+h/speed
			}
		});
		
		update_time = Timer.stamp();
		// tiles
		
		
		for (x in 0...w)
			for (y in 0...h)
				peoteView.setElement( { element: y*w +x, displaylist:1,
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
					//z: -1,
					program:1, image:random(2), tile:1+random(255)
				});
		
		// Timer every second  - TODO: may own Timer inside RenderLoop
		timer = new Timer(Math.floor(1000/speed));
		timer.run = moveTilesUp;
		
		trace("START update_time: " + Math.round((Timer.stamp() - update_time)*1000)/1000);
	}
	
	public override function render(renderer:Renderer):Void
	{
		//if (ok)
		if (firstrun)
		{
			rundelayed(); firstrun = false;
		}
		else
		{ frames++;
		  super.render(renderer);
		}
	}
	
	private inline function moveTilesUp():Void
	{
		
		update_time = Timer.stamp();
		
		var t:Float = Timer.stamp() - startTime;
		
		for (x in 0...w)
			peoteView.setElement( { element: last_y*w+x, displaylist:1,
				start: {
					y: -s,
					time:t
				},
				end: {
					y: -s+h*s,
					time: t+h/speed
				},program:1, image:random(2), tile:1+random(255)
			});
		
		if (last_y == 0)
		{
			last_y = h - 1;
			// anim BG
			if (switchBGanim == 1)
				peoteView.setElement( { element:0, displaylist:0,
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
		trace("FPS: " + frames + " - render time: "+Math.round(render_time/frames*1000)/1000+" - update_time: " + Math.round((Timer.stamp() - update_time)*1000)/1000);
		frames = 0; render_time = 0;
		
	};


}