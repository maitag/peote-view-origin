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

import de.peote.view.program.Program;
import de.peote.view.program.ProgramCache;
import de.peote.view.texture.ImageCache;
import de.peote.view.texture.ImageParam;
import de.peote.view.texture.Texture;
import de.peote.view.texture.TextureParam;
import de.peote.view.program.ProgramParam;

import lime.utils.UInt8Array;

import haxe.ds.Vector;
import haxe.Timer;
import lime.graphics.opengl.GLUniformLocation;
import lime.utils.Float32Array;
import lime.math.Matrix3;
import lime.graphics.opengl.GL;
import lime.graphics.opengl.GLBuffer;
import lime.graphics.opengl.GLProgram;
import lime.graphics.opengl.GLTexture;
import lime.graphics.opengl.GLFramebuffer;
import lime.utils.GLUtils;

import de.peote.view.displaylist.*;
import de.peote.view.element.*;

@:keep 
class PeoteView
{	
	public static var elementDefaults:ElementParam = {
			displaylist:0,
			program:null,
		
			slot:null,
			image:null,
			tile:null,
			
			x:0,
			y:0,
			w:100,
			h:100,
			z:0,
			
			rgba:0xffffffff,
			
			rotation:0,
			pivotX:0,
			pivotY:0
		};

	public static var MAX_TEXTURE_SIZE:Int;
		
	var displaylist:Vector<I_Displaylist>;
	var startDisplaylist:I_Displaylist; // first index with lowest z value
	
	var textures:Vector<Texture>;
	var imageCache:ImageCache;
	var programCache:ProgramCache;
	
	// for background-GL-quad
	var background_buffer:GLBuffer;
	var background_program:GLProgram;
	var	background_aPosition:Int;
	var background_uRGBA:GLUniformLocation;
	
