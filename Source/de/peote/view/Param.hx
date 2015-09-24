package de.peote.view;
import de.peote.view.texture.Image;

/**
 * @author Sylvio Sell
 */

typedef Param =
{
	?element:Int,
	?displaylist:Int,
	
	?start:ParamAnim,
	?end:ParamAnim,
	
	?x:Int, ?y:Int, ?w:Int, ?h:Int,
	?time:Float,
	
	?tx:Int, ?ty:Int, ?tw:Int, ?th:Int,
	?z:Int, ?program:Int, ?image:Int, ?tile:Int,
	
	?rgba:Int, // UInt doesnt work in cpp

	?rotation:Float,
	?pivotX:Int,
	?pivotY:Int,
	
	?img:Image
}

typedef ParamAnim =
{
	?x:Int, ?y:Int, ?w:Int, ?h:Int,

	?rgba:Int, // UInt doesnt work in cpp

	?rotation:Float,
	?pivotX:Int,
	?pivotY:Int,

	?time:Float,
	?tile:Int,
}
