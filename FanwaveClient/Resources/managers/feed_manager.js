// feed manager

Ti.include("../constant.js");
Ti.include("../utils/network.js");

var feedManager = {

	getNewsFeed: function() {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			Ti.App.fireEvent('didGetNewsFeed', {data:feeds.feeds, more:parseInt(feeds.more,10)});
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
			Ti.App.fireEvent('didGetFriendFeed', {data:feeds.feeds, more:parseInt(feeds.more,10)});
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
			Ti.App.fireEvent('didGetFollowFeed', {data:feeds.feeds, more:parseInt(feeds.more,10)});
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
			Ti.App.fireEvent('didGetMoreNewsFeed', {data:feeds.feeds, more:parseInt(feeds.more,10)});
		};
		Ti.API.info('feed id: ' + feed.info.uuid);
		c.open('GET', baseUrl + 'feed/all/' + feed.info.uuid + '/prev');
		createHeader(c);
		c.send();
	},
	
	getMoreFriendFeed: function(feed) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			Ti.App.fireEvent('didGetMoreFriendFeed', {data:feeds.feeds, more:parseInt(feeds.more,10)});
		};
	
		c.open('GET', baseUrl + 'feed/friend/' + feed.info.uuid + '/prev');
		createHeader(c);
		c.send();
	},
	
	getMoreFollowFeed: function(follower, feed) {
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			var feeds = JSON.parse(this.responseData);
			Ti.App.fireEvent('didGetMoreFollowFeed', {data:feeds.feeds, more:parseInt(feeds.more,10)});
		};
	
		c.open('POST', baseUrl + 'follow/programfeed/' + feed.info.uuid + '/20/next');
		createHeader(c);
		c.send({username: follower});
	}
};
