/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o   o    o    o-o   
 *     o      o     (_)    o      o  
 *    o      o-o    / \     o    o-o 
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

package;

#if js
import js.Browser;
#end
import lime.Lime;
import lime.InputHandler;
import lime.InputHandler.MouseEvent;
import lime.InputHandler.TouchEvent;

class Main {
	
	private var lime:Lime;
	
    public var width: Int;
    public var height: Int;
    public var mouse_x: Int = 0;
    public var mouse_y: Int = 0;
    public var zoom: Int = 1;
	
	public var render:Void->Void;
	
	public function ready(lime:Lime)
	{
		this.lime = lime;
		
		#if js
		Browser.document.getElementById('lime_canvas').style.marginTop = '0px';
		js_onresize(null);
		Browser.window.addEventListener("resize", js_onresize);
		Browser.window.addEventListener("mousemove", js_onmousemove);
		Browser.window.addEventListener("touchmove", js_ontouchmove);
		Browser.window.addEventListener("mousewheel", js_onmousewheel);     //chrome
		Browser.window.addEventListener("DOMMouseScroll", js_onmousewheel); //FF
		#else
		width = lime.config.width;
		height = lime.config.height;
		#end		
		
		// start Examples
		new Example_01(this);
	}
	
	// ------------------------------------------------------------
	// ----------- EVENT HANDLER ----------------------------------

	#if js
	private function js_onmousemove( e:Dynamic )
	{
		//trace("js_onmousemove: " + mouse_x + "," + mouse_y );
		mouse_x = Std.int(e.clientX);
		mouse_y = Std.int(e.clientY);
	}
	private function js_ontouchmove( e:Dynamic )
	{
		//trace("js_ontouchmove: " + mouse_x + "," + mouse_y );
		mouse_x = Std.int(e.changedTouches[0].clientX);
		mouse_y = Std.int(e.changedTouches[0].clientY);
		e.preventDefault();
	}
	private function js_onresize(e:Dynamic)
	{
		if (Browser.document.getElementById('lime_canvas') != null)
		{
			//trace("js_onresize:" + width + "," + height);
			width = Browser.window.innerWidth;
			height = Browser.window.innerHeight;
			
			js.Lib.eval("document.getElementById('lime_canvas').style.width='" + width + "px';" +
						"document.getElementById('lime_canvas').style.height='" + height + "px';" + 
						"document.getElementById('lime_canvas').setAttribute('width', '" + width + "');" +
						"document.getElementById('lime_canvas').setAttribute('height', '" + height + "');"
			);
		}
	}
	private function js_onmousewheel( e:Dynamic )
	{
		//trace("js_onmousewheel: " + e.detail );
		var delta:Float = Math.max(-1, Math.min(1, (Std.int(e.wheelDelta) + -Std.int(e.detail))));
		if (delta > 0) zoom++;
		else if (zoom>1) zoom--;
	}	
	#else
	public function onmousemove( e:MouseEvent )
	{
		//trace("onmousemove: " + mouse_x + "," + mouse_y );
		mouse_x = Std.int(e.x);
		mouse_y = Std.int(e.y);
	}
	public function ontouchmove( e:TouchEvent )
	{
		//trace("ontouchmove: " + mouse_x + "," + mouse_y );
		mouse_x = Std.int(e.x);
		mouse_y = Std.int(e.y);
	}
	public function onresize(e:Dynamic)
	{
		//trace("onresize");
		width = Std.int(e.x);
		height = Std.int(e.y);
	}
	public function onmousedown( e:MouseEvent )
	{	
		if ( e.button == MouseButton.left) zoom++;
		else if (e.button == MouseButton.right && zoom>1) zoom--;
		//trace("onmousedown: x=" + e.x + " y="+ e.y);
	}
	public function onmouseup( e:MouseEvent )
	{	
		//trace("onmouseup: "+e.button+" x=" + e.x + " y="+ e.y);
	}
	public function onmousewheel( e:MouseEvent ) // lime: does only work if onmouseup() exist !!!
	{	
		trace("onmousewheel: " + e.button );
		if ( e.button == MouseButton.wheel_down) zoom++;
		else if (zoom>1) zoom--;
	}
	#end
	// end Event Handler
	
	
	

	
}
