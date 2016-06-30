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

import samples.Sample;
import de.peote.view.PeoteView;
import de.peote.view.displaylist.DisplaylistType;
import haxe.Timer;

import lime.ui.Window;

class Testing extends samples.Sample
{
	public override function run() 
	{
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		
		peoteView = new PeoteView({
			maxDisplaylists:    10,
			maxPrograms:       100,
			maxTextures:       100,
			maxImages:        1000
		});
		
		// PICKING
		peoteView.createFramebuffer(); // TODO: set automatically if displayneed use picking
		
		// -----------------------------------------------------
		// --------------------- TEXTURECACHES -----------------
		// -----------------------------------------------------
		
		peoteView.setTexture( {  texture: 0,
			slots: 5,
			w:   512,        // slot width
			h:   512,        // slot height
			//type: RGBA  // not implemented yes (allways RGBA)
		});
		
		// -----------------------------------------------------
		// ------------------- IMAGES --------------------------
		// -----------------------------------------------------
		peoteView.setImage( {  image: 0,
		
			texture:0,
			filename: "assets/peote_font_green.png",
			//filename: "assets/peote_tiles.png",
			//filename: "http://maitag.de/semmi/blender/blenderconsole-telnet.png",
			//filename: "http://maitag.de/semmi/haxelime/peote-view-font/assets/peote_font_white.png",
			//filename: "http://maitag.de/semmi/blender/lyapunov/example_images/blechrad_next.blend.png",
			//filename: "http://maitag.de/semmi/blender/lyapunov/example_images/displace-FOSSIL-03.blend.jpg",
			//filename: "http://maitag.de/semmi/blender/lyap_maitag_03.blend.png",
			//filename: "https://s14-eu5.ixquick.com/cgi-bin/serveimage?url=http:%2F%2Fcdn.theatlanticwire.com%2Fimg%2Fupload%2F2012%2F05%2F02%2FAP12032008617.jpg&sp=f35f35281c402174f869216418276069",

			x:10,y:10,w:220,h:150 // Position and size inside texture slot area
		});
		/*
		// change image after 2 seconds
		var timer = new Timer(2000);
		timer.run = function() {
			
			timer.stop();
			peoteView.setImage( {  image: 0,
			
				texture:0,
				filename: "assets/peote_tiles_bunnys.png",
			});
			
		}
		*/
		// -----------------------------------------------------
		// ---------------- PROGRAM SHADER ---------------------
		// -----------------------------------------------------
		peoteView.setProgram( {	program: 0,
			texture: 0
			//vshader: "assets/debug.vert",
			//fshader: "assets/debug.frag"
		});
		
		
		
		// -----------------------------------------------------
		// ---------------- DISPLAYLISTS -----------------------
		// -----------------------------------------------------
		peoteView.setDisplaylist( {	displaylist: 0,
			
			type: //DisplaylistType.ANIM |
			      DType.RGBA |
				  DType.ROTATION |
				  DType.PICKING |
				  DType.ZINDEX
				,
			
			maxElements:    10000,
			maxPrograms:       10,
			bufferSegments:    10,
			
			x: 0,
			y: 0,
			w: 512,
			h: 512,
			z:0,
			
			renderBackground:true,

			// TODO: better backgroundColor:[0.1, 0.5, 0.8, 0.8]
			r:0.1,
			g:0.5,
			b:0.8,
			a:0.8,
			
			//renderToImage:0, // (not yet)
			
			enable:true
		});
		
		// -----------------------------------------------------
		// ---------------- ELEMENTS ---------------------------
		// -----------------------------------------------------
		peoteView.setElementDefaults( { displaylist:0 } );
		
		peoteView.setElement( { element:0,
			x:0, y:0,
			w:512, h:512,
			program:0,
			image:0,
			//tile:1
		});
		/*
		peoteView.setElement( { element:1,
			x:200, y:100,
			w:100, h:100,
			pivotX:50, pivotY:50,
			rotation:135,
			program:0,
			image:0,
			tile:2
		});
		*/
		
		
		/*
		peoteView.setElement( { element:2,
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
			tile:65,
			program:0
		});
		*/
		
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