var win = Titanium.UI.currentWindow;

// input variables
//
var currentUser = win.currentUser;

var web = Ti.UI.createWebView({
	url: 'http://www.fanwave.tv/JSMVC/beagle/beagle.html'
});
win.add(web);

web.addEventListener('load', function () {
	var action = '$(\"#userName\").val(\"ken.sun@wildmindcorp.com\");$(\"#password\").val(\"wewe\");$(\"#logInButton\").click();';
	//web.evalJS(action);
});