package de.peote.view.displaylist;

/**
 * @author Sylvio Sell
 */

typedef DisplaylistParam =
{
	?displaylist:Int,
	?type:Int,
	?enable:Bool,
	
	?maxElements:Int,
	?maxPrograms:Int,
	?bufferSegments:Int,
	
	?x:Int,
	?y:Int,
	?w:Int,
	?h:Int,

	?z:Int,
	
	?xOffset:Int,
	?yOffset:Int,
	
	?zoom:Int,
	
	?blend:Int,
	
	?r:Float,
	?g:Float,
	?b:Float,
	?a:Float,
	?renderBackground:Bool
}
