package de.peote.view.displaylist;

/**
 * @author Sylvio Sell
 */

import de.peote.view.element.I_ElementBuffer;
import de.peote.view.Param;
 
interface I_Displaylist 
{
	public var type:Int;
	
	public var prev:I_Displaylist; // pref displaylist (in order)
	public var next:I_Displaylist; // next displaylist (in order)

	public var x:Int; // x Position
	public var y:Int; // y Position
	public var w:Int; // width
	public var h:Int; // height

	public var xOffset:Int; // x Offset for all Elements
	public var yOffset:Int; // y Offset for all Elements

	public var z:Int; // z order

	public var r:Float; // red bg
	public var g:Float; // green bg
	public var b:Float; // blue bg
	public var a:Float; // blue bg

	public var renderBackground:Bool;
	public var enable:Bool;

	
	public var buffer:Buffer;
	public var elemBuff:I_ElementBuffer;
	

	public function set(param:DParam):Void;
	public function delete():Void;
	
	public function setElement(param:Param):Void;
	public function getElement(element_nr:Int):Param;
	public function hasElement(element_nr:Int):Bool;
	public function delElement(element_nr:Int):Void;
	public function delAllElement():Void;
}