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
import haxe.Timer;
import lime.app.Application;
import lime.graphics.RenderContext;

import de.peote.view.PeoteView;

@:expose("Peote") class MainJS extends Application {
	
	private static var startTime:Float;
	
    private var width: Int;
    private var height: Int;
    private var mouse_x: Int = 0;
    private var mouse_y: Int = 0;
    private var zoom: Int = 1;

	public static var peoteView:PeoteView;
	public static var max_displaylists:Int;
	public static var max_programs:Int;
	
	public static function getTime():Float { return(Math.floor((Timer.stamp() - startTime)*100)/100); }
	
	public function new () {
		super ();
	}
	
	public override function init (context:RenderContext):Void
	{
		switch (context) {
			case OPENGL (gl):
				
				width = window.width;
				height = window.height;
				
				//peoteView = new PeoteView(560 * 360 +1, 2, 1000); // TODO
				peoteView = new PeoteView(max_displaylists, max_programs); // TODO
				startTime = Timer.stamp();
				
				untyped __js__("starter(Peote.peoteView);");
				
			default:
				trace("only opengl supported");
		}
	}
	
	// ----------- Render Loop ------------------------------------
	public override function render(context:RenderContext):Void
	{
		peoteView.render(Math.floor((Timer.stamp() - startTime) * 100) / 100, width, height, mouse_x, mouse_y, zoom);
	}
	
	// ------------------------------------------------------------
	// ----------- EVENT HANDLER ----------------------------------
	public override function onWindowResize (width:Int, height:Int):Void
	{
		trace("onWindowResize:"+width+','+height);
		this.width = width;
		this.height = height;
	}
	public override function onMouseMove (x:Float, y:Float):Void
	{
		//trace("onMouseMove: " + x + "," + y );
		mouse_x = Std.int(x);
		mouse_y = Std.int(y);
	}
	public override function onTouchMove (x:Float, y:Float, id:Int):Void
	{
		trace("onTouchMove: " + x + "," + y );
		mouse_x = Std.int(x);
		mouse_y = Std.int(y);
	}
	public override function onMouseDown (x:Float, y:Float, button:Int):Void
	{	
		trace("onMouseDown: x=" + x + " y="+ y);
		if ( button == 0) zoom++;
		else if (button == 1 && zoom>1) zoom--;
	}
	public override function onMouseUp (x:Float, y:Float, button:Int):Void
	{	
		trace("onmouseup: "+button+" x=" + x + " y="+ y);
	}
	public override function onMouseWheel (deltaX:Float, deltaY:Float):Void
	{	
		//trace("onmousewheel: " + deltaX + ',' + deltaY );
		if ( deltaY>0 ) zoom++;
		else if (zoom > 1) zoom--;
	}
	
	
}