(function (console, $hx_exports, $global) { "use strict";
$hx_exports.lime = $hx_exports.lime || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { };
ApplicationMain.__name__ = true;
ApplicationMain.create = function() {
	ApplicationMain.preloader = new lime_app_Preloader();
	ApplicationMain.app = new samples_GlyphUnicodeTextRendering();
	ApplicationMain.app.setPreloader(ApplicationMain.preloader);
	ApplicationMain.app.create(ApplicationMain.config);
	ApplicationMain.preloader.onComplete.add(ApplicationMain.start);
	ApplicationMain.preloader.create(ApplicationMain.config);
	var urls = [];
	var types = [];
	urls.push("assets/debug.frag");
	types.push("TEXT");
	urls.push("assets/debug.vert");
	types.push("TEXT");
	urls.push("assets/DejavuSans.dat");
	types.push("BINARY");
	urls.push("assets/DejavuSans.dat1");
	types.push("BINARY");
	urls.push("assets/DejavuSans.png");
	types.push("IMAGE");
	urls.push("assets/DejavuSans.png1");
	types.push("BINARY");
	urls.push("assets/gl3font.frag");
	types.push("TEXT");
	urls.push("assets/HerokuShaders/nebula.frag");
	types.push("TEXT");
	urls.push("assets/HerokuShaders/README.txt");
	types.push("TEXT");
	urls.push("assets/LiberationSans-Regular.dat");
	types.push("BINARY");
	urls.push("assets/LiberationSans-Regular.png");
	types.push("IMAGE");
	urls.push("assets/lyapunov.frag");
	types.push("TEXT");
	urls.push("assets/lyapunov_01.frag");
	types.push("BINARY");
	urls.push("assets/lyapunov_02.frag");
	types.push("BINARY");
	urls.push("assets/lyapunov_test.frag");
	types.push("TEXT");
	urls.push("assets/openfl.png");
	types.push("IMAGE");
	urls.push("assets/openfl.svg");
	types.push("TEXT");
	urls.push("assets/peote_font.png");
	types.push("IMAGE");
	urls.push("assets/peote_font_green.png");
	types.push("IMAGE");
	urls.push("assets/peote_font_white.png");
	types.push("IMAGE");
	urls.push("assets/peote_tiles.png");
	types.push("IMAGE");
	urls.push("assets/peote_tiles_bunnys.png");
	types.push("IMAGE");
	urls.push("assets/peote_tiles_flowers_alpha.png");
	types.push("IMAGE");
	urls.push("assets/ping-pong.vert");
	types.push("TEXT");
	urls.push("assets/ping-pong_android.vert");
	types.push("TEXT");
	urls.push("assets/ping-pong_raspi.vert");
	types.push("TEXT");
	urls.push("assets/unifont/gl3font.frag_OLD_WITHOUT_EXTENSION");
	types.push("TEXT");
	urls.push("assets/unifont/smooth.vert");
	types.push("TEXT");
	urls.push("assets/unifont/unifont_0000.dat");
	types.push("BINARY");
	urls.push("assets/unifont/unifont_0000.png");
	types.push("IMAGE");
	if(ApplicationMain.config.assetsPrefix != null) {
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(types[i] != "FONT") urls[i] = ApplicationMain.config.assetsPrefix + urls[i];
		}
	}
	ApplicationMain.preloader.load(urls,types);
};
ApplicationMain.main = function() {
	ApplicationMain.config = { build : "1647", company : "Sylvio Sell - maitag", file : "GlyphUnicodeTextRendering", fps : 60, name : "PeoteView", orientation : "", packageName : "de.peote.view", version : "0.2.5", windows : [{ antialiasing : 0, background : 16777215, borderless : false, depthBuffer : true, display : 0, fullscreen : false, hardware : true, height : 0, parameters : "{}", resizable : true, stencilBuffer : false, title : "PeoteView", vsync : true, width : 0, x : null, y : null}]};
};
ApplicationMain.start = function() {
	var result = ApplicationMain.app.exec();
};
var lime_AssetLibrary = function() {
	this.onChange = new lime_app_Event_$Void_$Void();
};
lime_AssetLibrary.__name__ = true;
lime_AssetLibrary.prototype = {
	exists: function(id,type) {
		return false;
	}
	,getBytes: function(id) {
		return null;
	}
	,loadBytes: function(id) {
		var _g = this;
		return new lime_app_Future(function() {
			return _g.getBytes(id);
		});
	}
	,unload: function() {
	}
	,__class__: lime_AssetLibrary
};
var DefaultAssetLibrary = function() {
	this.type = new haxe_ds_StringMap();
	this.path = new haxe_ds_StringMap();
	lime_AssetLibrary.call(this);
	var id;
	id = "assets/debug.frag";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/debug.vert";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/DejavuSans.dat";
	this.path.set(id,id);
	this.type.set(id,"BINARY");
	id = "assets/DejavuSans.dat1";
	this.path.set(id,id);
	this.type.set(id,"BINARY");
	id = "assets/DejavuSans.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/DejavuSans.png1";
	this.path.set(id,id);
	this.type.set(id,"BINARY");
	id = "assets/gl3font.frag";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/HerokuShaders/nebula.frag";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/HerokuShaders/README.txt";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/LiberationSans-Regular.dat";
	this.path.set(id,id);
	this.type.set(id,"BINARY");
	id = "assets/LiberationSans-Regular.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/lyapunov.frag";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/lyapunov_01.frag";
	this.path.set(id,id);
	this.type.set(id,"BINARY");
	id = "assets/lyapunov_02.frag";
	this.path.set(id,id);
	this.type.set(id,"BINARY");
	id = "assets/lyapunov_test.frag";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/openfl.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/openfl.svg";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/peote_font.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/peote_font_green.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/peote_font_white.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/peote_tiles.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/peote_tiles_bunnys.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/peote_tiles_flowers_alpha.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	id = "assets/ping-pong.vert";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/ping-pong_android.vert";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/ping-pong_raspi.vert";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/unifont/gl3font.frag_OLD_WITHOUT_EXTENSION";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/unifont/smooth.vert";
	this.path.set(id,id);
	this.type.set(id,"TEXT");
	id = "assets/unifont/unifont_0000.dat";
	this.path.set(id,id);
	this.type.set(id,"BINARY");
	id = "assets/unifont/unifont_0000.png";
	this.path.set(id,id);
	this.type.set(id,"IMAGE");
	var assetsPrefix = null;
	if(ApplicationMain.config != null && Object.prototype.hasOwnProperty.call(ApplicationMain.config,"assetsPrefix")) assetsPrefix = ApplicationMain.config.assetsPrefix;
	if(assetsPrefix != null) {
		var $it0 = this.path.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			var value = assetsPrefix + this.path.get(k);
			this.path.set(k,value);
		}
	}
};
DefaultAssetLibrary.__name__ = true;
DefaultAssetLibrary.__super__ = lime_AssetLibrary;
DefaultAssetLibrary.prototype = $extend(lime_AssetLibrary.prototype,{
	exists: function(id,type) {
		var requestedType;
		if(type != null) requestedType = js_Boot.__cast(type , String); else requestedType = null;
		var assetType = this.type.get(id);
		if(assetType != null) {
			if(assetType == requestedType || (requestedType == "SOUND" || requestedType == "MUSIC") && (assetType == "MUSIC" || assetType == "SOUND")) return true;
			if(requestedType == "BINARY" || requestedType == null || assetType == "BINARY" && requestedType == "TEXT") return true;
		}
		return false;
	}
	,getBytes: function(id) {
		var loader;
		var key = this.path.get(id);
		loader = lime_app_Preloader.loaders.get(key);
		if(loader == null) return null;
		var bytes = loader.bytes;
		if(bytes != null) return bytes; else return null;
	}
	,loadBytes: function(id) {
		var promise = new lime_app_Promise();
		if(this.path.exists(id)) {
			var request = new lime_net_HTTPRequest();
			promise.completeWith(request.load(this.path.get(id) + "?" + lime_Assets.cache.version));
		} else promise.complete(this.getBytes(id));
		return promise.future;
	}
	,__class__: DefaultAssetLibrary
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
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
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var de_peote_tools_Holes = function(size) {
	this.size = size - 1;
	this.hole = [];
	this.hole.push(new de_peote_tools_Hole(0));
	this.hole[0].end = this.size;
};
de_peote_tools_Holes.__name__ = true;
de_peote_tools_Holes.prototype = {
	addHole: function(pos) {
		var len = this.hole.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
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
				var x = new de_peote_tools_Hole(pos);
				this.hole.splice(i,0,x);
				return;
			}
		}
		this.hole.push(new de_peote_tools_Hole(pos));
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
	,is_empty: function() {
		var it_is = false;
		if(this.hole.length == 1) {
			if(this.hole[0].start == 0 && this.hole[0].end == this.size) it_is = true;
		}
		return it_is;
	}
	,__class__: de_peote_tools_Holes
};
var de_peote_tools_Hole = function(start) {
	this.start = start;
	this.end = start;
};
de_peote_tools_Hole.__name__ = true;
de_peote_tools_Hole.prototype = {
	__class__: de_peote_tools_Hole
};
var de_peote_view_ActiveProgram = function(program,program_nr,programTextures,segment_size,buf_start) {
	this.size = -2;
	this.program = program;
	this.program_nr = program_nr;
	this.textures = programTextures;
	this.buf_start = buf_start * segment_size;
	this.element_holes = new de_peote_tools_Holes(segment_size);
};
de_peote_view_ActiveProgram.__name__ = true;
de_peote_view_ActiveProgram.prototype = {
	__class__: de_peote_view_ActiveProgram
};
var de_peote_view_ActiveTextures = function() {
	this.texture = [];
};
de_peote_view_ActiveTextures.__name__ = true;
de_peote_view_ActiveTextures.prototype = {
	__class__: de_peote_view_ActiveTextures
};
var de_peote_view_Buffer = function(segment_size,max_segments) {
	this.segment_size = segment_size;
	this.max_segments = max_segments;
	this.activeProgram = [];
	this.segment_holes = new de_peote_tools_Holes(max_segments);
	this.activeProgramSlots = new haxe_ds_IntMap();
};
de_peote_view_Buffer.__name__ = true;
de_peote_view_Buffer.prototype = {
	'delete': function() {
		this.activeProgram = null;
		this.segment_holes = null;
		this.activeProgramSlots = null;
	}
	,delElement: function(e) {
		e.act_program.element_holes.addHole(Math.floor((e.buf_pos - e.act_program.buf_start) / de_peote_view_Buffer.VERTEX_COUNT));
		e.act_program.start = e.act_program.buf_start + 1 + e.act_program.element_holes.first() * de_peote_view_Buffer.VERTEX_COUNT;
		e.act_program.size = (e.act_program.element_holes.last() + 1 - e.act_program.element_holes.first()) * de_peote_view_Buffer.VERTEX_COUNT - 2;
		if(e.act_program.element_holes.is_empty()) {
			this.segment_holes.addHole(Math.floor(e.act_program.buf_start / this.segment_size / de_peote_view_Buffer.VERTEX_COUNT));
			HxOverrides.remove(this.activeProgramSlots.h[e.act_program.program_nr],e.act_program);
			HxOverrides.remove(this.activeProgram,e.act_program);
		}
	}
	,addElement: function(e,program,program_nr,programTextures,slot) {
		if(slot == null) slot = 0;
		var buf_pos = 0;
		var act_program = null;
		if(!this.activeProgramSlots.h.hasOwnProperty(program_nr)) this.activeProgramSlots.set(program_nr,[]);
		if(slot == this.activeProgramSlots.h[program_nr].length) {
			act_program = new de_peote_view_ActiveProgram(program,program_nr,programTextures,this.segment_size,this.segment_holes.getHole() * de_peote_view_Buffer.VERTEX_COUNT);
			this.activeProgramSlots.h[program_nr].push(act_program);
			this.activeProgram.push(act_program);
		} else act_program = this.activeProgramSlots.h[program_nr][slot];
		if(act_program.element_holes.hole.length == 0) this.addElement(e,program,program_nr,programTextures,slot + 1); else {
			buf_pos = act_program.buf_start + act_program.element_holes.getHole() * de_peote_view_Buffer.VERTEX_COUNT;
			act_program.start = act_program.buf_start + 1 + act_program.element_holes.first() * de_peote_view_Buffer.VERTEX_COUNT;
			act_program.size = (act_program.element_holes.last() + 1 - act_program.element_holes.first()) * de_peote_view_Buffer.VERTEX_COUNT - 2;
			e.bufferUpdate(act_program,buf_pos);
		}
	}
	,__class__: de_peote_view_Buffer
};
var de_peote_view_PeoteView = function(param) {
	this.framebuffer = null;
	if(param.maxDisplaylists == null) param.maxDisplaylists = 1;
	if(param.maxPrograms == null) param.maxPrograms = 1;
	if(param.maxTextures == null) param.maxTextures = 1;
	if(param.maxImages == null) param.maxImages = 1;
	de_peote_view_PeoteView.MAX_TEXTURE_SIZE = lime_graphics_opengl_GL.context.getParameter(3379);
	haxe_Log.trace("GL.MAX_TEXTURE_IMAGE_UNITS:" + Std.string(lime_graphics_opengl_GL.context.getParameter(34930)),{ fileName : "PeoteView.hx", lineNumber : 104, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe_Log.trace("GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS:" + Std.string(lime_graphics_opengl_GL.context.getParameter(34930)),{ fileName : "PeoteView.hx", lineNumber : 105, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe_Log.trace("GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS:" + Std.string(lime_graphics_opengl_GL.context.getParameter(35660)),{ fileName : "PeoteView.hx", lineNumber : 106, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe_Log.trace("GL.MAX_TEXTURE_SIZE:" + Std.string(lime_graphics_opengl_GL.context.getParameter(3379)),{ fileName : "PeoteView.hx", lineNumber : 107, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe_Log.trace("GL.MAX_VERTEX_ATTRIBS:" + Std.string(lime_graphics_opengl_GL.context.getParameter(34921)),{ fileName : "PeoteView.hx", lineNumber : 108, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe_Log.trace("GL.MAX_VERTEX_UNIFORM_VECTORS:" + Std.string(lime_graphics_opengl_GL.context.getParameter(36347)),{ fileName : "PeoteView.hx", lineNumber : 109, className : "de.peote.view.PeoteView", methodName : "new"});
	haxe_Log.trace("GL.MAX_FRAGMENT_UNIFORM_VECTORS:" + Std.string(lime_graphics_opengl_GL.context.getParameter(36349)),{ fileName : "PeoteView.hx", lineNumber : 110, className : "de.peote.view.PeoteView", methodName : "new"});
	var this1;
	this1 = new Array(param.maxTextures);
	this.textures = this1;
	this.imageCache = new de_peote_view_texture_ImageCache(param.maxImages,this.textures);
	this.programCache = new de_peote_view_ProgramCache(param.maxPrograms + 1,this.textures);
	this.startDisplaylist = null;
	var this2;
	this2 = new Array(param.maxDisplaylists);
	this.displaylist = this2;
	this.createBackgroundBuffer();
	var this3;
	this3 = new Uint8Array(4);
	this.picked = this3;
};
de_peote_view_PeoteView.__name__ = true;
de_peote_view_PeoteView.prototype = {
	setTexture: function(param) {
		if(this.textures[param.texture] == null) {
			var val = new de_peote_view_texture_Texture(param);
			this.textures[param.texture] = val;
		} else haxe_Log.trace("re-set Texture ist not implemented yet",{ fileName : "PeoteView.hx", lineNumber : 138, className : "de.peote.view.PeoteView", methodName : "setTexture"});
	}
	,delTexture: function(param) {
		haxe_Log.trace("not fully implemented yet",{ fileName : "PeoteView.hx", lineNumber : 143, className : "de.peote.view.PeoteView", methodName : "delTexture"});
	}
	,setDisplaylist: function(param) {
		var d = this.displaylist[param.displaylist];
		if(d == null) {
			if(param.type == null) param.type = 0;
			if((param.type & 128) != 0 && this.framebuffer == null) {
				this.fb_texture = de_peote_view_texture_Texture.createEmptyTexture(1,1);
				this.framebuffer = lime_graphics_opengl_GL.context.createFramebuffer();
				lime_graphics_opengl_GL.context.bindFramebuffer(36160,this.framebuffer);
				lime_graphics_opengl_GL.context.framebufferTexture2D(36160,36064,3553,this.fb_texture,0);
				lime_graphics_opengl_GL.context.bindFramebuffer(36160,null);
			}
			if((param.type & 1) != 0) d = new de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementAnim_$de_$peote_$view_$element_$ElementAnimBuffer(param,this.programCache,this.imageCache); else d = new de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementSimple_$de_$peote_$view_$element_$ElementSimpleBuffer(param,this.programCache,this.imageCache);
			this.displaylist[param.displaylist] = d;
			if(param.enable != false) this.insertSortDisplaylist(d); else d.enable = false;
		} else if(param.enable != null && param.enable != d.enable) {
			if(param.z != null && param.z != d.z) d.z = param.z;
			d.enable = param.enable;
			if(param.enable) this.insertSortDisplaylist(d); else {
				if(d == this.startDisplaylist) if(d.next != d) this.startDisplaylist = d.next; else this.startDisplaylist = null;
				d.prev.next = d.next;
				d.next.prev = d.prev;
				d.next = d.prev = d;
			}
		} else if(param.z != null && param.z != d.z) {
			d.z = param.z;
			if(d.enable) {
				if(d == this.startDisplaylist) if(d.next != d) this.startDisplaylist = d.next; else this.startDisplaylist = null;
				d.prev.next = d.next;
				d.next.prev = d.prev;
				d.next = d.prev = d;
				this.insertSortDisplaylist(d);
			}
		}
		d.set(param);
	}
	,unlinkDisplaylist: function(d) {
		if(d == this.startDisplaylist) if(d.next != d) this.startDisplaylist = d.next; else this.startDisplaylist = null;
		d.prev.next = d.next;
		d.next.prev = d.prev;
		d.next = d.prev = d;
	}
	,insertSortDisplaylist: function(d) {
		if(this.startDisplaylist == null) this.startDisplaylist = d; else {
			var i = this.startDisplaylist.prev;
			while(d.z < i.z && i != this.startDisplaylist) i = i.prev;
			d.prev = i.prev;
			d.next = i;
			i.prev.next = d;
			i.prev = d;
			if(d.next == this.startDisplaylist && d.z <= this.startDisplaylist.z) this.startDisplaylist = d;
		}
	}
	,delDisplaylist: function(param) {
		var d = this.displaylist[param.displaylist];
		if(d != null) {
			if(d.enable) {
				if(d == this.startDisplaylist) if(d.next != d) this.startDisplaylist = d.next; else this.startDisplaylist = null;
				d.prev.next = d.next;
				d.next.prev = d.prev;
				d.next = d.prev = d;
			}
			this.displaylist[param.displaylist] = null;
			d["delete"]();
		}
	}
	,getDisplaylist: function(param) {
		return this.displaylist[param.displaylist != null?param.displaylist:de_peote_view_PeoteView.elementDefaults.displaylist];
	}
	,setProgram: function(param) {
		if(param.fshadersrc == null && param.fshader != null) param.fshadersrc = this.programCache.loadShader(param.fshader);
		if(param.vshadersrc == null && param.vshader != null) param.vshadersrc = this.programCache.loadShader(param.vshader);
		this.programCache.setProgram(param);
	}
	,setImage: function(param) {
		this.imageCache.setImage(param);
	}
	,delImage: function(param) {
		haxe_Log.trace("not implemented yet",{ fileName : "PeoteView.hx", lineNumber : 284, className : "de.peote.view.PeoteView", methodName : "delImage"});
	}
	,setElement: function(param) {
		if(param.element != null) this.displaylist[param.displaylist != null?param.displaylist:de_peote_view_PeoteView.elementDefaults.displaylist].setElement(param); else haxe_Log.trace("ERROR: no element specified",{ fileName : "PeoteView.hx", lineNumber : 297, className : "de.peote.view.PeoteView", methodName : "setElement"});
	}
	,getElement: function(param) {
		var p = { };
		if(param.element != null) p = this.displaylist[param.displaylist != null?param.displaylist:de_peote_view_PeoteView.elementDefaults.displaylist].getElement(param.element); else haxe_Log.trace("ERROR: no element specified",{ fileName : "PeoteView.hx", lineNumber : 305, className : "de.peote.view.PeoteView", methodName : "getElement"});
		return p;
	}
	,hasElement: function(param) {
		if(param.element == null) return false; else return this.displaylist[param.displaylist != null?param.displaylist:de_peote_view_PeoteView.elementDefaults.displaylist].hasElement(param.element);
	}
	,delElement: function(param) {
		if(param.element != null) this.displaylist[param.displaylist != null?param.displaylist:de_peote_view_PeoteView.elementDefaults.displaylist].delElement(param.element); else haxe_Log.trace("ERROR: no element specified",{ fileName : "PeoteView.hx", lineNumber : 318, className : "de.peote.view.PeoteView", methodName : "delElement"});
	}
	,delAllElement: function(param) {
		this.displaylist[param.displaylist != null?param.displaylist:de_peote_view_PeoteView.elementDefaults.displaylist].delAllElement();
	}
	,setElementDefaults: function(param) {
		if(param.displaylist != null) de_peote_view_PeoteView.elementDefaults.displaylist = param.displaylist;
		if(param.program != null) de_peote_view_PeoteView.elementDefaults.program = param.program;
		if(param.image != null) de_peote_view_PeoteView.elementDefaults.image = param.image;
		if(param.tile != null) de_peote_view_PeoteView.elementDefaults.tile = param.tile;
		if(param.x != null) de_peote_view_PeoteView.elementDefaults.x = param.x;
		if(param.y != null) de_peote_view_PeoteView.elementDefaults.y = param.y;
		if(param.w != null) de_peote_view_PeoteView.elementDefaults.w = param.w;
		if(param.h != null) de_peote_view_PeoteView.elementDefaults.h = param.h;
		if(param.z != null) de_peote_view_PeoteView.elementDefaults.z = param.z;
	}
	,render: function(time,width,height,mouseX,mouseY,zoom,xOffset,yOffset) {
		if(yOffset == null) yOffset = 0;
		if(xOffset == null) xOffset = 0;
		lime_graphics_opengl_GL.context.viewport(0,0,width,height);
		lime_graphics_opengl_GL.context.scissor(0,0,width,height);
		lime_graphics_opengl_GL.context.enable(3089);
		lime_graphics_opengl_GL.context.clearColor(0.0,0.0,0.0,1.0);
		lime_graphics_opengl_GL.context.clear(16640);
		this.dl = this.startDisplaylist;
		while(this.dl != null) {
			var sx = (this.dl.x + xOffset) * zoom;
			var sy = (this.dl.y + yOffset) * zoom;
			var sw;
			if(this.dl.w != 0) sw = this.dl.w * zoom; else sw = width * zoom;
			var sh;
			if(this.dl.h != 0) sh = this.dl.h * zoom; else sh = height * zoom;
			if(sx < 0) sw += sx;
			sx = Std["int"](Math.max(0,Math.min(width,sx)));
			sw = Std["int"](Math.max(0,Math.min(width - sx,sw)));
			if(sy < 0) sh += sy;
			sy = Std["int"](Math.max(0,Math.min(height,sy)));
			sh = Std["int"](Math.max(0,Math.min(height - sy,sh)));
			lime_graphics_opengl_GL.context.scissor(sx,height - sh - sy,sw,sh);
			if((this.dl.type & 4) != 0) {
				if(this.dl != this.startDisplaylist) lime_graphics_opengl_GL.context.clear(256);
				lime_graphics_opengl_GL.context.enable(2929);
				lime_graphics_opengl_GL.context.depthFunc(515);
			} else lime_graphics_opengl_GL.context.disable(2929);
			if(this.dl.blend != 0) {
				lime_graphics_opengl_GL.context.enable(3042);
				lime_graphics_opengl_GL.context.blendFunc(770,771);
			} else lime_graphics_opengl_GL.context.disable(3042);
			if(this.dl.renderBackground) {
				lime_graphics_opengl_GL.context.bindBuffer(34962,this.background_buffer);
				lime_graphics_opengl_GL.context.enableVertexAttribArray(this.background_aPosition);
				lime_graphics_opengl_GL.context.vertexAttribPointer(this.background_aPosition,2,5126,false,8,0);
				lime_graphics_opengl_GL.context.useProgram(this.background_program);
				lime_graphics_opengl_GL.context.uniform4f(this.background_uRGBA,this.dl.r,this.dl.g,this.dl.b,this.dl.a);
				lime_graphics_opengl_GL.context.drawArrays(5,0,4);
				lime_graphics_opengl_GL.context.disableVertexAttribArray(this.background_aPosition);
			}
			lime_graphics_opengl_GL.context.bindBuffer(34962,this.dl.elemBuff.glBuff);
			this.dl.elemBuff.setVertexAttributes();
			var len = this.dl.buffer.activeProgram.length;
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				this.ap = this.dl.buffer.activeProgram[i];
				lime_graphics_opengl_GL.context.useProgram(this.ap.program.glProgram);
				var len1 = this.ap.textures.texture.length;
				var _g1 = 0;
				while(_g1 < len1) {
					var j = _g1++;
					lime_graphics_opengl_GL.context.activeTexture(de_peote_view_ActiveTextures.slot[j]);
					lime_graphics_opengl_GL.context.bindTexture(3553,this.ap.textures.texture[j].texture);
					lime_graphics_opengl_GL.context.uniform1i(this.ap.program.uniforms[de_peote_view_Program.uTEXTURE[j]],j);
				}
				lime_graphics_opengl_GL.context.uniform2f(this.ap.program.uniforms[0],mouseX / width * 2 - 1,mouseY / height * 2 - 1);
				lime_graphics_opengl_GL.context.uniform2f(this.ap.program.uniforms[1],width,height);
				lime_graphics_opengl_GL.context.uniform1f(this.ap.program.uniforms[2],time);
				lime_graphics_opengl_GL.context.uniform1f(this.ap.program.uniforms[3],this.dl.zoom * zoom);
				lime_graphics_opengl_GL.context.uniform2f(this.ap.program.uniforms[4],this.dl.x + this.dl.xOffset + xOffset,this.dl.y + this.dl.yOffset + yOffset);
				lime_graphics_opengl_GL.context.drawArrays(5,this.ap.start,this.ap.size);
				lime_graphics_opengl_GL.context.useProgram(null);
			}
			this.dl.elemBuff.disableVertexAttributes();
			lime_graphics_opengl_GL.context.bindBuffer(34962,null);
			lime_graphics_opengl_GL.context.bindTexture(3553,null);
			if(this.dl.next != this.startDisplaylist) this.dl = this.dl.next; else this.dl = null;
		}
		lime_graphics_opengl_GL.context.bindBuffer(34962,null);
		lime_graphics_opengl_GL.context.bindTexture(3553,null);
		lime_graphics_opengl_GL.context.useProgram(null);
	}
	,createBackgroundBuffer: function() {
		this.background_program = lime_utils_GLUtils.createProgram("\r\n\t\t\tattribute vec2 aPosition;\r\n\t\t\t\r\n\t\t\tvoid main(void)\r\n\t\t\t{\r\n\t\t\t\tgl_Position = mat4 ( // TODO: mathstar-optimize this ;)=\r\n\t\t\t\t\tvec4(2.0, 0.0, 0.0, 0.0),\r\n\t\t\t\t\tvec4(0.0, -2.0, 0.0, 0.0),\r\n\t\t\t\t\tvec4(0.0, 0.0, 0.0, 0.0),\r\n\t\t\t\t\tvec4(-1.0, 1.0, 0.0, 1.0)\r\n\t\t\t\t)\r\n\t\t\t\t* vec4 (aPosition, -65000.0 ,1.0); // 65000? -> zIndex (todo for <zero)\r\n\t\t\t}\r\n\t\t\t","precision mediump float;" + "\r\n\t\t\tuniform vec4 uRGBA;\r\n\t\t\tvoid main(void)\r\n\t\t\t{\r\n\t\t\t\tgl_FragColor = uRGBA;\r\n\t\t\t}\r\n\t\t\t");
		this.background_aPosition = lime_graphics_opengl_GL.context.getAttribLocation(this.background_program,"aPosition");
		this.background_uRGBA = lime_graphics_opengl_GL.context.getUniformLocation(this.background_program,"uRGBA");
		var data = [1,1,0,1,1,0,0,0];
		this.background_buffer = lime_graphics_opengl_GL.context.createBuffer();
		lime_graphics_opengl_GL.context.bindBuffer(34962,this.background_buffer);
		lime_graphics_opengl_GL.bufferData(34962,(function($this) {
			var $r;
			var this1;
			if(data != null) this1 = new Float32Array(data); else this1 = null;
			$r = this1;
			return $r;
		}(this)),35044);
		lime_graphics_opengl_GL.context.bindBuffer(34962,null);
	}
	,renderBackground: function(r,g,b,a) {
		lime_graphics_opengl_GL.context.bindBuffer(34962,this.background_buffer);
		lime_graphics_opengl_GL.context.enableVertexAttribArray(this.background_aPosition);
		lime_graphics_opengl_GL.context.vertexAttribPointer(this.background_aPosition,2,5126,false,8,0);
		lime_graphics_opengl_GL.context.useProgram(this.background_program);
		lime_graphics_opengl_GL.context.uniform4f(this.background_uRGBA,r,g,b,a);
		lime_graphics_opengl_GL.context.drawArrays(5,0,4);
		lime_graphics_opengl_GL.context.disableVertexAttribArray(this.background_aPosition);
	}
	,createFramebuffer: function() {
		this.fb_texture = de_peote_view_texture_Texture.createEmptyTexture(1,1);
		this.framebuffer = lime_graphics_opengl_GL.context.createFramebuffer();
		lime_graphics_opengl_GL.context.bindFramebuffer(36160,this.framebuffer);
		lime_graphics_opengl_GL.context.framebufferTexture2D(36160,36064,3553,this.fb_texture,0);
		lime_graphics_opengl_GL.context.bindFramebuffer(36160,null);
	}
	,pick: function(displaylist_nr,time,mouseX,mouseY,zoom,xOffset,yOffset) {
		if(yOffset == null) yOffset = 0;
		if(xOffset == null) xOffset = 0;
		var dl = this.displaylist[displaylist_nr];
		var width = 1;
		var height = 1;
		xOffset -= Math.round(mouseX / zoom);
		yOffset -= Math.round(mouseY / zoom);
		lime_graphics_opengl_GL.context.bindFramebuffer(36160,this.framebuffer);
		lime_graphics_opengl_GL.context.viewport(0,0,width,height);
		lime_graphics_opengl_GL.context.scissor(0,0,width,height);
		lime_graphics_opengl_GL.context.enable(3089);
		lime_graphics_opengl_GL.context.clearColor(0.0,0.0,0.0,0.0);
		lime_graphics_opengl_GL.context.clear(16640);
		var sx = (dl.x + xOffset) * zoom;
		var sy = (dl.y + yOffset) * zoom;
		var sw;
		if(dl.w != 0) sw = dl.w * zoom; else sw = width * zoom;
		var sh;
		if(dl.h != 0) sh = dl.h * zoom; else sh = height * zoom;
		if(sx < 0) sw += sx;
		sx = Std["int"](Math.max(0,Math.min(width,sx)));
		sw = Std["int"](Math.max(0,Math.min(width - sx,sw)));
		if(sy < 0) sh += sy;
		sy = Std["int"](Math.max(0,Math.min(height,sy)));
		sh = Std["int"](Math.max(0,Math.min(height - sy,sh)));
		lime_graphics_opengl_GL.context.scissor(sx,height - sh - sy,sw,sh);
		lime_graphics_opengl_GL.context.enable(2929);
		lime_graphics_opengl_GL.context.depthFunc(515);
		lime_graphics_opengl_GL.context.disable(3042);
		lime_graphics_opengl_GL.context.clear(256);
		lime_graphics_opengl_GL.context.bindBuffer(34962,dl.elemBuff.glBuff);
		dl.elemBuff.setVertexAttributes();
		var len = dl.buffer.activeProgram.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.ap = dl.buffer.activeProgram[i];
			lime_graphics_opengl_GL.context.useProgram(this.ap.program.glProgram);
			var len1 = this.ap.textures.texture.length;
			var _g1 = 0;
			while(_g1 < len1) {
				var j = _g1++;
				lime_graphics_opengl_GL.context.activeTexture(de_peote_view_ActiveTextures.slot[j]);
				lime_graphics_opengl_GL.context.bindTexture(3553,this.ap.textures.texture[j].texture);
				lime_graphics_opengl_GL.context.uniform1i(this.ap.program.uniforms[de_peote_view_Program.uTEXTURE[j]],j);
			}
			lime_graphics_opengl_GL.context.uniform2f(this.ap.program.uniforms[0],mouseX / width * 2 - 1,mouseY / height * 2 - 1);
			lime_graphics_opengl_GL.context.uniform2f(this.ap.program.uniforms[1],width,height);
			lime_graphics_opengl_GL.context.uniform1f(this.ap.program.uniforms[2],time);
			lime_graphics_opengl_GL.context.uniform1f(this.ap.program.uniforms[3],dl.zoom * zoom);
			lime_graphics_opengl_GL.context.uniform2f(this.ap.program.uniforms[4],dl.x + dl.xOffset + xOffset,dl.y + dl.yOffset + yOffset);
			lime_graphics_opengl_GL.context.drawArrays(5,this.ap.start,this.ap.size);
		}
		dl.elemBuff.disableVertexAttributes();
		lime_graphics_opengl_GL.context.bindBuffer(34962,null);
		lime_graphics_opengl_GL.context.bindTexture(3553,null);
		lime_graphics_opengl_GL.context.useProgram(null);
		if(lime_graphics_opengl_GL.context.checkFramebufferStatus(36160) == 36053) lime_graphics_opengl_GL.context.readPixels(0,0,width,height,6408,5121,this.picked); else haxe_Log.trace("PICKING ERROR: Framebuffer not complete",{ fileName : "PeoteView.hx", lineNumber : 643, className : "de.peote.view.PeoteView", methodName : "pick"});
		lime_graphics_opengl_GL.context.bindFramebuffer(36160,null);
		return this.picked[3] << 24 | this.picked[2] << 16 | this.picked[1] << 8 | this.picked[0] - 1;
	}
	,__class__: de_peote_view_PeoteView
};
var de_peote_view_Program = function(defaultProgram) {
	this.glProgram = null;
	if(defaultProgram != null) {
		this.glProgram = defaultProgram.glProgram;
		this.uniforms = defaultProgram.uniforms;
	}
};
de_peote_view_Program.__name__ = true;
de_peote_view_Program.prototype = {
	parseType: function(type,textureUnits,s) {
		s = de_peote_view_Program.rComment.replace(s,"");
		s = de_peote_view_Program.rNewline.replace(s,"");
		s = de_peote_view_Program.rSpaces.replace(s,"");
		if((type & 4) != 0) {
			s = de_peote_view_Program.rZINDEXstart.replace(s,"#end_ZINDEX");
			s = de_peote_view_Program.rZINDEXend.replace(s,"$1");
		} else {
			s = de_peote_view_Program.rZINDEXstart.replace(s,"#end_ZINDEX$1");
			s = de_peote_view_Program.rZINDEXend.replace(s,"");
		}
		if((type & 8) != 0) {
			s = de_peote_view_Program.rRGBAstart.replace(s,"#end_RGBA");
			s = de_peote_view_Program.rRGBAend.replace(s,"$1");
		} else {
			s = de_peote_view_Program.rRGBAstart.replace(s,"#end_RGBA$1");
			s = de_peote_view_Program.rRGBAend.replace(s,"");
		}
		if((type & 16) != 0) {
			s = de_peote_view_Program.rROTATIONstart.replace(s,"#end_ROTATION");
			s = de_peote_view_Program.rROTATIONend.replace(s,"$1");
		} else {
			s = de_peote_view_Program.rROTATIONstart.replace(s,"#end_ROTATION$1");
			s = de_peote_view_Program.rROTATIONend.replace(s,"");
		}
		if((type & 128) != 0) {
			s = de_peote_view_Program.rPICKINGstart.replace(s,"#end_PICKING");
			s = de_peote_view_Program.rPICKINGend.replace(s,"$1");
		} else {
			s = de_peote_view_Program.rPICKINGstart.replace(s,"#end_PICKING$1");
			s = de_peote_view_Program.rPICKINGend.replace(s,"");
		}
		var slots = 0;
		if(textureUnits != null) slots = textureUnits.texture.length;
		if(slots > 0) {
			s = de_peote_view_Program.rMAX_TEXTURE0.replace(s,"vec2(" + textureUnits.texture[0].max_texture_width + ".0," + textureUnits.texture[0].max_texture_height + ".0)");
			s = de_peote_view_Program.rTEXTURE0start.replace(s,"#end_TEXTURE0");
			s = de_peote_view_Program.rTEXTURE0end.replace(s,"$1");
		} else {
			s = de_peote_view_Program.rTEXTURE0start.replace(s,"#end_TEXTURE0$1");
			s = de_peote_view_Program.rTEXTURE0end.replace(s,"");
		}
		if(slots > 1) {
			s = de_peote_view_Program.rMAX_TEXTURE1.replace(s,"vec2(" + textureUnits.texture[1].max_texture_width + ".0," + textureUnits.texture[1].max_texture_height + ".0)");
			s = de_peote_view_Program.rTEXTURE1start.replace(s,"#end_TEXTURE1");
			s = de_peote_view_Program.rTEXTURE1end.replace(s,"$1");
		} else {
			s = de_peote_view_Program.rTEXTURE1start.replace(s,"#end_TEXTURE1$1");
			s = de_peote_view_Program.rTEXTURE1end.replace(s,"");
		}
		return s;
	}
	,compile: function(elemBuff,type,textureUnits,fragmentShaderSrc,vertexShaderSrc,onerror) {
		vertexShaderSrc = this.parseType(type,textureUnits,vertexShaderSrc);
		vertexShaderSrc = "precision mediump float;" + vertexShaderSrc;
		fragmentShaderSrc = this.parseType(type,textureUnits,fragmentShaderSrc);
		fragmentShaderSrc = "precision mediump float;" + fragmentShaderSrc;
		fragmentShaderSrc = "#extension GL_OES_standard_derivatives : enable\n" + fragmentShaderSrc;
		lime_graphics_opengl_GL.context.getExtension("OES_standard_derivatives");
		var r = new EReg(";","g");
		haxe_Log.trace("VERTEXSHADER:\n" + r.replace(vertexShaderSrc,";\n"),{ fileName : "Program.hx", lineNumber : 190, className : "de.peote.view.Program", methodName : "compile"});
		haxe_Log.trace("FRAGMENTSHADER:\n" + r.replace(fragmentShaderSrc,";\n"),{ fileName : "Program.hx", lineNumber : 191, className : "de.peote.view.Program", methodName : "compile"});
		var fs = lime_graphics_opengl_GL.context.createShader(35632);
		lime_graphics_opengl_GL.context.shaderSource(fs,fragmentShaderSrc);
		lime_graphics_opengl_GL.context.compileShader(fs);
		var vs = lime_graphics_opengl_GL.context.createShader(35633);
		lime_graphics_opengl_GL.context.shaderSource(vs,vertexShaderSrc);
		lime_graphics_opengl_GL.context.compileShader(vs);
		if(lime_graphics_opengl_GL.context.getShaderParameter(fs,35713) == 0) onerror("ERROR fragmentShader: " + lime_graphics_opengl_GL.context.getShaderInfoLog(fs)); else if(lime_graphics_opengl_GL.context.getShaderParameter(vs,35713) == 0) onerror("ERROR vertexShader: " + lime_graphics_opengl_GL.context.getShaderInfoLog(vs)); else {
			this.glProgram = lime_graphics_opengl_GL.context.createProgram();
			lime_graphics_opengl_GL.context.attachShader(this.glProgram,vs);
			lime_graphics_opengl_GL.context.attachShader(this.glProgram,fs);
			lime_graphics_opengl_GL.context.deleteShader(vs);
			lime_graphics_opengl_GL.context.deleteShader(fs);
			lime_graphics_opengl_GL.context.bindAttribLocation(this.glProgram,1,"aTexCoord");
			lime_graphics_opengl_GL.context.linkProgram(this.glProgram);
			if(lime_graphics_opengl_GL.context.getProgramParameter(this.glProgram,35714) == 0) onerror(lime_graphics_opengl_GL.context.getProgramInfoLog(this.glProgram) + "VALIDATE_STATUS: " + lime_graphics_opengl_GL.context.getProgramParameter(this.glProgram,35715) + "ERROR: " + lime_graphics_opengl_GL.context.getError()); else {
				var name;
				if(elemBuff != null) {
					if(elemBuff.attr == null) {
						haxe_Log.trace("ANZAHL " + lime_graphics_opengl_GL.context.getProgramParameter(this.glProgram,35721),{ fileName : "Program.hx", lineNumber : 235, className : "de.peote.view.Program", methodName : "compile"});
						var this1;
						this1 = new Array(12);
						elemBuff.attr = this1;
						elemBuff.attr[1] = 1;
						var _g1 = 0;
						var _g = lime_graphics_opengl_GL.context.getProgramParameter(this.glProgram,35721);
						while(_g1 < _g) {
							var i = _g1++;
							name = lime_graphics_opengl_GL.context.getActiveAttrib(this.glProgram,i).name;
							haxe_Log.trace(name + ":" + lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name),{ fileName : "Program.hx", lineNumber : 246, className : "de.peote.view.Program", methodName : "compile"});
							switch(name) {
							case "aPosition":
								var val = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[0] = val;
								break;
							case "aZindex":
								var val1 = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[2] = val1;
								break;
							case "aRGBA":
								var val2 = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[3] = val2;
								break;
							case "aRGBA_END":
								var val3 = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[4] = val3;
								break;
							case "aRotation":
								var val4 = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[5] = val4;
								break;
							case "aPivot":
								var val5 = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[6] = val5;
								break;
							case "aTime":
								var val6 = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[7] = val6;
								break;
							case "aElement":
								var val7 = lime_graphics_opengl_GL.context.getAttribLocation(this.glProgram,name);
								elemBuff.attr[8] = val7;
								break;
							}
						}
					}
				}
				var length = lime_graphics_opengl_GL.context.getProgramParameter(this.glProgram,35718);
				var this2;
				this2 = new Array(length);
				this.uniforms = this2;
				var _g11 = 0;
				var _g2 = lime_graphics_opengl_GL.context.getProgramParameter(this.glProgram,35718);
				while(_g11 < _g2) {
					var i1 = _g11++;
					name = lime_graphics_opengl_GL.context.getActiveUniform(this.glProgram,i1).name;
					haxe_Log.trace(name + ":" + Std.string(lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name)),{ fileName : "Program.hx", lineNumber : 269, className : "de.peote.view.Program", methodName : "compile"});
					switch(name) {
					case "uMouse":
						var val8 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[0] = val8;
						break;
					case "uResolution":
						var val9 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[1] = val9;
						break;
					case "uTime":
						var val10 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[2] = val10;
						break;
					case "uZoom":
						var val11 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[3] = val11;
						break;
					case "uDelta":
						var val12 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[4] = val12;
						break;
					case "uTexture0":
						var val13 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[0]] = val13;
						break;
					case "uTexture1":
						var val14 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[1]] = val14;
						break;
					case "uTexture2":
						var val15 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[2]] = val15;
						break;
					case "uTexture3":
						var val16 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[3]] = val16;
						break;
					case "uTexture4":
						var val17 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[4]] = val17;
						break;
					case "uTexture5":
						var val18 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[5]] = val18;
						break;
					case "uTexture6":
						var val19 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[6]] = val19;
						break;
					case "uTexture7":
						var val20 = lime_graphics_opengl_GL.context.getUniformLocation(this.glProgram,name);
						this.uniforms[de_peote_view_Program.uTEXTURE[7]] = val20;
						break;
					}
				}
			}
		}
	}
	,__class__: de_peote_view_Program
};
var de_peote_view_ProgramCache = function(max_programs,textures) {
	this.attr = null;
	this.textures = textures;
	var this1;
	this1 = new Array(max_programs);
	this.fragmentShaderSrc = this1;
	var this2;
	this2 = new Array(max_programs);
	this.vertexShaderSrc = this2;
	var this3;
	this3 = new Array(max_programs);
	this.program = this3;
	var this4;
	this4 = new Array(max_programs);
	this.programTextures = this4;
	var _g = 0;
	while(_g < max_programs) {
		var i = _g++;
		var val = new haxe_ds_IntMap();
		this.program[i] = val;
		var val1 = new de_peote_view_ActiveTextures();
		this.programTextures[i] = val1;
	}
	this.defaultProgram = new haxe_ds_IntMap();
	this.attr = new haxe_ds_IntMap();
};
de_peote_view_ProgramCache.__name__ = true;
de_peote_view_ProgramCache.prototype = {
	onerror: function(msg) {
		haxe_Log.trace(msg,{ fileName : "ProgramCache.hx", lineNumber : 89, className : "de.peote.view.ProgramCache", methodName : "onerror"});
	}
	,addDisplaylist: function(type,elemBuff) {
		haxe_Log.trace("addDisplaylist:" + type,{ fileName : "ProgramCache.hx", lineNumber : 93, className : "de.peote.view.ProgramCache", methodName : "addDisplaylist"});
		if(!this.defaultProgram.h.hasOwnProperty(type)) {
			var p = new de_peote_view_Program();
			p.compile(elemBuff,type,null,elemBuff.getDefaultFragmentShaderSrc(),elemBuff.getDefaultVertexShaderSrc(),$bind(this,this.onerror));
			this.defaultProgram.h[type] = p;
			this.attr.h[type] = elemBuff.attr;
		} else elemBuff.attr = this.attr.h[type];
	}
	,getProgram: function(nr,type,elemBuff) {
		var p = this.program[nr].h[type];
		if(p == null) {
			var fs = this.fragmentShaderSrc[nr];
			var vs = this.vertexShaderSrc[nr];
			var textureUnits = this.programTextures[nr];
			if(fs != null || vs != null || textureUnits.texture.length > 0) {
				p = new de_peote_view_Program();
				if(fs == null) fs = elemBuff.getDefaultFragmentShaderSrc();
				if(vs == null) vs = elemBuff.getDefaultVertexShaderSrc();
				p.compile(elemBuff,type,textureUnits,fs,vs,$bind(this,this.onerror));
			} else p = new de_peote_view_Program(this.defaultProgram.h[type]);
			this.program[nr].h[type] = p;
		}
		return p;
	}
	,setProgram: function(param) {
		var textureUnits = this.programTextures[param.program];
		if(param.texture != null || param.textures != null) {
			if(param.textures == null) param.textures = [];
			if(param.texture != null) param.textures.push(param.texture);
			var len = Math.floor(Math.max(param.textures.length,textureUnits.texture.length));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(i >= param.textures.length) textureUnits.texture.pop(); else {
					var t = this.textures[param.textures[i]];
					if(t != null) {
						if(i >= textureUnits.texture.length) textureUnits.texture.push(t); else textureUnits.texture[i] = t;
					} else haxe_Log.trace("ERROR: texture " + param.textures[i] + " is not defined",{ fileName : "ProgramCache.hx", lineNumber : 165, className : "de.peote.view.ProgramCache", methodName : "setProgram"});
				}
			}
		}
		if(param.fshadersrc != null || param.vshadersrc != null) {
			var pmap = this.program[param.program];
			var default_fs;
			var default_vs;
			var $it0 = pmap.keys();
			while( $it0.hasNext() ) {
				var type = $it0.next();
				if((type & 1) != 0) {
					default_fs = "\tvarying vec2 vTexCoord;\r\n\t\t#if_RGBA\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#else_RGBA\r\n\t\t\t#if_PICKING\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_PICKING\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tuniform vec2 uResolution;\r\n\t\t#end_PICKING\r\n\t\t\r\n\t\t\r\n\t\t#if_TEXTURE0\r\n\t\tuniform sampler2D uTexture0;\r\n\t\t#end_TEXTURE0\r\n\t\t\r\n\t\t#if_TEXTURE1\r\n\t\tuniform sampler2D uTexture1;\r\n\t\t#end_TEXTURE1\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\r\n\t\t\t#if_TEXTURE0\r\n\t\t\tvec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#else_TEXTURE0\r\n\t\t\tvec4 texel = vec4(1.0, 1.0, 1.0, 1.0);\r\n\t\t\t#end_TEXTURE0\r\n\t\t\t\r\n\t\t\t// if use more than one texture unit to combine or do something crazy here:)\r\n\t\t\t#if_TEXTURE1\r\n\t\t\ttexel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#end_TEXTURE1\r\n\t\t\t// ... TEXTURE2 ...TEXTURE3 ...\t\t\t\r\n\t\t\t\r\n\t\t\tif (texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) { \r\n\t\t\t\tgl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\t\t\t\t\r\n\t\t\t}\r\n\t\t\t#else_PICKING\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\r\n\t\t\t#end_PICKING\r\n\t\t}\r\n\t";
					default_vs = "\tattribute vec4 aPosition;\r\n\t\t\r\n\t\t#if_ZINDEX\r\n\t\tattribute float aZindex;\r\n\t\t#end_ZINDEX\r\n\t\t\r\n\t\t#if_RGBA\r\n\t\tattribute vec4 aRGBA;\r\n\t\tattribute vec4 aRGBA_END;\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_ROTATION\r\n\t\tattribute vec2 aRotation;\r\n\t\tattribute vec4 aPivot;\r\n\t\t#end_ROTATION\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tattribute vec4 aElement;\r\n\t\t\t#if_RGBA\r\n\t\t\t#else_RGBA\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_RGBA\r\n\t\t#end_PICKING\r\n\t\t\t\r\n\t\tattribute vec2 aTime;\r\n\t\t\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\t#if_RGBA\r\n\t\t\tvRGBA = aRGBA.wzyx + (aRGBA_END.wzyx - aRGBA.wzyx) * max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0));\t\r\n\t\t\t#end_RGBA\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) {\r\n\t\t\t\tvRGBA = aElement;\r\n\t\t\t}\r\n\t\t\t#end_PICKING\r\n\t\t\t\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\r\n\t\t\tvec2 VertexPosStart = vec2 ( aPosition ); //vec2 (aPosition.x, aPosition.y);\r\n\t\t\tvec2 VertexPosEnd   = vec2 ( aPosition.z, aPosition.w);\r\n\t\t\t\r\n\t\t\t#if_ROTATION\r\n\t\t\tfloat alpha = aRotation.x + (aRotation.y - aRotation.x)\t* max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0));\r\n\t\t\t\t\t\t\t\t\r\n\t\t\tVertexPosStart = (VertexPosStart - vec2(aPivot))\r\n\t\t\t\t\t\t\t* mat2 (\r\n\t\t\t\t\t\t\t\tvec2(cos(alpha), -sin(alpha)),\r\n\t\t\t\t\t\t\t\tvec2(sin(alpha),  cos(alpha))\r\n\t\t\t\t\t\t\t) + vec2(aPivot);\r\n\t\t\t\r\n\t\t\tVertexPosEnd = (VertexPosEnd -  vec2(aPivot.z, aPivot.w))\r\n\t\t\t\t\t\t\t* mat2 (\r\n\t\t\t\t\t\t\t\tvec2(cos(alpha), -sin(alpha)),\r\n\t\t\t\t\t\t\t\tvec2(sin(alpha),  cos(alpha))\r\n\t\t\t\t\t\t\t) + vec2(aPivot.z, aPivot.w);\r\n\t\t\t#end_ROTATION\r\n\t\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -1.0, 0.0), // TODO\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4( VertexPosStart + floor( \r\n\t\t\t\t\t\t\t\t(VertexPosEnd - VertexPosStart)\r\n\t\t\t\t\t\t\t\t* max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0))\r\n\t\t\t\t\t\t\t\t* zoom) / zoom ,\r\n\t\t\t\t#if_ZINDEX\r\n\t\t\t\taZindex\r\n\t\t\t\t#else_ZINDEX\r\n\t\t\t\t0.0\r\n\t\t\t\t#end_ZINDEX\r\n\t\t\t\t, 1.0\r\n\t\t\t)\r\n\t\t\t// rotate displaylist\r\n\t\t\t// *mat4 (\r\n\t\t\t//\tvec4(cos(winkel), -sin(winkel), 0.0, 0.0),\r\n\t\t\t//\tvec4(sin(winkel),  cos(winkel), 0.0, 0.0),\r\n\t\t\t//\tvec4(        0.0,          1.0, 0.0, 0.0),\r\n\t\t\t//\tvec4(        0.0,          0.0, 0.0, 1.0)\r\n\t\t\t//)\r\n\t\t\t;\r\n\t\t}\r\n\t";
				} else {
					default_fs = "\tvarying vec2 vTexCoord;\r\n\t\t#if_RGBA\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#else_RGBA\r\n\t\t\t#if_PICKING\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_PICKING\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tuniform vec2 uResolution;\r\n\t\t#end_PICKING\r\n\t\t\r\n\t\t\r\n\t\t#if_TEXTURE0\r\n\t\tuniform sampler2D uTexture0;\r\n\t\t#end_TEXTURE0\r\n\t\t\r\n\t\t#if_TEXTURE1\r\n\t\tuniform sampler2D uTexture1;\r\n\t\t#end_TEXTURE1\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\t\r\n\t\t\t#if_TEXTURE0\r\n\t\t\tvec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#else_TEXTURE0\r\n\t\t\tvec4 texel = vec4(1.0, 1.0, 1.0, 1.0);\r\n\t\t\t#end_TEXTURE0\r\n\t\t\t\r\n\t\t\t// if use more than one texture unit to combine or do something crazy here:)\r\n\t\t\t#if_TEXTURE1\r\n\t\t\ttexel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#end_TEXTURE1\r\n\t\t\t// ... TEXTURE2 ...TEXTURE3 ...\r\n\t\t\t\r\n\t\t\tif (texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) { \r\n\t\t\t\tgl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\t\t\t\t\r\n\t\t\t}\r\n\t\t\t#else_PICKING\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\r\n\t\t\t#end_PICKING\r\n\t\t}\r\n\t";
					default_vs = "\tattribute vec2 aPosition;\r\n\t\t\r\n\t\t#if_ZINDEX\r\n\t\tattribute float aZindex;\r\n\t\t#end_ZINDEX\r\n\t\t\r\n\t\t#if_RGBA\r\n\t\tattribute vec4 aRGBA;\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#end_RGBA\r\n\r\n\t\t#if_PICKING\r\n\t\tattribute vec4 aElement;\r\n\t\t\t#if_RGBA\r\n\t\t\t#else_RGBA\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_RGBA\r\n\t\t#end_PICKING\r\n\t\t\t\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\t#if_RGBA\r\n\t\t\tvRGBA = aRGBA.wzyx;\r\n\t\t\t#end_RGBA\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) {\r\n\t\t\t\tvRGBA = aElement;\r\n\t\t\t}\r\n\t\t\t#end_PICKING\r\n\t\t\t\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -1.0, 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aPosition ,\r\n\t\t\t\t#if_ZINDEX\r\n\t\t\t\taZindex\r\n\t\t\t\t#else_ZINDEX\r\n\t\t\t\t0.0\r\n\t\t\t\t#end_ZINDEX\r\n\t\t\t\t, 1.0\r\n\t\t\t\t);\r\n\t\t}\r\n\t";
				}
				haxe_Log.trace("setShaderSrc:" + type,{ fileName : "ProgramCache.hx", lineNumber : 192, className : "de.peote.view.ProgramCache", methodName : "setProgram"});
				if(param.fshadersrc == "") pmap.h[type].compile(null,type,textureUnits,default_fs,param.vshadersrc,$bind(this,this.onerror)); else if(param.vshadersrc == "") pmap.h[type].compile(null,type,textureUnits,param.fshadersrc,default_vs,$bind(this,this.onerror)); else pmap.h[type].compile(null,type,textureUnits,param.fshadersrc,param.vshadersrc,$bind(this,this.onerror));
			}
			if(param.fshadersrc != "") this.fragmentShaderSrc[param.program] = param.fshadersrc;
			if(param.vshadersrc != "") this.vertexShaderSrc[param.program] = param.vshadersrc;
		}
	}
	,loadShader: function(url) {
		var shadersrc = "";
		var req = js_Browser.createXMLHttpRequest();
		req.open("GET",url,false);
		req.send();
		shadersrc = req.responseText;
		return shadersrc;
	}
	,__class__: de_peote_view_ProgramCache
};
var de_peote_view_displaylist_I_$Displaylist = function() { };
de_peote_view_displaylist_I_$Displaylist.__name__ = true;
de_peote_view_displaylist_I_$Displaylist.prototype = {
	__class__: de_peote_view_displaylist_I_$Displaylist
};
var de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementAnim_$de_$peote_$view_$element_$ElementAnimBuffer = function(param,programCache,imageCache) {
	this.enable = true;
	this.renderBackground = false;
	this.a = 1.0;
	this.b = 0.0;
	this.g = 0.0;
	this.r = 0.0;
	this.blend = 1;
	this.zoom = 1;
	this.yOffset = 0;
	this.xOffset = 0;
	this.z = 0;
	this.h = 0;
	this.w = 0;
	this.y = 0;
	this.x = 0;
	this.next = this;
	this.prev = this;
	this.type = 0;
	this.imageCache = imageCache;
	this.programCache = programCache;
	this.type = param.type;
	if(param.maxElements != null) this.elements = param.maxElements; else this.elements = 1;
	if(param.maxPrograms != null) this.programs = param.maxPrograms; else this.programs = 1;
	this.segments = Math.floor(Math.max(param.bufferSegments != null?param.bufferSegments:1,this.programs));
	if(param.z != null) this.z = param.z; else this.z = 0;
	var this1;
	this1 = new Array(this.elements);
	this.element = this1;
	this.buffer = new de_peote_view_Buffer(Math.floor(this.elements / this.segments),this.segments);
	this.elemBuff = js_Boot.__cast(new de_peote_view_element_ElementAnimBuffer(this.type,this.buffer) , de_peote_view_element_I_$ElementBuffer);
	programCache.addDisplaylist(this.type,this.elemBuff);
};
de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementAnim_$de_$peote_$view_$element_$ElementAnimBuffer.__name__ = true;
de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementAnim_$de_$peote_$view_$element_$ElementAnimBuffer.__interfaces__ = [de_peote_view_displaylist_I_$Displaylist];
de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementAnim_$de_$peote_$view_$element_$ElementAnimBuffer.prototype = {
	'delete': function() {
		this.elemBuff["delete"]();
		this.buffer["delete"]();
		this.element = null;
	}
	,set: function(param) {
		if(param.x != null) this.x = param.x;
		if(param.y != null) this.y = param.y;
		if(param.w != null) this.w = param.w;
		if(param.h != null) this.h = param.h;
		if(param.xOffset != null) this.xOffset = param.xOffset;
		if(param.yOffset != null) this.yOffset = param.yOffset;
		if(param.zoom != null) this.zoom = param.zoom;
		if(param.blend != null) this.blend = param.blend;
		if(param.r != null) this.r = param.r;
		if(param.g != null) this.g = param.g;
		if(param.b != null) this.b = param.b;
		if(param.a != null) this.a = param.a;
		if(param.renderBackground != null) this.renderBackground = param.renderBackground;
	}
	,setElement: function(param) {
		var e = this.element[param.element];
		if(e == null) {
			e = js_Boot.__cast(new de_peote_view_element_ElementAnim() , de_peote_view_element_I_$Element);
			if(param.program == null) param.program = this.programCache.program.length - 1;
			this.buffer.addElement(e,this.programCache.getProgram(param.program,this.type,this.elemBuff),param.program,this.programCache.programTextures[param.program]);
			this.element[param.element] = e;
		} else if(param.program != null && param.program != e.act_program.program_nr) {
			this.elemBuff.del(e);
			this.buffer.delElement(e);
			this.buffer.addElement(e,this.programCache.getProgram(param.program,this.type,this.elemBuff),param.program,this.programCache.programTextures[param.program]);
		}
		e.set(this.elemBuff,param,this.imageCache);
	}
	,getElement: function(element_nr) {
		var e = this.element[element_nr];
		if(e == null) return null; else return e.get();
	}
	,hasElement: function(element_nr) {
		return this.element[element_nr] != null;
	}
	,delElement: function(element_nr) {
		var e = this.element[element_nr];
		if(e != null) {
			this.element[element_nr] = null;
			this.buffer.delElement(e);
			e.del(this.elemBuff,this.imageCache);
		}
	}
	,delAllElement: function() {
		var _g1 = 0;
		var _g = this.element.length;
		while(_g1 < _g) {
			var element_nr = _g1++;
			this.delElement(element_nr);
		}
	}
	,__class__: de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementAnim_$de_$peote_$view_$element_$ElementAnimBuffer
};
var de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementSimple_$de_$peote_$view_$element_$ElementSimpleBuffer = function(param,programCache,imageCache) {
	this.enable = true;
	this.renderBackground = false;
	this.a = 1.0;
	this.b = 0.0;
	this.g = 0.0;
	this.r = 0.0;
	this.blend = 1;
	this.zoom = 1;
	this.yOffset = 0;
	this.xOffset = 0;
	this.z = 0;
	this.h = 0;
	this.w = 0;
	this.y = 0;
	this.x = 0;
	this.next = this;
	this.prev = this;
	this.type = 0;
	this.imageCache = imageCache;
	this.programCache = programCache;
	this.type = param.type;
	if(param.maxElements != null) this.elements = param.maxElements; else this.elements = 1;
	if(param.maxPrograms != null) this.programs = param.maxPrograms; else this.programs = 1;
	this.segments = Math.floor(Math.max(param.bufferSegments != null?param.bufferSegments:1,this.programs));
	if(param.z != null) this.z = param.z; else this.z = 0;
	var this1;
	this1 = new Array(this.elements);
	this.element = this1;
	this.buffer = new de_peote_view_Buffer(Math.floor(this.elements / this.segments),this.segments);
	this.elemBuff = js_Boot.__cast(new de_peote_view_element_ElementSimpleBuffer(this.type,this.buffer) , de_peote_view_element_I_$ElementBuffer);
	programCache.addDisplaylist(this.type,this.elemBuff);
};
de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementSimple_$de_$peote_$view_$element_$ElementSimpleBuffer.__name__ = true;
de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementSimple_$de_$peote_$view_$element_$ElementSimpleBuffer.__interfaces__ = [de_peote_view_displaylist_I_$Displaylist];
de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementSimple_$de_$peote_$view_$element_$ElementSimpleBuffer.prototype = {
	'delete': function() {
		this.elemBuff["delete"]();
		this.buffer["delete"]();
		this.element = null;
	}
	,set: function(param) {
		if(param.x != null) this.x = param.x;
		if(param.y != null) this.y = param.y;
		if(param.w != null) this.w = param.w;
		if(param.h != null) this.h = param.h;
		if(param.xOffset != null) this.xOffset = param.xOffset;
		if(param.yOffset != null) this.yOffset = param.yOffset;
		if(param.zoom != null) this.zoom = param.zoom;
		if(param.blend != null) this.blend = param.blend;
		if(param.r != null) this.r = param.r;
		if(param.g != null) this.g = param.g;
		if(param.b != null) this.b = param.b;
		if(param.a != null) this.a = param.a;
		if(param.renderBackground != null) this.renderBackground = param.renderBackground;
	}
	,setElement: function(param) {
		var e = this.element[param.element];
		if(e == null) {
			e = js_Boot.__cast(new de_peote_view_element_ElementSimple() , de_peote_view_element_I_$Element);
			if(param.program == null) param.program = this.programCache.program.length - 1;
			this.buffer.addElement(e,this.programCache.getProgram(param.program,this.type,this.elemBuff),param.program,this.programCache.programTextures[param.program]);
			this.element[param.element] = e;
		} else if(param.program != null && param.program != e.act_program.program_nr) {
			this.elemBuff.del(e);
			this.buffer.delElement(e);
			this.buffer.addElement(e,this.programCache.getProgram(param.program,this.type,this.elemBuff),param.program,this.programCache.programTextures[param.program]);
		}
		e.set(this.elemBuff,param,this.imageCache);
	}
	,getElement: function(element_nr) {
		var e = this.element[element_nr];
		if(e == null) return null; else return e.get();
	}
	,hasElement: function(element_nr) {
		return this.element[element_nr] != null;
	}
	,delElement: function(element_nr) {
		var e = this.element[element_nr];
		if(e != null) {
			this.element[element_nr] = null;
			this.buffer.delElement(e);
			e.del(this.elemBuff,this.imageCache);
		}
	}
	,delAllElement: function() {
		var _g1 = 0;
		var _g = this.element.length;
		while(_g1 < _g) {
			var element_nr = _g1++;
			this.delElement(element_nr);
		}
	}
	,__class__: de_peote_view_displaylist_Displaylist_$de_$peote_$view_$element_$ElementSimple_$de_$peote_$view_$element_$ElementSimpleBuffer
};
var de_peote_view_element_BufferData = function(length) {
	this.dataView = new DataView(new ArrayBuffer(length),0);
};
de_peote_view_element_BufferData.__name__ = true;
de_peote_view_element_BufferData.prototype = {
	write_2_Short: function(a1,a2) {
		this.dataView.setInt16(this.byteOffset,a1,true);
		this.dataView.setInt16(this.byteOffset + 2,a2,true);
		this.byteOffset += 4;
	}
	,write_1_UInt: function(a1) {
		this.dataView.setUint32(this.byteOffset,a1,true);
		this.byteOffset += 4;
	}
	,write_1_Float: function(a1) {
		this.dataView.setFloat32(this.byteOffset,a1,true);
		this.byteOffset += 4;
	}
	,write_2_Float: function(a1,a2) {
		this.dataView.setFloat32(this.byteOffset,a1,true);
		this.dataView.setFloat32(this.byteOffset + 4,a2,true);
		this.byteOffset += 8;
	}
	,__class__: de_peote_view_element_BufferData
};
var de_peote_view_element_I_$Element = function() { };
de_peote_view_element_I_$Element.__name__ = true;
de_peote_view_element_I_$Element.prototype = {
	__class__: de_peote_view_element_I_$Element
};
var de_peote_view_element_ElementAnim = function() {
	this.time = 0.0;
	this.tile = -1;
	this.image = -1;
	this.x = de_peote_view_PeoteView.elementDefaults.x;
	this.y = de_peote_view_PeoteView.elementDefaults.y;
	this.w = de_peote_view_PeoteView.elementDefaults.w;
	this.h = de_peote_view_PeoteView.elementDefaults.h;
	this.z = de_peote_view_PeoteView.elementDefaults.z;
	this.rgba = de_peote_view_PeoteView.elementDefaults.rgba;
	this.rotation = de_peote_view_PeoteView.elementDefaults.rotation;
	this.pivotX = de_peote_view_PeoteView.elementDefaults.pivotX;
	this.pivotY = de_peote_view_PeoteView.elementDefaults.pivotY;
};
de_peote_view_element_ElementAnim.__name__ = true;
de_peote_view_element_ElementAnim.__interfaces__ = [de_peote_view_element_I_$Element];
de_peote_view_element_ElementAnim.prototype = {
	set: function(elemBuff,param,imageCache) {
		if(param.x == null) param.x = this.x;
		if(param.y == null) param.y = this.y;
		if(param.w == null) param.w = this.w;
		if(param.h == null) param.h = this.h;
		if(param.rgba == null) param.rgba = this.rgba;
		if(param.rotation == null) param.rotation = this.rotation;
		if(param.pivotX == null) param.pivotX = this.pivotX;
		if(param.pivotY == null) param.pivotY = this.pivotY;
		if(param.time == null) param.time = this.time;
		if(param.start == null) param.start = { };
		if(param.start.x == null) param.start.x = param.x;
		if(param.start.y == null) param.start.y = param.y;
		if(param.start.w == null) param.start.w = param.w;
		if(param.start.h == null) param.start.h = param.h;
		if(param.start.rgba == null) param.start.rgba = param.rgba;
		if(param.start.rotation == null) param.start.rotation = param.rotation;
		if(param.start.pivotX == null) param.start.pivotX = param.pivotX;
		if(param.start.pivotY == null) param.start.pivotY = param.pivotY;
		if(param.start.time == null) param.start.time = param.time;
		if(param.end == null) param.end = { };
		if(param.end.x == null) param.end.x = param.x;
		if(param.end.y == null) param.end.y = param.y;
		if(param.end.w == null) param.end.w = param.w;
		if(param.end.h == null) param.end.h = param.h;
		if(param.end.rgba == null) param.end.rgba = param.rgba;
		if(param.end.rotation == null) param.end.rotation = param.rotation;
		if(param.end.pivotX == null) param.end.pivotX = param.pivotX;
		if(param.end.pivotY == null) param.end.pivotY = param.pivotY;
		if(param.end.time == null) param.end.time = param.time;
		if(param.z == null) param.z = this.z;
		if(param.image == null && de_peote_view_PeoteView.elementDefaults.image != null) param.image = de_peote_view_PeoteView.elementDefaults.image;
		if(param.image != null && param.image != this.image) {
			if(this.image != -1) imageCache.unUseImage(this.image);
			if(imageCache.useImage(param.image) != null) this.image = param.image;
		}
		if(this.image != -1) {
			var img = imageCache.images[this.image];
			if(param.tx == null) param.tx = img.tx;
			if(param.ty == null) param.ty = img.ty;
			if(param.tw == null) param.tw = img.tw;
			if(param.th == null) param.th = img.th;
		} else {
			if(param.tx == null) param.tx = 0;
			if(param.ty == null) param.ty = 0;
			if(param.tw == null) param.tw = param.w;
			if(param.th == null) param.th = param.h;
		}
		if(param.tile != null) this.tile = param.tile; else if(de_peote_view_PeoteView.elementDefaults.tile != null) this.tile = de_peote_view_PeoteView.elementDefaults.tile;
		if(this.tile != -1) {
			param.tx += Math.floor(this.tile % 16 * param.tw / 16);
			param.ty += Math.floor(Math.floor(this.tile / 16) * param.th / 16);
			param.tw = Math.floor(param.tw / 16);
			param.th = Math.floor(param.th / 16);
		}
		elemBuff.set(this,param);
		this.x = param.end.x;
		this.y = param.end.y;
		this.w = param.end.w;
		this.h = param.end.h;
		this.rgba = param.end.rgba;
		this.rotation = param.end.rotation;
		this.pivotX = param.end.pivotX;
		this.pivotY = param.end.pivotY;
		this.time = param.end.time;
		this.z = param.z;
	}
	,get: function() {
		return { x : this.x, y : this.y, z : this.z, w : this.w, h : this.h, rgba : this.rgba, rotation : this.rotation, pivotX : this.pivotX, pivotY : this.pivotY, time : this.time, tile : this.tile, image : this.image};
	}
	,bufferUpdate: function(a,b) {
		this.act_program = a;
		this.buf_pos = b;
	}
	,del: function(elemBuff,imageCache) {
		elemBuff.del(this);
		if(this.image != -1) imageCache.unUseImage(this.image);
	}
	,__class__: de_peote_view_element_ElementAnim
};
var de_peote_view_element_I_$ElementBuffer = function() { };
de_peote_view_element_I_$ElementBuffer.__name__ = true;
de_peote_view_element_I_$ElementBuffer.prototype = {
	__class__: de_peote_view_element_I_$ElementBuffer
};
var de_peote_view_element_ElementAnimBuffer = function(t,b) {
	this.fill_bytes = false;
	this.attr = null;
	this.type = t;
	var offset = 8;
	if((this.type & 4) != 0) {
		this.ZINDEX_OFFSET = offset;
		offset += 4;
	}
	if((this.type & 8) != 0) {
		this.RGBA_OFFSET = offset;
		offset += 4;
		this.RGBA_END_OFFSET = offset;
		offset += 4;
	}
	if((this.type & 16) != 0) {
		this.ROTATION_OFFSET = offset;
		offset += 8;
		this.PIVOT_OFFSET = offset;
		offset += 8;
	}
	if((this.type & 128) != 0) {
		this.PICKING_OFFSET = offset;
		offset += 4;
	}
	this.TIME_OFFSET = offset;
	offset += 8;
	this.TEX_OFFSET = offset;
	offset += 4;
	this.VERTEX_STRIDE = offset;
	var full = new de_peote_view_element_BufferData(b.max_segments * b.segment_size * de_peote_view_element_ElementAnimBuffer.VERTEX_COUNT * this.VERTEX_STRIDE);
	this.glBuff = lime_graphics_opengl_GL.context.createBuffer();
	lime_graphics_opengl_GL.context.bindBuffer(34962,this.glBuff);
	lime_graphics_opengl_GL.context.bufferData(34962,full.dataView,35044);
	lime_graphics_opengl_GL.context.bindBuffer(34962,null);
	this.buffFull = new de_peote_view_element_BufferData(de_peote_view_element_ElementAnimBuffer.VERTEX_COUNT * this.VERTEX_STRIDE);
	this.emptyBuffFull = new de_peote_view_element_BufferData(de_peote_view_element_ElementAnimBuffer.VERTEX_COUNT * this.VERTEX_STRIDE);
};
de_peote_view_element_ElementAnimBuffer.__name__ = true;
de_peote_view_element_ElementAnimBuffer.__interfaces__ = [de_peote_view_element_I_$ElementBuffer];
de_peote_view_element_ElementAnimBuffer.prototype = {
	'delete': function() {
		lime_graphics_opengl_GL.context.deleteBuffer(this.glBuff);
	}
	,disableVertexAttributes: function() {
		lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[0]);
		if((this.type & 4) != 0) lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[2]);
		if((this.type & 8) != 0) {
			lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[3]);
			lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[4]);
		}
		if((this.type & 16) != 0) {
			lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[5]);
			lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[6]);
		}
		if((this.type & 128) != 0) lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[8]);
		lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[7]);
		lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[1]);
	}
	,setVertexAttributes: function() {
		lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[0]);
		if((this.type & 4) != 0) lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[2]);
		if((this.type & 8) != 0) {
			lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[3]);
			lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[4]);
		}
		if((this.type & 16) != 0) {
			lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[5]);
			lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[6]);
		}
		if((this.type & 128) != 0) lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[8]);
		lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[7]);
		lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[1]);
		lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[0],4,5122,false,this.VERTEX_STRIDE,0);
		if((this.type & 4) != 0) lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[2],1,5126,false,this.VERTEX_STRIDE,this.ZINDEX_OFFSET);
		if((this.type & 8) != 0) {
			lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[3],4,5121,true,this.VERTEX_STRIDE,this.RGBA_OFFSET);
			lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[4],4,5121,true,this.VERTEX_STRIDE,this.RGBA_END_OFFSET);
		}
		if((this.type & 16) != 0) {
			lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[5],2,5126,false,this.VERTEX_STRIDE,this.ROTATION_OFFSET);
			lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[6],4,5122,false,this.VERTEX_STRIDE,this.PIVOT_OFFSET);
		}
		if((this.type & 128) != 0) lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[8],4,5121,true,this.VERTEX_STRIDE,this.PICKING_OFFSET);
		lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[7],2,5126,false,this.VERTEX_STRIDE,this.TIME_OFFSET);
		lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[1],2,5122,false,this.VERTEX_STRIDE,this.TEX_OFFSET);
	}
	,del: function(e) {
		lime_graphics_opengl_GL.context.bindBuffer(34962,this.glBuff);
		lime_graphics_opengl_GL.context.bufferSubData(34962,e.buf_pos * this.VERTEX_STRIDE,this.emptyBuffFull.dataView);
		lime_graphics_opengl_GL.context.bindBuffer(34962,null);
	}
	,set: function(e,param) {
		var buf_pos = e.buf_pos;
		var x1 = param.start.x;
		var y1 = param.start.y;
		var x2 = param.end.x;
		var y2 = param.end.y;
		var xw1 = x1 + param.start.w;
		var yh1 = y1 + param.start.h;
		var xw2 = x2 + param.end.w;
		var yh2 = y2 + param.end.h;
		var rgba1 = param.start.rgba;
		var rgba2 = param.end.rgba;
		var t1 = param.start.time;
		var t2 = param.end.time;
		var z = Math.max(0.0,Math.min(1.0,param.z / 32767));
		var tx = param.tx;
		var ty = param.ty;
		var txw = tx + param.tw;
		var tyh = ty + param.th;
		var rotation1 = param.start.rotation / 180 * Math.PI;
		var rotation2 = param.end.rotation / 180 * Math.PI;
		var pivot_x1 = x1 + param.start.pivotX;
		var pivot_y1 = y1 + param.start.pivotY;
		var pivot_x2 = x2 + param.end.pivotX;
		var pivot_y2 = y2 + param.end.pivotY;
		param.element += 1;
		this.buffFull.byteOffset = 0;
		this.buffFull.write_2_Short(xw1,yh1);
		this.buffFull.write_2_Short(xw2,yh2);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) {
			this.buffFull.write_1_UInt(rgba1);
			this.buffFull.write_1_UInt(rgba2);
		}
		if((this.type & 16) != 0) {
			this.buffFull.write_2_Float(rotation1,rotation2);
			this.buffFull.write_2_Short(pivot_x1,pivot_y1);
			this.buffFull.write_2_Short(pivot_x2,pivot_y2);
		}
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Float(t1,t2);
		this.buffFull.write_2_Short(txw,tyh);
		if(this.fill_bytes) this.buffFull.write_1_Float(0.0);
		this.buffFull.write_2_Short(xw1,yh1);
		this.buffFull.write_2_Short(xw2,yh2);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) {
			this.buffFull.write_1_UInt(rgba1);
			this.buffFull.write_1_UInt(rgba2);
		}
		if((this.type & 16) != 0) {
			this.buffFull.write_2_Float(rotation1,rotation2);
			this.buffFull.write_2_Short(pivot_x1,pivot_y1);
			this.buffFull.write_2_Short(pivot_x2,pivot_y2);
		}
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Float(t1,t2);
		this.buffFull.write_2_Short(txw,tyh);
		if(this.fill_bytes) this.buffFull.write_1_Float(0.0);
		this.buffFull.write_2_Short(x1,yh1);
		this.buffFull.write_2_Short(x2,yh2);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) {
			this.buffFull.write_1_UInt(rgba1);
			this.buffFull.write_1_UInt(rgba2);
		}
		if((this.type & 16) != 0) {
			this.buffFull.write_2_Float(rotation1,rotation2);
			this.buffFull.write_2_Short(pivot_x1,pivot_y1);
			this.buffFull.write_2_Short(pivot_x2,pivot_y2);
		}
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Float(t1,t2);
		this.buffFull.write_2_Short(tx,tyh);
		if(this.fill_bytes) this.buffFull.write_1_Float(0.0);
		this.buffFull.write_2_Short(xw1,y1);
		this.buffFull.write_2_Short(xw2,y2);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) {
			this.buffFull.write_1_UInt(rgba1);
			this.buffFull.write_1_UInt(rgba2);
		}
		if((this.type & 16) != 0) {
			this.buffFull.write_2_Float(rotation1,rotation2);
			this.buffFull.write_2_Short(pivot_x1,pivot_y1);
			this.buffFull.write_2_Short(pivot_x2,pivot_y2);
		}
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Float(t1,t2);
		this.buffFull.write_2_Short(txw,ty);
		if(this.fill_bytes) this.buffFull.write_1_Float(0.0);
		this.buffFull.write_2_Short(x1,y1);
		this.buffFull.write_2_Short(x2,y2);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) {
			this.buffFull.write_1_UInt(rgba1);
			this.buffFull.write_1_UInt(rgba2);
		}
		if((this.type & 16) != 0) {
			this.buffFull.write_2_Float(rotation1,rotation2);
			this.buffFull.write_2_Short(pivot_x1,pivot_y1);
			this.buffFull.write_2_Short(pivot_x2,pivot_y2);
		}
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Float(t1,t2);
		this.buffFull.write_2_Short(tx,ty);
		if(this.fill_bytes) this.buffFull.write_1_Float(0.0);
		this.buffFull.write_2_Short(x1,y1);
		this.buffFull.write_2_Short(x2,y2);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) {
			this.buffFull.write_1_UInt(rgba1);
			this.buffFull.write_1_UInt(rgba2);
		}
		if((this.type & 16) != 0) {
			this.buffFull.write_2_Float(rotation1,rotation2);
			this.buffFull.write_2_Short(pivot_x1,pivot_y1);
			this.buffFull.write_2_Short(pivot_x2,pivot_y2);
		}
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Float(t1,t2);
		this.buffFull.write_2_Short(tx,ty);
		this.buffFull.byteOffset = 0;
		lime_graphics_opengl_GL.context.bindBuffer(34962,this.glBuff);
		lime_graphics_opengl_GL.context.bufferSubData(34962,buf_pos * this.VERTEX_STRIDE,this.buffFull.dataView);
		lime_graphics_opengl_GL.context.bindBuffer(34962,null);
	}
	,getDefaultFragmentShaderSrc: function() {
		return "\tvarying vec2 vTexCoord;\r\n\t\t#if_RGBA\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#else_RGBA\r\n\t\t\t#if_PICKING\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_PICKING\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tuniform vec2 uResolution;\r\n\t\t#end_PICKING\r\n\t\t\r\n\t\t\r\n\t\t#if_TEXTURE0\r\n\t\tuniform sampler2D uTexture0;\r\n\t\t#end_TEXTURE0\r\n\t\t\r\n\t\t#if_TEXTURE1\r\n\t\tuniform sampler2D uTexture1;\r\n\t\t#end_TEXTURE1\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\r\n\t\t\t#if_TEXTURE0\r\n\t\t\tvec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#else_TEXTURE0\r\n\t\t\tvec4 texel = vec4(1.0, 1.0, 1.0, 1.0);\r\n\t\t\t#end_TEXTURE0\r\n\t\t\t\r\n\t\t\t// if use more than one texture unit to combine or do something crazy here:)\r\n\t\t\t#if_TEXTURE1\r\n\t\t\ttexel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#end_TEXTURE1\r\n\t\t\t// ... TEXTURE2 ...TEXTURE3 ...\t\t\t\r\n\t\t\t\r\n\t\t\tif (texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) { \r\n\t\t\t\tgl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\t\t\t\t\r\n\t\t\t}\r\n\t\t\t#else_PICKING\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\r\n\t\t\t#end_PICKING\r\n\t\t}\r\n\t";
	}
	,getDefaultVertexShaderSrc: function() {
		return "\tattribute vec4 aPosition;\r\n\t\t\r\n\t\t#if_ZINDEX\r\n\t\tattribute float aZindex;\r\n\t\t#end_ZINDEX\r\n\t\t\r\n\t\t#if_RGBA\r\n\t\tattribute vec4 aRGBA;\r\n\t\tattribute vec4 aRGBA_END;\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_ROTATION\r\n\t\tattribute vec2 aRotation;\r\n\t\tattribute vec4 aPivot;\r\n\t\t#end_ROTATION\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tattribute vec4 aElement;\r\n\t\t\t#if_RGBA\r\n\t\t\t#else_RGBA\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_RGBA\r\n\t\t#end_PICKING\r\n\t\t\t\r\n\t\tattribute vec2 aTime;\r\n\t\t\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\t#if_RGBA\r\n\t\t\tvRGBA = aRGBA.wzyx + (aRGBA_END.wzyx - aRGBA.wzyx) * max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0));\t\r\n\t\t\t#end_RGBA\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) {\r\n\t\t\t\tvRGBA = aElement;\r\n\t\t\t}\r\n\t\t\t#end_PICKING\r\n\t\t\t\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\r\n\t\t\tvec2 VertexPosStart = vec2 ( aPosition ); //vec2 (aPosition.x, aPosition.y);\r\n\t\t\tvec2 VertexPosEnd   = vec2 ( aPosition.z, aPosition.w);\r\n\t\t\t\r\n\t\t\t#if_ROTATION\r\n\t\t\tfloat alpha = aRotation.x + (aRotation.y - aRotation.x)\t* max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0));\r\n\t\t\t\t\t\t\t\t\r\n\t\t\tVertexPosStart = (VertexPosStart - vec2(aPivot))\r\n\t\t\t\t\t\t\t* mat2 (\r\n\t\t\t\t\t\t\t\tvec2(cos(alpha), -sin(alpha)),\r\n\t\t\t\t\t\t\t\tvec2(sin(alpha),  cos(alpha))\r\n\t\t\t\t\t\t\t) + vec2(aPivot);\r\n\t\t\t\r\n\t\t\tVertexPosEnd = (VertexPosEnd -  vec2(aPivot.z, aPivot.w))\r\n\t\t\t\t\t\t\t* mat2 (\r\n\t\t\t\t\t\t\t\tvec2(cos(alpha), -sin(alpha)),\r\n\t\t\t\t\t\t\t\tvec2(sin(alpha),  cos(alpha))\r\n\t\t\t\t\t\t\t) + vec2(aPivot.z, aPivot.w);\r\n\t\t\t#end_ROTATION\r\n\t\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -1.0, 0.0), // TODO\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4( VertexPosStart + floor( \r\n\t\t\t\t\t\t\t\t(VertexPosEnd - VertexPosStart)\r\n\t\t\t\t\t\t\t\t* max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0))\r\n\t\t\t\t\t\t\t\t* zoom) / zoom ,\r\n\t\t\t\t#if_ZINDEX\r\n\t\t\t\taZindex\r\n\t\t\t\t#else_ZINDEX\r\n\t\t\t\t0.0\r\n\t\t\t\t#end_ZINDEX\r\n\t\t\t\t, 1.0\r\n\t\t\t)\r\n\t\t\t// rotate displaylist\r\n\t\t\t// *mat4 (\r\n\t\t\t//\tvec4(cos(winkel), -sin(winkel), 0.0, 0.0),\r\n\t\t\t//\tvec4(sin(winkel),  cos(winkel), 0.0, 0.0),\r\n\t\t\t//\tvec4(        0.0,          1.0, 0.0, 0.0),\r\n\t\t\t//\tvec4(        0.0,          0.0, 0.0, 1.0)\r\n\t\t\t//)\r\n\t\t\t;\r\n\t\t}\r\n\t";
	}
	,__class__: de_peote_view_element_ElementAnimBuffer
};
var de_peote_view_element_ElementSimple = function() {
	this.tile = -1;
	this.image = -1;
	this.x = de_peote_view_PeoteView.elementDefaults.x;
	this.y = de_peote_view_PeoteView.elementDefaults.y;
	this.w = de_peote_view_PeoteView.elementDefaults.w;
	this.h = de_peote_view_PeoteView.elementDefaults.h;
	this.z = de_peote_view_PeoteView.elementDefaults.z;
};
de_peote_view_element_ElementSimple.__name__ = true;
de_peote_view_element_ElementSimple.__interfaces__ = [de_peote_view_element_I_$Element];
de_peote_view_element_ElementSimple.prototype = {
	set: function(elemBuff,param,imageCache) {
		if(param.x == null) param.x = this.x; else this.x = param.x;
		if(param.y == null) param.y = this.y; else this.y = param.y;
		if(param.w == null) param.w = this.w; else this.w = param.w;
		if(param.h == null) param.h = this.h; else this.h = param.h;
		if(param.z == null) param.z = this.z; else this.z = param.z;
		if(param.rgba == null) param.rgba = de_peote_view_PeoteView.elementDefaults.rgba;
		if(param.image == null && de_peote_view_PeoteView.elementDefaults.image != null) param.image = de_peote_view_PeoteView.elementDefaults.image;
		if(param.image != null && param.image != this.image) {
			if(this.image != -1) imageCache.unUseImage(this.image);
			if(imageCache.useImage(param.image) != null) this.image = param.image;
		}
		if(this.image != -1) {
			var img = imageCache.images[this.image];
			if(param.tx == null) param.tx = img.tx;
			if(param.ty == null) param.ty = img.ty;
			if(param.tw == null) param.tw = img.tw;
			if(param.th == null) param.th = img.th;
		} else {
			if(param.tx == null) param.tx = 0;
			if(param.ty == null) param.ty = 0;
			if(param.tw == null) param.tw = param.w;
			if(param.th == null) param.th = param.h;
		}
		if(param.tile != null) this.tile = param.tile; else if(de_peote_view_PeoteView.elementDefaults.tile != null) this.tile = de_peote_view_PeoteView.elementDefaults.tile;
		if(this.tile != -1) {
			param.tx += Math.floor(this.tile % 16 * param.tw / 16);
			param.ty += Math.floor(Math.floor(this.tile / 16) * param.th / 16);
			param.tw = Math.floor(param.tw / 16);
			param.th = Math.floor(param.th / 16);
		}
		elemBuff.set(this,param);
	}
	,get: function() {
		return { x : this.x, y : this.y, z : this.z, w : this.w, h : this.h, tile : this.tile, image : this.image};
	}
	,bufferUpdate: function(a,b) {
		this.act_program = a;
		this.buf_pos = b;
	}
	,del: function(elemBuff,imageCache) {
		elemBuff.del(this);
		if(this.image != -1) imageCache.unUseImage(this.image);
	}
	,__class__: de_peote_view_element_ElementSimple
};
var de_peote_view_element_ElementSimpleBuffer = function(t,b) {
	this.attr = null;
	this.type = t;
	var offset = 4;
	if((this.type & 4) != 0) {
		this.ZINDEX_OFFSET = offset;
		offset += 4;
	}
	if((this.type & 8) != 0) {
		this.RGBA_OFFSET = offset;
		offset += 4;
	}
	if((this.type & 128) != 0) {
		this.PICKING_OFFSET = offset;
		offset += 4;
	}
	this.TEX_OFFSET = offset;
	offset += 4;
	this.VERTEX_STRIDE = offset;
	var full = new de_peote_view_element_BufferData(b.max_segments * b.segment_size * de_peote_view_element_ElementSimpleBuffer.VERTEX_COUNT * this.VERTEX_STRIDE);
	this.glBuff = lime_graphics_opengl_GL.context.createBuffer();
	lime_graphics_opengl_GL.context.bindBuffer(34962,this.glBuff);
	lime_graphics_opengl_GL.context.bufferData(34962,full.dataView,35044);
	lime_graphics_opengl_GL.context.bindBuffer(34962,null);
	this.buffFull = new de_peote_view_element_BufferData(de_peote_view_element_ElementSimpleBuffer.VERTEX_COUNT * this.VERTEX_STRIDE);
	this.emptyBuffFull = new de_peote_view_element_BufferData(de_peote_view_element_ElementSimpleBuffer.VERTEX_COUNT * this.VERTEX_STRIDE);
};
de_peote_view_element_ElementSimpleBuffer.__name__ = true;
de_peote_view_element_ElementSimpleBuffer.__interfaces__ = [de_peote_view_element_I_$ElementBuffer];
de_peote_view_element_ElementSimpleBuffer.prototype = {
	'delete': function() {
		lime_graphics_opengl_GL.context.deleteBuffer(this.glBuff);
	}
	,disableVertexAttributes: function() {
		lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[0]);
		if((this.type & 4) != 0) lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[2]);
		if((this.type & 8) != 0) lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[3]);
		if((this.type & 128) != 0) lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[8]);
		lime_graphics_opengl_GL.context.disableVertexAttribArray(this.attr[1]);
	}
	,setVertexAttributes: function() {
		lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[0]);
		if((this.type & 4) != 0) lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[2]);
		if((this.type & 8) != 0) lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[3]);
		if((this.type & 128) != 0) lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[8]);
		lime_graphics_opengl_GL.context.enableVertexAttribArray(this.attr[1]);
		lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[0],2,5122,false,this.VERTEX_STRIDE,0);
		if((this.type & 4) != 0) lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[2],1,5126,false,this.VERTEX_STRIDE,this.ZINDEX_OFFSET);
		if((this.type & 8) != 0) lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[3],4,5121,true,this.VERTEX_STRIDE,this.RGBA_OFFSET);
		if((this.type & 128) != 0) lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[8],4,5121,true,this.VERTEX_STRIDE,this.PICKING_OFFSET);
		lime_graphics_opengl_GL.context.vertexAttribPointer(this.attr[1],2,5122,false,this.VERTEX_STRIDE,this.TEX_OFFSET);
	}
	,del: function(e) {
		lime_graphics_opengl_GL.context.bindBuffer(34962,this.glBuff);
		lime_graphics_opengl_GL.context.bufferSubData(34962,e.buf_pos * this.VERTEX_STRIDE,this.emptyBuffFull.dataView);
		lime_graphics_opengl_GL.context.bindBuffer(34962,null);
	}
	,rotX: function(x,y,pivotX,pivotY,alpha) {
		return Math.round((x - pivotX) * Math.cos(alpha) - (y - pivotY) * Math.sin(alpha) + pivotX);
	}
	,rotY: function(x,y,pivotX,pivotY,alpha) {
		return Math.round((y - pivotY) * Math.cos(alpha) + (x - pivotX) * Math.sin(alpha) + pivotY);
	}
	,set: function(e,param) {
		var buf_pos = e.buf_pos;
		var x;
		var y;
		var xw;
		var yh;
		var x1;
		var y1;
		var xw1;
		var yh1;
		if((this.type & 16) != 0 && param.rotation != null) {
			if(param.pivotX != null) param.pivotX = param.x + param.pivotX; else param.pivotX = param.x;
			if(param.pivotY != null) param.pivotY = param.y + param.pivotY; else param.pivotY = param.y;
			var alpha = param.rotation / 180 * Math.PI;
			x = this.rotX(param.x,param.y,param.pivotX,param.pivotY,alpha);
			y = this.rotY(param.x,param.y,param.pivotX,param.pivotY,alpha);
			xw = this.rotX(param.x + param.w,param.y + param.h,param.pivotX,param.pivotY,alpha);
			yh = this.rotY(param.x + param.w,param.y + param.h,param.pivotX,param.pivotY,alpha);
			x1 = this.rotX(param.x,param.y + param.h,param.pivotX,param.pivotY,alpha);
			y1 = this.rotY(param.x + param.w,param.y,param.pivotX,param.pivotY,alpha);
			xw1 = this.rotX(param.x + param.w,param.y,param.pivotX,param.pivotY,alpha);
			yh1 = this.rotY(param.x,param.y + param.h,param.pivotX,param.pivotY,alpha);
		} else {
			x = x1 = param.x;
			y = y1 = param.y;
			xw = xw1 = x + param.w;
			yh = yh1 = y + param.h;
		}
		var z = Math.max(0.0,Math.min(1.0,param.z / 32767));
		var rgba = param.rgba;
		var tx = param.tx;
		var ty = param.ty;
		var txw = tx + param.tw;
		var tyh = ty + param.th;
		param.element += 1;
		this.buffFull.byteOffset = 0;
		this.buffFull.write_2_Short(xw,yh);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) this.buffFull.write_1_UInt(rgba);
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Short(txw,tyh);
		this.buffFull.write_2_Short(xw,yh);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) this.buffFull.write_1_UInt(rgba);
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Short(txw,tyh);
		this.buffFull.write_2_Short(x1,yh1);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) this.buffFull.write_1_UInt(rgba);
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Short(tx,tyh);
		this.buffFull.write_2_Short(xw1,y1);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) this.buffFull.write_1_UInt(rgba);
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Short(txw,ty);
		this.buffFull.write_2_Short(x,y);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) this.buffFull.write_1_UInt(rgba);
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Short(tx,ty);
		this.buffFull.write_2_Short(x,y);
		if((this.type & 4) != 0) this.buffFull.write_1_Float(z);
		if((this.type & 8) != 0) this.buffFull.write_1_UInt(rgba);
		if((this.type & 128) != 0) this.buffFull.write_1_UInt(param.element);
		this.buffFull.write_2_Short(tx,ty);
		this.buffFull.byteOffset = 0;
		lime_graphics_opengl_GL.context.bindBuffer(34962,this.glBuff);
		lime_graphics_opengl_GL.context.bufferSubData(34962,buf_pos * this.VERTEX_STRIDE,this.buffFull.dataView);
		lime_graphics_opengl_GL.context.bindBuffer(34962,null);
	}
	,getDefaultFragmentShaderSrc: function() {
		return "\tvarying vec2 vTexCoord;\r\n\t\t#if_RGBA\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#else_RGBA\r\n\t\t\t#if_PICKING\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_PICKING\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tuniform vec2 uResolution;\r\n\t\t#end_PICKING\r\n\t\t\r\n\t\t\r\n\t\t#if_TEXTURE0\r\n\t\tuniform sampler2D uTexture0;\r\n\t\t#end_TEXTURE0\r\n\t\t\r\n\t\t#if_TEXTURE1\r\n\t\tuniform sampler2D uTexture1;\r\n\t\t#end_TEXTURE1\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\t\r\n\t\t\t#if_TEXTURE0\r\n\t\t\tvec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#else_TEXTURE0\r\n\t\t\tvec4 texel = vec4(1.0, 1.0, 1.0, 1.0);\r\n\t\t\t#end_TEXTURE0\r\n\t\t\t\r\n\t\t\t// if use more than one texture unit to combine or do something crazy here:)\r\n\t\t\t#if_TEXTURE1\r\n\t\t\ttexel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#end_TEXTURE1\r\n\t\t\t// ... TEXTURE2 ...TEXTURE3 ...\r\n\t\t\t\r\n\t\t\tif (texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) { \r\n\t\t\t\tgl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\t\t\t\t\r\n\t\t\t}\r\n\t\t\t#else_PICKING\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\r\n\t\t\t#end_PICKING\r\n\t\t}\r\n\t";
	}
	,getDefaultVertexShaderSrc: function() {
		return "\tattribute vec2 aPosition;\r\n\t\t\r\n\t\t#if_ZINDEX\r\n\t\tattribute float aZindex;\r\n\t\t#end_ZINDEX\r\n\t\t\r\n\t\t#if_RGBA\r\n\t\tattribute vec4 aRGBA;\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#end_RGBA\r\n\r\n\t\t#if_PICKING\r\n\t\tattribute vec4 aElement;\r\n\t\t\t#if_RGBA\r\n\t\t\t#else_RGBA\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_RGBA\r\n\t\t#end_PICKING\r\n\t\t\t\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\t#if_RGBA\r\n\t\t\tvRGBA = aRGBA.wzyx;\r\n\t\t\t#end_RGBA\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) {\r\n\t\t\t\tvRGBA = aElement;\r\n\t\t\t}\r\n\t\t\t#end_PICKING\r\n\t\t\t\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -1.0, 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aPosition ,\r\n\t\t\t\t#if_ZINDEX\r\n\t\t\t\taZindex\r\n\t\t\t\t#else_ZINDEX\r\n\t\t\t\t0.0\r\n\t\t\t\t#end_ZINDEX\r\n\t\t\t\t, 1.0\r\n\t\t\t\t);\r\n\t\t}\r\n\t";
	}
	,__class__: de_peote_view_element_ElementSimpleBuffer
};
var de_peote_view_texture_Image = function(image_url,texture,w,h) {
	this.used = 0;
	this.slot = -1;
	this.url = "";
	this.url = image_url;
	this.texture = texture;
	this.tw = w;
	this.th = h;
};
de_peote_view_texture_Image.__name__ = true;
de_peote_view_texture_Image.prototype = {
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
				tmp_canvas.width = _g.tw;
				tmp_canvas.height = _g.th;
				var dx = 0;
				var dy = 0;
				if(image.width / image.height < _g.tw / _g.th) dx = Math.floor((_g.tw - _g.th * image.width / image.height) / 2); else dy = Math.floor((_g.th - _g.tw * image.height / image.width) / 2);
				var tmp_context = tmp_canvas.getContext("2d",null);
				tmp_context.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
				tmp_context.drawImage(image,0,0,image.width,image.height,dx,dy,tmp_canvas.width - dx * 2,tmp_canvas.height - dy * 2);
				var image_bytes = tmp_context.getImageData(0,0,tmp_canvas.width,tmp_canvas.height);
				var imageData;
				var view = image_bytes.data;
				var this1;
				if(view != null) this1 = new Uint8Array(view); else this1 = null;
				imageData = this1;
				tmp_canvas = null;
				tmp_context = null;
				image_bytes = null;
				onload(_g,_g.tw,_g.th,imageData);
				imageData = null;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				onerror(e);
			}
		};
		if(this.url.indexOf("http://") == 0 || this.url.indexOf("https://") == 0) {
			var x = js_Browser.createXMLHttpRequest();
			x.open("GET","//cors-anywhere.herokuapp.com/" + this.url);
			x.responseType = "blob";
			x.onload = function() {
				var blob = x.response;
				var fr = new FileReader();
				fr.onloadend = function() {
					image.src = fr.result;
				};
				fr.readAsDataURL(blob);
			};
			x.send();
		} else image.src = this.url;
	}
	,__class__: de_peote_view_texture_Image
};
var de_peote_view_texture_ImageCache = function(max_imagess,textures) {
	this.isLoading = 0;
	var this1;
	this1 = new Array(max_imagess);
	this.images = this1;
	this.unusedImages = new haxe_ds_IntMap();
	this.imgLoadQueue = [];
	this.textures = textures;
};
de_peote_view_texture_ImageCache.__name__ = true;
de_peote_view_texture_ImageCache.prototype = {
	onerror: function(msg) {
		haxe_Log.trace(msg,{ fileName : "ImageCache.hx", lineNumber : 54, className : "de.peote.view.texture.ImageCache", methodName : "onerror"});
	}
	,setImage: function(param) {
		if(param.texture == null) param.texture = 0;
		var texture = this.textures[param.texture];
		var img = this.images[param.image];
		if(img == null) {
			if(texture != null) {
				var val = new de_peote_view_texture_Image(param.filename,texture,texture.slotWidth,texture.slotHeight);
				this.images[param.image] = val;
				if(param.preload) this.useImage(param.image);
			} else haxe_Log.trace("Error: no texture specified to put images in",{ fileName : "ImageCache.hx", lineNumber : 81, className : "de.peote.view.texture.ImageCache", methodName : "setImage"});
		} else {
			if(texture != null && texture != img.texture) {
				if(img.url == param.filename) {
				} else if(img.used > 0) haxe_Log.trace("ERROR: texture-changing while image is in usage by element not implemented yet",{ fileName : "ImageCache.hx", lineNumber : 100, className : "de.peote.view.texture.ImageCache", methodName : "setImage"}); else if(img.slot > -1) {
				}
			}
			if(img.url != param.filename) {
				img.url = param.filename;
				this.imgLoadQueue.push(img);
				if(this.isLoading++ == 0) this.imgLoadQueue.shift().load($bind(this,this.onImageLoad),$bind(this,this.onerror));
			}
		}
	}
	,useImage: function(image_nr) {
		var img = this.images[image_nr];
		if(img != null) {
			if(img.used++ == 0) {
				if(img.slot == -1) {
					var success = true;
					if(img.texture.slotHoles.hole.length == 0) {
						haxe_Log.trace("Texture is FULL OF IMAGES :) .. try to clear() ",{ fileName : "ImageCache.hx", lineNumber : 149, className : "de.peote.view.texture.ImageCache", methodName : "useImage"});
						if(this.clear() == 0) {
							haxe_Log.trace(" ============ ERROR: Texture Space can't be cleaned and is FULL of used Images ==========",{ fileName : "ImageCache.hx", lineNumber : 152, className : "de.peote.view.texture.ImageCache", methodName : "useImage"});
							success = false;
						}
					}
					if(success) {
						img.texture.reserveImageSlot(img);
						if(img.url != "") {
							this.imgLoadQueue.push(img);
							if(this.isLoading++ == 0) this.imgLoadQueue.shift().load($bind(this,this.onImageLoad),$bind(this,this.onerror));
						} else haxe_Log.trace("ERROR: no image filename (or url) specified",{ fileName : "ImageCache.hx", lineNumber : 166, className : "de.peote.view.texture.ImageCache", methodName : "useImage"});
					}
				}
			}
		} else haxe_Log.trace("Error: image-number " + image_nr + " did not exist",{ fileName : "ImageCache.hx", lineNumber : 171, className : "de.peote.view.texture.ImageCache", methodName : "useImage"});
		return img;
	}
	,unUseImage: function(image_nr) {
		var img = this.images[image_nr];
		if(--img.used == 0) this.unusedImages.h[image_nr] = true;
	}
	,onImageLoad: function(img,w,h,data) {
		haxe_Log.trace("onImageLoad: " + img.url + " gl-texture: " + Std.string(img.texture) + " to holePos:" + img.slot + " ----" + "(" + Math.random() + ")",{ fileName : "ImageCache.hx", lineNumber : 202, className : "de.peote.view.texture.ImageCache", methodName : "onImageLoad"});
		if(img.slot > -1) img.texture.storeImage(img,w,h,data);
		if(this.imgLoadQueue.length == 0) this.isLoading = 0; else this.imgLoadQueue.shift().load($bind(this,this.onImageLoad),$bind(this,this.onerror));
	}
	,clear: function() {
		haxe_Log.trace("delete unused Images from Cache",{ fileName : "ImageCache.hx", lineNumber : 212, className : "de.peote.view.texture.ImageCache", methodName : "clear"});
		var numCleaned = 0;
		var unusedImg;
		var $it0 = this.unusedImages.keys();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			this.unusedImages.remove(i);
			unusedImg = this.images[i];
			if(unusedImg.used == 0) {
				unusedImg.texture.slotHoles.addHole(unusedImg.slot);
				unusedImg.slot = -1;
				numCleaned++;
			}
		}
		return numCleaned;
	}
	,__class__: de_peote_view_texture_ImageCache
};
var de_peote_view_texture_Texture = function(param) {
	this.slots = 1;
	this.slotWidth = param.w;
	this.slotHeight = param.h;
	if(param.slots == null) param.slots = 1;
	var p = this.optimalTextureSize(param.slots,param.w,param.h,null);
	if(p != null) {
		this.slots = p.slots;
		this.slotsX = p.sx;
		this.slotsY = p.sy;
		this.max_texture_width = p.w;
		this.max_texture_height = p.h;
		this.slotHoles = new de_peote_tools_Holes(this.slotsX * this.slotsY);
		haxe_Log.trace("TextureCache: slotsX=" + this.slotsX + " slotWidth=" + this.slotWidth + " slotsY=" + this.slotsY + " slotHeight=" + this.slotHeight,{ fileName : "Texture.hx", lineNumber : 80, className : "de.peote.view.texture.Texture", methodName : "new"});
		this.texture = de_peote_view_texture_Texture.createEmptyTexture(this.slotsX * this.slotWidth,this.slotsY * this.slotHeight);
	} else haxe_Log.trace("Error: can't create Texture ${param.texture}",{ fileName : "Texture.hx", lineNumber : 87, className : "de.peote.view.texture.Texture", methodName : "new"});
};
de_peote_view_texture_Texture.__name__ = true;
de_peote_view_texture_Texture.createEmptyTexture = function(width,height) {
	var t = lime_graphics_opengl_GL.context.createTexture();
	lime_graphics_opengl_GL.context.bindTexture(3553,t);
	lime_graphics_opengl_GL.context.texImage2D(3553,0,6408,width,height,0,6408,5121,null);
	lime_graphics_opengl_GL.context.texParameteri(3553,10240,9729);
	lime_graphics_opengl_GL.context.texParameteri(3553,10241,9729);
	lime_graphics_opengl_GL.context.texParameteri(3553,10242,33071);
	lime_graphics_opengl_GL.context.texParameteri(3553,10243,33071);
	lime_graphics_opengl_GL.context.bindTexture(3553,null);
	return t;
};
de_peote_view_texture_Texture.prototype = {
	reserveImageSlot: function(img) {
		img.slot = this.slotHoles.getHole();
		img.tx = img.slot % this.slotsX * this.slotWidth;
		img.ty = Math.floor(img.slot / this.slotsX) * this.slotHeight;
	}
	,storeImage: function(img,w,h,data) {
		this.createSubTexture(this.texture,img.slot % this.slotsX * this.slotWidth,Math.floor(img.slot / this.slotsX) * this.slotHeight,w,h,data);
	}
	,createSubTexture: function(t,x,y,w,h,data) {
		lime_graphics_opengl_GL.context.bindTexture(3553,t);
		lime_graphics_opengl_GL.context.texSubImage2D(3553,0,x,y,w,h,6408,5121,data);
		lime_graphics_opengl_GL.context.bindTexture(3553,null);
	}
	,optimalTextureSize: function(slots,slotWidth,slotHeight,maxTextureSize) {
		if(maxTextureSize == null) maxTextureSize = lime_graphics_opengl_GL.context.getParameter(3379);
		maxTextureSize = Math.ceil(Math.log(maxTextureSize) / Math.log(2));
		haxe_Log.trace("maxTextureSize: " + (1 << maxTextureSize),{ fileName : "Texture.hx", lineNumber : 165, className : "de.peote.view.texture.Texture", methodName : "optimalTextureSize"});
		haxe_Log.trace("Texture-slots:" + slots,{ fileName : "Texture.hx", lineNumber : 166, className : "de.peote.view.texture.Texture", methodName : "optimalTextureSize"});
		haxe_Log.trace("slot width : " + slotWidth,{ fileName : "Texture.hx", lineNumber : 167, className : "de.peote.view.texture.Texture", methodName : "optimalTextureSize"});
		haxe_Log.trace("slot height: " + slotHeight,{ fileName : "Texture.hx", lineNumber : 168, className : "de.peote.view.texture.Texture", methodName : "optimalTextureSize"});
		var a = Math.ceil(Math.log(slots * slotWidth * slotHeight) / Math.log(2));
		var r;
		var w = 1;
		var h = a - 1;
		var delta = Math.floor(Math.abs(w - h));
		var rmin = (1 << maxTextureSize) * (1 << maxTextureSize);
		var found = false;
		var n = Math.floor(Math.min(maxTextureSize,a));
		var m;
		while(1 << n >= slotWidth) {
			m = Math.floor(Math.min(maxTextureSize,a - n + 1));
			while(1 << m >= slotHeight) {
				if(Math.floor((1 << n) / slotWidth) * Math.floor((1 << m) / slotHeight) < slots) break;
				r = (1 << n) * (1 << m) - slots * slotWidth * slotHeight;
				if(r < 0) break;
				if(r <= rmin) {
					if(r == rmin) {
						if(Math.abs(n - m) < delta) {
							delta = Math.floor(Math.abs(n - m));
							w = n;
							h = m;
							found = true;
						}
					} else {
						w = n;
						h = m;
						rmin = r;
						found = true;
					}
				}
				m--;
			}
			n--;
		}
		var param = { };
		if(found) {
			param.sx = Math.floor((1 << w) / slotWidth);
			param.sy = Math.floor((1 << h) / slotHeight);
			param.slots = param.sx * param.sy;
			param.w = 1 << w;
			param.h = 1 << h;
			haxe_Log.trace("" + param.sx * param.sy + " Slots (" + Std.string(param.sx) + " * " + Std.string(param.sy) + ") on " + (1 << w) + " x " + (1 << h) + " Texture",{ fileName : "Texture.hx", lineNumber : 229, className : "de.peote.view.texture.Texture", methodName : "optimalTextureSize"});
		} else {
			param = null;
			haxe_Log.trace("Error: no possible texture size",{ fileName : "Texture.hx", lineNumber : 234, className : "de.peote.view.texture.Texture", methodName : "optimalTextureSize"});
		}
		return param;
	}
	,__class__: de_peote_view_texture_Texture
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function() { };
haxe_Timer.__name__ = true;
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
var haxe_Utf8 = function() { };
haxe_Utf8.__name__ = true;
haxe_Utf8.iter = function(s,chars) {
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars(HxOverrides.cca(s,i));
	}
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	getFloat: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getFloat32(pos,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		return this.data.getInt32(pos,true);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Eof = function() { };
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
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
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var js_html__$CanvasElement_CanvasUtil = function() { };
js_html__$CanvasElement_CanvasUtil.__name__ = true;
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
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
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var lime_AssetCache = function() {
	this.audio = new haxe_ds_StringMap();
	this.font = new haxe_ds_StringMap();
	this.image = new haxe_ds_StringMap();
	this.version = 613956;
};
lime_AssetCache.__name__ = true;
lime_AssetCache.prototype = {
	clear: function(prefix) {
		if(prefix == null) {
			this.audio = new haxe_ds_StringMap();
			this.font = new haxe_ds_StringMap();
			this.image = new haxe_ds_StringMap();
		} else {
			var keys = this.audio.keys();
			while( keys.hasNext() ) {
				var key = keys.next();
				if(StringTools.startsWith(key,prefix)) this.audio.remove(key);
			}
			var keys1 = this.font.keys();
			while( keys1.hasNext() ) {
				var key1 = keys1.next();
				if(StringTools.startsWith(key1,prefix)) this.font.remove(key1);
			}
			var keys2 = this.image.keys();
			while( keys2.hasNext() ) {
				var key2 = keys2.next();
				if(StringTools.startsWith(key2,prefix)) this.image.remove(key2);
			}
		}
	}
	,__class__: lime_AssetCache
};
var lime_app_Event_$Void_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Void_$Void.__name__ = true;
lime_app_Event_$Void_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function() {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i]();
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Void_$Void
};
var lime_Assets = function() { };
lime_Assets.__name__ = true;
lime_Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return lime_Assets.libraries.get(name);
};
lime_Assets.initialize = function() {
	if(!lime_Assets.initialized) {
		lime_Assets.registerLibrary("default",new DefaultAssetLibrary());
		lime_Assets.initialized = true;
	}
};
lime_Assets.loadBytes = function(id) {
	lime_Assets.initialize();
	var promise = new lime_app_Promise();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName;
	var pos = id.indexOf(":") + 1;
	symbolName = HxOverrides.substr(id,pos,null);
	var library = lime_Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,"BINARY")) promise.completeWith(library.loadBytes(symbolName)); else promise.error("[Assets] There is no String or Bytes asset with an ID of \"" + id + "\"");
	} else promise.error("[Assets] There is no asset library named \"" + libraryName + "\"");
	return promise.future;
};
lime_Assets.registerLibrary = function(name,library) {
	if(lime_Assets.libraries.exists(name)) {
		if(lime_Assets.libraries.get(name) == library) return; else lime_Assets.unloadLibrary(name);
	}
	if(library != null) library.onChange.add(lime_Assets.library_onChange);
	lime_Assets.libraries.set(name,library);
};
lime_Assets.unloadLibrary = function(name) {
	lime_Assets.initialize();
	var library = lime_Assets.libraries.get(name);
	if(library != null) {
		lime_Assets.cache.clear(name + ":");
		library.onChange.remove(lime_Assets.library_onChange);
		library.unload();
	}
	lime_Assets.libraries.remove(name);
};
lime_Assets.library_onChange = function() {
	lime_Assets.cache.clear();
	lime_Assets.onChange.dispatch();
};
var lime__$backend_html5_HTML5Application = function(parent) {
	this.gameDeviceCache = new haxe_ds_IntMap();
	this.parent = parent;
	this.currentUpdate = 0;
	this.lastUpdate = 0;
	this.nextUpdate = 0;
	this.framePeriod = -1;
	lime_audio_AudioManager.init();
};
lime__$backend_html5_HTML5Application.__name__ = true;
lime__$backend_html5_HTML5Application.prototype = {
	convertKeyCode: function(keyCode) {
		if(keyCode >= 65 && keyCode <= 90) return keyCode + 32;
		switch(keyCode) {
		case 16:
			return 1073742049;
		case 17:
			return 1073742048;
		case 18:
			return 1073742050;
		case 20:
			return 1073741881;
		case 144:
			return 1073741907;
		case 37:
			return 1073741904;
		case 38:
			return 1073741906;
		case 39:
			return 1073741903;
		case 40:
			return 1073741905;
		case 45:
			return 1073741897;
		case 46:
			return 127;
		case 36:
			return 1073741898;
		case 35:
			return 1073741901;
		case 33:
			return 1073741899;
		case 34:
			return 1073741902;
		case 112:
			return 1073741882;
		case 113:
			return 1073741883;
		case 114:
			return 1073741884;
		case 115:
			return 1073741885;
		case 116:
			return 1073741886;
		case 117:
			return 1073741887;
		case 118:
			return 1073741888;
		case 119:
			return 1073741889;
		case 120:
			return 1073741890;
		case 121:
			return 1073741891;
		case 122:
			return 1073741892;
		case 123:
			return 1073741893;
		case 124:
			return 1073741928;
		case 125:
			return 1073741929;
		case 126:
			return 1073741930;
		case 186:
			return 59;
		case 187:
			return 61;
		case 188:
			return 44;
		case 189:
			return 45;
		case 190:
			return 46;
		case 191:
			return 47;
		case 192:
			return 96;
		case 219:
			return 91;
		case 220:
			return 92;
		case 221:
			return 93;
		case 222:
			return 39;
		}
		return keyCode;
	}
	,create: function(config) {
	}
	,exec: function() {
		window.addEventListener("keydown",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("keyup",$bind(this,this.handleKeyEvent),false);
		window.addEventListener("focus",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("blur",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("resize",$bind(this,this.handleWindowEvent),false);
		window.addEventListener("beforeunload",$bind(this,this.handleWindowEvent),false);
		
			if (!CanvasRenderingContext2D.prototype.isPointInStroke) {
				CanvasRenderingContext2D.prototype.isPointInStroke = function (path, x, y) {
					return false;
				};
			}
			
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
			window.requestAnimFrame = window.requestAnimationFrame;
		;
		this.lastUpdate = new Date().getTime();
		this.handleApplicationEvent();
		return 0;
	}
	,exit: function() {
	}
	,handleApplicationEvent: function(__) {
		this.updateGameDevices();
		this.currentUpdate = new Date().getTime();
		if(this.currentUpdate >= this.nextUpdate) {
			this.deltaTime = this.currentUpdate - this.lastUpdate;
			this.parent.onUpdate.dispatch(this.deltaTime | 0);
			if(this.parent.__renderers[0] != null) {
				this.parent.__renderers[0].onRender.dispatch();
				this.parent.__renderers[0].flip();
			}
			if(this.framePeriod < 0) {
				this.nextUpdate = this.currentUpdate;
				this.nextUpdate = this.currentUpdate;
			} else this.nextUpdate = this.currentUpdate + this.framePeriod;
			this.lastUpdate = this.currentUpdate;
		}
		window.requestAnimationFrame($bind(this,this.handleApplicationEvent));
	}
	,handleKeyEvent: function(event) {
		if(this.parent.__windows[0] != null) {
			var keyCode = this.convertKeyCode(event.keyCode != null?event.keyCode:event.which);
			var modifier;
			modifier = (event.shiftKey?3:0) | (event.ctrlKey?192:0) | (event.altKey?768:0) | (event.metaKey?3072:0);
			if(event.type == "keydown") {
				this.parent.__windows[0].onKeyDown.dispatch(keyCode,modifier);
				if(this.parent.__windows[0].onKeyDown.canceled) event.preventDefault();
			} else {
				this.parent.__windows[0].onKeyUp.dispatch(keyCode,modifier);
				if(this.parent.__windows[0].onKeyUp.canceled) event.preventDefault();
			}
		}
	}
	,handleWindowEvent: function(event) {
		if(this.parent.__windows[0] != null) {
			var _g = event.type;
			switch(_g) {
			case "focus":
				this.parent.__windows[0].onFocusIn.dispatch();
				this.parent.__windows[0].onActivate.dispatch();
				break;
			case "blur":
				this.parent.__windows[0].onFocusOut.dispatch();
				this.parent.__windows[0].onDeactivate.dispatch();
				break;
			case "resize":
				var cacheWidth = this.parent.__windows[0].__width;
				var cacheHeight = this.parent.__windows[0].__height;
				this.parent.__windows[0].backend.handleResize();
				if(this.parent.__windows[0].__width != cacheWidth || this.parent.__windows[0].__height != cacheHeight) this.parent.__windows[0].onResize.dispatch(this.parent.__windows[0].__width,this.parent.__windows[0].__height);
				break;
			case "beforeunload":
				this.parent.__windows[0].onClose.dispatch();
				break;
			}
		}
	}
	,setFrameRate: function(value) {
		if(value >= 60) this.framePeriod = -1; else if(value > 0) this.framePeriod = 1000 / value; else this.framePeriod = 1000;
		return value;
	}
	,updateGameDevices: function() {
		var devices = lime_ui_Joystick.__getDeviceData();
		if(devices == null) return;
		var id;
		var gamepad;
		var joystick;
		var data;
		var cache;
		var _g1 = 0;
		var _g = devices.length;
		while(_g1 < _g) {
			var i = _g1++;
			id = i;
			data = devices[id];
			if(data == null) continue;
			if(!this.gameDeviceCache.h.hasOwnProperty(id)) {
				cache = new lime__$backend_html5_GameDeviceData();
				cache.id = id;
				cache.connected = data.connected;
				var _g3 = 0;
				var _g2 = data.buttons.length;
				while(_g3 < _g2) {
					var i1 = _g3++;
					cache.buttons.push(data.buttons[i1].value);
				}
				var _g31 = 0;
				var _g21 = data.axes.length;
				while(_g31 < _g21) {
					var i2 = _g31++;
					cache.axes.push(data.axes[i2]);
				}
				if(data.mapping == "standard") cache.isGamepad = true;
				this.gameDeviceCache.h[id] = cache;
				if(data.connected) {
					lime_ui_Joystick.__connect(id);
					if(cache.isGamepad) lime_ui_Gamepad.__connect(id);
				}
			}
			cache = this.gameDeviceCache.h[id];
			joystick = lime_ui_Joystick.devices.h[id];
			gamepad = lime_ui_Gamepad.devices.h[id];
			if(data.connected) {
				var button;
				var value;
				var _g32 = 0;
				var _g22 = data.buttons.length;
				while(_g32 < _g22) {
					var i3 = _g32++;
					value = data.buttons[i3].value;
					if(value != cache.buttons[i3]) {
						if(i3 == 6) {
							joystick.onAxisMove.dispatch(data.axes.length,value);
							if(gamepad != null) gamepad.onAxisMove.dispatch(4,value);
						} else if(i3 == 7) {
							joystick.onAxisMove.dispatch(data.axes.length + 1,value);
							if(gamepad != null) gamepad.onAxisMove.dispatch(5,value);
						} else {
							if(value > 0) joystick.onButtonDown.dispatch(i3); else joystick.onButtonUp.dispatch(i3);
							if(gamepad != null) {
								switch(i3) {
								case 0:
									button = 0;
									break;
								case 1:
									button = 1;
									break;
								case 2:
									button = 2;
									break;
								case 3:
									button = 3;
									break;
								case 4:
									button = 9;
									break;
								case 5:
									button = 10;
									break;
								case 8:
									button = 4;
									break;
								case 9:
									button = 6;
									break;
								case 10:
									button = 7;
									break;
								case 11:
									button = 8;
									break;
								case 12:
									button = 11;
									break;
								case 13:
									button = 12;
									break;
								case 14:
									button = 13;
									break;
								case 15:
									button = 14;
									break;
								case 16:
									button = 5;
									break;
								default:
									continue;
								}
								if(value > 0) gamepad.onButtonDown.dispatch(button); else gamepad.onButtonUp.dispatch(button);
							}
						}
						cache.buttons[i3] = value;
					}
				}
				var _g33 = 0;
				var _g23 = data.axes.length;
				while(_g33 < _g23) {
					var i4 = _g33++;
					if(data.axes[i4] != cache.axes[i4]) {
						joystick.onAxisMove.dispatch(i4,data.axes[i4]);
						if(gamepad != null) gamepad.onAxisMove.dispatch(i4,data.axes[i4]);
						cache.axes[i4] = data.axes[i4];
					}
				}
			} else if(cache.connected) {
				cache.connected = false;
				lime_ui_Joystick.__disconnect(id);
				lime_ui_Gamepad.__disconnect(id);
			}
		}
	}
	,__class__: lime__$backend_html5_HTML5Application
};
var lime__$backend_html5_GameDeviceData = function() {
	this.connected = true;
	this.buttons = [];
	this.axes = [];
};
lime__$backend_html5_GameDeviceData.__name__ = true;
lime__$backend_html5_GameDeviceData.prototype = {
	__class__: lime__$backend_html5_GameDeviceData
};
var lime__$backend_html5_HTML5Renderer = function(parent) {
	this.parent = parent;
};
lime__$backend_html5_HTML5Renderer.__name__ = true;
lime__$backend_html5_HTML5Renderer.prototype = {
	create: function() {
		this.createContext();
		{
			var _g = this.parent.context;
			switch(_g[1]) {
			case 0:
				this.parent.window.backend.canvas.addEventListener("webglcontextlost",$bind(this,this.handleEvent),false);
				this.parent.window.backend.canvas.addEventListener("webglcontextrestored",$bind(this,this.handleEvent),false);
				break;
			default:
			}
		}
	}
	,createContext: function() {
		if(this.parent.window.backend.div != null) {
			this.parent.context = lime_graphics_RenderContext.DOM(this.parent.window.backend.div);
			this.parent.type = lime_graphics_RendererType.DOM;
		} else if(this.parent.window.backend.canvas != null) {
			var webgl = null;
			if(!Object.prototype.hasOwnProperty.call(this.parent.window.config,"hardware") || this.parent.window.config.hardware) {
				var options = { alpha : Object.prototype.hasOwnProperty.call(this.parent.window.config,"background") && this.parent.window.config.background == null?true:false, antialias : Object.prototype.hasOwnProperty.call(this.parent.window.config,"antialiasing")?this.parent.window.config.antialiasing > 0:false, depth : Object.prototype.hasOwnProperty.call(this.parent.window.config,"depthBuffer")?this.parent.window.config.depthBuffer:true, premultipliedAlpha : true, stencil : Object.prototype.hasOwnProperty.call(this.parent.window.config,"stencilBuffer")?this.parent.window.config.stencilBuffer:false, preserveDrawingBuffer : false};
				webgl = js_html__$CanvasElement_CanvasUtil.getContextWebGL(this.parent.window.backend.canvas,options);
			}
			if(webgl == null) {
				this.parent.context = lime_graphics_RenderContext.CANVAS(this.parent.window.backend.canvas.getContext("2d"));
				this.parent.type = lime_graphics_RendererType.CANVAS;
			} else {
				lime_graphics_opengl_GL.context = webgl;
				this.parent.context = lime_graphics_RenderContext.OPENGL(lime_graphics_opengl_GL.context);
				this.parent.type = lime_graphics_RendererType.OPENGL;
			}
		}
	}
	,flip: function() {
	}
	,handleEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "webglcontextlost":
			event.preventDefault();
			this.parent.context = null;
			this.parent.onContextLost.dispatch();
			break;
		case "webglcontextrestored":
			this.createContext();
			this.parent.onContextRestored.dispatch(this.parent.context);
			break;
		default:
		}
	}
	,__class__: lime__$backend_html5_HTML5Renderer
};
var lime__$backend_html5_HTML5Window = function(parent) {
	this.unusedTouchesPool = new List();
	this.currentTouches = new haxe_ds_IntMap();
	this.parent = parent;
	if(parent.config != null && Object.prototype.hasOwnProperty.call(parent.config,"element")) this.element = parent.config.element;
};
lime__$backend_html5_HTML5Window.__name__ = true;
lime__$backend_html5_HTML5Window.prototype = {
	close: function() {
		this.parent.application.removeWindow(this.parent);
	}
	,create: function(application) {
		this.setWidth = this.parent.__width;
		this.setHeight = this.parent.__height;
		this.parent.id = lime__$backend_html5_HTML5Window.windowID++;
		if(js_Boot.__instanceof(this.element,HTMLCanvasElement)) this.canvas = this.element; else this.canvas = window.document.createElement("canvas");
		if(this.canvas != null) {
			var style = this.canvas.style;
			style.setProperty("-webkit-transform","translateZ(0)",null);
			style.setProperty("transform","translateZ(0)",null);
		} else if(this.div != null) {
			var style1 = this.div.style;
			style1.setProperty("-webkit-transform","translate3D(0,0,0)",null);
			style1.setProperty("transform","translate3D(0,0,0)",null);
			style1.position = "relative";
			style1.overflow = "hidden";
			style1.setProperty("-webkit-user-select","none",null);
			style1.setProperty("-moz-user-select","none",null);
			style1.setProperty("-ms-user-select","none",null);
			style1.setProperty("-o-user-select","none",null);
		}
		if(this.parent.__width == 0 && this.parent.__height == 0) {
			if(this.element != null) {
				this.parent.set_width(this.element.clientWidth);
				this.parent.set_height(this.element.clientHeight);
			} else {
				this.parent.set_width(window.innerWidth);
				this.parent.set_height(window.innerHeight);
			}
			this.parent.set_fullscreen(true);
		}
		if(this.canvas != null) {
			this.canvas.width = this.parent.__width;
			this.canvas.height = this.parent.__height;
		} else {
			this.div.style.width = this.parent.__width + "px";
			this.div.style.height = this.parent.__height + "px";
		}
		this.handleResize();
		if(this.element != null) {
			if(this.canvas != null) {
				if(this.element != this.canvas) this.element.appendChild(this.canvas);
			} else this.element.appendChild(this.div);
			var events = ["mousedown","mouseenter","mouseleave","mousemove","mouseup","wheel"];
			var _g = 0;
			while(_g < events.length) {
				var event = events[_g];
				++_g;
				this.element.addEventListener(event,$bind(this,this.handleMouseEvent),true);
			}
			window.document.addEventListener("dragstart",function(e) {
				if(e.target.nodeName.toLowerCase() == "img") {
					e.preventDefault();
					return false;
				}
				return true;
			},false);
			this.element.addEventListener("touchstart",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchmove",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("touchend",$bind(this,this.handleTouchEvent),true);
			this.element.addEventListener("gamepadconnected",$bind(this,this.handleGamepadEvent),true);
			this.element.addEventListener("gamepaddisconnected",$bind(this,this.handleGamepadEvent),true);
		}
	}
	,handleGamepadEvent: function(event) {
		var _g = event.type;
		switch(_g) {
		case "gamepadconnected":
			lime_ui_Joystick.__connect(event.gamepad.index);
			if(event.gamepad.mapping == "standard") lime_ui_Gamepad.__connect(event.gamepad.index);
			break;
		case "gamepaddisconnected":
			lime_ui_Joystick.__disconnect(event.gamepad.index);
			lime_ui_Gamepad.__disconnect(event.gamepad.index);
			break;
		default:
		}
	}
	,handleMouseEvent: function(event) {
		var x = 0.0;
		var y = 0.0;
		if(event.type != "wheel") {
			if(this.element != null) {
				if(this.canvas != null) {
					var rect = this.canvas.getBoundingClientRect();
					x = (event.clientX - rect.left) * (this.parent.__width / rect.width);
					y = (event.clientY - rect.top) * (this.parent.__height / rect.height);
				} else if(this.div != null) {
					var rect1 = this.div.getBoundingClientRect();
					x = event.clientX - rect1.left;
					y = event.clientY - rect1.top;
				} else {
					var rect2 = this.element.getBoundingClientRect();
					x = (event.clientX - rect2.left) * (this.parent.__width / rect2.width);
					y = (event.clientY - rect2.top) * (this.parent.__height / rect2.height);
				}
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			var _g = event.type;
			switch(_g) {
			case "mousedown":
				this.parent.onMouseDown.dispatch(x,y,event.button);
				break;
			case "mouseenter":
				this.parent.onEnter.dispatch();
				break;
			case "mouseleave":
				this.parent.onLeave.dispatch();
				break;
			case "mouseup":
				this.parent.onMouseUp.dispatch(x,y,event.button);
				break;
			case "mousemove":
				this.parent.onMouseMove.dispatch(x,y);
				break;
			default:
			}
		} else this.parent.onMouseWheel.dispatch(event.deltaX,-event.deltaY);
	}
	,handleResize: function() {
		var stretch = this.parent.__fullscreen || this.setWidth == 0 && this.setHeight == 0;
		if(this.element != null && (this.div == null || this.div != null && stretch)) {
			if(stretch) {
				if(this.parent.__width != this.element.clientWidth || this.parent.__height != this.element.clientHeight) {
					this.parent.set_width(this.element.clientWidth);
					this.parent.set_height(this.element.clientHeight);
					if(this.canvas != null) {
						if(this.element != this.canvas) {
							this.canvas.width = this.element.clientWidth;
							this.canvas.height = this.element.clientHeight;
						}
					} else {
						this.div.style.width = this.element.clientWidth + "px";
						this.div.style.height = this.element.clientHeight + "px";
					}
				}
			} else {
				var scaleX;
				if(this.setWidth != 0) scaleX = this.element.clientWidth / this.setWidth; else scaleX = 1;
				var scaleY;
				if(this.setHeight != 0) scaleY = this.element.clientHeight / this.setHeight; else scaleY = 1;
				var targetW = this.element.clientWidth;
				var targetH = this.element.clientHeight;
				var marginLeft = 0;
				var marginTop = 0;
				if(scaleX < scaleY) {
					targetH = Math.floor(this.setHeight * scaleX);
					marginTop = Math.floor((this.element.clientHeight - targetH) / 2);
				} else {
					targetW = Math.floor(this.setWidth * scaleY);
					marginLeft = Math.floor((this.element.clientWidth - targetW) / 2);
				}
				if(this.canvas != null) {
					if(this.element != this.canvas) {
						this.canvas.style.width = targetW + "px";
						this.canvas.style.height = targetH + "px";
						this.canvas.style.marginLeft = marginLeft + "px";
						this.canvas.style.marginTop = marginTop + "px";
					}
				} else {
					this.div.style.width = targetW + "px";
					this.div.style.height = targetH + "px";
					this.div.style.marginLeft = marginLeft + "px";
					this.div.style.marginTop = marginTop + "px";
				}
			}
		}
	}
	,handleTouchEvent: function(event) {
		event.preventDefault();
		var rect = null;
		if(this.element != null) {
			if(this.canvas != null) rect = this.canvas.getBoundingClientRect(); else if(this.div != null) rect = this.div.getBoundingClientRect(); else rect = this.element.getBoundingClientRect();
		}
		var windowWidth = this.setWidth;
		var windowHeight = this.setHeight;
		if(windowWidth == 0 || windowHeight == 0) {
			if(rect != null) {
				windowWidth = rect.width;
				windowHeight = rect.height;
			} else {
				windowWidth = 1;
				windowHeight = 1;
			}
		}
		var _g = 0;
		var _g1 = event.changedTouches;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			var x = 0.0;
			var y = 0.0;
			if(rect != null) {
				x = (data.clientX - rect.left) * (windowWidth / rect.width);
				y = (data.clientY - rect.top) * (windowHeight / rect.height);
			} else {
				x = data.clientX;
				y = data.clientY;
			}
			var _g2 = event.type;
			switch(_g2) {
			case "touchstart":
				var touch = this.unusedTouchesPool.pop();
				if(touch == null) touch = new lime_ui_Touch(x / windowWidth,y / windowHeight,data.identifier,0,0,data.force,this.parent.id); else {
					touch.x = x / windowWidth;
					touch.y = y / windowHeight;
					touch.id = data.identifier;
					touch.dx = 0;
					touch.dy = 0;
					touch.pressure = data.force;
					touch.device = this.parent.id;
				}
				this.currentTouches.h[data.identifier] = touch;
				lime_ui_Touch.onStart.dispatch(touch);
				if(this.primaryTouch == null) this.primaryTouch = touch;
				if(touch == this.primaryTouch) this.parent.onMouseDown.dispatch(x,y,0);
				break;
			case "touchend":
				var touch1 = this.currentTouches.h[data.identifier];
				if(touch1 != null) {
					var cacheX = touch1.x;
					var cacheY = touch1.y;
					touch1.x = x / windowWidth;
					touch1.y = y / windowHeight;
					touch1.dx = touch1.x - cacheX;
					touch1.dy = touch1.y - cacheY;
					touch1.pressure = data.force;
					lime_ui_Touch.onEnd.dispatch(touch1);
					this.currentTouches.remove(data.identifier);
					this.unusedTouchesPool.add(touch1);
					if(touch1 == this.primaryTouch) {
						this.parent.onMouseUp.dispatch(x,y,0);
						this.primaryTouch = null;
					}
				}
				break;
			case "touchmove":
				var touch2 = this.currentTouches.h[data.identifier];
				if(touch2 != null) {
					var cacheX1 = touch2.x;
					var cacheY1 = touch2.y;
					touch2.x = x / windowWidth;
					touch2.y = y / windowHeight;
					touch2.dx = touch2.x - cacheX1;
					touch2.dy = touch2.y - cacheY1;
					touch2.pressure = data.force;
					lime_ui_Touch.onMove.dispatch(touch2);
					if(touch2 == this.primaryTouch) this.parent.onMouseMove.dispatch(x,y);
				}
				break;
			default:
			}
		}
	}
	,resize: function(width,height) {
	}
	,setFullscreen: function(value) {
		return false;
	}
	,__class__: lime__$backend_html5_HTML5Window
};
var lime_app_IModule = function() { };
lime_app_IModule.__name__ = true;
lime_app_IModule.prototype = {
	__class__: lime_app_IModule
};
var lime_app_Module = function() {
	this.onExit = new lime_app_Event_$Int_$Void();
	this.__renderers = [];
	this.__windows = [];
};
lime_app_Module.__name__ = true;
lime_app_Module.__interfaces__ = [lime_app_IModule];
lime_app_Module.prototype = {
	addRenderer: function(renderer) {
		renderer.onRender.add((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this.render),renderer));
		renderer.onContextLost.add((function(f1,a11) {
			return function() {
				f1(a11);
			};
		})($bind(this,this.onRenderContextLost),renderer));
		renderer.onContextRestored.add((function(f2,a12) {
			return function(a2) {
				f2(a12,a2);
			};
		})($bind(this,this.onRenderContextRestored),renderer));
		this.__renderers.push(renderer);
	}
	,addWindow: function(window) {
		window.onActivate.add((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this.onWindowActivate),window));
		window.onClose.add((function(f1,a11) {
			return function() {
				f1(a11);
			};
		})($bind(this,this.__onWindowClose),window));
		window.onCreate.add((function(f2,a12) {
			return function() {
				f2(a12);
			};
		})($bind(this,this.onWindowCreate),window));
		window.onDeactivate.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onWindowDeactivate),window));
		window.onDropFile.add((function(f4,a14) {
			return function(a2) {
				f4(a14,a2);
			};
		})($bind(this,this.onWindowDropFile),window));
		window.onEnter.add((function(f5,a15) {
			return function() {
				f5(a15);
			};
		})($bind(this,this.onWindowEnter),window));
		window.onFocusIn.add((function(f6,a16) {
			return function() {
				f6(a16);
			};
		})($bind(this,this.onWindowFocusIn),window));
		window.onFocusOut.add((function(f7,a17) {
			return function() {
				f7(a17);
			};
		})($bind(this,this.onWindowFocusOut),window));
		window.onFullscreen.add((function(f8,a18) {
			return function() {
				f8(a18);
			};
		})($bind(this,this.onWindowFullscreen),window));
		window.onKeyDown.add((function(f9,a19) {
			return function(a21,a3) {
				f9(a19,a21,a3);
			};
		})($bind(this,this.onKeyDown),window));
		window.onKeyUp.add((function(f10,a110) {
			return function(a22,a31) {
				f10(a110,a22,a31);
			};
		})($bind(this,this.onKeyUp),window));
		window.onLeave.add((function(f11,a111) {
			return function() {
				f11(a111);
			};
		})($bind(this,this.onWindowLeave),window));
		window.onMinimize.add((function(f12,a112) {
			return function() {
				f12(a112);
			};
		})($bind(this,this.onWindowMinimize),window));
		window.onMouseDown.add((function(f13,a113) {
			return function(x,y,a23) {
				f13(a113,x,y,a23);
			};
		})($bind(this,this.onMouseDown),window));
		window.onMouseMove.add((function(f14,a114) {
			return function(x1,y1) {
				f14(a114,x1,y1);
			};
		})($bind(this,this.onMouseMove),window));
		window.onMouseMoveRelative.add((function(f15,a115) {
			return function(x2,y2) {
				f15(a115,x2,y2);
			};
		})($bind(this,this.onMouseMoveRelative),window));
		window.onMouseUp.add((function(f16,a116) {
			return function(x3,y3,a24) {
				f16(a116,x3,y3,a24);
			};
		})($bind(this,this.onMouseUp),window));
		window.onMouseWheel.add((function(f17,a117) {
			return function(a25,a32) {
				f17(a117,a25,a32);
			};
		})($bind(this,this.onMouseWheel),window));
		window.onMove.add((function(f18,a118) {
			return function(x4,y4) {
				f18(a118,x4,y4);
			};
		})($bind(this,this.onWindowMove),window));
		window.onResize.add((function(f19,a119) {
			return function(a26,a33) {
				f19(a119,a26,a33);
			};
		})($bind(this,this.onWindowResize),window));
		window.onRestore.add((function(f20,a120) {
			return function() {
				f20(a120);
			};
		})($bind(this,this.onWindowRestore),window));
		window.onTextEdit.add((function(f21,a121) {
			return function(a27,a34,a4) {
				f21(a121,a27,a34,a4);
			};
		})($bind(this,this.onTextEdit),window));
		window.onTextInput.add((function(f22,a122) {
			return function(a28) {
				f22(a122,a28);
			};
		})($bind(this,this.onTextInput),window));
		if(window.id > -1) this.onWindowCreate(window);
		this.__windows.push(window);
	}
	,registerModule: function(application) {
		this.__application = application;
		application.onExit.add($bind(this,this.onModuleExit),false,0);
		application.onUpdate.add($bind(this,this.update));
		var $it0 = lime_ui_Gamepad.devices.iterator();
		while( $it0.hasNext() ) {
			var gamepad = $it0.next();
			this.__onGamepadConnect(gamepad);
		}
		lime_ui_Gamepad.onConnect.add($bind(this,this.__onGamepadConnect));
		var $it1 = lime_ui_Joystick.devices.iterator();
		while( $it1.hasNext() ) {
			var joystick = $it1.next();
			this.__onJoystickConnect(joystick);
		}
		lime_ui_Joystick.onConnect.add($bind(this,this.__onJoystickConnect));
		lime_ui_Touch.onStart.add($bind(this,this.onTouchStart));
		lime_ui_Touch.onMove.add($bind(this,this.onTouchMove));
		lime_ui_Touch.onEnd.add($bind(this,this.onTouchEnd));
	}
	,setPreloader: function(preloader) {
		if(this.__preloader != null) {
			this.__preloader.onProgress.remove($bind(this,this.onPreloadProgress));
			this.__preloader.onComplete.remove($bind(this,this.onPreloadComplete));
		}
		this.__preloader = preloader;
		if(preloader == null || preloader.complete) this.onPreloadComplete(); else {
			preloader.onProgress.add($bind(this,this.onPreloadProgress));
			preloader.onComplete.add($bind(this,this.onPreloadComplete));
		}
	}
	,onGamepadAxisMove: function(gamepad,axis,value) {
	}
	,onGamepadButtonDown: function(gamepad,button) {
	}
	,onGamepadButtonUp: function(gamepad,button) {
	}
	,onGamepadConnect: function(gamepad) {
		haxe_Log.trace("onGamepadConnect (module)",{ fileName : "Module.hx", lineNumber : 207, className : "lime.app.Module", methodName : "onGamepadConnect"});
	}
	,onGamepadDisconnect: function(gamepad) {
	}
	,onJoystickAxisMove: function(joystick,axis,value) {
	}
	,onJoystickButtonDown: function(joystick,button) {
	}
	,onJoystickButtonUp: function(joystick,button) {
	}
	,onJoystickConnect: function(joystick) {
	}
	,onJoystickDisconnect: function(joystick) {
	}
	,onJoystickHatMove: function(joystick,hat,position) {
	}
	,onJoystickTrackballMove: function(joystick,trackball,value) {
	}
	,onKeyDown: function(window,keyCode,modifier) {
	}
	,onKeyUp: function(window,keyCode,modifier) {
	}
	,onModuleExit: function(code) {
	}
	,onMouseDown: function(window,x,y,button) {
	}
	,onMouseMove: function(window,x,y) {
	}
	,onMouseMoveRelative: function(window,x,y) {
	}
	,onMouseUp: function(window,x,y,button) {
	}
	,onMouseWheel: function(window,deltaX,deltaY) {
	}
	,onPreloadComplete: function() {
	}
	,onPreloadProgress: function(loaded,total) {
	}
	,onRenderContextLost: function(renderer) {
	}
	,onRenderContextRestored: function(renderer,context) {
	}
	,onTextEdit: function(window,text,start,length) {
	}
	,onTextInput: function(window,text) {
	}
	,onTouchEnd: function(touch) {
	}
	,onTouchMove: function(touch) {
	}
	,onTouchStart: function(touch) {
	}
	,onWindowActivate: function(window) {
	}
	,onWindowClose: function(window) {
	}
	,onWindowCreate: function(window) {
	}
	,onWindowDeactivate: function(window) {
	}
	,onWindowDropFile: function(window,file) {
	}
	,onWindowEnter: function(window) {
	}
	,onWindowFocusIn: function(window) {
	}
	,onWindowFocusOut: function(window) {
	}
	,onWindowFullscreen: function(window) {
	}
	,onWindowLeave: function(window) {
	}
	,onWindowMove: function(window,x,y) {
	}
	,onWindowMinimize: function(window) {
	}
	,onWindowResize: function(window,width,height) {
	}
	,onWindowRestore: function(window) {
	}
	,render: function(renderer) {
	}
	,update: function(deltaTime) {
	}
	,__onGamepadConnect: function(gamepad) {
		this.onGamepadConnect(gamepad);
		gamepad.onAxisMove.add((function(f,a1) {
			return function(a2,a3) {
				f(a1,a2,a3);
			};
		})($bind(this,this.onGamepadAxisMove),gamepad));
		gamepad.onButtonDown.add((function(f1,a11) {
			return function(a21) {
				f1(a11,a21);
			};
		})($bind(this,this.onGamepadButtonDown),gamepad));
		gamepad.onButtonUp.add((function(f2,a12) {
			return function(a22) {
				f2(a12,a22);
			};
		})($bind(this,this.onGamepadButtonUp),gamepad));
		gamepad.onDisconnect.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onGamepadDisconnect),gamepad));
	}
	,__onJoystickConnect: function(joystick) {
		this.onJoystickConnect(joystick);
		joystick.onAxisMove.add((function(f,a1) {
			return function(a2,a3) {
				f(a1,a2,a3);
			};
		})($bind(this,this.onJoystickAxisMove),joystick));
		joystick.onButtonDown.add((function(f1,a11) {
			return function(a21) {
				f1(a11,a21);
			};
		})($bind(this,this.onJoystickButtonDown),joystick));
		joystick.onButtonUp.add((function(f2,a12) {
			return function(a22) {
				f2(a12,a22);
			};
		})($bind(this,this.onJoystickButtonUp),joystick));
		joystick.onDisconnect.add((function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.onJoystickDisconnect),joystick));
		joystick.onHatMove.add((function(f4,a14) {
			return function(a23,a31) {
				f4(a14,a23,a31);
			};
		})($bind(this,this.onJoystickHatMove),joystick));
		joystick.onTrackballMove.add((function(f5,a15) {
			return function(a24,a32) {
				f5(a15,a24,a32);
			};
		})($bind(this,this.onJoystickTrackballMove),joystick));
	}
	,__onWindowClose: function(window) {
		this.onWindowClose(window);
		HxOverrides.remove(this.__windows,window);
	}
	,__class__: lime_app_Module
};
var lime_app_Application = function() {
	this.onUpdate = new lime_app_Event_$Int_$Void();
	lime_app_Module.call(this);
	if(lime_app_Application.current == null) lime_app_Application.current = this;
	this.modules = [];
	this.windowByID = new haxe_ds_IntMap();
	this.backend = new lime__$backend_html5_HTML5Application(this);
	this.registerModule(this);
};
lime_app_Application.__name__ = true;
lime_app_Application.__super__ = lime_app_Module;
lime_app_Application.prototype = $extend(lime_app_Module.prototype,{
	addRenderer: function(renderer) {
		lime_app_Module.prototype.addRenderer.call(this,renderer);
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.addRenderer(renderer);
		}
	}
	,create: function(config) {
		this.config = config;
		this.backend.create(config);
		if(config != null) {
			if(Object.prototype.hasOwnProperty.call(config,"fps")) this.backend.setFrameRate(config.fps);
			if(Object.prototype.hasOwnProperty.call(config,"windows")) {
				var _g = 0;
				var _g1 = config.windows;
				while(_g < _g1.length) {
					var windowConfig = _g1[_g];
					++_g;
					var $window = new lime_ui_Window(windowConfig);
					this.createWindow($window);
					break;
				}
			}
			if(this.__preloader == null || this.__preloader.complete) {
				this.setPreloader(this.__preloader);
				var _g2 = 0;
				var _g11 = this.modules;
				while(_g2 < _g11.length) {
					var module = _g11[_g2];
					++_g2;
					this.setPreloader(this.__preloader);
				}
			}
		}
	}
	,createWindow: function(window) {
		lime_app_Module.prototype.addWindow.call(this,window);
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.addWindow(window);
		}
		if(window.renderer == null) {
			var renderer = new lime_graphics_Renderer(window);
			this.addRenderer(renderer);
		}
		window.create(this);
		this.__windows.push(window);
		this.windowByID.h[window.id] = window;
		window.onCreate.dispatch();
	}
	,exec: function() {
		lime_app_Application.current = this;
		return this.backend.exec();
	}
	,onModuleExit: function(code) {
		this.backend.exit();
	}
	,onWindowClose: function(window) {
		this.removeWindow(window);
	}
	,removeWindow: function(window) {
		if(window != null && this.windowByID.h.hasOwnProperty(window.id)) {
			HxOverrides.remove(this.__windows,window);
			this.windowByID.remove(window.id);
			window.close();
			if(this.__windows[0] == window) this.window = null;
		}
	}
	,setPreloader: function(preloader) {
		lime_app_Module.prototype.setPreloader.call(this,preloader);
		var _g = 0;
		var _g1 = this.modules;
		while(_g < _g1.length) {
			var module = _g1[_g];
			++_g;
			module.setPreloader(preloader);
		}
	}
	,__class__: lime_app_Application
});
var lime_app_Event_$Dynamic_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Dynamic_$Void.__name__ = true;
lime_app_Event_$Dynamic_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Dynamic_$Void
};
var lime_app_Event_$Float_$Float_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Float_$Float_$Int_$Void.__name__ = true;
lime_app_Event_$Float_$Float_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1,a2) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1,a2);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Float_$Float_$Int_$Void
};
var lime_app_Event_$Float_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Float_$Float_$Void.__name__ = true;
lime_app_Event_$Float_$Float_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Float_$Float_$Void
};
var lime_app_Event_$Int_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Int_$Float_$Void.__name__ = true;
lime_app_Event_$Int_$Float_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Float_$Void
};
var lime_app_Event_$Int_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Int_$Int_$Void.__name__ = true;
lime_app_Event_$Int_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Int_$Void
};
var lime_app_Event_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Int_$Void.__name__ = true;
lime_app_Event_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$Int_$Void
};
var lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void.__name__ = true;
lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,__class__: lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void
};
var lime_app_Event_$String_$Int_$Int_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$String_$Int_$Int_$Void.__name__ = true;
lime_app_Event_$String_$Int_$Int_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,__class__: lime_app_Event_$String_$Int_$Int_$Void
};
var lime_app_Event_$String_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$String_$Void.__name__ = true;
lime_app_Event_$String_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,__class__: lime_app_Event_$String_$Void
};
var lime_app_Event_$lime_$graphics_$RenderContext_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$lime_$graphics_$RenderContext_$Void.__name__ = true;
lime_app_Event_$lime_$graphics_$RenderContext_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$graphics_$RenderContext_$Void
};
var lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void
};
var lime_app_Event_$lime_$ui_$GamepadButton_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$lime_$ui_$GamepadButton_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$GamepadButton_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$GamepadButton_$Void
};
var lime_app_Event_$lime_$ui_$Gamepad_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$lime_$ui_$Gamepad_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$Gamepad_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Gamepad_$Void
};
var lime_app_Event_$lime_$ui_$Joystick_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$lime_$ui_$Joystick_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$Joystick_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Joystick_$Void
};
var lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a,a1) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a,a1);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void
};
var lime_app_Event_$lime_$ui_$Touch_$Void = function() {
	this.canceled = false;
	this.__listeners = [];
	this.__priorities = [];
	this.__repeat = [];
};
lime_app_Event_$lime_$ui_$Touch_$Void.__name__ = true;
lime_app_Event_$lime_$ui_$Touch_$Void.prototype = {
	add: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		var _g1 = 0;
		var _g = this.__priorities.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(priority > this.__priorities[i]) {
				this.__listeners.splice(i,0,listener);
				this.__priorities.splice(i,0,priority);
				this.__repeat.splice(i,0,!once);
				return;
			}
		}
		this.__listeners.push(listener);
		this.__priorities.push(priority);
		this.__repeat.push(!once);
	}
	,remove: function(listener) {
		var i = this.__listeners.length;
		while(--i >= 0) if(Reflect.compareMethods(this.__listeners[i],listener)) {
			this.__listeners.splice(i,1);
			this.__priorities.splice(i,1);
			this.__repeat.splice(i,1);
		}
	}
	,dispatch: function(a) {
		this.canceled = false;
		var listeners = this.__listeners;
		var repeat = this.__repeat;
		var i = 0;
		while(i < listeners.length) {
			listeners[i](a);
			if(!repeat[i]) this.remove(listeners[i]); else i++;
			if(this.canceled) break;
		}
	}
	,__class__: lime_app_Event_$lime_$ui_$Touch_$Void
};
var lime_app_Future = function(work) {
	if(work != null) {
		if(lime_app_Future.__threadPool == null) {
			lime_app_Future.__threadPool = new lime_system_ThreadPool();
			lime_app_Future.__threadPool.doWork.add(lime_app_Future.threadPool_doWork);
			lime_app_Future.__threadPool.onComplete.add(lime_app_Future.threadPool_onComplete);
			lime_app_Future.__threadPool.onError.add(lime_app_Future.threadPool_onError);
		}
		var promise = new lime_app_Promise();
		promise.future = this;
		lime_app_Future.__threadPool.queue({ promise : promise, work : work});
	}
};
lime_app_Future.__name__ = true;
lime_app_Future.threadPool_doWork = function(state) {
	try {
		var result = state.work();
		lime_app_Future.__threadPool.sendComplete({ promise : state.promise, result : result});
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		lime_app_Future.__threadPool.sendError({ promise : state.promise, error : e});
	}
};
lime_app_Future.threadPool_onComplete = function(state) {
	state.promise.complete(state.result);
};
lime_app_Future.threadPool_onError = function(state) {
	state.promise.error(state.error);
};
lime_app_Future.prototype = {
	onComplete: function(listener) {
		if(listener != null) {
			if(this.__completed) listener(this.value); else if(!this.__errored) {
				if(this.__completeListeners == null) this.__completeListeners = [];
				this.__completeListeners.push(listener);
			}
		}
		return this;
	}
	,onError: function(listener) {
		if(listener != null) {
			if(this.__errored) listener(this.__errorMessage); else if(!this.__completed) {
				if(this.__errorListeners == null) this.__errorListeners = [];
				this.__errorListeners.push(listener);
			}
		}
		return this;
	}
	,onProgress: function(listener) {
		if(listener != null) {
			if(this.__progressListeners == null) this.__progressListeners = [];
			this.__progressListeners.push(listener);
		}
		return this;
	}
	,__class__: lime_app_Future
};
var lime_app_Preloader = function() {
	this.total = 0;
	this.loaded = 0;
	this.onProgress = new lime_app_Event_$Int_$Int_$Void();
	this.onComplete = new lime_app_Event_$Void_$Void();
	this.onProgress.add($bind(this,this.update));
};
lime_app_Preloader.__name__ = true;
lime_app_Preloader.prototype = {
	create: function(config) {
	}
	,load: function(urls,types) {
		var url = null;
		var cacheVersion = lime_Assets.cache.version;
		var _g1 = 0;
		var _g = urls.length;
		while(_g1 < _g) {
			var i = _g1++;
			url = urls[i];
			var _g2 = types[i];
			switch(_g2) {
			case "IMAGE":
				if(!lime_app_Preloader.images.exists(url)) {
					var image = new Image();
					lime_app_Preloader.images.set(url,image);
					image.onload = $bind(this,this.image_onLoad);
					image.src = url + "?" + cacheVersion;
					this.total++;
				}
				break;
			case "BINARY":
				if(!lime_app_Preloader.loaders.exists(url)) {
					var loader = new lime_net_HTTPRequest();
					lime_app_Preloader.loaders.set(url,loader);
					this.total++;
				}
				break;
			case "TEXT":
				if(!lime_app_Preloader.loaders.exists(url)) {
					var loader1 = new lime_net_HTTPRequest();
					lime_app_Preloader.loaders.set(url,loader1);
					this.total++;
				}
				break;
			case "FONT":
				this.total++;
				this.loadFont(url);
				break;
			default:
			}
		}
		var $it0 = lime_app_Preloader.loaders.keys();
		while( $it0.hasNext() ) {
			var url1 = $it0.next();
			var loader2 = lime_app_Preloader.loaders.get(url1);
			var future = loader2.load(url1 + "?" + cacheVersion);
			future.onComplete($bind(this,this.loader_onComplete));
		}
		if(this.total == 0) this.start();
	}
	,loadFont: function(font) {
		var _g = this;
		if(window.document.fonts && ($_=window.document.fonts,$bind($_,$_.load))) window.document.fonts.load("1em '" + font + "'").then(function(_) {
			_g.loaded++;
			_g.onProgress.dispatch(_g.loaded,_g.total);
			if(_g.loaded == _g.total) _g.start();
		}); else {
			var node = window.document.createElement("span");
			node.innerHTML = "giItT1WQy@!-/#";
			var style = node.style;
			style.position = "absolute";
			style.left = "-10000px";
			style.top = "-10000px";
			style.fontSize = "300px";
			style.fontFamily = "sans-serif";
			style.fontVariant = "normal";
			style.fontStyle = "normal";
			style.fontWeight = "normal";
			style.letterSpacing = "0";
			window.document.body.appendChild(node);
			var width = node.offsetWidth;
			style.fontFamily = "'" + font + "', sans-serif";
			var interval = null;
			var found = false;
			var checkFont = function() {
				if(node.offsetWidth != width) {
					if(!found) {
						found = true;
						return false;
					}
					_g.loaded++;
					if(interval != null) window.clearInterval(interval);
					node.parentNode.removeChild(node);
					node = null;
					_g.onProgress.dispatch(_g.loaded,_g.total);
					if(_g.loaded == _g.total) _g.start();
					return true;
				}
				return false;
			};
			if(!checkFont()) interval = window.setInterval(checkFont,50);
		}
	}
	,start: function() {
		this.complete = true;
		this.onComplete.dispatch();
	}
	,update: function(loaded,total) {
	}
	,image_onLoad: function(_) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,loader_onComplete: function(_) {
		this.loaded++;
		this.onProgress.dispatch(this.loaded,this.total);
		if(this.loaded == this.total) this.start();
	}
	,__class__: lime_app_Preloader
};
var lime_app_Promise = function() {
	this.future = new lime_app_Future();
};
lime_app_Promise.__name__ = true;
lime_app_Promise.prototype = {
	complete: function(data) {
		if(!this.future.__errored) {
			this.future.__completed = true;
			this.future.value = data;
			if(this.future.__completeListeners != null) {
				var _g = 0;
				var _g1 = this.future.__completeListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(data);
				}
				this.future.__completeListeners = null;
			}
		}
		return this;
	}
	,completeWith: function(future) {
		future.onComplete($bind(this,this.complete));
		future.onError($bind(this,this.error));
		future.onProgress($bind(this,this.progress));
		return this;
	}
	,error: function(msg) {
		if(!this.future.__completed) {
			this.future.__errored = true;
			this.future.__errorMessage = msg;
			if(this.future.__errorListeners != null) {
				var _g = 0;
				var _g1 = this.future.__errorListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(msg);
				}
				this.future.__errorListeners = null;
			}
		}
		return this;
	}
	,progress: function(progress) {
		if(!this.future.__errored && !this.future.__completed) {
			if(this.future.__progressListeners != null) {
				var _g = 0;
				var _g1 = this.future.__progressListeners;
				while(_g < _g1.length) {
					var listener = _g1[_g];
					++_g;
					listener(progress);
				}
			}
		}
		return this;
	}
	,__class__: lime_app_Promise
};
var lime_audio_ALAudioContext = function() { };
lime_audio_ALAudioContext.__name__ = true;
var lime_audio_ALCAudioContext = function() { };
lime_audio_ALCAudioContext.__name__ = true;
var lime_audio_AudioBuffer = function() { };
lime_audio_AudioBuffer.__name__ = true;
var lime_audio_AudioContext = { __ename__ : true, __constructs__ : ["OPENAL","HTML5","WEB","FLASH","CUSTOM"] };
lime_audio_AudioContext.OPENAL = function(alc,al) { var $x = ["OPENAL",0,alc,al]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.HTML5 = function(context) { var $x = ["HTML5",1,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.WEB = function(context) { var $x = ["WEB",2,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.FLASH = function(context) { var $x = ["FLASH",3,context]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
lime_audio_AudioContext.CUSTOM = function(data) { var $x = ["CUSTOM",4,data]; $x.__enum__ = lime_audio_AudioContext; $x.toString = $estr; return $x; };
var lime_audio_AudioManager = function() { };
lime_audio_AudioManager.__name__ = true;
lime_audio_AudioManager.init = function(context) {
	if(lime_audio_AudioManager.context == null) {
		if(context == null) try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;;
			lime_audio_AudioManager.context = lime_audio_AudioContext.WEB(new AudioContext ());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			lime_audio_AudioManager.context = lime_audio_AudioContext.HTML5(new lime_audio_HTML5AudioContext());
		} else lime_audio_AudioManager.context = context;
	}
};
var lime_audio_FlashAudioContext = function() { };
lime_audio_FlashAudioContext.__name__ = true;
var lime_audio_HTML5AudioContext = function() {
};
lime_audio_HTML5AudioContext.__name__ = true;
lime_audio_HTML5AudioContext.prototype = {
	__class__: lime_audio_HTML5AudioContext
};
var lime_graphics_ConsoleRenderContext = function() { };
lime_graphics_ConsoleRenderContext.__name__ = true;
lime_graphics_ConsoleRenderContext.prototype = {
	__class__: lime_graphics_ConsoleRenderContext
};
var lime_graphics_FlashRenderContext = function() { };
lime_graphics_FlashRenderContext.__name__ = true;
var lime_graphics_Image = function() { };
lime_graphics_Image.__name__ = true;
lime_graphics_Image.prototype = {
	__class__: lime_graphics_Image
};
var lime_graphics_RenderContext = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM","NONE"] };
lime_graphics_RenderContext.OPENGL = function(gl) { var $x = ["OPENGL",0,gl]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CANVAS = function(context) { var $x = ["CANVAS",1,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.DOM = function(element) { var $x = ["DOM",2,element]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.FLASH = function(stage) { var $x = ["FLASH",3,stage]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CAIRO = function(cairo) { var $x = ["CAIRO",4,cairo]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CONSOLE = function(context) { var $x = ["CONSOLE",5,context]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.CUSTOM = function(data) { var $x = ["CUSTOM",6,data]; $x.__enum__ = lime_graphics_RenderContext; $x.toString = $estr; return $x; };
lime_graphics_RenderContext.NONE = ["NONE",7];
lime_graphics_RenderContext.NONE.toString = $estr;
lime_graphics_RenderContext.NONE.__enum__ = lime_graphics_RenderContext;
var lime_graphics_Renderer = function(window) {
	this.onRender = new lime_app_Event_$Void_$Void();
	this.onContextRestored = new lime_app_Event_$lime_$graphics_$RenderContext_$Void();
	this.onContextLost = new lime_app_Event_$Void_$Void();
	this.window = window;
	this.backend = new lime__$backend_html5_HTML5Renderer(this);
	this.window.renderer = this;
};
lime_graphics_Renderer.__name__ = true;
lime_graphics_Renderer.prototype = {
	create: function() {
		this.backend.create();
	}
	,flip: function() {
		this.backend.flip();
	}
	,__class__: lime_graphics_Renderer
};
var lime_graphics_RendererType = { __ename__ : true, __constructs__ : ["OPENGL","CANVAS","DOM","FLASH","CAIRO","CONSOLE","CUSTOM"] };
lime_graphics_RendererType.OPENGL = ["OPENGL",0];
lime_graphics_RendererType.OPENGL.toString = $estr;
lime_graphics_RendererType.OPENGL.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CANVAS = ["CANVAS",1];
lime_graphics_RendererType.CANVAS.toString = $estr;
lime_graphics_RendererType.CANVAS.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.DOM = ["DOM",2];
lime_graphics_RendererType.DOM.toString = $estr;
lime_graphics_RendererType.DOM.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.FLASH = ["FLASH",3];
lime_graphics_RendererType.FLASH.toString = $estr;
lime_graphics_RendererType.FLASH.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CAIRO = ["CAIRO",4];
lime_graphics_RendererType.CAIRO.toString = $estr;
lime_graphics_RendererType.CAIRO.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CONSOLE = ["CONSOLE",5];
lime_graphics_RendererType.CONSOLE.toString = $estr;
lime_graphics_RendererType.CONSOLE.__enum__ = lime_graphics_RendererType;
lime_graphics_RendererType.CUSTOM = ["CUSTOM",6];
lime_graphics_RendererType.CUSTOM.toString = $estr;
lime_graphics_RendererType.CUSTOM.__enum__ = lime_graphics_RendererType;
var lime_graphics_cairo_Cairo = function() { };
lime_graphics_cairo_Cairo.__name__ = true;
lime_graphics_cairo_Cairo.prototype = {
	__class__: lime_graphics_cairo_Cairo
};
var lime_graphics_opengl_GL = function() { };
lime_graphics_opengl_GL.__name__ = true;
lime_graphics_opengl_GL.bufferData = function(target,data,usage) {
	lime_graphics_opengl_GL.context.bufferData(target,data,usage);
};
var lime_math_Matrix3 = function() { };
lime_math_Matrix3.__name__ = true;
var lime_math_Vector2 = function() { };
lime_math_Vector2.__name__ = true;
var lime_math_Vector4 = function() { };
lime_math_Vector4.__name__ = true;
var lime_net_HTTPRequest = function() {
	this.promise = new lime_app_Promise();
};
lime_net_HTTPRequest.__name__ = true;
lime_net_HTTPRequest.prototype = {
	load: function(url) {
		var _g = this;
		this.bytesLoaded = 0;
		this.bytesTotal = 0;
		var request = new XMLHttpRequest();
		request.addEventListener("progress",$bind(this,this.request_onProgress),false);
		request.onreadystatechange = function() {
			if(request.readyState != 4) return;
			if(request.status != null && request.status >= 200 && request.status <= 400) {
				_g.bytes = lime_utils_Bytes.ofData(request.response);
				_g.promise.complete(_g.bytes);
			} else _g.promise.error(request.status);
		};
		request.open("GET",url,true);
		request.responseType = "arraybuffer";
		request.send("");
		return this.promise.future;
	}
	,request_onProgress: function(event) {
		this.promise.progress(event.loaded / event.total);
	}
	,__class__: lime_net_HTTPRequest
};
var lime_system_System = function() { };
lime_system_System.__name__ = true;
lime_system_System.embed = $hx_exports.lime.embed = function(element,width,height,background,assetsPrefix) {
	var htmlElement = null;
	if(typeof(element) == "string") htmlElement = window.document.getElementById(js_Boot.__cast(element , String)); else if(element == null) htmlElement = window.document.createElement("div"); else htmlElement = element;
	var color = null;
	if(background != null && background != "") {
		background = StringTools.replace(background,"#","");
		if(background.indexOf("0x") > -1) color = Std.parseInt(background); else color = Std.parseInt("0x" + background);
	}
	if(width == null) width = 0;
	if(height == null) height = 0;
	ApplicationMain.config.windows[0].background = color;
	ApplicationMain.config.windows[0].element = htmlElement;
	ApplicationMain.config.windows[0].width = width;
	ApplicationMain.config.windows[0].height = height;
	ApplicationMain.config.assetsPrefix = assetsPrefix;
	ApplicationMain.create();
};
var lime_system_ThreadPool = function(minThreads,maxThreads) {
	if(maxThreads == null) maxThreads = 1;
	if(minThreads == null) minThreads = 0;
	this.onError = new lime_app_Event_$Dynamic_$Void();
	this.onComplete = new lime_app_Event_$Dynamic_$Void();
	this.doWork = new lime_app_Event_$Dynamic_$Void();
	this.minThreads = minThreads;
	this.maxThreads = maxThreads;
	this.currentThreads = 0;
};
lime_system_ThreadPool.__name__ = true;
lime_system_ThreadPool.prototype = {
	queue: function(state) {
		this.doWork.dispatch(state);
	}
	,sendComplete: function(state) {
		this.onComplete.dispatch(state);
	}
	,sendError: function(state) {
		this.onError.dispatch(state);
	}
	,__class__: lime_system_ThreadPool
};
var lime_ui_Gamepad = function(id) {
	this.onDisconnect = new lime_app_Event_$Void_$Void();
	this.onButtonUp = new lime_app_Event_$lime_$ui_$GamepadButton_$Void();
	this.onButtonDown = new lime_app_Event_$lime_$ui_$GamepadButton_$Void();
	this.onAxisMove = new lime_app_Event_$lime_$ui_$GamepadAxis_$Float_$Void();
	this.id = id;
	this.connected = true;
};
lime_ui_Gamepad.__name__ = true;
lime_ui_Gamepad.__connect = function(id) {
	if(!lime_ui_Gamepad.devices.h.hasOwnProperty(id)) {
		var gamepad = new lime_ui_Gamepad(id);
		lime_ui_Gamepad.devices.h[id] = gamepad;
		lime_ui_Gamepad.onConnect.dispatch(gamepad);
	}
};
lime_ui_Gamepad.__disconnect = function(id) {
	var gamepad = lime_ui_Gamepad.devices.h[id];
	if(gamepad != null) gamepad.connected = false;
	lime_ui_Gamepad.devices.remove(id);
	if(gamepad != null) gamepad.onDisconnect.dispatch();
};
lime_ui_Gamepad.prototype = {
	__class__: lime_ui_Gamepad
};
var lime_ui_Joystick = function(id) {
	this.onTrackballMove = new lime_app_Event_$Int_$Float_$Void();
	this.onHatMove = new lime_app_Event_$Int_$lime_$ui_$JoystickHatPosition_$Void();
	this.onDisconnect = new lime_app_Event_$Void_$Void();
	this.onButtonUp = new lime_app_Event_$Int_$Void();
	this.onButtonDown = new lime_app_Event_$Int_$Void();
	this.onAxisMove = new lime_app_Event_$Int_$Float_$Void();
	this.id = id;
	this.connected = true;
};
lime_ui_Joystick.__name__ = true;
lime_ui_Joystick.__connect = function(id) {
	if(!lime_ui_Joystick.devices.h.hasOwnProperty(id)) {
		var joystick = new lime_ui_Joystick(id);
		lime_ui_Joystick.devices.h[id] = joystick;
		lime_ui_Joystick.onConnect.dispatch(joystick);
	}
};
lime_ui_Joystick.__disconnect = function(id) {
	var joystick = lime_ui_Joystick.devices.h[id];
	if(joystick != null) joystick.connected = false;
	lime_ui_Joystick.devices.remove(id);
	if(joystick != null) joystick.onDisconnect.dispatch();
};
lime_ui_Joystick.__getDeviceData = function() {
	if(navigator.getGamepads) return navigator.getGamepads(); else if(navigator.webkitGetGamepads) return navigator.webkitGetGamepads(); else return null;
};
lime_ui_Joystick.prototype = {
	__class__: lime_ui_Joystick
};
var lime_ui_Touch = function(x,y,id,dx,dy,pressure,device) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.dx = dx;
	this.dy = dy;
	this.pressure = pressure;
	this.device = device;
};
lime_ui_Touch.__name__ = true;
lime_ui_Touch.prototype = {
	__class__: lime_ui_Touch
};
var lime_ui_Window = function(config) {
	this.onTextInput = new lime_app_Event_$String_$Void();
	this.onTextEdit = new lime_app_Event_$String_$Int_$Int_$Void();
	this.onRestore = new lime_app_Event_$Void_$Void();
	this.onResize = new lime_app_Event_$Int_$Int_$Void();
	this.onMove = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseWheel = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseUp = new lime_app_Event_$Float_$Float_$Int_$Void();
	this.onMouseMoveRelative = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseMove = new lime_app_Event_$Float_$Float_$Void();
	this.onMouseDown = new lime_app_Event_$Float_$Float_$Int_$Void();
	this.onMinimize = new lime_app_Event_$Void_$Void();
	this.onLeave = new lime_app_Event_$Void_$Void();
	this.onKeyUp = new lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void();
	this.onKeyDown = new lime_app_Event_$lime_$ui_$KeyCode_$lime_$ui_$KeyModifier_$Void();
	this.onFullscreen = new lime_app_Event_$Void_$Void();
	this.onFocusOut = new lime_app_Event_$Void_$Void();
	this.onFocusIn = new lime_app_Event_$Void_$Void();
	this.onEnter = new lime_app_Event_$Void_$Void();
	this.onDropFile = new lime_app_Event_$String_$Void();
	this.onDeactivate = new lime_app_Event_$Void_$Void();
	this.onCreate = new lime_app_Event_$Void_$Void();
	this.onClose = new lime_app_Event_$Void_$Void();
	this.onActivate = new lime_app_Event_$Void_$Void();
	this.config = config;
	this.__width = 0;
	this.__height = 0;
	this.__fullscreen = false;
	this.__scale = 1;
	this.__x = 0;
	this.__y = 0;
	this.__title = "";
	this.id = -1;
	if(config != null) {
		if(Object.prototype.hasOwnProperty.call(config,"width")) this.__width = config.width;
		if(Object.prototype.hasOwnProperty.call(config,"height")) this.__height = config.height;
		if(Object.prototype.hasOwnProperty.call(config,"x")) this.__x = config.x;
		if(Object.prototype.hasOwnProperty.call(config,"y")) this.__y = config.y;
		if(Object.prototype.hasOwnProperty.call(config,"fullscreen")) this.__fullscreen = config.fullscreen;
		if(Object.prototype.hasOwnProperty.call(config,"borderless")) this.__borderless = config.borderless;
		if(Object.prototype.hasOwnProperty.call(config,"resizable")) this.__resizable = config.resizable;
		if(Object.prototype.hasOwnProperty.call(config,"title")) this.__title = config.title;
	}
	this.backend = new lime__$backend_html5_HTML5Window(this);
};
lime_ui_Window.__name__ = true;
lime_ui_Window.prototype = {
	close: function() {
		this.backend.close();
	}
	,create: function(application) {
		this.application = application;
		this.backend.create(application);
		if(this.renderer != null) this.renderer.create();
	}
	,resize: function(width,height) {
		this.backend.resize(width,height);
		this.__width = width;
		this.__height = height;
	}
	,set_fullscreen: function(value) {
		return this.__fullscreen = this.backend.setFullscreen(value);
	}
	,set_height: function(value) {
		this.resize(this.__width,value);
		return this.__height;
	}
	,set_width: function(value) {
		this.resize(value,this.__height);
		return this.__width;
	}
	,__class__: lime_ui_Window
};
var lime_utils_Bytes = function(length,bytesData) {
	haxe_io_Bytes.call(this,bytesData);
};
lime_utils_Bytes.__name__ = true;
lime_utils_Bytes.ofData = function(b) {
	var bytes = haxe_io_Bytes.ofData(b);
	return new lime_utils_Bytes(bytes.length,bytes.b.bufferValue);
};
lime_utils_Bytes.__super__ = haxe_io_Bytes;
lime_utils_Bytes.prototype = $extend(haxe_io_Bytes.prototype,{
	__class__: lime_utils_Bytes
});
var lime_utils_GLUtils = function() { };
lime_utils_GLUtils.__name__ = true;
lime_utils_GLUtils.compileShader = function(source,type) {
	var shader = lime_graphics_opengl_GL.context.createShader(type);
	lime_graphics_opengl_GL.context.shaderSource(shader,source);
	lime_graphics_opengl_GL.context.compileShader(shader);
	if(lime_graphics_opengl_GL.context.getShaderParameter(shader,35713) == 0) switch(type) {
	case 35633:
		throw new js__$Boot_HaxeError("Error compiling vertex shader");
		break;
	case 35632:
		throw new js__$Boot_HaxeError("Error compiling fragment shader");
		break;
	default:
		throw new js__$Boot_HaxeError("Error compiling unknown shader type");
	}
	return shader;
};
lime_utils_GLUtils.createProgram = function(vertexSource,fragmentSource) {
	var vertexShader = lime_utils_GLUtils.compileShader(vertexSource,35633);
	var fragmentShader = lime_utils_GLUtils.compileShader(fragmentSource,35632);
	var program = lime_graphics_opengl_GL.context.createProgram();
	lime_graphics_opengl_GL.context.attachShader(program,vertexShader);
	lime_graphics_opengl_GL.context.attachShader(program,fragmentShader);
	lime_graphics_opengl_GL.context.linkProgram(program);
	if(lime_graphics_opengl_GL.context.getProgramParameter(program,35714) == 0) throw new js__$Boot_HaxeError("Unable to initialize the shader program.");
	return program;
};
var samples_Sample = function() {
	this.zoom = 1;
	this.yOffset = 0;
	this.xOffset = 0;
	this.mouse_y = 0;
	this.mouse_x = 0;
	lime_app_Application.call(this);
};
samples_Sample.__name__ = true;
samples_Sample.__super__ = lime_app_Application;
samples_Sample.prototype = $extend(lime_app_Application.prototype,{
	onWindowCreate: function(window) {
		{
			var _g = window.renderer.context;
			switch(_g[1]) {
			case 0:
				var gl = _g[2];
				this.width = window.__width;
				this.height = window.__height;
				break;
			default:
				haxe_Log.trace("only opengl supported",{ fileName : "Sample.hx", lineNumber : 42, className : "samples.Sample", methodName : "onWindowCreate"});
			}
		}
	}
	,run: function() {
	}
	,render: function(renderer) {
		this.peoteView.render(haxe_Timer.stamp() - this.startTime,this.width,this.height,this.mouse_x,this.mouse_y,this.zoom,this.xOffset,this.yOffset);
	}
	,onWindowResize: function(window,width,height) {
		haxe_Log.trace("onWindowResize:" + window.__width + "," + window.__height,{ fileName : "Sample.hx", lineNumber : 76, className : "samples.Sample", methodName : "onWindowResize"});
		this.width = window.__width;
		this.height = window.__height;
	}
	,onMouseMove: function(window,x,y) {
		this.mouse_x = x | 0;
		this.mouse_y = y | 0;
		this.setOffsets();
	}
	,onTouchMove: function(touch) {
		haxe_Log.trace("onTouchMove: " + touch.x + "," + touch.y,{ fileName : "Sample.hx", lineNumber : 91, className : "samples.Sample", methodName : "onTouchMove"});
		this.mouse_x = touch.x | 0;
		this.mouse_y = touch.y | 0;
		this.setOffsets();
	}
	,onMouseDown: function(window,x,y,button) {
		haxe_Log.trace("onMouseDown: x=" + x + " y=" + y,{ fileName : "Sample.hx", lineNumber : 99, className : "samples.Sample", methodName : "onMouseDown"});
		if(button == 0) this.zoom++; else if(button == 1 && this.zoom > 1) this.zoom--;
		this.setOffsets();
	}
	,onMouseUp: function(window,x,y,button) {
		haxe_Log.trace("onmouseup: " + button + " x=" + x + " y=" + y,{ fileName : "Sample.hx", lineNumber : 107, className : "samples.Sample", methodName : "onMouseUp"});
	}
	,onMouseWheel: function(window,deltaX,deltaY) {
		haxe_Log.trace("onmousewheel: " + deltaX + "," + deltaY,{ fileName : "Sample.hx", lineNumber : 112, className : "samples.Sample", methodName : "onMouseWheel"});
		if(deltaY > 0) this.zoom++; else if(this.zoom > 1) this.zoom--;
		this.setOffsets();
	}
	,onRenderContextLost: function(renderer) {
		haxe_Log.trace(" --------- ERROR :  LOST RENDERCONTEXT ----------- ",{ fileName : "Sample.hx", lineNumber : 120, className : "samples.Sample", methodName : "onRenderContextLost"});
	}
	,onRenderContextRestored: function(renderer,context) {
		haxe_Log.trace(" --------- onRenderContextRestored ----------- ",{ fileName : "Sample.hx", lineNumber : 125, className : "samples.Sample", methodName : "onRenderContextRestored"});
	}
	,onPreloadProgress: function(loaded,total) {
		haxe_Log.trace(" --------- onPreloadProgress ----------- ",{ fileName : "Sample.hx", lineNumber : 130, className : "samples.Sample", methodName : "onPreloadProgress"});
	}
	,onPreloadComplete: function() {
		haxe_Log.trace(" --------- onPreload Complete ----------- ",{ fileName : "Sample.hx", lineNumber : 135, className : "samples.Sample", methodName : "onPreloadComplete"});
		this.run();
	}
	,onKeyDown: function(window,keyCode,modifier) {
		switch(keyCode) {
		case 102:
			var e = document.getElementById('content').getElementsByTagName('canvas')[0];
			var noFullscreen = (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement);
			if(noFullscreen) {
				if(e.requestFullScreen) e.requestFullScreen(); else if(e.msRequestFullScreen) e.msRequestFullScreen(); else if(e.mozRequestFullScreen) e.mozRequestFullScreen(); else if(e.webkitRequestFullScreen) e.webkitRequestFullScreen();
			} else {
				var d = document;
				if(d.exitFullscreen) d.exitFullscreen(); else if(d.msExitFullscreen) d.msExitFullscreen(); else if(d.mozCancelFullScreen) d.mozCancelFullScreen(); else if(d.webkitExitFullscreen) d.webkitExitFullscreen();
			}
			break;
		default:
		}
	}
	,setOffsets: function() {
		this.xOffset = -this.width * (this.zoom - 1) / this.zoom * this.mouse_x / this.width | 0;
		this.yOffset = -this.height * (this.zoom - 1) / this.zoom * this.mouse_y / this.height | 0;
	}
	,__class__: samples_Sample
});
var samples_GlyphUnicodeTextRendering = function() {
	this.element_nr = 0;
	samples_Sample.call(this);
};
samples_GlyphUnicodeTextRendering.__name__ = true;
samples_GlyphUnicodeTextRendering.__super__ = samples_Sample;
samples_GlyphUnicodeTextRendering.prototype = $extend(samples_Sample.prototype,{
	run: function() {
		var _g = this;
		this.startTime = haxe_Timer.stamp();
		this.peoteView = new de_peote_view_PeoteView({ maxDisplaylists : 10, maxPrograms : 10, maxTextures : 10, maxImages : 10});
		this.peoteView.setTexture({ texture : 0, w : 2048, h : 1994});
		this.peoteView.imageCache.setImage({ image : 0, texture : 0, filename : "assets/unifont/unifont_0000.png", preload : true});
		this.peoteView.setProgram({ program : 0, texture : 0, fshader : "assets/gl3font.frag"});
		this.peoteView.setDisplaylist({ displaylist : 0, type : 25, maxElements : 10000, maxPrograms : 1, bufferSegments : 1, x : 0, y : 0, renderBackground : true, r : 0.2, g : 0, b : 0, blend : 1});
		var fontinfo = new samples_FontInfo("assets/unifont/unifont_0000.dat",function(info) {
			haxe_Log.trace("Loaded Fontdata complete",{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 114, className : "samples.GlyphUnicodeTextRendering", methodName : "run"});
			var ts = 2048;
			_g.renderTextLine("PeoteView glyph textrendering with ttfcompiled Unifont",info,18,0,20,ts,ts);
			_g.renderTextLine("--------------------------------------------------------------------",info,18,20,16,ts,ts);
			var i = 0;
			var l = 40;
			var s = "";
			var $it0 = info.idmap.iterator();
			while( $it0.hasNext() ) {
				var $char = $it0.next();
				s += String.fromCharCode($char);
				i++;
				if(i > 100) {
					_g.renderTextLine(s,info,20,l,30,ts,ts);
					i = 0;
					s = "";
					l += 32;
				}
			}
		});
	}
	,renderTextLine: function(s,info,x,y,scale,texturewidth,textureheight) {
		var _g = this;
		var first = true;
		var penX = x;
		var penY = y + Math.ceil(scale);
		var prev_id = 0;
		var scale1 = scale;
		haxe_Utf8.iter(s,function(charcode) {
			var t = haxe_Timer.stamp() - _g.startTime;
			var id = info.idmap.h[charcode];
			if(id != null) {
				if(!first) penX += Math.ceil(info.kerning[prev_id][id] * scale1); else first = false;
				prev_id = id;
				var w = info.metrics[id].width * scale1;
				var h = info.metrics[id].height * scale1;
				var tx = info.metrics[id].u * texturewidth;
				var ty = info.metrics[id].v * textureheight;
				var tw = info.metrics[id].w * texturewidth;
				var th = info.metrics[id].h * textureheight;
				haxe_Log.trace(charcode,{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 164, className : "samples.GlyphUnicodeTextRendering", methodName : "renderTextLine", customParams : ["h:" + info.metrics[id].height,"t:" + info.metrics[id].top]});
				var startx = Math.floor(Math.random() * 2000) - 800;
				var starty = Math.floor(Math.random() * 1000) - 400;
				_g.peoteView.setElement({ element : _g.element_nr++, x : startx, y : starty, w : Math.ceil(w * 4), h : Math.ceil(h * 4), rgba : Math.floor(Math.random() * 256) << 24 | Math.floor(Math.random() * 256) << 16 | Math.floor(Math.random() * 256) << 8 | 128 + Math.floor(Math.random() * 128), rotation : 2000 - Math.floor(Math.random() * 4000), pivotX : Math.ceil(w * 2), pivotY : Math.ceil(h * 2), time : t, end : { x : penX + Math.floor(info.metrics[id].left * scale1), y : penY + Math.floor((info.height - info.metrics[id].top) * scale1), w : Math.ceil(w), h : Math.ceil(h), rgba : -16968961, rotation : 0, pivotX : Math.ceil(w / 2), pivotY : Math.ceil(h / 2), time : t + 1 + (startx + starty) / 2000}, program : 0, tx : Math.round(tx) - 1, ty : Math.round(ty) - 1, tw : Math.round(tw) + 1, th : Math.round(th) + 1, image : 0});
				penX += Math.ceil(info.metrics[id].advance * scale1);
			}
		});
	}
	,__class__: samples_GlyphUnicodeTextRendering
});
var samples_FontInfo = function(file,onload) {
	var _g = this;
	var future = lime_Assets.loadBytes(file);
	future.onProgress(function(progress) {
		haxe_Log.trace("Loading Fontdata Progress: " + progress,{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 221, className : "samples.FontInfo", methodName : "new"});
	});
	future.onError(function(msg) {
		haxe_Log.trace("Loading Fontdata Error: " + msg,{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 222, className : "samples.FontInfo", methodName : "new"});
	});
	future.onComplete(function(f) {
		var pos = 0;
		var N = f.getInt32(pos);
		pos += 4;
		haxe_Log.trace("number of glyphes: " + N,{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 227, className : "samples.FontInfo", methodName : "new"});
		_g.height = f.getFloat(pos);
		pos += 4;
		haxe_Log.trace("height: " + _g.height,{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 228, className : "samples.FontInfo", methodName : "new"});
		_g.ascender = f.getFloat(pos);
		pos += 4;
		haxe_Log.trace("ascender: " + _g.ascender,{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 229, className : "samples.FontInfo", methodName : "new"});
		_g.descender = f.getFloat(pos);
		pos += 4;
		haxe_Log.trace("descender: " + _g.descender,{ fileName : "GlyphUnicodeTextRendering.hx", lineNumber : 230, className : "samples.FontInfo", methodName : "new"});
		_g.idmap = new haxe_ds_IntMap();
		var _g1 = [];
		var _g2 = 0;
		while(_g2 < N) {
			var i = _g2++;
			_g1.push((function($this) {
				var $r;
				{
					var key = f.getInt32(pos);
					_g.idmap.h[key] = i;
				}
				pos += 4;
				var m = { advance : f.getFloat(pos), left : f.getFloat(pos + 4), top : f.getFloat(pos + 8), width : f.getFloat(pos + 12), height : f.getFloat(pos + 16), u : f.getFloat(pos + 20), v : f.getFloat(pos + 24), w : f.getFloat(pos + 28), h : f.getFloat(pos + 32)};
				pos += 36;
				$r = m;
				return $r;
			}(this)));
		}
		_g.metrics = _g1;
		var y = 0;
		var x = 0;
		var kern = [];
		_g.kerning = [kern];
		while(x < N && y < N) {
			var k = f.getFloat(pos);
			pos += 4;
			var amount = f.getInt32(pos);
			pos += 4;
			var _g21 = 0;
			while(_g21 < amount) {
				var i1 = _g21++;
				kern[x++] = k;
				if(x == N) {
					x = 0;
					_g.kerning.push(kern = []);
					y++;
				}
			}
		}
		onload(_g);
	});
};
samples_FontInfo.__name__ = true;
samples_FontInfo.prototype = {
	__class__: samples_FontInfo
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
de_peote_view_ActiveTextures.slot = [33984,33985,33986,33987,33988,33989,33990,33991];
de_peote_view_Buffer.VERTEX_COUNT = 6;
de_peote_view_PeoteView.elementDefaults = { displaylist : 0, program : null, image : null, tile : null, x : 0, y : 0, w : 100, h : 100, z : 0, rgba : -1, rotation : 0, pivotX : 0, pivotY : 0};
de_peote_view_Program.uTEXTURE = [5,6,7,8,9,10,11,12];
de_peote_view_Program.rComment = new EReg("//.*?$","gm");
de_peote_view_Program.rNewline = new EReg("\r?\n","g");
de_peote_view_Program.rSpaces = new EReg("\t\t+","g");
de_peote_view_Program.rZINDEXstart = new EReg("#else_ZINDEX(.*?)#end_ZINDEX","ig");
de_peote_view_Program.rZINDEXend = new EReg("#if_ZINDEX(.*?)#end_ZINDEX","ig");
de_peote_view_Program.rRGBAstart = new EReg("#else_RGBA(.*?)#end_RGBA","ig");
de_peote_view_Program.rRGBAend = new EReg("#if_RGBA(.*?)#end_RGBA","ig");
de_peote_view_Program.rROTATIONstart = new EReg("#else_ROTATION(.*?)#end_ROTATION","ig");
de_peote_view_Program.rROTATIONend = new EReg("#if_ROTATION(.*?)#end_ROTATION","ig");
de_peote_view_Program.rPICKINGstart = new EReg("#else_PICKING(.*?)#end_PICKING","ig");
de_peote_view_Program.rPICKINGend = new EReg("#if_PICKING(.*?)#end_PICKING","ig");
de_peote_view_Program.rMAX_TEXTURE0 = new EReg("#MAX_TEXTURE0","g");
de_peote_view_Program.rTEXTURE0start = new EReg("#else_TEXTURE0(.*?)#end_TEXTURE0","ig");
de_peote_view_Program.rTEXTURE0end = new EReg("#if_TEXTURE0(.*?)#end_TEXTURE0","ig");
de_peote_view_Program.rMAX_TEXTURE1 = new EReg("#MAX_TEXTURE1","g");
de_peote_view_Program.rTEXTURE1start = new EReg("#else_TEXTURE1(.*?)#end_TEXTURE1","ig");
de_peote_view_Program.rTEXTURE1end = new EReg("#if_TEXTURE1(.*?)#end_TEXTURE1","ig");
de_peote_view_element_ElementAnimBuffer.VERTEX_COUNT = 6;
de_peote_view_element_ElementAnimBuffer.defaultVertexShaderSrc = "\tattribute vec4 aPosition;\r\n\t\t\r\n\t\t#if_ZINDEX\r\n\t\tattribute float aZindex;\r\n\t\t#end_ZINDEX\r\n\t\t\r\n\t\t#if_RGBA\r\n\t\tattribute vec4 aRGBA;\r\n\t\tattribute vec4 aRGBA_END;\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_ROTATION\r\n\t\tattribute vec2 aRotation;\r\n\t\tattribute vec4 aPivot;\r\n\t\t#end_ROTATION\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tattribute vec4 aElement;\r\n\t\t\t#if_RGBA\r\n\t\t\t#else_RGBA\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_RGBA\r\n\t\t#end_PICKING\r\n\t\t\t\r\n\t\tattribute vec2 aTime;\r\n\t\t\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\t#if_RGBA\r\n\t\t\tvRGBA = aRGBA.wzyx + (aRGBA_END.wzyx - aRGBA.wzyx) * max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0));\t\r\n\t\t\t#end_RGBA\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) {\r\n\t\t\t\tvRGBA = aElement;\r\n\t\t\t}\r\n\t\t\t#end_PICKING\r\n\t\t\t\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\r\n\t\t\tvec2 VertexPosStart = vec2 ( aPosition ); //vec2 (aPosition.x, aPosition.y);\r\n\t\t\tvec2 VertexPosEnd   = vec2 ( aPosition.z, aPosition.w);\r\n\t\t\t\r\n\t\t\t#if_ROTATION\r\n\t\t\tfloat alpha = aRotation.x + (aRotation.y - aRotation.x)\t* max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0));\r\n\t\t\t\t\t\t\t\t\r\n\t\t\tVertexPosStart = (VertexPosStart - vec2(aPivot))\r\n\t\t\t\t\t\t\t* mat2 (\r\n\t\t\t\t\t\t\t\tvec2(cos(alpha), -sin(alpha)),\r\n\t\t\t\t\t\t\t\tvec2(sin(alpha),  cos(alpha))\r\n\t\t\t\t\t\t\t) + vec2(aPivot);\r\n\t\t\t\r\n\t\t\tVertexPosEnd = (VertexPosEnd -  vec2(aPivot.z, aPivot.w))\r\n\t\t\t\t\t\t\t* mat2 (\r\n\t\t\t\t\t\t\t\tvec2(cos(alpha), -sin(alpha)),\r\n\t\t\t\t\t\t\t\tvec2(sin(alpha),  cos(alpha))\r\n\t\t\t\t\t\t\t) + vec2(aPivot.z, aPivot.w);\r\n\t\t\t#end_ROTATION\r\n\t\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -1.0, 0.0), // TODO\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4( VertexPosStart + floor( \r\n\t\t\t\t\t\t\t\t(VertexPosEnd - VertexPosStart)\r\n\t\t\t\t\t\t\t\t* max( 0.0, min( (uTime-aTime.x) / (aTime.y - aTime.x), 1.0))\r\n\t\t\t\t\t\t\t\t* zoom) / zoom ,\r\n\t\t\t\t#if_ZINDEX\r\n\t\t\t\taZindex\r\n\t\t\t\t#else_ZINDEX\r\n\t\t\t\t0.0\r\n\t\t\t\t#end_ZINDEX\r\n\t\t\t\t, 1.0\r\n\t\t\t)\r\n\t\t\t// rotate displaylist\r\n\t\t\t// *mat4 (\r\n\t\t\t//\tvec4(cos(winkel), -sin(winkel), 0.0, 0.0),\r\n\t\t\t//\tvec4(sin(winkel),  cos(winkel), 0.0, 0.0),\r\n\t\t\t//\tvec4(        0.0,          1.0, 0.0, 0.0),\r\n\t\t\t//\tvec4(        0.0,          0.0, 0.0, 1.0)\r\n\t\t\t//)\r\n\t\t\t;\r\n\t\t}\r\n\t";
de_peote_view_element_ElementAnimBuffer.defaultFragmentShaderSrc = "\tvarying vec2 vTexCoord;\r\n\t\t#if_RGBA\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#else_RGBA\r\n\t\t\t#if_PICKING\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_PICKING\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tuniform vec2 uResolution;\r\n\t\t#end_PICKING\r\n\t\t\r\n\t\t\r\n\t\t#if_TEXTURE0\r\n\t\tuniform sampler2D uTexture0;\r\n\t\t#end_TEXTURE0\r\n\t\t\r\n\t\t#if_TEXTURE1\r\n\t\tuniform sampler2D uTexture1;\r\n\t\t#end_TEXTURE1\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\r\n\t\t\t#if_TEXTURE0\r\n\t\t\tvec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#else_TEXTURE0\r\n\t\t\tvec4 texel = vec4(1.0, 1.0, 1.0, 1.0);\r\n\t\t\t#end_TEXTURE0\r\n\t\t\t\r\n\t\t\t// if use more than one texture unit to combine or do something crazy here:)\r\n\t\t\t#if_TEXTURE1\r\n\t\t\ttexel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#end_TEXTURE1\r\n\t\t\t// ... TEXTURE2 ...TEXTURE3 ...\t\t\t\r\n\t\t\t\r\n\t\t\tif (texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) { \r\n\t\t\t\tgl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\t\t\t\t\r\n\t\t\t}\r\n\t\t\t#else_PICKING\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\r\n\t\t\t#end_PICKING\r\n\t\t}\r\n\t";
de_peote_view_element_ElementSimpleBuffer.VERTEX_COUNT = 6;
de_peote_view_element_ElementSimpleBuffer.defaultVertexShaderSrc = "\tattribute vec2 aPosition;\r\n\t\t\r\n\t\t#if_ZINDEX\r\n\t\tattribute float aZindex;\r\n\t\t#end_ZINDEX\r\n\t\t\r\n\t\t#if_RGBA\r\n\t\tattribute vec4 aRGBA;\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#end_RGBA\r\n\r\n\t\t#if_PICKING\r\n\t\tattribute vec4 aElement;\r\n\t\t\t#if_RGBA\r\n\t\t\t#else_RGBA\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_RGBA\r\n\t\t#end_PICKING\r\n\t\t\t\r\n\t\tattribute vec2 aTexCoord;\r\n\t\t\r\n\t\tvarying vec2 vTexCoord;\r\n\t\t\r\n\t\tuniform float uTime;\r\n\t\tuniform float uZoom;\r\n\t\tuniform vec2 uResolution;\r\n\t\tuniform vec2 uDelta;\r\n\t\t\r\n\t\tvoid main(void) {\r\n\t\t\t#if_RGBA\r\n\t\t\tvRGBA = aRGBA.wzyx;\r\n\t\t\t#end_RGBA\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) {\r\n\t\t\t\tvRGBA = aElement;\r\n\t\t\t}\r\n\t\t\t#end_PICKING\r\n\t\t\t\r\n\t\t\tvTexCoord = aTexCoord;\r\n\t\t\t\t\t\t\r\n\t\t\tfloat zoom = uZoom;\r\n\t\t\tfloat width = uResolution.x;\r\n\t\t\tfloat height = uResolution.y;\r\n\t\t\tfloat deltaX = floor(uDelta.x);\r\n\t\t\tfloat deltaY = floor(uDelta.y);\r\n\t\t\t\r\n\t\t\tfloat right = width-deltaX*zoom;\r\n\t\t\tfloat left = -deltaX*zoom;\r\n\t\t\tfloat bottom = height-deltaY*zoom;\r\n\t\t\tfloat top = -deltaY * zoom;\r\n\t\t\t\r\n\t\t\tgl_Position = mat4 (\r\n\t\t\t\tvec4(2.0 / (right - left)*zoom, 0.0, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 2.0 / (top - bottom)*zoom, 0.0, 0.0),\r\n\t\t\t\tvec4(0.0, 0.0, -1.0, 0.0),\r\n\t\t\t\tvec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), 0.0, 1.0)\r\n\t\t\t)\r\n\t\t\t* vec4 (aPosition ,\r\n\t\t\t\t#if_ZINDEX\r\n\t\t\t\taZindex\r\n\t\t\t\t#else_ZINDEX\r\n\t\t\t\t0.0\r\n\t\t\t\t#end_ZINDEX\r\n\t\t\t\t, 1.0\r\n\t\t\t\t);\r\n\t\t}\r\n\t";
de_peote_view_element_ElementSimpleBuffer.defaultFragmentShaderSrc = "\tvarying vec2 vTexCoord;\r\n\t\t#if_RGBA\r\n\t\tvarying vec4 vRGBA;\r\n\t\t#else_RGBA\r\n\t\t\t#if_PICKING\r\n\t\t\tvarying vec4 vRGBA;\r\n\t\t\t#end_PICKING\r\n\t\t#end_RGBA\r\n\t\t\r\n\t\t#if_PICKING\r\n\t\tuniform vec2 uResolution;\r\n\t\t#end_PICKING\r\n\t\t\r\n\t\t\r\n\t\t#if_TEXTURE0\r\n\t\tuniform sampler2D uTexture0;\r\n\t\t#end_TEXTURE0\r\n\t\t\r\n\t\t#if_TEXTURE1\r\n\t\tuniform sampler2D uTexture1;\r\n\t\t#end_TEXTURE1\r\n\t\t\r\n\t\tvoid main(void)\r\n\t\t{\t\r\n\t\t\t#if_TEXTURE0\r\n\t\t\tvec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#else_TEXTURE0\r\n\t\t\tvec4 texel = vec4(1.0, 1.0, 1.0, 1.0);\r\n\t\t\t#end_TEXTURE0\r\n\t\t\t\r\n\t\t\t// if use more than one texture unit to combine or do something crazy here:)\r\n\t\t\t#if_TEXTURE1\r\n\t\t\ttexel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);\r\n\t\t\t#end_TEXTURE1\r\n\t\t\t// ... TEXTURE2 ...TEXTURE3 ...\r\n\t\t\t\r\n\t\t\tif (texel.a < 0.5) discard; // TODO (z-order/blend mode!!!)\r\n\t\t\t\r\n\t\t\t#if_PICKING\r\n\t\t\tif (uResolution.x == 1.0) { \r\n\t\t\t\tgl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\t\t\t\t\r\n\t\t\t}\r\n\t\t\t#else_PICKING\r\n\t\t\t\t#if_RGBA\r\n\t\t\t\tgl_FragColor = texel * vRGBA;\r\n\t\t\t\t#else_RGBA\r\n\t\t\t\tgl_FragColor = texel;\r\n\t\t\t\t#end_RGBA\r\n\t\t\t#end_PICKING\r\n\t\t}\r\n\t";
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
lime_Assets.cache = new lime_AssetCache();
lime_Assets.libraries = new haxe_ds_StringMap();
lime_Assets.onChange = new lime_app_Event_$Void_$Void();
lime_Assets.initialized = false;
lime__$backend_html5_HTML5Window.windowID = 0;
lime_app_Preloader.images = new haxe_ds_StringMap();
lime_app_Preloader.loaders = new haxe_ds_StringMap();
lime_ui_Gamepad.devices = new haxe_ds_IntMap();
lime_ui_Gamepad.onConnect = new lime_app_Event_$lime_$ui_$Gamepad_$Void();
lime_ui_Joystick.devices = new haxe_ds_IntMap();
lime_ui_Joystick.onConnect = new lime_app_Event_$lime_$ui_$Joystick_$Void();
lime_ui_Touch.onEnd = new lime_app_Event_$lime_$ui_$Touch_$Void();
lime_ui_Touch.onMove = new lime_app_Event_$lime_$ui_$Touch_$Void();
lime_ui_Touch.onStart = new lime_app_Event_$lime_$ui_$Touch_$Void();
ApplicationMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
