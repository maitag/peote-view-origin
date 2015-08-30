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
