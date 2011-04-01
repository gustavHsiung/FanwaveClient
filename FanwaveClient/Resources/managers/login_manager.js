// login manager


var loginManager = {

	login: function(username, password) {
		var lang = Titanium.Locale.currentLanguage;
		var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
		c.onload = function()
		{
			switch(this.status)
			{
				case 200:
					var parsedData = JSON.parse(this.responseData);
					Ti.App.fireEvent('didLoginFanwave', {data: parsedData});
					break;
					
				case 409:
					var errorMsg = this.responseText;
					Ti.API.info(errorMsg);
					break;
			}
		};
	
		c.open('POST', baseUrl + 'member/user/login');
		createHeader(c, CurrentUser);
		c.send({username: username, password: password, language: lang});
	}
};

Ti.App.addEventListener('didLoginFanwave', function(e)
{
	Ti.API.info('login_manager: didLoginFanwave '+ e.data.username);
	CurrentUser.setUser(e.data);
});