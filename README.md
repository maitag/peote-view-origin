# Peote View - 2D OpenGL Render Library
## old origin version from 2018

**Note**: This is the origin version of peote-view that needs some older haxe (3) and Lime (6) versions to run.  
The new (remastered;) and up to date repository is here -> [peote-view](https://github.com/maitag/peote-view)

---------------

## Installation:
```
haxelib git peote-view-origin https://github.com/maitag/peote-view-origin
```

Please look here for samples -> [peote-view-origin-samples](https://github.com/maitag/peote-view-origin-samples)


## Why this tool ?

- handle imagedata and procedural shadercode equally
- the power of haxe-lime multiplatform code generation ( haxe -> cpp+js+.+..+... )
- better sync over network by element-indices (to avoid deep object-serialization)
- simplifying opengl-usage (using power of 3d accelerated hardware in other Dimensions;)
- transition-rendering by gpu to reduce datatransfer (more time for game-logic on cpu)


## Names to wrapp around opengl

```
"Displaylist"  contains "Element"s
"Element"      use of "Program" / "Image"
"Program"      use of "Texture" / custom shader code
"Texture"      contains "Image"s
"Image"        pixels ;)
```

You will be able to display "massive" graphic elements and use your own shadercode
for variation, animation or combining Imagedata!



## How to use

This API was original designed for easy network-sync, so all items are accessible by an index.  
(could change in future versions!)

### First Steps

```
	peoteView = new PeoteView();

	peoteView.setTexture({
		texture:  0,          // texture index
		slots:   16,          // amount of image-slots
		w:      512,          // slot width
		h:      512           // slot height
	});

	peoteView.setImage({
		image:    0,           // image index
		texture:  0,           // texture to store image-data inside
		filename: "pixel.png"  // image filename or url to load image from
	});

	peoteView.setProgram({
		program:  0,           // program index
		texture:  0            // images stored here can be used by element
	});

	peoteView.setDisplaylist({
		displaylist:   0,      // displaylist index
		maxElements: 100       // maximum elements to display
	});

	peoteView.setElement({
		element:      0,       // element index
		displaylist:  0,       // displaylist to put in
		program:      0,       // shader (+texture) to use
		image:        0        // image number
	});
```


## Parameters in Detail

### 0) Initialize
```
	peoteView = new PeoteView({
		
		maxDisplaylists:    10,
		maxPrograms:        50,
		maxTextures:        50,
		maxImages:         100
		// TODO: onError:    function(errorcode, msg) {}
	});
```
	

### 1) Textures

A Texture reserves space on GPU-Ram for storing Images into same sized Slots.

```
	// --------------------- TEXTURE -------------------- //
	
	peoteView.setTexture({ 

		texture: 0,       // texture index
	
		slots: 16,        // minimum amount of slots to reserve ( default is 1 )

		w:     512,       // slot width
		h:     512,       // slot height
		
		mipmap:true,
		magFilter:1
		minFilter:1
	});
```	
	
Created Texturesize depends on Hardware (2048 up to 16384) and will be power of 2.
Check peoteView.MAX_TEXTURE_SIZE to see whats possible on your hardware.



### 2) Image-Data

Images holds url- or file-referenz, where imagedata will be "load on demand", so
if some element use an image, it's data will be load into free Image-Slot of assigned Texture.
```
	// --------------------- IMAGE ----------------------- //
	
	peoteView.setImage({

		image:   0,                  // image index
	                                 
		texture: 0,                  // texture to store image-data inside
                                     
		filename: "assets/font.png", // image filename or url to load image from
                                     
		preload: true,               // load images into texture, no matter of usage 
		                             // default behaivor: Image is loaded on first use of element
		
		// to disable automatic insert into free texture-slot:
		// ---------------------------------------------------
		
		slot: 0,                     // manual set texture-slot to load image in
                                     // all images of same texture should define or not define this parameter
		
		// image fitting and aligning inside texture-slot:
		// -----------------------------------------------
		
		fit: "in",                   // "in", "out" or "exact" fitting loaded image into slot size
		
		// or set position/size directly to create own texture-atlas:
		// ----------------------------------------------------------
		
		x:  10,                      // Position from left
		y:  10,                      // Position from top
		w: 100,                      // new image width
		h: 100,                      // new image height
		keep: true,                  // keep existing pixels in slot (for fit:"in" this works to)
                                     
		r: 0.5, g:0, b:0, a:0.9      // background colors/alpha for border if not exactly fit
	});
	
```



### 3) Program

opengl-shadercode and textures that can be use in fragment-shader

```
	var iteration  = [10];
	var somefloats = [2.0, 3.14, 4.1];
	
	// --------------------- PROGRAM --------------------------- //
	peoteView.setProgram({

		program: 0,                           // program index
	
		vshader: "assets/lyapunov_01.vert",   // custom vertex shader
		fshader: "assets/lyapunov_01.frag",   // custom fragment shader
		
		texture: 0,                           // all images stored inside this texture can be used

		// textures:[0,2,1,4]                 // to combine multiple textures with own shadercode
		                                      // max 7 aditional textures available per program
		
		vars: [ "iteration" => iteration,     // custom uniform variable bindings for this program
		        "somefloat" => somefloats
		      ]
	});
```




### 4) Displaylist

rectangular screen-areas to display lots of elements

```
	// ------------------------- DISPLAYLIST -------------- //

	peoteView.setDisplaylist({

		displaylist: 0,                 // displaylist index
		
		type:DisplaylistType.RGBA,      // can be combination of .PICKING  .ANIM   .ROTATION...
		
		maxElements:    100,            // maximum elements to set up via setElement()

		// gpu-buffer segmentation (can be potimized for better render performance)
		// maximum number of displayable elements is product of these values:
		
		bufferSegmentSize: 10           // number of elements per segment that shares the same program (one draw-call)
		bufferSegments:    10,          // how much segments of these size will be reserved

		
		x: 150,                         // pixels from left border
		y: 50,                          // pixels from top border
		w: 1000,                        // width
		h: 1000,                        // height
		z: 0,                           // z-order
		
		r: 0.5, g:0, b:0, a:0.9         // background colors/alpha
		
		//renderToTexture: true,        // render content into a texture every frame
		//texture:0,                    // texture index to use (should have same width and height)
		
		//zoom:1                        // zoom level (2.0 is double sized, 0.5 half size)
		//pivotX:0                      // x center of zoom
		//pivotY:0                      // y center of zoom
		
		enable: true
	});
```



### 5) Element

little Graphic inside Displaylist-Area (like a c64-sprite)

```
	// ----------------------- ELEMENT --------------------- //
	
	peoteView.setElement({

		element: 0,      // element index

		displaylist: 0,  // displaylist to put in
		
		program: 0,      // shader (+texture) to use
		
		// Position and Size ---------------
		
		x: 10,           // pixels from left displaylist border
		y: 10,           // pixels from top displaylist border
		w: 100,          // width
		h: 100,          // height
		z: 0,            // z-order   ( 0 <= z <= 32767 )
		
		rotation:45      // rotation in degrees (clockwise)
		pivotX:0,        // x center of rotation
		pivotY:0,        // y center of rotation
		
		rgba:0xff0000ff  // color (multiply)
		
		// (for animation -> see samples)
		
		// Texture Mapping ---------------
		
		image: 0,        // image number
		// slot: 0,      // or set texture-slot manual
		                 // without image+slot parameter -> full texturespace
		
		tile:  0,        // (0..255) texture coordinates will be splittet into 16x16 tiles
		
		// tx, ty,       // manual setting texture-coordinate position inside texture(-slot)
		// tw ,th        // manual setting texture-coordinates size
	});
```

To use from javascript look here -> [peoteView.js](https://github.com/maitag/peoteView.js).  


### How to optimize render-loop:

- order displaylists functional: 1) game-gfx, 2) user-interface (DisplaylistType.PICK to interact with Elements)
- elements with same program will be drawn fastest (throught opengl drawarray)
- use only 1 bufferSegment in Displaylist if there is only one program
- for nested animations use "renderToTexture" in Displaylists



### Todo

- tile animation on gpu
- more simple samples, usability and platform tests, api improvement, optimization
- more demos ;)
