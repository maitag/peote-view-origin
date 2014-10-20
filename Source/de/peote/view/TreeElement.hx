/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o   _-   o      o   
 *      o-o-o  o-o   \/   o    o-o  
 *     o      o     \|-    o      o 
 *    o      o-o     |      o    o-o
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

package de.peote.view;

class TreeElement
{
	public var x:Int;
	public var y:Int;
	public var z:Int;
	public var w:Int;
	public var h:Int;
	public var scaleX:Float;
	public var scaleY:Float;

	public var parent:Int = -1;
	public var child:Int = -1; // youngest child
	public var sib:Int = -1; // older sib
	
	public function new(_sib:Int, _x:Int, _y:Int, _z:Int, _w:Int, _h:Int, _scaleX:Float, _scaleY:Float):Void
	{
		sib = _sib;
		update(_x, _y, _z, _w, _h, _scaleX, _scaleY);
	}
	
	public inline function update(_x:Int, _y:Int, _z:Int, _w:Int, _h:Int, _scaleX:Float, _scaleY:Float):Void
	{
		x = _x;
		y = _y;
		z = _z;
		w = _w;
		h = _h;
		scaleX = _scaleX;
		scaleY = _scaleY;
	}
	
}