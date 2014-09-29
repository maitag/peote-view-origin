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

var w = 160;
var h = 120;
var s = 14;
var _last_y = h-1;
var t;

function starter(peoteView)
{
	peoteView.setShaderSrc(0);
	peoteView.setShaderSrc(1);
	
	peoteView.setImage(0, "./assets/peote_font.png");
	peoteView.setImage(1, "./assets/peote_tiles.png");

	t = Peote.getTime();
	
	for (var x=0; x<w; x++)
	{
		for (var y=0; y<h; y++)
		{
			peoteView.setElement( y*w +x, x*s, y*s-s,     0, s, s, 1, Math.floor(Math.random() * 2), Math.floor(Math.random() * 256));
			peoteView.animElement(y*w +x, x*s, y*s-s+h*s, 0, s, s, t, t + h );
		}
	}
	
	window.setInterval(function() {
		t = Peote.getTime();
		for (var x=0; x<w; x++)
		{
			peoteView.delElement( _last_y * w + x);
			peoteView.setElement( _last_y * w + x, x*s, -s    , 0, s, s, 1, Math.floor(Math.random() * 2), Math.floor(Math.random() * 256));
			peoteView.animElement(_last_y * w + x, x*s, -s+h*s, 0, s, s, t, t + h );
		}
		if (_last_y == 0) _last_y = h-1;
		else _last_y--;
	}, 1000);
	
}