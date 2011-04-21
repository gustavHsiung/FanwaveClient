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


// select wave utility
//
function didSelectWaveAtIndex(index)
{
	switch (selected)
	{
		case 'news':
			if (index == newsWaves.length && moreNewsWave)
			{
				wavetv.appendRow(createLoadingMoreCell());
				wavetv.deleteRow(index);
				waveManager.getMoreNewsWave(newsWaves[index-1]);
			}
			break;
			
		case 'friend':
			if (index == friendWaves.length && moreFriendWave)
			{
				wavetv.appendRow(createLoadingMoreCell());
				wavetv.deleteRow(index);
				waveManager.getMoreFriendWave(friendWaves[index-1]);
			}
			break;
			
		case 'follow':
			if (index == followWaves.length && moreFollowWave)
			{
				wavetv.appendRow(createLoadingMoreCell());
				wavetv.deleteRow(index);
				waveManager.getMoreFollowWave(currentUser.getUsername(), followWaves[index-1]);
			}
			break;
	}
};


//////////////////////////////////////////////////////////////////////////////////
// variables 
//////////////////////////////////////////////////////////////////////////////////

/////////////////// non-UI variables ///////////////////

var selected = 'news';

// more waves flag
//
var moreNewsWave = false;
var moreFriendWave = false;
var moreFollowWave = false;

// wave data array
//
var newsWaves = [];
var friendWaves = [];
var followWaves = [];

// wave manager
//
var waveManager = {

	getNewsWave: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		// request callback
		//
		c.onload = function()
		{
			var waves;
			
			if (Ti.Platform.name == 'android') {
				Ti.API.info('utf-8 decoding...');
    			waves = JSON.parse(utf8.decode(this.responseText));
    			Ti.API.info('utf-8 decoding end');
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			waves = JSON.parse(this.responseText);
			}

			Ti.App.fireEvent('didGetNewsWave', {data:waves.feeds, more:parseInt(waves.more,10)});
		};
	
		c.open('GET', baseUrl + 'feed/all/get');
		createHeaderForRequest(c);
		c.send();
	},
	
	getFriendWave: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		// request callback
		//
		c.onload = function()
		{
			var waves;
			
			if (Ti.Platform.name == 'android') {
    			waves = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			waves = JSON.parse(this.responseText);
			}
			
			Ti.App.fireEvent('didGetFriendWave', {data:waves.feeds, more:parseInt(waves.more,10)});
		};
	
		c.open('GET', baseUrl + 'feed/friend/get');
		createHeaderForRequest(c);
		c.send();
	},
	
	getFollowWave: function(follower) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		// request callback
		//
		c.onload = function()
		{
			var waves;
			
			if (Ti.Platform.name == 'android') {
    			waves = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			waves = JSON.parse(this.responseText);
			}
			
			Ti.App.fireEvent('didGetFollowWave', {data:waves.feeds, more:parseInt(waves.more,10)});
		};
	
		c.open('POST', baseUrl + 'follow/programfeed/20/get');
		createHeaderForRequest(c);
		c.send({username: follower});
	},
	
	getMoreNewsWave: function(wave) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		// request callback
		//
		c.onload = function()
		{
			var waves;
			
			if (Ti.Platform.name == 'android') {
    			waves = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			waves = JSON.parse(this.responseText);
			}
			
			Ti.App.fireEvent('didGetMoreNewsWave', {data:waves.feeds, more:parseInt(waves.more,10)});
		};
		Ti.API.info('wave id: ' + wave.info.uuid);
		c.open('GET', baseUrl + 'feed/all/' + wave.info.uuid + '/prev');
		createHeaderForRequest(c);
		c.send();
	},
	
	getMoreFriendWave: function(wave) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		// request callback
		//
		c.onload = function()
		{
			var waves;
			
			if (Ti.Platform.name == 'android') {
    			waves = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			waves = JSON.parse(this.responseText);
			}
			
			Ti.App.fireEvent('didGetMoreFriendWave', {data:waves.feeds, more:parseInt(waves.more,10)});
		};
	
		c.open('GET', baseUrl + 'feed/friend/' + wave.info.uuid + '/prev');
		createHeaderForRequest(c);
		c.send();
	},
	
	getMoreFollowWave: function(follower, wave) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		// request callback
		//
		c.onload = function()
		{
			var waves;
			
			if (Ti.Platform.name == 'android') {
    			waves = JSON.parse(utf8.decode(this.responseText));
			}
			else if(Ti.Platform.name == 'iPhone OS'){
    			waves = JSON.parse(this.responseText);
			}
			
			Ti.App.fireEvent('didGetMoreFollowWave', {data:waves.feeds, more:parseInt(waves.more,10)});
		};
	
		c.open('POST', baseUrl + 'follow/programfeed/' + wave.info.uuid + '/20/next');
		createHeaderForRequest(c);
		c.send({username: follower});
	}
};


/////////////////// UI variables ///////////////////////

// news wave button
//
var newsbt = Titanium.UI.createButton({
	title: 'News',
	top: 5,
	height: 30,
	width: 100,
	left: 5
});
win.add(newsbt);

// friend wave button
//
var friendbt = Titanium.UI.createButton({
	title: 'Friend',
	top: 5,
	height: 30,
	width: 100,
	left: 110
});
win.add(friendbt);

// follow wave button
//
var followbt = Titanium.UI.createButton({
	title: 'Follow',
	top: 5,
	height: 30,
	width: 100,
	right: 5
});
win.add(followbt);

