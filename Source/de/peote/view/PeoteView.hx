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

import haxe.Timer;
import lime.gl.GL;
import lime.utils.Float32Array;
import lime.utils.Matrix3D;

class PeoteView
{
	private var displaylist:Displaylist;
	private var texturecache:TextureCache;
	
	
	public function new(max_elements:Int = 100000, max_programs:Int = 100) 
	{
		trace("GL.MAX_TEXTURE_IMAGE_UNITS:" + GL.getParameter(GL.MAX_TEXTURE_IMAGE_UNITS));
		trace("GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS:" + GL.getParameter(GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
		trace("GL.MAX_TEXTURE_SIZE:" + GL.getParameter(GL.MAX_TEXTURE_SIZE));
		trace("GL.MAX_VERTEX_ATTRIBS:" + GL.getParameter(GL.MAX_VERTEX_ATTRIBS));
		trace("GL.MAX_VERTEX_UNIFORM_VECTORS:" + GL.getParameter(GL.MAX_VERTEX_UNIFORM_VECTORS));
		trace("GL.MAX_FRAGMENT_UNIFORM_VECTORS:" + GL.getParameter(GL.MAX_FRAGMENT_UNIFORM_VECTORS));
		
		// (for low-end devices better max_elements < 100 000)
		displaylist = new Displaylist(max_elements, max_programs);
		// TODO:  img_width, img_height, max_images
		texturecache = new TextureCache(512, 512, 64, onLoadImage);
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- API --------- -------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public inline function setShader(shader_nr:Int, shaderUrl:String):Void
	{
		// TODO: load shader source from url
		displaylist.setShaderSrc(shader_nr, '','');
	}
	
	public inline function setShaderSrc(shader_nr:Int,
	                                    fsSrc:String = Shader.default_fragmentShaderSrc,
	                                    vsSrc:String = Shader.default_vertexShaderSrc):Void
	{
		displaylist.setShaderSrc(shader_nr, fsSrc, vsSrc);
	}
	
	public inline function setImage(image_nr:Int, imageUrl:String):Void
	{
		texturecache.setImage(image_nr, imageUrl);
	}
	
	public inline function setTilesheet(tilesheet_nr:Int, image_nr:Int, textCoordArray:Float32Array):Void
	{
		// TODO: custom mapping
	}
	
	public inline function setElement(nr:Int, x:Int, y:Int, z:Int, w:Int, h:Int,
	                                  shader_nr:Int, image_nr:Int = -1, tile_nr:Int = -1):Void
	{
		
		if (image_nr > -1) // image_nr uebergeben
		{
			//trace("Image:" + image_nr);
			var img:Image = texturecache.getImage(image_nr);
			if (img.cache_nr >= 0)
			{
				//trace("Image exist:" + image_nr);
				displaylist.setElement(nr, x, y, z, w, h, shader_nr, img.tx, img.ty, img.tw, img.th, image_nr, tile_nr);
			}
			else
			{
				//trace("load Image:" + image_nr);
				// TODO: default Image
				displaylist.setElement(nr, x, y, z, w, h, shader_nr, 0, 0, 0, 0, image_nr,  tile_nr);
				texturecache.loadImage( nr, image_nr, tile_nr);
			}
		}
		else displaylist.setElement(nr, x, y, z, w, h, shader_nr, 0.0, 0.0, 1.0, 1.0, image_nr, tile_nr);
	}
	
	public function onLoadImage(nr:Int, image_nr:Int, tile_nr:Int, img:Image):Void
	{
		//trace("Image READY:",nr, image_nr, tile_nr);
		displaylist.setElementTexCoord(nr, img.tx, img.ty, img.tw, img.th, image_nr, tile_nr);
	}
	
	// TODO:  setAnimElement()
	
	public inline function delElement(nr:Int):Void
	{
		var e:Element = displaylist.element.get(nr);
		texturecache.delUnusedImage(e.image_nr);
		displaylist.delElement(e);
	}
	
	public inline function animElement(nr:Int, x:Int, y:Int, z:Int, w:Int, h:Int, t1:Float, t2:Float):Void
	{
		displaylist.animElement(nr, x, y, z, w, h, t1, t2);
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- Render - Loop -------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public static var activeProgram:ActiveProgram; //  OPTIMIERUNG!
	public inline function render(time:Float, width:Int, height:Int, mouse_x:Int, mouse_y:Int, zoom:Int):Void
	{	
		GL.viewport (0, 0, width, height);
		
		GL.enable(GL.DEPTH_TEST); GL.depthFunc(GL.LESS);
		// TODO: alpha+zbuff
		
		// alpha einschalten
		GL.enable(GL.BLEND); GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
		
		GL.bindBuffer(GL.ARRAY_BUFFER, displaylist.buffer.buffer); // nur EIN BUffer zum knechten
		
		// vertexAttribPointers
		GL.enableVertexAttribArray (Program.aVertexPosStart);
		GL.enableVertexAttribArray (Program.aVertexPosEnd);
		GL.enableVertexAttribArray (Program.aTime);
		GL.enableVertexAttribArray (Program.aTexCoord);
		
		GL.vertexAttribPointer (Program.aVertexPosStart, 3, GL.FLOAT, false, 10*4, 0   );
		GL.vertexAttribPointer (Program.aTime,           2, GL.FLOAT, false, 10*4, 3*4 );
		GL.vertexAttribPointer (Program.aVertexPosEnd,   3, GL.FLOAT, false, 10*4, 5*4 );
		GL.vertexAttribPointer (Program.aTexCoord,       2, GL.FLOAT, false, 10*4, 8*4 );
		
		// Texture
		GL.activeTexture (GL.TEXTURE0);
		GL.bindTexture (GL.TEXTURE_2D, texturecache.texture);
		
		GL.clearColor(0.0, 0.0, 0.0, 1.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT );
		//GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT| GL.STENCIL_BUFFER_BIT );
		//GL.clear(GL.COLOR_BUFFER_BIT );
		
		for (i in 0...displaylist.buffer.activeProgram.length )
		{
			activeProgram = displaylist.buffer.activeProgram[i];
			GL.useProgram(activeProgram.program.glProgram); // ------ Shader Program
			
			// UNIFORMS
			//GL.uniformMatrix3D (activeProgram.program.uniforms.get(Program.uPROJECTIONMATRIX), false, Matrix3D.createOrtho (0, width/zoom, height/zoom, 0, 1000, -1000));
			GL.uniform1i (activeProgram.program.uniforms.get(Program.uIMAGE), 0);
			GL.uniform2f (activeProgram.program.uniforms.get(Program.uMOUSE),(mouse_x / width) * 2 - 1,(mouse_y / height) * 2 - 1);
			GL.uniform2f (activeProgram.program.uniforms.get(Program.uRESOLUTION), width, height);
			GL.uniform1f (activeProgram.program.uniforms.get(Program.uTIME), time);
			GL.uniform1f (activeProgram.program.uniforms.get(Program.uZOOM), zoom);
			//GL.uniform2f (activeProgram.program.uniforms.get(Program.uDELTA), 0.0, 0.0);// (mouse_x - width / 1.1) * 0.1 / zoom, (mouse_y - height / 1.1) * 0.1 / zoom);
			GL.uniform2f (activeProgram.program.uniforms.get(Program.uDELTA), (-mouse_x) * (zoom-1) / 4, (-mouse_y) * (zoom-1) / 4);
			
			//draw
			GL.drawArrays (GL.TRIANGLE_STRIP,  activeProgram.start,  activeProgram.size);
			
		}
		
		// --- aufrauemen
		GL.disableVertexAttribArray (Program.aVertexPosStart);
		GL.disableVertexAttribArray (Program.aVertexPosEnd);
		GL.disableVertexAttribArray (Program.aTime);
		GL.disableVertexAttribArray (Program.aTexCoord);
		
		// --- clean Buffers
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindTexture (GL.TEXTURE_2D, null);
		GL.useProgram (null);
	}
	

}