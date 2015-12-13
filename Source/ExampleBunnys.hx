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

import de.peote.view.PeoteView;
import de.peote.view.displaylist.DType;

class ExampleBunnys extends Example
{
		
	var frames:Int = 0;
	var render_time:Float = 0;
	var update_time:Float = 0;
	
	var timer:Timer;
	var bunny_nr:Int = 0;
	var max_bunnys:Int = 20000;// 500000;
	
	public override function run()
	{
		// set Time
		startTime = Timer.stamp();

		peoteView = new PeoteView(10, 10); // max_displaylists, max_programs(for all displaylists -> TODO)
		
		// set shaders
		peoteView.setProgram(0); // default image shader
		
		// set images
		peoteView.setImage(0, "assets/peote_tiles.png", 512, 512);
		
		// new Displaylist
		peoteView.setDisplaylist( { displaylist:0, type:DType.ANIM,
			enable:true,
			max_elements:max_bunnys, max_programs:1, buffer_segment_size:1000, // for low-end devices better max_elements < 100 000
			w:1920, h:1280,
			z:0
		});
		
		// Timer every second  - TODO: may own Timer inside RenderLoop
		timer = new Timer(0);
		timer.run = spawnBunnys;
		
		trace("START update_time: " + Math.round((Timer.stamp() - update_time)*100000)/100000);
	}
	
	private function spawnBunnys():Void
	{
		
		update_time = Timer.stamp();
		
		var t:Float = Timer.stamp() - startTime;
		
		peoteView.setElement( {
				element: bunny_nr,
				displaylist:0,
				x: 0,
				w: 32,
				h: 32,
				image:0,
				tile:bunny_nr%32,
				start: {
					y: 0,
					time:t
				},
				end: {
					y: height-32,
					time: t+2
				}
		});
		//var timerCollide:Timer = new Timer(Math.floor(1 * 1000));
		//timerCollide.run = function ():Void { updateBunny(bunny_nr); };
		var nr:Int = bunny_nr;
		Timer.delay(function ():Void { updateBunny(nr); }, 2 * 1000);
		
		bunny_nr++;
		//trace("bunny_nr:" + bunny_nr);
		if (bunny_nr >= max_bunnys) timer.stop();
		
		// FPS:
		//trace("FPS: " + frames + " - render time: "+Math.round(render_time/frames*100000)/100000+" - update_time: " + Math.round((Timer.stamp() - update_time)*100000)/100000);
		frames = 0; render_time = 0;
		
	};

	private function updateBunny(nr:Int):Void
	{	
		//trace("bunny_nr:" + nr);
		var e:Param = peoteView.getElement( { element: nr } );
		var t:Float = Timer.stamp() - startTime;
		peoteView.setElement( {
				element: nr,
				displaylist:0,
				end: {
					x: (e.x>0) ? 0 : 1000,// width - 32,
					time: t+1
				}
		});
		Timer.delay(function ():Void { updateBunny(nr); }, 1 * 1000);
	}
		

}