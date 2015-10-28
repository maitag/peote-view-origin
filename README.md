###Peote View - 2D OpenGL Render Library

This Library is written in [Haxe](http://haxe.org) and [OpenFl/Lime](http://www.openfl.org/documentation/setup/install-haxe/)
  
To use in javascript look [here](https://github.com/maitag/peoteView.js). 

####Build [Samples (^_^)](http://maitag.github.io/peote-view/)

- edit sample and check [peoteView.lime](https://github.com/maitag/peote-view/blob/master/peoteView.lime#L10)  
- build with: `lime build peoteView.lime linux` (|html5|windows|android|...)


####Why this lib ?

- simple API to scroll and zoom into massive gfx-2d-tiles
- handle imagedata and procedural shadercode simple and easy
- better sync over network (avoid deep object-serialization by numbering display-elements)
- transition-rendering by gpu-shader to reduce cpu->gpu datatransfer (more time for game-logic on cpu)
- power of haxe-lime multiplatform code generation ( haxe -> cpp|js|java|.. )
  and lib-tool-building (like [peoteView.js](https://github.com/maitag/peoteView.js))

####Todo

- tilesheet-animations
- optimize element storage
- more simple samples, usability tests, api improvement
- documentation