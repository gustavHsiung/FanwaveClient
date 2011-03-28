// more cell view


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