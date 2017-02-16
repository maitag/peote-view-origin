package debug;

//import samples.Sample;
import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;
import haxe.Timer;
import samples.Sample;

import lime.ui.Window;

class Testing extends Sample
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
			slots: 2,
			w:   512,        // slot width
			h:   512,        // slot height
			//type: RGBA  // not implemented yet (allways RGBA)
		});
		
		// -----------------------------------------------------
		// ------------------- IMAGES --------------------------
		// -----------------------------------------------------
		peoteView.setImage( {  image: 0,
		
			texture:0,
			slot:0,
			
			filename: "assets/peote_font_white.png",
			//filename: "assets/peote_tiles.png",
			//filename: "assets/test0023.png",
			//filename: "http://maitag.de/semmi/blender/blenderconsole-telnet.png",
			//filename: "http://maitag.de/semmi/haxelime/peote-view-font/assets/peote_font_white.png",
			//filename: "http://maitag.de/semmi/blender/lyapunov/example_images/blechrad_next.blend.png",
			//filename: "http://maitag.de/semmi/blender/lyapunov/example_images/displace-FOSSIL-03.blend.jpg",
			//filename: "http://maitag.de/semmi/blender/lyap_maitag_03.blend.png",
			//filename: "https://s14-eu5.ixquick.com/cgi-bin/serveimage?url=http:%2F%2Fcdn.theatlanticwire.com%2Fimg%2Fupload%2F2012%2F05%2F02%2FAP12032008617.jpg&sp=f35f35281c402174f869216418276069",
			
			//alignX : "center",
			//alignY : "top",
			//fit    : "in",      // "in", "out" or "exact"
			//scaleUp: false,    // only scale images down if greater than texture-slot-size
			
			r:1.0,
			g:0.0,
			b:0.0,
			a:1.0,
			
			//keep:    true,
			x:128,y:0,w:512-256,h:512, // Position and size inside texture slot area
			//fit: "in",
			preload:true
		});
		
		// change image after 3 seconds
		var timer = new Timer(1000);
		timer.run = function() {
			
			timer.stop();
			peoteView.setImage( {  image: 1,			
				texture:0,				
				slot:0,
				//filename: "assets/test0023.png",
				//filename: "assets/liberation_font_320x512_green.png",
				filename: "assets/peote_tiles.png",
	keep:    true,
				//fit: "in",
				r:1.0, g:1.0,b:0.0,a:1.0,
				//x:100,
				x:-10, y:-10,
				w:256, h:256,
			});
			
			peoteView.setElement( { element:1,
				x:0, y:0, w:256, h:256,
				program:0,
				image:1,
				//tx:32, ty:0, tw:32 ,th:32,
				tile:17
			});
			/*
			var timer1 = new Timer(3000);
			timer1.run = function() {
				timer1.stop();
				//peoteView.setElement( { element:0, image:1 });
				peoteView.setElement( { element:2,
					x:0, y:600, w:32, h:32,
					program:0,
					image:0,
					tile:65
				});
			}
			*/
		}
		
		// -----------------------------------------------------
		// ---------------- PROGRAM SHADER ---------------------
		// -----------------------------------------------------
		peoteView.setProgram( {	program: 0,
			texture: 0,
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
			w: 1512,
			h: 1512,
			z:0,
			
			renderBackground:true,

			r:0.2,
			g:0.3,
			b:0.8,
			a:1.0,
			
			//renderToImage:0, // (not yet)
			//blend:0,
			enable:true
		});
		
		// -----------------------------------------------------
		// ---------------- ELEMENTS ---------------------------
		// -----------------------------------------------------
		peoteView.setElementDefaults( { displaylist:0 } );
		
		peoteView.setElement( { element:0,
			x:512, y:0,
			w:1024, h:512,
			program:0,
			//slot:0,
			//tx:0, ty:0, tw:400,th:400,
			//image:0,
			//tx:100,
			//image:0,
			//tile:10
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