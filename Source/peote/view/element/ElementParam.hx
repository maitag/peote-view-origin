package peote.view.element;
import peote.view.texture.Image;

/**
 * @author Sylvio Sell
 */

typedef ElementParam =
{
	?element:Int,
	?displaylist:Int,
	
	?start:ElementParamAnim,
	?end:ElementParamAnim,
	
	?x:Int, ?y:Int, ?w:Int, ?h:Int,
	?time:Float,
	
	?tx:Int, ?ty:Int, ?tw:Int, ?th:Int,
	?z:Int, ?program:Int, ?slot:Int, ?image:Int, ?tile:Int,
	
	?rgba:Int, // UInt doesnt work in cpp

	?rotation:Float,
	?pivotX:Int,
	?pivotY:Int,
	
	?img:Image
}

typedef ElementParamAnim =
{
	?x:Int, ?y:Int, ?w:Int, ?h:Int,

	?rgba:Int, // UInt doesnt work in cpp

	?rotation:Float,
	?pivotX:Int,
	?pivotY:Int,

	?time:Float,
	?tile:Int,
}
