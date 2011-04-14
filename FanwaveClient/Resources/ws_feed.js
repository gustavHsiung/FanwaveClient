var win = Titanium.UI.currentWindow;

// input variables
//
var currentUser = win.currentUser;

Ti.include("cells.js");

// bind function utility
//
_ = {
	bind: function(func, scope){
        return function(){
            return func.apply(scope, Array.prototype.slice.call(arguments));
        }
    }
};

var ws_feed = {

	init: function ()
	{	
		/////////////// init UI layout ///////////////
		
		// feed tabbed bar
		//
		this.feedtb = Titanium.UI.createTabbedBar({
			labels:['Message', 'Hot'],
			style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
			top:0,
			height:40,
			width:320,
			index:0
		});
		win.add(this.feedtb);

		// create message text field
		//
		this.msgtf = Titanium.UI.createTextField({
			color: '#336699',
			height: 35,
			top: 50,
			left: 20,
			width: 200,
			keyboardType: Titanium.UI.KEYBOARD_EMAIL,
			returnKeyType: Titanium.UI.RETURNKEY_RETURN,
			borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
		});
		win.add(this.msgtf);
		
		// create send message button
		//
		this.sendbt = Titanium.UI.createButton({
			title: 'Send',
			top: 50,
			left: 240,
			height: 35,
			width: 70
		});
		win.add(this.sendbt);
		
		// feed table view
		//
		this.feedtv = Titanium.UI.createTableView({
			style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
			top: 100,
			height: 290,
			width: 320
		});
		win.add(this.feedtv);
		
		/////////////// init event listeners ////////////////
		this.initEvents();
		
		/////////////// init variables ////////////////
		
		// feed data array
		//
		this.msgFeeds = [];
		this.hotFeeds = [];
		
		// websocket delegate
		//
		this.web = Ti.UI.createWebView({
			url: './websocket/websocket_delegate.html',
			visible: false
		});
		win.add(this.web);
	},
	
	initEvents: function ()
	{
		// listen event for app
		//
		Ti.App.addEventListener('app', _.bind(this.handleEvents, this));
		
		// send button event listener
		//
		this.sendbt.addEventListener('click', function () {
			ws_feed.sendMessage(ws_feed.msgtf.value);
		});
		
		// feed tabbed bar listener
		//
		this.feedtb.addEventListener('click', function()
		{
			ws_feed.refreshTable();
		});
	},
	
	refreshTable: function ()
	{		
		rows = [];
		
		switch (this.feedtb.index)
		{
			case 0:
				for (var i in this.msgFeeds)
				{
					var msg = this.msgFeeds[i];
					rows.push(createMessageCell(msg));
				}
				break;
				
			case 1:
				for (var i in this.hotFeeds)
				{
					var title = this.hotFeeds[i];
					rows.push(createHotCell(title));
				}
	
				break;
		}
		
		this.feedtv.setData(rows);
	},
	
	// Event delegator
    handleEvents: function(e)
    {
        if (this[e.func]) 
        {
            if (!e.data) {
                e.data = {};
            }
            this[e.func](e);
        }
    },
    
    fire: function(opts)
    {
        opts.from = 'app';
        Ti.App.fireEvent('websocket', opts);
    },
    
    sendMessage: function (msg) 
    {
    	Ti.API.info('send: ' + msg);
    	
		this.fire({
			to: 'web',
			func: 'sendMessage',
			data: { message:msg }
		});
    },
    
    messageDidSend: function (e)
    {
    	var text = 'you said:\n' + e.data.message;
    	var temp = [text];
    	this.msgFeeds = temp.concat(this.msgFeeds);
    			
    	if (this.feedtb.index == 0) this.refreshTable();
    },
    
    receiveMessage: function (e)
    {
    	var msg = e.data.message.message;
    	var hot = e.data.message.hot;
    	
    	if (msg) 
    	{
    		if (Object.prototype.toString.call(msg) === '[object Array]')
    		{
    			var text = msg[0] + ' said:\n' + msg[1];
    			var temp = [text];
    			this.msgFeeds = temp.concat(this.msgFeeds);
    		}
    		else
    		{
    			var temp = [msg];
    			this.msgFeeds = temp.concat(this.msgFeeds);
    		}
    		
    		if (this.feedtb.index == 0) this.refreshTable();
    	};
    	
    	if (hot) 
    	{
    		this.hotFeeds = e.data.message.hot;
    		
    		if (this.feedtb.index == 1) this.refreshTable();
    	};
    },
    
    websocketConnected: function ()
    {
    	Ti.API.info('WebSocket Connected');
    },
    
    websocketDisconnected: function ()
    {
    	Ti.API.info('WebSocket Disconnected');
    },
    
    websocketReconnected: function ()
    {
    	Ti.API.info('WebSocket Reconnected');
    },
    
    websocketReconnecting: function ()
    {
    	Ti.API.info('WebSocket Reconnecting');
    },
    
    websocketReconnectFailed: function ()
    {
    	Ti.API.info('WebSocket Reconnect Failed');
    }
};

ws_feed.init();