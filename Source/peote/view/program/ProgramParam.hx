package peote.view.program;

import haxe.ds.StringMap;

typedef ProgramParam =
{
	?program:Int,
	?fshader:String,
	?vshader:String,
	?fshaderSrc:String,
	?vshaderSrc:String,
	?texture:Int,
	?textures:Array<Int>,
	?vars:StringMap<Array<Dynamic>>,
}

/*
typedef ProgramParam =
{
	var program:Int;
	@:optional var fshader:String;
	@:optional var vshader:String;
	@:optional var fshaderSrc:String;
	@:optional var vshaderSrc:String;
	@:optional var texture:Int;
	@:optional var textures:Array<Int>;
	@:optional var vars:StringMap<Array<Dynamic>>;
}
*/