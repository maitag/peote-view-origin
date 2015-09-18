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

package de.peote.view.element;

import de.peote.view.ProgramCache;

import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLBuffer;
import lime.utils.ArrayBufferView;
import haxe.ds.Vector;

//import lime.utils.Float32Array;
//import lime.utils.Int16Array;
class ElementAnimBuffer implements I_ElementBuffer
{
	public static var VERTEX_COUNT:Int = 6;
	
	public var attr:Vector<Int> = null;
	public var glBuff:GLBuffer;
		
	var emptyBuffFull:BufferData;
	var buffFull:BufferData;
	
	var buffTex_0:BufferData;
	var buffTex_1:BufferData;
	var buffTex_2:BufferData;
	var buffTex_3:BufferData;
	
	var type:Int;
	
	public function new(t:Int, b:Buffer)
	{	
		type = t;
		var full = new BufferData(b.max_segments * b.segment_size * VERTEX_COUNT * VERTEX_STRIDE);

		// create new opengl buffer 
		glBuff = GL.createBuffer();
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferData (GL.ARRAY_BUFFER, full.dataView , GL.STATIC_DRAW); // GL.DYNAMIC_DRAW GL.STREAM_DRAW
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		
		// ------------ BufferViews pre initialized -----------------
		buffFull      = new BufferData (VERTEX_COUNT * VERTEX_STRIDE);
		emptyBuffFull = new BufferData (VERTEX_COUNT * VERTEX_STRIDE);
		/*
		buffTex_0     = new BufferData (4);
		buffTex_1     = new BufferData (4);
		buffTex_2     = new BufferData (4);
		buffTex_3     = new BufferData (4);
		*/
	}
	
	public inline function delete():Void
	{
		GL.deleteBuffer(glBuff);
	}
		
	public static var ANIM_PARAM_SIZE  :Int = 8; // aPosition,       4, GL.SHORT
	public static var PARAM_SIZE       :Int = 4; // aZindex,         1, GL.FLOAT
	
	public static var TIME_OFFSET      :Int = ANIM_PARAM_SIZE;
	public static var PARAM_OFFSET     :Int = TIME_OFFSET + 8;  // + aTime,      2, GL.FLOAT
	public static var TEX_OFFSET       :Int = PARAM_OFFSET + PARAM_SIZE;
	
	public static var VERTEX_STRIDE :Int = TEX_OFFSET + 4; // + aTexCoord,       2, GL.SHORT
	
	public inline function disableVertexAttributes():Void
	{
		GL.disableVertexAttribArray (attr.get(Program.aPOSITION));
		GL.disableVertexAttribArray (attr.get(Program.aTIME));
		GL.disableVertexAttribArray (attr.get(Program.aZINDEX));
		GL.disableVertexAttribArray (attr.get(Program.aTEXTCOORD));
	}
	public inline function setVertexAttributes():Void
	{		
		// vertexAttribPointers
		GL.enableVertexAttribArray (attr.get(Program.aPOSITION));
		GL.enableVertexAttribArray (attr.get(Program.aTIME));
		GL.enableVertexAttribArray (attr.get(Program.aZINDEX));
		GL.enableVertexAttribArray (attr.get(Program.aTEXTCOORD));
		
		GL.vertexAttribPointer (attr.get(Program.aPOSITION), 4, GL.SHORT, false, VERTEX_STRIDE, 0   );
		//GL.vertexAttribPointer (Program.aRGBA,    2, GL.UNSIGNED_SHORT,false, VERTEX_STRIDE, +4  );
		//GL.vertexAttribPointer (Program.aScale,   2, GL.SHORT        , false, VERTEX_STRIDE, +8  );
		//GL.vertexAttribPointer (Program.aRotation,2, GL.SHORT        , false, VERTEX_STRIDE, +12 );
		//kein TREE: GL.vertexAttribPointer (Program.aTile,      2, GL.UNSIGNED_SHORT,false, VERTEX_STRIDE, +16  );
		
		GL.vertexAttribPointer (attr.get(Program.aTIME),     2, GL.FLOAT, false, VERTEX_STRIDE, TIME_OFFSET );
		
		// GL.vertexAttribPointer (Program.aPivot,       2, GL.SHORT, false, VERTEX_STRIDE, TREE_PARAM_OFFSET+8);
		GL.vertexAttribPointer (attr.get(Program.aZINDEX),   1, GL.FLOAT, false, VERTEX_STRIDE, PARAM_OFFSET);
		// GL.vertexAttribPointer (Program.aParam,       2, GL.SHORT, false, VERTEX_STRIDE, PARAM_OFFSET+4 );
		GL.vertexAttribPointer (attr.get(Program.aTEXTCOORD),2, GL.SHORT, false, VERTEX_STRIDE, TEX_OFFSET );// TODO: evtl. optimize mit medium_float
		// damit stride hinhaut einfach VERTEX_STRIDE erhoehen wenn noetig
	}

