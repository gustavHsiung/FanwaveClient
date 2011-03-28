// hot manager

Ti.include("../constant.js");
Ti.include("../utils/network.js");

var hotManager = {
	
	getFutureHot: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var hots = JSON.parse(this.responseData);
			Ti.App.fireEvent('didGetFutureHot', {data:hots});
		};
	
		c.open('GET', baseUrl + 'top/reminder/tw/20');
		createHeader(c);
		c.send();
	},
	
	getNowHot: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var hots = JSON.parse(this.responseData);
			Ti.App.fireEvent('didGetNowHot', {data:hots});
		};
	
		c.open('GET', baseUrl + 'top/crowded/tw/20');
		createHeader(c);
		c.send();
	},
	
	getWeekHot: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var hots = JSON.parse(this.responseData);
			Ti.App.fireEvent('didGetWeekHot', {data:hots});
		};
	
		c.open('GET', baseUrl + 'top/mixedprograms/tw/7/20');
		createHeader(c);
		c.send();
	}
};