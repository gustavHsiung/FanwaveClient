//////////////////////////////////////////////////////////////////////////////////
// wave cells 
//////////////////////////////////////////////////////////////////////////////////

function createWaveInCell (wave)
{
	var wave_info = wave.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: wave_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: 'wave-in ' + wave_info.title,
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

function createCommentCell (wave)
{
	var wave_info = wave.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: wave_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: wave_info.content + ' in ' + wave_info.title,
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

function createCommentRatingCell (wave)
{
	var wave_info = wave.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: wave_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: wave.activity + ' ' + wave_info.comment.content,
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

function createSetReminderCell (wave)
{
	var wave_info = wave.info;
	
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: wave_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: 'set a reminder for ' + wave_info.title,
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

function createGainBadgeCell (wave)
{
	var wave_info = wave.info;

	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: wave_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: 'gain ' + wave_info.title + ' from ' + wave_info.programTitle,
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

function createTopFanCell (wave)
{
	var wave_info = wave.info;

	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var nickname = Ti.UI.createLabel({
		text: wave_info.nickname,
		color: 'blue',
		textAlign: 'center',
		font: {fontSize: 14},
		height: 'auto',
		width: 100,
		left: 5
	});
	cell.add(nickname);
	
	var content = Ti.UI.createLabel({
		text: 'become Top Fan of ' + wave_info.title,
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


//////////////////////////////////////////////////////////////////////////////////
// hot cells 
//////////////////////////////////////////////////////////////////////////////////

function createFutureHotCell (hot) 
{
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var titlelb = Ti.UI.createLabel ({
		text: hot.name,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 250,
		left: 5
	});
	cell.add(titlelb);
	
	var hitlb = Ti.UI.createLabel ({
		text: hot.hits,
		color: 'blue',
		textAlign: 'right',
		font: {fontSize: 14},
		height: 'auto',
		width: 50,
		right: 5
	});
	cell.add(hitlb);
	
	return cell;
};

function createNowHotCell (hot)
{
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var titlelb = Ti.UI.createLabel ({
		text: hot.name,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 250,
		left: 5
	});
	cell.add(titlelb);
	
	var hitlb = Ti.UI.createLabel ({
		text: hot.hits,
		color: 'blue',
		textAlign: 'right',
		font: {fontSize: 14},
		height: 'auto',
		width: 50,
		right: 5
	});
	cell.add(hitlb);
	
	return cell;
};

function createWeekHotCell (hot)
{
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 'auto'
	});
	
	var titlelb = Ti.UI.createLabel ({
		text: hot.name,
		color: 'black',
		textAlign: 'left',
		font: {fontSize: 14},
		height: 'auto',
		width: 250,
		left: 5
	});
	cell.add(titlelb);
	
	var hitlb = Ti.UI.createLabel ({
		text: hot.hits,
		color: 'blue',
		textAlign: 'right',
		font: {fontSize: 14},
		height: 'auto',
		width: 50,
		right: 5
	});
	cell.add(hitlb);
	
	return cell;
};


//////////////////////////////////////////////////////////////////////////////////
// more cells 
//////////////////////////////////////////////////////////////////////////////////

function createMoreCell ()
{
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 50,
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var morelb = Ti.UI.createLabel ({
		text: 'More',
		color: 'black',
		textAlign: 'center',
		font: {fontSize: 20},
		height: 25,
		width: 'auto',
		visible: true
	});
	cell.add(morelb);
	
	return cell;
};

function createLoadingMoreCell () 
{
	var cell = Ti.UI.createTableViewRow ({
		width: 320,
		height: 50,
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var moreai = Ti.UI.createActivityIndicator ({
		height: 20,
		width: 20,
		top: 15,
		left: 150
	});
	moreai.show();
	cell.add(moreai);
	
	return cell;
};