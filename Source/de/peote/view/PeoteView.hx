/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o  \|/   o    o-o   
 *     o      o     <O>    o      o  
 *    o      o-o            o    o-o 
 * 
 * PEOTE VIEW - haxe 2D OpenGL Render Library
 * Copyright (c) 2014 Sylvio Sell, http://maitag.de
 * |\|  \/\ | //  |\  /\ \/  || /\ \ |\ / \ \/\7\/ \
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

import de.peote.view.texture.TextureCache;
import haxe.ds.Vector;
import haxe.Timer;
import lime.utils.Float32Array;
import lime.math.Matrix3;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLBuffer;
import lime.graphics.opengl.GLProgram;
import lime.utils.GLUtils;

import de.peote.view.displaylist.*;

class PeoteView
{
	private var displaylist:Vector<Displaylist>;
	private var startDisplaylist:Displaylist = null; // first index with lowest z value
	
	private var lastUsedDisplaylist:Int = 0;
	
	private var texturecache:TextureCache;
	private var programCache:ProgramCache;
	
	// for background-GL-quad
	private var background_buffer:GLBuffer;
	private var background_program:GLProgram;
	private var	background_aPosition:Int;
	private var background_uRGBA:Int; // GLUniformLocation;
	
	public function new(max_displaylists:Int = 10, max_programs:Int = 100) // TODO -> PARAM 
	{
		trace("GL.MAX_TEXTURE_IMAGE_UNITS:" + GL.getParameter(GL.MAX_TEXTURE_IMAGE_UNITS));
		trace("GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS:" + GL.getParameter(GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
		trace("GL.MAX_TEXTURE_SIZE:" + GL.getParameter(GL.MAX_TEXTURE_SIZE));
		trace("GL.MAX_VERTEX_ATTRIBS:" + GL.getParameter(GL.MAX_VERTEX_ATTRIBS));
		trace("GL.MAX_VERTEX_UNIFORM_VECTORS:" + GL.getParameter(GL.MAX_VERTEX_UNIFORM_VECTORS));
		trace("GL.MAX_FRAGMENT_UNIFORM_VECTORS:" + GL.getParameter(GL.MAX_FRAGMENT_UNIFORM_VECTORS));
		
		// TODO:  img_width, img_height, max_images
		texturecache = new TextureCache(512, 512, 64);

		programCache = new ProgramCache( max_programs,
								 Shader.default_fragmentShaderSrc,
								 Shader.default_vertexShaderSrc);

		displaylist = new Vector<Displaylist>(max_displaylists);
		
		// for background-GL-quad
		createBackgroundBuffer();
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- DISPLAYLIST ---------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public inline function setDisplaylist(param:DParam):Void
	{
		var d:Displaylist = displaylist.get(param.displaylist);
		
		if (d == null) // create new Displaylist
		{
			d = new Displaylist(param, texturecache, programCache);
			displaylist.set(param.displaylist, d);
			
			// sort in
			if (param.enable != false)
				insertSortDisplaylist(d);
			else d.enable = false;
			
		}
		else // change enable or change z-order
		{
			// enable disable
			if (param.enable != null && param.enable != d.enable)
			{
				if (param.z != null && param.z != d.z) d.z = param.z;
				
				d.enable = param.enable;
				
				if (param.enable)
					insertSortDisplaylist(d);
				else 
					unlinkDisplaylist(d);
			}
			else
			{
				// change z order
				if (param.z != null && param.z != d.z)
				{	
					d.z = param.z; // trace("change z order");
					if (d.enable)
					{	//trace("reorder d");
						unlinkDisplaylist(d);
						insertSortDisplaylist(d);
					}
				}
			}
		}
		
		d.set(param);
			
		lastUsedDisplaylist = param.displaylist;
	}
	
	private inline function unlinkDisplaylist(d:Displaylist):Void
	{
		if (d == startDisplaylist) startDisplaylist = (d.next != d) ? d.next : null;
		// unlink
		d.prev.next = d.next;	d.next.prev = d.prev;	
		d.next = d.prev = d;
	}
	
	private inline function insertSortDisplaylist(d:Displaylist):Void
	{
		if (startDisplaylist == null) startDisplaylist = d; // first in dd
		else
		{
			var i:Displaylist = startDisplaylist.prev;
			//trace("d.z="+i.z+" i.z="+i.z);
			while (d.z < i.z &&  i != startDisplaylist)
			{
				i = i.prev; //trace("d.z="+i.z+" i.z="+i.z);
			}
			
			d.prev = i.prev; d.next = i;
			i.prev.next = d; i.prev = d;
			
			if (d.next == startDisplaylist && d.z <= startDisplaylist.z)
			{
				startDisplaylist = d; //trace("is startDisplaylist");
			}
		}
	}

	public inline function delDisplaylist(param:DParam):Void
	{
		var d:Displaylist = displaylist.get(param.displaylist);
		
		if (d != null)
		{
			if (d.enable) unlinkDisplaylist(d);
			displaylist.set(param.displaylist, null);
			d.delete();
		}
	}

	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- SHADER --------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public inline function setProgram(program_nr:Int, type:Int=0, fragmentShaderUrl:String='', vertexShaderUrl:String=''):Void
	{	
		programCache.loadShaderSrc(program_nr, fragmentShaderUrl, vertexShaderUrl);
	}
	
	public inline function setProgramSrc(program_nr:Int,
										fragmentShaderSrc:String = Shader.default_fragmentShaderSrc,
	                                    vertexShaderSrc:String = Shader.default_vertexShaderSrc):Void
	{	
		programCache.setShaderSrc( program_nr, fragmentShaderSrc, vertexShaderSrc );
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- IMAGE ---------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public inline function setImage(image_nr:Int, imageUrl:String, w:Int, h:Int):Void
	{
		texturecache.setImage(image_nr, imageUrl, w ,h);
	}
	
	// TODO: custom mapping
	//public inline function setTilesheet(tilesheet_nr:Int, image_nr:Int, textCoordArray:Float32Array):Void {}

	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- ELEMENT -------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public function setElement(param:Param):Void
	{		
		if (param.element != null)
			displaylist.get( (param.displaylist!=null) ? param.displaylist : lastUsedDisplaylist ).setElement(param);
		else trace("ERROR: no element specified");
	}
	
	public inline function delElement(param:Param):Void
	{
		if (param.element != null)
			displaylist.get( (param.displaylist!=null) ? param.displaylist : lastUsedDisplaylist ).delElement(param.element);
		else trace("ERROR: no element specified");
	}
	
	public inline function delAllElement(param:Param):Void
	{
		displaylist.get( (param.displaylist!=null) ? param.displaylist : lastUsedDisplaylist ).delAllElement();
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- Render - Loop -------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	private var dl:Displaylist; // actual displaylist inside renderloop
	private var ap:ActiveProgram; //  actual Program shader inside loop
	public inline function render(time:Float, width:Int, height:Int, mouse_x:Int, mouse_y:Int, zoom:Int):Void
	{	
		GL.viewport (0, 0, width, height);
		
		GL.scissor(0, 0, width, height);
		GL.enable(GL.SCISSOR_TEST);	
		
		GL.clearColor(0.0, 0.0, 0.0, 1.0); //GL.clearDepth(0.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT); //GL.STENCIL_BUFFER_BIT
		
		// loop over enabled displaylists
		dl = startDisplaylist;
		while (dl != null)
		{	
			// TODO: max/min values, optimize
			GL.scissor(
				dl.x,
				((dl.h != 0) ? height - dl.h : 0) - dl.y,
				(dl.w != 0) ? dl.w : width,
				(dl.h != 0) ? dl.h : height
			);
			
			GL.enable(GL.DEPTH_TEST); GL.depthFunc(GL.LEQUAL); //GL.depthFunc(GL.LESS);
			// TODO: alpha (+ filter?) je nach dl
			
			//GL.enable(GL.TEXTURE_2D);
			
			// alpha einschalten
			GL.enable(GL.BLEND); GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
			
			// Texture
			GL.activeTexture (GL.TEXTURE0);
			GL.bindTexture (GL.TEXTURE_2D, texturecache.texture);
			
			if (dl != startDisplaylist &&
			    dl.z != dl.prev.z
			   )
				GL.clear( GL.DEPTH_BUFFER_BIT );

			if (dl.renderBackground) renderBackground ( dl.r, dl.g, dl.b, dl.a );
			
			GL.bindBuffer(GL.ARRAY_BUFFER, dl.bufferElement.glBuff); // nur EIN BUffer zum knechten (pro displaylist)
			dl.bufferElement.setVertexAttributes(); // VertexAttributes
			
			for (i in 0...dl.buffer.activeProgram.length )
			{
				ap = dl.buffer.activeProgram[i];
				GL.useProgram(ap.program.glProgram); // ------ Shader Program
				
				// UNIFORMS
				//GL.uniformMatrix3D (ap.program.uniforms.get(Program.uPROJECTIONMATRIX), false, Matrix3D.createOrtho (0, width/zoom, height/zoom, 0, 1000, -1000));
				GL.uniform1i (ap.program.uniforms.get(Program.uIMAGE), 0);
				GL.uniform2f (ap.program.uniforms.get(Program.uMOUSE),(mouse_x / width) * 2 - 1,(mouse_y / height) * 2 - 1);
				//GL.uniform2f (ap.program.uniforms.get(Program.uRESOLUTION), (dl.w!=0) ? dl.w : width, (dl.h != 0) ? dl.h : height);
				GL.uniform2f (ap.program.uniforms.get(Program.uRESOLUTION), width, height);
				GL.uniform1f (ap.program.uniforms.get(Program.uTIME), time);
				GL.uniform1f (ap.program.uniforms.get(Program.uZOOM), zoom);
				GL.uniform2f (ap.program.uniforms.get(Program.uDELTA),
						dl.x + dl.xOffset, // + ( -mouse_x) * (zoom - 1) / 4,
						dl.y + dl.yOffset // + ( -mouse_y) * (zoom - 1) / 4
						);
				//draw
				GL.drawArrays (GL.TRIANGLE_STRIP,  ap.start,  ap.size);
				
			}
			
			// --- aufrauemen
			dl.bufferElement.disableVertexAttributes();
			
			// next displaylist in loop
			dl = (dl.next != startDisplaylist) ? dl.next : null;
			
		} // end loop displaylists
		
		// --- clean Buffers
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindTexture (GL.TEXTURE_2D, null);
		GL.useProgram (null);
	}
	
	// ------------------------------------------------------------------------------
	// ---------------------------------------------------- Displaylist Background --
	// ------------------------------------------------------------------------------

	public inline function createBackgroundBuffer():Void
	{
		background_program = GLUtils.createProgram (
			// ---------------------------- VERTEX SHADER ---
			"
			attribute vec2 aPosition;
			
			void main(void)
			{
				gl_Position = mat4 ( // TODO: mathstar-optimize this ;)=
					vec4(2.0, 0.0, 0.0, 0.0),
					vec4(0.0, -2.0, 0.0, 0.0),
					vec4(0.0, 0.0, 0.0, 0.0),
					vec4(-1.0, 1.0, 0.0, 1.0)
				)
				* vec4 (aPosition, -65000.0 ,1.0); // 65000? -> zIndex (todo for <zero)
			}
			",
			// -------------------------- FRAGMENT SHADER ---
			#if !desktop
			"precision mediump float;" +
			#end
			"
			uniform vec4 uRGBA;
			void main(void)
			{
				gl_FragColor = uRGBA;
			}
			"				
		);
		
		background_aPosition = GL.getAttribLocation (background_program, "aPosition");
		background_uRGBA = cast GL.getUniformLocation (background_program, "uRGBA");
		
		var data = [
			1, 1,
			0, 1,
			1, 0,
			0, 0
		];
		background_buffer = GL.createBuffer ();
		GL.bindBuffer (GL.ARRAY_BUFFER, background_buffer);
		GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (cast data), GL.STATIC_DRAW);
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}
	
	public inline function renderBackground(r:Float, g:Float, b:Float, a:Float):Void 
	{
		GL.bindBuffer (GL.ARRAY_BUFFER, background_buffer);
		
		GL.enableVertexAttribArray (background_aPosition);
		GL.vertexAttribPointer (background_aPosition, 2, GL.FLOAT, false, 8, 0);
		
		GL.useProgram (background_program);
		GL.uniform4f ( cast background_uRGBA, r,g,b,a);
		
		GL.drawArrays (GL.TRIANGLE_STRIP, 0, 4);
		GL.disableVertexAttribArray (background_aPosition);

	}
	
	
	
	
}
