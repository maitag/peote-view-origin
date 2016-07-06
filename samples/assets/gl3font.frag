varying vec2 vTexCoord;
#if_RGBA
varying vec4 vRGBA;
#else_RGBA
	#if_PICKING
	varying vec4 vRGBA;
	#end_PICKING
#end_RGBA

#if_PICKING
uniform vec2 uResolution;
#end_PICKING

uniform float uZoom;


#if_TEXTURE0
uniform sampler2D uTexture0;
#end_TEXTURE0

#if_TEXTURE1
uniform sampler2D uTexture1;
#end_TEXTURE1

void main(void)
{	
	#if_TEXTURE0
	vec4 texel = texture2D(uTexture0, vTexCoord / #MAX_TEXTURE0);
	#else_TEXTURE0
	vec4 texel = vec4(1.0, 1.0, 1.0, 1.0);
	#end_TEXTURE0
	
	// if use more than one texture unit to combine or do something crazy here:)
	#if_TEXTURE1
	texel = texel * texture2D(uTexture1, vTexCoord / #MAX_TEXTURE0);
	#end_TEXTURE1
	// ... TEXTURE2 ...TEXTURE3 ...
	
	//if (texel.a < 0.5) discard;
	// simmulates fwidth()
	float current = texel.r;
	float delta = uZoom*uZoom;
	float dfdx = texture2D(uTexture0, (vTexCoord + vec2(delta,0.0)) / #MAX_TEXTURE0).r - current;
	float dfdy = texture2D(uTexture0, (vTexCoord + vec2(0.0,delta)) / #MAX_TEXTURE0).r - current;
	float E = abs(dfdx/delta)+abs(dfdy/delta);
	
	texel.a = smoothstep(0.5-E,0.5+E, texel.r);
	

	#if_PICKING
	if (uResolution.x == 1.0) { 
		gl_FragColor = vRGBA; // vRGBA color defines element-number for gl-picking;
	}
	else {
		#if_RGBA
		gl_FragColor = texel * vRGBA;
		#else_RGBA
		gl_FragColor = texel;
		#end_RGBA				
	}
	#else_PICKING
		#if_RGBA
		gl_FragColor = texel * vRGBA;
		#else_RGBA
		gl_FragColor = texel;
		#end_RGBA
	#end_PICKING
}