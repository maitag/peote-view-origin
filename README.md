###Peote View - 2D OpenGL Render Library

This library is coded in [Haxe](http://haxe.org) programming language with [Lime](https://github.com/openfl/lime),  
and much use of [flashdevelop](http://www.flashdevelop.org/) tool.

To use with javascript inside webbrowser look [here](https://github.com/maitag/peoteView.js). 

####Build [Samples (^_^)](http://maitag.github.io/peote-view/)

- edit sample and check [peoteView.lime](https://github.com/maitag/peote-view/blob/master/peoteView.lime#L10)  
- build with: `lime build peoteView.lime linux` ( | html5 | windows | android | ...)


####Why this lib ?

- simple API to scroll and zoom into massive gfx-2d-tiles
- handle imagedata and procedural shadercode simple and easy
- better sync over network by element-indices (to avoid deep object-serialization)
- transition-rendering by gpu-shader to reduce cpu->gpu datatransfer (more time for game-logic on cpu)
- power of haxe-lime multiplatform code generation ( haxe -> cpp+js+java+.. )
  and lib-tool-building (like [peoteView.js](https://github.com/maitag/peoteView.js))

####Todo

- tilesheet-animations
- optimize element storage
- more simple samples, usability tests, api improvement
- documentation