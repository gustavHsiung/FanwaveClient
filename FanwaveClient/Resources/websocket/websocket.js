WebSocket = {

	///////////////// functions for app //////////////////
	
	send: function (data)
	{
		Ti.App.fireEvent('web_send_data', {data: data} );
	},
	
	///////////////// functions for web //////////////////
	
	receive: function (data)
	{
		Ti.App.fireEvent('app_receive_data', {data: data} );
	},
	
	// Connection Status Feedback
	
	websocketDidConnect: function ()
	{
		Ti.App.fireEvent('app_websocket_connected');
	},
	
	websocketDidDisconnect: function ()
	{
		Ti.App.fireEvent('app_websocket_disconnected');
	}
};