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

import openfl.display.OpenGLView;
import openfl.display.Sprite;
import openfl.geom.Rectangle;
import openfl.events.Event;
import openfl.events.MouseEvent;

import haxe.Timer;

import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;

class MainOpenfl extends Sprite {
	
    public var mouse_x: Int = 0;
    public var mouse_y: Int = 0;
    public var zoom: Int = 1;
	
	public var startTime:Float;
	public var peoteView:PeoteView;
	
	private var view:OpenGLView;
	
	public function new () {
		#if openfl
			trace("OPENFL");
		#end

		super ();
		if (OpenGLView.isSupported) {

			trace("OpenGLView.isSupported");
			
			// start Example
			startTime = Timer.stamp();
			var t:Float = Timer.stamp() - startTime;
			
			peoteView = new PeoteView({});

			peoteView.setProgram( {
				program:0,
				fshader: "assets/lyapunov_01.frag"
			});
			
			peoteView.setDisplaylist( { 
				displaylist:0,
				type:DisplaylistType.SIMPLE,
				maxElements:       1,
				maxPrograms:       1,
				bufferSegments:    1,
				x:0,
				y:0,
				//w:300,
				//h:300,
			});
			
			peoteView.setElement( { 
				element:0,
				displaylist:0,
				program:0,
				x: 0,
				y: 0,
				w: 4000,
				h: 4000,
				//tw: 10000000,
				//th: 10000000,
			});
			

			// ---------------------------------------------------------------
			
			view = new OpenGLView ();
			view.render = renderView;
			addChild (view);

			// stage events
			stage.addEventListener( Event.RESIZE, function(e) { onWindowResize( stage.stageWidth, stage.stageHeight );  } );
			stage.addEventListener( MouseEvent.MOUSE_MOVE, function(e:MouseEvent) { onMouseMove( e.stageX, e.stageY );  } );
			stage.addEventListener( MouseEvent.MOUSE_DOWN, function(e:MouseEvent) { onMouseDown( e.stageX, e.stageY, 0 );  } );
			stage.addEventListener( MouseEvent.MOUSE_UP,   function(e:MouseEvent) { onMouseUp( e.stageX, e.stageY, 0 );  } );
			stage.addEventListener( MouseEvent.MOUSE_WHEEL,function(e:MouseEvent) { onMouseWheel( e.delta, e.delta );  } );
			
			
		}
	}
	
	// ----------- Render Loop ------------------------------------
	private function renderView (rect:Rectangle):Void
	{
		peoteView.render(Timer.stamp() - startTime, Std.int (rect.width), Std.int (rect.height), mouse_x, mouse_y, zoom);
	}


	
	// ------------------------------------------------------------
	// ----------- EVENT HANDLER ----------------------------------
	public function onWindowResize (width:Int, height:Int):Void
	{
		//trace("onWindowResize:" + width + ',' + height);
		#if js
		if (js.Browser.document.getElementById('openfl-content').firstChild.firstChild != null)
		{
			js.Lib.eval(//"document.getElementById('openfl-content').getElementsByTagName('div')[0].style.width='" + w + "px';" +
						//"document.getElementById('openfl-content').getElementsByTagName('div')[0].style.height='" + h + "px';" + 
						"document.getElementById('openfl-content').getElementsByTagName('div')[0].getElementsByTagName('canvas')[0].setAttribute('width', '" + width + "');" +
						"document.getElementById('openfl-content').getElementsByTagName('div')[0].getElementsByTagName('canvas')[0].setAttribute('height', '" + height + "');"
					);
		}
		#end

	}
	// ----------------------------------------------  ... same as in Lime !!!
	public function onMouseMove (x:Float, y:Float):Void
	{
		//trace("onMouseMove: " + x + "," + y );
		mouse_x = Std.int(x);
		mouse_y = Std.int(y);
		
	}
	public function onTouchMove (x:Float, y:Float, id:Int):Void
	{
		//trace("onTouchMove: " + x + "," + y );
		mouse_x = Std.int(x);
		mouse_y = Std.int(y);
	}
	public function onMouseDown (x:Float, y:Float, button:Int):Void
	{	
		//trace("onMouseDown: x=" + x + " y="+ y);
		if ( button == 0) zoom++;
		else if (button == 1 && zoom>1) zoom--;
	}
	public function onMouseUp (x:Float, y:Float, button:Int):Void
	{	
		//trace("onmouseup: "+button+" x=" + x + " y="+ y);
	}
	public function onMouseWheel (deltaX:Float, deltaY:Float):Void
	{	
		//trace("onmousewheel: " + deltaX + ',' + deltaY );
		if ( deltaY>0 ) zoom++;
		else if (zoom > 1) zoom--;
	}

	// end Event Handler ------------------------------------------
	// ------------------------------------------------------------
	
}
