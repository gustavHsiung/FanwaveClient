WebSocket = $.klass({

	// Initiate WebSocket
	initialize: function (arg) 
	{	
		this.initEvents();
	},
	
	// Event delegator
    handleEvents: function(e, fakee)
    {
    	Ti.API.info('proxy event: ' + e.func + ' to ' + e.to);
        if(fakee){
            var e = fakee;
        }
        
        Ti.App.fireEvent(e.to, e);
    },
    
    // Initiate application wide events
    initEvents: function()
    {
       this.proxiedHandleEvents = $.proxy(this.handleEvents, this);
       Ti.App.addEventListener('websocket', this.proxiedHandleEvents);
    }
    
});