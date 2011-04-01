var win = Titanium.UI.currentWindow;

// input variables
//
var currentUser = win.currentUser;

Ti.include("constant.js");
Ti.include("cells.js");


//////////////////////////////////////////////////////////////////////////////////
// functions 
//////////////////////////////////////////////////////////////////////////////////

// create request header utility
//
function createHeaderForRequest(request)
{
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	request.setRequestHeader('username', currentUser.getUsername());
	request.setRequestHeader('jid', currentUser.getJid());
	request.setRequestHeader('country', 'tw');
	request.setRequestHeader('timezone', '8');
};


//////////////////////////////////////////////////////////////////////////////////
// variables 
//////////////////////////////////////////////////////////////////////////////////

/////////////////// non-UI variables ///////////////////

// hot data array
//
var futureHots = [];
var nowHots = [];
var weekHots = [];

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
		createHeaderForRequest(c);
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
		createHeaderForRequest(c);
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
		createHeaderForRequest(c);
		c.send();
	}
};


/////////////////// UI variables ///////////////////////

// hot tabbed bar
//
var hottb = Titanium.UI.createTabbedBar({
	labels:['Future', 'Now', 'Week'],
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	top:0,
	height:40,
	width:320,
	index:0
});
win.add(hottb);

// hot table view
//
var hottv = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
	top: 40
});
win.add(hottv);


//////////////////////////////////////////////////////////////////////////////////
// event listener 
//////////////////////////////////////////////////////////////////////////////////

// hot tabbed bar listener
//
hottb.addEventListener('click', function()
{
	switch (hottb.index)
	{
		case 0:
			hotManager.getFutureHot();
			break;
			
		case 1:
			hotManager.getNowHot();
			break;
			
		case 2:
			hotManager.getWeekHot();
			break;
	}
});


// Future Hot listener
//
Ti.App.addEventListener('didGetFutureHot', function(e)
{
	Ti.API.info('didGetFutureHot');
	futureHots = [];
	
	for (var i in e.data)
	{
		var hot = e.data[i];
		futureHots.push(createFutureHotCell(hot));
	}
	
	hottv.setData(futureHots);
});


// Now Hot listener
//
Ti.App.addEventListener('didGetNowHot', function(e)
{
	Ti.API.info('didGetNowHot');
	nowHots = [];
	
	for (var i in e.data)
	{
		var hot = e.data[i];
		nowHots.push(createNowHotCell(hot));
	}
	
	hottv.setData(nowHots);
});


// Weekly Hot listener
//
Ti.App.addEventListener('didGetWeekHot', function(e)
{
	Ti.API.info('didGetWeekHot');
	weekHots = [];
	
	for (var i in e.data)
	{
		var hot = e.data[i];
		weekHots.push(createWeekHotCell(hot));
	}
	
	hottv.setData(weekHots);
});


//////////////////////////////////////////////////////////////////////////////////
// actions
//////////////////////////////////////////////////////////////////////////////////

hotManager.getFutureHot();