	var framebuffer:GLFramebuffer = null;
	var fb_texture:GLTexture;
	var picked:UInt8Array;

	
	public function new(param:PeoteViewParam) // TODO -> PARAM 
	{	
		if (param.maxDisplaylists == null) param.maxDisplaylists = 1;
		if (param.maxPrograms == null) param.maxPrograms = 1;
		if (param.maxTextures == null) param.maxTextures = 1;
		if (param.maxImages == null) param.maxImages = 1;
		
		MAX_TEXTURE_SIZE = GL.getParameter(GL.MAX_TEXTURE_SIZE);
		#if debugshader
		trace("GL.MAX_TEXTURE_IMAGE_UNITS:" + GL.getParameter(GL.MAX_TEXTURE_IMAGE_UNITS));
		trace("GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS:" + GL.getParameter(GL.MAX_TEXTURE_IMAGE_UNITS));
		trace("GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS:" + GL.getParameter(GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
		trace("GL.MAX_TEXTURE_SIZE:" + GL.getParameter(GL.MAX_TEXTURE_SIZE));
		trace("GL.MAX_VERTEX_ATTRIBS:" + GL.getParameter(GL.MAX_VERTEX_ATTRIBS));
		trace("GL.MAX_VERTEX_UNIFORM_VECTORS:" + GL.getParameter(GL.MAX_VERTEX_UNIFORM_VECTORS));
		trace("GL.MAX_FRAGMENT_UNIFORM_VECTORS:" + GL.getParameter(GL.MAX_FRAGMENT_UNIFORM_VECTORS));
		#end
		
		textures = new Vector<Texture>(param.maxTextures);
		imageCache = new ImageCache(param.maxImages, textures);
		
		programCache = new ProgramCache( param.maxPrograms + 1, textures ); // last one is DEFAULT Program
		
		
		startDisplaylist = null;
		displaylist = new Vector<I_Displaylist>(param.maxDisplaylists);
		
		// for background-GL-quad
		createBackgroundBuffer();
		
		// init array for get picked pixels
		picked = new UInt8Array(4); // TODO: for multitouch maybe pick hole view (width*height*4)
	}
	
	// ------------------------------------------------------------------------------------------------------
	// ---------------------------------- TEXTURE -----------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public inline function setTexture(param:TextureParam):Void
	{
		if (textures.get(param.texture) == null)
		{
			textures.set(param.texture, new Texture(param) );
		}
		else trace("re-set Texture ist not implemented yet");
	}
	
	public inline function delTexture(param:TextureParam):Void
	{
		trace("not fully implemented yet");
		/*var t:Texture = textures.get(param.texture);
		if (t != null)
		{
			t.clear();
			textures.set(param.texture, null );
		}
		else trace("texture already deleted");*/
	}
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- DISPLAYLIST ---------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public inline function setDisplaylist(param:DisplaylistParam):Void
	{
		var d:I_Displaylist = displaylist.get(param.displaylist);
		
		if (d == null) // create new Displaylist
		{
			if (param.type == null) param.type = 0;
			
			// need Framebuffer?
			if (param.type & DisplaylistType.PICKING != 0 && framebuffer == null) createFramebuffer();
			
			if (param.type & DisplaylistType.ANIM != 0) 
				d = new Displaylist<ElementAnim, ElementAnimBuffer>(param, programCache, imageCache);
			else
			    d = new Displaylist<ElementSimple, ElementSimpleBuffer>(param, programCache, imageCache);	
			
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
	}
	
	private inline function unlinkDisplaylist(d:I_Displaylist):Void
	{
		if (d == startDisplaylist) startDisplaylist = (d.next != d) ? d.next : null;
		// unlink
		d.prev.next = d.next;	d.next.prev = d.prev;	
		d.next = d.prev = d;
	}
	
	private inline function insertSortDisplaylist(d:I_Displaylist):Void
	{
		if (startDisplaylist == null) startDisplaylist = d; // first in dd
		else
		{
			var i:I_Displaylist = startDisplaylist.prev;
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

	public inline function delDisplaylist(param:DisplaylistParam):Void
	{
		var d:I_Displaylist = displaylist.get(param.displaylist);
		
		if (d != null)
		{
			if (d.enable) unlinkDisplaylist(d);
			displaylist.set(param.displaylist, null);
			d.delete();
		}
	}

	public inline function getDisplaylist(param:DisplaylistParam):I_Displaylist
	{
		return displaylist.get( (param.displaylist != null) ? param.displaylist : elementDefaults.displaylist );
	}
	
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- SHADER --------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	//public inline function setProgram(param:ProgramParam):Void
	public function setProgram(param:ProgramParam):Void
	{
		if (param.fshaderSrc == null && param.fshader != null) {
			param.fshaderSrc = programCache.loadShader(param.fshader);
		}		
		if (param.vshaderSrc == null && param.vshader != null) {
			param.vshaderSrc = programCache.loadShader(param.vshader);
		}
		programCache.setProgram(param);
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- IMAGE ---------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public inline function setImage(param:ImageParam):Void
	{
		imageCache.setImage(param);
	}
	
	public inline function delImage(param:ImageParam):Void
	{
		// TODO
		trace("not implemented yet");
	}
	
	// TODO: custom mapping
	//public inline function setTilesheet(tilesheet_nr:Int, image_nr:Int, textCoordArray:Float32Array):Void {}

	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- ELEMENT -------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public function setElement(param:ElementParam):Void
	{		
		if (param.element != null)
			displaylist.get( (param.displaylist!=null) ? param.displaylist : elementDefaults.displaylist ).setElement(param);
		else trace("ERROR: no element specified");
	}
	
	public function getElement(param:ElementParam):ElementParam
	{		
		var p:ElementParam = {};
		if (param.element != null)
			p = displaylist.get( (param.displaylist != null) ? param.displaylist : elementDefaults.displaylist ).getElement(param.element);
		else trace("ERROR: no element specified");
		return p;
	}
	
	public function hasElement(param:ElementParam):Bool
	{		
		return (param.element == null) ? false : displaylist.get( (param.displaylist != null) ? param.displaylist : elementDefaults.displaylist ).hasElement(param.element);
	}
	
	public inline function delElement(param:ElementParam):Void
	{
		if (param.element != null)
			displaylist.get( (param.displaylist!=null) ? param.displaylist : elementDefaults.displaylist ).delElement(param.element);
		else trace("ERROR: no element specified");
	}
	
	public inline function delAllElement(param:ElementParam):Void
	{
		displaylist.get( (param.displaylist!=null) ? param.displaylist : elementDefaults.displaylist ).delAllElement();
	}
	
	public inline function setElementDefaults(param:ElementParam):Void
	{
		if (param.displaylist != null) elementDefaults.displaylist = param.displaylist;	
		if (param.program != null) elementDefaults.program = param.program;
		
		if (param.image != null) elementDefaults.image = param.image;	
		if (param.tile != null) elementDefaults.tile = param.tile;	
		
		if (param.x != null) elementDefaults.x = param.x;	
		if (param.y != null) elementDefaults.y = param.y;	
		if (param.w != null) elementDefaults.w = param.w;	
		if (param.h != null) elementDefaults.h = param.h;	
		if (param.z != null) elementDefaults.z = param.z;	
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- Render - Loop -------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	private var dl:I_Displaylist; // actual displaylist inside renderloop
	private var ap:ActiveProgram; //  actual Program shader inside loop
	public inline function render(time:Float, width:Int, height:Int, mouseX:Int, mouseY:Int, zoom:Int = 1, xOffset:Int = 0, yOffset:Int = 0):Void
	{	
		GL.viewport (0, 0, width, height);
		
		GL.scissor(0, 0, width, height);
		GL.enable(GL.SCISSOR_TEST);	
		
		GL.clearColor(0.0, 0.0, 0.0, 1.0); // TODO: maybe alpha to 0.0 ?
		//GL.clearDepth(0.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT); //GL.STENCIL_BUFFER_BIT
		
		// loop over enabled displaylists
		dl = startDisplaylist;
		while (dl != null)
		{	//trace(dl.type);
			// TODO: render to framebuffer
			/* if (dl.renderToImage) {
				//GL.activeTexture (GL.TEXTURE0); // 1 ????????????
				GL.bindTexture (GL.TEXTURE_2D, texture);
				GL.bindFramebuffer(GL.FRAMEBUFFER, dl.framebuffer);
			}*/
			// width und height und scissor-werte entsprechend der texture im texturecache (fuer image-slot) setzen

			// max/min values, optimize
			var sx:Int = (dl.x + xOffset) * zoom;
			var sy:Int = (dl.y + yOffset) * zoom;
			var sw:Int = (dl.w != 0) ? dl.w * zoom: width * zoom;
			var sh:Int = (dl.h != 0) ? dl.h * zoom: height * zoom;
			
			if (sx < 0) sw += sx;
			sx = Std.int( Math.max(0, Math.min(width, sx)) );
			sw = Std.int( Math.max(0, Math.min(width-sx, sw)) );
			
			if (sy < 0) sh += sy;
			sy = Std.int( Math.max(0, Math.min(height, sy)) );
			sh = Std.int( Math.max(0, Math.min(height-sy, sh)) );

			GL.scissor(sx, height-sh-sy, sw, sh);
			
			// TODO TODO -> depends on blend (and hardware diff webgl/cpp)
			//if (dl.blend == 0) {
				if (dl.type & DisplaylistType.ZINDEX != 0)
				{
					//if (dl != startDisplaylist && dl.z != dl.prev.z) GL.clear( GL.DEPTH_BUFFER_BIT ); // TODO
					if (dl != startDisplaylist) GL.clear( GL.DEPTH_BUFFER_BIT ); // TODO
					GL.enable(GL.DEPTH_TEST);
					GL.depthFunc(GL.LEQUAL); //GL.depthRange(); // TODO
					//GL.depthFunc(GL.LESS);
				} else GL.disable(GL.DEPTH_TEST);
			//} else {GL.disable(GL.DEPTH_TEST);}
			// TODO: alpha (+ filter?) je nach dl
			
			// alpha blend -> TODO
			if (dl.blend != 0) {
				GL.enable(GL.BLEND); GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
			} else {GL.disable(GL.BLEND);}
			

			if (dl.renderBackground) renderBackground ( dl.r, dl.g, dl.b, dl.a );
			
			
			GL.bindBuffer(GL.ARRAY_BUFFER, dl.elemBuff.glBuff); // TODO: put this into dl.elemBuff and may try optimize with SOA (multiple buffer)
			dl.elemBuff.setVertexAttributes(); // VertexAttributes
			
			var len:Int = dl.buffer.activeProgram.length; //hoisted (performance)
			for (i in 0...len)
			{
				ap = dl.buffer.activeProgram[i];
				GL.useProgram(ap.program.glProgram); // ------ Shader Program

				// Textures
				var len1:Int = ap.textures.texture.length; //hoisted (performance)
				for (j in 0...len1)
				{
					GL.activeTexture (ActiveTextures.slot[j]); //GL.activeTexture (GL.TEXTURE0);
					GL.bindTexture (GL.TEXTURE_2D, ap.textures.texture[j].texture);
					//GL.enable(GL.TEXTURE_2D); // is default
					GL.uniform1i (ap.program.uniforms.get(Program.uTEXTURE[j]), j); // Uniform 2d Sampler
				}
				
				// UNIFORMS
				//GL.uniform2f (ap.program.uniforms.get(Program.uMOUSE),(mouseX / width) * 2 - 1,(mouseY / height) * 2 - 1); // remap from -1 to +1
				//GL.uniform2f (ap.program.uniforms.get(Program.uRESOLUTION), (dl.w!=0) ? dl.w : width, (dl.h != 0) ? dl.h : height);
				GL.uniform2f (ap.program.uniforms.get(Program.uRESOLUTION), width, height);
				GL.uniform1f (ap.program.uniforms.get(Program.uTIME),  time);
				GL.uniform1f (ap.program.uniforms.get(Program.uZOOM),  dl.zoom * zoom);
				GL.uniform2f (ap.program.uniforms.get(Program.uDELTA), dl.x + dl.xOffset + xOffset, dl.y + dl.yOffset + yOffset);
				
				if (ap.program.customUniforms != null) ap.program.customUniforms.update();
				
				//draw
				GL.drawArrays (GL.TRIANGLE_STRIP,  ap.start,  ap.size);
				
				GL.useProgram (null); // try without here to optimize
			}
			
			dl.elemBuff.disableVertexAttributes();
			
			GL.bindBuffer (GL.ARRAY_BUFFER, null); // try without here to optimize
			
			// TODO:
			//GL.activeTexture (GL.TEXTURE0);
			GL.bindTexture (GL.TEXTURE_2D, null); // try without here to optimize
			
			// next displaylist in loop
			dl = (dl.next != startDisplaylist) ? dl.next : null;
			
		} // end loop displaylists
		
		// --- clean Buffers
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindTexture (GL.TEXTURE_2D, null);
		GL.useProgram (null);
		
		// if (dl.renderToImage) GL.bindFramebuffer(GL.FRAMEBUFFER, null);
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
			"precision mediump float;" +
			"
			uniform vec4 uRGBA;
			void main(void)
			{
				gl_FragColor = uRGBA;
			}
			"				
		);
		
		background_aPosition = GL.getAttribLocation (background_program, "aPosition");
		background_uRGBA = GL.getUniformLocation (background_program, "uRGBA");
		
		var data = [
			1, 1,
			0, 1,
			1, 0,
			0, 0
		];
		background_buffer = GL.createBuffer ();
		GL.bindBuffer (GL.ARRAY_BUFFER, background_buffer);
		GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (data), GL.STATIC_DRAW);
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
	}
	
	public inline function renderBackground(r:Float, g:Float, b:Float, a:Float):Void 
	{
		GL.bindBuffer (GL.ARRAY_BUFFER, background_buffer);
		
		GL.enableVertexAttribArray (background_aPosition);
		GL.vertexAttribPointer (background_aPosition, 2, GL.FLOAT, false, 8, 0);
		
		GL.useProgram (background_program);
		GL.uniform4f ( background_uRGBA, r,g,b,a);
		
		GL.drawArrays (GL.TRIANGLE_STRIP, 0, 4);
		GL.disableVertexAttribArray (background_aPosition);

	}
	
	// ------------------------ OPENGL PICKING -----------------------------------------
	
	public inline function createFramebuffer():Void
	{
		fb_texture = Texture.createEmptyTexture(1, 1);

		framebuffer = GL.createFramebuffer();
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer);
		
		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, fb_texture, 0);
		
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);
		
	}
	
	public inline function pick(displaylist_nr:Int, time:Float, mouseX:Int, mouseY:Int, zoom:Int, xOffset:Int = 0, yOffset:Int = 0):Int
	{	
		var dl:I_Displaylist = displaylist.get(displaylist_nr);
		
		var width:Int = 1;
		var height:Int = 1;
		xOffset -= Math.round(mouseX / zoom);
		yOffset -= Math.round(mouseY / zoom);
		
		// render to framebuffer
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer);

		GL.viewport (0, 0, width, height);
		
		GL.scissor(0, 0, width, height);
		GL.enable(GL.SCISSOR_TEST);	
		
		GL.clearColor(0.0, 0.0, 0.0, 0.0); //GL.clearDepth(0.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT); //GL.STENCIL_BUFFER_BIT
		
		// TODO: if (dl.picking)
		
		// max/min values, optimize
		var sx:Int = (dl.x + xOffset) * zoom;
		var sy:Int = (dl.y + yOffset) * zoom;
		var sw:Int = (dl.w != 0) ? dl.w * zoom: width * zoom;
		var sh:Int = (dl.h != 0) ? dl.h * zoom: height * zoom;
		
		if (sx < 0) sw += sx;
		sx = Std.int( Math.max(0, Math.min(width, sx)) );
		sw = Std.int( Math.max(0, Math.min(width-sx, sw)) );
		
		if (sy < 0) sh += sy;
		sy = Std.int( Math.max(0, Math.min(height, sy)) );
		sh = Std.int( Math.max(0, Math.min(height-sy, sh)) );

		GL.scissor(sx, height-sh-sy, sw, sh);
		
		// TODO TODO -> depends on blend (and hardware diff webgl/cpp)
		//if (dl.blend == 0) {
			GL.enable(GL.DEPTH_TEST); GL.depthFunc(GL.LEQUAL); //GL.depthFunc(GL.LESS);
		//} else {GL.disable(GL.DEPTH_TEST);}
		// TODO: alpha (+ filter?) je nach dl
		
		//GL.enable(GL.TEXTURE_2D);
		
		// disable alpha blend for picking
		GL.disable(GL.BLEND);
		
		
		// Texture
		//GL.activeTexture (GL.TEXTURE0);
		//GL.activeTexture (ActiveTextures.slot[0]);
		//GL.bindTexture (GL.TEXTURE_2D, ap.textures.texture[0]);
		
		GL.clear( GL.DEPTH_BUFFER_BIT );

		GL.bindBuffer(GL.ARRAY_BUFFER, dl.elemBuff.glBuff); // nur EIN BUffer zum knechten (pro displaylist)
		dl.elemBuff.setVertexAttributes(); // VertexAttributes
		
		var len:Int = dl.buffer.activeProgram.length; //hoisted (performance)
		for (i in 0...len)
		{
			ap = dl.buffer.activeProgram[i];
			GL.useProgram(ap.program.glProgram); // ------ Shader Program
			
			// Textures
			//GL.activeTexture (GL.TEXTURE0);
			var len1:Int = ap.textures.texture.length; //hoisted (performance)
			for (j in 0...len1)
			{
				GL.activeTexture (ActiveTextures.slot[j]);
				GL.bindTexture (GL.TEXTURE_2D, ap.textures.texture[j].texture);
				//GL.enable(GL.TEXTURE_2D); //is default
				GL.uniform1i (ap.program.uniforms.get(Program.uTEXTURE[j]), j); // Uniform 2d Sampler
			}

			// UNIFORMS
			GL.uniform2f (ap.program.uniforms.get(Program.uMOUSE),(mouseX / width) * 2 - 1,(mouseY / height) * 2 - 1); // remap from -1 to +1
			//GL.uniform2f (ap.program.uniforms.get(Program.uRESOLUTION), (dl.w!=0) ? dl.w : width, (dl.h != 0) ? dl.h : height);
			GL.uniform2f (ap.program.uniforms.get(Program.uRESOLUTION), width, height);
			GL.uniform1f (ap.program.uniforms.get(Program.uTIME),  time);
			GL.uniform1f (ap.program.uniforms.get(Program.uZOOM),  dl.zoom * zoom);
			GL.uniform2f (ap.program.uniforms.get(Program.uDELTA), dl.x + dl.xOffset + xOffset, dl.y + dl.yOffset + yOffset);

			if (ap.program.customUniforms != null) ap.program.customUniforms.update();
			
			//draw
			GL.drawArrays (GL.TRIANGLE_STRIP,  ap.start,  ap.size);
			
		}
		
		dl.elemBuff.disableVertexAttributes();
		
		
		// --- clean Buffers
		GL.bindBuffer (GL.ARRAY_BUFFER, null);
		GL.bindTexture (GL.TEXTURE_2D, null);
		GL.useProgram (null);
		
		
		// read picked pixel (element-number)
		if (GL.checkFramebufferStatus(GL.FRAMEBUFFER) == GL.FRAMEBUFFER_COMPLETE) {
			
			//GL.bindTexture (GL.TEXTURE_2D, fb_texture);
			GL.readPixels(0, 0, width, height, GL.RGBA, GL.UNSIGNED_BYTE, picked);
			//GL.bindTexture (GL.TEXTURE_2D, null);
		}
		else trace("PICKING ERROR: Framebuffer not complete");
		
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);
		
		return(picked[3]<<24 | picked[2]<<16 | picked[1]<<8 | picked[0] - 1);
	}
	
	
	
}
