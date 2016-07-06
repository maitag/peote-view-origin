/*
   ###############################################################################
   #    Author:   Sylvio Sell - maitag - Rostock 2013                            #
   #    Homepage: http://maitag.de                                               #
   #    License: GNU General Public License (GPL), Version 2.0                   #
   #                                                                             #
   #    more images about that lyapunov fractalcode at:                          #
   #    http://maitag.de/~semmi/                                                 #
   #                          (have fun!;)                                       #
   ############################################################################### */
   
varying vec2 vTexCoord;
uniform sampler2D uImage;

//uniform float time;
uniform vec2 uMouse, uResolution;

void main( void ) {

	// x y pos
	//vec2 position =( gl_FragCoord.xy / uResolution.xy *(1.1 + sin(time)) );
	//float a = position.x;
	//float b = position.y;
	//float a = gl_FragCoord.x / uResolution.x;
	//float b = gl_FragCoord.y / uResolution.y;
	float a = vTexCoord.x*22.0; // uResolution.x;
	float b = vTexCoord.y*22.0; // uResolution.y;
	
	// PArameter
	float p1 = 1.7+(uMouse.x / 3.0);
	float p2 = 1.7+(uMouse.y / 3.0);
	//float p1 = 2.4;
	//float p2 = 1.7+sin(time);
	
	float index = 0.0;
	
	//var xx:Float = 1; // STARTWERT
	float xx = 1.0;
	
	// pre-iteration ##########################
	
	for (int i = 0; i < 2; i++) {
		xx = p1 * sin(xx + a) * sin(xx + a) + p2;
		xx = p1 * sin(xx + b) * sin(xx + b) + p2;
	}
	
	// main-iteration ########################
	
	for (int i = 0; i < 5; i++) {
		xx = p1 * sin(xx + a) * sin(xx + a) + p2;
		index = index + log(abs(2.0 * p1 * sin(xx + a) * cos(xx + a)));
		
		xx = p1 * sin(xx + b) * sin(xx + b) + p2;
		index = index + log(abs(2.0 * p1 * sin(xx + b) * cos(xx + b)));
	}
	
	index = index / 10.0;
	
	if (index > 0.0) {
		gl_FragColor = vec4(index, index, 0.05, 0.0);
	}
	else {
		gl_FragColor = vec4((0.0-index)*0.95, (0.0-index)*0.93, (0.0-index)*0.9, (0.0-index)*0.3);
	}
}

