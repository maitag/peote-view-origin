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
	?sx: Float, ?sy: Float,
	?time:Float,
	
	?tx:Int, ?ty:Int, ?tw:Int, ?th:Int,
	?z:Int, ?program:Int, ?image:Int, ?tile:Int,
	?parent:Int,
	
	?img:Image
}

typedef ParamAnim =
{
	?x:Int, ?y:Int, ?w:Int, ?h:Int,
	?sx: Float, ?sy: Float,
	?time:Float,
	?tile:Int,
}