	public inline function bufferDataFull( x_start:Int,   y_start:Int,
	                                       x_end:Int,     y_end:Int,
	                                       t_start:Float, t_end:Float,
										   z:Int,
	                                       tx:Int,        ty:Int ):Void
	{
		buffFull.write_2_Short( x_start, y_start ); // VERTEX_POSITION_START
		buffFull.write_2_Short( x_end,   y_end   ); // VERTEX_POSITION_END
		buffFull.write_2_Float( t_start, t_end   ); // TIME START, END
		buffFull.write_1_Float( z );                // Z INDEX
		buffFull.write_2_Short( tx, ty );           // TEXT COORD 
	}

	public inline function bufferDataTex( b:BufferData, tx:Int, ty:Int ):Void
	{
		b.setByteOffset( 0 );
		b.write_2_Short( tx, ty );               // TEXT COORD 
		b.setByteOffset( 0 );
	}
	
	public inline function del(e:I_Element):Void
	{
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferSubData(GL.ARRAY_BUFFER, e.buf_pos * VERTEX_STRIDE , emptyBuffFull.dataView);
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		
	}

	public inline function set( e:I_Element, param:Param ):Void
	{
		var buf_pos:Int = e.buf_pos;
		
		// animable
		
		var x1:Int = param.start.x;
		var y1:Int = param.start.y;
		var x2:Int = param.end.x;
		var y2:Int = param.end.y;
		
		var xw1:Int = x1 + param.start.w;
		var yh1:Int = y1 + param.start.h;
		var xw2:Int = x2 + param.end.w;
		var yh2:Int = y2 + param.end.h;
		
		var t1:Float = param.start.time;
		var t2:Float = param.end.time;

		// static
		
		var z:Int = param.z;

		var tx:Int = param.tx;
		var ty:Int = param.ty;
		var txw:Int = tx + param.tw;
		var tyh:Int = ty + param.th;
		
		
		buffFull.setByteOffset( 0 );
		bufferDataFull(
			xw1,  yh1, // VERTEX_START 
			xw2,  yh2, // VERTEX_END
			t1,   t2,  // TIME         
			z,
			txw, tyh   // TEXT COORD   
		);
		bufferDataFull(
			xw1,  yh1, // VERTEX_START
			xw2,  yh2, // VERTEX_END
			t1,   t2,  // TIME         
			z,
			txw, tyh   // TEXT COORD  
		);
		bufferDataFull(
			x1,  yh1,  // VERTEX_START 
			x2,  yh2,  // VERTEX_END
			t1,   t2,  // TIME         
			z,
			tx, tyh    // TEXT COORD   
		);              
		bufferDataFull( 
			xw1,  y1,  // VERTEX_START 
			xw2,  y2,  // VERTEX_END
			t1,   t2,  // TIME         
			z,
			txw, ty    // TEXT COORD   
		);              
		bufferDataFull( 
			x1,  y1,   // VERTEX_START 
			x2,  y2,   // VERTEX_END
			t1,  t2,   // TIME         
			z,
			tx, ty     // TEXT COORD   
		);              
		bufferDataFull( 
			x1,  y1,   // VERTEX_START 
			x2,  y2,   // VERTEX_END
			t1,  t2,   // TIME         
			z,
			tx, ty     // TEXT COORD   
		);
		buffFull.setByteOffset( 0 );
		
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferSubData(GL.ARRAY_BUFFER, buf_pos * VERTEX_STRIDE , buffFull.dataView);
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
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
		return(ElementAnimBuffer.defaultFragmentShaderSrc);
	}
	
	public inline function getDefaultVertexShaderSrc():String
	{
		return(ElementAnimBuffer.defaultVertexShaderSrc);
	}
	
	// ----------------------------------------------------------------------------------
	
	public static inline var defaultVertexShaderSrc:String =
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
	
	public static inline var defaultFragmentShaderSrc:String =
	"	precision mediump float;
		varying vec2 vTexCoord;
		uniform sampler2D uImage;
		
		uniform vec2 uMouse, uResolution;
		
		void main(void)
		{
			vec4 texel = texture2D(uImage, vTexCoord / #MAX_TEXTURE_SIZE);
			if(texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)
			gl_FragColor = texel;
		}
	";
}