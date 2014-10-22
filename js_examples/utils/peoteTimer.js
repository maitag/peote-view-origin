/*
 *        o-o    o-o  o-o-o  o-o    
 *       o   o  o    _   o      o   
 *      o-o-o  o-o  (o)   o    o-o  
 *     o      o     (_\~   o      o 
 *    o      o-o     |\     o    o-o
 * 
 * PEOTE VIEW - haxe 2D OpenGL Render Library
 * Copyright (c) 2014 Sylvio Sell, http://maitag.de
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function PeoteTimer() {
    var This = this;
    this._timeoutHandler = null;    
    this.chain = new Array();
    this.currentStep = 0;
    this.isRunning = false;
    this.repeat = 0;
	
    this.nextStep = function()
	{
        This.currentStep = This.currentStep + 1;
        if (This.currentStep == This.chain.length)
        {	//console.log("This.repeat:",This.repeat);
            if (This.repeat == 0) This.stop();
			else
			{	if (This.repeat != -1) This.repeat--;
				if (This.repeat != 0)
				{ This.currentStep = 0;
				  This.processCurrentStep();
				}
			}
        }
		else
        {
            This.processCurrentStep();
        }
    },
	
    this.processCurrentStep = function()
	{	
		This._timeoutHandler = window.setTimeout(
				function()
				{	
					This.chain[This.currentStep].func(This.chain[This.currentStep].duration);
					This.nextStep();
				},
				This.chain[This.currentStep].delay * 1000
		);
    },
	
    this.repeat = function(r)
	{
		r = r || -1;
		This.start(r);
	}
	
    this.start = function(r)
	{
		r = r || 0;
        if (This.chain.length == 0)
        {
            return;
        }
        if (This.isRunning == true)
        {
            return;
        }
        This.isRunning = true;
        This.currentStep = 0;
        This.repeat = r;
        This.processCurrentStep();
    },
	
    this.stop = function()
	{
        This.isRunning = false;
        window.clearTimeout(This._timeoutHandler)
    },
	
    this.add = function() // func, duration, delay
	{
		var i = 0;
		var _function;
		var _duration;
		
		var _delay_sum = 0;
		var _duration_prev = 0;
		if ( This.chain.length>0 ) _duration_prev = This.chain[This.chain.length-1].duration;
		var _delay = _duration_prev;
		
		while (i < arguments.length)
		{
			_function = arguments[i++];
			if (i == arguments.length) continue;
			_duration = arguments[i++];
			
			if ( i < arguments.length )
			{
				if (typeof(arguments[i]) == 'number')
				{
					_delay = _duration_prev + arguments[i++];
				}
			}

			_delay -= _delay_sum;
			
			//console.log(This.chain.length, "dur=",_duration,"del=", _delay);
		
			This.chain[This.chain.length] = {func:_function, duration:_duration, delay:_delay};
			_delay_sum += _delay;
		}
		
		return this;
    }
	
}
