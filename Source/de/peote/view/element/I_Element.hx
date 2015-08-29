package de.peote.view.element;
import de.peote.view.Param;
import de.peote.view.texture.TextureCache;

/**
 * @author Sylvio Sell
 */

interface I_Element
{
	public var act_program:ActiveProgram;
	public var buf_pos:Int;

	public function del(bufferElement:I_ElementBuffer, texturecache:TextureCache):Void;
	public function set(bufferElement:I_ElementBuffer, param:Param, texturecache:TextureCache):Void;
	public function get():Param;

	public function bufferUpdate(a:ActiveProgram, b:Int):Void;
}