package debug;

//import samples.Sample;
import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;
import haxe.Timer;
import samples.Sample;

import lime.ui.Window;

class OnImageLoad extends Sample
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
		
		// -----------------------------------------------------
		// --------------------- TEXTURECACHES -----------------
		// -----------------------------------------------------
		
		peoteView.setTexture( {  texture: 0,
			slots: 4,
			w:   364,        // slot width
			h:   255,        // slot height
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
			
			//r:1.0, g:0.0, b:0.0, a:1.0,
			
			//keep:    true,
			x:10, y:0,
			//w:512,h:512, // Position and size inside texture slot area
			//fit: "in",
			preload:true,
		});
		
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
				  DType.ZINDEX
				,
			
			maxElements:    10000,
			maxPrograms:       10,
			bufferSegments:    10,
			
			x: 0,
			y: 0,
			w: 364,
			h: 255,
			z:0,
			
			renderBackground:true,

			r:0.2, g:0.3, b:0.8, a:1.0,
			
			//renderToImage:0, // (not yet)
			//blend:0,
			enable:true
		});
		
		// -----------------------------------------------------
		// ---------------- ELEMENTS ---------------------------
		// -----------------------------------------------------
		peoteView.setElementDefaults( { displaylist:0 } );
		
		peoteView.setElement( { element:0,
			x:0, y:0,
			w:364, h:255,
			program:0,
			//slot:0,
			//tx:0, ty:0, tw:400,th:400,
			//image:0,
			//tx:100,
			//image:0,
			//tile:10
		});

	}
	
}