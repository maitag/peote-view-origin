/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o        o    o-o   
 *     o      o     \|/    o      o  
 *    o      o-o  ~ <o> ~   o    o-o 
 * 
 * PEOTE VIEW - haxe 2D OpenGL Render Library
 * Copyright (c) 2014 Sylvio Sell, http://maitag.de
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package de.peote.view;

import lime.Assets;
import haxe.ds.Vector;

class ProgramCache
{
	public var program:Vector<Program>;
	public var defaultProgram:Program;
	
	public inline function new(max_programs:Int, defaultFragmentShaderSrc:String, defaultVertexShaderSrc:String)
	{
		program = new Vector<Program>(max_programs);
		defaultProgram = new Program();
		defaultProgram.compile(defaultFragmentShaderSrc, defaultVertexShaderSrc, onerror);
	}
	
	public static inline function onerror(msg:String):Void { trace(msg); }
	
	public inline function get(nr:Int):Program
	{	return(program.get(nr));
		// TODO
		/*
		var p:Program = program.get(nr);
		if (p == null)
		{
			p = new Program(defaultProgram);
			program.set(nr, p );
		}
		return(p);*/
	}
		
	public inline function loadShaderSrc(nr:Int, fragmentShaderUrl:String, vertexShaderUrl:String):Void
	{
		//var fragmentShaderSrc:String = (fragmentShaderUrl == '') ? Shader.default_fragmentShaderSrc : Assets.getText(fragmentShaderUrl);
		//var vertexShaderSrc:String = (vertexShaderUrl == '') ? Shader.default_vertexShaderSrc : Assets.getText(vertexShaderUrl);
		//var fragmentShaderSrc:String = (fragmentShaderUrl == '') ? Shader.default_fragmentShaderSrc :  Http.requestUrl(fragmentShaderUrl);
		//var vertexShaderSrc:String = (vertexShaderUrl == '') ? Shader.default_vertexShaderSrc : Http.requestUrl(vertexShaderUrl);

		// TODO: doesnt work yet with assets.gettext on html5 target (with http.requestUrl sandbox prbl. for easy testing)
		var fragmentShaderSrc:String = Shader.default_fragmentShaderSrc;
		if (fragmentShaderUrl != '') 
		{
			#if js
			var req = js.Browser.createXMLHttpRequest();
			req.open('GET', fragmentShaderUrl, false);
			req.send();
			fragmentShaderSrc = req.responseText;
			#else
			//fragmentShaderSrc = Assets.getText(fragmentShaderUrl);
			fragmentShaderSrc = Assets.getBytes(fragmentShaderUrl).asString(); // TODO: getText dont work with windows-target
			#end
		}
		var vertexShaderSrc:String = Shader.default_vertexShaderSrc;
		if (vertexShaderUrl != '') 
		{
			#if js
			var req = js.Browser.createXMLHttpRequest();
			req.open('GET', vertexShaderUrl, false);
			req.send();
			vertexShaderSrc = req.responseText;
			#else
			//vertexShaderSrc = Assets.getText(vertexShaderUrl);
			vertexShaderSrc = Assets.getBytes(vertexShaderUrl).asString(); // TODO: getText dont work with windows-target;
			#end
		}
		
		setShaderSrc( nr, fragmentShaderSrc, vertexShaderSrc);
	}

	public inline function setShaderSrc(nr:Int, fragmentShaderSrc:String, vertexShaderSrc:String):Void
	{
		//trace("fragmentShaderSrc="+fragmentShaderSrc);
		if (program.get(nr) == null) program.set(nr, new Program(defaultProgram) );
		program.get(nr).compile(fragmentShaderSrc, vertexShaderSrc, onerror);
	}

	
}