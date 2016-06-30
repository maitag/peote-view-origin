###Peote View - 2D OpenGL Render Library

This is a [Haxe](http://haxe.org) library with [Lime](https://github.com/openfl/lime) sugar.

-> to use inside "webbrowser" look [here](https://github.com/maitag/peoteView.js). 



####Build [Samples (^_^)](http://maitag.github.io/peote-view/)

- check [peoteView.lime](https://github.com/maitag/peote-view/blob/master/peoteView.lime#L10) to see what will be compiled
- build with: `lime build peoteView.lime linux` ( | html5 | windows | android | raspi | rpi | ...)
- start new sample and play around


####Why this tool ?

- handle imagedata and procedural shadercode equal
- power of haxe-lime multiplatform code generation ( haxe -> cpp+js+java+.. )
- better sync over network by element-indices (to avoid deep object-serialization)
- simplify opengl-usage (using power of 3d accelerated hardware in other Dimensions;)
- transition-rendering by gpu-shader to reduce cpu->gpu datatransfer (more time for game-logic on cpu)


####How to use

PeoteViews is a collection of Displaylists, Programs, Textures and Images.
That Items will be reserved in a "static way" to get best performance.

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
	
		slots: 16,        // How much slots, images can be stored in
		w:  512,          // Slot width
		h:  512,          // Slot height
		
		cache: false,    // images uses free slots automatically
		                 // false:  all images needs defined slot number
	});
```	
	
Created Texturesize depends on Hardware (2048 up to 16384) and will be power of 2.
Check peoteView.MAX_TEXTURE_SIZE to see whats possible on your hardware.



#####2) Image-Data

Images holds url- or file-referenz, where imagedata will be "load on demand", so
if some element use an image, it's Data will be load into free Image-Slot of assigned Texture.
```
	// --------------------- IMAGE ----------------------- //
	
	peoteView.setImage({     image: 0,
	
		texture: 0,                   // texture to store image-data inside
		                              // (will be scaled if not fit into texture-slot)
		
		filename: "assets/font.png",  // image filename or url to load image from
									  
		preload: true ,               // load images into texture, no matter of usage 
									  // default behaivor: Image is loaded on first use

		// TODO: -------------
		onFull:     function() {} ,      // all texture slots full of images
		onLoad:     function(w,h) {},    // image is loaded
		onProgress: function(p) {},	     // while image loads
		onError:    function(msg) {},    // loading error		
	});
	
```

		

#####3) Program (GPU-Shader)

opengl-shadercode and textures that can be use

```
	// --------------------- PROGRAM --------------------- //
	
	peoteView.setProgram({   program: 0,
	
		vshader: "assets/lyapunov_01.vert",   // optional, no need of custom shader here,
		fshader: "assets/lyapunov_01.frag",   // if displaying images only
		
		texture: 0,  // only images stored inside this texture can be used

		// OR - give pixelshader acces to combine multiple textures
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
		
		enable: true
	});
```



#####5) Element

little Graphic inside Displaylist-Area (like a c64-sprite)

```
	// ----------------------- ELEMENT --------------------- //
	
	peoteView.setElement({     element: 0,

		displaylist: 0,
		
		program: 0,
		image: 0,       // image number if program use texture

		// tile:  0,       // 0..255 (texture coordinates will be splittet into 16x16 tiles)
		// tx, ty, -> manual setting texture-coordinates shifting
		// tw ,th  -> manual setting texture-coordinates size
		
		// Position and Size
		x: 10,	// pixels from left displaylist border
		y: 10,	// pixels from top displaylist border
		w: 100,	// width
		h: 100,	// height
		z: 0    // z-order   ( 0 <= z <= 32767 )
		
		// (rotation, animation, coloring ...)
	});
```

	

#####How to optimize render-loop:

- order Displaylists like:
	1) game-gfx 
	2) user-interface (DisplaylistType.PICK to interact with Elements)
	
- Elements with same program will be drawn fastest (throught opengl drawarray)
- to stream Elements In/Out fast,  use only 1 bufferSegment in Displaylist



####Todo

- render to texture
- image alignment inside texture-slot
- more demos
- more image-encodings (for cpp only png per http)
- tile-animations on gpu (for simple walkcyle sprite-demo)
- documentation



