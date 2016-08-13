package de.peote.view;
import haxe.ds.StringMap;
typedef ProgramParam =
{
	program:Int,
	?fshader:String,
	?vshader:String,
	?fshaderSrc:String,
	?vshaderSrc:String,
	?texture:Int,
	?textures:Array<Int>,
	?vars:StringMap<Array<Dynamic>>
}
