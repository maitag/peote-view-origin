package de.peote.view.element;
import de.peote.view.element.ElementParam;
import de.peote.view.program.ProgramCache;
import de.peote.view.texture.ImageCache;

/**
 * @author Sylvio Sell
 */
@:keep
interface I_Element
{
	public var act_program:ActiveProgram;
	public var buf_pos:Int;

	public function del(bufferElement:I_ElementBuffer, imageCache:ImageCache):Void;
	public function set(bufferElement:I_ElementBuffer, param:ElementParam, imageCache:ImageCache, programCache:ProgramCache):Void;
	public function get():ElementParam;

	public function bufferUpdate(a:ActiveProgram, b:Int):Void;
}