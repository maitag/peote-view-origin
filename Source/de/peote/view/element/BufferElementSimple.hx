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

import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLBuffer;
import lime.utils.ArrayBufferView;

//import lime.utils.Float32Array;
//import lime.utils.Int16Array;

class BufferElementSimple implements I_BufferElement
{
	public static var VERTEX_COUNT:Int = 6;
	
	public var glBuff:GLBuffer;
		
	private var emptyBuffFull:BufferData;
	private var buffFull:BufferData;
	
	private var buffTex_0:BufferData;
	private var buffTex_1:BufferData;
	private var buffTex_2:BufferData;
	private var buffTex_3:BufferData;
	
	public function new(b:Buffer)
	{	
		
		var full = new BufferData(b.max_segments * b.segment_size * VERTEX_COUNT * VERTEX_STRIDE);

		// create new opengl buffer 
		glBuff = GL.createBuffer();
		GL.bindBuffer (GL.ARRAY_BUFFER, glBuff);
		GL.bufferData (GL.ARRAY_BUFFER, full.dataView , GL.STATIC_DRAW); // GL.DYNAMIC_DRAW GL.STREAM_DRAW
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		
		// ------------ BufferViews pre initialized -----------------
		buffFull      = new BufferData (VERTEX_COUNT * VERTEX_STRIDE);
		emptyBuffFull = new BufferData (VERTEX_COUNT * VERTEX_STRIDE);
		
		buffTex_0     = new BufferData (4);
		buffTex_1     = new BufferData (4);
		buffTex_2     = new BufferData (4);
		buffTex_3     = new BufferData (4);

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
		GL.disableVertexAttribArray (Program.aPosition);
		GL.disableVertexAttribArray (Program.aTime);
		GL.disableVertexAttribArray (Program.aZindex);
		GL.disableVertexAttribArray (Program.aTexCoord);
	}
	public inline function setVertexAttributes():Void
	{		
		// vertexAttribPointers
		GL.enableVertexAttribArray (Program.aPosition);
		GL.enableVertexAttribArray (Program.aTime);
		GL.enableVertexAttribArray (Program.aZindex);
		GL.enableVertexAttribArray (Program.aTexCoord);
		
		GL.vertexAttribPointer (Program.aPosition, 4, GL.SHORT, false, VERTEX_STRIDE, 0   );
		//GL.vertexAttribPointer (Program.aRGBA,    2, GL.UNSIGNED_SHORT,false, VERTEX_STRIDE, +4  );
		//GL.vertexAttribPointer (Program.aScale,   2, GL.SHORT        , false, VERTEX_STRIDE, +8  );
		//GL.vertexAttribPointer (Program.aRotation,2, GL.SHORT        , false, VERTEX_STRIDE, +12 );
		//kein TREE: GL.vertexAttribPointer (Program.aTile,      2, GL.UNSIGNED_SHORT,false, VERTEX_STRIDE, +16  );
		
		GL.vertexAttribPointer (Program.aTime,      2, GL.FLOAT, false, VERTEX_STRIDE, TIME_OFFSET );
		
		// GL.vertexAttribPointer (Program.aPivot,       2, GL.SHORT, false, VERTEX_STRIDE, TREE_PARAM_OFFSET+8);
		GL.vertexAttribPointer (Program.aZindex,         1, GL.FLOAT, false, VERTEX_STRIDE, PARAM_OFFSET);
		// GL.vertexAttribPointer (Program.aParam,       2, GL.SHORT, false, VERTEX_STRIDE, PARAM_OFFSET+4 );
		GL.vertexAttribPointer (Program.aTexCoord,       2, GL.SHORT, false, VERTEX_STRIDE, TEX_OFFSET );// TODO: evtl. optimize mit medium_float
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
	

}