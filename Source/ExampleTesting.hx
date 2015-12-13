/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o        o      o   
 *      o-o-o  o-o   o    o    o-o  
 *     o      o     (_\    o      o 
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

import de.peote.view.PeoteView;
import de.peote.view.displaylist.DType;
import haxe.Timer;

import lime.ui.Window;

class ExampleTesting extends Example
{
	public override function run() 
	{
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		
		peoteView = new PeoteView(10, 1000); // max_displaylists, max_programs (for all displaylists)
		
		// PICKING
		peoteView.createFramebuffer();
		
		// -----------------------------------------------------
		// ---------------- PROGRAM SHADER ---------------------
		// -----------------------------------------------------
		//peoteView.setProgram(0, "assets/lyapunov_01.frag");
		
		// -----------------------------------------------------
		// ------------------- IMAGES --------------------------
		// -----------------------------------------------------
		//peoteView.setImage(0, "assets/peote_font_green.png", 512, 512);
		//peoteView.setImage(1, "assets/peote_tiles.png", 512, 512);
		peoteView.setImage(0, "assets/peote_font_white.png", 512, 512);
		
		// -----------------------------------------------------
		// ---------------- DISPLAYLISTS -----------------------
		// -----------------------------------------------------
		peoteView.setDisplaylist( { displaylist:0, type:DType.ANIM|DType.RGBA|DType.ROTATION|DType.PICKING, //|DType.ZINDEX
			elements:10000, programs:1, segments:10, // for low-end devices better max_elements < 100 000
			x:0, y:0,
			w:512, h:512,
			z:0,
			renderBackground:true,
			r:0.1,g:0.5,b:0.8, a:0.8,
			//renderToImage:true,
			//image:0,
			enable:true
		});
		/*
		peoteView.setDisplaylist( { displaylist:1, type:DType.ANIM|DType.RGBA|DType.ROTATION, //|DType.ZINDEX
			elements:1000, programs:10, segments:10, // for low-end devices better max_elements < 100 000
			x:512, y:0,
			w:150, h:150,
			z:1,
			renderBackground:true,
			r:0.8,g:0.5,b:0.1, a:0.8,
			enable:true
		});
		*/
		
		// -----------------------------------------------------
		// ---------------- ELEMENTS ---------------------------
		// -----------------------------------------------------
		peoteView.setElementDefaults( { displaylist:0 } );
		
		peoteView.setElement( { element:0,
			x:0, y:0,
			rgba:0xff0000ff,
			pivotX:50,
			pivotY:50,rotation:360,
			end: {
				x:400,
				rotation:180,
				time: Timer.stamp() - startTime + 4,
				rgba:0x0000ffff
			},
			w:100, h:100,
			image:0,
			tile:65
		});
		peoteView.setElement( { element:1,
			x:100, y:100,
			w:100, h:100,
			pivotX:50, pivotY:50,
			rotation:-90,
			image:0,
			tile:65
		});
		peoteView.setElement( { element:2,
			x:200, y:100,
			w:100, h:100,
			pivotX:50, pivotY:50,
			rotation:135,
			image:0,
			tile:65
		});
		/*
		peoteView.setElementDefaults({ displaylist:1, z:0, image:0 });
		
		peoteView.setElement( { element:0,
			x: 25, y: 25,
			w:100, h:100
		});
		*/
		
		/*
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
		*/
		
		/*
		var offset:Int = 50;
		var timer = new Timer(100);
		timer.run = function() {
			//trace("time");
			var t:Float = Timer.stamp() - startTime;
			//timer.stop();
			offset += 10;
			//peoteView.setDisplaylist( { displaylist:0, yOffset:offset });
			peoteView.setDisplaylist( { displaylist:1, x:offset });
		}
		*/
		

	}
	
	public override function onMouseDown (window:Window, x:Float, y:Float, button:Int):Void
	{
		// pick element number from displaylist 0
		var e:Int = peoteView.pick(0, Timer.stamp() - startTime, mouse_x, mouse_y, zoom, xOffset, yOffset);
		if (e != -1)
		{
			peoteView.setElement( { element:e,
				tile: peoteView.getElement({element:e}).tile+1
			});
		}
		
	}
	


	
}