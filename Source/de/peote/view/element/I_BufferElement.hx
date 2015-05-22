package de.peote.view.element;

/**
 * @author Sylvio Sell
 */

import lime.graphics.opengl.GLBuffer;

interface I_BufferElement
{
	public var glBuff:GLBuffer;
	
	public function disableVertexAttributes():Void;
	public function setVertexAttributes():Void;
	
	//public function setTexCoord( e:I_Element, param:Param):Void;
	public function set( e:I_Element, param:Param ):Void;
	public function del( e:I_Element ):Void;
	public function delete():Void;
}