// login view


Ti.include("./managers/login_manager.js");

// window container
//
var loginWin = Titanium.UI.createWindow({
	height:app.win_width,
	width:app.win_width
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

emailtf.addEventListener('return', function()
{
	emailtf.blur();
	passtf.focus();
});

passtf.addEventListener('return', function()
{
	passtf.blur();
});

loginWin.add(emailtf);
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

loginbt.addEventListener('click', function()
{
	loginManager.login(emailtf.value, passtf.value);
});

loginWin.add(loginbt);


// login listener
//
Ti.App.addEventListener('didLoginFanwave', function(e)
{
	Ti.API.info('login view didLoginFanwave');
	loginWin.close();
});


loginWin.open();