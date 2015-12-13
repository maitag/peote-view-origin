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

import de.peote.view.PeoteView;
import de.peote.view.displaylist.DType;

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

		// TODO: cpp ok - html5 klappt nicht: TypeError: lime.graphics.opengl.GL.context is null
		
		super ();
		if (OpenGLView.isSupported) {

			trace("OpenGLView.isSupported");
			
			// start Example
			startTime = Timer.stamp();
			var t:Float = Timer.stamp() - startTime;
			
			peoteView = new PeoteView(10, 1000); // max_displaylists, max_programs (for all displaylists)
			
			// -----------------------------------------------------
			// ---------------- PROGRAM SHADER ---------------------
			// -----------------------------------------------------
			peoteView.setProgram(0, "assets/lyapunov_01.frag");
			
			// -----------------------------------------------------
			// ------------------- IMAGES --------------------------
			// -----------------------------------------------------
			peoteView.setImage(0, "assets/peote_font_green.png", 512, 512);
			peoteView.setImage(1, "assets/peote_tiles.png", 512, 512);
			
			
			// -----------------------------------------------------
			// ---------------- DISPLAYLISTS -----------------------
			// -----------------------------------------------------
			peoteView.setDisplaylist( { displaylist:0, type:DType.ANIM,
				max_elements:100, max_programs:10, buffer_segment_size:1000, // for low-end devices better max_elements < 100 000
				x:150, y:50,
				w:1000, h:1000,
				z:0,
				enable:true
			});
			
			peoteView.setDisplaylist( { displaylist:1, 
				max_elements:1000, max_programs:10, buffer_segment_size:1000, // for low-end devices better max_elements < 100 000
				x:100, y:70,
				w:150, h:150,
				z:1,
				renderBackground:true,
				r:0.1,g:0.5,b:0.8, a:0.8,
				enable:true
			});
			
			// -----------------------------------------------------
			// ---------------- ELEMENTS ---------------------------
			// -----------------------------------------------------
			
			peoteView.setElementDefaults({ displaylist:0, z:1, image:1, tile:2 });
			
			peoteView.setElement( { element:0,
				x: -50000,
				y: -50000,
				w:100000, h:100000,
				tw: 10000000, th:10000000,
				program:0
			});
			
			peoteView.setElement( { element:1,
				x: 411, y: 0,
				w:222, h:222
			});
			
			// -----------------------------------------------------
			
			peoteView.setElement( { element:0, displaylist:1,
				x:0, y:0,
				end:{x:100, time: Timer.stamp() - startTime +100},
				w:100, h:100,
				tile:1
			});
			
			
			var timer = new Timer(2000);
			timer.run = function() {
				timer.stop();
				peoteView.setElement( { element:0, displaylist:1,
					program:0 // program-wechsel
				});
				//peoteView.setProgram(1, "assets/lyapunov_01.frag");

				//peoteView.delDisplaylist( {displaylist:0 } );
			}

			// ---------------------------------------------------------------
			// ---------------------------------------------------------------
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
