/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o  \|/   o    o-o   
 *     o      o     <O>    o      o  
 *    o      o-o    /|\     o    o-o 
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

import haxe.ds.IntMap;
import haxe.ds.Vector;
import lime.gl.GLProgram;
import lime.gl.GLShader;
import lime.utils.Assets;
import haxe.Http;

class Displaylist
{
	
	public var treeElement:Vector<TreeElement>;
	
	public function new(max_elements:Int, max_programs:Int) 
	{
		treeElement = new Vector<TreeElement>(max_elements);
		super(max_elements, max_programs);
	}
	
	public function setTreeElement1(parent_nr:Int, nr:Int, x:Int, y:Int, z:Int, w:Int, h:Int,
	                                           scaleX:Float, scaleY:Float, shader_nr:Int,
	                                           tx:Float, ty:Float, tw:Float, th:Float, image_nr:Int, tile_nr:Int ):Void
	{
		if (parent_nr != -1)
		{
			var parent = treeElement.get(parent_nr);
			x += parent.x;
			y += parent.y;
			z += parent.z;
			scaleX *= parent.scaleX;
			scaleY *= parent.scaleY;
			
			treeElement.set(nr, new TreeElement( parent.child, x, y, z, w, h, scaleX, scaleY) );
			parent.child = nr;
		}
		else treeElement.set(nr, new TreeElement(-1, x, y, z, w, h, scaleX, scaleY) );

		super.setElement( nr, x, y, z, Math.round(w*scaleX), Math.round(h*scaleY), shader_nr, tx, ty, tw, th, image_nr, tile_nr );
	}
	
	override public function delElement(e:Element):Void
	{
		buffer.delElement(e);
		// TODO: deleta all childs
	}
	
	public function animTreeElement(nr:Int, x:Int, y:Int, z:Int, w:Int, h:Int,
	                                            scaleX:Float, scaleY:Float, t1:Float, t2:Float):Void
	{
		var elem:TreeElement = treeElement.get(nr);
		var parent_nr:Int = elem.parent;
		
		if (parent_nr != -1)
		{
			var parent = treeElement.get(parent_nr);
			x += parent.x;
			y += parent.y;
			z += parent.z;
			scaleX *= parent.scaleX;
			scaleY *= parent.scaleY;
		}
		
		elem.update(x, y, z, w, h, scaleX, scaleY);
		super.animElement(nr, x, y, z, Math.round(w*scaleX), Math.round(h*scaleY), t1, t2);
		
		// all childs relative
		var child_nr:Int = elem.child;
		while (child_nr != -1)
		{
			elem = treeElement.get(child_nr); // elem is child now
			animTreeElement(child_nr, elem.x, elem.y, elem.z, elem.w, elem.h, elem.scaleX, elem.scaleY, t1, t2);
			child_nr = elem.sib;
		}
	}
	
	
}
