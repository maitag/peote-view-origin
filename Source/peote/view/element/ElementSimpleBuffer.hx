/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o    _   o      o   
 *      o-o-o  o-o  (o)   o    o-o  
 *     o      o     / \    o      o 
 *    o      o-o   /  ))    o    o-o
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

package peote.view.element;

import haxe.io.Bytes;
import haxe.ds.Vector;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLBuffer;
import lime.utils.BytePointer;

import peote.view.displaylist.DisplaylistType;
import peote.view.program.Program;
import peote.view.Buffer;

@:keep
class ElementSimpleBuffer implements I_ElementBuffer
{
	public static var VERTEX_COUNT:Int = 6;
	
	public var attr:Vector<Int> = null;
	public var glBuff:GLBuffer;
		
	var emptyBuffFull:Bytes;
	var buffFull:Bytes;
	var buffFull_pos:Int;
	var buffSize:Int;

	var type:Int;
	
	var ZINDEX_OFFSET:Int;
	var RGBA_OFFSET:Int;
	var TEX_OFFSET:Int;
	var PICKING_OFFSET:Int;

	var VERTEX_STRIDE:Int;

	public function new(t:Int, b:Buffer)
	{	
		type = t;
		
		var offset = 4;
		if (type & DisplaylistType.ZINDEX != 0) { ZINDEX_OFFSET = offset; offset += 4;  } 
		if (type & DisplaylistType.RGBA != 0)   { RGBA_OFFSET   = offset; offset += 4;  } 
		if (type & DisplaylistType.PICKING != 0) { PICKING_OFFSET = offset; offset += 4; }
		TEX_OFFSET    = offset; offset += 4;
		VERTEX_STRIDE = offset;
		
		buffSize = VERTEX_COUNT * VERTEX_STRIDE;
		var size:Int = b.max_segments * b.segment_size * buffSize;
		var full:Bytes = Bytes.alloc(size);

		// create new opengl buffer 
		glBuff = GL.createBuffer();
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferData (GL.ARRAY_BUFFER, size, new BytePointer(full) , GL.STATIC_DRAW); // GL.DYNAMIC_DRAW GL.STREAM_DRAW
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		
		buffFull      = Bytes.alloc(buffSize);
		emptyBuffFull = Bytes.alloc(buffSize);
		emptyBuffFull.fill(0, buffSize, 0);		
	}
	
	public inline function delete():Void
	{
		GL.deleteBuffer(glBuff);
	}
	
	public inline function disableVertexAttributes():Void
	{
		GL.disableVertexAttribArray (attr.get(Program.aPOSITION));
		if (type & DisplaylistType.ZINDEX != 0)  GL.disableVertexAttribArray (attr.get(Program.aZINDEX));
		if (type & DisplaylistType.RGBA != 0)    GL.disableVertexAttribArray (attr.get(Program.aRGBA));
		if (type & DisplaylistType.PICKING != 0) GL.disableVertexAttribArray (attr.get(Program.aELEMENT));
		GL.disableVertexAttribArray (attr.get(Program.aTEXTCOORD));
	}
	public inline function setVertexAttributes():Void
	{		
		// vertexAttribPointers
		GL.enableVertexAttribArray (attr.get(Program.aPOSITION));
		if (type & DisplaylistType.ZINDEX != 0) GL.enableVertexAttribArray (attr.get(Program.aZINDEX));
		if (type & DisplaylistType.RGBA   != 0) GL.enableVertexAttribArray (attr.get(Program.aRGBA));
		if (type & DisplaylistType.PICKING != 0) GL.enableVertexAttribArray (attr.get(Program.aELEMENT));
		GL.enableVertexAttribArray (attr.get(Program.aTEXTCOORD));
		
		GL.vertexAttribPointer (attr.get(Program.aPOSITION), 2, GL.SHORT, false, VERTEX_STRIDE, 0 );
		if (type & DisplaylistType.ZINDEX != 0)  GL.vertexAttribPointer (attr.get(Program.aZINDEX), 1, GL.FLOAT,         false, VERTEX_STRIDE, ZINDEX_OFFSET );
		if (type & DisplaylistType.RGBA   != 0)  GL.vertexAttribPointer (attr.get(Program.aRGBA  ), 4, GL.UNSIGNED_BYTE,  true, VERTEX_STRIDE, RGBA_OFFSET );
		if (type & DisplaylistType.PICKING != 0) GL.vertexAttribPointer (attr.get(Program.aELEMENT), 4, GL.UNSIGNED_BYTE,  true, VERTEX_STRIDE, PICKING_OFFSET );
		
		GL.vertexAttribPointer (attr.get(Program.aTEXTCOORD),2, GL.SHORT, false, VERTEX_STRIDE, TEX_OFFSET );// TODO: evtl. optimize mit medium_float
	}

