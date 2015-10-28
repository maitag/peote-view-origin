/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o        o    o-o   
 *     o      o     \|/    o      o  
 *    o      o-o    <o>     o    o-o 
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

package de.peote.view.texture;

import format.png.Reader;
import format.png.Tools;
import haxe.io.BytesInput;
import lime.utils.ByteArray;
import lime.utils.UInt8Array;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLTexture;
import lime.Assets;

#if js
import js.Browser;
import js.html.ImageElement;
#end

class Texture
{
	public function new() 
	{
	}
	
	public static inline function createEmptyTexture(width:Int, height:Int):GLTexture
	{
		var texture:GLTexture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, width, height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		
		//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR);
		
		//GL.generateMipmap(GL.TEXTURE_2D);
		GL.bindTexture(GL.TEXTURE_2D, null);
		return texture;
	}
	
	public static inline function createSubTexture(t:GLTexture, x:Int, y:Int, w:Int, h:Int, data:UInt8Array):Void
	{
		GL.bindTexture(GL.TEXTURE_2D, t);
		//GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, w, h, 0, GL.RGBA, GL.UNSIGNED_BYTE, data);
		GL.texSubImage2D(GL.TEXTURE_2D, 0, x, y, w, h, GL.RGBA, GL.UNSIGNED_BYTE, data);
		GL.bindTexture(GL.TEXTURE_2D, null);
	}
	
	
}