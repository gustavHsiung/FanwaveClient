var win = Titanium.UI.currentWindow;

// input variables
//
var currentUser = win.currentUser;

Ti.include("cells.js");
Ti.include("./websocket/websocket.js");

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
		
		// message feed button
		//
		this.msgbt = Titanium.UI.createButton({
			title: 'Message',
			top: 5,
			height: 40,
			width: 160,
			left: 0
		});
		win.add(this.msgbt);
		
		// hot feed button
		//
		this.hotbt = Titanium.UI.createButton({
			title: 'Hot',
			top: 5,
			height: 40,
			width: 160,
			right: 0
		});
		win.add(this.hotbt);
		
		// create message text field
		//
		this.msgtf = Titanium.UI.createTextField({
			color: '#336699',
			height: 35,
			top: 50,
			left: 20,
			width: 200,
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
		
		// user select index
		//
		this.selected = 'message';
		
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
		Ti.App.addEventListener('app_receive_data', _.bind(this.receiveData, this));
		Ti.App.addEventListener('app_websocket_connected', _.bind(this.websocketConnected, this));
		Ti.App.addEventListener('app_websocket_disconnected', _.bind(this.websocketDisconnected, this));
		
		// send button event listener
		//
		this.sendbt.addEventListener('click', function () 
		{
			ws_feed.sendData(ws_feed.msgtf.value);
		});
		
		// message feed button event listener
		//
		this.msgbt.addEventListener('click', function()
		{
			ws_feed.selected = 'message';
			ws_feed.refreshTable();
		});
		
		// hot feed button event listener
		//
		this.hotbt.addEventListener('click', function ()
		{
			ws_feed.selected = 'hot';
			ws_feed.refreshTable();
		});
	},
	
	refreshTable: function ()
	{		
		rows = [];
		
		switch (this.selected)
		{
			case 'message':
				for (var i in this.msgFeeds)
				{
					var msg = this.msgFeeds[i];
					rows.push(createMessageCell(msg));
				}
				break;
				
			case 'hot':
				for (var i in this.hotFeeds)
				{
					var title = this.hotFeeds[i];
					rows.push(createHotCell(title));
				}
	
				break;
		}
		
		this.feedtv.setData(rows);
	},
    
    sendData: function (data) 
    {
    	WebSocket.send(data);
    },
    
    receiveData: function (e)
    {
    	var msg = e.data.message;
    	var hot = e.data.hot;
    	
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
    		
    		if (this.selected == 'message') this.refreshTable();
    	};
    	
    	if (hot) 
    	{
    		this.hotFeeds = e.data.hot;
    		
    		if (this.selected == 'hot') this.refreshTable();
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