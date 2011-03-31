// user data structure

function User (user_info) 
{
	this.username = user_info.username;
	this.nickname = user_info.nickname;
	this.udid = user_info.udid;
	this.device_token = user_info.pns_token;
	this.email = user_info.email;
	this.jid = user_info.fanwaveJID;
	this.fb_uid = user_info.facebookUid;
	this.badgeID = user_info.badgeID.badgeID;
	this.last_wave_in = {
						 title: user_info.lastcheckin.title,
						 sub_title: user_info.lastcheckin.sub_title,
						 channel: user_info.lastcheckin.channel,
						 country: user_info.lastcheckin.country,
						 start_time: user_info.lastcheckin.start_time,
						 end_time: user_info.lastcheckin.end_time,
						 pgid: user_info.lastcheckin.pgid
						 };
	this.last_stay_in = {
						 title: user_info.lastchatroom.title,
						 sub_title: user_info.lastchatroom.sub_title,
						 channel: user_info.lastchatroom.channel,
						 country: user_info.lastchatroom.country,
						 start_time: user_info.lastchatroom.start_time,
						 end_time: user_info.lastchatroom.end_time,
						 pgid: user_info.lastchatroom.pgid
						 };
	this.privacy = {
					reminder: user_info.seereminder,
					splash: user_info.pokeme,
					chatroom: user_info.seechatroom,
					email: user_info.seeemail,
					sex: user_info.seeSex,
					birth: user_info.seeBirth,
					facebook: user_info.seefacebook
					};
	this.extra_info = {
					   mood: user_info.extraInfo.mood,
					   sex: user_info.extraInfo.sex,
					   bio: user_info.extraInfo.bio,
					   website: user_info.extraInfo.website,
					   youtube: user_info.extraInfo.youtube,
					   location: {
					   			  city: user_info.extraInfo.location.city,
					   			  longitude: user_info.extraInfo.location.longitude,
					   			  latitude: user_info.extraInfo..location.latitude
					   			  }
					   };
	this.scores = {
					follow: user_info.score.followNum,
					rate: user_info.score.rateNum,
					friend: user_info.score.friendNum,
					friend_invite: user_info.score.friendInviteNum,
					friend_accept: user_info.score.friendAcceptNum,
					comment: user_info.score.commentNum,
					wave_in: user_info.score.checkInNum,
					like: user_info.score.likeNum,
					liked: user_info.score.likedNum,
					dislike: user_info.score.dislikeNum,
					disliked: user_info.score.dislikedNum,
					badge: user_info.score.badgeNum,
					point: user_info.score.points
					};
};