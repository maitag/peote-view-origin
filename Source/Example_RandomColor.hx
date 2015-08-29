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
import de.peote.view.displaylist.DType;
import haxe.Timer;

class Example_RandomColor
{
	private var peoteView:PeoteView;
	private var startTime:Float;

	
	public function new() 
	{
		#if openfl
		trace("OPENFL");
		#end

		startTime = Timer.stamp();
		
		peoteView = new PeoteView(10, 1000); // max_displaylists, max_programs (for all displaylists)
		
		var w:Int = 162;
		var h:Int = 110;
		var s:Int = 12;
	
		// ---------------- PROGRAM SHADER ---------------------
		
		//peoteView.setProgram(0, "assets/lyapunov_01.frag");
			
		// ------------------- IMAGES --------------------------
		
		peoteView.setImage(0, "assets/peote_font_white.png", 512, 512);
		peoteView.setImage(1, "assets/peote_tiles.png", 512, 512);
		
		// ---------------- DISPLAYLISTS -----------------------
		
		peoteView.setDisplaylist( { displaylist:0, type:DType.RGBA,
			max_elements:w*h+1, max_programs:10, buffer_segment_size:w*h+1,
			w:1000, h:1000,
			z:0,
			enable:true
		});
		// -----------------------------------------------------
		// ---------------- ELEMENTS ---------------------------
		// -----------------------------------------------------
		
		peoteView.setElementDefaults({ displaylist:0, z:0, image:0 });
		
		var timer = new Timer(60);
		var firstrun:Bool = true;
		timer.run = function()
		{
			//var update_time = Timer.stamp();
			for (x in 0...w)
			{	for (y in 0...h)
				{	
					//peoteView.delElement( { element: y * w +x } );
					//if (random(6) == 0 )
					var nr:Int = y * w + x;
					if ( !firstrun )
					{	
						var t:Int =  peoteView.getElement( { element:nr } ).tile;
						if (
						     ( (nr--) % 7 == 0 && t == 72) ||
						     ( (nr--) % 7 == 0 && t == 65) ||
						     ( (nr--) % 7 == 0 && t == 88) ||
						     ( (nr--) % 7 == 0 && t == 69) ||
						     ( (nr--) % 7 == 0 && t == 85) ||
						     ( (nr--) % 7 == 0 && t == 73) ||
						     ( (nr--) % 7 == 0 && t == 3)
						   )
							continue;
					}
					peoteView.setElement( { element: y * w + x,
						x: x*s,
						y: y*s - s,
						w:s,
						h:s,
						image:0,
						tile:random(256),
						rgba: random(34) << 24 | random(55) << 16 | random(256) << 8 | 128+random(128)
					});		
				}
			}
			//trace("update_time: " + Math.round((Timer.stamp() - update_time)*100000)/100000);
			firstrun = false;
		}
		
		
	}
	
	// ------------------------------------------------------------
	// ----------- Render Loop ------------------------------------
	
	public inline function render(width:Int, height:Int, mouse_x:Int, mouse_y:Int, zoom:Int ):Void
	{	
		peoteView.render(Timer.stamp() - startTime, width, height, mouse_x, mouse_y, zoom);
	}
	
	// -- Math-Stuff
	public inline function random(n:Int):Int
	{
		return Math.floor(Math.random() * n);
	}
	
}