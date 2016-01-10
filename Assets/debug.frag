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

precision mediump float;
varying vec2 vTexCoord;
#if_RGBA
varying vec4 vRGBA;
#else_RGBA
	#if_PICKING
	varying vec4 vRGBA;
	#end_PICKING
#end_RGBA

uniform sampler2D uImage;

#if_PICKING
uniform vec2 uResolution;
#end_PICKING

void main(void)
{
	vec4 texel = texture2D(uImage, vTexCoord / #MAX_TEXTURE_SIZE);
	if(texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)
	#if_PICKING
	if (uResolution.x == 1.0) { 
		gl_FragColor = vRGBA; //vec4(1.0, 1.0, 1.0, 1.0);
	}
	else {
		#if_RGBA
		gl_FragColor = texel * vRGBA;
		#else_RGBA
		gl_FragColor = texel;
		#end_RGBA				
	}
	#else_PICKING
		#if_RGBA
		gl_FragColor = texel * vRGBA;
		#else_RGBA
		gl_FragColor = texel;
		#end_RGBA
	#end_PICKING
}