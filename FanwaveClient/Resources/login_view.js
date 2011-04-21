// login view

Ti.include("constant.js");
Ti.include("utf8.js");

//////////////////////////////////////////////////////////////////////////////////
// functions 
//////////////////////////////////////////////////////////////////////////////////

// create request header utility
//
function createHeaderForRequest(request)
{
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	request.setRequestHeader('username', CurrentUser.getUsername());
	request.setRequestHeader('jid', CurrentUser.getJid());
	request.setRequestHeader('country', 'tw');
	request.setRequestHeader('timezone', '8');	
};


//////////////////////////////////////////////////////////////////////////////////
// variables 
//////////////////////////////////////////////////////////////////////////////////

/////////////////// non-UI variables ///////////////////

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
				{
					var parsedData;
			
					if (Ti.Platform.name == 'android') {
    					parsedData = JSON.parse(utf8.decode(this.responseText));
					}
					else if(Ti.Platform.name == 'iPhone OS'){
    					parsedData = JSON.parse(this.responseText);
					}
					
					Ti.App.fireEvent('didLoginFanwave', {data: parsedData});
				}
					break;
					
				case 409:
				{
					var errorMsg = this.responseText;
					Ti.API.info(errorMsg);
				}
					break;
			}
		};
	
		c.open('POST', baseUrl + 'member/user/login');
		createHeaderForRequest(c);
		c.send({username: username, password: password, language: lang});
	}
};


/////////////////// UI variables ///////////////////////

// create login window
//
var loginWin = Titanium.UI.createWindow({
	height: 480,
	width: 320
});
	
// background view
//
var bgView = Titanium.UI.createView({
	height:480,
	width:320,
	backgroundColor:'white',
	touchEnabled:false
});
loginWin.add(bgView);	
	
// login label
//
var loginlb = Titanium.UI.createLabel({
	text:'Login',
	color:'black',
	textAlign:'center',
	font:{fontSize:18,fontWeight:'bold'},
	height:20,
	width:'auto',
	top: 50
});
loginWin.add(loginlb);
	
// email label
//
var emaillb = Titanium.UI.createLabel({
	text:'Email',
	color:'black',
	textAlign:'center',
	font:{fontSize: 14},
	height:20,
	width:'auto',
	left: 20,
	top: 95
});
loginWin.add(emaillb);

// password label
//
var emaillb = Titanium.UI.createLabel({
	text:'Password',
	color:'black',
	textAlign:'center',
	font:{fontSize: 14},
	height:20,
	width:'auto',
	left: 20,
	top: 140
});
loginWin.add(emaillb);
	
// email text field
//
var emailtf = Titanium.UI.createTextField({
	color: '#336699',
	height: 35,
	top: 85,
	left: 100,
	width: 200,
	keyboardType: Titanium.UI.KEYBOARD_EMAIL,
	returnKeyType: Titanium.UI.RETURNKEY_NEXT,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
});
loginWin.add(emailtf);

// password text field
//
var passtf = Titanium.UI.createTextField({
	color: '#336699',
	height: 35,
	top: 130,
	left: 100,
	width: 200,
	passwordMask:true,
	keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
	borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
});
loginWin.add(passtf);

// login button
//
var loginbt = Titanium.UI.createButton({
	title: 'Login',
	top: 180,
	left: 230,
	height: 30,
	width: 70
});
loginWin.add(loginbt);


//////////////////////////////////////////////////////////////////////////////////
// event listener 
//////////////////////////////////////////////////////////////////////////////////

// email text field listener
//
emailtf.addEventListener('return', function()
{
	emailtf.blur();
	passtf.focus();
});

// password text field listener
//
passtf.addEventListener('return', function()
{
	passtf.blur();
});

// login button listener
//
loginbt.addEventListener('click', function()
{
	loginManager.login(emailtf.value, passtf.value);
});


// login fanwave response listener
//
Ti.App.addEventListener('didLoginFanwave', function(e)
{
	Ti.API.info('login_view: didLoginFanwave');
	CurrentUser.setUser(e.data);
	loginWin.close();
});


//////////////////////////////////////////////////////////////////////////////////
// actions
//////////////////////////////////////////////////////////////////////////////////

loginWin.open();