	public inline function del(e:I_Element):Void
	{
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferSubData(GL.ARRAY_BUFFER, e.buf_pos * VERTEX_STRIDE , buffSize, new BytePointer(emptyBuffFull));
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		
	}

	public inline function rotX( x:Int, y:Int, pivotX:Int, pivotY:Int, alpha:Float ):Int
	{
		return(	Math.round(
				 (x - pivotX) * Math.cos(alpha)
				-(y - pivotY) * Math.sin(alpha)
				+ pivotX ));
	}
	public inline function rotY( x:Int, y:Int, pivotX:Int, pivotY:Int, alpha:Float ):Int
	{
		return( Math.round(
				  (y - pivotY) * Math.cos(alpha)
				+ (x - pivotX) * Math.sin(alpha)
				+ pivotY ));
	}
	
	public inline function set( e:I_Element, param:ElementParam ):Void
	{
		var buf_pos:Int = e.buf_pos;
		
		var x:Int, y:Int, xw:Int, yh:Int, x1:Int, y1:Int, xw1:Int, yh1:Int;
		
		if (type & DisplaylistType.ROTATION != 0 && param.rotation != null) 
		{
			param.pivotX = (param.pivotX != null) ? param.x + param.pivotX : param.x;
			param.pivotY = (param.pivotY != null) ? param.y + param.pivotY : param.y;
			
			var alpha:Float = param.rotation / 180 * Math.PI;
			
			x  = rotX( param.x, param.y, param.pivotX, param.pivotY, alpha );
			y  = rotY( param.x, param.y, param.pivotX, param.pivotY, alpha );
			xw = rotX( param.x + param.w, param.y + param.h, param.pivotX, param.pivotY, alpha );
			yh = rotY( param.x + param.w, param.y + param.h, param.pivotX, param.pivotY, alpha );
			
			x1  = rotX( param.x, param.y + param.h, param.pivotX, param.pivotY, alpha );
			y1  = rotY( param.x + param.w, param.y, param.pivotX, param.pivotY, alpha );
			xw1 = rotX( param.x + param.w, param.y, param.pivotX, param.pivotY, alpha );
			yh1 = rotY( param.x, param.y + param.h, param.pivotX, param.pivotY, alpha );
		}
		else
		{
			x  = x1  = param.x;
			y  = y1  = param.y;
			xw = xw1 = x + param.w;
			yh = yh1 = y + param.h;
		}
		
		var z:Float = Math.max(0.0, Math.min(1.0, param.z/32767) );
		var rgba:Int = param.rgba;
		
		var tx:Int = param.tx;
		var ty:Int = param.ty;
		var txw:Int = tx + param.tw;
		var tyh:Int = ty + param.th;
		
		param.element+=1; // picking
		
		// TODO: Optimize -> write only changed values to buffer ( start / end counter ) -> Array of pre-sized buffers!
		
		//buffFull.setByteOffset( 0 );
		
		buffFull_pos = 0;
		
		write_2_Short( xw, yh );                                                // VERTEX_POSITION_START
		if (type & DisplaylistType.ZINDEX  != 0) write_1_Float( z );            // Z INDEX
		if (type & DisplaylistType.RGBA    != 0) write_1_UInt( rgba );          // RGBA
		if (type & DisplaylistType.PICKING != 0) write_1_UInt( param.element ); // ELEMENT
		write_2_Short( txw, tyh );                                              // TEXT COORD 
		
		write_2_Short( xw , yh );                                               // VERTEX_POSITION_START
		if (type & DisplaylistType.ZINDEX  != 0) write_1_Float(  z );           // Z INDEX
		if (type & DisplaylistType.RGBA    != 0) write_1_UInt(  rgba );         // RGBA
		if (type & DisplaylistType.PICKING != 0) write_1_UInt(  param.element );// ELEMENT
		write_2_Short( txw , tyh );                                             // TEXT COORD 
		
		write_2_Short( x1 , yh1 );                                              // VERTEX_POSITION_START
		if (type & DisplaylistType.ZINDEX  != 0) write_1_Float(  z );           // Z INDEX
		if (type & DisplaylistType.RGBA    != 0) write_1_UInt(  rgba );         // RGBA
		if (type & DisplaylistType.PICKING != 0) write_1_UInt(  param.element );// ELEMENT
		write_2_Short( tx , tyh );                                              // TEXT COORD 
		
		write_2_Short( xw1 , y1 );                                              // VERTEX_POSITION_START
		if (type & DisplaylistType.ZINDEX  != 0) write_1_Float(  z );           // Z INDEX
		if (type & DisplaylistType.RGBA    != 0) write_1_UInt(  rgba );         // RGBA
		if (type & DisplaylistType.PICKING != 0) write_1_UInt(  param.element );// ELEMENT
		write_2_Short( txw , ty );                                              // TEXT COORD 
		
		write_2_Short( x , y );                                                 // VERTEX_POSITION_START
		if (type & DisplaylistType.ZINDEX  != 0) write_1_Float(  z );           // Z INDEX
		if (type & DisplaylistType.RGBA    != 0) write_1_UInt(  rgba );         // RGBA
		if (type & DisplaylistType.PICKING != 0) write_1_UInt(  param.element );// ELEMENT
		write_2_Short(  tx , ty );                                              // TEXT COORD 
		
		write_2_Short( x , y );                                                 // VERTEX_POSITION_START
		if (type & DisplaylistType.ZINDEX  != 0) write_1_Float(  z );           // Z INDEX
		if (type & DisplaylistType.RGBA    != 0) write_1_UInt(  rgba );         // RGBA
		if (type & DisplaylistType.PICKING != 0) write_1_UInt(  param.element );// ELEMENT
		write_2_Short( tx , ty );                                               // TEXT COORD 
		
		
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferSubData(GL.ARRAY_BUFFER, buf_pos * VERTEX_STRIDE , buffSize, new BytePointer(buffFull));
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}

