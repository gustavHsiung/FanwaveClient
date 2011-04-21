var win = Titanium.UI.currentWindow;

// input variables
//
var currentUser = win.currentUser;

Ti.include("constant.js");
Ti.include("cells.js");
Ti.include("utf8.js");


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
			var hots;
			
			if (Ti.Platform.name == 'android') {
    			hots = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			hots = JSON.parse(this.responseText);
			}
			
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
			var hots;
			
			if (Ti.Platform.name == 'android') {
    			hots = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			hots = JSON.parse(this.responseText);
			}
			
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
			var hots;
			
			if (Ti.Platform.name == 'android') {
    			hots = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			hots = JSON.parse(this.responseText);
			}
			
			Ti.App.fireEvent('didGetWeekHot', {data:hots});
		};
	
		c.open('GET', baseUrl + 'top/mixedprograms/tw/7/20');
		createHeaderForRequest(c);
		c.send();
	}
};


/////////////////// UI variables ///////////////////////

// future hot button
//
var futurebt = Titanium.UI.createButton({
	title: 'Future',
	top: 5,
	height: 30,
	width: 100,
	left: 5
});
win.add(futurebt);

// now hot button
//
var nowbt = Titanium.UI.createButton({
	title: 'Now',
	top: 5,
	height: 30,
	width: 100,
	left: 110
});
win.add(nowbt);

// week hot button
//
var weekbt = Titanium.UI.createButton({
	title: 'Week',
	top: 5,
	height: 30,
	width: 100,
	right: 5
});
win.add(weekbt);

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

// future hot button listener
//
futurebt.addEventListener('click', function ()
{
	hotManager.getFutureHot();
});

// now hot button listener
//
nowbt.addEventListener('click', function ()
{
	hotManager.getNowHot();
});

// week hot button listener
//
weekbt.addEventListener('click', function ()
{
	hotManager.getWeekHot();
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