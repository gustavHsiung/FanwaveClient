var win = Titanium.UI.currentWindow;


// variables and functions inclusion
//
Ti.include("../constant.js");
Ti.include("../managers/feed_manager.js");
Ti.include("../cell_views/feed_cell_view.js");
Ti.include("../cell_views/more_cell_view.js");


// feed array
//
var newsFeeds = [];
var friendFeeds = [];
var followFeeds = [];


// feed tabbed bar
//
var feedtb = Titanium.UI.createTabbedBar({
	labels:['News', 'Friend', 'Follow'],
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	top:0,
	height:40,
	width:320,
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
			feedManager.getFollowFeed(username);
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
			if (index == newsFeeds.length-1 && feedManager.moreNewsFeed)
			{
				newsFeeds[index] = createLoadingMoreCell();
				feedtv.setData(newsFeeds);
				feedManager.getMoreNewsFeed(newsFeeds[index-1]);
			}
			break;
			
		case 1:
			if (index == friendFeeds.length-1 && feedManager.moreFriendFeed)
			{
				friendFeeds[index] = createLoadingMoreCell();
				feedtv.setData(friendFeeds);
				feedManager.getMoreFriendFeed(friendFeeds[index-1]);
			}
			break;
			
		case 2:
			if (index == followFeeds.length-1 && feedManager.moreFollowFeed)
			{
				followFeeds[index] = createLoadingMoreCell();
				feedtv.setData(followFeeds);
				feedManager.getMoreFollowFeed(username, friendFeeds[index-1]);
			}
			break;
	}
};

// feed table view
//
var feedtv = Titanium.UI.createTableView({
	style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
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
	newsFeeds = [];
	
	for (var i in e.data)
	{
		var feed = e.data[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				newsFeeds.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				newsFeeds.push(createCommentCell(feed));
				break;
			
			case 'like':
				newsFeeds.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				newsFeeds.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				newsFeeds.push(createSetReminderCell(feed));
				break;
				
			case 'badge':	
				newsFeeds.push(createGainBadgeCell(feed));
				break;
			
			default:
				Ti.API.info('default');	
				break;
		}
	}
	
	if (feedManager.moreNewsFeed)
		newsFeeds.push(createMoreCell());
	
	feedtv.setData(newsFeeds);
});


// friend feed callback
//
Ti.App.addEventListener('didGetFriendFeed', function(e)
{
	Ti.API.info('didGetFriendFeed');
	friendFeeds = [];
	
	for (var i in e.data)
	{
		var feed = e.data[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				friendFeeds.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				friendFeeds.push(createCommentCell(feed));
				break;
			
			case 'like':
				friendFeeds.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				friendFeeds.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				friendFeeds.push(createSetReminderCell(feed));
				break;
				
			case 'badge':	
				friendFeeds.push(createGainBadgeCell(feed));
				break;
			
			default:
				Ti.API.info('default');	
				break;
		}
	}
	
	if (feedManager.moreFriendFeed)
		friendFeeds.push(createMoreCell());
	
	feedtv.setData(friendFeeds);
});


// follow feed callback
//
Ti.App.addEventListener('didGetFollowFeed', function(e)
{
	Ti.API.info('didGetFollowFeed');
	followFeeds = [];
	
	for (var i in e.data)
	{
		var feed = e.data[i];
		
		switch (feed.activity)
		{
			case 'checkin':
				friendFeeds.push(createWaveInCell(feed));
				break;
			
			case 'comment':
				followFeeds.push(createCommentCell(feed));
				break;
			
			case 'like':
				followFeeds.push(createCommentRatingCell(feed));
				break;
				
			case 'dislike':
				followFeeds.push(createCommentRatingCell(feed));
				break;
				
			case 'reminder':
				followFeeds.push(createSetReminderCell(feed));
				break;
				
			case 'badge':
				followFeeds.push(createGainBadgeCell(feed));
				break;
			
			default:
				Ti.API.info('default');	
				break;
		}
	}
	
	if (feedManager.moreFollowFeed)
		followFeeds.push(createMoreCell());
	
	feedtv.setData(followFeeds);
});

feedManager.getNewsFeed();