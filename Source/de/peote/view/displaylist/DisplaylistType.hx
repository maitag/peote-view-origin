package de.peote.view.displaylist;

/**
 * @author Sylvio Sell
 */

//@:enum abstract DisplaylistType(Int) from Int to Int {

typedef DType = DisplaylistType;
class DisplaylistType
{
	public static inline var SIMPLE:Int = 0;
	public static inline var ANIM:Int = 1;
	//public static inline var TREE:Int = 2;
	
	public static inline var ZINDEX:Int = 4;
	public static inline var RGBA:Int = 8;
	public static inline var ROTATION:Int = 16;
	public static inline var SCALE:Int = 32;
	public static inline var TILE:Int = 64;
	
	public static inline var PICKING:Int = 128;

}
