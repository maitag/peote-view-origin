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

import de.peote.view.PeoteViewSimple;
import haxe.Timer;

typedef PeoteView = PeoteViewSimple;

class Example_01
{
	private var peoteView:PeoteView;
	private var startTime:Float;

	var w:Int = 160;
	var h:Int = 120;
	var s:Int = 14;
	var last_y:Int = 120 - 1;
	var nr:Int = 0;
	var switchBGanim:Int = 1;

	
	#if cpp // fix for cpp (lime 2.0.0-alpha issue)
	var cpp_timer_fix:Float;
	#end
	
	public function new()
	{
		peoteView = new PeoteView(w * h + 1, 2);
		
		// set shaders
		peoteView.setShader(0, "assets/lyapunov_01.frag");
		peoteView.setShader(1); // default shaders
		
		// set images
		peoteView.setImage(0, "assets/peote_font_green.png");
		peoteView.setImage(1, "assets/peote_tiles.png");
		
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		trace("t:"+t);
		
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
		
		#if cpp // fix for cpp (lime 2.0.0-alpha issue)
		cpp_timer_fix = Timer.stamp() + 1.0;
		#else
		// Timer every second  - TODO: may own Timer inside RenderLoop
		var timer = new Timer(1000);
		timer.run = moveTilesUp;
		#end
	}
	
	private inline function moveTilesUp():Void
	{
		var t:Float = Timer.stamp() - startTime;
		trace("t:"+t);
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

	// ------------------------------------------------------------
	// ----------- Render Loop ------------------------------------
	
	public inline function render(width:Int, height:Int, mouse_x:Int, mouse_y:Int, zoom:Int ):Void
	{
		peoteView.render(Timer.stamp() - startTime, width, height, mouse_x, mouse_y, zoom);
		
		#if cpp // fix for cpp (lime 2.0.0-alpha issue)
		if (Timer.stamp() >= cpp_timer_fix)
		{
			cpp_timer_fix = Timer.stamp() + 1.0;
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