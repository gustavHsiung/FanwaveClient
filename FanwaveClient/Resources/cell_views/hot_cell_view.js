// hot cell view


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