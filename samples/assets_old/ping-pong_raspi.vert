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

attribute vec4 aPosition;

#if_ZINDEX
attribute float aZindex;
#end_ZINDEX

#if_RGBA
attribute vec4 aRGBA;
attribute vec4 aRGBA_END;
varying vec4 vRGBA;
#end_RGBA

#if_ROTATION
attribute vec2 aRotation;
attribute vec4 aPivot;
#end_ROTATION

attribute vec2 aTime;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

uniform float uTime;
uniform float uZoom;
uniform vec2 uResolution;
uniform vec2 uDelta;

void main(void) {
	#if_RGBA
	vRGBA = mix(aRGBA.wzyx, aRGBA_END.wzyx, clamp( (uTime-aTime.x)/(aTime.y - aTime.x), 0.0, 1.0) );	
	//vRGBA = aRGBA.wzyx + (aRGBA_END.wzyx - aRGBA.wzyx) * clamp( (uTime-aTime.x)/(aTime.y - aTime.x), 0.0, 1.0);
	#end_RGBA
	
	vTexCoord = aTexCoord;
	
	vec2 VertexPosStart = vec2( aPosition );
	vec2 VertexPosEnd   = vec2 (aPosition.z, aPosition.w);
	
	#if_ROTATION
	float alpha = aRotation.x + (aRotation.y - aRotation.x)	* (uTime-aTime.x) / (aTime.y - aTime.x);
						
	VertexPosStart = (VertexPosStart - vec2(aPivot))
					* mat2 (
						vec2(cos(alpha), -sin(alpha)),
						vec2(sin(alpha),  cos(alpha))
					) + vec2(aPivot);
	
	VertexPosEnd = (VertexPosEnd -  vec2(aPivot.z, aPivot.w))
					* mat2 (
						vec2(cos(alpha), -sin(alpha)),
						vec2(sin(alpha),  cos(alpha))
					) + vec2(aPivot.z, aPivot.w);
	#end_ROTATION
	
	float zoom = uZoom;
	float width = uResolution.x;
	float height = uResolution.y;
	float deltaX = floor(uDelta.x);
	float deltaY = floor(uDelta.y);
	
	float right = width-deltaX*zoom;
	float left = -deltaX*zoom;
	float bottom = height-deltaY*zoom;
	float top = -deltaY * zoom;
	
	float x = VertexPosStart.x + floor( 
						(VertexPosEnd.x - VertexPosStart.x)
						* (uTime-aTime.x) / (aTime.y - aTime.x)
						* zoom) / zoom;
						
	float signx = sign(-x);
    float swapX = mod(floor(signx*x / width), 2.0);

	float y = VertexPosStart.y + floor( 
						(VertexPosEnd.y - VertexPosStart.y)
						* (uTime-aTime.x) / (aTime.y - aTime.x)
						* zoom) / zoom;
						
	float signy = sign(-y);
	float swapY = mod(floor(signy*y / height), 2.0);

	
	gl_Position = mat4 (
		vec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),
		vec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),
		vec4(0.0, 0.0, -1.0, 0.0),
		vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)
	)
	* vec4 (
		swapX * (width - mod(signx*x, width)) + (1.0 - swapX) * mod(signx*x, width),
		swapY * (height - mod(signy*y, height)) + (1.0 - swapY) * mod(signy*y, height),
		#if_ZINDEX
		aZindex
		#else_ZINDEX
		0.0
		#end_ZINDEX
		, 1.0
	);
}
