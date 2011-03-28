// feed cell view


function createWaveInCell (feed)
{
	var feed_info = feed.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: feed_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: 'wave in ' + feed_info.title,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 200,
		left: 120
	});
	cell.add(content);
	
	return cell;
};

function createCommentCell (feed)
{
	var feed_info = feed.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: feed_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: feed_info.content + ' in ' + feed_info.title,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 200,
		left: 120
	});
	cell.add(content);
	
	return cell;
};

function createCommentRatingCell (feed)
{
	var feed_info = feed.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: feed_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: feed.activity + ' ' + feed_info.comment.content,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 200,
		left: 120
	});
	cell.add(content);
	
	return cell;
};

function createSetReminderCell (feed)
{
	var feed_info = feed.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: feed_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: 'set a reminder for ' + feed_info.title,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 200,
		left: 120
	});
	cell.add(content);
	
	return cell;
};

function createGainBadgeCell (feed)
{
	var feed_info = feed.info;

	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: feed_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: 'gain ' + feed_info.title + ' from ' + feed_info.programTitle,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 200,
		left: 120
	});
	cell.add(content);
	
	return cell;
};