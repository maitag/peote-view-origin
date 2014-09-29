/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o    _   o      o   
 *      o-o-o  o-o  (o)   o    o-o  
 *     o      o     (_\~   o      o 
 *    o      o-o     |\     o    o-o
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

import js.Browser;
import lime.Lime;
import haxe.Timer;
import lime.InputHandler;
import lime.InputHandler.MouseEvent;
import lime.InputHandler.TouchEvent;

import de.peote.view.PeoteView;

@:expose("Peote") class MainJS {
	
	private var lime:Lime;

	private static var startTime:Float;
	
    private var width: Int;
    private var height: Int;
    private var mouse_x: Int = 0;
    private var mouse_y: Int = 0;
    private var zoom: Int = 1;

	public static var peoteView:PeoteView;
	//public var render:Void->Void;
	
	public function new () {}
	public static function getTime():Float { return(Math.floor((Timer.stamp() - startTime)*100)/100); }
	
	public function ready(lime:Lime) {
		
		this.lime = lime;
		//trace("PEOTE JAVASCRIPT LIB" );
		//trace("multitouch_supported:"+lime.config.multitouch_supported );
		
		Browser.document.getElementById('lime_canvas').style.marginTop = '0px';
		js_onresize(null);
		Browser.window.addEventListener("resize", js_onresize);
		Browser.window.addEventListener("mousemove", js_onmousemove);
		Browser.window.addEventListener("touchmove", js_ontouchmove);
		Browser.window.addEventListener("mousewheel", js_onmousewheel);     //chrome
		Browser.window.addEventListener("DOMMouseScroll", js_onmousewheel); //FF
		
		peoteView = new PeoteView();
		startTime = Timer.stamp();
		
		untyped __js__("starter(Peote.peoteView);");
	}
	
	// EVENTS ------------------------------------------
	// -------------------------------------------------
	private function js_onmousemove( e:Dynamic )
	{
		mouse_x = Std.int(e.clientX);
		mouse_y = Std.int(e.clientY);
		//trace("js_onmousemove: " + mouse_x + "," + mouse_y );
	}
	private function js_ontouchmove( e:Dynamic )
	{
		mouse_x = Std.int(e.changedTouches[0].clientX);
		mouse_y = Std.int(e.changedTouches[0].clientY);
		//trace("js_ontouchmove: " + mouse_x + "," + mouse_y );
		e.preventDefault();
	}		
	private function js_onresize(e:Dynamic)
	{
		if (Browser.document.getElementById('lime_canvas') != null)
		{
			width = Browser.window.innerWidth;
			height = Browser.window.innerHeight;
			//trace("js_onresize:" + width + "," + height);
			
			js.Lib.eval("document.getElementById('lime_canvas').style.width='" + width + "px';" +
						"document.getElementById('lime_canvas').style.height='" + height + "px';" + 
						"document.getElementById('lime_canvas').setAttribute('width', '" + width + "');" +
						"document.getElementById('lime_canvas').setAttribute('height', '" + height + "');"
			);
		}
	}		
	private function js_onmousewheel( e:Dynamic )
	{
		var delta:Float = Math.max(-1, Math.min(1, (Std.int(e.wheelDelta) + -Std.int(e.detail))));
		if (delta > 0) zoom++;
		else if (zoom>1) zoom--;
		//trace("js_onmousewheel: " + e.detail );
	}	
	// end Event Handler
	
	
	// ------------------------------------------------------------
	// ----------- Render Loop ------------------------------------
	// ------------------------------------------------------------

	public inline function render():Void
	{
		peoteView.render(Math.floor((Timer.stamp() - startTime) * 100) / 100, width, height, mouse_x, mouse_y, zoom);
	}
	
	
}