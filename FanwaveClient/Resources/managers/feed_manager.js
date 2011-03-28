// feed manager

Ti.include("../constant.js");
Ti.include("../utils/network.js");

var feedManager = {
	
	moreNewsFeed: false,
	moreFriendFeed: false,
	moreFollowFeed: false,
	
	getNewsFeed: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			moreNewsFeed = parseInt(feeds.more);
			Ti.App.fireEvent('didGetNewsFeed', {data:feeds.feeds});
		};
	
		c.open('GET', baseUrl + 'feed/all/get');
		createHeader(c);
		c.send();
	},
	
	getFriendFeed: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			moreNewsFeed = parseInt(feeds.more);
			Ti.App.fireEvent('didGetFriendFeed', {data:feeds.feeds});
		};
	
		c.open('GET', baseUrl + 'feed/friend/get');
		createHeader(c);
		c.send();
	},
	
	getFollowFeed: function(follower) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			moreNewsFeed = parseInt(feeds.more);
			Ti.App.fireEvent('didGetFollowFeed', {data:feeds.feeds});
		};
	
		c.open('POST', baseUrl + 'follow/programfeed/20/get');
		createHeader(c);
		c.send({username: follower});
	},
	
	getMoreNewsFeed: function(feed) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			moreNewsFeed = parseInt(feeds.more);
			Ti.App.fireEvent('didGetMoreNewsFeed', {data:feeds.feeds});
		};
	
		c.open('GET', baseUrl + 'feed/all/' + feed.feedID + '/prev');
		createHeader(c);
		c.send();
	},
	
	getMoreFriendFeed: function(feed) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			moreNewsFeed = parseInt(feeds.more);
			Ti.App.fireEvent('didGetMoreFriendFeed', {data:feeds.feeds});
		};
	
		c.open('GET', baseUrl + 'feed/friend/' + feed.feedID + '/prev');
		createHeader(c);
		c.send();
	},
	
	getMoreFollowFeed: function(follower, feed) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			moreNewsFeed = parseInt(feeds.more);
			Ti.App.fireEvent('didGetMoreFollowFeed', {data:feeds.feeds});
		};
	
		c.open('POST', baseUrl + 'follow/programfeed/' + feed.feedID + '/20/next');
		createHeader(c);
		c.send({username: follower});
	}
};
