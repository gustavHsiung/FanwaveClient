var win = Titanium.UI.currentWindow;

// input variables
//
var currentUser = win.currentUser;


// variables and functions inclusion
//
Ti.include("../constant.js");
Ti.include("../managers/feed_manager.js");
Ti.include("../cell_views/feed_cell_view.js");
Ti.include("../cell_views/more_cell_view.js");


// scope variables
//
var moreNewsFeed = false;
var moreFriendFeed = false;
var moreFollowFeed = false;

var newsFeeds = [];
var friendFeeds = [];
var followFeeds = [];


// feed tabbed bar
//

var feedtb = Titanium.UI.createTabbedBar({
	labels:['News', 'Friend', 'Follow'],
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	top:0,
	height:40,
	width:win.size.width,
	index:0
});
win.add(feedtb);

feedtb.addEventListener('click', function()
{
	switch (feedtb.index)
	{
		case 0:
			feedManager.getNewsFeed();
			break;
			
		case 1:
			feedManager.getFriendFeed();
			break;
			
		case 2:
			feedManager.getFollowFeed(currentUser.getUsername());
			break;
	}
});


// table view cell selected function
//
function didSelectedAtIndex(index)
{
	switch (feedtb.index)
	{
		case 0:
			if (index == newsFeeds.length && moreNewsFeed)
			{
				feedtv.appendRow(createLoadingMoreCell());
				feedtv.deleteRow(index);
				feedManager.getMoreNewsFeed(newsFeeds[index-1]);
			}
			break;
			
		case 1:
			if (index == friendFeeds.length && moreFriendFeed)
			{
				feedtv.appendRow(createLoadingMoreCell());
				feedtv.deleteRow(index);
				feedManager.getMoreFriendFeed(friendFeeds[index-1]);
			}
			break;
			
		case 2:
			if (index == followFeeds.length && moreFollowFeed)
			{
				feedtv.appendRow(createLoadingMoreCell());
				feedtv.deleteRow(index);
				feedManager.getMoreFollowFeed(currentUser.getUsername(), friendFeeds[index-1]);
			}
			break;
	}
};

// feed table view
//
var feedtv = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
	backgroundColor:'transparent',
	top: 40
});

feedtv.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	
	didSelectedAtIndex(index);
});

win.add(feedtv);


// news feed callback
//
Ti.App.addEventListener('didGetNewsFeed', function(e)
{
	Ti.API.info('didGetNewsFeed');
	newsFeeds = e.data;
	var rows = [];
	
	for (var i in newsFeeds)
	{
		var feed = newsFeeds[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				rows.push(createCommentCell(feed));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(feed));
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(feed));
				break;
				
			case 'topfan':
				rows.push(createTopFanCell(feed));
				break;
			
			default:
				Ti.API.info('undefined feed type');	
				break;
		}
	}
	
	moreNewsFeed = e.more;
	
	if (moreNewsFeed)
		rows.push(createMoreCell());
	
	feedtv.setData(rows);
});

Ti.App.addEventListener('didGetMoreNewsFeed', function(e)
{
	Ti.API.info('didGetMoreNewsFeed');
	newsFeeds = newsFeeds.concat(e.data);
	var rows = [];

	for (var i in newsFeeds)
	{
		var feed = newsFeeds[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				rows.push(createCommentCell(feed));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(feed));
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(feed));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(feed));
				break;
			
			default:
				Ti.API.info('undefined feed type:' + feed);	
				break;
		}
	}
	
	moreNewsFeed = e.more;
	
	if (moreNewsFeed)
		rows.push(createMoreCell());
	
	feedtv.setData(rows);
});


// friend feed callback
//
Ti.App.addEventListener('didGetFriendFeed', function(e)
{
	Ti.API.info('didGetFriendFeed');
	friendFeeds = e.data;
	var rows = [];
	
	for (var i in friendFeeds)
	{
		var feed = friendFeeds[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				rows.push(createCommentCell(feed));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(feed));
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(feed));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(feed));
				break;
			
			default:
				Ti.API.info('undefined feed type');	
				break;
		}
	}
	
	moreFriendFeed = e.more;
	
	if (moreFriendFeed)
		rows.push(createMoreCell());
	
	feedtv.setData(rows);
});

Ti.App.addEventListener('didGetMoreFriendFeed', function(e)
{
	Ti.API.info('didGetMoreFriendFeed');
	friendFeeds = friendFeeds.concat(e.data);
	var rows = [];
	
	for (var i in friendFeeds)
	{
		var feed = friendFeeds[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				rows.push(createCommentCell(feed));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(feed));
				break;
				
			case 'badge':	
				rows.push(createGainBadgeCell(feed));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(feed));
				break;
			
			default:
				Ti.API.info('undefined feed type');	
				break;
		}
	}
	
	moreFriendFeed = e.more;
	
	if (moreFriendFeed)
		rows.push(createMoreCell());
	
	feedtv.setData(rows);
});


// follow feed callback
//
Ti.App.addEventListener('didGetFollowFeed', function(e)
{
	Ti.API.info('didGetFollowFeed');
	followFeeds = e.data;
	var rows = [];
	
	for (var i in followFeeds)
	{
		var feed = followFeeds[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				rows.push(createCommentCell(feed));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(feed));
				break;
				
			case 'badge':
				rows.push(createGainBadgeCell(feed));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(feed));
				break;
			
			default:
				Ti.API.info('undefined feed type');	
				break;
		}
	}
	
	moreFollowFeed = e.more;
	
	if (moreFollowFeed)
		rows.push(createMoreCell());
	
	feedtv.setData(rows);
});

Ti.App.addEventListener('didGetMoreFollowFeed', function(e)
{
	Ti.API.info('didGetMoreFollowFeed');
	followFeeds = followFeeds.concat(e.data);
	var rows = [];
	
	for (var i in followFeeds)
	{
		var feed = followFeeds[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				rows.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				rows.push(createCommentCell(feed));
				break;
			
			case 'like':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				rows.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				rows.push(createSetReminderCell(feed));
				break;
				
			case 'badge':
				rows.push(createGainBadgeCell(feed));
				break;
			
			case 'topfan':
				rows.push(createTopFanCell(feed));
				break;
			
			default:
				Ti.API.info('undefined feed type');	
				break;
		}
	}
	
	moreFollowFeed = e.more;
	
	if (moreFollowFeed)
		rows.push(createMoreCell());
	
	feedtv.setData(rows);
});

feedManager.getNewsFeed();