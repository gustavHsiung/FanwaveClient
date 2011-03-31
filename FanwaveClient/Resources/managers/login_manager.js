// login manager

Ti.include("./constant.js");
Ti.include("./utils/network.js");

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
		createHeader(c);
		c.send({username: username, password: password, language: lang});
	}
};

Ti.App.addEventListener('didLoginFanwave', function(e)
{
	Ti.API.info('loginManager: '+ e.data.username+' didLoginFanwave');
	var userInfo = [
        {title:'username',value:e.data.username},
        {title:'nickname',value:e.data.nickname}
    ];
	Ti.App.Properties.setList('user',userInfo);
	var user = e.data;
});