// wave table view
//
var wavetv = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
	backgroundColor:'transparent',
	top: 40
});
win.add(wavetv);


//////////////////////////////////////////////////////////////////////////////////
// event listener 
//////////////////////////////////////////////////////////////////////////////////

// news wave button listener
//
newsbt.addEventListener('click', function ()
{
	selected = 'news';
	waveManager.getNewsWave();
});

// friend wave button listener
//
friendbt.addEventListener('click', function ()
{
	selected = 'friend';
	waveManager.getFriendWave();
});

// follow wave button listener
//
followbt.addEventListener('click', function ()
{
	selected = 'follow';
	waveManager.getFollowWave(currentUser.getUsername());
});

// wave table view listener
//
wavetv.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	
	didSelectWaveAtIndex(index);
});


// news wave listener
//
Ti.App.addEventListener('didGetNewsWave', function(e)
{
	Ti.API.info('didGetNewsWave');
	newsWaves = e.data;
	var rows = [];
	
	for (var i in newsWaves)
	{
		var wave = newsWaves[i];
		
		switch (wave.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(wave));
				break;
			
			case 'comment':
				rows.push(createCommentCell(wave));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(wave));
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(wave));
				break;
				
			case 'topfan':
				rows.push(createTopFanCell(wave));
				break;
			
			default:
				Ti.API.info('undefined wave type');	
				break;
		}
	}
	
	moreNewsWave = e.more;
	
	if (moreNewsWave)
		rows.push(createMoreCell());
	
	wavetv.setData(rows);
});

// more news wave listener
//
Ti.App.addEventListener('didGetMoreNewsWave', function(e)
{
	Ti.API.info('didGetMoreNewsWave');
	newsWaves = newsWaves.concat(e.data);
	var rows = [];

	for (var i in newsWaves)
	{
		var wave = newsWaves[i];
		
		switch (wave.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(wave));
				break;
			
			case 'comment':
				rows.push(createCommentCell(wave));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCellwave);
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(wave));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(wave));
				break;
			
			default:
				Ti.API.info('undefined wave type:' + wave);	
				break;
		}
	}
	
	moreNewsWave = e.more;
	
	if (moreNewsWave)
		rows.push(createMoreCell());
	
	wavetv.setData(rows);
});


// friend wave listener
//
Ti.App.addEventListener('didGetFriendWave', function(e)
{
	Ti.API.info('didGetFriendWave');
	friendWaves = e.data;
	var rows = [];
	
	for (var i in friendWaves)
	{
		var wave = friendWaves[i];
		
		switch (wave.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(wave));
				break;
			
			case 'comment':
				rows.push(createCommentCell(wave));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(wave));
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(wave));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(wave));
				break;
			
			default:
				Ti.API.info('undefined wave type');	
				break;
		}
	}
	
	moreFriendWave = e.more;
	
	if (moreFriendWave)
		rows.push(createMoreCell());
	
	wavetv.setData(rows);
});

// more friend wave listener
//
Ti.App.addEventListener('didGetMoreFriendWave', function(e)
{
	Ti.API.info('didGetMoreFriendWave');
	friendWaves = friendWaves.concat(e.data);
	var rows = [];
	
	for (var i in friendWaves)
	{
		var wave = friendWaves[i];
		
		switch (wave.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(wave));
				break;
			
			case 'comment':
				rows.push(createCommentCell(wave));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(wave));
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(wave));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(wave));
				break;
			
			default:
				Ti.API.info('undefined wave type');	
				break;
		}
	}
	
	moreFriendWave = e.more;
	
	if (moreFriendWave)
		rows.push(createMoreCell());
	
	wavetv.setData(rows);
});


// follow wave listener
//
Ti.App.addEventListener('didGetFollowWave', function(e)
{
	Ti.API.info('didGetFollowWave');
	followWaves = e.data;
	var rows = [];
	
	for (var i in followWaves)
	{
		var wave = followWaves[i];
		
		switch (wave.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(wave));
				break;
			
			case 'comment':
				rows.push(createCommentCell(wave));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(wave));
				break;
				
			case 'badge':
				rows.push(createGainBadgeCell(wave));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(wave));
				break;
			
			default:
				Ti.API.info('undefined wave type');	
				break;
		}
	}
	
	moreFollowWave = e.more;
	
	if (moreFollowWave)
		rows.push(createMoreCell());
	
	wavetv.setData(rows);
});

// more follow wave listener
//
Ti.App.addEventListener('didGetMoreFollowWave', function(e)
{
	Ti.API.info('didGetMoreFollowWave');
	followWaves = followWaves.concat(e.data);
	var rows = [];
	
	for (var i in followWaves)
	{
		var wave = followWaves[i];
		
		switch (wave.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(wave));
				break;
			
			case 'comment':
				rows.push(createCommentCell(wave));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(wave));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(wave));
				break;
				
			case 'badge':
				rows.push(createGainBadgeCell(wave));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(wave));
				break;
			
			default:
				Ti.API.info('undefined wave type');	
				break;
		}
	}
	
	moreFollowWave = e.more;
	
	if (moreFollowWave)
		rows.push(createMoreCell());
	
	wavetv.setData(rows);
});


//////////////////////////////////////////////////////////////////////////////////
// actions
//////////////////////////////////////////////////////////////////////////////////

waveManager.getNewsWave();