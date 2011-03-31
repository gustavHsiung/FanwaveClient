// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
	url:'main_windows/feed.js',
    title:'Waves',
    backgroundColor:'#fff',
    navBarHidden: true
});
var tab1 = Titanium.UI.createTab({  
    title:'Waves',
    window:win1
});


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
	url:'main_windows/friend.js',
    title:'Friends',
    backgroundColor:'#fff',
    navBarHidden: true
});
var tab2 = Titanium.UI.createTab({  
    title:'Friends',
    window:win2
});


//
// create controls tab and root window
//
var win3 = Titanium.UI.createWindow({  
	url:'main_windows/hot.js',
    title:'Hot',
    backgroundColor:'#fff',
    navBarHidden: true
});
var tab3 = Titanium.UI.createTab({  
    title:'Hot',
    window:win3
});


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);

// open tab group
tabGroup.open();


Ti.include("views/login_view.js");
