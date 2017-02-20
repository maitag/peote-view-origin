package peote.view.displaylist;

/**
 * @author Sylvio Sell
 */

typedef DisplaylistParam =
{
	?displaylist:Int,
	?type:Int,
	?enable:Bool,
	
	?maxElements:Int,
	?bufferSegmentSize:Int,
	?bufferSegments:Int,
	
	?x:Int,
	?y:Int,
	?w:Int,
	?h:Int,

	?z:Int,
	
	?xOffset:Float,
	?yOffset:Float,
	
	?zoom:Float,
	
	?blend:Int,
	
	?r:Float,
	?g:Float,
	?b:Float,
	?a:Float,
	?renderBackground:Bool,
	
	?renderToTexture:Bool,
	?texture:Int
}