	inline function write_2_Short( a:Int, b:Int ):Void {
		buffFull.setUInt16(buffFull_pos, a); buffFull_pos += 2;
		buffFull.setUInt16(buffFull_pos, b); buffFull_pos += 2;
	}
	inline function write_1_Float( a:Float ):Void {
		buffFull.setFloat(buffFull_pos, a ); buffFull_pos += 4;
	}
	inline function write_1_UInt( a:Int ):Void {
		buffFull.setInt32(buffFull_pos, a ); buffFull_pos += 4;
	}
	
	
	/*
	public inline function setTexCoord(e:I_Element, param:Param):Void
	{
		var buf_pos:Int = e.buf_pos;
		
		var tx:Int = param.tx;
		var ty:Int = param.ty;
		var txw:Int = tx + param.tw;
		var tyh:Int = ty + param.th;
		
		
		
		bufferDataTex( buffTex_0, 
			txw, tyh	// TEXT COORD twice
		);
		bufferDataTex( buffTex_1, 
			tx, tyh		// TEXT_COORD
		);	
		bufferDataTex( buffTex_2, 
			txw, ty			// TEXT_COORD
		);	
		bufferDataTex( buffTex_3, 
			tx,  ty			// TEXT_COORD twice
		);				
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferSubData( GL.ARRAY_BUFFER, (buf_pos  ) * VERTEX_STRIDE + TEX_OFFSET, buffTex_0.dataView );
		GL.bufferSubData( GL.ARRAY_BUFFER, (buf_pos+1) * VERTEX_STRIDE + TEX_OFFSET, buffTex_0.dataView );
		GL.bufferSubData( GL.ARRAY_BUFFER, (buf_pos+2) * VERTEX_STRIDE + TEX_OFFSET, buffTex_1.dataView );
		GL.bufferSubData( GL.ARRAY_BUFFER, (buf_pos+3) * VERTEX_STRIDE + TEX_OFFSET, buffTex_2.dataView );
		GL.bufferSubData( GL.ARRAY_BUFFER, (buf_pos+4) * VERTEX_STRIDE + TEX_OFFSET, buffTex_3.dataView );
		GL.bufferSubData( GL.ARRAY_BUFFER, (buf_pos+5) * VERTEX_STRIDE + TEX_OFFSET, buffTex_3.dataView );
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}
	*/
	
