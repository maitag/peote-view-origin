/*
 *        o-o    o-o  o-o-o  o-o     
 *       o   o  o        o      o    
 *      o-o-o  o-o   o    o    o-o   
 *     o      o     (_)    o      o  
 *    o      o-o    / \     o    o-o 
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

(function ($hx_exports) { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = true;
ApplicationMain.main = function() {
	var _main_ = Type.createInstance(Main,[]);
	var _lime = new lime.Lime();
	var config = { host : _main_, fullscreen : false, resizable : true, borderless : false, antialiasing : 4, stencil_buffer : false, depth_buffer : false, vsync : true, fps : 60, width : 800, height : 600, orientation : "", title : "peote_view"};
	_lime.init(_main_,config);
};
var ExampleShader = $hx_exports.ExampleShader = function() { };
$hxClasses["ExampleShader"] = ExampleShader;
ExampleShader.__name__ = true;
var Example_01 = function(_main) {
	this.last_y = 0;
	var _g = this;
	this.main = _main;
	this.main.render = $bind(this,this.render);
	var w = 160;
	var h = 120;
	var s = 14;
	this.peoteView = new de.peote.view.PeoteView(w * h + 1,2);
	this.peoteView.displaylist.setShaderSrc(0,"" + "precision mediump float;" + "\t// ###############################################################################\r\n\t\t// #    Author:   Sylvio Sell - maitag - Rostock 2013                            #\r\n\t\t// #    Homepage: http://maitag.de                                               #\r\n\t\t// #    License: GNU General Public License (GPL), Version 2.0                   #\r\n\t\t// #                                                                             #\r\n\t\t// #    more images about that lyapunov fractalcode at:                          #\r\n\t\t// #    http://maitag.de/~semmi/                                                 #\r\n\t\t// #                          (have fun!;)                                       #\r\n\t\t// ###############################################################################\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\tuniform sampler2D uImage;\r\n\t\t\r\n\t\t//uniform float time;\r\n\t\tuniform vec2 uMouse, uResolution;\r\n\t\t\r\n\t\tvoid main( void ) {\r\n\t\t\r\n\t\t\t// x y pos\r\n\t\t\t//vec2 position =( gl_FragCoord.xy / uResolution.xy *(1.1 + sin(time)) );\r\n\t\t\t//float a = position.x;\r\n\t\t\t//float b = position.y;\r\n\t\t\t//float a = gl_FragCoord.x / uResolution.x;\r\n\t\t\t//float b = gl_FragCoord.y / uResolution.y;\r\n\t\t\tfloat a = vTexCoord.x*2.0; // uResolution.x;\r\n\t\t\tfloat b = vTexCoord.y*2.0; // uResolution.y;\r\n\t\t\t\r\n\t\t\t// PArameter\r\n\t\t\tfloat p1 = 1.7+(uMouse.x / 3.0);\r\n\t\t\tfloat p2 = 1.7+(uMouse.y / 3.0);\r\n\t\t\t//float p1 = 2.4;\r\n\t\t\t//float p2 = 1.7+sin(time);\r\n\t\t\t\r\n\t\t\tfloat index = 0.0;\r\n\t\t\t\r\n\t\t\t//var xx:Float = 1; // STARTWERT\r\n\t\t\tfloat xx = 1.0;\r\n\t\t\t\r\n\t\t\t// pre-iteration ##########################\r\n\t\t\t\r\n\t\t\tfor (int i = 0; i < 2; i++) {\r\n\t\t\t\txx = p1 * sin(xx + a) * sin(xx + a) + p2;\r\n\t\t\t\txx = p1 * sin(xx + b) * sin(xx + b) + p2;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t// main-iteration ########################\r\n\t\t\t\r\n\t\t\tfor (int i = 0; i < 5; i++) {\r\n\t\t\t\txx = p1 * sin(xx + a) * sin(xx + a) + p2;\r\n\t\t\t\tindex = index + log(abs(2.0 * p1 * sin(xx + a) * cos(xx + a)));\r\n\t\t\t\t\r\n\t\t\t\txx = p1 * sin(xx + b) * sin(xx + b) + p2;\r\n\t\t\t\tindex = index + log(abs(2.0 * p1 * sin(xx + b) * cos(xx + b)));\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tindex = index / 10.0;\r\n\t\t\t\r\n\t\t\tif (index > 0.0) {\r\n\t\t\t\tgl_FragColor = vec4(index*2.0, index*1.7, 0.05, 1.0);\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\tgl_FragColor = vec4((0.0-index)*0.65, (0.0-index)*0.53, (0.0-index)*0.1, 1.0);\r\n\t\t\t}\r\n\t\t}\r\n\t","\tprecision mediump float;\r\n\r\n\t\tattribute vec3 aVertexPosStart;\r\n\t\tattribute vec2 aTime;\r\n\t\tattribute vec3 aVertexPosEnd;\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\t//uniform mat4 uProjectionMatrix;\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) ), 1.0);\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0), 1.0);\r\n\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tfloat far = 100.0;\r\n\t\t\tfloat near = -100.0;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -2.0 / (far - near), 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) * zoom)/zoom, 1.0);\r\n\t\t}\r\n\t");
	this.peoteView.displaylist.setShaderSrc(1,"\tprecision mediump float;\r\n\t\tvarying vec2 vTexCoord;\r\n\t\tuniform sampler2D uImage;\r\n\t\t\r\n\t\tuniform vec2 uMouse, uResolution;\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\r\n\t\t\tgl_FragColor = texture2D (uImage, vTexCoord);\r\n\t\t}\r\n\t","\tprecision mediump float;\r\n\r\n\t\tattribute vec3 aVertexPosStart;\r\n\t\tattribute vec2 aTime;\r\n\t\tattribute vec3 aVertexPosEnd;\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\t//uniform mat4 uProjectionMatrix;\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) ), 1.0);\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0), 1.0);\r\n\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tfloat far = 100.0;\r\n\t\t\tfloat near = -100.0;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -2.0 / (far - near), 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) * zoom)/zoom, 1.0);\r\n\t\t}\r\n\t");
	this.peoteView.texturecache.setImage(0,"assets/peote_font_green.png");
	this.peoteView.texturecache.setImage(1,"assets/peote_tiles.png");
	var nr = 0;
	this.startTime = haxe.Timer.stamp();
	var t = haxe.Timer.stamp() - this.startTime;
	var switchBGanim = 1;
	this.last_y = h - 1;
	this.peoteView.setElement(nr,0,0,-1,3000,3000,0,null,null);
	this.peoteView.displaylist.animElement(nr,-1500,-1500,-1,11000,11000,t,t + h);
	var _g1 = 0;
	while(_g1 < w) {
		var x = _g1++;
		var _g11 = 0;
		while(_g11 < h) {
			var y = _g11++;
			nr = 1 + y * w + x;
			this.peoteView.setElement(nr,x * s,y * s - s,0,s,s,1,Math.floor(Math.random() * 2),Math.floor(Math.random() * 256));
			this.peoteView.displaylist.animElement(nr,x * s,y * s - s + h * s,0,s,s,t,t + h);
		}
	}
	var timer = new haxe.Timer(1000);
	timer.run = function() {
		var t1 = haxe.Timer.stamp() - _g.startTime;
		var nr1;
		var _g12 = 0;
		while(_g12 < w) {
			var x1 = _g12++;
			nr1 = 1 + _g.last_y * w + x1;
			_g.peoteView.displaylist.animElement(nr1,x1 * s,-s,0,s,s,0,0);
			_g.peoteView.displaylist.animElement(nr1,x1 * s,-s + h * s,0,s,s,t1,t1 + h);
		}
		if(_g.last_y == 0) {
			_g.last_y = h - 1;
			if(switchBGanim == 1) _g.peoteView.displaylist.animElement(0,0,0,-1,3000,3000,t1,t1 + h); else _g.peoteView.displaylist.animElement(0,-1500,-1500,-1,11000,11000,t1,t1 + h);
			switchBGanim = -switchBGanim;
		} else _g.last_y--;
	};
};
$hxClasses["Example_01"] = Example_01;
Example_01.__name__ = true;
Example_01.prototype = {
	render: function() {
		this.peoteView.render(haxe.Timer.stamp() - this.startTime,this.main.width,this.main.height,this.main.mouse_x,this.main.mouse_y,this.main.zoom);
	}
	,random: function(n) {
		return Math.floor(Math.random() * n);
	}
	,__class__: Example_01
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var Main = function() {
	this.zoom = 1;
	this.mouse_y = 0;
	this.mouse_x = 0;
};
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.prototype = {
	ready: function(lime) {
		this.lime = lime;
		window.document.getElementById("lime_canvas").style.marginTop = "0px";
		this.js_onresize(null);
		window.addEventListener("resize",$bind(this,this.js_onresize));
		window.addEventListener("mousemove",$bind(this,this.js_onmousemove));
		window.addEventListener("touchmove",$bind(this,this.js_ontouchmove));
		window.addEventListener("mousewheel",$bind(this,this.js_onmousewheel));
		window.addEventListener("DOMMouseScroll",$bind(this,this.js_onmousewheel));
		new Example_01(this);
	}
	,js_onmousemove: function(e) {
		this.mouse_x = Std["int"](e.clientX);
		this.mouse_y = Std["int"](e.clientY);
	}
	,js_ontouchmove: function(e) {
		this.mouse_x = e.changedTouches[0].clientX | 0;
		this.mouse_y = e.changedTouches[0].clientY | 0;
		e.preventDefault();
	}
	,js_onresize: function(e) {
		if(window.document.getElementById("lime_canvas") != null) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			eval("document.getElementById('lime_canvas').style.width='" + this.width + "px';" + "document.getElementById('lime_canvas').style.height='" + this.height + "px';" + "document.getElementById('lime_canvas').setAttribute('width', '" + this.width + "');" + "document.getElementById('lime_canvas').setAttribute('height', '" + this.height + "');");
		}
	}
	,js_onmousewheel: function(e) {
		var delta = Math.max(-1,Math.min(1,Std["int"](e.wheelDelta) + -Std["int"](e.detail)));
		if(delta > 0) this.zoom++; else if(this.zoom > 1) this.zoom--;
	}
	,__class__: Main
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = true;
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
var de = {};
de.peote = {};
de.peote.view = {};
de.peote.view.ActiveProgram = function(program,segment_size,buf_start) {
	this.size = -2;
	this.program = program;
	this.buf_start = buf_start * segment_size;
	this.element_holes = new de.peote.view.Holes(segment_size);
};
$hxClasses["de.peote.view.ActiveProgram"] = de.peote.view.ActiveProgram;
de.peote.view.ActiveProgram.__name__ = true;
de.peote.view.ActiveProgram.prototype = {
	__class__: de.peote.view.ActiveProgram
};
de.peote.view.Buffer = function(segment_size,max_segments) {
	this.segment_size = segment_size;
	this.activeProgram = new Array();
	this.buffer = lime.gl.html5.GL.createBuffer();
	lime.gl.html5.GL.bindBuffer(34962,this.buffer);
	lime.gl.html5.GL.bufferData(34962,new Float32Array(max_segments * segment_size * de.peote.view.Buffer.VERTEX_COUNT * de.peote.view.Buffer.STRAW),35044);
	lime.gl.html5.GL.bindBuffer(34962,null);
	this.segment_holes = new de.peote.view.Holes(max_segments);
};
$hxClasses["de.peote.view.Buffer"] = de.peote.view.Buffer;
de.peote.view.Buffer.__name__ = true;
de.peote.view.Buffer.prototype = {
	delElement: function(e) {
		lime.gl.html5.GL.bindBuffer(34962,this.buffer);
		lime.gl.html5.GL.bufferSubData(34962,e.buf_pos * 10 * 4,new Float32Array(60));
		lime.gl.html5.GL.bindBuffer(34962,null);
		e.act_program.element_holes.addHole(Math.floor((e.buf_pos - e.act_program.buf_start) / de.peote.view.Buffer.VERTEX_COUNT));
		e.act_program.start = e.act_program.buf_start + 1 + e.act_program.element_holes.first() * de.peote.view.Buffer.VERTEX_COUNT;
		e.act_program.size = (e.act_program.element_holes.last() + 1 - e.act_program.element_holes.first()) * de.peote.view.Buffer.VERTEX_COUNT - 2;
		if(e.act_program.element_holes.is_empty()) {
			this.segment_holes.addHole(Math.floor(e.act_program.buf_start / this.segment_size / de.peote.view.Buffer.VERTEX_COUNT));
			HxOverrides.remove(e.act_program.program.activeProgram,e.act_program);
			HxOverrides.remove(this.activeProgram,e.act_program);
		}
	}
	,addElement: function(program,x,y,z,w,h,tx,ty,tw,th,image_nr,slot) {
		if(slot == null) slot = 0;
		var buf_pos = 0;
		var act_program = null;
		if(slot == program.activeProgram.length) {
			act_program = new de.peote.view.ActiveProgram(program,this.segment_size,this.segment_holes.getHole() * de.peote.view.Buffer.VERTEX_COUNT);
			program.activeProgram.push(act_program);
			this.activeProgram.push(act_program);
		} else act_program = program.activeProgram[slot];
		if(act_program.element_holes.hole.length == 0) return this.addElement(program,x,y,z,w,h,tx,ty,tw,th,image_nr,slot + 1); else {
			buf_pos = act_program.buf_start + act_program.element_holes.getHole() * de.peote.view.Buffer.VERTEX_COUNT;
			act_program.start = act_program.buf_start + 1 + act_program.element_holes.first() * de.peote.view.Buffer.VERTEX_COUNT;
			act_program.size = (act_program.element_holes.last() + 1 - act_program.element_holes.first()) * de.peote.view.Buffer.VERTEX_COUNT - 2;
		}
		var xw = x + w;
		var yh = y + h;
		var txw = tx + tw;
		var tyh = ty + th;
		lime.gl.html5.GL.bindBuffer(34962,this.buffer);
		lime.gl.html5.GL.bufferSubData(34962,buf_pos * 10 * 4,new Float32Array([xw,yh,z,0,0,xw,yh,z,txw,tyh,xw,yh,z,0,0,xw,yh,z,txw,tyh,x,yh,z,0,0,x,yh,z,tx,tyh,xw,y,z,0,0,xw,y,z,txw,ty,x,y,z,0,0,x,y,z,tx,ty,x,y,z,0,0,x,y,z,tx,ty]));
		lime.gl.html5.GL.bindBuffer(34962,null);
		return new de.peote.view.Element(act_program,buf_pos,image_nr);
	}
	,animElement: function(e,x,y,z,w,h,t1,t2) {
		var buf_pos = e.buf_pos;
		var xw = x + w;
		var yh = y + h;
		lime.gl.html5.GL.bindBuffer(34962,this.buffer);
		if(e.anim_switch) {
			e.anim_switch = false;
			lime.gl.html5.GL.bufferSubData(34962,buf_pos * 10 * 4 + 12,new Float32Array([t1,t2,xw,yh,z]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 1) * 10 * 4 + 12,new Float32Array([t1,t2,xw,yh,z]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 2) * 10 * 4 + 12,new Float32Array([t1,t2,x,yh,z]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 3) * 10 * 4 + 12,new Float32Array([t1,t2,xw,y,z]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 4) * 10 * 4 + 12,new Float32Array([t1,t2,x,y,z]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 5) * 10 * 4 + 12,new Float32Array([t1,t2,x,y,z]));
		} else {
			e.anim_switch = true;
			lime.gl.html5.GL.bufferSubData(34962,buf_pos * 10 * 4,new Float32Array([xw,yh,z,t2,t1]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 1) * 10 * 4,new Float32Array([xw,yh,z,t2,t1]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 2) * 10 * 4,new Float32Array([x,yh,z,t2,t1]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 3) * 10 * 4,new Float32Array([xw,y,z,t2,t1]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 4) * 10 * 4,new Float32Array([x,y,z,t2,t1]));
			lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 5) * 10 * 4,new Float32Array([x,y,z,t2,t1]));
		}
		lime.gl.html5.GL.bindBuffer(34962,null);
	}
	,setElementTexCoord: function(e,tx,ty,tw,th,image_nr) {
		var buf_pos = e.buf_pos;
		var txw = tx + tw;
		var tyh = ty + th;
		e.image_nr = image_nr;
		lime.gl.html5.GL.bindBuffer(34962,this.buffer);
		lime.gl.html5.GL.bufferSubData(34962,buf_pos * 10 * 4 + 32,new Float32Array([txw,tyh]));
		lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 1) * 10 * 4 + 32,new Float32Array([txw,tyh]));
		lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 2) * 10 * 4 + 32,new Float32Array([tx,tyh]));
		lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 3) * 10 * 4 + 32,new Float32Array([txw,ty]));
		lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 4) * 10 * 4 + 32,new Float32Array([tx,ty]));
		lime.gl.html5.GL.bufferSubData(34962,(buf_pos + 5) * 10 * 4 + 32,new Float32Array([tx,ty]));
		lime.gl.html5.GL.bindBuffer(34962,null);
	}
	,createEmptyBuffer: function(size) {
		this.buffer = lime.gl.html5.GL.createBuffer();
		lime.gl.html5.GL.bindBuffer(34962,this.buffer);
		lime.gl.html5.GL.bufferData(34962,new Float32Array(size),35044);
		lime.gl.html5.GL.bindBuffer(34962,null);
	}
	,__class__: de.peote.view.Buffer
};
de.peote.view.Displaylist = function(max_elements,max_programs) {
	var this1;
	this1 = new Array(max_elements);
	this.element = this1;
	var this2;
	this2 = new Array(max_programs);
	this.programsCache = this2;
	this.defaultProgram = new de.peote.view.Program();
	this.defaultProgram.compile("\tprecision mediump float;\r\n\t\tvarying vec2 vTexCoord;\r\n\t\tuniform sampler2D uImage;\r\n\t\t\r\n\t\tuniform vec2 uMouse, uResolution;\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\r\n\t\t\tgl_FragColor = texture2D (uImage, vTexCoord);\r\n\t\t}\r\n\t","\tprecision mediump float;\r\n\r\n\t\tattribute vec3 aVertexPosStart;\r\n\t\tattribute vec2 aTime;\r\n\t\tattribute vec3 aVertexPosEnd;\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\t//uniform mat4 uProjectionMatrix;\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) ), 1.0);\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0), 1.0);\r\n\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tfloat far = 100.0;\r\n\t\t\tfloat near = -100.0;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -2.0 / (far - near), 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) * zoom)/zoom, 1.0);\r\n\t\t}\r\n\t",$bind(this,this.onerror));
	this.buffer = new de.peote.view.Buffer(1000,400);
};
$hxClasses["de.peote.view.Displaylist"] = de.peote.view.Displaylist;
de.peote.view.Displaylist.__name__ = true;
de.peote.view.Displaylist.prototype = {
	onerror: function(msg) {
		haxe.Log.trace(msg,{ fileName : "Displaylist.hx", lineNumber : 59, className : "de.peote.view.Displaylist", methodName : "onerror"});
	}
	,setShaderUrl: function(shader_nr,url) {
		var program = this.programsCache[shader_nr];
		if(program == null) {
			program = new de.peote.view.Program(this.defaultProgram);
			this.programsCache[shader_nr] = program;
		}
	}
	,setShaderSrc: function(shader_nr,fragmentShaderSrc,vertexShaderSrc) {
		if(this.programsCache[shader_nr] == null) {
			var val = new de.peote.view.Program();
			this.programsCache[shader_nr] = val;
		}
		this.programsCache[shader_nr].compile(fragmentShaderSrc,vertexShaderSrc,$bind(this,this.onerror));
	}
	,setElement: function(nr,x,y,z,w,h,shader_nr,tx,ty,tw,th,image_nr,tile_nr) {
		var tile_x = 0.0;
		var tile_y = 0.0;
		var tile_scaleX = 1.0;
		var tile_scaleY = 1.0;
		if(tile_nr > -1) {
			tile_x = tile_nr % 16;
			tile_y = Math.floor(tile_nr / 16);
			tile_scaleX = 0.0625;
			tile_scaleY = 0.0625;
		}
		var program = this.programsCache[shader_nr];
		if(program == null) {
			program = new de.peote.view.Program(this.defaultProgram);
			this.programsCache[shader_nr] = program;
		}
		var val = this.buffer.addElement(program,x,y,z,w,h,tx + tile_x * tw * tile_scaleX,ty + tile_y * th * tile_scaleY,tw * tile_scaleX,th * tile_scaleY,image_nr);
		this.element[nr] = val;
	}
	,delElement: function(e) {
		this.buffer.delElement(e);
	}
	,animElement: function(nr,x,y,z,w,h,t1,t2) {
		this.buffer.animElement(this.element[nr],x,y,z,w,h,t1,t2);
	}
	,setElementTexCoord: function(nr,tx,ty,tw,th,image_nr,tile_nr) {
		var tile_x = 0.0;
		var tile_y = 0.0;
		var tile_scaleX = 1.0;
		var tile_scaleY = 1.0;
		if(tile_nr > -1) {
			tile_x = tile_nr % 16;
			tile_y = Math.floor(tile_nr / 16);
			tile_scaleX = 0.0625;
			tile_scaleY = 0.0625;
		}
		this.buffer.setElementTexCoord(this.element[nr],tx + tile_x * tw * tile_scaleX,ty + tile_y * th * tile_scaleY,tw * tile_scaleX,th * tile_scaleY,image_nr);
	}
	,__class__: de.peote.view.Displaylist
};
de.peote.view.Element = function(a,b,i) {
	this.anim_switch = true;
	this.act_program = a;
	this.buf_pos = b;
	this.image_nr = i;
};
$hxClasses["de.peote.view.Element"] = de.peote.view.Element;
de.peote.view.Element.__name__ = true;
de.peote.view.Element.prototype = {
	__class__: de.peote.view.Element
};
de.peote.view.Holes = function(size) {
	this.size = size - 1;
	this.hole = new Array();
	this.hole.push(new de.peote.view.Hole(0));
	this.hole[0].end = this.size;
};
$hxClasses["de.peote.view.Holes"] = de.peote.view.Holes;
de.peote.view.Holes.__name__ = true;
de.peote.view.Holes.prototype = {
	addHole: function(pos) {
		var _g1 = 0;
		var _g = this.hole.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(pos + 1 == this.hole[i].start) {
				this.hole[i].start--;
				if(i > 0) {
					if(this.hole[i].start == this.hole[i - 1].end + 1) {
						this.hole[i].start = this.hole[i - 1].start;
						this.hole.splice(i - 1,1);
					}
				}
				return;
			} else if(pos == this.hole[i].end + 1) {
				this.hole[i].end++;
				if(i < this.hole.length - 1) {
					if(this.hole[i].end == this.hole[i + 1].start - 1) {
						this.hole[i + 1].start = this.hole[i].start;
						this.hole.splice(i,1);
					}
				}
				return;
			} else if(pos < this.hole[i].start) {
				var x = new de.peote.view.Hole(pos);
				this.hole.splice(i,0,x);
				return;
			}
		}
		this.hole.push(new de.peote.view.Hole(pos));
	}
	,getHole: function() {
		var mid = Math.floor(this.hole.length / 2);
		if(this.hole[mid].start == this.hole[mid].end) return this.hole.splice(mid,1)[0].start;
		return this.hole[mid].start++;
	}
	,first: function() {
		if(this.hole.length > 0) {
			if(this.hole[0].start == 0) return this.hole[0].end + 1; else return 0;
		} else return 0;
	}
	,last: function() {
		if(this.hole.length > 0) {
			if(this.hole[this.hole.length - 1].end == this.size) return this.hole[this.hole.length - 1].start - 1; else return this.size;
		} else return this.size;
	}
	,is_full: function() {
		return this.hole.length == 0;
	}
	,is_empty: function() {
		var it_is = false;
		if(this.hole.length == 1) {
			if(this.hole[0].start == 0 && this.hole[0].end == this.size) it_is = true;
		}
		return it_is;
	}
	,__class__: de.peote.view.Holes
};
de.peote.view.Hole = function(start) {
	this.start = start;
	this.end = start;
};
$hxClasses["de.peote.view.Hole"] = de.peote.view.Hole;
de.peote.view.Hole.__name__ = true;
de.peote.view.Hole.prototype = {
	__class__: de.peote.view.Hole
};
de.peote.view.Image = function(image_url) {
	this.used = 0;
	this.cache_nr = -2;
	this.url = image_url;
	this.element_nr = new Array();
	this.image_nr = new Array();
	this.tile_nr = new Array();
};
$hxClasses["de.peote.view.Image"] = de.peote.view.Image;
de.peote.view.Image.__name__ = true;
de.peote.view.Image.prototype = {
	load: function(onload,onerror) {
		var _g = this;
		var image;
		var _this = window.document;
		image = _this.createElement("img");
		image.onload = function(a) {
			try {
				var tmp_canvas;
				var _this1 = window.document;
				tmp_canvas = _this1.createElement("canvas");
				tmp_canvas.width = image.width;
				tmp_canvas.height = image.height;
				var tmp_context = tmp_canvas.getContext("2d");
				tmp_context.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
				tmp_context.drawImage(image,0,0,image.width,image.height);
				var image_bytes = tmp_context.getImageData(0,0,tmp_canvas.width,tmp_canvas.height);
				var imageData = new Uint8Array(image_bytes.data);
				tmp_canvas = null;
				tmp_context = null;
				image_bytes = null;
				onload(_g,image.width,image.height,imageData);
			} catch( e ) {
				onerror(e);
			}
		};
		image.src = this.url;
	}
	,__class__: de.peote.view.Image
};
de.peote.view.PeoteView = function(max_elements,max_programs) {
	if(max_programs == null) max_programs = 100;
	if(max_elements == null) max_elements = 100000;
	haxe.Log.trace("GL.MAX_TEXTURE_IMAGE_UNITS:" + Std.string(lime.gl.html5.GL.getParameter(34930)),{ fileName : "PeoteView.hx", lineNumber : 44, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe.Log.trace("GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS:" + Std.string(lime.gl.html5.GL.getParameter(35660)),{ fileName : "PeoteView.hx", lineNumber : 45, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe.Log.trace("GL.MAX_TEXTURE_SIZE:" + Std.string(lime.gl.html5.GL.getParameter(3379)),{ fileName : "PeoteView.hx", lineNumber : 46, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe.Log.trace("GL.MAX_VERTEX_ATTRIBS:" + Std.string(lime.gl.html5.GL.getParameter(34921)),{ fileName : "PeoteView.hx", lineNumber : 47, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe.Log.trace("GL.MAX_VERTEX_UNIFORM_VECTORS:" + Std.string(lime.gl.html5.GL.getParameter(36347)),{ fileName : "PeoteView.hx", lineNumber : 48, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe.Log.trace("GL.MAX_FRAGMENT_UNIFORM_VECTORS:" + Std.string(lime.gl.html5.GL.getParameter(36349)),{ fileName : "PeoteView.hx", lineNumber : 49, className : "de.peote.view.PeoteView", methodName : "new"});
	this.displaylist = new de.peote.view.Displaylist(max_elements,max_programs);
	this.texturecache = new de.peote.view.TextureCache(512,512,64,$bind(this,this.onLoadImage));
};
$hxClasses["de.peote.view.PeoteView"] = de.peote.view.PeoteView;
de.peote.view.PeoteView.__name__ = true;
de.peote.view.PeoteView.prototype = {
	setShader: function(shader_nr,shaderUrl) {
		this.displaylist.setShaderSrc(shader_nr,"","");
	}
	,setShaderSrc: function(shader_nr,fsSrc,vsSrc) {
		if(vsSrc == null) vsSrc = "\tprecision mediump float;\r\n\r\n\t\tattribute vec3 aVertexPosStart;\r\n\t\tattribute vec2 aTime;\r\n\t\tattribute vec3 aVertexPosEnd;\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\t//uniform mat4 uProjectionMatrix;\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) ), 1.0);\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0), 1.0);\r\n\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tfloat far = 100.0;\r\n\t\t\tfloat near = -100.0;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -2.0 / (far - near), 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) * zoom)/zoom, 1.0);\r\n\t\t}\r\n\t";
		if(fsSrc == null) fsSrc = "\tprecision mediump float;\r\n\t\tvarying vec2 vTexCoord;\r\n\t\tuniform sampler2D uImage;\r\n\t\t\r\n\t\tuniform vec2 uMouse, uResolution;\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\r\n\t\t\tgl_FragColor = texture2D (uImage, vTexCoord);\r\n\t\t}\r\n\t";
		this.displaylist.setShaderSrc(shader_nr,fsSrc,vsSrc);
	}
	,setImage: function(image_nr,imageUrl) {
		this.texturecache.setImage(image_nr,imageUrl);
	}
	,setTilesheet: function(tilesheet_nr,image_nr,textCoordArray) {
	}
	,setElement: function(nr,x,y,z,w,h,shader_nr,image_nr,tile_nr) {
		if(tile_nr == null) tile_nr = -1;
		if(image_nr == null) image_nr = -1;
		if(image_nr > -1) {
			var img = this.texturecache.image[image_nr];
			if(img.cache_nr >= 0) this.displaylist.setElement(nr,x,y,z,w,h,shader_nr,img.tx,img.ty,img.tw,img.th,image_nr,tile_nr); else {
				this.displaylist.setElement(nr,x,y,z,w,h,shader_nr,0,0,0,0,image_nr,tile_nr);
				this.texturecache.loadImage(nr,image_nr,tile_nr);
			}
		} else this.displaylist.setElement(nr,x,y,z,w,h,shader_nr,0.0,0.0,1.0,1.0,image_nr,tile_nr);
	}
	,onLoadImage: function(nr,image_nr,tile_nr,img) {
		this.displaylist.setElementTexCoord(nr,img.tx,img.ty,img.tw,img.th,image_nr,tile_nr);
	}
	,delElement: function(nr) {
		var e = this.displaylist.element[nr];
		this.texturecache.delUnusedImage(e.image_nr);
		this.displaylist.buffer.delElement(e);
	}
	,animElement: function(nr,x,y,z,w,h,t1,t2) {
		this.displaylist.animElement(nr,x,y,z,w,h,t1,t2);
	}
	,render: function(time,width,height,mouse_x,mouse_y,zoom) {
		lime.gl.html5.GL.viewport(0,0,width,height);
		lime.gl.html5.GL.enable(2929);
		lime.gl.html5.GL.depthFunc(513);
		lime.gl.html5.GL.enable(3042);
		lime.gl.html5.GL.blendFunc(770,771);
		lime.gl.html5.GL.bindBuffer(34962,this.displaylist.buffer.buffer);
		lime.gl.html5.GL.enableVertexAttribArray(de.peote.view.Program.aVertexPosStart);
		lime.gl.html5.GL.enableVertexAttribArray(de.peote.view.Program.aVertexPosEnd);
		lime.gl.html5.GL.enableVertexAttribArray(de.peote.view.Program.aTime);
		lime.gl.html5.GL.enableVertexAttribArray(de.peote.view.Program.aTexCoord);
		lime.gl.html5.GL.vertexAttribPointer(de.peote.view.Program.aVertexPosStart,3,5126,false,40,0);
		lime.gl.html5.GL.vertexAttribPointer(de.peote.view.Program.aTime,2,5126,false,40,12);
		lime.gl.html5.GL.vertexAttribPointer(de.peote.view.Program.aVertexPosEnd,3,5126,false,40,20);
		lime.gl.html5.GL.vertexAttribPointer(de.peote.view.Program.aTexCoord,2,5126,false,40,32);
		lime.gl.html5.GL.activeTexture(33984);
		lime.gl.html5.GL.bindTexture(3553,this.texturecache.texture);
		lime.gl.html5.GL.clearColor(0.0,0.0,0.0,1.0);
		lime.gl.html5.GL.clear(16640);
		var _g1 = 0;
		var _g = this.displaylist.buffer.activeProgram.length;
		while(_g1 < _g) {
			var i = _g1++;
			de.peote.view.PeoteView.activeProgram = this.displaylist.buffer.activeProgram[i];
			lime.gl.html5.GL.useProgram(de.peote.view.PeoteView.activeProgram.program.glProgram);
			lime.gl.html5.GL.uniform1i(de.peote.view.PeoteView.activeProgram.program.uniforms[2],0);
			lime.gl.html5.GL.uniform2f(de.peote.view.PeoteView.activeProgram.program.uniforms[3],mouse_x / width * 2 - 1,mouse_y / height * 2 - 1);
			lime.gl.html5.GL.uniform2f(de.peote.view.PeoteView.activeProgram.program.uniforms[4],width,height);
			lime.gl.html5.GL.uniform1f(de.peote.view.PeoteView.activeProgram.program.uniforms[5],time);
			lime.gl.html5.GL.uniform1f(de.peote.view.PeoteView.activeProgram.program.uniforms[6],zoom);
			lime.gl.html5.GL.uniform2f(de.peote.view.PeoteView.activeProgram.program.uniforms[7],-mouse_x * (zoom - 1) / 4,-mouse_y * (zoom - 1) / 4);
			lime.gl.html5.GL.drawArrays(5,de.peote.view.PeoteView.activeProgram.start,de.peote.view.PeoteView.activeProgram.size);
		}
		lime.gl.html5.GL.disableVertexAttribArray(de.peote.view.Program.aVertexPosStart);
		lime.gl.html5.GL.disableVertexAttribArray(de.peote.view.Program.aVertexPosEnd);
		lime.gl.html5.GL.disableVertexAttribArray(de.peote.view.Program.aTime);
		lime.gl.html5.GL.disableVertexAttribArray(de.peote.view.Program.aTexCoord);
		lime.gl.html5.GL.bindBuffer(34962,null);
		lime.gl.html5.GL.bindTexture(3553,null);
		lime.gl.html5.GL.useProgram(null);
	}
	,__class__: de.peote.view.PeoteView
};
de.peote.view.Program = function(defaultProgram) {
	this.glProgram = null;
	this.fragment_shader_url = "";
	if(defaultProgram != null) {
		this.glProgram = defaultProgram.glProgram;
		this.uniforms = defaultProgram.uniforms;
	}
	this.activeProgram = new Array();
};
$hxClasses["de.peote.view.Program"] = de.peote.view.Program;
de.peote.view.Program.__name__ = true;
de.peote.view.Program.prototype = {
	compile: function(fragmentShaderSrc,vertexShaderSrc,onerror) {
		var fs = lime.gl.html5.GL.createShader(35632);
		lime.gl.html5.GL.shaderSource(fs,fragmentShaderSrc);
		lime.gl.html5.GL.compileShader(fs);
		var vs = lime.gl.html5.GL.createShader(35633);
		lime.gl.html5.GL.shaderSource(vs,vertexShaderSrc);
		lime.gl.html5.GL.compileShader(vs);
		if(lime.gl.html5.GL.getShaderParameter(fs,35713) == 0) onerror("ERROR fragmentShader: " + lime.gl.html5.GL.getShaderInfoLog(fs)); else if(lime.gl.html5.GL.getShaderParameter(vs,35713) == 0) onerror("ERROR vertexShader: " + lime.gl.html5.GL.getShaderInfoLog(vs)); else {
			this.glProgram = lime.gl.html5.GL.createProgram();
			lime.gl.html5.GL.attachShader(this.glProgram,vs);
			lime.gl.html5.GL.attachShader(this.glProgram,fs);
			lime.gl.html5.GL.deleteShader(vs);
			lime.gl.html5.GL.deleteShader(fs);
			lime.gl.html5.GL.linkProgram(this.glProgram);
			if(lime.gl.html5.GL.getProgramParameter(this.glProgram,35714) == 0) onerror(lime.gl.html5.GL.getProgramInfoLog(this.glProgram) + "VALIDATE_STATUS: " + lime.gl.html5.GL.getProgramParameter(this.glProgram,35715) + "ERROR: " + lime.gl.html5.GL.getError()); else {
				if(de.peote.view.Program.aVertexPosStart == -1) {
					de.peote.view.Program.aVertexPosStart = lime.gl.html5.GL.getAttribLocation(this.glProgram,"aVertexPosStart");
					de.peote.view.Program.aVertexPosEnd = lime.gl.html5.GL.getAttribLocation(this.glProgram,"aVertexPosEnd");
					de.peote.view.Program.aTime = lime.gl.html5.GL.getAttribLocation(this.glProgram,"aTime");
					de.peote.view.Program.aTexCoord = lime.gl.html5.GL.getAttribLocation(this.glProgram,"aTexCoord");
				}
				var length = lime.gl.html5.GL.getProgramParameter(this.glProgram,35718);
				var this1;
				this1 = new Array(length);
				this.uniforms = this1;
				var name;
				var _g1 = 0;
				var _g = lime.gl.html5.GL.getProgramParameter(this.glProgram,35718);
				while(_g1 < _g) {
					var i = _g1++;
					name = lime.gl.html5.GL.getActiveUniform(this.glProgram,i).name;
					switch(name) {
					case "uModelViewMatrix":
						var val = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[0] = val;
						break;
					case "uProjectionMatrix":
						var val1 = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[1] = val1;
						break;
					case "uImage":
						var val2 = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[2] = val2;
						break;
					case "uMouse":
						var val3 = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[3] = val3;
						break;
					case "uResolution":
						var val4 = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[4] = val4;
						break;
					case "uTime":
						var val5 = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[5] = val5;
						break;
					case "uZoom":
						var val6 = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[6] = val6;
						break;
					case "uDelta":
						var val7 = lime.gl.html5.GL.getUniformLocation(this.glProgram,name);
						this.uniforms[7] = val7;
						break;
					}
				}
			}
		}
	}
	,__class__: de.peote.view.Program
};
de.peote.view.Shader = function(url) {
	this.programs_nr = -1;
	this.programsCache_nr = -1;
	this.src = "";
	this.url = url;
};
$hxClasses["de.peote.view.Shader"] = de.peote.view.Shader;
de.peote.view.Shader.__name__ = true;
de.peote.view.Shader.prototype = {
	__class__: de.peote.view.Shader
};
de.peote.view.Texture = function() {
};
$hxClasses["de.peote.view.Texture"] = de.peote.view.Texture;
de.peote.view.Texture.__name__ = true;
de.peote.view.Texture.createEmptyTexture = function(width,height) {
	var texture = lime.gl.html5.GL.createTexture();
	lime.gl.html5.GL.bindTexture(3553,texture);
	lime.gl.html5.GL.texImage2D(3553,0,6408,width,height,0,6408,5121,null);
	lime.gl.html5.GL.texParameteri(3553,10240,9729);
	lime.gl.html5.GL.texParameteri(3553,10241,9729);
	lime.gl.html5.GL.bindTexture(3553,null);
	return texture;
};
de.peote.view.Texture.createSubTexture = function(t,x,y,w,h,data) {
	lime.gl.html5.GL.bindTexture(3553,t);
	lime.gl.html5.GL.texSubImage2D(3553,0,x,y,w,h,6408,5121,data);
	lime.gl.html5.GL.bindTexture(3553,null);
};
de.peote.view.Texture.prototype = {
	__class__: de.peote.view.Texture
};
de.peote.view.TextureCache = function(img_width,img_height,max_images,onLoad) {
	this.texture = null;
	this.onLoad_callback = onLoad;
	this.segment_width = img_width;
	this.segment_height = img_height;
	this.max_texture_size = 2048;
	var this1;
	this1 = new Array(max_images);
	this.image = this1;
	this.unused_images = new Array();
	this.max_h_segments = Math.floor(this.max_texture_size / this.segment_width);
	this.max_v_segments = Math.floor(this.max_texture_size / this.segment_height);
	this.segment_holes = new de.peote.view.Holes(max_images);
	this.texture = de.peote.view.Texture.createEmptyTexture(this.max_h_segments * this.segment_width,this.max_v_segments * this.segment_height);
};
$hxClasses["de.peote.view.TextureCache"] = de.peote.view.TextureCache;
de.peote.view.TextureCache.__name__ = true;
de.peote.view.TextureCache.prototype = {
	onerror: function(msg) {
		haxe.Log.trace(msg,{ fileName : "TextureCache.hx", lineNumber : 77, className : "de.peote.view.TextureCache", methodName : "onerror"});
	}
	,setImage: function(image_nr,imageUrl) {
		var val = new de.peote.view.Image(imageUrl);
		this.image[image_nr] = val;
	}
	,getImage: function(image_nr) {
		return this.image[image_nr];
	}
	,loadImage: function(element_nr,image_nr,tile_nr) {
		var img = this.image[image_nr];
		img.element_nr.push(element_nr);
		img.image_nr.push(image_nr);
		img.tile_nr.push(tile_nr);
		if(img.cache_nr == -2) {
			img.cache_nr = -1;
			img.load($bind(this,this.onImageLoad),$bind(this,this.onerror));
		}
	}
	,onImageLoad: function(img,w,h,data) {
		if(this.segment_holes.hole.length == 0) haxe.Log.trace("TextureCache is FULL",{ fileName : "TextureCache.hx", lineNumber : 108, className : "de.peote.view.TextureCache", methodName : "onImageLoad"});
		var holePos = this.segment_holes.getHole();
		img.tx = holePos % this.max_h_segments / this.max_h_segments;
		img.ty = Math.floor(holePos / this.max_h_segments) / this.max_v_segments;
		img.tw = w / (this.max_h_segments * this.segment_width);
		img.th = h / (this.max_v_segments * this.segment_height);
		de.peote.view.Texture.createSubTexture(this.texture,holePos % this.max_h_segments * this.segment_width,Math.floor(holePos / this.max_h_segments) * this.segment_height,w,h,data);
		while(img.element_nr.length > 0) this.onLoad_callback(img.element_nr.pop(),img.image_nr.pop(),img.tile_nr.pop(),img);
		img.cache_nr = holePos;
	}
	,delUnusedImage: function(image_nr) {
		var img = this.image[image_nr];
		if(img.used-- == 1) {
			if(this.segment_holes.hole.length == 0) {
				this.segment_holes.addHole(img.cache_nr);
				img.cache_nr = -2;
			}
		}
	}
	,__class__: de.peote.view.TextureCache
};
var format = {};
format.png = {};
format.png.Color = $hxClasses["format.png.Color"] = { __ename__ : true, __constructs__ : ["ColGrey","ColTrue","ColIndexed"] };
format.png.Color.ColGrey = function(alpha) { var $x = ["ColGrey",0,alpha]; $x.__enum__ = format.png.Color; $x.toString = $estr; return $x; };
format.png.Color.ColTrue = function(alpha) { var $x = ["ColTrue",1,alpha]; $x.__enum__ = format.png.Color; $x.toString = $estr; return $x; };
format.png.Color.ColIndexed = ["ColIndexed",2];
format.png.Color.ColIndexed.toString = $estr;
format.png.Color.ColIndexed.__enum__ = format.png.Color;
format.png.Chunk = $hxClasses["format.png.Chunk"] = { __ename__ : true, __constructs__ : ["CEnd","CHeader","CData","CPalette","CUnknown"] };
format.png.Chunk.CEnd = ["CEnd",0];
format.png.Chunk.CEnd.toString = $estr;
format.png.Chunk.CEnd.__enum__ = format.png.Chunk;
format.png.Chunk.CHeader = function(h) { var $x = ["CHeader",1,h]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Chunk.CData = function(b) { var $x = ["CData",2,b]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Chunk.CPalette = function(b) { var $x = ["CPalette",3,b]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Chunk.CUnknown = function(id,data) { var $x = ["CUnknown",4,id,data]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Reader = function(i) {
	this.i = i;
	i.set_bigEndian(true);
	this.checkCRC = true;
};
$hxClasses["format.png.Reader"] = format.png.Reader;
format.png.Reader.__name__ = true;
format.png.Reader.prototype = {
	read: function() {
		var _g = 0;
		var _g1 = [137,80,78,71,13,10,26,10];
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			if(this.i.readByte() != b) throw "Invalid header";
		}
		var l = new List();
		while(true) {
			var c = this.readChunk();
			l.add(c);
			if(c == format.png.Chunk.CEnd) break;
		}
		return l;
	}
	,readHeader: function(i) {
		i.set_bigEndian(true);
		var width = i.readInt32();
		var height = i.readInt32();
		var colbits = i.readByte();
		var color = i.readByte();
		var color1;
		switch(color) {
		case 0:
			color1 = format.png.Color.ColGrey(false);
			break;
		case 2:
			color1 = format.png.Color.ColTrue(false);
			break;
		case 3:
			color1 = format.png.Color.ColIndexed;
			break;
		case 4:
			color1 = format.png.Color.ColGrey(true);
			break;
		case 6:
			color1 = format.png.Color.ColTrue(true);
			break;
		default:
			throw "Unknown color model " + color + ":" + colbits;
		}
		var compress = i.readByte();
		var filter = i.readByte();
		if(compress != 0 || filter != 0) throw "Invalid header";
		var interlace = i.readByte();
		if(interlace != 0 && interlace != 1) throw "Invalid header";
		return { width : width, height : height, colbits : colbits, color : color1, interlaced : interlace == 1};
	}
	,readChunk: function() {
		var dataLen = this.i.readInt32();
		var id = this.i.readString(4);
		var data = this.i.read(dataLen);
		var crc = this.i.readInt32();
		if(this.checkCRC) {
			var c = new haxe.crypto.Crc32();
			var _g = 0;
			while(_g < 4) {
				var i = _g++;
				c["byte"](HxOverrides.cca(id,i));
			}
			c.update(data,0,data.length);
			if(c.get() != crc) throw "CRC check failure";
		}
		switch(id) {
		case "IEND":
			return format.png.Chunk.CEnd;
		case "IHDR":
			return format.png.Chunk.CHeader(this.readHeader(new haxe.io.BytesInput(data)));
		case "IDAT":
			return format.png.Chunk.CData(data);
		case "PLTE":
			return format.png.Chunk.CPalette(data);
		default:
			return format.png.Chunk.CUnknown(id,data);
		}
	}
	,__class__: format.png.Reader
};
format.png.Tools = function() { };
$hxClasses["format.png.Tools"] = format.png.Tools;
format.png.Tools.__name__ = true;
format.png.Tools.getHeader = function(d) {
	var $it0 = d.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c[1]) {
		case 1:
			var h = c[2];
			return h;
		default:
		}
	}
	throw "Header not found";
};
format.png.Tools.getPalette = function(d) {
	var $it0 = d.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c[1]) {
		case 3:
			var b = c[2];
			return b;
		default:
		}
	}
	return null;
};
format.png.Tools.filter = function(data,x,y,stride,prev,p,numChannels) {
	if(numChannels == null) numChannels = 4;
	var b;
	if(y == 0) b = 0; else b = data.b[p - stride];
	var c;
	if(x == 0 || y == 0) c = 0; else c = data.b[p - stride - numChannels];
	var k = prev + b - c;
	var pa = k - prev;
	if(pa < 0) pa = -pa;
	var pb = k - b;
	if(pb < 0) pb = -pb;
	var pc = k - c;
	if(pc < 0) pc = -pc;
	if(pa <= pb && pa <= pc) return prev; else if(pb <= pc) return b; else return c;
};
format.png.Tools.reverseBytes = function(b) {
	var p = 0;
	var _g1 = 0;
	var _g = b.length >> 2;
	while(_g1 < _g) {
		var i = _g1++;
		var b1 = b.b[p];
		var g = b.b[p + 1];
		var r = b.b[p + 2];
		var a = b.b[p + 3];
		var p1 = p++;
		b.b[p1] = a & 255;
		var p2 = p++;
		b.b[p2] = r & 255;
		var p3 = p++;
		b.b[p3] = g & 255;
		var p4 = p++;
		b.b[p4] = b1 & 255;
	}
};
format.png.Tools.extractGrey = function(d) {
	var h = format.png.Tools.getHeader(d);
	var grey = haxe.io.Bytes.alloc(h.width * h.height);
	var data = null;
	var fullData = null;
	var $it0 = d.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c[1]) {
		case 2:
			var b = c[2];
			if(fullData != null) fullData.add(b); else if(data == null) data = b; else {
				fullData = new haxe.io.BytesBuffer();
				fullData.add(data);
				fullData.add(b);
				data = null;
			}
			break;
		default:
		}
	}
	if(fullData != null) data = fullData.getBytes();
	if(data == null) throw "Data not found";
	data = format.tools.Inflate.run(data);
	var r = 0;
	var w = 0;
	{
		var _g = h.color;
		switch(_g[1]) {
		case 0:
			var alpha = _g[2];
			if(h.colbits != 8) throw "Unsupported color mode";
			var width = h.width;
			var stride;
			stride = (alpha?2:1) * width + 1;
			if(data.length < h.height * stride) throw "Not enough data";
			var rinc;
			if(alpha) rinc = 2; else rinc = 1;
			var _g2 = 0;
			var _g1 = h.height;
			while(_g2 < _g1) {
				var y = _g2++;
				var f = data.get(r++);
				switch(f) {
				case 0:
					var _g3 = 0;
					while(_g3 < width) {
						var x = _g3++;
						var v = data.b[r];
						r += rinc;
						grey.set(w++,v);
					}
					break;
				case 1:
					var cv = 0;
					var _g31 = 0;
					while(_g31 < width) {
						var x1 = _g31++;
						cv += data.b[r];
						r += rinc;
						grey.set(w++,cv);
					}
					break;
				case 2:
					var stride1;
					if(y == 0) stride1 = 0; else stride1 = width;
					var _g32 = 0;
					while(_g32 < width) {
						var x2 = _g32++;
						var v1 = data.b[r] + grey.b[w - stride1];
						r += rinc;
						grey.set(w++,v1);
					}
					break;
				case 3:
					var cv1 = 0;
					var stride2;
					if(y == 0) stride2 = 0; else stride2 = width;
					var _g33 = 0;
					while(_g33 < width) {
						var x3 = _g33++;
						cv1 = data.b[r] + (cv1 + grey.b[w - stride2] >> 1) & 255;
						r += rinc;
						grey.set(w++,cv1);
					}
					break;
				case 4:
					var stride3 = width;
					var cv2 = 0;
					var _g34 = 0;
					while(_g34 < width) {
						var x4 = _g34++;
						cv2 = format.png.Tools.filter(grey,x4,y,stride3,cv2,w,1) + data.b[r] & 255;
						r += rinc;
						grey.set(w++,cv2);
					}
					break;
				default:
					throw "Invalid filter " + f;
				}
			}
			break;
		default:
			throw "Unsupported color mode";
		}
	}
	return grey;
};
format.png.Tools.extract32 = function(d,bytes) {
	var h = format.png.Tools.getHeader(d);
	var bgra;
	if(bytes == null) bgra = haxe.io.Bytes.alloc(h.width * h.height * 4); else bgra = bytes;
	var data = null;
	var fullData = null;
	var $it0 = d.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c[1]) {
		case 2:
			var b = c[2];
			if(fullData != null) fullData.add(b); else if(data == null) data = b; else {
				fullData = new haxe.io.BytesBuffer();
				fullData.add(data);
				fullData.add(b);
				data = null;
			}
			break;
		default:
		}
	}
	if(fullData != null) data = fullData.getBytes();
	if(data == null) throw "Data not found";
	data = format.tools.Inflate.run(data);
	var r = 0;
	var w = 0;
	{
		var _g = h.color;
		switch(_g[1]) {
		case 2:
			var pal = format.png.Tools.getPalette(d);
			if(pal == null) throw "PNG Palette is missing";
			var alpha = null;
			try {
				var $it1 = d.iterator();
				while( $it1.hasNext() ) {
					var t = $it1.next();
					switch(t[1]) {
					case 4:
						switch(t[2]) {
						case "tRNS":
							var data1 = t[3];
							alpha = data1;
							throw "__break__";
							break;
						default:
						}
						break;
					default:
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			if(alpha != null && alpha.length < 1 << h.colbits) {
				var alpha2 = haxe.io.Bytes.alloc(1 << h.colbits);
				alpha2.blit(0,alpha,0,alpha.length);
				alpha2.fill(alpha.length,alpha2.length - alpha.length,255);
				alpha = alpha2;
			}
			var width = h.width;
			var stride = Math.ceil(width * h.colbits / 8) + 1;
			if(data.length < h.height * stride) throw "Not enough data";
			var vr;
			var vg;
			var vb;
			var va = 255;
			if(h.colbits == 8) {
				var _g2 = 0;
				var _g1 = h.height;
				while(_g2 < _g1) {
					var y = _g2++;
					var f = data.get(r++);
					switch(f) {
					case 0:
						var _g11 = 0;
						while(_g11 < width) {
							var x = _g11++;
							var c1 = data.get(r++);
							vr = pal.b[c1 * 3];
							vg = pal.b[c1 * 3 + 1];
							vb = pal.b[c1 * 3 + 2];
							if(alpha != null) va = alpha.b[c1];
							bgra.set(w++,vb);
							bgra.set(w++,vg);
							bgra.set(w++,vr);
							bgra.set(w++,va);
						}
						break;
					case 1:
						var cr = 0;
						var cg = 0;
						var cb = 0;
						var ca = 0;
						var _g12 = 0;
						while(_g12 < width) {
							var x1 = _g12++;
							var c2 = data.get(r++);
							vr = pal.b[c2 * 3];
							vg = pal.b[c2 * 3 + 1];
							vb = pal.b[c2 * 3 + 2];
							if(alpha != null) va = alpha.b[c2];
							cb += vb;
							bgra.set(w++,cb);
							cg += vg;
							bgra.set(w++,cg);
							cr += vr;
							bgra.set(w++,cr);
							ca += va;
							bgra.set(w++,ca);
							bgra.set(w++,va);
						}
						break;
					case 2:
						var stride1;
						if(y == 0) stride1 = 0; else stride1 = width * 4;
						var _g13 = 0;
						while(_g13 < width) {
							var x2 = _g13++;
							var c3 = data.get(r++);
							vr = pal.b[c3 * 3];
							vg = pal.b[c3 * 3 + 1];
							vb = pal.b[c3 * 3 + 2];
							if(alpha != null) va = alpha.b[c3];
							bgra.b[w] = vb + bgra.b[w - stride1] & 255;
							w++;
							bgra.b[w] = vg + bgra.b[w - stride1] & 255;
							w++;
							bgra.b[w] = vr + bgra.b[w - stride1] & 255;
							w++;
							bgra.b[w] = va + bgra.b[w - stride1] & 255;
							w++;
						}
						break;
					case 3:
						var cr1 = 0;
						var cg1 = 0;
						var cb1 = 0;
						var ca1 = 0;
						var stride2;
						if(y == 0) stride2 = 0; else stride2 = width * 4;
						var _g14 = 0;
						while(_g14 < width) {
							var x3 = _g14++;
							var c4 = data.get(r++);
							vr = pal.b[c4 * 3];
							vg = pal.b[c4 * 3 + 1];
							vb = pal.b[c4 * 3 + 2];
							if(alpha != null) va = alpha.b[c4];
							cb1 = vb + (cb1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,cb1);
							cg1 = vg + (cg1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,cg1);
							cr1 = vr + (cr1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,cr1);
							cr1 = va + (ca1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,ca1);
						}
						break;
					case 4:
						var stride3 = width * 4;
						var cr2 = 0;
						var cg2 = 0;
						var cb2 = 0;
						var ca2 = 0;
						var _g15 = 0;
						while(_g15 < width) {
							var x4 = _g15++;
							var c5 = data.get(r++);
							vr = pal.b[c5 * 3];
							vg = pal.b[c5 * 3 + 1];
							vb = pal.b[c5 * 3 + 2];
							if(alpha != null) va = alpha.b[c5];
							cb2 = format.png.Tools.filter(bgra,x4,y,stride3,cb2,w,null) + vb & 255;
							bgra.set(w++,cb2);
							cg2 = format.png.Tools.filter(bgra,x4,y,stride3,cg2,w,null) + vg & 255;
							bgra.set(w++,cg2);
							cr2 = format.png.Tools.filter(bgra,x4,y,stride3,cr2,w,null) + vr & 255;
							bgra.set(w++,cr2);
							ca2 = format.png.Tools.filter(bgra,x4,y,stride3,ca2,w,null) + va & 255;
							bgra.set(w++,ca2);
						}
						break;
					default:
						throw "Invalid filter " + f;
					}
				}
			} else if(h.colbits < 8) {
				var req = h.colbits;
				var mask = (1 << req) - 1;
				var _g21 = 0;
				var _g16 = h.height;
				while(_g21 < _g16) {
					var y1 = _g21++;
					var f1 = data.get(r++);
					var bits = 0;
					var nbits = 0;
					var v;
					switch(f1) {
					case 0:
						var _g17 = 0;
						while(_g17 < width) {
							var x5 = _g17++;
							var c6;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c6 = v;
							vr = pal.b[c6 * 3];
							vg = pal.b[c6 * 3 + 1];
							vb = pal.b[c6 * 3 + 2];
							if(alpha != null) va = alpha.b[c6];
							bgra.set(w++,vb);
							bgra.set(w++,vg);
							bgra.set(w++,vr);
							bgra.set(w++,va);
						}
						break;
					case 1:
						var cr3 = 0;
						var cg3 = 0;
						var cb3 = 0;
						var ca3 = 0;
						var _g18 = 0;
						while(_g18 < width) {
							var x6 = _g18++;
							var c7;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c7 = v;
							vr = pal.b[c7 * 3];
							vg = pal.b[c7 * 3 + 1];
							vb = pal.b[c7 * 3 + 2];
							if(alpha != null) va = alpha.b[c7];
							cb3 += vb;
							bgra.set(w++,cb3);
							cg3 += vg;
							bgra.set(w++,cg3);
							cr3 += vr;
							bgra.set(w++,cr3);
							ca3 += va;
							bgra.set(w++,ca3);
							bgra.set(w++,va);
						}
						break;
					case 2:
						var stride4;
						if(y1 == 0) stride4 = 0; else stride4 = width * 4;
						var _g19 = 0;
						while(_g19 < width) {
							var x7 = _g19++;
							var c8;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c8 = v;
							vr = pal.b[c8 * 3];
							vg = pal.b[c8 * 3 + 1];
							vb = pal.b[c8 * 3 + 2];
							if(alpha != null) va = alpha.b[c8];
							bgra.b[w] = vb + bgra.b[w - stride4] & 255;
							w++;
							bgra.b[w] = vg + bgra.b[w - stride4] & 255;
							w++;
							bgra.b[w] = vr + bgra.b[w - stride4] & 255;
							w++;
							bgra.b[w] = va + bgra.b[w - stride4] & 255;
							w++;
						}
						break;
					case 3:
						var cr4 = 0;
						var cg4 = 0;
						var cb4 = 0;
						var ca4 = 0;
						var stride5;
						if(y1 == 0) stride5 = 0; else stride5 = width * 4;
						var _g110 = 0;
						while(_g110 < width) {
							var x8 = _g110++;
							var c9;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c9 = v;
							vr = pal.b[c9 * 3];
							vg = pal.b[c9 * 3 + 1];
							vb = pal.b[c9 * 3 + 2];
							if(alpha != null) va = alpha.b[c9];
							cb4 = vb + (cb4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,cb4);
							cg4 = vg + (cg4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,cg4);
							cr4 = vr + (cr4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,cr4);
							cr4 = va + (ca4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,ca4);
						}
						break;
					case 4:
						var stride6 = width * 4;
						var cr5 = 0;
						var cg5 = 0;
						var cb5 = 0;
						var ca5 = 0;
						var _g111 = 0;
						while(_g111 < width) {
							var x9 = _g111++;
							var c10;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c10 = v;
							vr = pal.b[c10 * 3];
							vg = pal.b[c10 * 3 + 1];
							vb = pal.b[c10 * 3 + 2];
							if(alpha != null) va = alpha.b[c10];
							cb5 = format.png.Tools.filter(bgra,x9,y1,stride6,cb5,w,null) + vb & 255;
							bgra.set(w++,cb5);
							cg5 = format.png.Tools.filter(bgra,x9,y1,stride6,cg5,w,null) + vg & 255;
							bgra.set(w++,cg5);
							cr5 = format.png.Tools.filter(bgra,x9,y1,stride6,cr5,w,null) + vr & 255;
							bgra.set(w++,cr5);
							ca5 = format.png.Tools.filter(bgra,x9,y1,stride6,ca5,w,null) + va & 255;
							bgra.set(w++,ca5);
						}
						break;
					default:
						throw "Invalid filter " + f1;
					}
				}
			} else throw h.colbits + " indexed bits per pixel not supported";
			break;
		case 0:
			var alpha1 = _g[2];
			if(h.colbits != 8) throw "Unsupported color mode";
			var width1 = h.width;
			var stride7;
			stride7 = (alpha1?2:1) * width1 + 1;
			if(data.length < h.height * stride7) throw "Not enough data";
			var _g22 = 0;
			var _g112 = h.height;
			while(_g22 < _g112) {
				var y2 = _g22++;
				var f2 = data.get(r++);
				switch(f2) {
				case 0:
					if(alpha1) {
						var _g3 = 0;
						while(_g3 < width1) {
							var x10 = _g3++;
							var v1 = data.get(r++);
							bgra.set(w++,v1);
							bgra.set(w++,v1);
							bgra.set(w++,v1);
							bgra.set(w++,data.get(r++));
						}
					} else {
						var _g31 = 0;
						while(_g31 < width1) {
							var x11 = _g31++;
							var v2 = data.get(r++);
							bgra.set(w++,v2);
							bgra.set(w++,v2);
							bgra.set(w++,v2);
							bgra.set(w++,255);
						}
					}
					break;
				case 1:
					var cv = 0;
					var ca6 = 0;
					if(alpha1) {
						var _g32 = 0;
						while(_g32 < width1) {
							var x12 = _g32++;
							cv += data.get(r++);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							ca6 += data.get(r++);
							bgra.set(w++,ca6);
						}
					} else {
						var _g33 = 0;
						while(_g33 < width1) {
							var x13 = _g33++;
							cv += data.get(r++);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,255);
						}
					}
					break;
				case 2:
					var stride8;
					if(y2 == 0) stride8 = 0; else stride8 = width1 * 4;
					if(alpha1) {
						var _g34 = 0;
						while(_g34 < width1) {
							var x14 = _g34++;
							var v3 = data.get(r++) + bgra.b[w - stride8];
							bgra.set(w++,v3);
							bgra.set(w++,v3);
							bgra.set(w++,v3);
							bgra.set(w++,data.get(r++) + bgra.b[w - stride8]);
						}
					} else {
						var _g35 = 0;
						while(_g35 < width1) {
							var x15 = _g35++;
							var v4 = data.get(r++) + bgra.b[w - stride8];
							bgra.set(w++,v4);
							bgra.set(w++,v4);
							bgra.set(w++,v4);
							bgra.set(w++,255);
						}
					}
					break;
				case 3:
					var cv1 = 0;
					var ca7 = 0;
					var stride9;
					if(y2 == 0) stride9 = 0; else stride9 = width1 * 4;
					if(alpha1) {
						var _g36 = 0;
						while(_g36 < width1) {
							var x16 = _g36++;
							cv1 = data.get(r++) + (cv1 + bgra.b[w - stride9] >> 1) & 255;
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							ca7 = data.get(r++) + (ca7 + bgra.b[w - stride9] >> 1) & 255;
							bgra.set(w++,ca7);
						}
					} else {
						var _g37 = 0;
						while(_g37 < width1) {
							var x17 = _g37++;
							cv1 = data.get(r++) + (cv1 + bgra.b[w - stride9] >> 1) & 255;
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,255);
						}
					}
					break;
				case 4:
					var stride10 = width1 * 4;
					var cv2 = 0;
					var ca8 = 0;
					if(alpha1) {
						var _g38 = 0;
						while(_g38 < width1) {
							var x18 = _g38++;
							cv2 = format.png.Tools.filter(bgra,x18,y2,stride10,cv2,w,null) + data.get(r++) & 255;
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							ca8 = format.png.Tools.filter(bgra,x18,y2,stride10,ca8,w,null) + data.get(r++) & 255;
							bgra.set(w++,ca8);
						}
					} else {
						var _g39 = 0;
						while(_g39 < width1) {
							var x19 = _g39++;
							cv2 = format.png.Tools.filter(bgra,x19,y2,stride10,cv2,w,null) + data.get(r++) & 255;
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,255);
						}
					}
					break;
				default:
					throw "Invalid filter " + f2;
				}
			}
			break;
		case 1:
			var alpha3 = _g[2];
			if(h.colbits != 8) throw "Unsupported color mode";
			var width2 = h.width;
			var stride11;
			stride11 = (alpha3?4:3) * width2 + 1;
			if(data.length < h.height * stride11) throw "Not enough data";
			var _g23 = 0;
			var _g113 = h.height;
			while(_g23 < _g113) {
				var y3 = _g23++;
				var f3 = data.get(r++);
				switch(f3) {
				case 0:
					if(alpha3) {
						var _g310 = 0;
						while(_g310 < width2) {
							var x20 = _g310++;
							bgra.set(w++,data.b[r + 2]);
							bgra.set(w++,data.b[r + 1]);
							bgra.set(w++,data.b[r]);
							bgra.set(w++,data.b[r + 3]);
							r += 4;
						}
					} else {
						var _g311 = 0;
						while(_g311 < width2) {
							var x21 = _g311++;
							bgra.set(w++,data.b[r + 2]);
							bgra.set(w++,data.b[r + 1]);
							bgra.set(w++,data.b[r]);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 1:
					var cr6 = 0;
					var cg6 = 0;
					var cb6 = 0;
					var ca9 = 0;
					if(alpha3) {
						var _g312 = 0;
						while(_g312 < width2) {
							var x22 = _g312++;
							cb6 += data.b[r + 2];
							bgra.set(w++,cb6);
							cg6 += data.b[r + 1];
							bgra.set(w++,cg6);
							cr6 += data.b[r];
							bgra.set(w++,cr6);
							ca9 += data.b[r + 3];
							bgra.set(w++,ca9);
							r += 4;
						}
					} else {
						var _g313 = 0;
						while(_g313 < width2) {
							var x23 = _g313++;
							cb6 += data.b[r + 2];
							bgra.set(w++,cb6);
							cg6 += data.b[r + 1];
							bgra.set(w++,cg6);
							cr6 += data.b[r];
							bgra.set(w++,cr6);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 2:
					var stride12;
					if(y3 == 0) stride12 = 0; else stride12 = width2 * 4;
					if(alpha3) {
						var _g314 = 0;
						while(_g314 < width2) {
							var x24 = _g314++;
							bgra.b[w] = data.b[r + 2] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r + 1] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r + 3] + bgra.b[w - stride12] & 255;
							w++;
							r += 4;
						}
					} else {
						var _g315 = 0;
						while(_g315 < width2) {
							var x25 = _g315++;
							bgra.b[w] = data.b[r + 2] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r + 1] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r] + bgra.b[w - stride12] & 255;
							w++;
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 3:
					var cr7 = 0;
					var cg7 = 0;
					var cb7 = 0;
					var ca10 = 0;
					var stride13;
					if(y3 == 0) stride13 = 0; else stride13 = width2 * 4;
					if(alpha3) {
						var _g316 = 0;
						while(_g316 < width2) {
							var x26 = _g316++;
							cb7 = data.b[r + 2] + (cb7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cb7);
							cg7 = data.b[r + 1] + (cg7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cg7);
							cr7 = data.b[r] + (cr7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cr7);
							ca10 = data.b[r + 3] + (ca10 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,ca10);
							r += 4;
						}
					} else {
						var _g317 = 0;
						while(_g317 < width2) {
							var x27 = _g317++;
							cb7 = data.b[r + 2] + (cb7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cb7);
							cg7 = data.b[r + 1] + (cg7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cg7);
							cr7 = data.b[r] + (cr7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cr7);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 4:
					var stride14 = width2 * 4;
					var cr8 = 0;
					var cg8 = 0;
					var cb8 = 0;
					var ca11 = 0;
					if(alpha3) {
						var _g318 = 0;
						while(_g318 < width2) {
							var x28 = _g318++;
							cb8 = format.png.Tools.filter(bgra,x28,y3,stride14,cb8,w,null) + data.b[r + 2] & 255;
							bgra.set(w++,cb8);
							cg8 = format.png.Tools.filter(bgra,x28,y3,stride14,cg8,w,null) + data.b[r + 1] & 255;
							bgra.set(w++,cg8);
							cr8 = format.png.Tools.filter(bgra,x28,y3,stride14,cr8,w,null) + data.b[r] & 255;
							bgra.set(w++,cr8);
							ca11 = format.png.Tools.filter(bgra,x28,y3,stride14,ca11,w,null) + data.b[r + 3] & 255;
							bgra.set(w++,ca11);
							r += 4;
						}
					} else {
						var _g319 = 0;
						while(_g319 < width2) {
							var x29 = _g319++;
							cb8 = format.png.Tools.filter(bgra,x29,y3,stride14,cb8,w,null) + data.b[r + 2] & 255;
							bgra.set(w++,cb8);
							cg8 = format.png.Tools.filter(bgra,x29,y3,stride14,cg8,w,null) + data.b[r + 1] & 255;
							bgra.set(w++,cg8);
							cr8 = format.png.Tools.filter(bgra,x29,y3,stride14,cr8,w,null) + data.b[r] & 255;
							bgra.set(w++,cr8);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				default:
					throw "Invalid filter " + f3;
				}
			}
			break;
		}
	}
	return bgra;
};
format.png.Tools.buildGrey = function(width,height,data) {
	var rgb = haxe.io.Bytes.alloc(width * height + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgb.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgb.set(w++,data.get(r++));
		}
	}
	var l = new List();
	l.add(format.png.Chunk.CHeader({ width : width, height : height, colbits : 8, color : format.png.Color.ColGrey(false), interlaced : false}));
	l.add(format.png.Chunk.CData(format.tools.Deflate.run(rgb)));
	l.add(format.png.Chunk.CEnd);
	return l;
};
format.png.Tools.buildRGB = function(width,height,data) {
	var rgb = haxe.io.Bytes.alloc(width * height * 3 + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgb.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgb.set(w++,data.b[r + 2]);
			rgb.set(w++,data.b[r + 1]);
			rgb.set(w++,data.b[r]);
			r += 3;
		}
	}
	var l = new List();
	l.add(format.png.Chunk.CHeader({ width : width, height : height, colbits : 8, color : format.png.Color.ColTrue(false), interlaced : false}));
	l.add(format.png.Chunk.CData(format.tools.Deflate.run(rgb)));
	l.add(format.png.Chunk.CEnd);
	return l;
};
format.png.Tools.build32ARGB = function(width,height,data) {
	var rgba = haxe.io.Bytes.alloc(width * height * 4 + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgba.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgba.set(w++,data.b[r + 1]);
			rgba.set(w++,data.b[r + 2]);
			rgba.set(w++,data.b[r + 3]);
			rgba.set(w++,data.b[r]);
			r += 4;
		}
	}
	var l = new List();
	l.add(format.png.Chunk.CHeader({ width : width, height : height, colbits : 8, color : format.png.Color.ColTrue(true), interlaced : false}));
	l.add(format.png.Chunk.CData(format.tools.Deflate.run(rgba)));
	l.add(format.png.Chunk.CEnd);
	return l;
};
format.png.Tools.build32BGRA = function(width,height,data) {
	var rgba = haxe.io.Bytes.alloc(width * height * 4 + height);
	var w = 0;
	var r = 0;
	var _g = 0;
	while(_g < height) {
		var y = _g++;
		rgba.set(w++,0);
		var _g1 = 0;
		while(_g1 < width) {
			var x = _g1++;
			rgba.set(w++,data.b[r + 2]);
			rgba.set(w++,data.b[r + 1]);
			rgba.set(w++,data.b[r]);
			rgba.set(w++,data.b[r + 3]);
			r += 4;
		}
	}
	var l = new List();
	l.add(format.png.Chunk.CHeader({ width : width, height : height, colbits : 8, color : format.png.Color.ColTrue(true), interlaced : false}));
	l.add(format.png.Chunk.CData(format.tools.Deflate.run(rgba)));
	l.add(format.png.Chunk.CEnd);
	return l;
};
format.tools = {};
format.tools.Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["format.tools.Adler32"] = format.tools.Adler32;
format.tools.Adler32.__name__ = true;
format.tools.Adler32.read = function(i) {
	var a = new format.tools.Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
format.tools.Adler32.prototype = {
	update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,__class__: format.tools.Adler32
};
format.tools.Deflate = function() { };
$hxClasses["format.tools.Deflate"] = format.tools.Deflate;
format.tools.Deflate.__name__ = true;
format.tools.Deflate.run = function(b) {
	throw "Deflate is not supported on this platform";
	return null;
};
format.tools.Huffman = $hxClasses["format.tools.Huffman"] = { __ename__ : true, __constructs__ : ["Found","NeedBit","NeedBits"] };
format.tools.Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.HuffTools = function() {
};
$hxClasses["format.tools.HuffTools"] = format.tools.HuffTools;
format.tools.HuffTools.__name__ = true;
format.tools.HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t[1]) {
		case 0:
			return 0;
		case 2:
			throw "assert";
			break;
		case 1:
			var b = t[3];
			var a = t[2];
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db?da:db);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			return format.tools.Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
		default:
			throw "assert";
		}
		var size = 1 << d;
		var table = new Array();
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(format.tools.Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return format.tools.Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw "Invalid huffman";
		var idx = v << 5 | len;
		if(bits.exists(idx)) return format.tools.Huffman.Found(bits.get(idx));
		v <<= 1;
		len += 1;
		return format.tools.Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		var counts = new Array();
		var tmp = new Array();
		if(maxbits > 32) throw "Invalid huffman";
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g1 = 0;
		while(_g1 < nlengths) {
			var i1 = _g1++;
			var p = lengths[i1 + pos];
			if(p >= maxbits) throw "Invalid huffman";
			counts[p]++;
		}
		var code = 0;
		var _g11 = 1;
		var _g2 = maxbits - 1;
		while(_g11 < _g2) {
			var i2 = _g11++;
			code = code + counts[i2] << 1;
			tmp[i2] = code;
		}
		var bits = new haxe.ds.IntMap();
		var _g3 = 0;
		while(_g3 < nlengths) {
			var i3 = _g3++;
			var l = lengths[i3 + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.set(n << 5 | l,i3);
			}
		}
		return this.treeCompress(format.tools.Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: format.tools.HuffTools
};
format.tools.Inflate = function() { };
$hxClasses["format.tools.Inflate"] = format.tools.Inflate;
format.tools.Inflate.__name__ = true;
format.tools.Inflate.run = function(bytes) {
	return format.tools.InflateImpl.run(new haxe.io.BytesInput(bytes));
};
format.tools._InflateImpl = {};
format.tools._InflateImpl.Window = function(hasCrc) {
	this.buffer = haxe.io.Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new format.tools.Adler32();
};
$hxClasses["format.tools._InflateImpl.Window"] = format.tools._InflateImpl.Window;
format.tools._InflateImpl.Window.__name__ = true;
format.tools._InflateImpl.Window.prototype = {
	slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe.io.Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.b[this.pos] = c & 255;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,__class__: format.tools._InflateImpl.Window
};
format.tools._InflateImpl.State = $hxClasses["format.tools._InflateImpl.State"] = { __ename__ : true, __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] };
format.tools._InflateImpl.State.Head = ["Head",0];
format.tools._InflateImpl.State.Head.toString = $estr;
format.tools._InflateImpl.State.Head.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Block = ["Block",1];
format.tools._InflateImpl.State.Block.toString = $estr;
format.tools._InflateImpl.State.Block.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.CData = ["CData",2];
format.tools._InflateImpl.State.CData.toString = $estr;
format.tools._InflateImpl.State.CData.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Flat = ["Flat",3];
format.tools._InflateImpl.State.Flat.toString = $estr;
format.tools._InflateImpl.State.Flat.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Crc = ["Crc",4];
format.tools._InflateImpl.State.Crc.toString = $estr;
format.tools._InflateImpl.State.Crc.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Dist = ["Dist",5];
format.tools._InflateImpl.State.Dist.toString = $estr;
format.tools._InflateImpl.State.Dist.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.DistOne = ["DistOne",6];
format.tools._InflateImpl.State.DistOne.toString = $estr;
format.tools._InflateImpl.State.DistOne.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Done = ["Done",7];
format.tools._InflateImpl.State.Done.toString = $estr;
format.tools._InflateImpl.State.Done.__enum__ = format.tools._InflateImpl.State;
format.tools.InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new format.tools.HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	if(header) this.state = format.tools._InflateImpl.State.Head; else this.state = format.tools._InflateImpl.State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = new Array();
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new format.tools._InflateImpl.Window(crc);
};
$hxClasses["format.tools.InflateImpl"] = format.tools.InflateImpl;
format.tools.InflateImpl.__name__ = true;
format.tools.InflateImpl.run = function(i,bufsize) {
	if(bufsize == null) bufsize = 65536;
	var buf = haxe.io.Bytes.alloc(bufsize);
	var output = new haxe.io.BytesBuffer();
	var inflate = new format.tools.InflateImpl(i);
	while(true) {
		var len = inflate.readBytes(buf,0,bufsize);
		output.addBytes(buf,0,len);
		if(len < bufsize) break;
	}
	return output.getBytes();
};
format.tools.InflateImpl.prototype = {
	buildFixedHuffman: function() {
		if(format.tools.InflateImpl.FIXED_HUFFMAN != null) return format.tools.InflateImpl.FIXED_HUFFMAN;
		var a = new Array();
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		format.tools.InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return format.tools.InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) return 0; else if(this.getBit()) return 1 << n - 1 | this.getRevBits(n - 1); else return this.getRevBits(n - 1);
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b & 255;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h[1]) {
		case 0:
			var n = h[2];
			return n;
		case 1:
			var b = h[3];
			var a = h[2];
			return this.applyHuffman(this.getBit()?b:a);
		case 2:
			var tbl = h[3];
			var n1 = h[2];
			return this.applyHuffman(tbl[this.getBits(n1)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw "Invalid data";
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw "Invalid data";
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw "Invalid data";
				break;
			default:
				throw "Invalid data";
			}
		}
	}
	,inflateLoop: function() {
		var _g = this.state;
		switch(_g[1]) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8 || cinfo != 7) throw "Invalid data";
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw "Invalid data";
			if(fdict) throw "Unsupported dictionary";
			this.state = format.tools._InflateImpl.State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = format.tools._InflateImpl.State.Done;
				return true;
			}
			var crc = format.tools.Adler32.read(this.input);
			if(!calc.equals(crc)) throw "Invalid CRC";
			this.state = format.tools._InflateImpl.State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw "Invalid data";
				this.state = format.tools._InflateImpl.State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = format.tools._InflateImpl.State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[format.tools.InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g21 = hclen;
				while(_g21 < 19) {
					var i1 = _g21++;
					this.lengths[format.tools.InflateImpl.CODE_LENGTHS_POS[i1]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = new Array();
				var _g3 = 0;
				var _g22 = hlit + hdist;
				while(_g3 < _g22) {
					var i2 = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = format.tools._InflateImpl.State.CData;
				return true;
			default:
				throw "Invalid data";
			}
			break;
		case 3:
			var rlen;
			if(this.len < this.needed) rlen = this.len; else rlen = this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) if(this["final"]) this.state = format.tools._InflateImpl.State.Crc; else this.state = format.tools._InflateImpl.State.Block;
			return this.needed > 0;
		case 6:
			var rlen1;
			if(this.len < this.needed) rlen1 = this.len; else rlen1 = this.needed;
			this.addDistOne(rlen1);
			this.len -= rlen1;
			if(this.len == 0) this.state = format.tools._InflateImpl.State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist;
				if(this.len < this.dist) rdist = this.len; else rdist = this.dist;
				var rlen2;
				if(this.needed < rdist) rlen2 = this.needed; else rlen2 = rdist;
				this.addDist(this.dist,rlen2);
				this.len -= rlen2;
			}
			if(this.len == 0) this.state = format.tools._InflateImpl.State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				if(this["final"]) this.state = format.tools._InflateImpl.State.Crc; else this.state = format.tools._InflateImpl.State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = format.tools.InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw "Invalid data";
				this.len = format.tools.InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code;
				if(this.huffdist == null) dist_code = this.getRevBits(5); else dist_code = this.applyHuffman(this.huffdist);
				extra_bits = format.tools.InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw "Invalid data";
				this.dist = format.tools.InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw "Invalid data";
				if(this.dist == 1) this.state = format.tools._InflateImpl.State.DistOne; else this.state = format.tools._InflateImpl.State.Dist;
				return true;
			}
			break;
		}
	}
	,__class__: format.tools.InflateImpl
};
var haxe = {};
haxe.Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe.Http;
haxe.Http.__name__ = true;
haxe.Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js.Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.iterator();
		while( $it1.hasNext() ) {
			var h1 = $it1.next();
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = true;
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.crypto = {};
haxe.crypto.Crc32 = function() {
	this.crc = -1;
};
$hxClasses["haxe.crypto.Crc32"] = haxe.crypto.Crc32;
haxe.crypto.Crc32.__name__ = true;
haxe.crypto.Crc32.prototype = {
	'byte': function(b) {
		var tmp = (this.crc ^ b) & 255;
		var _g = 0;
		while(_g < 8) {
			var j = _g++;
			if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
		}
		this.crc = this.crc >>> 8 ^ tmp;
	}
	,update: function(b,pos,len) {
		var b1 = b.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var tmp = (this.crc ^ b1[i]) & 255;
			var _g2 = 0;
			while(_g2 < 8) {
				var j = _g2++;
				if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
			}
			this.crc = this.crc >>> 8 ^ tmp;
		}
	}
	,get: function() {
		return this.crc ^ -1;
	}
	,__class__: haxe.crypto.Crc32
};
haxe.ds = {};
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = true;
haxe.ds.BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,remove: function(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( e ) {
			if( js.Boot.__instanceof(e,String) ) {
				return false;
			} else throw(e);
		}
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return true; else if(c < 0) node = node.left; else node = node.right;
		}
		return false;
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe.ds.TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe.ds.TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,removeLoop: function(k,node) {
		if(node == null) throw "Not_found";
		var c = this.compare(k,node.key);
		if(c == 0) return this.merge(node.left,node.right); else if(c < 0) return this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right); else return this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,merge: function(t1,t2) {
		if(t1 == null) return t2;
		if(t2 == null) return t1;
		var t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	,minBinding: function(t) {
		if(t == null) throw "Not_found"; else if(t.left == null) return t; else return this.minBinding(t.left);
	}
	,removeMinBinding: function(t) {
		if(t.left == null) return t.right; else return this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r)); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe.ds.TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe.ds.BalancedTree
};
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = true;
haxe.ds.TreeNode.prototype = {
	__class__: haxe.ds.TreeNode
};
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = true;
haxe.ds.EnumValueMap.__interfaces__ = [IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = true;
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = true;
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i1 = _g++;
			b1[i1 + pos] = b2[i1 + srcpos];
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.set(pos++,value);
		}
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe.io.Bytes
};
haxe.io.BytesBuffer = function() {
	this.b = new Array();
};
$hxClasses["haxe.io.BytesBuffer"] = haxe.io.BytesBuffer;
haxe.io.BytesBuffer.__name__ = true;
haxe.io.BytesBuffer.prototype = {
	add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe.io.Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
	}
	,__class__: haxe.io.BytesBuffer
};
haxe.io.Input = function() { };
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = true;
haxe.io.Input.prototype = {
	readByte: function() {
		throw "Not implemented";
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = haxe.io.Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) return ch2 | ch1 << 8; else return ch1 | ch2 << 8;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24; else return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readString: function(len) {
		var b = haxe.io.Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,__class__: haxe.io.Input
};
haxe.io.BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe.io.BytesInput;
haxe.io.BytesInput.__name__ = true;
haxe.io.BytesInput.__super__ = haxe.io.Input;
haxe.io.BytesInput.prototype = $extend(haxe.io.Input.prototype,{
	readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe.io.Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe.io.BytesInput
});
haxe.io.Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = true;
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; };
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = true;
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = true;
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw "Unable to create XMLHttpRequest object.";
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = true;
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var lime = {};
lime.AssetData = function() { };
$hxClasses["lime.AssetData"] = lime.AssetData;
lime.AssetData.__name__ = true;
lime.AssetData.initialize = function() {
	if(!lime.AssetData.initialized) {
		lime.AssetData.path.set("assets/peote_font.png","assets/peote_font.png");
		var value = Reflect.field(lime.utils.AssetType,"image".toUpperCase());
		lime.AssetData.type.set("assets/peote_font.png",value);
		lime.AssetData.path.set("assets/peote_font_green.png","assets/peote_font_green.png");
		var value1 = Reflect.field(lime.utils.AssetType,"image".toUpperCase());
		lime.AssetData.type.set("assets/peote_font_green.png",value1);
		lime.AssetData.path.set("assets/peote_tiles.png","assets/peote_tiles.png");
		var value2 = Reflect.field(lime.utils.AssetType,"image".toUpperCase());
		lime.AssetData.type.set("assets/peote_tiles.png",value2);
		lime.AssetData.initialized = true;
	}
};
lime.AudioHandler = function(_lib) {
	this.lib = _lib;
	this.helper = new lime.helpers.html5.AudioHelper(this.lib);
};
$hxClasses["lime.AudioHandler"] = lime.AudioHandler;
lime.AudioHandler.__name__ = true;
lime.AudioHandler.prototype = {
	startup: function() {
		this.sounds = new haxe.ds.StringMap();
		this.helper.startup();
	}
	,shutdown: function() {
		this.helper.shutdown();
	}
	,update: function() {
		this.helper.update();
	}
	,create: function(_name,_file,_music) {
		if(_music == null) _music = false;
		if(this.sounds.exists(_name)) throw "lime : audio : Named sounds are not allowed to have duplicate names for now";
		var sound_instance = this.helper.create(_name,_file,_music);
		if(sound_instance != null) this.sounds.set(_name,sound_instance);
		return sound_instance;
	}
	,sound: function(_name) {
		return this.sounds.get(_name);
	}
	,loop: function(_name) {
		var _sound = this.sound(_name);
		if(_sound != null) {
			_sound.looping = true;
			_sound.play();
		} else haxe.Log.trace("Audio :: Sound does not exist, use Luxe.audio.create() first : " + _name,{ fileName : "AudioHandler.hx", lineNumber : 82, className : "lime.AudioHandler", methodName : "loop"});
	}
	,stop: function(_name) {
		var _sound = this.sound(_name);
		if(_sound != null) _sound.stop(); else haxe.Log.trace("lime : audio : sound does not exist for stop(" + _name + "), use audio.create() first",{ fileName : "AudioHandler.hx", lineNumber : 94, className : "lime.AudioHandler", methodName : "stop"});
	}
	,play: function(_name,_number_of_times,_start_position_in_ms) {
		if(_start_position_in_ms == null) _start_position_in_ms = 0;
		if(_number_of_times == null) _number_of_times = 1;
		var _sound = this.sound(_name);
		if(_sound != null) _sound.play(_number_of_times,_start_position_in_ms); else haxe.Log.trace("lime : audio : sound does not exist for play(" + _name + "), use audio.create() first",{ fileName : "AudioHandler.hx", lineNumber : 106, className : "lime.AudioHandler", methodName : "play"});
	}
	,playing: function(_name) {
		var s = this.sound(_name);
		if(s != null) return s.playing;
		return false;
	}
	,exists: function(_name) {
		return this.sound(_name) != null;
	}
	,volume: function(_name,_volume) {
		var _sound = this.sound(_name);
		if(_sound == null) {
			haxe.Log.trace("lime : audio : sound does not exist for volume(" + _name + "), use audio.create() first",{ fileName : "AudioHandler.hx", lineNumber : 135, className : "lime.AudioHandler", methodName : "volume"});
			return 0.0;
		}
		if(_volume != null) _sound.set_volume(_volume);
		return _sound.volume;
	}
	,pan: function(_name,_pan) {
		var _sound = this.sound(_name);
		if(_sound == null) {
			haxe.Log.trace("lime : audio : sound does not exist for pan(" + _name + "), use audio.create() first",{ fileName : "AudioHandler.hx", lineNumber : 153, className : "lime.AudioHandler", methodName : "pan"});
			return 0.0;
		}
		if(_pan != null) _sound.set_pan(_pan);
		return _sound.pan;
	}
	,position: function(_name,_pos) {
		var _sound = this.sound(_name);
		if(_sound == null) {
			haxe.Log.trace("lime : audio : sound does not exist for position(" + _name + "), use Luxe.audio.create() first",{ fileName : "AudioHandler.hx", lineNumber : 171, className : "lime.AudioHandler", methodName : "position"});
			return 0.0;
		}
		if(_pos != null) _sound.set_position(_pos);
		return _sound.get_position();
	}
	,__class__: lime.AudioHandler
};
lime.Window = function() { };
$hxClasses["lime.Window"] = lime.Window;
lime.Window.__name__ = true;
lime.SystemEvents = function() { };
$hxClasses["lime.SystemEvents"] = lime.SystemEvents;
lime.SystemEvents.__name__ = true;
lime.InputHandler = function(_lib) {
	this.last_mouse_y = 0;
	this.last_mouse_x = 0;
	this.lib = _lib;
	this.helper = new lime.helpers.html5.InputHelper(this.lib);
};
$hxClasses["lime.InputHandler"] = lime.InputHandler;
lime.InputHandler.__name__ = true;
lime.InputHandler.prototype = {
	keypressed: function(_value) {
		return this.key_value_pressed.exists(_value);
	}
	,keyreleased: function(_value) {
		return this.key_value_released.exists(_value);
	}
	,keydown: function(_value) {
		return this.key_value_down.exists(_value);
	}
	,startup: function() {
		this.touches_active = new haxe.ds.IntMap();
		this.keys_down = new haxe.ds.IntMap();
		this.key_value_pressed = new haxe.ds.EnumValueMap();
		this.key_value_down = new haxe.ds.EnumValueMap();
		this.key_value_released = new haxe.ds.EnumValueMap();
		this.helper.startup();
	}
	,shutdown: function() {
	}
	,update: function() {
		this.helper.update();
		var $it0 = this.key_value_pressed.keys();
		while( $it0.hasNext() ) {
			var _value = $it0.next();
			var _flag = this.key_value_pressed.get(_value);
			if(_flag) this.key_value_pressed.remove(_value); else this.key_value_pressed.set(_value,true);
		}
		var $it1 = this.key_value_released.keys();
		while( $it1.hasNext() ) {
			var _value1 = $it1.next();
			var _flag1 = this.key_value_released.get(_value1);
			if(_flag1) this.key_value_released.remove(_value1); else this.key_value_released.set(_value1,true);
		}
	}
	,lime_onchar: function(_event) {
		if(this.lib.host.onchar != null) this.lib.host.onchar({ raw : _event, code : _event.code, 'char' : _event.code, value : _event.value, flags : _event.flags, key : lime.helpers.Keys.toKeyValue(_event)});
		_event["char"] = _event.code;
		this.lime_onkeydown(_event);
	}
	,lime_onkeydown: function(_event) {
		if(this.lib.host.onkeydown != null && !(function($this) {
			var $r;
			var key = _event.value;
			$r = $this.keys_down.exists(key);
			return $r;
		}(this))) {
			var _keyvalue = lime.helpers.Keys.toKeyValue(_event);
			var key1 = _event.value;
			this.keys_down.set(key1,true);
			this.key_value_pressed.set(_keyvalue,false);
			this.key_value_down.set(_keyvalue,true);
			if(_event["char"] == null) _event["char"] = 0;
			this.lib.host.onkeydown({ raw : _event, code : _event.code, 'char' : _event["char"], value : _event.value, flags : _event.flags, key : _keyvalue, ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0});
		}
	}
	,lime_onkeyup: function(_event) {
		var _keyvalue = lime.helpers.Keys.toKeyValue(_event);
		var key = _event.value;
		this.keys_down.remove(key);
		this.key_value_released.set(_keyvalue,false);
		this.key_value_down.remove(_keyvalue);
		if(this.lib.host.onkeyup != null) this.lib.host.onkeyup({ raw : _event, code : _event.code, 'char' : _event["char"], value : _event.value, flags : _event.flags, key : _keyvalue, ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0});
	}
	,lime_gotinputfocus: function(_event) {
		if(this.lib.host.ongotinputfocus != null) this.lib.host.ongotinputfocus({ raw : _event, code : _event.code, 'char' : _event["char"], value : _event.value, flags : _event.flags, key : lime.helpers.Keys.toKeyValue(_event), ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0});
	}
	,lime_lostinputfocus: function(_event) {
		if(this.lib.host.onlostinputfocus != null) this.lib.host.onlostinputfocus({ raw : _event, code : _event.code, 'char' : _event["char"], value : _event.value, flags : _event.flags, key : lime.helpers.Keys.toKeyValue(_event), ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0});
	}
	,mouse_button_from_id: function(id) {
		switch(id) {
		case 0:
			return lime.MouseButton.left;
		case 1:
			return lime.MouseButton.middle;
		case 2:
			return lime.MouseButton.right;
		case 3:
			return lime.MouseButton.wheel_down;
		case 4:
			return lime.MouseButton.wheel_up;
		default:
			return id;
		}
	}
	,lime_mousemove: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		var deltaX = _event.x - this.last_mouse_x;
		var deltaY = _event.y - this.last_mouse_y;
		this.last_mouse_x = _event.x;
		this.last_mouse_y = _event.y;
		if(this.lib.host.onmousemove != null) {
			var _mouse_event = _event;
			if(!_pass_through) _mouse_event = { raw : _event, button : lime.MouseButton.move, state : lime.MouseState.down, x : _event.x, y : _event.y, deltaX : deltaX, deltaY : deltaY, flags : _event.flags, ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0};
			this.lib.host.onmousemove(_mouse_event);
		}
	}
	,lime_mousedown: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		if(this.lib.host.onmousedown != null) {
			var _mouse_event = _event;
			if(!_pass_through) _mouse_event = { raw : _event, button : this.mouse_button_from_id(_event.value), state : lime.MouseState.down, x : _event.x, y : _event.y, flags : _event.flags, ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0};
			this.lib.host.onmousedown(_mouse_event);
		}
	}
	,lime_mouseclick: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		if(this.lib.host.onmouseclick != null) {
			var _mouse_event = _event;
			if(!_pass_through) _mouse_event = { raw : _event, button : _event.value, state : lime.MouseState.down, x : _event.x, y : _event.y, flags : _event.flags, ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0};
			this.lib.host.onmouseclick(_mouse_event);
		}
	}
	,lime_mouseup: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		if(this.lib.host.onmouseup != null) {
			var _mouse_event = _event;
			var _button = this.mouse_button_from_id(_event.value);
			if(_button == lime.MouseButton.wheel_down || _button == lime.MouseButton.wheel_up) return this.lime_mousewheel(_event,_pass_through);
			if(!_pass_through) _mouse_event = { raw : _event, button : _button, state : lime.MouseState.up, x : _event.x, y : _event.y, flags : _event.flags, ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0};
			this.lib.host.onmouseup(_mouse_event);
		}
	}
	,lime_mousewheel: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		if(this.lib.host.onmousewheel != null) {
			var _mouse_event = _event;
			if(!_pass_through) _mouse_event = { raw : _event, button : this.mouse_button_from_id(_event.value), state : lime.MouseState.wheel, x : _event.x, y : _event.y, flags : _event.flags, ctrl_down : (_event.flags & lime.InputHandler.efCtrlDown) > 0, alt_down : (_event.flags & lime.InputHandler.efAltDown) > 0, shift_down : (_event.flags & lime.InputHandler.efShiftDown) > 0, meta_down : (_event.flags & lime.InputHandler.efCommandDown) > 0};
			this.lib.host.onmousewheel(_mouse_event);
		}
	}
	,lime_touchbegin: function(_event) {
		var touch_item = { state : lime.TouchState.begin, flags : _event.flags, ID : _event.value, x : _event.x, y : _event.y};
		var key = touch_item.ID;
		this.touches_active.set(key,touch_item);
		if(this.lib.host.ontouchbegin != null) this.lib.host.ontouchbegin(touch_item);
		if((_event.flags & 32768) > 0) this.lime_mousedown(_event);
	}
	,lime_touchmove: function(_event) {
		var touch_item;
		var key = _event.value;
		touch_item = this.touches_active.get(key);
		touch_item.x = _event.x;
		touch_item.y = _event.y;
		touch_item.state = lime.TouchState.move;
		touch_item.flags = _event.flags;
		if(this.lib.host.ontouchmove != null) this.lib.host.ontouchmove(touch_item);
	}
	,lime_touchend: function(_event) {
		var touch_item;
		var key = _event.value;
		touch_item = this.touches_active.get(key);
		touch_item.x = _event.x;
		touch_item.y = _event.y;
		touch_item.state = lime.TouchState.end;
		touch_item.flags = _event.flags;
		if(this.lib.host.ontouchend != null) this.lib.host.ontouchend(touch_item);
		if((_event.flags & 32768) > 0) this.lime_mouseup(_event);
		var key1 = _event.value;
		this.touches_active.remove(key1);
	}
	,lime_touchtap: function(_event) {
		if(this.lib.host.ontouchtap != null) this.lib.host.ontouchtap(_event);
	}
	,lime_gamepadaxis: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		if(this.lib.host.ongamepadaxis != null) {
			var _gamepad_event = _event;
			if(!_pass_through) _gamepad_event = { raw : _event, axis : _event.code, value : _event.value / 32767, gamepad : _event.id};
			this.lib.host.ongamepadaxis(_gamepad_event);
		}
	}
	,lime_gamepadbuttondown: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		if(this.lib.host.ongamepadbuttondown != null) {
			var _gamepad_event = _event;
			if(!_pass_through) _gamepad_event = { raw : _event, state : lime.ButtonState.down, value : 0, button : _event.code, gamepad : _event.id};
			this.lib.host.ongamepadbuttondown(_gamepad_event);
		}
	}
	,lime_gamepadbuttonup: function(_event,_pass_through) {
		if(_pass_through == null) _pass_through = false;
		if(this.lib.host.ongamepadbuttonup != null) {
			var _gamepad_event = _event;
			if(!_pass_through) _gamepad_event = { raw : _event, state : lime.ButtonState.up, value : 1, button : _event.code, gamepad : _event.id};
			this.lib.host.ongamepadbuttonup(_gamepad_event);
		}
	}
	,lime_gamepadball: function(_event) {
		if(this.lib.host.ongamepadball != null) this.lib.host.ongamepadball(_event);
	}
	,lime_gamepadhat: function(_event) {
		if(this.lib.host.ongamepadhat != null) this.lib.host.ongamepadhat(_event);
	}
	,lime_gamepaddeviceadded: function(_event) {
		if(this.lib.host.ongamepaddeviceadded != null) this.lib.host.ongamepaddeviceadded(_event);
	}
	,lime_gamepaddeviceremoved: function(_event) {
		if(this.lib.host.ongamepaddeviceremoved != null) this.lib.host.ongamepaddeviceremoved(_event);
	}
	,__class__: lime.InputHandler
};
lime.TouchState = $hxClasses["lime.TouchState"] = { __ename__ : true, __constructs__ : ["begin","move","end"] };
lime.TouchState.begin = ["begin",0];
lime.TouchState.begin.toString = $estr;
lime.TouchState.begin.__enum__ = lime.TouchState;
lime.TouchState.move = ["move",1];
lime.TouchState.move.toString = $estr;
lime.TouchState.move.__enum__ = lime.TouchState;
lime.TouchState.end = ["end",2];
lime.TouchState.end.toString = $estr;
lime.TouchState.end.__enum__ = lime.TouchState;
lime.MouseState = $hxClasses["lime.MouseState"] = { __ename__ : true, __constructs__ : ["down","move","wheel","up"] };
lime.MouseState.down = ["down",0];
lime.MouseState.down.toString = $estr;
lime.MouseState.down.__enum__ = lime.MouseState;
lime.MouseState.move = ["move",1];
lime.MouseState.move.toString = $estr;
lime.MouseState.move.__enum__ = lime.MouseState;
lime.MouseState.wheel = ["wheel",2];
lime.MouseState.wheel.toString = $estr;
lime.MouseState.wheel.__enum__ = lime.MouseState;
lime.MouseState.up = ["up",3];
lime.MouseState.up.toString = $estr;
lime.MouseState.up.__enum__ = lime.MouseState;
lime.ButtonState = $hxClasses["lime.ButtonState"] = { __ename__ : true, __constructs__ : ["down","up"] };
lime.ButtonState.down = ["down",0];
lime.ButtonState.down.toString = $estr;
lime.ButtonState.down.__enum__ = lime.ButtonState;
lime.ButtonState.up = ["up",1];
lime.ButtonState.up.toString = $estr;
lime.ButtonState.up.__enum__ = lime.ButtonState;
lime.MouseButton = $hxClasses["lime.MouseButton"] = { __ename__ : true, __constructs__ : ["move","left","middle","right","wheel_up","wheel_down"] };
lime.MouseButton.move = ["move",0];
lime.MouseButton.move.toString = $estr;
lime.MouseButton.move.__enum__ = lime.MouseButton;
lime.MouseButton.left = ["left",1];
lime.MouseButton.left.toString = $estr;
lime.MouseButton.left.__enum__ = lime.MouseButton;
lime.MouseButton.middle = ["middle",2];
lime.MouseButton.middle.toString = $estr;
lime.MouseButton.middle.__enum__ = lime.MouseButton;
lime.MouseButton.right = ["right",3];
lime.MouseButton.right.toString = $estr;
lime.MouseButton.right.__enum__ = lime.MouseButton;
lime.MouseButton.wheel_up = ["wheel_up",4];
lime.MouseButton.wheel_up.toString = $estr;
lime.MouseButton.wheel_up.__enum__ = lime.MouseButton;
lime.MouseButton.wheel_down = ["wheel_down",5];
lime.MouseButton.wheel_down.toString = $estr;
lime.MouseButton.wheel_down.__enum__ = lime.MouseButton;
lime.Lime = function() {
	this.has_shutdown = false;
	this.shutting_down = false;
	this.last_render_time = 0.0;
	this.frame_period = 0.0;
};
$hxClasses["lime.Lime"] = lime.Lime;
lime.Lime.__name__ = true;
lime.Lime.prototype = {
	set_frame_rate: function(value) {
		this.frame_rate = value;
		if(this.frame_rate <= 0) this.frame_period = this.frame_rate; else this.frame_period = 1.0 / this.frame_rate;
		return value;
	}
	,init: function(_main_,_config) {
		this.config = _config;
		this.host = _main_;
		if(this.config.fps != null) this.set_frame_rate(this.config.fps); else this.set_frame_rate(60);
		this.render_request_function = null;
		this.window = new lime.WindowHandler(this);
		this.window.startup();
	}
	,on_window_ready: function(handle) {
		this.window_handle = handle;
		this.window.ready();
		lime.AssetData.initialize();
		this.input = new lime.InputHandler(this);
		this.input.startup();
		this.audio = new lime.AudioHandler(this);
		this.audio.startup();
		this.render = new lime.RenderHandler(this);
		this.render.startup();
		this.window.set_active(true);
		if(this.host.ready != null) this.host.ready(this);
		this.window.post_ready();
	}
	,shutdown: function() {
		this.shutting_down = true;
		if(this.host.shutdown != null) this.host.shutdown();
		this.window.set_active(false);
		this.audio.shutdown();
		this.render.shutdown();
		this.input.shutdown();
		this.window.shutdown();
		this.has_shutdown = true;
	}
	,cleanup: function() {
		this.render = null;
		this.input = null;
		this.window = null;
	}
	,on_lime_event: function(_event) {
		var result = 0.0;
		var event_type = Std["int"](Reflect.field(_event,"type"));
		switch(event_type) {
		case lime.SystemEvents.poll:
			this.on_update(_event);
			break;
		case lime.SystemEvents.quit:
			this.shutdown();
			break;
		case lime.SystemEvents["char"]:
			_event.result = 1;
			this.input.lime_onchar(_event);
			break;
		case lime.SystemEvents.keydown:
			this.input.lime_onkeydown(_event);
			break;
		case lime.SystemEvents.keyup:
			this.input.lime_onkeyup(_event);
			break;
		case lime.SystemEvents.gotinputfocus:
			this.input.lime_gotinputfocus(_event);
			break;
		case lime.SystemEvents.lostinputfocus:
			this.input.lime_lostinputfocus(_event);
			break;
		case lime.SystemEvents.mousemove:
			this.input.lime_mousemove(_event);
			break;
		case lime.SystemEvents.mousedown:
			this.input.lime_mousedown(_event);
			break;
		case lime.SystemEvents.mouseclick:
			this.input.lime_mouseclick(_event);
			break;
		case lime.SystemEvents.mouseup:
			this.input.lime_mouseup(_event);
			break;
		case lime.SystemEvents.touchbegin:
			this.input.lime_touchbegin(_event);
			break;
		case lime.SystemEvents.touchmove:
			this.input.lime_touchmove(_event);
			break;
		case lime.SystemEvents.touchend:
			this.input.lime_touchend(_event);
			break;
		case lime.SystemEvents.touchtap:
			this.input.lime_touchtap(_event);
			break;
		case lime.SystemEvents.joyaxismove:
			this.input.lime_gamepadaxis(_event);
			break;
		case lime.SystemEvents.joyballmove:
			this.input.lime_gamepadball(_event);
			break;
		case lime.SystemEvents.joyhatmove:
			this.input.lime_gamepadhat(_event);
			break;
		case lime.SystemEvents.joybuttondown:
			this.input.lime_gamepadbuttondown(_event);
			break;
		case lime.SystemEvents.joybuttonup:
			this.input.lime_gamepadbuttonup(_event);
			break;
		case lime.SystemEvents.joydeviceadded:
			this.input.lime_gamepaddeviceadded(_event);
			break;
		case lime.SystemEvents.joydeviceremoved:
			this.input.lime_gamepaddeviceremoved(_event);
			break;
		case lime.SystemEvents.activate:
			this.window.set_active(true);
			break;
		case lime.SystemEvents.deactivate:
			this.window.set_active(false);
			break;
		case lime.SystemEvents.resize:
			this.window.on_resize(_event);
			break;
		case lime.SystemEvents.focus:
			this.window.on_focus(_event);
			break;
		case lime.SystemEvents.redraw:
			this.window.on_redraw(_event);
			break;
		case lime.SystemEvents.shouldrotate:
			this.window.on_should_rotate(_event);
			break;
		case lime.SystemEvents.syswm:
			this.on_syswm(_event);
			break;
		case lime.SystemEvents.change:
			this.on_change(_event);
			break;
		}
		this.__updateNextWake();
		return null;
	}
	,on_syswm: function(ev) {
	}
	,on_change: function(ev) {
	}
	,on_update: function(_event) {
		if(!this.has_shutdown) {
			var do_update = true;
			if(do_update) {
				this.audio.update();
				this.input.update();
				if(this.host.update != null) this.host.update();
				this.perform_render();
			}
		}
		return true;
	}
	,perform_render: function() {
		if(this.render_request_function != null) this.render_request_function(); else this.render.render();
	}
	,__checkRender: function() {
		if(this.frame_rate > 0) {
			var now = haxe.Timer.stamp();
			if(now >= this.last_render_time + this.frame_period) {
				this.last_render_time = now;
				return true;
			}
		} else return true;
		return false;
	}
	,__updateNextWake: function() {
		return null;
	}
	,__nextFrameDue: function(_otherTimers) {
		if(this.has_shutdown) return _otherTimers;
		if(!this.window.active) return _otherTimers;
		if(this.frame_rate > 0) {
			var next = this.last_render_time + this.frame_period - haxe.Timer.stamp() - lime.Lime.early_wakeup;
			if(next < _otherTimers) return next;
		}
		return _otherTimers;
	}
	,__class__: lime.Lime
};
lime.BrowserLike = $hxClasses["lime.BrowserLike"] = { __ename__ : true, __constructs__ : ["unknown","chrome","firefox","opera","ie","safari"] };
lime.BrowserLike.unknown = ["unknown",0];
lime.BrowserLike.unknown.toString = $estr;
lime.BrowserLike.unknown.__enum__ = lime.BrowserLike;
lime.BrowserLike.chrome = ["chrome",1];
lime.BrowserLike.chrome.toString = $estr;
lime.BrowserLike.chrome.__enum__ = lime.BrowserLike;
lime.BrowserLike.firefox = ["firefox",2];
lime.BrowserLike.firefox.toString = $estr;
lime.BrowserLike.firefox.__enum__ = lime.BrowserLike;
lime.BrowserLike.opera = ["opera",3];
lime.BrowserLike.opera.toString = $estr;
lime.BrowserLike.opera.__enum__ = lime.BrowserLike;
lime.BrowserLike.ie = ["ie",4];
lime.BrowserLike.ie.toString = $estr;
lime.BrowserLike.ie.__enum__ = lime.BrowserLike;
lime.BrowserLike.safari = ["safari",5];
lime.BrowserLike.safari.toString = $estr;
lime.BrowserLike.safari.__enum__ = lime.BrowserLike;
lime.RenderHandler = function(_lib) {
	this.lib = _lib;
};
$hxClasses["lime.RenderHandler"] = lime.RenderHandler;
lime.RenderHandler.__name__ = true;
lime.RenderHandler.prototype = {
	__onRender: function(rect) {
	}
	,startup: function() {
		this.canvas_position = { x : 0, y : 0};
		this.browser = lime.BrowserLike.unknown;
		var _window_handle = this.lib.window_handle;
		this.direct_renderer_handle = js.html._CanvasElement.CanvasUtil.getContextWebGL(_window_handle,{ alpha : false, premultipliedAlpha : false});
		this.update_canvas_position();
		if(this.direct_renderer_handle == null) throw "WebGL is required to run this";
		lime.gl.html5.GL.limeContext = this.direct_renderer_handle;
		this.requestAnimFrame = ($_=window,$bind($_,$_.requestAnimationFrame));
		if(this.requestAnimFrame != null) this.browser = lime.BrowserLike.chrome; else {
			var _firefox = window.mozRequestAnimationFrame;
			var _safari = window.webkitRequestAnimationFrame;
			var _opera = window.oRequestAnimationFrame;
			if(_firefox) this.browser = lime.BrowserLike.firefox; else if(_safari) this.browser = lime.BrowserLike.safari; else if(_opera) this.browser = lime.BrowserLike.opera;
		}
	}
	,shutdown: function() {
	}
	,on_resize: function(_event) {
		this.update_canvas_position();
		if(this.lib.host.onresize != null) this.lib.host.onresize(_event);
	}
	,update_canvas_position: function() {
		var curleft = 0;
		var curtop = 0;
		var _obj = this.lib.window_handle;
		var _has_parent = true;
		var _max_count = 0;
		while(_has_parent == true) {
			_max_count++;
			if(_max_count > 30) {
				_has_parent = false;
				break;
			}
			if(_obj.offsetParent) {
				curleft += _obj.offsetLeft;
				curtop += _obj.offsetTop;
				_obj = _obj.offsetParent;
			} else _has_parent = false;
		}
		this.canvas_position = { x : curleft, y : curtop};
	}
	,_requestAnimFrame: function(callback) {
		if(this.browser == lime.BrowserLike.chrome) this.requestAnimFrame(callback); else if(this.browser == lime.BrowserLike.firefox) window.mozRequestAnimationFrame(callback); else if(this.browser == lime.BrowserLike.safari) window.webkitRequestAnimationFrame(callback); else if(this.browser == lime.BrowserLike.opera) window.oRequestAnimationFrame(callback); else window.setTimeout(function() {
			callback();
		},16);
	}
	,request_render: function() {
	}
	,render: function() {
		if(!this.lib.window.active) return false;
		this.on_render(null);
		this._requestAnimFrame(($_=this.lib,$bind($_,$_.on_update)));
		return true;
		return true;
	}
	,on_render: function(rect) {
		if(this.lib.host.render != null) this.lib.host.render();
	}
	,__class__: lime.RenderHandler
};
lime.WindowHandler = function(_lib) {
	this.cursor_visible = true;
	this.cursor_locked = false;
	this.invalidated = false;
	this.active = false;
	this.lib = _lib;
};
$hxClasses["lime.WindowHandler"] = lime.WindowHandler;
lime.WindowHandler.__name__ = true;
lime.WindowHandler.prototype = {
	startup: function() {
		var _g = this;
		var handle = null;
		window.document.body.onload = function(_) {
			var handle1 = window.document.getElementById("lime_canvas");
			_g.lib.on_window_ready(handle1);
		};
	}
	,shutdown: function() {
	}
	,ready: function() {
	}
	,post_ready: function() {
		this.lib.render.render();
	}
	,invalidate: function() {
		this.invalidated = true;
	}
	,set_active: function(_active) {
		this.active = _active;
		if(_active == false) {
			if(this.lib.has_shutdown) this.lib.cleanup();
		}
	}
	,set_cursor_visible: function(val) {
		if(val == null) val = true;
		this.cursor_visible = val;
	}
	,constrain_cursor_to_window_frame: function(val) {
		if(val == null) val = false;
		this.html5_enable_pointerlock(val);
		this.cursor_locked = val;
	}
	,set_window_position: function(x,y) {
	}
	,html5_enable_pointerlock: function(val) {
		if(val == null) val = false;
		var _normal = 'pointerLockElement' in document;
		var _firefox = 'mozPointerLockElement' in document;
		var _webkit = 'webkitPointerLockElement' in document;
		if(!_normal && !_firefox && !_webkit) {
			haxe.Log.trace("Pointer lock is not supported by this browser yet, sorry!",{ fileName : "WindowHandler.hx", lineNumber : 195, className : "lime.WindowHandler", methodName : "html5_enable_pointerlock"});
			return;
		}
		
            var _element = document.getElementById('lime_canvas');
                _element.requestPointerLock =   _element.requestPointerLock ||
                                                _element.mozRequestPointerLock ||
                                                _element.webkitRequestPointerLock;

                // Ask the browser to release the pointer
                _element.exitPointerLock =  _element.exitPointerLock ||
                                            _element.mozExitPointerLock ||
                                            _element.webkitExitPointerLock;;
		if(val) {
			if(_element.requestPointerLock) _element.requestPointerLock();
		} else {
			if(_element.exitPointerLock) _element.exitPointerLock();
		}
	}
	,set_cursor_position_in_window: function(_x,_y) {
		if(_y == null) _y = 0;
		if(_x == null) _x = 0;
	}
	,on_redraw: function(_event) {
		this.lib.render.render();
	}
	,on_resize: function(_event) {
		this.lib.render.on_resize(_event);
	}
	,on_should_rotate: function(_event) {
	}
	,on_focus: function(_event) {
	}
	,on_pause: function() {
	}
	,on_resume: function() {
	}
	,on_force_close: function() {
	}
	,openURL: function(_url) {
		
                var win = window.open( _url, "_blank" );
                win.focus();
            ;
	}
	,fileDialogOpen: function(_title,_text) {
		return "";
	}
	,fileDialogSave: function(_title,_text) {
		return "";
	}
	,fileDialogFolder: function(_title,_text) {
		return "";
	}
	,__class__: lime.WindowHandler
};
lime.gl = {};
lime.gl.html5 = {};
lime.gl.html5.Ext = function() { };
$hxClasses["lime.gl.html5.Ext"] = lime.gl.html5.Ext;
lime.gl.html5.Ext.__name__ = true;
lime.gl.html5.Ext.drawBuffers = function(n,buffers) {
	if(lime.gl.html5.Ext.ext_draw_buffers == null) {
		lime.gl.html5.Ext.ext_draw_buffers = lime.gl.html5.GL.getExtension("EXT_draw_buffers");
		if(lime.gl.html5.Ext.ext_draw_buffers == null) {
			lime.gl.html5.Ext.ext_draw_buffers = lime.gl.html5.GL.getExtension("WEBGL_draw_buffers");
			if(lime.gl.html5.Ext.ext_draw_buffers == null) throw "Attemping to use GL.Ext.drawBuffers when it is not found in this browser.";
		}
	}
	return lime.gl.html5.Ext.ext_draw_buffers(n,buffers);
};
lime.gl.html5.GL = function() { };
$hxClasses["lime.gl.html5.GL"] = lime.gl.html5.GL;
lime.gl.html5.GL.__name__ = true;
lime.gl.html5.GL.activeTexture = function(texture) {
	lime.gl.html5.GL.limeContext.activeTexture(texture);
};
lime.gl.html5.GL.attachShader = function(program,shader) {
	lime.gl.html5.GL.limeContext.attachShader(program,shader);
};
lime.gl.html5.GL.bindAttribLocation = function(program,index,name) {
	lime.gl.html5.GL.limeContext.bindAttribLocation(program,index,name);
};
lime.gl.html5.GL.bindBuffer = function(target,buffer) {
	lime.gl.html5.GL.limeContext.bindBuffer(target,buffer);
};
lime.gl.html5.GL.bindFramebuffer = function(target,framebuffer) {
	lime.gl.html5.GL.limeContext.bindFramebuffer(target,framebuffer);
};
lime.gl.html5.GL.bindRenderbuffer = function(target,renderbuffer) {
	lime.gl.html5.GL.limeContext.bindRenderbuffer(target,renderbuffer);
};
lime.gl.html5.GL.bindTexture = function(target,texture) {
	lime.gl.html5.GL.limeContext.bindTexture(target,texture);
};
lime.gl.html5.GL.blendColor = function(red,green,blue,alpha) {
	lime.gl.html5.GL.limeContext.blendColor(red,green,blue,alpha);
};
lime.gl.html5.GL.blendEquation = function(mode) {
	lime.gl.html5.GL.limeContext.blendEquation(mode);
};
lime.gl.html5.GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	lime.gl.html5.GL.limeContext.blendEquationSeparate(modeRGB,modeAlpha);
};
lime.gl.html5.GL.blendFunc = function(sfactor,dfactor) {
	lime.gl.html5.GL.limeContext.blendFunc(sfactor,dfactor);
};
lime.gl.html5.GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	lime.gl.html5.GL.limeContext.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
lime.gl.html5.GL.bufferData = function(target,data,usage) {
	lime.gl.html5.GL.limeContext.bufferData(target,data,usage);
};
lime.gl.html5.GL.bufferSubData = function(target,offset,data) {
	lime.gl.html5.GL.limeContext.bufferSubData(target,offset,data);
};
lime.gl.html5.GL.checkFramebufferStatus = function(target) {
	return lime.gl.html5.GL.limeContext.checkFramebufferStatus(target);
};
lime.gl.html5.GL.clear = function(mask) {
	lime.gl.html5.GL.limeContext.clear(mask);
};
lime.gl.html5.GL.clearColor = function(red,green,blue,alpha) {
	lime.gl.html5.GL.limeContext.clearColor(red,green,blue,alpha);
};
lime.gl.html5.GL.clearDepth = function(depth) {
	lime.gl.html5.GL.limeContext.clearDepth(depth);
};
lime.gl.html5.GL.clearStencil = function(s) {
	lime.gl.html5.GL.limeContext.clearStencil(s);
};
lime.gl.html5.GL.colorMask = function(red,green,blue,alpha) {
	lime.gl.html5.GL.limeContext.colorMask(red,green,blue,alpha);
};
lime.gl.html5.GL.compileShader = function(shader) {
	lime.gl.html5.GL.limeContext.compileShader(shader);
};
lime.gl.html5.GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	lime.gl.html5.GL.limeContext.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
lime.gl.html5.GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	lime.gl.html5.GL.limeContext.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
lime.gl.html5.GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	lime.gl.html5.GL.limeContext.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
lime.gl.html5.GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	lime.gl.html5.GL.limeContext.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
lime.gl.html5.GL.createBuffer = function() {
	return lime.gl.html5.GL.limeContext.createBuffer();
};
lime.gl.html5.GL.createFramebuffer = function() {
	return lime.gl.html5.GL.limeContext.createFramebuffer();
};
lime.gl.html5.GL.createProgram = function() {
	return lime.gl.html5.GL.limeContext.createProgram();
};
lime.gl.html5.GL.createRenderbuffer = function() {
	return lime.gl.html5.GL.limeContext.createRenderbuffer();
};
lime.gl.html5.GL.createShader = function(type) {
	return lime.gl.html5.GL.limeContext.createShader(type);
};
lime.gl.html5.GL.createTexture = function() {
	return lime.gl.html5.GL.limeContext.createTexture();
};
lime.gl.html5.GL.cullFace = function(mode) {
	lime.gl.html5.GL.limeContext.cullFace(mode);
};
lime.gl.html5.GL.deleteBuffer = function(buffer) {
	lime.gl.html5.GL.limeContext.deleteBuffer(buffer);
};
lime.gl.html5.GL.deleteFramebuffer = function(framebuffer) {
	lime.gl.html5.GL.limeContext.deleteFramebuffer(framebuffer);
};
lime.gl.html5.GL.deleteProgram = function(program) {
	lime.gl.html5.GL.limeContext.deleteProgram(program);
};
lime.gl.html5.GL.deleteRenderbuffer = function(renderbuffer) {
	lime.gl.html5.GL.limeContext.deleteRenderbuffer(renderbuffer);
};
lime.gl.html5.GL.deleteShader = function(shader) {
	lime.gl.html5.GL.limeContext.deleteShader(shader);
};
lime.gl.html5.GL.deleteTexture = function(texture) {
	lime.gl.html5.GL.limeContext.deleteTexture(texture);
};
lime.gl.html5.GL.depthFunc = function(func) {
	lime.gl.html5.GL.limeContext.depthFunc(func);
};
lime.gl.html5.GL.depthMask = function(flag) {
	lime.gl.html5.GL.limeContext.depthMask(flag);
};
lime.gl.html5.GL.depthRange = function(zNear,zFar) {
	lime.gl.html5.GL.limeContext.depthRange(zNear,zFar);
};
lime.gl.html5.GL.detachShader = function(program,shader) {
	lime.gl.html5.GL.limeContext.detachShader(program,shader);
};
lime.gl.html5.GL.disable = function(cap) {
	lime.gl.html5.GL.limeContext.disable(cap);
};
lime.gl.html5.GL.disableVertexAttribArray = function(index) {
	lime.gl.html5.GL.limeContext.disableVertexAttribArray(index);
};
lime.gl.html5.GL.drawArrays = function(mode,first,count) {
	lime.gl.html5.GL.limeContext.drawArrays(mode,first,count);
};
lime.gl.html5.GL.drawElements = function(mode,count,type,offset) {
	lime.gl.html5.GL.limeContext.drawElements(mode,count,type,offset);
};
lime.gl.html5.GL.enable = function(cap) {
	lime.gl.html5.GL.limeContext.enable(cap);
};
lime.gl.html5.GL.enableVertexAttribArray = function(index) {
	lime.gl.html5.GL.limeContext.enableVertexAttribArray(index);
};
lime.gl.html5.GL.finish = function() {
	lime.gl.html5.GL.limeContext.finish();
};
lime.gl.html5.GL.flush = function() {
	lime.gl.html5.GL.limeContext.flush();
};
lime.gl.html5.GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	lime.gl.html5.GL.limeContext.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
lime.gl.html5.GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	lime.gl.html5.GL.limeContext.framebufferTexture2D(target,attachment,textarget,texture,level);
};
lime.gl.html5.GL.frontFace = function(mode) {
	lime.gl.html5.GL.limeContext.frontFace(mode);
};
lime.gl.html5.GL.generateMipmap = function(target) {
	lime.gl.html5.GL.limeContext.generateMipmap(target);
};
lime.gl.html5.GL.getActiveAttrib = function(program,index) {
	return lime.gl.html5.GL.limeContext.getActiveAttrib(program,index);
};
lime.gl.html5.GL.getActiveUniform = function(program,index) {
	return lime.gl.html5.GL.limeContext.getActiveUniform(program,index);
};
lime.gl.html5.GL.getAttachedShaders = function(program) {
	return lime.gl.html5.GL.limeContext.getAttachedShaders(program);
};
lime.gl.html5.GL.getAttribLocation = function(program,name) {
	return lime.gl.html5.GL.limeContext.getAttribLocation(program,name);
};
lime.gl.html5.GL.getBufferParameter = function(target,pname) {
	return lime.gl.html5.GL.limeContext.getBufferParameter(target,pname);
};
lime.gl.html5.GL.getContextAttributes = function() {
	return lime.gl.html5.GL.limeContext.getContextAttributes();
};
lime.gl.html5.GL.getError = function() {
	return lime.gl.html5.GL.limeContext.getError();
};
lime.gl.html5.GL.getExtension = function(name) {
	return lime.gl.html5.GL.limeContext.getExtension(name);
};
lime.gl.html5.GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return lime.gl.html5.GL.limeContext.getFramebufferAttachmentParameter(target,attachment,pname);
};
lime.gl.html5.GL.getParameter = function(pname) {
	return lime.gl.html5.GL.limeContext.getParameter(pname);
};
lime.gl.html5.GL.getProgramInfoLog = function(program) {
	return lime.gl.html5.GL.limeContext.getProgramInfoLog(program);
};
lime.gl.html5.GL.getProgramParameter = function(program,pname) {
	return lime.gl.html5.GL.limeContext.getProgramParameter(program,pname);
};
lime.gl.html5.GL.getRenderbufferParameter = function(target,pname) {
	return lime.gl.html5.GL.limeContext.getRenderbufferParameter(target,pname);
};
lime.gl.html5.GL.getShaderInfoLog = function(shader) {
	return lime.gl.html5.GL.limeContext.getShaderInfoLog(shader);
};
lime.gl.html5.GL.getShaderParameter = function(shader,pname) {
	return lime.gl.html5.GL.limeContext.getShaderParameter(shader,pname);
};
lime.gl.html5.GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return null;
};
lime.gl.html5.GL.getShaderSource = function(shader) {
	return lime.gl.html5.GL.limeContext.getShaderSource(shader);
};
lime.gl.html5.GL.getSupportedExtensions = function() {
	return null;
};
lime.gl.html5.GL.getTexParameter = function(target,pname) {
	return lime.gl.html5.GL.limeContext.getTexParameter(target,pname);
};
lime.gl.html5.GL.getUniform = function(program,location) {
	return lime.gl.html5.GL.limeContext.getUniform(program,location);
};
lime.gl.html5.GL.getUniformLocation = function(program,name) {
	return lime.gl.html5.GL.limeContext.getUniformLocation(program,name);
};
lime.gl.html5.GL.getVertexAttrib = function(index,pname) {
	return lime.gl.html5.GL.limeContext.getVertexAttrib(index,pname);
};
lime.gl.html5.GL.getVertexAttribOffset = function(index,pname) {
	return lime.gl.html5.GL.limeContext.getVertexAttribOffset(index,pname);
};
lime.gl.html5.GL.hint = function(target,mode) {
	lime.gl.html5.GL.limeContext.hint(target,mode);
};
lime.gl.html5.GL.isBuffer = function(buffer) {
	return lime.gl.html5.GL.limeContext.isBuffer(buffer);
};
lime.gl.html5.GL.isEnabled = function(cap) {
	return lime.gl.html5.GL.limeContext.isEnabled(cap);
};
lime.gl.html5.GL.isFramebuffer = function(framebuffer) {
	return lime.gl.html5.GL.limeContext.isFramebuffer(framebuffer);
};
lime.gl.html5.GL.isProgram = function(program) {
	return lime.gl.html5.GL.limeContext.isProgram(program);
};
lime.gl.html5.GL.isRenderbuffer = function(renderbuffer) {
	return lime.gl.html5.GL.limeContext.isRenderbuffer(renderbuffer);
};
lime.gl.html5.GL.isShader = function(shader) {
	return lime.gl.html5.GL.limeContext.isShader(shader);
};
lime.gl.html5.GL.isTexture = function(texture) {
	return lime.gl.html5.GL.limeContext.isTexture(texture);
};
lime.gl.html5.GL.lineWidth = function(width) {
	lime.gl.html5.GL.limeContext.lineWidth(width);
};
lime.gl.html5.GL.linkProgram = function(program) {
	lime.gl.html5.GL.limeContext.linkProgram(program);
};
lime.gl.html5.GL.pixelStorei = function(pname,param) {
	lime.gl.html5.GL.limeContext.pixelStorei(pname,param);
};
lime.gl.html5.GL.polygonOffset = function(factor,units) {
	lime.gl.html5.GL.limeContext.polygonOffset(factor,units);
};
lime.gl.html5.GL.readPixels = function(x,y,width,height,format,type,pixels) {
	lime.gl.html5.GL.limeContext.readPixels(x,y,width,height,format,type,pixels);
};
lime.gl.html5.GL.renderbufferStorage = function(target,internalformat,width,height) {
	lime.gl.html5.GL.limeContext.renderbufferStorage(target,internalformat,width,height);
};
lime.gl.html5.GL.sampleCoverage = function(value,invert) {
	lime.gl.html5.GL.limeContext.sampleCoverage(value,invert);
};
lime.gl.html5.GL.scissor = function(x,y,width,height) {
	lime.gl.html5.GL.limeContext.scissor(x,y,width,height);
};
lime.gl.html5.GL.shaderSource = function(shader,source) {
	lime.gl.html5.GL.limeContext.shaderSource(shader,source);
};
lime.gl.html5.GL.stencilFunc = function(func,ref,mask) {
	lime.gl.html5.GL.limeContext.stencilFunc(func,ref,mask);
};
lime.gl.html5.GL.stencilFuncSeparate = function(face,func,ref,mask) {
	lime.gl.html5.GL.limeContext.stencilFuncSeparate(face,func,ref,mask);
};
lime.gl.html5.GL.stencilMask = function(mask) {
	lime.gl.html5.GL.limeContext.stencilMask(mask);
};
lime.gl.html5.GL.stencilMaskSeparate = function(face,mask) {
	lime.gl.html5.GL.limeContext.stencilMaskSeparate(face,mask);
};
lime.gl.html5.GL.stencilOp = function(fail,zfail,zpass) {
	lime.gl.html5.GL.limeContext.stencilOp(fail,zfail,zpass);
};
lime.gl.html5.GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	lime.gl.html5.GL.limeContext.stencilOpSeparate(face,fail,zfail,zpass);
};
lime.gl.html5.GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,pixels) {
	lime.gl.html5.GL.limeContext.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
};
lime.gl.html5.GL.texParameterf = function(target,pname,param) {
	lime.gl.html5.GL.limeContext.texParameterf(target,pname,param);
};
lime.gl.html5.GL.texParameteri = function(target,pname,param) {
	lime.gl.html5.GL.limeContext.texParameteri(target,pname,param);
};
lime.gl.html5.GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,pixels) {
	lime.gl.html5.GL.limeContext.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,pixels);
};
lime.gl.html5.GL.uniform1f = function(location,x) {
	lime.gl.html5.GL.limeContext.uniform1f(location,x);
};
lime.gl.html5.GL.uniform1fv = function(location,x) {
	lime.gl.html5.GL.limeContext.uniform1fv(location,x);
};
lime.gl.html5.GL.uniform1i = function(location,x) {
	lime.gl.html5.GL.limeContext.uniform1i(location,x);
};
lime.gl.html5.GL.uniform1iv = function(location,v) {
	lime.gl.html5.GL.limeContext.uniform1iv(location,v);
};
lime.gl.html5.GL.uniform2f = function(location,x,y) {
	lime.gl.html5.GL.limeContext.uniform2f(location,x,y);
};
lime.gl.html5.GL.uniform2fv = function(location,v) {
	lime.gl.html5.GL.limeContext.uniform2fv(location,v);
};
lime.gl.html5.GL.uniform2i = function(location,x,y) {
	lime.gl.html5.GL.limeContext.uniform2i(location,x,y);
};
lime.gl.html5.GL.uniform2iv = function(location,v) {
	lime.gl.html5.GL.limeContext.uniform2iv(location,v);
};
lime.gl.html5.GL.uniform3f = function(location,x,y,z) {
	lime.gl.html5.GL.limeContext.uniform3f(location,x,y,z);
};
lime.gl.html5.GL.uniform3fv = function(location,v) {
	lime.gl.html5.GL.limeContext.uniform3fv(location,v);
};
lime.gl.html5.GL.uniform3i = function(location,x,y,z) {
	lime.gl.html5.GL.limeContext.uniform3i(location,x,y,z);
};
lime.gl.html5.GL.uniform3iv = function(location,v) {
	lime.gl.html5.GL.limeContext.uniform3iv(location,v);
};
lime.gl.html5.GL.uniform4f = function(location,x,y,z,w) {
	lime.gl.html5.GL.limeContext.uniform4f(location,x,y,z,w);
};
lime.gl.html5.GL.uniform4fv = function(location,v) {
	lime.gl.html5.GL.limeContext.uniform4fv(location,v);
};
lime.gl.html5.GL.uniform4i = function(location,x,y,z,w) {
	lime.gl.html5.GL.limeContext.uniform4i(location,x,y,z,w);
};
lime.gl.html5.GL.uniform4iv = function(location,v) {
	lime.gl.html5.GL.limeContext.uniform4iv(location,v);
};
lime.gl.html5.GL.uniformMatrix2fv = function(location,transpose,v) {
	lime.gl.html5.GL.limeContext.uniformMatrix2fv(location,transpose,v);
};
lime.gl.html5.GL.uniformMatrix3fv = function(location,transpose,v) {
	lime.gl.html5.GL.limeContext.uniformMatrix3fv(location,transpose,v);
};
lime.gl.html5.GL.uniformMatrix4fv = function(location,transpose,v) {
	lime.gl.html5.GL.limeContext.uniformMatrix4fv(location,transpose,v);
};
lime.gl.html5.GL.uniformMatrix3D = function(location,transpose,matrix) {
	lime.gl.html5.GL.limeContext.uniformMatrix4fv(location,transpose,new Float32Array(matrix.rawData));
};
lime.gl.html5.GL.useProgram = function(program) {
	lime.gl.html5.GL.limeContext.useProgram(program);
};
lime.gl.html5.GL.validateProgram = function(program) {
	lime.gl.html5.GL.limeContext.validateProgram(program);
};
lime.gl.html5.GL.vertexAttrib1f = function(indx,x) {
	lime.gl.html5.GL.limeContext.vertexAttrib1f(indx,x);
};
lime.gl.html5.GL.vertexAttrib1fv = function(indx,values) {
	lime.gl.html5.GL.limeContext.vertexAttrib1fv(indx,values);
};
lime.gl.html5.GL.vertexAttrib2f = function(indx,x,y) {
	lime.gl.html5.GL.limeContext.vertexAttrib2f(indx,x,y);
};
lime.gl.html5.GL.vertexAttrib2fv = function(indx,values) {
	lime.gl.html5.GL.limeContext.vertexAttrib2fv(indx,values);
};
lime.gl.html5.GL.vertexAttrib3f = function(indx,x,y,z) {
	lime.gl.html5.GL.limeContext.vertexAttrib3f(indx,x,y,z);
};
lime.gl.html5.GL.vertexAttrib3fv = function(indx,values) {
	lime.gl.html5.GL.limeContext.vertexAttrib3fv(indx,values);
};
lime.gl.html5.GL.vertexAttrib4f = function(indx,x,y,z,w) {
	lime.gl.html5.GL.limeContext.vertexAttrib4f(indx,x,y,z,w);
};
lime.gl.html5.GL.vertexAttrib4fv = function(indx,values) {
	lime.gl.html5.GL.limeContext.vertexAttrib4fv(indx,values);
};
lime.gl.html5.GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	lime.gl.html5.GL.limeContext.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
lime.gl.html5.GL.viewport = function(x,y,width,height) {
	lime.gl.html5.GL.limeContext.viewport(x,y,width,height);
};
lime.gl.html5.GL.get_drawingBufferHeight = function() {
	return 640;
};
lime.gl.html5.GL.get_drawingBufferWidth = function() {
	return 960;
};
lime.gl.html5.GL.get_version = function() {
	return 7938;
};
lime.helpers = {};
lime.helpers.Sound = function(_name,_handle,_music,_sound) {
	if(_music == null) _music = false;
	this.plays_remain = 0;
	this.plays_total = 0;
	this.position = 0.0;
	this.pan = 0.0;
	this.volume = 1.0;
	this.ismusic = false;
	this.playing = false;
	this.looping = false;
	this.name = _name;
	this.handle = _handle;
	this.channel = _sound;
	this.ismusic = _music;
	this.transform = new lime.helpers.SoundTransform(this.volume,this.pan);
};
$hxClasses["lime.helpers.Sound"] = lime.helpers.Sound;
lime.helpers.Sound.__name__ = true;
lime.helpers.Sound.prototype = {
	play: function(_number_of_times,_start) {
		if(_start == null) _start = 0.0;
		if(_number_of_times == null) _number_of_times = 1;
		var _g = this;
		this.plays_total = _number_of_times;
		this.plays_remain = _number_of_times;
		if(_number_of_times == 0) return;
		if(_number_of_times == -1) this.looping = true;
		this.playing = true;
		lime.helpers.html5.AudioHelper.soundManager.play(this.name,{ onfinish : function() {
			_g.do_on_complete();
		}});
	}
	,stop: function() {
		this.playing = false;
		this.looping = false;
		lime.helpers.html5.AudioHelper.soundManager.stop(this.name);
	}
	,do_on_complete: function() {
		if(this.looping) {
			this.play();
			return;
		}
		if(!this.looping) {
			this.plays_remain--;
			if(this.plays_remain > 0) {
				this.play(this.plays_remain);
				return;
			}
		}
		this.playing = false;
		this.channel = null;
		if(this.on_complete_handler != null) this.on_complete_handler(this);
	}
	,on_complete: function(_function) {
		this.on_complete_handler = _function;
	}
	,do_check_complete: function() {
		return false;
	}
	,check_complete: function() {
		if(this.do_check_complete()) {
			this.do_on_complete();
			return true;
		}
		return false;
	}
	,set_volume: function(_v) {
		this.transform.volume = _v;
		lime.helpers.html5.AudioHelper.soundManager.setVolume(this.name,_v * 100);
		return this.volume = _v;
	}
	,set_pan: function(_p) {
		this.transform.pan = _p;
		lime.helpers.html5.AudioHelper.soundManager.setPan(this.name,_p * 100);
		return this.pan = _p;
	}
	,set_position: function(_p) {
		lime.helpers.html5.AudioHelper.soundManager.setPosition(this.name,_p);
		return this.position = _p;
	}
	,get_position: function() {
		this.set_position(this.handle.position);
		return this.position;
	}
	,__class__: lime.helpers.Sound
};
lime.helpers.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0.0;
	if(vol == null) vol = 1.0;
	this.volume = vol;
	this.pan = panning;
};
$hxClasses["lime.helpers.SoundTransform"] = lime.helpers.SoundTransform;
lime.helpers.SoundTransform.__name__ = true;
lime.helpers.SoundTransform.prototype = {
	clone: function() {
		return new lime.helpers.SoundTransform(this.volume,this.pan);
	}
	,__class__: lime.helpers.SoundTransform
};
lime.helpers.KeyValue = $hxClasses["lime.helpers.KeyValue"] = { __ename__ : true, __constructs__ : ["unknown","backspace","tab","enter","meta","shift","ctrl","alt","capslock","escape","space","left","up","right","down","key_0","key_1","key_2","key_3","key_4","key_5","key_6","key_7","key_8","key_9","key_A","key_B","key_C","key_D","key_E","key_F","key_G","key_H","key_I","key_J","key_K","key_L","key_M","key_N","key_O","key_P","key_Q","key_R","key_S","key_T","key_U","key_V","key_W","key_X","key_Y","key_Z","equals","minus","tilde","forward_slash","back_slash","semicolon","single_quote","comma","period","open_square_brace","close_square_brace","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12","f13","f14","f15"] };
lime.helpers.KeyValue.unknown = ["unknown",0];
lime.helpers.KeyValue.unknown.toString = $estr;
lime.helpers.KeyValue.unknown.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.backspace = ["backspace",1];
lime.helpers.KeyValue.backspace.toString = $estr;
lime.helpers.KeyValue.backspace.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.tab = ["tab",2];
lime.helpers.KeyValue.tab.toString = $estr;
lime.helpers.KeyValue.tab.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.enter = ["enter",3];
lime.helpers.KeyValue.enter.toString = $estr;
lime.helpers.KeyValue.enter.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.meta = ["meta",4];
lime.helpers.KeyValue.meta.toString = $estr;
lime.helpers.KeyValue.meta.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.shift = ["shift",5];
lime.helpers.KeyValue.shift.toString = $estr;
lime.helpers.KeyValue.shift.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.ctrl = ["ctrl",6];
lime.helpers.KeyValue.ctrl.toString = $estr;
lime.helpers.KeyValue.ctrl.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.alt = ["alt",7];
lime.helpers.KeyValue.alt.toString = $estr;
lime.helpers.KeyValue.alt.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.capslock = ["capslock",8];
lime.helpers.KeyValue.capslock.toString = $estr;
lime.helpers.KeyValue.capslock.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.escape = ["escape",9];
lime.helpers.KeyValue.escape.toString = $estr;
lime.helpers.KeyValue.escape.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.space = ["space",10];
lime.helpers.KeyValue.space.toString = $estr;
lime.helpers.KeyValue.space.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.left = ["left",11];
lime.helpers.KeyValue.left.toString = $estr;
lime.helpers.KeyValue.left.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.up = ["up",12];
lime.helpers.KeyValue.up.toString = $estr;
lime.helpers.KeyValue.up.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.right = ["right",13];
lime.helpers.KeyValue.right.toString = $estr;
lime.helpers.KeyValue.right.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.down = ["down",14];
lime.helpers.KeyValue.down.toString = $estr;
lime.helpers.KeyValue.down.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_0 = ["key_0",15];
lime.helpers.KeyValue.key_0.toString = $estr;
lime.helpers.KeyValue.key_0.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_1 = ["key_1",16];
lime.helpers.KeyValue.key_1.toString = $estr;
lime.helpers.KeyValue.key_1.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_2 = ["key_2",17];
lime.helpers.KeyValue.key_2.toString = $estr;
lime.helpers.KeyValue.key_2.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_3 = ["key_3",18];
lime.helpers.KeyValue.key_3.toString = $estr;
lime.helpers.KeyValue.key_3.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_4 = ["key_4",19];
lime.helpers.KeyValue.key_4.toString = $estr;
lime.helpers.KeyValue.key_4.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_5 = ["key_5",20];
lime.helpers.KeyValue.key_5.toString = $estr;
lime.helpers.KeyValue.key_5.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_6 = ["key_6",21];
lime.helpers.KeyValue.key_6.toString = $estr;
lime.helpers.KeyValue.key_6.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_7 = ["key_7",22];
lime.helpers.KeyValue.key_7.toString = $estr;
lime.helpers.KeyValue.key_7.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_8 = ["key_8",23];
lime.helpers.KeyValue.key_8.toString = $estr;
lime.helpers.KeyValue.key_8.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_9 = ["key_9",24];
lime.helpers.KeyValue.key_9.toString = $estr;
lime.helpers.KeyValue.key_9.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_A = ["key_A",25];
lime.helpers.KeyValue.key_A.toString = $estr;
lime.helpers.KeyValue.key_A.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_B = ["key_B",26];
lime.helpers.KeyValue.key_B.toString = $estr;
lime.helpers.KeyValue.key_B.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_C = ["key_C",27];
lime.helpers.KeyValue.key_C.toString = $estr;
lime.helpers.KeyValue.key_C.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_D = ["key_D",28];
lime.helpers.KeyValue.key_D.toString = $estr;
lime.helpers.KeyValue.key_D.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_E = ["key_E",29];
lime.helpers.KeyValue.key_E.toString = $estr;
lime.helpers.KeyValue.key_E.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_F = ["key_F",30];
lime.helpers.KeyValue.key_F.toString = $estr;
lime.helpers.KeyValue.key_F.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_G = ["key_G",31];
lime.helpers.KeyValue.key_G.toString = $estr;
lime.helpers.KeyValue.key_G.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_H = ["key_H",32];
lime.helpers.KeyValue.key_H.toString = $estr;
lime.helpers.KeyValue.key_H.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_I = ["key_I",33];
lime.helpers.KeyValue.key_I.toString = $estr;
lime.helpers.KeyValue.key_I.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_J = ["key_J",34];
lime.helpers.KeyValue.key_J.toString = $estr;
lime.helpers.KeyValue.key_J.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_K = ["key_K",35];
lime.helpers.KeyValue.key_K.toString = $estr;
lime.helpers.KeyValue.key_K.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_L = ["key_L",36];
lime.helpers.KeyValue.key_L.toString = $estr;
lime.helpers.KeyValue.key_L.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_M = ["key_M",37];
lime.helpers.KeyValue.key_M.toString = $estr;
lime.helpers.KeyValue.key_M.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_N = ["key_N",38];
lime.helpers.KeyValue.key_N.toString = $estr;
lime.helpers.KeyValue.key_N.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_O = ["key_O",39];
lime.helpers.KeyValue.key_O.toString = $estr;
lime.helpers.KeyValue.key_O.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_P = ["key_P",40];
lime.helpers.KeyValue.key_P.toString = $estr;
lime.helpers.KeyValue.key_P.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_Q = ["key_Q",41];
lime.helpers.KeyValue.key_Q.toString = $estr;
lime.helpers.KeyValue.key_Q.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_R = ["key_R",42];
lime.helpers.KeyValue.key_R.toString = $estr;
lime.helpers.KeyValue.key_R.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_S = ["key_S",43];
lime.helpers.KeyValue.key_S.toString = $estr;
lime.helpers.KeyValue.key_S.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_T = ["key_T",44];
lime.helpers.KeyValue.key_T.toString = $estr;
lime.helpers.KeyValue.key_T.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_U = ["key_U",45];
lime.helpers.KeyValue.key_U.toString = $estr;
lime.helpers.KeyValue.key_U.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_V = ["key_V",46];
lime.helpers.KeyValue.key_V.toString = $estr;
lime.helpers.KeyValue.key_V.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_W = ["key_W",47];
lime.helpers.KeyValue.key_W.toString = $estr;
lime.helpers.KeyValue.key_W.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_X = ["key_X",48];
lime.helpers.KeyValue.key_X.toString = $estr;
lime.helpers.KeyValue.key_X.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_Y = ["key_Y",49];
lime.helpers.KeyValue.key_Y.toString = $estr;
lime.helpers.KeyValue.key_Y.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.key_Z = ["key_Z",50];
lime.helpers.KeyValue.key_Z.toString = $estr;
lime.helpers.KeyValue.key_Z.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.equals = ["equals",51];
lime.helpers.KeyValue.equals.toString = $estr;
lime.helpers.KeyValue.equals.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.minus = ["minus",52];
lime.helpers.KeyValue.minus.toString = $estr;
lime.helpers.KeyValue.minus.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.tilde = ["tilde",53];
lime.helpers.KeyValue.tilde.toString = $estr;
lime.helpers.KeyValue.tilde.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.forward_slash = ["forward_slash",54];
lime.helpers.KeyValue.forward_slash.toString = $estr;
lime.helpers.KeyValue.forward_slash.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.back_slash = ["back_slash",55];
lime.helpers.KeyValue.back_slash.toString = $estr;
lime.helpers.KeyValue.back_slash.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.semicolon = ["semicolon",56];
lime.helpers.KeyValue.semicolon.toString = $estr;
lime.helpers.KeyValue.semicolon.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.single_quote = ["single_quote",57];
lime.helpers.KeyValue.single_quote.toString = $estr;
lime.helpers.KeyValue.single_quote.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.comma = ["comma",58];
lime.helpers.KeyValue.comma.toString = $estr;
lime.helpers.KeyValue.comma.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.period = ["period",59];
lime.helpers.KeyValue.period.toString = $estr;
lime.helpers.KeyValue.period.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.open_square_brace = ["open_square_brace",60];
lime.helpers.KeyValue.open_square_brace.toString = $estr;
lime.helpers.KeyValue.open_square_brace.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.close_square_brace = ["close_square_brace",61];
lime.helpers.KeyValue.close_square_brace.toString = $estr;
lime.helpers.KeyValue.close_square_brace.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f1 = ["f1",62];
lime.helpers.KeyValue.f1.toString = $estr;
lime.helpers.KeyValue.f1.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f2 = ["f2",63];
lime.helpers.KeyValue.f2.toString = $estr;
lime.helpers.KeyValue.f2.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f3 = ["f3",64];
lime.helpers.KeyValue.f3.toString = $estr;
lime.helpers.KeyValue.f3.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f4 = ["f4",65];
lime.helpers.KeyValue.f4.toString = $estr;
lime.helpers.KeyValue.f4.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f5 = ["f5",66];
lime.helpers.KeyValue.f5.toString = $estr;
lime.helpers.KeyValue.f5.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f6 = ["f6",67];
lime.helpers.KeyValue.f6.toString = $estr;
lime.helpers.KeyValue.f6.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f7 = ["f7",68];
lime.helpers.KeyValue.f7.toString = $estr;
lime.helpers.KeyValue.f7.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f8 = ["f8",69];
lime.helpers.KeyValue.f8.toString = $estr;
lime.helpers.KeyValue.f8.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f9 = ["f9",70];
lime.helpers.KeyValue.f9.toString = $estr;
lime.helpers.KeyValue.f9.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f10 = ["f10",71];
lime.helpers.KeyValue.f10.toString = $estr;
lime.helpers.KeyValue.f10.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f11 = ["f11",72];
lime.helpers.KeyValue.f11.toString = $estr;
lime.helpers.KeyValue.f11.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f12 = ["f12",73];
lime.helpers.KeyValue.f12.toString = $estr;
lime.helpers.KeyValue.f12.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f13 = ["f13",74];
lime.helpers.KeyValue.f13.toString = $estr;
lime.helpers.KeyValue.f13.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f14 = ["f14",75];
lime.helpers.KeyValue.f14.toString = $estr;
lime.helpers.KeyValue.f14.__enum__ = lime.helpers.KeyValue;
lime.helpers.KeyValue.f15 = ["f15",76];
lime.helpers.KeyValue.f15.toString = $estr;
lime.helpers.KeyValue.f15.__enum__ = lime.helpers.KeyValue;
lime.helpers.Keys = function() {
	this.f15 = 126;
	this.f14 = 125;
	this.f13 = 124;
	this.f12 = 123;
	this.f11 = 122;
	this.f10 = 121;
	this.f9 = 120;
	this.f8 = 119;
	this.f7 = 118;
	this.f6 = 117;
	this.f5 = 116;
	this.f4 = 115;
	this.f3 = 114;
	this.f2 = 113;
	this.f1 = 112;
	this.close_square_brace = 221;
	this.open_square_brace = 219;
	this.period = 190;
	this.comma = 188;
	this.single_quote = 222;
	this.semicolon = 186;
	this.back_slash = 220;
	this.forward_slash = 191;
	this.tilde = 192;
	this.minus = 189;
	this.equals = 187;
	this.key_Z = 90;
	this.key_Y = 89;
	this.key_X = 88;
	this.key_W = 87;
	this.key_V = 86;
	this.key_U = 85;
	this.key_T = 84;
	this.key_S = 83;
	this.key_R = 82;
	this.key_Q = 81;
	this.key_P = 80;
	this.key_O = 79;
	this.key_N = 78;
	this.key_M = 77;
	this.key_L = 76;
	this.key_K = 75;
	this.key_J = 74;
	this.key_I = 73;
	this.key_H = 72;
	this.key_G = 71;
	this.key_F = 70;
	this.key_E = 69;
	this.key_D = 68;
	this.key_C = 67;
	this.key_B = 66;
	this.key_A = 65;
	this.key_9 = 57;
	this.key_8 = 56;
	this.key_7 = 55;
	this.key_6 = 54;
	this.key_5 = 53;
	this.key_4 = 52;
	this.key_3 = 51;
	this.key_2 = 50;
	this.key_1 = 49;
	this.key_0 = 48;
	this.down = 40;
	this.right = 39;
	this.up = 38;
	this.left = 37;
	this.space = 32;
	this.escape = 27;
	this.capslock = 20;
	this.alt = 18;
	this.ctrl = 17;
	this.shift = 16;
	this.meta = 15;
	this.enter = 13;
	this.tab = 9;
};
$hxClasses["lime.helpers.Keys"] = lime.helpers.Keys;
lime.helpers.Keys.__name__ = true;
lime.helpers.Keys.toKeyValue = function(_event) {
	var _value = _event.value;
	switch(_value) {
	case 8:
		return lime.helpers.KeyValue.backspace;
	case 9:
		return lime.helpers.KeyValue.tab;
	case 13:
		return lime.helpers.KeyValue.enter;
	case 15:
		return lime.helpers.KeyValue.meta;
	case 16:
		return lime.helpers.KeyValue.shift;
	case 17:
		return lime.helpers.KeyValue.ctrl;
	case 18:
		return lime.helpers.KeyValue.alt;
	case 20:
		return lime.helpers.KeyValue.capslock;
	case 27:
		return lime.helpers.KeyValue.escape;
	case 32:
		return lime.helpers.KeyValue.space;
	case 37:
		return lime.helpers.KeyValue.left;
	case 38:
		return lime.helpers.KeyValue.up;
	case 39:
		return lime.helpers.KeyValue.right;
	case 40:
		return lime.helpers.KeyValue.down;
	case 48:
		return lime.helpers.KeyValue.key_0;
	case 49:
		return lime.helpers.KeyValue.key_1;
	case 50:
		return lime.helpers.KeyValue.key_2;
	case 51:
		return lime.helpers.KeyValue.key_3;
	case 52:
		return lime.helpers.KeyValue.key_4;
	case 53:
		return lime.helpers.KeyValue.key_5;
	case 54:
		return lime.helpers.KeyValue.key_6;
	case 55:
		return lime.helpers.KeyValue.key_7;
	case 56:
		return lime.helpers.KeyValue.key_8;
	case 57:
		return lime.helpers.KeyValue.key_9;
	case 65:
		return lime.helpers.KeyValue.key_A;
	case 66:
		return lime.helpers.KeyValue.key_B;
	case 67:
		return lime.helpers.KeyValue.key_C;
	case 68:
		return lime.helpers.KeyValue.key_D;
	case 69:
		return lime.helpers.KeyValue.key_E;
	case 70:
		return lime.helpers.KeyValue.key_F;
	case 71:
		return lime.helpers.KeyValue.key_G;
	case 72:
		return lime.helpers.KeyValue.key_H;
	case 73:
		return lime.helpers.KeyValue.key_I;
	case 74:
		return lime.helpers.KeyValue.key_J;
	case 75:
		return lime.helpers.KeyValue.key_K;
	case 76:
		return lime.helpers.KeyValue.key_L;
	case 77:
		return lime.helpers.KeyValue.key_M;
	case 78:
		return lime.helpers.KeyValue.key_N;
	case 79:
		return lime.helpers.KeyValue.key_O;
	case 80:
		return lime.helpers.KeyValue.key_P;
	case 81:
		return lime.helpers.KeyValue.key_Q;
	case 82:
		return lime.helpers.KeyValue.key_R;
	case 83:
		return lime.helpers.KeyValue.key_S;
	case 84:
		return lime.helpers.KeyValue.key_T;
	case 85:
		return lime.helpers.KeyValue.key_U;
	case 86:
		return lime.helpers.KeyValue.key_V;
	case 87:
		return lime.helpers.KeyValue.key_W;
	case 88:
		return lime.helpers.KeyValue.key_X;
	case 89:
		return lime.helpers.KeyValue.key_Y;
	case 90:
		return lime.helpers.KeyValue.key_Z;
	case 187:
		return lime.helpers.KeyValue.equals;
	case 189:
		return lime.helpers.KeyValue.minus;
	case 192:
		return lime.helpers.KeyValue.tilde;
	case 191:
		return lime.helpers.KeyValue.forward_slash;
	case 220:
		return lime.helpers.KeyValue.back_slash;
	case 186:
		return lime.helpers.KeyValue.semicolon;
	case 222:
		return lime.helpers.KeyValue.single_quote;
	case 188:
		return lime.helpers.KeyValue.comma;
	case 190:
		return lime.helpers.KeyValue.period;
	case 219:
		return lime.helpers.KeyValue.open_square_brace;
	case 221:
		return lime.helpers.KeyValue.close_square_brace;
	case 112:
		return lime.helpers.KeyValue.f1;
	case 113:
		return lime.helpers.KeyValue.f2;
	case 114:
		return lime.helpers.KeyValue.f3;
	case 115:
		return lime.helpers.KeyValue.f4;
	case 116:
		return lime.helpers.KeyValue.f5;
	case 117:
		return lime.helpers.KeyValue.f6;
	case 118:
		return lime.helpers.KeyValue.f7;
	case 119:
		return lime.helpers.KeyValue.f8;
	case 120:
		return lime.helpers.KeyValue.f9;
	case 121:
		return lime.helpers.KeyValue.f10;
	case 122:
		return lime.helpers.KeyValue.f11;
	case 123:
		return lime.helpers.KeyValue.f12;
	case 124:
		return lime.helpers.KeyValue.f13;
	case 125:
		return lime.helpers.KeyValue.f14;
	case 126:
		return lime.helpers.KeyValue.f15;
	}
	return lime.helpers.KeyValue.unknown;
};
lime.helpers.Keys.prototype = {
	__class__: lime.helpers.Keys
};
lime.helpers.html5 = {};
lime.helpers.html5.AudioHelper = function(_lib) {
	this.ready = false;
	this.lib = _lib;
};
$hxClasses["lime.helpers.html5.AudioHelper"] = lime.helpers.html5.AudioHelper;
lime.helpers.html5.AudioHelper.__name__ = true;
lime.helpers.html5.AudioHelper.prototype = {
	startup: function() {
		var _g = this;
		lime.helpers.html5.AudioHelper.soundManager = window.soundManager;
		if(lime.helpers.html5.AudioHelper.soundManager != null) lime.helpers.html5.AudioHelper.soundManager.setup({ url : "./lib/soundmanager/swf/", flashVersion : 9, debugMode : false, preferFlash : true, onready : function() {
			_g.ready = true;
		}});
	}
	,create: function(_name,_file,_music) {
		if(_music == null) _music = false;
		var _sound_handle = lime.helpers.html5.AudioHelper.soundManager.createSound({ url : _file, id : _name, autoLoad : true, autoPlay : false, multiShot : !_music, stream : _music});
		return new lime.helpers.Sound(_name,_sound_handle,_music);
	}
	,shutdown: function() {
		lime.helpers.html5.AudioHelper.soundManager.stopAll();
	}
	,update: function() {
	}
	,__class__: lime.helpers.html5.AudioHelper
};
lime.helpers.html5.InputHelper = function(_lib) {
	this.gamepads_supported = false;
	this.lib = _lib;
};
$hxClasses["lime.helpers.html5.InputHelper"] = lime.helpers.html5.InputHelper;
lime.helpers.html5.InputHelper.__name__ = true;
lime.helpers.html5.InputHelper.prototype = {
	startup: function() {
		this.lib.window_handle.addEventListener("contextmenu",$bind(this,this.on_contextmenu));
		this.lib.window_handle.addEventListener("mousedown",$bind(this,this.on_mousedown));
		this.lib.window_handle.addEventListener("mousemove",$bind(this,this.on_mousemove));
		this.lib.window_handle.addEventListener("mouseup",$bind(this,this.on_mouseup));
		this.lib.window_handle.addEventListener("mousewheel",$bind(this,this.on_mousewheel));
		this.lib.window_handle.addEventListener("DOMMouseScroll",$bind(this,this.on_mousewheel));
		window.document.addEventListener("keydown",$bind(this,this.on_keydown));
		window.document.addEventListener("keyup",$bind(this,this.on_keyup));
		this.startup_gamepads();
	}
	,update: function() {
		if(this.gamepads_supported) this.poll_gamepads();
	}
	,fail_gamepads: function() {
		this.gamepads_supported = false;
		haxe.Log.trace("lime : Gamepads are not supported in this browser :(",{ fileName : "InputHelper.hx", lineNumber : 55, className : "lime.helpers.html5.InputHelper", methodName : "fail_gamepads"});
	}
	,startup_gamepads: function() {
		this.active_gamepads = new haxe.ds.IntMap();
		this.gamepads_supported = $bind(this,this.get_gamepad_list) != null;
	}
	,poll_gamepads: function() {
		var list = this.get_gamepad_list();
		if(list != null) {
			var _g1 = 0;
			var _g = list.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(list[i] != null) this.handle_gamepad(list[i]);
			}
		}
	}
	,handle_gamepad: function(_gamepad) {
		if(_gamepad == null) return;
		if(!(function($this) {
			var $r;
			var key = _gamepad.index;
			$r = $this.active_gamepads.exists(key);
			return $r;
		}(this))) {
			var key1 = _gamepad.index;
			this.active_gamepads.set(key1,{ id : _gamepad.id, index : _gamepad.index, axes : _gamepad.axes, buttons : _gamepad.buttons, timestamp : _gamepad.timestamp});
		} else {
			var gamepad;
			var key2 = _gamepad.index;
			gamepad = this.active_gamepads.get(key2);
			if(gamepad.timestamp != _gamepad.timestamp) {
				if(gamepad.id != _gamepad.id) gamepad.id = _gamepad.id;
				gamepad.timestamp = _gamepad.timestamp;
				var axes_changed = [];
				var buttons_changed = [];
				var last_axes = gamepad.axes;
				var last_buttons = gamepad.buttons;
				var new_axes = _gamepad.axes;
				var new_buttons = _gamepad.buttons;
				var axis_index = 0;
				var _g = 0;
				while(_g < new_axes.length) {
					var axis = new_axes[_g];
					++_g;
					if(axis != last_axes[axis_index]) {
						axes_changed.push(axis_index);
						gamepad.axes[axis_index] = axis;
					}
					axis_index++;
				}
				var button_index = 0;
				var _g1 = 0;
				while(_g1 < new_buttons.length) {
					var button = new_buttons[_g1];
					++_g1;
					if(button != last_buttons[button_index]) {
						buttons_changed.push(button_index);
						gamepad.buttons[button_index] = button;
					}
					button_index++;
				}
				var _g2 = 0;
				while(_g2 < axes_changed.length) {
					var index = axes_changed[_g2];
					++_g2;
					this.lib.input.lime_gamepadaxis({ raw : gamepad, axis : index, value : new_axes[index], gamepad : gamepad.index},true);
				}
				var _g3 = 0;
				while(_g3 < buttons_changed.length) {
					var index1 = buttons_changed[_g3];
					++_g3;
					var _state;
					if(new_buttons[index1] == 0) _state = lime.ButtonState.up; else _state = lime.ButtonState.down;
					var _gamepad_event = { raw : gamepad, state : _state, value : new_buttons[index1], button : index1, gamepad : gamepad.index};
					if(_state == lime.ButtonState.up) this.lib.input.lime_gamepadbuttonup(_gamepad_event,true); else this.lib.input.lime_gamepadbuttondown(_gamepad_event,true);
				}
			}
		}
	}
	,get_gamepad_list: function() {
		var modernizr = window.Modernizr;
		if(modernizr != null) {
			if(modernizr.gamepads == true) {
				if(($_=window.navigator,$bind($_,$_.getGamepads)) != null) return window.navigator.getGamepads();
				if(window.navigator.webkitGetGamepads != null) return window.navigator.webkitGetGamepads();
				this.fail_gamepads();
			} else this.fail_gamepads();
		}
		return null;
	}
	,on_contextmenu: function(_event) {
		_event.preventDefault();
	}
	,translate_wheel_direction: function(_event) {
		var detail = _event.detail;
		var wheelDelta = _event.wheelDelta;
		if(detail != null && detail != 0) return detail;
		if(wheelDelta != null && wheelDelta != 0) return wheelDelta;
		return 0;
	}
	,on_mousewheel: function(_event) {
		_event.preventDefault();
		var direction = this.translate_wheel_direction(_event);
		var delta = Math.max(-1,Math.min(1,direction));
		var wheel_dir;
		if(delta < 1) wheel_dir = lime.MouseButton.wheel_up; else wheel_dir = lime.MouseButton.wheel_down;
		this.lib.input.lime_mousewheel({ raw : _event, button : wheel_dir, state : lime.MouseState.wheel, x : _event.pageX - this.lib.render.canvas_position.x, y : _event.pageY - this.lib.render.canvas_position.y, flags : 0, ctrl_down : _event.ctrlKey, alt_down : _event.altKey, shift_down : _event.shiftKey, meta_down : _event.metaKey},true);
	}
	,on_mousedown: function(_event) {
		_event.preventDefault();
		this.lib.input.lime_mousedown({ raw : _event, button : this.lib.input.mouse_button_from_id(_event.button), state : lime.MouseState.down, x : _event.pageX - this.lib.render.canvas_position.x, y : _event.pageY - this.lib.render.canvas_position.y, flags : 0, ctrl_down : _event.ctrlKey, alt_down : _event.altKey, shift_down : _event.shiftKey, meta_down : _event.metaKey},true);
	}
	,on_mousemove: function(_event) {
		var deltaX = _event.movementX;
		var deltaY = _event.movementY;
		var _g = this.lib.render.browser;
		switch(_g[1]) {
		case 1:case 5:case 3:
			deltaX = _event.webkitMovementX;
			deltaY = _event.webkitMovementY;
			break;
		case 2:
			deltaX = _event.mozMovementX;
			deltaY = _event.mozMovementY;
			break;
		case 4:
			break;
		default:
			deltaX = 0;
			deltaY = 0;
		}
		_event.preventDefault();
		this.lib.input.lime_mousemove({ raw : _event, button : lime.MouseButton.move, state : lime.MouseState.move, x : _event.pageX - this.lib.render.canvas_position.x, y : _event.pageY - this.lib.render.canvas_position.y, deltaX : deltaX, deltaY : deltaY, flags : 0, ctrl_down : _event.ctrlKey, alt_down : _event.altKey, shift_down : _event.shiftKey, meta_down : _event.metaKey},true);
	}
	,on_mouseup: function(_event) {
		_event.preventDefault();
		this.lib.input.lime_mouseup({ raw : _event, button : this.lib.input.mouse_button_from_id(_event.button), state : lime.MouseState.up, x : _event.pageX - this.lib.render.canvas_position.x, y : _event.pageY - this.lib.render.canvas_position.y, flags : 0, ctrl_down : _event.ctrlKey, alt_down : _event.altKey, shift_down : _event.shiftKey, meta_down : _event.metaKey},true);
	}
	,on_keydown: function(_event) {
		if(_event.keyCode >= 65 && _event.keyCode <= 122) _event.value = _event.which; else _event.value = _event.which;
		this.lib.input.lime_onkeydown(_event);
	}
	,on_keyup: function(_event) {
		if(_event.keyCode >= 65 && _event.keyCode <= 122) _event.value = _event.which; else _event.value = _event.which;
		this.lib.input.lime_onkeyup(_event);
	}
	,__class__: lime.helpers.html5.InputHelper
};
lime.utils = {};
lime.utils.Assets = function() { };
$hxClasses["lime.utils.Assets"] = lime.utils.Assets;
lime.utils.Assets.__name__ = true;
lime.utils.Assets.initialize = function() {
	if(!lime.utils.Assets.initialized) {
		lime.AssetData.initialize();
		lime.utils.Assets.initialized = true;
	}
};
lime.utils.Assets.getBytes = function(id) {
	lime.utils.Assets.initialize();
	if(lime.AssetData.type.exists(id)) {
		var req = new haxe.Http(id);
		var results = null;
		req.async = false;
		req.onData = function(e) {
			results = e;
		};
		req.request();
		req = null;
		var len = results.length;
		var bytearray = new lime.utils.html5.ByteArray();
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			bytearray.writeByte(results.charCodeAt(i));
		}
		bytearray.position = 0;
		return bytearray;
	} else haxe.Log.trace("[lime.utils.Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 99, className : "lime.utils.Assets", methodName : "getBytes"});
	return null;
};
lime.utils.Assets.getText = function(id) {
	var req = new haxe.Http(id);
	var results;
	req.async = false;
	req.onData = function(e) {
		results = e;
	};
	req.request();
	req = null;
	return results;
};
lime.utils.Assets.resolveClass = function(name) {
	name = StringTools.replace(name,"native.","browser.");
	return Type.resolveClass(name);
};
lime.utils.Assets.resolveEnum = function(name) {
	name = StringTools.replace(name,"native.","browser.");
	return Type.resolveEnum(name);
};
lime.utils.Assets.get_id = function() {
	lime.utils.Assets.initialize();
	var ids = [];
	var $it0 = lime.AssetData.type.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		ids.push(key);
	}
	return ids;
};
lime.utils.Assets.get_library = function() {
	lime.utils.Assets.initialize();
	return lime.AssetData.library;
};
lime.utils.Assets.get_path = function() {
	lime.utils.Assets.initialize();
	return lime.AssetData.path;
};
lime.utils.Assets.get_type = function() {
	lime.utils.Assets.initialize();
	return lime.AssetData.type;
};
lime.utils.AssetType = $hxClasses["lime.utils.AssetType"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT"] };
lime.utils.AssetType.BINARY = ["BINARY",0];
lime.utils.AssetType.BINARY.toString = $estr;
lime.utils.AssetType.BINARY.__enum__ = lime.utils.AssetType;
lime.utils.AssetType.TEXT = ["TEXT",1];
lime.utils.AssetType.TEXT.toString = $estr;
lime.utils.AssetType.TEXT.__enum__ = lime.utils.AssetType;
lime.utils.LibraryType = $hxClasses["lime.utils.LibraryType"] = { __ename__ : true, __constructs__ : ["SWF"] };
lime.utils.LibraryType.SWF = ["SWF",0];
lime.utils.LibraryType.SWF.toString = $estr;
lime.utils.LibraryType.SWF.__enum__ = lime.utils.LibraryType;
lime.utils.Endian = function() { };
$hxClasses["lime.utils.Endian"] = lime.utils.Endian;
lime.utils.Endian.__name__ = true;
lime.utils.Libs = function() { };
$hxClasses["lime.utils.Libs"] = lime.utils.Libs;
lime.utils.Libs.__name__ = true;
lime.utils.Libs.tryLoad = function(name,library,func,args) {
	return null;
};
lime.utils.Libs.findHaxeLib = function(library) {
	try {
	} catch( e ) {
	}
	return "";
};
lime.utils.Libs.sysName = function() {
	return "Lime_Browser_WebGL";
};
lime.utils.Libs.html5_add_lib = function(library,root) {
	if(lime.utils.Libs._html5_libs == null) lime.utils.Libs._html5_libs = new haxe.ds.StringMap();
	var value = root;
	lime.utils.Libs._html5_libs.set(library,value);
	return true;
};
lime.utils.Libs.html5_lib_load = function(library,method) {
	if(lime.utils.Libs._html5_libs == null) lime.utils.Libs._html5_libs = new haxe.ds.StringMap();
	var _root = lime.utils.Libs._html5_libs.get(library);
	if(_root != null) return Reflect.field(_root,method);
	return null;
};
lime.utils.Libs.load = function(library,method,args) {
	if(args == null) args = 0;
	var found_in_html5_libs = lime.utils.Libs.html5_lib_load(library,method);
	if(found_in_html5_libs) return found_in_html5_libs;
	if(lime.utils.Libs.__moduleNames == null) lime.utils.Libs.__moduleNames = new haxe.ds.StringMap();
	if(lime.utils.Libs.__moduleNames.exists(library)) {
	}
	lime.utils.Libs.__moduleNames.set(library,library);
	var result = lime.utils.Libs.tryLoad("./" + library,library,method,args);
	if(result == null) result = lime.utils.Libs.tryLoad(".\\" + library,library,method,args);
	if(result == null) result = lime.utils.Libs.tryLoad(library,library,method,args);
	if(result == null) {
		var slash;
		if(((function($this) {
			var $r;
			var _this = lime.utils.Libs.sysName();
			$r = HxOverrides.substr(_this,7,null);
			return $r;
		}(this))).toLowerCase() == "windows") slash = "\\"; else slash = "/";
		var haxelib = lime.utils.Libs.findHaxeLib("lime");
		if(haxelib != "") {
			result = lime.utils.Libs.tryLoad(haxelib + slash + "ndll" + slash + lime.utils.Libs.sysName() + slash + library,library,method,args);
			if(result == null) result = lime.utils.Libs.tryLoad(haxelib + slash + "ndll" + slash + lime.utils.Libs.sysName() + "64" + slash + library,library,method,args);
		}
	}
	lime.utils.Libs.loaderTrace("Result : " + Std.string(result));
	return result;
};
lime.utils.Libs.loaderTrace = function(message) {
};
lime.utils.Matrix3D = function(v) {
	if(v != null && lime.utils._Vector.Vector_Impl_.get_length(v) == 16) this.rawData = v; else this.rawData = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
};
$hxClasses["lime.utils.Matrix3D"] = lime.utils.Matrix3D;
lime.utils.Matrix3D.__name__ = true;
lime.utils.Matrix3D.create2D = function(x,y,scale,rotation) {
	if(rotation == null) rotation = 0;
	if(scale == null) scale = 1;
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return new lime.utils.Matrix3D([c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1]);
};
lime.utils.Matrix3D.createABCD = function(a,b,c,d,tx,ty) {
	return new lime.utils.Matrix3D([a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1]);
};
lime.utils.Matrix3D.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return new lime.utils.Matrix3D([2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2. * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1]);
};
lime.utils.Matrix3D.getAxisRotation = function(x,y,z,degrees) {
	var m = new lime.utils.Matrix3D();
	var a1 = new lime.utils.Vector3D(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	m.rawData[0] = c + a1.x * a1.x * t;
	m.rawData[5] = c + a1.y * a1.y * t;
	m.rawData[10] = c + a1.z * a1.z * t;
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	m.rawData[4] = tmp1 + tmp2;
	m.rawData[1] = tmp1 - tmp2;
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	m.rawData[8] = tmp1 - tmp2;
	m.rawData[2] = tmp1 + tmp2;
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	m.rawData[9] = tmp1 + tmp2;
	m.rawData[6] = tmp1 - tmp2;
	return m;
};
lime.utils.Matrix3D.interpolate = function(thisMat,toMat,percent) {
	var m = new lime.utils.Matrix3D();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
	}
	return m;
};
lime.utils.Matrix3D.prototype = {
	append: function(lhs) {
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,appendRotation: function(degrees,axis,pivotPoint) {
		var m = lime.utils.Matrix3D.getAxisRotation(axis.x,axis.y,axis.z,degrees);
		if(pivotPoint != null) {
			var p = pivotPoint;
			m.rawData[12] += p.x;
			m.rawData[13] += p.y;
			m.rawData[14] += p.z;
		}
		this.append(m);
	}
	,appendScale: function(xScale,yScale,zScale) {
		this.append(new lime.utils.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]));
	}
	,appendTranslation: function(x,y,z) {
		this.rawData[12] += x;
		this.rawData[13] += y;
		this.rawData[14] += z;
	}
	,clone: function() {
		return new lime.utils.Matrix3D(lime.utils._Vector.Vector_Impl_.copy(this.rawData));
	}
	,decompose: function() {
		var vec = lime.utils._Vector.Vector_Impl_._new();
		var m = new lime.utils.Matrix3D(lime.utils._Vector.Vector_Impl_.copy(this.rawData));
		var mr = m.rawData;
		var pos = new lime.utils.Vector3D(mr[12],mr[13],mr[14]);
		mr[12] = 0;
		mr[13] = 0;
		mr[14] = 0;
		var scale = new lime.utils.Vector3D();
		scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
		scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
		scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
		if(mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0) scale.z = -scale.z;
		mr[0] /= scale.x;
		mr[1] /= scale.x;
		mr[2] /= scale.x;
		mr[4] /= scale.y;
		mr[5] /= scale.y;
		mr[6] /= scale.y;
		mr[8] /= scale.z;
		mr[9] /= scale.z;
		mr[10] /= scale.z;
		var rot = new lime.utils.Vector3D();
		rot.y = Math.asin(-mr[2]);
		var C = Math.cos(rot.y);
		if(C > 0) {
			rot.x = Math.atan2(mr[6],mr[10]);
			rot.z = Math.atan2(mr[1],mr[0]);
		} else {
			rot.z = 0;
			rot.x = Math.atan2(mr[4],mr[5]);
		}
		lime.utils._Vector.Vector_Impl_.push(vec,pos);
		lime.utils._Vector.Vector_Impl_.push(vec,rot);
		lime.utils._Vector.Vector_Impl_.push(vec,scale);
		return vec;
	}
	,deltaTransformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new lime.utils.Vector3D(x * this.rawData[0] + y * this.rawData[1] + z * this.rawData[2] + this.rawData[3],x * this.rawData[4] + y * this.rawData[5] + z * this.rawData[6] + this.rawData[7],x * this.rawData[8] + y * this.rawData[9] + z * this.rawData[10] + this.rawData[11],0);
	}
	,identity: function() {
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;
	}
	,interpolateTo: function(toMat,percent) {
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			this.rawData[i] = this.rawData[i] + (toMat.rawData[i] - this.rawData[i]) * percent;
		}
	}
	,invert: function() {
		var d = -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
		var invertable = Math.abs(d) > 0.00000000001;
		if(invertable) {
			d = -1 / d;
			var m11 = this.rawData[0];
			var m21 = this.rawData[4];
			var m31 = this.rawData[8];
			var m41 = this.rawData[12];
			var m12 = this.rawData[1];
			var m22 = this.rawData[5];
			var m32 = this.rawData[9];
			var m42 = this.rawData[13];
			var m13 = this.rawData[2];
			var m23 = this.rawData[6];
			var m33 = this.rawData[10];
			var m43 = this.rawData[14];
			var m14 = this.rawData[3];
			var m24 = this.rawData[7];
			var m34 = this.rawData[11];
			var m44 = this.rawData[15];
			this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
			this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
			this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
			this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
			this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
			this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
			this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
			this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
			this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
			this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
			this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
			this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
			this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
			this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
			this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
			this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
		}
		return invertable;
	}
	,prepend: function(rhs) {
		var m111 = rhs.rawData[0];
		var m121 = rhs.rawData[4];
		var m131 = rhs.rawData[8];
		var m141 = rhs.rawData[12];
		var m112 = rhs.rawData[1];
		var m122 = rhs.rawData[5];
		var m132 = rhs.rawData[9];
		var m142 = rhs.rawData[13];
		var m113 = rhs.rawData[2];
		var m123 = rhs.rawData[6];
		var m133 = rhs.rawData[10];
		var m143 = rhs.rawData[14];
		var m114 = rhs.rawData[3];
		var m124 = rhs.rawData[7];
		var m134 = rhs.rawData[11];
		var m144 = rhs.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependRotation: function(degrees,axis,pivotPoint) {
		var m = lime.utils.Matrix3D.getAxisRotation(axis.x,axis.y,axis.z,degrees);
		if(pivotPoint != null) {
			var p = pivotPoint;
			m.rawData[12] += p.x;
			m.rawData[13] += p.y;
			m.rawData[14] += p.z;
		}
		this.prepend(m);
	}
	,prependScale: function(xScale,yScale,zScale) {
		this.prepend(new lime.utils.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]));
	}
	,prependTranslation: function(x,y,z) {
		var m = new lime.utils.Matrix3D();
		m.set_position(new lime.utils.Vector3D(x,y,z));
		this.prepend(m);
	}
	,recompose: function(components) {
		if(lime.utils._Vector.Vector_Impl_.get_length(components) < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0) return false;
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;
		this.append(new lime.utils.Matrix3D([components[2].x,0.0,0.0,0.0,0.0,components[2].y,0.0,0.0,0.0,0.0,components[2].z,0.0,0.0,0.0,0.0,1.0]));
		var angle;
		angle = -components[1].x;
		this.append(new lime.utils.Matrix3D((function($this) {
			var $r;
			var a = [1,0,0,0,0,Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,0];
			$r = a;
			return $r;
		}(this))));
		angle = -components[1].y;
		this.append(new lime.utils.Matrix3D((function($this) {
			var $r;
			var a1 = [Math.cos(angle),0,Math.sin(angle),0,0,1,0,0,-Math.sin(angle),0,Math.cos(angle),0,0,0,0,0];
			$r = a1;
			return $r;
		}(this))));
		angle = -components[1].z;
		this.append(new lime.utils.Matrix3D((function($this) {
			var $r;
			var a2 = [Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,1,0,0,0,0,0];
			$r = a2;
			return $r;
		}(this))));
		this.set_position(components[0]);
		this.rawData[15] = 1;
		return true;
	}
	,transformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new lime.utils.Vector3D(x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12],x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13],x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14],1);
	}
	,transformVectors: function(vin,vout) {
		var i = 0;
		while(i + 3 <= lime.utils._Vector.Vector_Impl_.get_length(vin)) {
			var x = vin[i];
			var y = vin[i + 1];
			var z = vin[i + 2];
			vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
			vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
			vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
			i += 3;
		}
	}
	,transpose: function() {
		var oRawData = lime.utils._Vector.Vector_Impl_.copy(this.rawData);
		this.rawData[1] = oRawData[4];
		this.rawData[2] = oRawData[8];
		this.rawData[3] = oRawData[12];
		this.rawData[4] = oRawData[1];
		this.rawData[6] = oRawData[9];
		this.rawData[7] = oRawData[13];
		this.rawData[8] = oRawData[2];
		this.rawData[9] = oRawData[6];
		this.rawData[11] = oRawData[14];
		this.rawData[12] = oRawData[3];
		this.rawData[13] = oRawData[7];
		this.rawData[14] = oRawData[11];
	}
	,get_determinant: function() {
		return -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
	}
	,get_position: function() {
		return new lime.utils.Vector3D(this.rawData[12],this.rawData[13],this.rawData[14]);
	}
	,set_position: function(val) {
		this.rawData[12] = val.x;
		this.rawData[13] = val.y;
		this.rawData[14] = val.z;
		return val;
	}
	,__class__: lime.utils.Matrix3D
};
lime.utils._Vector = {};
lime.utils._Vector.Vector_Impl_ = function() { };
$hxClasses["lime.utils._Vector.Vector_Impl_"] = lime.utils._Vector.Vector_Impl_;
lime.utils._Vector.Vector_Impl_.__name__ = true;
lime.utils._Vector.Vector_Impl_._new = function(length,fixed) {
	return new Array();
};
lime.utils._Vector.Vector_Impl_.concat = function(this1,a) {
	return this1.concat(a);
};
lime.utils._Vector.Vector_Impl_.copy = function(this1) {
	var a = this1.slice();
	return a;
};
lime.utils._Vector.Vector_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
};
lime.utils._Vector.Vector_Impl_.join = function(this1,sep) {
	return this1.join(sep);
};
lime.utils._Vector.Vector_Impl_.pop = function(this1) {
	return this1.pop();
};
lime.utils._Vector.Vector_Impl_.push = function(this1,x) {
	return this1.push(x);
};
lime.utils._Vector.Vector_Impl_.reverse = function(this1) {
	this1.reverse();
};
lime.utils._Vector.Vector_Impl_.shift = function(this1) {
	return this1.shift();
};
lime.utils._Vector.Vector_Impl_.unshift = function(this1,x) {
	this1.unshift(x);
};
lime.utils._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	return this1.slice(pos,end);
};
lime.utils._Vector.Vector_Impl_.sort = function(this1,f) {
	this1.sort(f);
};
lime.utils._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	return this1.splice(pos,len);
};
lime.utils._Vector.Vector_Impl_.toString = function(this1) {
	return this1.toString();
};
lime.utils._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var _g1 = from;
	var _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1[i] == x) return i;
	}
	return -1;
};
lime.utils._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1[i] == x) return i;
		i--;
	}
	return -1;
};
lime.utils._Vector.Vector_Impl_.ofArray = function(a) {
	return lime.utils._Vector.Vector_Impl_.concat(lime.utils._Vector.Vector_Impl_._new(),a);
};
lime.utils._Vector.Vector_Impl_.convert = function(v) {
	return v;
};
lime.utils._Vector.Vector_Impl_.fromArray = function(a) {
	return a;
};
lime.utils._Vector.Vector_Impl_.toArray = function(this1) {
	return this1;
};
lime.utils._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
};
lime.utils._Vector.Vector_Impl_.set_length = function(this1,value) {
	return value;
};
lime.utils._Vector.Vector_Impl_.get_fixed = function(this1) {
	return false;
};
lime.utils._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return value;
};
lime.utils.Vector3D = function(x,y,z,w) {
	if(w == null) w = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["lime.utils.Vector3D"] = lime.utils.Vector3D;
lime.utils.Vector3D.__name__ = true;
lime.utils.Vector3D.angleBetween = function(a,b) {
	var a0 = new lime.utils.Vector3D(a.x,a.y,a.z,a.w);
	a0.normalize();
	var b0 = new lime.utils.Vector3D(b.x,b.y,b.z,b.w);
	b0.normalize();
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
lime.utils.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
lime.utils.Vector3D.get_X_AXIS = function() {
	return new lime.utils.Vector3D(1,0,0);
};
lime.utils.Vector3D.get_Y_AXIS = function() {
	return new lime.utils.Vector3D(0,1,0);
};
lime.utils.Vector3D.get_Z_AXIS = function() {
	return new lime.utils.Vector3D(0,0,1);
};
lime.utils.Vector3D.prototype = {
	add: function(a) {
		return new lime.utils.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new lime.utils.Vector3D(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector3D) {
		this.x = sourceVector3D.x;
		this.y = sourceVector3D.y;
		this.z = sourceVector3D.z;
	}
	,crossProduct: function(a) {
		return new lime.utils.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) allFour = false;
		return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z && (!allFour || this.w == toCompare.w);
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) allFour = false;
		return Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance && (!allFour || Math.abs(this.w - toCompare.w) < tolerance);
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,setTo: function(xa,ya,za) {
		this.x = xa;
		this.y = ya;
		this.z = za;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,subtract: function(a) {
		return new lime.utils.Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: lime.utils.Vector3D
};
lime.utils.html5 = {};
lime.utils.html5.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this._limeResizeBuffer(this.allocated);
};
$hxClasses["lime.utils.html5.ByteArray"] = lime.utils.html5.ByteArray;
lime.utils.html5.ByteArray.__name__ = true;
lime.utils.html5.ByteArray.fromBytes = function(inBytes) {
	var result = new lime.utils.html5.ByteArray();
	result.byteView = new Uint8Array(inBytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
};
lime.utils.html5.ByteArray.limeOfBuffer = function(buffer) {
	var bytes = new lime.utils.html5.ByteArray();
	bytes.set_length(bytes.allocated);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
};
lime.utils.html5.ByteArray.prototype = {
	__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,_getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,_limeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,clear: function() {
		if(this.allocated < 0) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(0,this.allocated * 2))); else if(this.allocated > 0) this._limeResizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
	}
	,getData: function() {
		return this.data.buffer;
	}
	,limeFromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,limeGet: function(pos) {
		var data = this.data;
		return data.getUint8(pos);
	}
	,limeGetBuffer: function() {
		return this.data.buffer;
	}
	,limeSet: function(pos,v) {
		var data = this.data;
		data.setUint8(pos,v);
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,readByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw "Read error - Out of bounds";
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes._limeResizeBuffer(bytes.allocated = Std["int"](Math.max(lengthToEnsure,bytes.allocated * 2))); else if(bytes.allocated > lengthToEnsure) bytes._limeResizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) {
			if(this.allocated < len) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(len,this.allocated * 2))); else if(this.allocated > len) this._limeResizeBuffer(this.allocated = len);
			this.length = len;
			len;
		}
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var data = this.data;
			data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c21 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c21 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,uncompress: function() {
		var bytes = haxe.io.Bytes.ofData(this.byteView);
		var buf = format.tools.Inflate.run(bytes).getData();
		this.byteView = new Uint8Array(buf);
		this.data = new DataView(this.byteView.buffer);
		this.set_length(this.allocated = this.byteView.buffer.byteLength);
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw "Write error - Out of bounds";
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(lengthToEnsure,this.allocated * 2))); else if(this.allocated > lengthToEnsure) this._limeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0;
		var _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_endian: function() {
		if(this.littleEndian) return "littleEndian"; else return "bigEndian";
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,set_length: function(value) {
		if(this.allocated < value) this._limeResizeBuffer(this.allocated = Std["int"](Math.max(value,this.allocated * 2))); else if(this.allocated > value) this._limeResizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,__class__: lime.utils.html5.ByteArray
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
ExampleShader.lyapunov = "" + "precision mediump float;" + "\t// ###############################################################################\r\n\t\t// #    Author:   Sylvio Sell - maitag - Rostock 2013                            #\r\n\t\t// #    Homepage: http://maitag.de                                               #\r\n\t\t// #    License: GNU General Public License (GPL), Version 2.0                   #\r\n\t\t// #                                                                             #\r\n\t\t// #    more images about that lyapunov fractalcode at:                          #\r\n\t\t// #    http://maitag.de/~semmi/                                                 #\r\n\t\t// #                          (have fun!;)                                       #\r\n\t\t// ###############################################################################\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\tuniform sampler2D uImage;\r\n\t\t\r\n\t\t//uniform float time;\r\n\t\tuniform vec2 uMouse, uResolution;\r\n\t\t\r\n\t\tvoid main( void ) {\r\n\t\t\r\n\t\t\t// x y pos\r\n\t\t\t//vec2 position =( gl_FragCoord.xy / uResolution.xy *(1.1 + sin(time)) );\r\n\t\t\t//float a = position.x;\r\n\t\t\t//float b = position.y;\r\n\t\t\t//float a = gl_FragCoord.x / uResolution.x;\r\n\t\t\t//float b = gl_FragCoord.y / uResolution.y;\r\n\t\t\tfloat a = vTexCoord.x; // uResolution.x;\r\n\t\t\tfloat b = vTexCoord.y; // uResolution.y;\r\n\t\t\t\r\n\t\t\t// PArameter\r\n\t\t\tfloat p1 = 1.7+(uMouse.x / uResolution.x*5000.0);\r\n\t\t\tfloat p2 = 1.7+(uMouse.y / uResolution.y*5000.0);\r\n\t\t\t//float p1 = 2.4;\r\n\t\t\t//float p2 = 1.7+sin(time);\r\n\t\t\t\r\n\t\t\tfloat index = 0.0;\r\n\t\t\t\r\n\t\t\t//var xx:Float = 1; // STARTWERT\r\n\t\t\tfloat xx = 1.0;\r\n\t\t\t\r\n\t\t\t// pre-iteration ##########################\r\n\t\t\t\r\n\t\t\tfor (int i = 0; i < 10; i++) {\r\n\t\t\t\txx = p1 * sin(xx + a) * sin(xx + a) + p2;\r\n\t\t\t\txx = p1 * sin(xx + b) * sin(xx + b) + p2;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t// main-iteration ########################\r\n\t\t\t\r\n\t\t\tfor (int i = 0; i < 20; i++) {\r\n\t\t\t\txx = p1 * sin(xx + a) * sin(xx + a) + p2;\r\n\t\t\t\tindex = index + log(abs(2.0 * p1 * sin(xx + a) * cos(xx + a)));\r\n\t\t\t\t\r\n\t\t\t\txx = p1 * sin(xx + b) * sin(xx + b) + p2;\r\n\t\t\t\tindex = index + log(abs(2.0 * p1 * sin(xx + b) * cos(xx + b)));\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t//index = index / (_iter*2);\r\n\t\t\tindex = index / (20.0 * 2.0);\r\n\t\t\t\r\n\t\t\t//return (index);\r\n\t\t\t\r\n\t\t\tif (index > 0.0) {\r\n\t\t\t\tgl_FragColor = vec4(index,0.0,0.0,1.0);\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\tgl_FragColor = vec4(0.0,0.0,0.0-index,1.0);\r\n\t\t\t}\r\n\t\t}\r\n\t";
ExampleShader.lyapunov_01 = "" + "precision mediump float;" + "\t// ###############################################################################\r\n\t\t// #    Author:   Sylvio Sell - maitag - Rostock 2013                            #\r\n\t\t// #    Homepage: http://maitag.de                                               #\r\n\t\t// #    License: GNU General Public License (GPL), Version 2.0                   #\r\n\t\t// #                                                                             #\r\n\t\t// #    more images about that lyapunov fractalcode at:                          #\r\n\t\t// #    http://maitag.de/~semmi/                                                 #\r\n\t\t// #                          (have fun!;)                                       #\r\n\t\t// ###############################################################################\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\tuniform sampler2D uImage;\r\n\t\t\r\n\t\t//uniform float time;\r\n\t\tuniform vec2 uMouse, uResolution;\r\n\t\t\r\n\t\tvoid main( void ) {\r\n\t\t\r\n\t\t\t// x y pos\r\n\t\t\t//vec2 position =( gl_FragCoord.xy / uResolution.xy *(1.1 + sin(time)) );\r\n\t\t\t//float a = position.x;\r\n\t\t\t//float b = position.y;\r\n\t\t\t//float a = gl_FragCoord.x / uResolution.x;\r\n\t\t\t//float b = gl_FragCoord.y / uResolution.y;\r\n\t\t\tfloat a = vTexCoord.x*2.0; // uResolution.x;\r\n\t\t\tfloat b = vTexCoord.y*2.0; // uResolution.y;\r\n\t\t\t\r\n\t\t\t// PArameter\r\n\t\t\tfloat p1 = 1.7+(uMouse.x / 3.0);\r\n\t\t\tfloat p2 = 1.7+(uMouse.y / 3.0);\r\n\t\t\t//float p1 = 2.4;\r\n\t\t\t//float p2 = 1.7+sin(time);\r\n\t\t\t\r\n\t\t\tfloat index = 0.0;\r\n\t\t\t\r\n\t\t\t//var xx:Float = 1; // STARTWERT\r\n\t\t\tfloat xx = 1.0;\r\n\t\t\t\r\n\t\t\t// pre-iteration ##########################\r\n\t\t\t\r\n\t\t\tfor (int i = 0; i < 2; i++) {\r\n\t\t\t\txx = p1 * sin(xx + a) * sin(xx + a) + p2;\r\n\t\t\t\txx = p1 * sin(xx + b) * sin(xx + b) + p2;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\t// main-iteration ########################\r\n\t\t\t\r\n\t\t\tfor (int i = 0; i < 5; i++) {\r\n\t\t\t\txx = p1 * sin(xx + a) * sin(xx + a) + p2;\r\n\t\t\t\tindex = index + log(abs(2.0 * p1 * sin(xx + a) * cos(xx + a)));\r\n\t\t\t\t\r\n\t\t\t\txx = p1 * sin(xx + b) * sin(xx + b) + p2;\r\n\t\t\t\tindex = index + log(abs(2.0 * p1 * sin(xx + b) * cos(xx + b)));\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tindex = index / 10.0;\r\n\t\t\t\r\n\t\t\tif (index > 0.0) {\r\n\t\t\t\tgl_FragColor = vec4(index*2.0, index*1.7, 0.05, 1.0);\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\tgl_FragColor = vec4((0.0-index)*0.65, (0.0-index)*0.53, (0.0-index)*0.1, 1.0);\r\n\t\t\t}\r\n\t\t}\r\n\t";
de.peote.view.Buffer.VERTEX_COUNT = 6;
de.peote.view.Buffer.STRAW = 10;
de.peote.view.Program.aVertexPosStart = -1;
de.peote.view.Program.uMODELVIEWMATRIX = 0;
de.peote.view.Program.uPROJECTIONMATRIX = 1;
de.peote.view.Program.uIMAGE = 2;
de.peote.view.Program.uMOUSE = 3;
de.peote.view.Program.uRESOLUTION = 4;
de.peote.view.Program.uTIME = 5;
de.peote.view.Program.uZOOM = 6;
de.peote.view.Program.uDELTA = 7;
de.peote.view.Shader.default_vertexShaderSrc = "\tprecision mediump float;\r\n\r\n\t\tattribute vec3 aVertexPosStart;\r\n\t\tattribute vec2 aTime;\r\n\t\tattribute vec3 aVertexPosEnd;\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\t//uniform mat4 uProjectionMatrix;\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) ), 1.0);\r\n\t\t\t//gl_Position = uProjectionMatrix * vec4 (aVertexPosStart + (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0), 1.0);\r\n\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tfloat far = 100.0;\r\n\t\t\tfloat near = -100.0;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -2.0 / (far - near), 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aVertexPosStart + floor( (aVertexPosEnd-aVertexPosStart) * min( (uTime-aTime.x)/(aTime.y-aTime.x), 1.0) * zoom)/zoom, 1.0);\r\n\t\t}\r\n\t";
de.peote.view.Shader.default_fragmentShaderSrc = "\tprecision mediump float;\r\n\t\tvarying vec2 vTexCoord;\r\n\t\tuniform sampler2D uImage;\r\n\t\t\r\n\t\tuniform vec2 uMouse, uResolution;\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\r\n\t\t\tgl_FragColor = texture2D (uImage, vTexCoord);\r\n\t\t}\r\n\t";
format.tools._InflateImpl.Window.SIZE = 32768;
format.tools._InflateImpl.Window.BUFSIZE = 65536;
format.tools.InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
format.tools.InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
format.tools.InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
format.tools.InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
format.tools.InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
lime.AssetData.initialized = false;
lime.AssetData.library = new haxe.ds.StringMap();
lime.AssetData.path = new haxe.ds.StringMap();
lime.AssetData.type = new haxe.ds.StringMap();
lime.Window.FULLSCREEN = 1;
lime.Window.BORDERLESS = 2;
lime.Window.RESIZABLE = 4;
lime.Window.HARDWARE = 8;
lime.Window.VSYNC = 16;
lime.Window.HW_AA = 32;
lime.Window.HW_AA_HIRES = 96;
lime.Window.ALLOW_SHADERS = 128;
lime.Window.REQUIRE_SHADERS = 256;
lime.Window.DEPTH_BUFFER = 512;
lime.Window.STENCIL_BUFFER = 1024;
lime.SystemEvents["char"] = 1;
lime.SystemEvents.keydown = 2;
lime.SystemEvents.keyup = 3;
lime.SystemEvents.mousemove = 4;
lime.SystemEvents.mousedown = 5;
lime.SystemEvents.mouseclick = 6;
lime.SystemEvents.mouseup = 7;
lime.SystemEvents.resize = 8;
lime.SystemEvents.poll = 9;
lime.SystemEvents.quit = 10;
lime.SystemEvents.focus = 11;
lime.SystemEvents.shouldrotate = 12;
lime.SystemEvents.redraw = 14;
lime.SystemEvents.touchbegin = 15;
lime.SystemEvents.touchmove = 16;
lime.SystemEvents.touchend = 17;
lime.SystemEvents.touchtap = 18;
lime.SystemEvents.change = 19;
lime.SystemEvents.activate = 20;
lime.SystemEvents.deactivate = 21;
lime.SystemEvents.gotinputfocus = 22;
lime.SystemEvents.lostinputfocus = 23;
lime.SystemEvents.joyaxismove = 24;
lime.SystemEvents.joyballmove = 25;
lime.SystemEvents.joyhatmove = 26;
lime.SystemEvents.joybuttondown = 27;
lime.SystemEvents.joybuttonup = 28;
lime.SystemEvents.joydeviceadded = 29;
lime.SystemEvents.joydeviceremoved = 30;
lime.SystemEvents.syswm = 31;
lime.InputHandler.efLeftDown = 1;
lime.InputHandler.efShiftDown = 2;
lime.InputHandler.efCtrlDown = 4;
lime.InputHandler.efAltDown = 8;
lime.InputHandler.efCommandDown = 16;
lime.Lime.early_wakeup = 0.005;
lime.gl.html5.Ext.COLOR_ATTACHMENT0 = 36064;
lime.gl.html5.Ext.COLOR_ATTACHMENT1 = 36065;
lime.gl.html5.Ext.COLOR_ATTACHMENT2 = 36066;
lime.gl.html5.Ext.COLOR_ATTACHMENT3 = 36067;
lime.gl.html5.Ext.COLOR_ATTACHMENT4 = 36068;
lime.gl.html5.Ext.COLOR_ATTACHMENT5 = 36069;
lime.gl.html5.Ext.COLOR_ATTACHMENT6 = 36070;
lime.gl.html5.Ext.COLOR_ATTACHMENT7 = 36071;
lime.gl.html5.Ext.COLOR_ATTACHMENT8 = 36072;
lime.gl.html5.Ext.COLOR_ATTACHMENT9 = 36073;
lime.gl.html5.Ext.COLOR_ATTACHMENT10 = 36074;
lime.gl.html5.Ext.COLOR_ATTACHMENT11 = 36075;
lime.gl.html5.Ext.COLOR_ATTACHMENT12 = 36076;
lime.gl.html5.Ext.COLOR_ATTACHMENT13 = 36077;
lime.gl.html5.Ext.COLOR_ATTACHMENT14 = 36078;
lime.gl.html5.Ext.COLOR_ATTACHMENT15 = 36079;
lime.gl.html5.Ext.DRAW_BUFFER0 = 34853;
lime.gl.html5.Ext.DRAW_BUFFER1 = 34854;
lime.gl.html5.Ext.DRAW_BUFFER2 = 34855;
lime.gl.html5.Ext.DRAW_BUFFER3 = 34856;
lime.gl.html5.Ext.DRAW_BUFFER4 = 34857;
lime.gl.html5.Ext.DRAW_BUFFER5 = 34858;
lime.gl.html5.Ext.DRAW_BUFFER6 = 34859;
lime.gl.html5.Ext.DRAW_BUFFER7 = 34860;
lime.gl.html5.Ext.DRAW_BUFFER8 = 34861;
lime.gl.html5.Ext.DRAW_BUFFER9 = 34862;
lime.gl.html5.Ext.DRAW_BUFFER10 = 34863;
lime.gl.html5.Ext.DRAW_BUFFER11 = 34864;
lime.gl.html5.Ext.DRAW_BUFFER12 = 34865;
lime.gl.html5.Ext.DRAW_BUFFER13 = 34866;
lime.gl.html5.Ext.DRAW_BUFFER14 = 34867;
lime.gl.html5.Ext.DRAW_BUFFER15 = 34868;
lime.gl.html5.Ext.MAX_COLOR_ATTACHMENTS = 36063;
lime.gl.html5.Ext.MAX_DRAW_BUFFERS = 34852;
lime.gl.html5.GL.DEPTH_BUFFER_BIT = 256;
lime.gl.html5.GL.STENCIL_BUFFER_BIT = 1024;
lime.gl.html5.GL.COLOR_BUFFER_BIT = 16384;
lime.gl.html5.GL.POINTS = 0;
lime.gl.html5.GL.LINES = 1;
lime.gl.html5.GL.LINE_LOOP = 2;
lime.gl.html5.GL.LINE_STRIP = 3;
lime.gl.html5.GL.TRIANGLES = 4;
lime.gl.html5.GL.TRIANGLE_STRIP = 5;
lime.gl.html5.GL.TRIANGLE_FAN = 6;
lime.gl.html5.GL.ZERO = 0;
lime.gl.html5.GL.ONE = 1;
lime.gl.html5.GL.SRC_COLOR = 768;
lime.gl.html5.GL.ONE_MINUS_SRC_COLOR = 769;
lime.gl.html5.GL.SRC_ALPHA = 770;
lime.gl.html5.GL.ONE_MINUS_SRC_ALPHA = 771;
lime.gl.html5.GL.DST_ALPHA = 772;
lime.gl.html5.GL.ONE_MINUS_DST_ALPHA = 773;
lime.gl.html5.GL.DST_COLOR = 774;
lime.gl.html5.GL.ONE_MINUS_DST_COLOR = 775;
lime.gl.html5.GL.SRC_ALPHA_SATURATE = 776;
lime.gl.html5.GL.FUNC_ADD = 32774;
lime.gl.html5.GL.BLEND_EQUATION = 32777;
lime.gl.html5.GL.BLEND_EQUATION_RGB = 32777;
lime.gl.html5.GL.BLEND_EQUATION_ALPHA = 34877;
lime.gl.html5.GL.FUNC_SUBTRACT = 32778;
lime.gl.html5.GL.FUNC_REVERSE_SUBTRACT = 32779;
lime.gl.html5.GL.BLEND_DST_RGB = 32968;
lime.gl.html5.GL.BLEND_SRC_RGB = 32969;
lime.gl.html5.GL.BLEND_DST_ALPHA = 32970;
lime.gl.html5.GL.BLEND_SRC_ALPHA = 32971;
lime.gl.html5.GL.CONSTANT_COLOR = 32769;
lime.gl.html5.GL.ONE_MINUS_CONSTANT_COLOR = 32770;
lime.gl.html5.GL.CONSTANT_ALPHA = 32771;
lime.gl.html5.GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
lime.gl.html5.GL.BLEND_COLOR = 32773;
lime.gl.html5.GL.ARRAY_BUFFER = 34962;
lime.gl.html5.GL.ELEMENT_ARRAY_BUFFER = 34963;
lime.gl.html5.GL.ARRAY_BUFFER_BINDING = 34964;
lime.gl.html5.GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
lime.gl.html5.GL.STREAM_DRAW = 35040;
lime.gl.html5.GL.STATIC_DRAW = 35044;
lime.gl.html5.GL.DYNAMIC_DRAW = 35048;
lime.gl.html5.GL.BUFFER_SIZE = 34660;
lime.gl.html5.GL.BUFFER_USAGE = 34661;
lime.gl.html5.GL.CURRENT_VERTEX_ATTRIB = 34342;
lime.gl.html5.GL.FRONT = 1028;
lime.gl.html5.GL.BACK = 1029;
lime.gl.html5.GL.FRONT_AND_BACK = 1032;
lime.gl.html5.GL.CULL_FACE = 2884;
lime.gl.html5.GL.BLEND = 3042;
lime.gl.html5.GL.DITHER = 3024;
lime.gl.html5.GL.STENCIL_TEST = 2960;
lime.gl.html5.GL.DEPTH_TEST = 2929;
lime.gl.html5.GL.SCISSOR_TEST = 3089;
lime.gl.html5.GL.POLYGON_OFFSET_FILL = 32823;
lime.gl.html5.GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
lime.gl.html5.GL.SAMPLE_COVERAGE = 32928;
lime.gl.html5.GL.NO_ERROR = 0;
lime.gl.html5.GL.INVALID_ENUM = 1280;
lime.gl.html5.GL.INVALID_VALUE = 1281;
lime.gl.html5.GL.INVALID_OPERATION = 1282;
lime.gl.html5.GL.OUT_OF_MEMORY = 1285;
lime.gl.html5.GL.CW = 2304;
lime.gl.html5.GL.CCW = 2305;
lime.gl.html5.GL.LINE_WIDTH = 2849;
lime.gl.html5.GL.ALIASED_POINT_SIZE_RANGE = 33901;
lime.gl.html5.GL.ALIASED_LINE_WIDTH_RANGE = 33902;
lime.gl.html5.GL.CULL_FACE_MODE = 2885;
lime.gl.html5.GL.FRONT_FACE = 2886;
lime.gl.html5.GL.DEPTH_RANGE = 2928;
lime.gl.html5.GL.DEPTH_WRITEMASK = 2930;
lime.gl.html5.GL.DEPTH_CLEAR_VALUE = 2931;
lime.gl.html5.GL.DEPTH_FUNC = 2932;
lime.gl.html5.GL.STENCIL_CLEAR_VALUE = 2961;
lime.gl.html5.GL.STENCIL_FUNC = 2962;
lime.gl.html5.GL.STENCIL_FAIL = 2964;
lime.gl.html5.GL.STENCIL_PASS_DEPTH_FAIL = 2965;
lime.gl.html5.GL.STENCIL_PASS_DEPTH_PASS = 2966;
lime.gl.html5.GL.STENCIL_REF = 2967;
lime.gl.html5.GL.STENCIL_VALUE_MASK = 2963;
lime.gl.html5.GL.STENCIL_WRITEMASK = 2968;
lime.gl.html5.GL.STENCIL_BACK_FUNC = 34816;
lime.gl.html5.GL.STENCIL_BACK_FAIL = 34817;
lime.gl.html5.GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
lime.gl.html5.GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
lime.gl.html5.GL.STENCIL_BACK_REF = 36003;
lime.gl.html5.GL.STENCIL_BACK_VALUE_MASK = 36004;
lime.gl.html5.GL.STENCIL_BACK_WRITEMASK = 36005;
lime.gl.html5.GL.VIEWPORT = 2978;
lime.gl.html5.GL.SCISSOR_BOX = 3088;
lime.gl.html5.GL.COLOR_CLEAR_VALUE = 3106;
lime.gl.html5.GL.COLOR_WRITEMASK = 3107;
lime.gl.html5.GL.UNPACK_ALIGNMENT = 3317;
lime.gl.html5.GL.PACK_ALIGNMENT = 3333;
lime.gl.html5.GL.MAX_TEXTURE_SIZE = 3379;
lime.gl.html5.GL.MAX_VIEWPORT_DIMS = 3386;
lime.gl.html5.GL.SUBPIXEL_BITS = 3408;
lime.gl.html5.GL.RED_BITS = 3410;
lime.gl.html5.GL.GREEN_BITS = 3411;
lime.gl.html5.GL.BLUE_BITS = 3412;
lime.gl.html5.GL.ALPHA_BITS = 3413;
lime.gl.html5.GL.DEPTH_BITS = 3414;
lime.gl.html5.GL.STENCIL_BITS = 3415;
lime.gl.html5.GL.POLYGON_OFFSET_UNITS = 10752;
lime.gl.html5.GL.POLYGON_OFFSET_FACTOR = 32824;
lime.gl.html5.GL.TEXTURE_BINDING_2D = 32873;
lime.gl.html5.GL.SAMPLE_BUFFERS = 32936;
lime.gl.html5.GL.SAMPLES = 32937;
lime.gl.html5.GL.SAMPLE_COVERAGE_VALUE = 32938;
lime.gl.html5.GL.SAMPLE_COVERAGE_INVERT = 32939;
lime.gl.html5.GL.COMPRESSED_TEXTURE_FORMATS = 34467;
lime.gl.html5.GL.DONT_CARE = 4352;
lime.gl.html5.GL.FASTEST = 4353;
lime.gl.html5.GL.NICEST = 4354;
lime.gl.html5.GL.GENERATE_MIPMAP_HINT = 33170;
lime.gl.html5.GL.BYTE = 5120;
lime.gl.html5.GL.UNSIGNED_BYTE = 5121;
lime.gl.html5.GL.SHORT = 5122;
lime.gl.html5.GL.UNSIGNED_SHORT = 5123;
lime.gl.html5.GL.INT = 5124;
lime.gl.html5.GL.UNSIGNED_INT = 5125;
lime.gl.html5.GL.FLOAT = 5126;
lime.gl.html5.GL.DEPTH_COMPONENT = 6402;
lime.gl.html5.GL.ALPHA = 6406;
lime.gl.html5.GL.RGB = 6407;
lime.gl.html5.GL.RGBA = 6408;
lime.gl.html5.GL.LUMINANCE = 6409;
lime.gl.html5.GL.LUMINANCE_ALPHA = 6410;
lime.gl.html5.GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
lime.gl.html5.GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
lime.gl.html5.GL.UNSIGNED_SHORT_5_6_5 = 33635;
lime.gl.html5.GL.FRAGMENT_SHADER = 35632;
lime.gl.html5.GL.VERTEX_SHADER = 35633;
lime.gl.html5.GL.MAX_VERTEX_ATTRIBS = 34921;
lime.gl.html5.GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
lime.gl.html5.GL.MAX_VARYING_VECTORS = 36348;
lime.gl.html5.GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
lime.gl.html5.GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
lime.gl.html5.GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
lime.gl.html5.GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
lime.gl.html5.GL.SHADER_TYPE = 35663;
lime.gl.html5.GL.DELETE_STATUS = 35712;
lime.gl.html5.GL.LINK_STATUS = 35714;
lime.gl.html5.GL.VALIDATE_STATUS = 35715;
lime.gl.html5.GL.ATTACHED_SHADERS = 35717;
lime.gl.html5.GL.ACTIVE_UNIFORMS = 35718;
lime.gl.html5.GL.ACTIVE_ATTRIBUTES = 35721;
lime.gl.html5.GL.SHADING_LANGUAGE_VERSION = 35724;
lime.gl.html5.GL.CURRENT_PROGRAM = 35725;
lime.gl.html5.GL.NEVER = 512;
lime.gl.html5.GL.LESS = 513;
lime.gl.html5.GL.EQUAL = 514;
lime.gl.html5.GL.LEQUAL = 515;
lime.gl.html5.GL.GREATER = 516;
lime.gl.html5.GL.NOTEQUAL = 517;
lime.gl.html5.GL.GEQUAL = 518;
lime.gl.html5.GL.ALWAYS = 519;
lime.gl.html5.GL.KEEP = 7680;
lime.gl.html5.GL.REPLACE = 7681;
lime.gl.html5.GL.INCR = 7682;
lime.gl.html5.GL.DECR = 7683;
lime.gl.html5.GL.INVERT = 5386;
lime.gl.html5.GL.INCR_WRAP = 34055;
lime.gl.html5.GL.DECR_WRAP = 34056;
lime.gl.html5.GL.VENDOR = 7936;
lime.gl.html5.GL.RENDERER = 7937;
lime.gl.html5.GL.VERSION = 7938;
lime.gl.html5.GL.NEAREST = 9728;
lime.gl.html5.GL.LINEAR = 9729;
lime.gl.html5.GL.NEAREST_MIPMAP_NEAREST = 9984;
lime.gl.html5.GL.LINEAR_MIPMAP_NEAREST = 9985;
lime.gl.html5.GL.NEAREST_MIPMAP_LINEAR = 9986;
lime.gl.html5.GL.LINEAR_MIPMAP_LINEAR = 9987;
lime.gl.html5.GL.TEXTURE_MAG_FILTER = 10240;
lime.gl.html5.GL.TEXTURE_MIN_FILTER = 10241;
lime.gl.html5.GL.TEXTURE_WRAP_S = 10242;
lime.gl.html5.GL.TEXTURE_WRAP_T = 10243;
lime.gl.html5.GL.TEXTURE_2D = 3553;
lime.gl.html5.GL.TEXTURE = 5890;
lime.gl.html5.GL.TEXTURE_CUBE_MAP = 34067;
lime.gl.html5.GL.TEXTURE_BINDING_CUBE_MAP = 34068;
lime.gl.html5.GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
lime.gl.html5.GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
lime.gl.html5.GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
lime.gl.html5.GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
lime.gl.html5.GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
lime.gl.html5.GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
lime.gl.html5.GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
lime.gl.html5.GL.TEXTURE0 = 33984;
lime.gl.html5.GL.TEXTURE1 = 33985;
lime.gl.html5.GL.TEXTURE2 = 33986;
lime.gl.html5.GL.TEXTURE3 = 33987;
lime.gl.html5.GL.TEXTURE4 = 33988;
lime.gl.html5.GL.TEXTURE5 = 33989;
lime.gl.html5.GL.TEXTURE6 = 33990;
lime.gl.html5.GL.TEXTURE7 = 33991;
lime.gl.html5.GL.TEXTURE8 = 33992;
lime.gl.html5.GL.TEXTURE9 = 33993;
lime.gl.html5.GL.TEXTURE10 = 33994;
lime.gl.html5.GL.TEXTURE11 = 33995;
lime.gl.html5.GL.TEXTURE12 = 33996;
lime.gl.html5.GL.TEXTURE13 = 33997;
lime.gl.html5.GL.TEXTURE14 = 33998;
lime.gl.html5.GL.TEXTURE15 = 33999;
lime.gl.html5.GL.TEXTURE16 = 34000;
lime.gl.html5.GL.TEXTURE17 = 34001;
lime.gl.html5.GL.TEXTURE18 = 34002;
lime.gl.html5.GL.TEXTURE19 = 34003;
lime.gl.html5.GL.TEXTURE20 = 34004;
lime.gl.html5.GL.TEXTURE21 = 34005;
lime.gl.html5.GL.TEXTURE22 = 34006;
lime.gl.html5.GL.TEXTURE23 = 34007;
lime.gl.html5.GL.TEXTURE24 = 34008;
lime.gl.html5.GL.TEXTURE25 = 34009;
lime.gl.html5.GL.TEXTURE26 = 34010;
lime.gl.html5.GL.TEXTURE27 = 34011;
lime.gl.html5.GL.TEXTURE28 = 34012;
lime.gl.html5.GL.TEXTURE29 = 34013;
lime.gl.html5.GL.TEXTURE30 = 34014;
lime.gl.html5.GL.TEXTURE31 = 34015;
lime.gl.html5.GL.ACTIVE_TEXTURE = 34016;
lime.gl.html5.GL.REPEAT = 10497;
lime.gl.html5.GL.CLAMP_TO_EDGE = 33071;
lime.gl.html5.GL.MIRRORED_REPEAT = 33648;
lime.gl.html5.GL.FLOAT_VEC2 = 35664;
lime.gl.html5.GL.FLOAT_VEC3 = 35665;
lime.gl.html5.GL.FLOAT_VEC4 = 35666;
lime.gl.html5.GL.INT_VEC2 = 35667;
lime.gl.html5.GL.INT_VEC3 = 35668;
lime.gl.html5.GL.INT_VEC4 = 35669;
lime.gl.html5.GL.BOOL = 35670;
lime.gl.html5.GL.BOOL_VEC2 = 35671;
lime.gl.html5.GL.BOOL_VEC3 = 35672;
lime.gl.html5.GL.BOOL_VEC4 = 35673;
lime.gl.html5.GL.FLOAT_MAT2 = 35674;
lime.gl.html5.GL.FLOAT_MAT3 = 35675;
lime.gl.html5.GL.FLOAT_MAT4 = 35676;
lime.gl.html5.GL.SAMPLER_2D = 35678;
lime.gl.html5.GL.SAMPLER_CUBE = 35680;
lime.gl.html5.GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
lime.gl.html5.GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
lime.gl.html5.GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
lime.gl.html5.GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
lime.gl.html5.GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
lime.gl.html5.GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
lime.gl.html5.GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
lime.gl.html5.GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
lime.gl.html5.GL.POINT_SPRITE = 34913;
lime.gl.html5.GL.COMPILE_STATUS = 35713;
lime.gl.html5.GL.LOW_FLOAT = 36336;
lime.gl.html5.GL.MEDIUM_FLOAT = 36337;
lime.gl.html5.GL.HIGH_FLOAT = 36338;
lime.gl.html5.GL.LOW_INT = 36339;
lime.gl.html5.GL.MEDIUM_INT = 36340;
lime.gl.html5.GL.HIGH_INT = 36341;
lime.gl.html5.GL.FRAMEBUFFER = 36160;
lime.gl.html5.GL.RENDERBUFFER = 36161;
lime.gl.html5.GL.RGBA4 = 32854;
lime.gl.html5.GL.RGB5_A1 = 32855;
lime.gl.html5.GL.RGB565 = 36194;
lime.gl.html5.GL.DEPTH_COMPONENT16 = 33189;
lime.gl.html5.GL.STENCIL_INDEX = 6401;
lime.gl.html5.GL.STENCIL_INDEX8 = 36168;
lime.gl.html5.GL.DEPTH_STENCIL = 34041;
lime.gl.html5.GL.RENDERBUFFER_WIDTH = 36162;
lime.gl.html5.GL.RENDERBUFFER_HEIGHT = 36163;
lime.gl.html5.GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
lime.gl.html5.GL.RENDERBUFFER_RED_SIZE = 36176;
lime.gl.html5.GL.RENDERBUFFER_GREEN_SIZE = 36177;
lime.gl.html5.GL.RENDERBUFFER_BLUE_SIZE = 36178;
lime.gl.html5.GL.RENDERBUFFER_ALPHA_SIZE = 36179;
lime.gl.html5.GL.RENDERBUFFER_DEPTH_SIZE = 36180;
lime.gl.html5.GL.RENDERBUFFER_STENCIL_SIZE = 36181;
lime.gl.html5.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
lime.gl.html5.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
lime.gl.html5.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
lime.gl.html5.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
lime.gl.html5.GL.COLOR_ATTACHMENT0 = 36064;
lime.gl.html5.GL.DEPTH_ATTACHMENT = 36096;
lime.gl.html5.GL.STENCIL_ATTACHMENT = 36128;
lime.gl.html5.GL.DEPTH_STENCIL_ATTACHMENT = 33306;
lime.gl.html5.GL.NONE = 0;
lime.gl.html5.GL.FRAMEBUFFER_COMPLETE = 36053;
lime.gl.html5.GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
lime.gl.html5.GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
lime.gl.html5.GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
lime.gl.html5.GL.FRAMEBUFFER_UNSUPPORTED = 36061;
lime.gl.html5.GL.FRAMEBUFFER_BINDING = 36006;
lime.gl.html5.GL.RENDERBUFFER_BINDING = 36007;
lime.gl.html5.GL.MAX_RENDERBUFFER_SIZE = 34024;
lime.gl.html5.GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
lime.gl.html5.GL.UNPACK_FLIP_Y_WEBGL = 37440;
lime.gl.html5.GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
lime.gl.html5.GL.CONTEXT_LOST_WEBGL = 37442;
lime.gl.html5.GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
lime.gl.html5.GL.BROWSER_DEFAULT_WEBGL = 37444;
lime.helpers.Keys._backspace = 8;
lime.helpers.Keys._tab = 9;
lime.helpers.Keys._enter = 13;
lime.helpers.Keys._meta = 15;
lime.helpers.Keys._shift = 16;
lime.helpers.Keys._ctrl = 17;
lime.helpers.Keys._alt = 18;
lime.helpers.Keys._capslock = 20;
lime.helpers.Keys._escape = 27;
lime.helpers.Keys._space = 32;
lime.helpers.Keys._left = 37;
lime.helpers.Keys._up = 38;
lime.helpers.Keys._right = 39;
lime.helpers.Keys._down = 40;
lime.helpers.Keys._key_0 = 48;
lime.helpers.Keys._key_1 = 49;
lime.helpers.Keys._key_2 = 50;
lime.helpers.Keys._key_3 = 51;
lime.helpers.Keys._key_4 = 52;
lime.helpers.Keys._key_5 = 53;
lime.helpers.Keys._key_6 = 54;
lime.helpers.Keys._key_7 = 55;
lime.helpers.Keys._key_8 = 56;
lime.helpers.Keys._key_9 = 57;
lime.helpers.Keys._key_A = 65;
lime.helpers.Keys._key_B = 66;
lime.helpers.Keys._key_C = 67;
lime.helpers.Keys._key_D = 68;
lime.helpers.Keys._key_E = 69;
lime.helpers.Keys._key_F = 70;
lime.helpers.Keys._key_G = 71;
lime.helpers.Keys._key_H = 72;
lime.helpers.Keys._key_I = 73;
lime.helpers.Keys._key_J = 74;
lime.helpers.Keys._key_K = 75;
lime.helpers.Keys._key_L = 76;
lime.helpers.Keys._key_M = 77;
lime.helpers.Keys._key_N = 78;
lime.helpers.Keys._key_O = 79;
lime.helpers.Keys._key_P = 80;
lime.helpers.Keys._key_Q = 81;
lime.helpers.Keys._key_R = 82;
lime.helpers.Keys._key_S = 83;
lime.helpers.Keys._key_T = 84;
lime.helpers.Keys._key_U = 85;
lime.helpers.Keys._key_V = 86;
lime.helpers.Keys._key_W = 87;
lime.helpers.Keys._key_X = 88;
lime.helpers.Keys._key_Y = 89;
lime.helpers.Keys._key_Z = 90;
lime.helpers.Keys._equals = 187;
lime.helpers.Keys._minus = 189;
lime.helpers.Keys._tilde = 192;
lime.helpers.Keys._forward_slash = 191;
lime.helpers.Keys._back_slash = 220;
lime.helpers.Keys._semicolon = 186;
lime.helpers.Keys._single_quote = 222;
lime.helpers.Keys._comma = 188;
lime.helpers.Keys._period = 190;
lime.helpers.Keys._open_square_brace = 219;
lime.helpers.Keys._close_square_brace = 221;
lime.helpers.Keys._f1 = 112;
lime.helpers.Keys._f2 = 113;
lime.helpers.Keys._f3 = 114;
lime.helpers.Keys._f4 = 115;
lime.helpers.Keys._f5 = 116;
lime.helpers.Keys._f6 = 117;
lime.helpers.Keys._f7 = 118;
lime.helpers.Keys._f8 = 119;
lime.helpers.Keys._f9 = 120;
lime.helpers.Keys._f10 = 121;
lime.helpers.Keys._f11 = 122;
lime.helpers.Keys._f12 = 123;
lime.helpers.Keys._f13 = 124;
lime.helpers.Keys._f14 = 125;
lime.helpers.Keys._f15 = 126;
lime.utils.Assets.initialized = false;
lime.utils.Endian.BIG_ENDIAN = "bigEndian";
lime.utils.Endian.LITTLE_ENDIAN = "littleEndian";
ApplicationMain.main();
})(typeof window != "undefined" ? window : exports);
