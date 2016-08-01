###Peote View - 2D OpenGL Render Library

This library is written in [Haxe](http://haxe.org) programming language sugar,  
together with power of great [Lime](https://github.com/openfl/lime) multiplatform work.  

To use as simple js-lib (for stupid webbrowsers) look [here](https://github.com/maitag/peoteView.js)!  

####Build [Samples (^_^) <-](http://maitag.github.io/peote-view/)

- check: [peoteView.lime](https://github.com/maitag/peote-view/blob/master/peoteView.lime#L10) to see what will be compiled
- build: `lime build peoteView.lime linux` ( | html5 | windows | android | raspi | rpi | ...)
- start new sample and play around


####Why this tool ?

- handle imagedata and procedural shadercode equal
- power of haxe-lime multiplatform code generation ( haxe -> cpp+js+.+..+... )
- better sync over network by element-indices (to avoid deep object-serialization)
- simplifying opengl-usage (using power of 3d accelerated hardware in other Dimensions;)
- transition-rendering by gpu to reduce datatransfer (more time for game-logic on cpu)


####How to use

```
"Displaylist"  contains much "Element"  
"Element"      is defined by "Program"  
"Program"      "Texture" and Shadercode
"Texture"      acts as image-cache
"Image"        to load into "Texture"-Slot  
```

#####0) Initialize
```
	peoteView = new PeoteView({
		
		maxDisplaylists:    10,
		maxPrograms:        50,
		maxTextures:        50,
		maxImages:         100
		// TODO: onError:    function(errorcode, msg) {}
	});
```



You will be able to display "massive" graphic elements and use your own shadercode
for variation, animation or combining Imagedata!

To be near OpenGl - all items are numbered - to speed up rendering.


step by step:

	

#####1) Textures

A Texture reserves space on GPU-Ram for storing Images into same sized Slots.

```
	// --------------------- TEXTURE -------------------- //
	
	peoteView.setTexture({   texture: 0,
	
		slots: 16,        // How much Images can be saved into ( default is 1 )
		w:     512,       // Slot width
		h:     512,       // Slot height
	});
```	
	
Created Texturesize depends on Hardware (2048 up to 16384) and will be power of 2.
Check peoteView.MAX_TEXTURE_SIZE to see whats possible on your hardware.



#####2) Image-Data

Images holds url- or file-referenz, where imagedata will be "load on demand", so
if some element use an image, it's data will be load into free Image-Slot of assigned Texture.
```
	// --------------------- IMAGE ----------------------- //
	
	peoteView.setImage({     image: 0,
	
		texture: 0,                   // texture to store image-data inside
		                              // (will be scaled if not fit into texture-slot)

		// cache: true,               // TODO: loaded imagedata will be cached (outside texture)
		
		filename: "assets/font.png",  // image filename or url to load image from
									  
		
		preload: true ,               // load images into texture, no matter of usage 
		                              // default behaivor: Image is loaded on first use of element

		
		// to disable automatic insert into free texture-slot:
		
		slot: 0,					  // manual set Texture-Slot to load Image in
                                      // all Images of same Texture should define or not define this parameter
		
		
		// TODO in next milestone:
		
		// Callback Events ------------------------------------------
		onLoad:     function(w,h) {},	  // callback if image is loaded
		onProgress: function(p) {},	      // callback while image loads
		onError:    function(error, msg) {},	  // callback on loading error -> eorror==0 -> no free texture slot
		
		// How image will be fitted and aligned after loading inside texture-slot
		// ----------------------------------------------------------------------
		
		alignX : "center",
		alignY : "top",
		scale  :  true,	   // add "scaleUp:false" to disable upscaling
		fit    : "in",     // "in", "out" ot "exact"
		
		bg: 0xff0022ff;    // background color for border if not exactly fit
		
		// or posit directly inside texture-slot
		x:  10,   	        // Position from left
		y:  10,             // Position from right
		w:100,              // new image width
		h:100,              // new image height

		// together with this to create your own texture-atlas
		overwrite: false   // dont override existing pixels with background-color
		
	});
	
```

		

#####3) Program (GPU-Shader)

opengl-shadercode and textures that can be use

```
	// --------------------- PROGRAM --------------------- //
	
	peoteView.setProgram({   program: 0,
	
		vshader: "assets/lyapunov_01.vert",   // optional, no need of custom shader here,
		fshader: "assets/lyapunov_01.frag",   // if displaying images only
		
		texture: 0,  // all images stored inside this texture can be used

		// alternatively you can combine multiple textures with own shadercode
		// textures:[0,2,1,4]   // max 7 aditional textures available per program-shader
		
	});
```		
		

		

#####4) Displaylist

rectangular screen-areas to display lots of elements

```
	// ------------------------- DISPLAYLIST -------------- //

	peoteView.setDisplaylist({   displaylist: 0,
		
		type:DisplaylistType.RGBA,  // can be combination of .PICKING  .ANIM   .ROTATION...
		
		maxElements:    100,	// maximum elements to display
		maxPrograms:     10,	// maximum different shader-programs
		bufferSegments:  10,	// gpu-buffer segmentation (can be result in better performance for I/O)
		
		x:150,	                // pixels from left border
		y:50,	                // pixels from top border
		w:1000,	                // width
		h:1000,	                // height
		z:0,
		
		renderToTexture: 0, // TODO: texture to render content in
		
		enable: true
	});
```



#####5) Element

little Graphic inside Displaylist-Area (like a c64-sprite)

```
	// ----------------------- ELEMENT --------------------- //
	
	peoteView.setElement({     element: 0,

		displaylist: 0,
		
		program: 0,      // here is texture defined to
		
		// Texture Mapping ---------------
		image: 0,        // image number from texture
		// slot: 0,      // or set texture-slot manual
		                 // without image+slot parameter -> full texturespace
		
		tile:  0,        // (0..255) texture coordinates will be splittet into 16x16 tiles
		
		// tx, ty, -> manual setting texture-coordinates shifting
		// tw ,th  -> manual setting texture-coordinates size
		
		// Position and Size ---------------
		x: 10,	// pixels from left displaylist border
		y: 10,	// pixels from top displaylist border
		w: 100,	// width
		h: 100,	// height
		z: 0    // z-order   ( 0 <= z <= 32767 )
		
		// (rotation, animation, coloring ... -> see samples)
	});
```

	

#####How to optimize render-loop:

- order displaylists functional:
	1) game-gfx 
	2) user-interface (DisplaylistType.PICK to interact with Elements)
	
- elements with same program will be drawn fastest (throught opengl drawarray)
- use only 1 bufferSegment in Displaylist if there is only one program ;)



####Todo

- image alignment inside texture-slot
- render to texture
- more simple samples, usability and platform tests, api improvement, optimization
- tile animation on gpu
- more demos ;)
- documentation



