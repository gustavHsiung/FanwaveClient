// network utility

function createHeader(request, currentUser)
{
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	request.setRequestHeader('username', currentUser.getUsername());
	request.setRequestHeader('jid', currentUser.getJid());
	request.setRequestHeader('country', 'tw');
	request.setRequestHeader('timezone', '8');
};