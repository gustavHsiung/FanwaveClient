// network utility

function createHeader(request)
{
Ti.API.info('createHeader username: '+ Ti.App.Properties.getList('user')[0].value);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	request.setRequestHeader('username', Ti.App.Properties.getList('user')[0].value);//'ken.sun@wildmindcorp.com');
	request.setRequestHeader('jid', '52dbf068-eeab-4a85-8d88-0a3f1af9b881@xmpp.fanwave.me');
	request.setRequestHeader('country', 'tw');
	request.setRequestHeader('timezone', '8');
};