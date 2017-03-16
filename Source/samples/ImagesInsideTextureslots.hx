package samples;

import haxe.Timer;

import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;


class ImagesInsideTextureslots extends Sample
{
	public override function run() 
	{
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		
		peoteView = new PeoteView({
			maxDisplaylists:    10,
			maxPrograms:       100,
			maxTextures:         1,
			maxImages:          10
		});
		
		// -----------------------------------------------------
		// --------------------- TEXTURECACHES -----------------
		// -----------------------------------------------------
		
		peoteView.setTexture({ texture:0, w:500, h:500, slots:4 });
		
		peoteView.setImage({ image:0, texture:0, slot:0,
			fit:"in",
			filename: "assets/DejavuSans.png",
			preload:true
		});
		
		peoteView.setImage({ image:1, texture:0, slot:1, // <- same slot
			//keep:true,
			x:0,y:0,
			w:200,h:200,
			filename: "assets/peote_tiles.png",
			preload:true
		});
		
		peoteView.setImage({ image:2, texture:0, slot:1, // <- same slot
			keep:true,
			x:200,y:0,
			w:200,h:200,
			filename: "assets/peote_font_white.png",
			preload:true
		});
		/*
		peoteView.setImage({ image:3, texture:0, slot:1, // <- same slot
			keep:true,
			fit:"in",
			filename: "assets/test0023.png",
			preload:true
		});*/
		
		peoteView.setProgram({ program:0, texture:0 });
		
		peoteView.setDisplaylist( {	displaylist: 0,
			
			type: //DType.ANIM |
			      DType.RGBA |
				  DType.ROTATION |
				  //DType.PICKING |
				  DType.ZINDEX
				,
			
			maxElements:       10,
			bufferSegmentSize: 10,
			bufferSegments:     1,
			
			x:0, y:0, w:1024, h:1024,	z:0,
			renderBackground:true, r:0.1, g:0.5, b:0.8,	a:0.8,
			blend:1, // alpha blending
			enable:true
		});
		
		peoteView.setElementDefaults({displaylist:0, program:0, w:512, h:512,});
		
		var timer = new Timer(1000);
		timer.run = function() {
			timer.stop();
			// use of different images
			peoteView.setElement({ element:0, x:6,   y:0,   image:0 });
			peoteView.setElement({ element:1, x:512, y:0,	image:1 });
			peoteView.setElement({ element:2, x:512, y:512,	image:2 });
			
			// show complete texture
			peoteView.setElement({ element:3, x:0, y:512, program:0 });
		
		}
	}


	
}