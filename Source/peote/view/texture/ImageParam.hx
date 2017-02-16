package peote.view.texture;

/**
 * ...
 * @author Sylvio Sell
 */

typedef ImageParam =
{
	image:Int,

	?texture:Int,
	?slot:Int,
	
	filename:String,
	
	?preload:Bool,

	?scaleUp:Bool,
	?fit:String,
	?keep:Bool,
	
	?x:Int,
	?h:Int,
	
	?y:Int,
	?w:Int,
	
	?r:Float,
	?g:Float,
	?b:Float,
	?a:Float,
	
}