	// ----------------------------------------------------------------------------------
	public inline function getDefaultFragmentShaderSrc():String
	{
		return(ElementSimpleBuffer.defaultFragmentShaderSrc);
	}
	
	public inline function getDefaultVertexShaderSrc():String
	{
		return(ElementSimpleBuffer.defaultVertexShaderSrc);
	}
	
	// ----------------------------------------------------------------------------------
	
	public static inline var defaultVertexShaderSrc:String =
	
	"	attribute vec2 aPosition;
		
		#if_ZINDEX
		attribute float aZindex;
		#end_ZINDEX
		
		#if_RGBA
		attribute vec4 aRGBA;
		varying vec4 vRGBA;
		#end_RGBA

		#if_PICKING
		attribute vec4 aElement;
			#if_RGBA
			#else_RGBA
			varying vec4 vRGBA;
			#end_RGBA
		#end_PICKING
			
		attribute vec2 aTexCoord;
		
		varying vec2 vTexCoord;
		
		uniform float uTime;
		uniform float uZoom;
		uniform vec2 uResolution;
		uniform vec2 uDelta;
		
		void main(void) {
			#if_RGBA
			vRGBA = aRGBA.wzyx;
			#end_RGBA
			
			#if_PICKING
			if (uResolution.x == 1.0) {
				vRGBA = aElement;
			}
			#end_PICKING
			
			vTexCoord = aTexCoord;
						
			float zoom = uZoom;
			float width = uResolution.x;
			float height = uResolution.y;
			float deltaX = uDelta.x;// floor(uDelta.x);
			float deltaY = uDelta.y;// floor(uDelta.y);
			
			float right = width-deltaX*zoom;
			float left = -deltaX*zoom;
			float bottom = height-deltaY*zoom;
			float top = -deltaY * zoom;
			
			gl_Position = mat4 (
				vec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),
				vec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),
				vec4(0.0, 0.0, -1.0, 0.0),
				vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)
			)
			* vec4 (aPosition ,
				#if_ZINDEX
				aZindex
				#else_ZINDEX
				0.0
				#end_ZINDEX
				, 1.0
				);
		}
	";
	
	public static inline var defaultFragmentShaderSrc:String =
	
	"	varying vec2 vTexCoord;
		#if_RGBA
		varying vec4 vRGBA;
		#else_RGBA
			#if_PICKING
			varying vec4 vRGBA;
			#end_PICKING
		#end_RGBA
		
		#if_PICKING
		uniform vec2 uResolution;
		#end_PICKING
		
		
		#if_TEXTURE0
		uniform sampler2D uTexture0;
		#end_TEXTURE0
		
		#if_TEXTURE1
		uniform sampler2D uTexture1;
		#end_TEXTURE1
		
		void main(void)
		{	
			#if_TEXTURE0
			vec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);
			#else_TEXTURE0
			vec4 texel = vec4(1.0, 1.0, 1.0, 1.0);
			#end_TEXTURE0
			
			// if use more than one texture unit to combine or do something crazy here:)
			#if_TEXTURE1
			texel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);
			#end_TEXTURE1
			// ... TEXTURE2 ...TEXTURE3 ...
			
			//if (texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)
			if (texel.a == 0.0) discard; // TODO (z-order/blend mode!!!)
			
			#if_PICKING
			if (uResolution.x == 1.0) { 
				gl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;
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
	";

}