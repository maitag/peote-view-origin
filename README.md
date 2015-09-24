###Peote View - 2D OpenGL Render Library

This Library is written in [Haxe](http://haxe.org) and [OpenFl/Lime](http://www.openfl.org/documentation/setup/install-haxe/)
  
To use with javascript look [here](https://github.com/maitag/peoteView.js). 

####Build [Samples](http://maitag.github.io/peote-view/)

- edit sample and check [peoteView.lime](https://github.com/maitag/peote-view/blob/master/peoteView.lime#L10)  
- build with: `lime build peoteView.lime linux` (|android|windows|html5|...)


####Why this lib ?

- handle imagedata and procedural shadercode equal
- better sync over network (simple index-numbers, no object-stringification)
- simple API to scroll and zoom into massive gfx-2d-tiles
- much render-time for animation done by gpu (more time for game-logic on cpu)
- power of haxe-lime multiplatform code generation

####Todo

- tilesheet-animations
- more simple samples, api improvement, usability tests ...
- opengl "picking" ( hit-tests/mouse-INPUT-handling )
- optimized timer-events