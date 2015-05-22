/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o  \|/   o    o-o   
 *     o      o     <O>    o      o  
 *    o      o-o            o    o-o 
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

class Shader
{
	public var url:String;
	public var src:String = "";  // src not loaded
	public var programsCache_nr:Int = -1; // program not compiled
	public var programs_nr:Int = -1; // program not used
	
	public function new(url:String) 
	{
		this.url = url;
	}
	/*
	public static inline var default_vertexShaderSrc_old:String =
	"	precision mediump float;

		attribute vec3 aVertexPosStart;
		attribute vec2 aTime;
		attribute vec3 aVertexPosEnd;
		attribute vec2 aTexCoord;
		
		varying vec2 vTexCoord;
		
		//uniform mat4 uProjectionMatrix;
		uniform float uTime;
		uniform float uZoom;
		uniform vec2 uResolution;
		uniform vec2 uDelta;
		
		void main(void) {
			vTexCoord = aTexCoord;
			//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) ), 1.0);
			//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0), 1.0);
			
			float zoom = uZoom;
			float width = uResolution.x;
			float height = uResolution.y;
			float deltaX = floor(uDelta.x);
			float deltaY = floor(uDelta.y);
			
			float right = width-deltaX*zoom;
			float left = -deltaX*zoom;
			float bottom = height-deltaY*zoom;
			float top = -deltaY * zoom;
			
			float far = 1000.0;
			float near = -1000.0;
			
			gl_Position = mat4 (
				vec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),
				vec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),
				vec4(0.0, 0.0, -2.0 / (far - near), 0.0),
				vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0)
			)
			* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) * zoom)/zoom, 1.0);
		}
	";
	*/
	/*
	public static inline var default_vertexShaderSrc:String =
	"	precision mediump float;

		attribute vec2 aVertexPosStart;
		attribute float aTimeStart;
		attribute float aTimeEnd;
		attribute vec2 aVertexPosEnd;
		attribute float aZindex;
		attribute vec2 aTexCoord;
		
		varying vec2 vTexCoord;
		
		uniform float uTime;
		uniform float uZoom;
		uniform vec2 uResolution;
		uniform vec2 uDelta;
		
		void main(void) {
			vTexCoord = aTexCoord/2048.0;
			
			float zoom = uZoom;
			float width = uResolution.x;
			float height = uResolution.y;
			float deltaX = floor(uDelta.x);
			float deltaY = floor(uDelta.y);
			
			float right = width-deltaX*zoom;
			float left = -deltaX*zoom;
			float bottom = height-deltaY*zoom;
			float top = -deltaY * zoom;
			
			gl_Position = mat4 (
				vec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),
				vec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),
				vec4(0.0, 0.0, -0.001, 0.0),
				vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)
			)
			//* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTimeStart)/(aTimeEnd-aTimeStart), 1.0) * zoom)/zoom, aZindex ,1.0);
		* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * max( 0.0, min( (uTime-aTimeStart)/(aTimeEnd-aTimeStart), 1.0)) * zoom)/zoom, aZindex ,1.0);
		}
	";
	*/
	
	// TODO: TextureCache.max_texture_size auch per Template dynamisch ersetzen!!!
	public static inline var default_vertexShaderSrc:String =
	"	precision mediump float;

		// always twice if time dependend
		attribute vec4 aPosition;
		attribute vec2 aTime;
		
		attribute float aZindex;
		attribute vec2 aTexCoord;
		
		#if_RGBA
		attribute vec4 aRGBA;
		varying vec4 vRGBA;
		#end_RGBA

		varying vec2 vTexCoord;
		
		uniform float uTime;
		uniform float uZoom;
		uniform vec2 uResolution;
		uniform vec2 uDelta;
		
		void main(void) {
			#if_RGBA
			vRGBA = 255.0/aRGBA;
			#end_RGBA
			
			vTexCoord = aTexCoord;
			
			vec2 VertexPosStart = vec2( aPosition ); //vec2 (aPosition.x, aPosition.y);
			vec2 VertexPosEnd   = vec2 (aPosition.z, aPosition.w);
			
			float zoom = uZoom;
			float width = uResolution.x;
			float height = uResolution.y;
			float deltaX = floor(uDelta.x);
			float deltaY = floor(uDelta.y);
			
			float right = width-deltaX*zoom;
			float left = -deltaX*zoom;
			float bottom = height-deltaY*zoom;
			float top = -deltaY * zoom;
			
			gl_Position = mat4 (
				vec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),
				vec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),
				vec4(0.0, 0.0, -0.001, 0.0),
				vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)
			)
			* vec4 (VertexPosStart + floor( 
								(VertexPosEnd - VertexPosStart)
								* max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0))
								* zoom) / zoom
				, aZindex ,1.0);
		}
	";
	
	public static inline var default_fragmentShaderSrc:String =
	"	precision mediump float;
		varying vec2 vTexCoord;
		uniform sampler2D uImage;
		
		uniform vec2 uMouse, uResolution;
		
		void main(void)
		{
			vec4 texel = texture2D(uImage, vTexCoord / %MAX_TEXTURE_SIZE%);
			if(texel.a < 0.5) discard;
			gl_FragColor = texel;
		}
	";

}