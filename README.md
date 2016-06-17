###Peote View - 2D OpenGL Render Library

This library is coded in [Haxe](http://haxe.org) programming language with [Lime](https://github.com/openfl/lime),  
and much use of [flashdevelop](http://www.flashdevelop.org/) tool.

To use with javascript inside webbrowser look [here](https://github.com/maitag/peoteView.js). 

####Build [Samples (^_^)](http://maitag.github.io/peote-view/)

- edit sample and check [peoteView.lime](https://github.com/maitag/peote-view/blob/master/peoteView.lime#L10)  
- build with: `lime build peoteView.lime linux` ( | html5 | windows | android | raspi | rpi | ...)


####Why this lib ?

- simple API to scroll and zoom into massive gfx-2d-tiles
- handle imagedata and procedural shadercode simple and easy
- better sync over network by element-indices (to avoid deep object-serialization)
- transition-rendering by gpu-shader to reduce cpu->gpu datatransfer (more time for game-logic on cpu)
- power of haxe-lime multiplatform code generation ( haxe -> cpp+js+java+.. )


####Todo

- tilesheet-animations
- render to texture
- more simple samples, usability tests, api improvement, optimization
- documentation


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
		
	});
```



You will be able to display "massive" graphic elements and use your own shadercode
for variation, animation or combining Imagedata!

To be near OpenGl - all items are numbered - to speed up rendering.


step by step:

	

#####1) Textures

A Texture reserves space on GPU-Ram for storing many (same sized) Imagedata.

```
	// --------------------- TEXTURE -------------------- //
	
	peoteView.setTexture({   texture: 0,
	
		w:   2048,        // Texture width
		h:   2048,        // Texture height
		
		iw:  512,         // Image-Slot width
		ih:  512,         // Image-Slot height
	}); 
```	
	
Texturesize depends on Hardware (2048 up to 16384), should be a power of 2 and can
be checked throught: peoteView.MAX_TEXTURE_SIZE



#####2) Image-Data

Images holds url- or file-referenz, where imagedata will be "load on demand", so
if some element use an image, it's Data will be load into free Image-Slot of assigned Texture.
```
	// --------------------- IMAGE ----------------------- //
	
	peoteView.setImage({     image: 0,
	
		texture: 0,                   // texture to store image-data inside
		                              // (will be scaled if not fit into texture-slot)
									  
		filename: "assets/font.png",  // image url of filename 
									  
		preload: true                 // load images into texture, no matter of usage 
									  // default behaivor: Image is loaded on first use
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

		// OR - combine multiple textures with shadercode
		// textures:[0,2,1,4]   // max 7 aditional textures available per program-shader
	});
```		
		

		

#####4) Displaylist

rectangular screen-areas to display lots of elements

```
	// ------------------------- DISPLAYLIST -------------- //

	peoteView.setDisplaylist({   displaylist: 0,
		
		type:DisplaylistType.RGBA,  // can be combination of .PICKING  .ANIM   .ROTATION  ...
		
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
		image: 0,
		
		// Position and rectangular Dimensions
		x: 10,	// pixels from left border
		y: 10,	// pixels from top border
		w: 100,	// width
		h: 100,	// height
		z: 0    // z-order   ( 0 <= z <= 32767 )
		
		// (rotation, animation, coloring ...)
	});
```

	

#####How to optimize render-loop:

- order displaylists functionally, like:
	1) game-gfx 
	2) user-interface (DisplaylistType.PICK to interact with Elements)
	
- elements with same program will be drawn fastest (throught opengl drawarray)
- to stream Elements In/Out fast,  use only 1 bufferSegment in Displaylist




