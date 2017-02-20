package samples;

import haxe.Timer;

import peote.view.PeoteView;
import peote.view.displaylist.DisplaylistType;


class RenderToTexture extends Sample
{
	public override function run() 
	{
		// set Time
		startTime = Timer.stamp();
		var t:Float = Timer.stamp() - startTime;
		
		peoteView = new PeoteView({
			maxDisplaylists:     2,
			maxPrograms:         2,
			maxTextures:         2,
			maxImages:           1
		});
		
		// ------------------- Font texture + image-------------------------		
		peoteView.setTexture({ texture:0, w:512, h:512  });
		peoteView.setImage  ({ texture:0, image:0, filename:"assets/peote_font_white.png" });
		peoteView.setProgram({ texture:0, program:0 });
		
		// ------------------- TEXTURE to Render IN ------------------------		
		peoteView.setTexture({ texture:1, slots:1, w:256, h:256 });
		peoteView.setProgram({ texture:1, program:1 });
		
		// ---------------- DISPLAYLIST renderToTexture---------------------
		peoteView.setDisplaylist( {	displaylist: 0,
			type: DisplaylistType.ANIM | DType.RGBA | DType.ROTATION | DType.ZINDEX,
			maxElements:        4,
			x:0, y:0, w:256, h:256, z:0,
			//xOffset:30,	yOffset:30,
			renderBackground:true,
			r:0.2, g:0.3, b:0.8, a:1.0,
			//blend:0,
			
			renderToTexture:true,
			texture:1,
			
			enable:true
		});
		
		peoteView.setElement( { element:0, displaylist:0,
			x:0, y:0, w:128, h:128, pivotX:64, pivotY:64, end:{x:128, rotation:90, time:t+2},
			program:0, image:0,	tile:65
		});
		peoteView.setElement( { element:1, displaylist:0,
			x:128, y:0, w:128, h:128, pivotX:64, pivotY:64, end:{y:128, rotation:90, time:t+2},
			program:0, image:0,	tile:66
		});
		peoteView.setElement( { element:2, displaylist:0,
			x:0, y:128, w:128, h:128, pivotX:64, pivotY:64, end:{y:0, rotation:-90, time:t+2},
			program:0, image:0,	tile:67
		});
		peoteView.setElement( { element:3, displaylist:0,
			x:128, y:128, w:128, h:128, pivotX:64, pivotY:64, end:{x:0, rotation:-90, time:t+2},
			program:0, image:0,	tile:68
		});
		
		// -------------- DISPLAYLIST  that contains element with texture that was rendererd to --------------
		peoteView.setDisplaylist( {	displaylist: 1,
			type: DisplaylistType.ANIM | DType.RGBA | DType.ROTATION | DType.ZINDEX,
			maxElements:        1,
			x: 50, y: 35, w: 512, h: 512,
			renderBackground:true,
			r:0.8, g:0.5, b:0.1, a:1.0, z:1,
			//blend:0,
			enable:true
		});
		
		peoteView.setElement( { element:0, displaylist:1,
			x:0, y:0, w:256, h:256, end:{x:370, y:150, rotation:60, time:t+2},
			program:1
		});

		
		
	}
	
}