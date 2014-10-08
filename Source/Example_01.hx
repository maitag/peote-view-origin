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
import de.peote.view.Shader;
import haxe.Timer;

class Example_01
{
	public var peoteView:PeoteView;
	
	private var main:Main;
	private var startTime:Float;

	
	public function new(_main:Main) 
	{
		main = _main;
		main.render = this.render;
		
		var w:Int = 160;
		var h:Int = 120;
		var s:Int = 14;
		var last_y:Int = h - 1;
		var nr:Int = 0;
		var switchBGanim:Int = 1;

		peoteView = new PeoteView(w*h+1, 2);
		
		// set shaders
		peoteView.setShader(0,"assets/lyapunov_01.frag");
		peoteView.setShader(1); // default shaders
		
		// set images
		peoteView.setImage(0, "assets/peote_font_green.png");
		peoteView.setImage(1, "assets/peote_tiles.png");
		
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		
		// fractal BG
		peoteView.setElement( nr,     0,     0, -1,  3000,  3000, 0);
		peoteView.animElement(nr, -1500, -1500, -1, 11000, 11000, t, t + h );
		
		// tiles		
		var x,y:Int;
		for (x in 0...w)
		{
			for (y in 0...h)
			{
				nr = 1 + y*w +x;
				peoteView.setElement (nr, x*s, y*s-s,     0, s, s, 1, random(2), random(256));
				peoteView.animElement(nr, x*s, y*s-s+h*s, 0, s, s, t, t + h );
			}
		}
		
		// Timer every second  - TODO: may own Timer inside RenderLoop
		var timer:Timer = new Timer(1000);
		timer.run = function() 
			{
				var t:Float = Timer.stamp() - startTime;
				for (x in 0...w)
				{
					nr = 1 + last_y*w +x;
					peoteView.animElement(nr, x*s, -s,     0, s, s, 0, 0 );
					peoteView.animElement(nr, x*s, -s+h*s, 0, s, s, t, t + h );
				}
				if (last_y == 0)
				{
					last_y = h - 1;
					// anim BG
					if (switchBGanim == 1)
					     peoteView.animElement(0,     0,     0, -1,  3000,  3000, t, t + h );
					else peoteView.animElement(0, -1500, -1500, -1, 11000, 11000, t, t + h );
					switchBGanim = -switchBGanim;
				}
				else last_y--;
			};
	}
	
	// ------------------------------------------------------------
	// ----------- Render Loop ------------------------------------
	
	public inline function render():Void
	{
		peoteView.render(Timer.stamp() - startTime, main.width, main.height, main.mouse_x, main.mouse_y, main.zoom);
	}
	
	// -- Math-Stuff
	public inline function random(n:Int):Int
	{
		return Math.floor(Math.random() * n);
	}
	
}