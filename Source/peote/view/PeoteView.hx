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

package peote.view;

import haxe.io.Bytes;
import haxe.io.BytesData;
import lime.Lib;
import lime.utils.BytePointer;
import peote.view.displaylist.Displaylist;
import peote.view.displaylist.DisplaylistParam;
import peote.view.displaylist.DisplaylistType;
import peote.view.displaylist.I_Displaylist;
import peote.view.element.ElementAnim;
import peote.view.element.ElementAnimBuffer;
import peote.view.element.ElementParam;
import peote.view.element.ElementSimple;
import peote.view.element.ElementSimpleBuffer;
import peote.view.program.Program;
import peote.view.program.ProgramCache;
import peote.view.texture.ImageCache;
import peote.view.texture.ImageParam;
import peote.view.texture.Texture;
import peote.view.texture.TextureParam;
import peote.view.program.ProgramParam;

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

import peote.view.displaylist.*;
import peote.view.element.*;

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

	var startTime:Float;
	public var time(get,set):Float;
	public inline function get_time():Float
	{
		return Timer.stamp() - startTime;
	}
	public inline function set_time(t:Float):Float
	{
		startTime = Timer.stamp() - t;
		return t;
	}
	
	public function new(param:PeoteViewParam) // TODO -> PARAM 
	{	
		time = 0;
		
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
		trace("EXTENSIONS:\n"+GL.getSupportedExtensions());
		#end
		
		textures = new Vector<Texture>(param.maxTextures);
		imageCache = new ImageCache(param.maxImages, textures);
		
		programCache = new ProgramCache( param.maxPrograms, textures );
		
		
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
	public function setTexture(param:TextureParam):Void
	{
		if (textures.get(param.texture) == null)
		{
			textures.set(param.texture, new Texture(param) );
		}
		else trace("re-set Texture ist not implemented yet");
	}
	
	public function delTexture(param:TextureParam):Void
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
	public function setDisplaylist(param:DisplaylistParam):Void
	{
		var d:I_Displaylist = displaylist.get(param.displaylist);
		
		// need Framebuffer?
		if (param.renderToTexture && framebuffer == null) createFramebuffer();
		
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

	public function delDisplaylist(param:DisplaylistParam):Void
	{
		var d:I_Displaylist = displaylist.get(param.displaylist);
		
		if (d != null)
		{
			if (d.enable) unlinkDisplaylist(d);
			displaylist.set(param.displaylist, null);
			d.delete();
		}
	}

	public function getDisplaylist(param:DisplaylistParam):I_Displaylist
	{
		return displaylist.get( (param.displaylist != null) ? param.displaylist : elementDefaults.displaylist );
	}
	
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- SHADER --------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	//public inline function setProgram(param:ProgramParam):Void
	public function setProgram(param:ProgramParam):Void
	{
		if (param.program != null)
		{
			if (programCache.program.length > param.program)
			{
				if (param.fshaderSrc == null && param.fshader != null) {
					param.fshaderSrc = programCache.loadShader(param.fshader);
				}		
				if (param.vshaderSrc == null && param.vshader != null) {
					param.vshaderSrc = programCache.loadShader(param.vshader);
				}
				programCache.setProgram(param);
			}
			else trace('ERROR in setProgram({program:${param.program}}): program:${param.program} is out of bounds, please check maxPrograms inside PeoteView');
		}
		else trace("ERROR in setProgram(): no program number specified");
	}
	
	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- IMAGE ---------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	public function setImage(param:ImageParam):Void
	{
		imageCache.setImage(param);
	}
	
	public function delImage(param:ImageParam):Void
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
		else trace("ERROR in setElement(): no element number specified");
	}
	
	public function getElement(param:ElementParam):ElementParam
	{		
		var p:ElementParam = {};
		if (param.element != null)
			p = displaylist.get( (param.displaylist != null) ? param.displaylist : elementDefaults.displaylist ).getElement(param.element);
		else trace("ERROR in getElement(): no element number specified");
		return p;
	}
	
	public function hasElement(param:ElementParam):Bool
	{		
		return (param.element == null) ? false : displaylist.get( (param.displaylist != null) ? param.displaylist : elementDefaults.displaylist ).hasElement(param.element);
	}
	
	public function delElement(param:ElementParam):Void
	{
		if (param.element != null)
			displaylist.get( (param.displaylist!=null) ? param.displaylist : elementDefaults.displaylist ).delElement(param.element);
		else trace("ERROR: no element specified");
	}
	
	public function delAllElement(param:ElementParam):Void
	{
		displaylist.get( (param.displaylist!=null) ? param.displaylist : elementDefaults.displaylist ).delAllElement();
	}
	
	public function setElementDefaults(param:ElementParam):Void
	{
		if (param.displaylist != null) elementDefaults.displaylist = param.displaylist;	
		if (param.program != null) elementDefaults.program = param.program;
		
		if (param.image != null) elementDefaults.image = (param.image==-1) ? null : param.image;
		if (param.tile != null) elementDefaults.tile = (param.tile==-1) ? null : param.tile;	
		
		if (param.x != null) elementDefaults.x = param.x;
		if (param.y != null) elementDefaults.y = param.y;
		if (param.w != null) elementDefaults.w = param.w;
		if (param.h != null) elementDefaults.h = param.h;
		if (param.z != null) elementDefaults.z = param.z;
		
		if (param.rotation != null) elementDefaults.rotation = param.rotation;
		if (param.pivotX != null) elementDefaults.pivotX = param.pivotX;
		if (param.pivotY != null) elementDefaults.pivotY = param.pivotY;
		
		if (param.rgba != null) elementDefaults.rgba = param.rgba;
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
				) * vec4 (aPosition, -65000.0 ,1.0); // 65000? -> zIndex (todo for <zero)
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
		
		var bytes:Bytes = Bytes.alloc(8 * 4);

		bytes.setFloat(0,  1);bytes.setFloat(4,  1);
		bytes.setFloat(8,  0);bytes.setFloat(12, 1);
		bytes.setFloat(16, 1);bytes.setFloat(20, 0);
		bytes.setFloat(24, 0);bytes.setFloat(28, 0);
		/*data = [
			1, 1,
			0, 1,
			1, 0,
			0, 0
		];*/
		
		background_buffer = GL.createBuffer ();
		GL.bindBuffer (GL.ARRAY_BUFFER, background_buffer);
		//GL.bufferData (GL.ARRAY_BUFFER, new Float32Array (data), GL.STATIC_DRAW);
		GL.bufferData (GL.ARRAY_BUFFER, 8*4, new BytePointer(bytes), GL.STATIC_DRAW);
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
	
	// ------------------------------------------------------------------------------------------------------
	
	public inline function createFramebuffer():Void
	{
		fb_texture = Texture.createEmptyTexture(1, 1);
		framebuffer = GL.createFramebuffer();
	}

	// ------------------------------------------------------------------------------------------------------
	// -------------------------------- Render - Loop -------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------
	private inline function render_init(width:Int,height:Int):Void
	{
		GL.viewport (0, 0, width, height);
		
		GL.scissor(0, 0, width, height);
		GL.enable(GL.SCISSOR_TEST);	
		
		GL.clearColor(0.0, 0.0, 0.0, 1.0); // TODO: maybe alpha to 0.0 ?
		//GL.clearDepth(0.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT); //GL.STENCIL_BUFFER_BIT
	}

	private inline function render_scissor(dl:I_Displaylist, width:Int, height:Int, zoom:Float, xOffset:Float, yOffset:Float):Void
	{
		var sx:Int = Math.floor((dl.x + xOffset) * zoom);
		var sy:Int = Math.floor((dl.y + yOffset) * zoom);
		var sw:Int = Math.floor((dl.w != 0) ? dl.w * zoom: width * zoom);
		var sh:Int = Math.floor((dl.h != 0) ? dl.h * zoom: height * zoom);
		
		if (sx < 0) sw += sx;
		sx = Std.int( Math.max(0, Math.min(width, sx)) );
		sw = Std.int( Math.max(0, Math.min(width-sx, sw)) );
		
		if (sy < 0) sh += sy;
		sy = Std.int( Math.max(0, Math.min(height, sy)) );
		sh = Std.int( Math.max(0, Math.min(height-sy, sh)) );

		GL.scissor(sx, height - sh - sy, sw, sh);
	}
	
	private inline function render_segments(dl:I_Displaylist, width:Int, height:Int, zoom:Float, xOffset:Float, yOffset:Float):Void
	{
		var ap:ActiveProgram;
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
				//GL.enable(GL.TEXTURE_2D); // is default ?
				GL.uniform1i (ap.program.uniforms.get(Program.uTEXTURE[j]), j); // Uniform 2d Sampler
			}
			
			// UNIFORMS
			GL.uniform2f (ap.program.uniforms.get(Program.uRESOLUTION), width, height);
			GL.uniform1f (ap.program.uniforms.get(Program.uTIME),  time);
			GL.uniform1f (ap.program.uniforms.get(Program.uZOOM),  zoom*dl.zoom);
			//GL.uniform2f (ap.program.uniforms.get(Program.uDELTA), (dl.x + dl.xOffset + xOffset)/dl.zoom, (dl.y + dl.yOffset + yOffset)/dl.zoom  );
			GL.uniform2f (ap.program.uniforms.get(Program.uDELTA), (dl.x + dl.xOffset + xOffset)/dl.zoom, (dl.y + dl.yOffset + yOffset)/dl.zoom  );
			
			if (ap.program.customUniforms != null) ap.program.customUniforms.update();
			
			//draw
			GL.drawArrays (GL.TRIANGLE_STRIP,  ap.start,  ap.size);
			
			GL.useProgram (null); // try without here to optimize
		}
		
		dl.elemBuff.disableVertexAttributes();
		GL.bindBuffer (GL.ARRAY_BUFFER, null); // try without here to optimize
		// TODO: ? GL.activeTexture (GL.TEXTURE0);
		GL.bindTexture (GL.TEXTURE_2D, null); // try without here to optimize
	}

	public inline function render(width:Int, height:Int, zoom:Float = 1.0, xOffset:Float = 0, yOffset:Float = 0):Void
	{	
		xOffset = xOffset * (zoom-1)/zoom;
		yOffset = yOffset * (zoom-1)/zoom;
		render_init(width, height);
		
		var dl:I_Displaylist = startDisplaylist;
		while (dl != null)
		{	
			// start rendering to framebuffer
			if (dl.renderToTexture)
			{
				GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer);
				GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, textures.get(dl.texture).texture, 0);
				
				GL.viewport (0, 0, dl.w, dl.h);
				GL.scissor (0, 0, dl.w, dl.h);
				GL.clearColor(0.0, 0.0, 0.0, 1.0); // TODO: maybe alpha to 0.0 ?
				GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT); //GL.STENCIL_BUFFER_BIT
			}
			else render_scissor(dl, width, height, zoom, xOffset, yOffset);

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
						
			// stop rendering to framebuffer
			if (dl.renderToTexture)
			{
				render_segments(dl, dl.w, -dl.h, 1, -dl.x, -dl.y-dl.h);
			
				if (GL.checkFramebufferStatus(GL.FRAMEBUFFER) != GL.FRAMEBUFFER_COMPLETE) trace("ERROR while RenderToTexture: Framebuffer not complete");
				GL.bindFramebuffer(GL.FRAMEBUFFER, null);
				if (textures.get(dl.texture).mipmaps) {
					GL.bindTexture(GL.TEXTURE_2D, textures.get(dl.texture).texture); // todo: optimize "get" see above
					//GL.hint(GL.GENERATE_MIPMAP_HINT, GL.NICEST);
					//GL.hint(GL.GENERATE_MIPMAP_HINT, GL.FASTEST);
					GL.generateMipmap(GL.TEXTURE_2D);
					GL.bindTexture(GL.TEXTURE_2D, null);
				}

				GL.viewport (0, 0, width, height); // zurueckgesetzt fuer nachfolgende dl
			}
			else render_segments(dl, width, height, zoom, xOffset, yOffset);

			
			dl = (dl.next != startDisplaylist) ? dl.next : null; // next displaylist in loop
		}
		
		// if (dl.renderToImage) GL.bindFramebuffer(GL.FRAMEBUFFER, null);
	}
	

	// ------------------------ OPENGL PICKING -----------------------------------------
	public inline function pick(displaylist_nr:Int, mouseX:Int, mouseY:Int, zoom:Int, xOffset:Float = 0, yOffset:Float = 0):Int
	{	
		var dl:I_Displaylist = displaylist.get(displaylist_nr);
		
		var width:Int = 1;
		var height:Int = 1;
		xOffset = xOffset * (zoom-1)/zoom - mouseX / zoom;
		yOffset = yOffset * (zoom-1)/zoom - mouseY / zoom;
		
		// render to framebuffer
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer);
		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, fb_texture, 0);

		render_init(width, height);
		
		// TODO: if (dl.picking)
		
		render_scissor(dl, width, height, zoom, xOffset, yOffset);
		
		// TODO TODO -> depends on blend (and hardware diff webgl/cpp)
		//if (dl.blend == 0) {
			GL.enable(GL.DEPTH_TEST); GL.depthFunc(GL.LEQUAL); //GL.depthFunc(GL.LESS);
		//} else {GL.disable(GL.DEPTH_TEST);}
		
		
		GL.disable(GL.BLEND); // disable alpha blend for picking
	
		GL.clear( GL.DEPTH_BUFFER_BIT );

		render_segments(dl, width, height, zoom, xOffset, yOffset);
		
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
