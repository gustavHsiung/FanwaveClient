var win = Titanium.UI.currentWindow;


// hot tabbed bar
//
/*var hottb = Titanium.UI.createTabbedBar({
	labels:['Future', 'Now', 'Week'],
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	top:0,
	height:40,
	width:320,
	index:0
});
win.add(hottb);
*/

// hot table view
//
var hottv = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
	top: 40
});
win.add(hottv);


// hot array
//
var futureHots = [];
var nowHots = [];
var weekHots = [];

Ti.include("../constant.js");
Ti.include("../managers/hot_manager.js");
Ti.include("../cell_views/hot_cell_view.js");


// Future Hot callback
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


// Future Hot callback
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


// Future Hot callback
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

hotManager.getFutureHot();

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