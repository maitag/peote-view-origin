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
	//?bitmap:Bitmap,
	
	?preload:Bool,

	?scaleUp:Bool,
	?fit:String,
	?keep:Bool,
	
	?x:Int,
	//?l:Int,
	//?r:Int,
	?h:Int,
	
	?y:Int,
	//?t:Int,
	//?b:Int,
	?w:Int,
	
	?r:Float,
	?g:Float,
	?b:Float,
	?a:Float,
	
	?onLoad:Int->Int->Void,
}
