// current user
//
// as a shared instance, this file should be included only once
// for avoiding shared variable being re-initilalzed

var username = '';
var password = '';
var nickname = '';
var email = '';
var jid = '';
var jid_password = '';
var badgeID = '';
var privacy = '';
var extra_info = {};
var scores = {};
var first_login = {};

var CurrentUser = {

	init: function ()
	{
		this.user_info = Ti.App.Properties.getList('user_info');
		if(this.user_info) 
		{
			setCurrentUser(this.user_info[0]);
			Ti.API.info('current user: ' + CurrentUser.getUsername());
		}
	},
	
	// getter
	getUsername: 	function () {return username},
	getPassword: 	function () {return password},
	getNickname: 	function () {return nickname},
	getEmail:		function () {return email},
	getJid:			function () {return jid},
	getJidPassword: function () {return jid_password},
	getBadgeID:		function () {return badgeID},
	getPrivacy:		function () {return privacy},
	getExtraInfo:	function () {return extra_info},
	getScores:		function () {return scores},
	isFirstLogin:	function () {return first_login},
	// setter
	setUser: 		function (user_data) {setCurrentUser(user_data);},
	setUsername: 	function (data) {username = data},
	setPassword: 	function (data) {password = data},
	setNickname: 	function (data) {nickname = data},
	setEmail: 	 	function (data) {email = data},
	setJid: 	 	function (data) {jid = data},
	setJidPassword: function (data) {jid_password = data},
	setBadgeID: 	function (data) {badgeID = data},
	setFirstLogin:  function (data) {first_login = data},
	
	setPrivacy: function (data) 
	{
		privacy = {
					reminder: data.seereminder,
					splash: data.pokeme,
					chatroom: data.seechatroom,
					email: data.seeemail,
					sex: data.seeSex,
					birth: data.seeBirth,
					facebook: data.seefacebook
					}; 
	},
	setExtraInfo: function (data) 
	{ 
		extra_info = {
						mood: data.mood,
					   	sex: data.sex,
					   	bio: data.bio,
					  	website: data.website,
					   	youtube: data.youtube,
					   	location: {
					   			 	city: data.location.city,
					   			 	longitude: data.location.longitude,
					   			 	latitude: data.location.latitude
					   			  	}
					   }; 
	},
	setScores: function (data) 
	{ 
		scores = {
					follow: data.followNum,
					rate: data.rateNum,
					friend: data.friendNum,
					friend_invite: data.friendInviteNum,
					friend_accept: data.friendAcceptNum,
					comment: data.commentNum,
					wave_in: data.checkInNum,
					like: data.likeNum,
					liked: data.likedNum,
					dislike: data.dislikeNum,
					disliked: data.dislikedNum,
					badge: data.badgeNum,
					point: data.points
					}; 
	}
};

function setCurrentUser (user_data)
{
	CurrentUser.setUsername(user_data.username);
	CurrentUser.setPassword(user_data.password);
	CurrentUser.setNickname(user_data.nickname);
	CurrentUser.setEmail(user_data.email);
	CurrentUser.setJid(user_data.fanwaveJID);
	CurrentUser.setJidPassword(user_data.fanwavePassword);
	CurrentUser.setBadgeID(user_data.badgeID.badgeID);
	CurrentUser.setFirstLogin(user_data.firstLogin);
	CurrentUser.setPrivacy(user_data.privacy);
	CurrentUser.setExtraInfo(user_data.extraInfo);
	CurrentUser.setScores(user_data.score);
	
	var array = [user_data];
	Ti.App.Properties.setList('user_info', array);

	Ti.App.fireEvent('didUpdateCurrentUser');
};

CurrentUser.init();