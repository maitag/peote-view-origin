package peote.view.element;

/**
 * @author Sylvio Sell
 */

import haxe.ds.Vector;
import lime.graphics.opengl.GLBuffer;

@:keep
interface I_ElementBuffer
{
	public var attr:Vector<Int>;
	public var glBuff:GLBuffer;
	
	public function getDefaultFragmentShaderSrc():String;
	public function getDefaultVertexShaderSrc():String;
	
	public function disableVertexAttributes():Void;
	public function setVertexAttributes():Void;
	
	//public function setTexCoord( e:I_Element, param:Param):Void;
	public function set( e:I_Element, param:ElementParam ):Void;
	public function del( e:I_Element ):Void;
	public function delete():Void;
}