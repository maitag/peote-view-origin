/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o    _   o      o   
 *      o-o-o  o-o  (o)   o    o-o  
 *     o      o     (_\~   o      o 
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


function starter(peoteView)
{	
	var w = 160;
	var h = 120;
	var s = 14;
	var last_y = h-1;
	var nr = 0;
	var switchBGanim = 1;
	
	// set shaders
	peoteView.setShader(0, "Assets/HerokuShaders/nebula.frag");
	peoteView.setShader(1, "Assets/lyapunov_02.frag");
	peoteView.setShader(2);
	
	// set images
	peoteView.setImage(0, "Assets/peote_font_green.png");

	// set Time
	var t = Peote.getTime();
		
	// nebula BG
	peoteView.setElement (nr,     0,     0, -1,  3000,  3000, 0);
	peoteView.animElement(nr, -1500, -1500, -1, 11000, 11000, t, t + h );
		
	// tiles
	for (var x=0; x<w; x++)
	{
		for (var y=0; y<h; y++)
		{
			nr = 1 + y*w +x;
			var rs = s + Math.floor(Math.random() * 150);
			peoteView.setElement ( nr, Math.floor(Math.random() * 1550), Math.floor(Math.random() * 1550), 0, s/2, s/2, 1, null, Math.floor(Math.random() * 256));
			peoteView.animElement( nr, Math.floor(Math.random() * 1550), Math.floor(Math.random() * 1550), 0, rs, rs, t, t + h );
		}
	}
	
	// Timer every second
	window.setInterval(function() {
		t = Peote.getTime();
		for (var x=0; x<w; x++)
		{
			nr = 1 + last_y*w + x;
			var rs = s + Math.floor(Math.random() * 150);
			peoteView.animElement( nr, Math.floor(Math.random() * 1550), Math.floor(Math.random() * 1550), 0, s/2, s/2, 0, 0 );
			peoteView.animElement( nr, Math.floor(Math.random() * 1550), Math.floor(Math.random() * 1550), 0, rs, rs, t, t + h );
		}
		if (last_y == 0)
		{
			last_y = h-1;
			// anim BG
			if (switchBGanim == 1)
			     peoteView.animElement(0,     0,     0, -1,  3000,  3000, t, t + h );
			else peoteView.animElement(0, -1500, -1500, -1, 11000, 11000, t, t + h );
			switchBGanim = -switchBGanim;
		}
		else last_y--;
	}, 1000);
	
}