// current user




var CurrentUser = {
	
	username: '',
	password: '',
	nickname: '',
	email: '',
	jid: '',
	jid_password: '',
	fb_uid: '',
	badgeID: '',
	privacy: {},
	extra_info: {},
	scores: {},
	first_login: false,
	getUsername: function () {return username},
	setUsername: function (data) {username = data},
	setPassword: function (data) {password = data},
	setNickname: function (data) {nickname = data},
	setJid: function (data) {jid = data},
	setJidPassword: function (data) {jid_password = data},
	setBadgeID: function (data) {badgeID = data},
	setFirstLogin: function (data) {first_login = data},
	setPrivacy: function (data) { 
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
	setExtraInfo: function (data) { 
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
	setScores: function (data) { 
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


////////////////////////////////////////////////////////////
/*
var CurrentUser = (function() {

	// private
	var username = '';
	var password = '';
	var nickname = '';
	var email = '';
	var jid = '';
	var jid_password = '';
	var fb_uid = '';
	var badgeID = '';
	var privacy = {};
	var extra_info = {};
	var scores = {};
	var first_login = false;
	
	
	return {
	// public
		getUsername: function () {return username},
		setUsername: function (data) {username = data},
		setPassword: function (data) {password = data},
		setNickname: function (data) {nickname = data},
		setJid: function (data) {jid = data},
		setJidPassword: function (data) {jid_password = data},
		setBadgeID: function (data) {badgeID = data},
		setFirstLogin: function (data) {first_login = data},
		setPrivacy: function (data) { 
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
		setExtraInfo: function (data) { 
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
		setScores: function (data) { 
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
})();
*/
function setCurrentUser (user_data)
{
	CurrentUser.setUsername(user_data.username);
	CurrentUser.setPassword(user_data.password);
	CurrentUser.setNickname(user_data.nickname);
	CurrentUser.setJid(user_data.fanwaveJID);
	CurrentUser.setJidPassword(user_data.fanwavePassword);
	CurrentUser.setBadgeID(user_data.badgeID.badgeID);
	CurrentUser.setFirstLogin(user_data.firstLogin);
	CurrentUser.setPrivacy(user_data.privacy);
	CurrentUser.setExtraInfo(user_data.extraInfo);
	CurrentUser.setScores(user_data.score);
	
	Ti.App.fireEvent('didUpdateCurrentUser', {data: CurrentUser});
};


Ti.App.addEventListener('currentUserRequest', function()
{
	Ti.App.fireEvent('currentUserResponse', {data: CurrentUser});
});