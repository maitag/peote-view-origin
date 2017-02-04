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

#if js
import js.html.ArrayBuffer;
import js.html.DataView;
#else
import lime.utils.ArrayBufferView;
#end

class BufferData #if !js extends ArrayBufferView #end
{
	#if js
	public var dataView:DataView;
	public var byteOffset:Int;
	#else
	public var dataView:ArrayBufferView;
	#end

	public function new(length:Int)
	{	
		#if js
		dataView = new DataView(new ArrayBuffer(length), 0);
		#else
		super(length, 0); // -> TypedArrayType.None
		dataView = this;
		#end
	}
	
	public inline function setByteOffset(b:Int):Void
	{
		byteOffset = b;
		
		#if !(cpp || js)
		buffer.position = byteOffset;
		#end
	}
	
	public inline function write_3_Short(a1:Int, a2:Int, a3:Int):Void
	{
			#if cpp
			//untyped __global__.__hxcpp_memory_set_i16 (buffer, byteOffset,   a1);
			//untyped __global__.__hxcpp_memory_set_i16 (buffer, byteOffset+2, a2);
			//untyped __global__.__hxcpp_memory_set_i16 (buffer, byteOffset + 4, a3);
			ArrayBufferIO.setInt16(buffer, byteOffset, a1);
			ArrayBufferIO.setInt16(buffer, byteOffset+2, a2);
			ArrayBufferIO.setInt16(buffer, byteOffset+4, a3);
			#elseif js
			dataView.setInt16 (byteOffset,   a1,true);
			dataView.setInt16 (byteOffset+2, a2,true);
			dataView.setInt16 (byteOffset+4, a3,true);
			#else
			buffer.writeShort (a1);
			buffer.writeShort (a2);
			buffer.writeShort (a3);
			#end
			
			byteOffset += 6;
	}
	
	public inline function write_2_Short(a1:Int, a2:Int):Void
	{
			#if cpp
			//untyped __global__.__hxcpp_memory_set_i16 (buffer, byteOffset,   a1);
			//untyped __global__.__hxcpp_memory_set_i16 (buffer, byteOffset+2, a2);
			ArrayBufferIO.setInt16(buffer, byteOffset, a1);
			ArrayBufferIO.setInt16(buffer, byteOffset+2, a2);
			#elseif js
			dataView.setInt16 (byteOffset,   a1,true);
			dataView.setInt16 (byteOffset+2, a2,true);			
			#else
			buffer.writeShort (a1);
			buffer.writeShort (a2);
			#end
			
			byteOffset += 4;
	}
	
	public inline function write_1_UInt(a1:UInt):Void
	{
			#if cpp
			//untyped __global__.__hxcpp_memory_set_i32 (buffer, byteOffset,   a1); // check for uint !?
			ArrayBufferIO.setUint32(buffer, byteOffset, a1);
			#elseif js
			dataView.setUint32 (byteOffset,     a1, true);
			#else
			buffer.writeUnsignedInt (a1);
			#end
			
			byteOffset += 4;
	}
	
	public inline function write_1_Float(a1:Float):Void
	{
			#if cpp
			//untyped __global__.__hxcpp_memory_set_float (buffer, byteOffset,   a1);
			ArrayBufferIO.setFloat32(buffer, byteOffset, a1);
			#elseif js
			dataView.setFloat32 (byteOffset,     a1, true);
			#else
			buffer.writeFloat (a1);
			#end
			
			byteOffset += 4;
	}
	
	public inline function write_2_Float(a1:Float, a2:Float):Void
	{
			#if cpp
			//untyped __global__.__hxcpp_memory_set_float (buffer, byteOffset,   a1);
			//untyped __global__.__hxcpp_memory_set_float (buffer, byteOffset+4, a2);
			ArrayBufferIO.setFloat32(buffer, byteOffset, a1);
			ArrayBufferIO.setFloat32(buffer, byteOffset+4, a2);
			#elseif js
			dataView.setFloat32 (byteOffset,     a1, true);
			dataView.setFloat32 (byteOffset + 4, a2, true);
			#else
			buffer.writeFloat (a1);
			buffer.writeFloat (a2);
			#end
			
			byteOffset += 8;
	}
	
}