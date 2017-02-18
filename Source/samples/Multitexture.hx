package samples;

import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;
import haxe.Timer;

import lime.ui.Window;

class Multitexture extends Sample
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
			w:   512,        // Texture width
			h:   512,        // Texture height
		});
		
		peoteView.setTexture( {  texture: 1,
			w:   512,        // Texture width
			h:   512,        // Texture height
		});
		
		peoteView.setTexture( {  texture: 2,
			w:   512,        // Texture width
			h:   512,        // Texture height
		});
		
		// -----------------------------------------------------
		// ------------------- IMAGES --------------------------
		// -----------------------------------------------------
		peoteView.setImage( {  image: 0,
			texture:0,
			//filename: "assets/peote_font_green.png",
			filename: "assets/peote_font_white.png"
		});
		
		peoteView.setImage( {  image: 1,
			texture:1,
			filename: "assets/peote_tiles.png"
		});
		
		peoteView.setImage( {  image: 2,
			texture:2,
			filename: "assets/peote_tiles_bunnys.png",
			preload:true
		});
		
		// -----------------------------------------------------
		// ---------------- PROGRAM SHADER ---------------------
		// -----------------------------------------------------
		peoteView.setProgram( {	program: 0,
			textures: [0,1]
			//vshader: "assets/debug.vert",
			//fshader: "assets/debug.frag"
		});
		
		var timer = new Timer(2000);
		timer.run = function() {
			timer.stop();
			peoteView.setProgram( {	program: 0,
				textures: [0,2]
			});
		}
		
		
		// -----------------------------------------------------
		// ---------------- DISPLAYLISTS -----------------------
		// -----------------------------------------------------
		peoteView.setDisplaylist( {	displaylist: 0,
			
			type: //DisplaylistType.ANIM |
			      DisplaylistType.RGBA |
				  DisplaylistType.ROTATION |
				  DisplaylistType.PICKING |
				  DisplaylistType.ZINDEX
				,
			
			maxElements:       2,
			bufferSegmentSize: 2,
			bufferSegments:    1,
			
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
			x:100, y:100,
			w:100, h:100,
			pivotX:50, pivotY:50,
			rotation:-90,
			program:0,
			image:0,
			tile:2
		});
		
		peoteView.setElement( { element:1,
			x:200, y:100,
			w:100, h:100,
			pivotX:50, pivotY:50,
			rotation:135,
			program:0,
			image:1,
			tile:1
		});
		

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