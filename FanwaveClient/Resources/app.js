// #### The app singleton handling app startup


// include shared instance
//
Ti.include("current_user.js");


// bind function utility
//
_ = {
	bind: function(func, scope){
        return function(){
            return func.apply(scope, Array.prototype.slice.call(arguments));
        }
    }
};

// main app
//
var app = {
    // Version number - used in database handling
    //
    version: '1.0',
    
    // Initiate app
    //
    init: function()
    {
    	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
    	//
    	Titanium.UI.setBackgroundColor('#000');
    	
    	// init event listener
    	//
    	this.initEvents();
    
    	// setup window size
    	//
   		var win_width = Titanium.Platform.displayCaps.platformWidth;
    	var win_height = Titanium.Platform.displayCaps.platformHeight;
    	var viewContainerHEIGHT=(Ti.Platform.osname!='android')?win_height*(3/4):win_height*(6/7);
    	Ti.API.info('Ti.Platform.osname:\t'+Ti.Platform.osname);
    
    	// create tab group
    	//
    	this.tabGroup = Titanium.UI.createTabGroup();
    
   		// create wave window
		//
		var win1 = Titanium.UI.createWindow({  
			url:'wave.js',
 	   		title:'Waves',
 	   		backgroundImage: 'pics/BG.png',
 	   		barColor:'#222',
   	 		navBarHidden: true,
   	 		currentUser: CurrentUser
		});
		var tab1 = Titanium.UI.createTab({  
			title:'Waves',
	    	icon:'pics/tab_1.png',
	    	window:win1
		});
		this.tabGroup.addTab(tab1);

		// create friend window
		//
		var win2 = Titanium.UI.createWindow({  
			url:'friend.js',
 		   title:'Friends',
 		   backgroundColor:'#fff',
 		   navBarHidden: true,
 		   currentUser: CurrentUser
		});
		var tab2 = Titanium.UI.createTab({  
 	 	  title:'Friends',
 	 	  icon:'pics/tab_2.png',
  		  window:win2
		});
		this.tabGroup.addTab(tab2);

		// create hot window
		//
		var win3 = Titanium.UI.createWindow({  
			url:'hot.js',
			title:'Hot',
  	  		backgroundColor:'#fff',
   	 		navBarHidden: true,
   	 		currentUser: CurrentUser
		});
		var tab3 = Titanium.UI.createTab({  
	    	title:'Hot',
	    	icon:'pics/tab_3.png',
	    	window:win3
		});
		this.tabGroup.addTab(tab3);
		
		// create websocket window
		//
		var win4 = Titanium.UI.createWindow({
			url: 'ws_feed.js',
			title: 'WS feed',
			backgroundColor:'#fff',
			navBarHidden: true,
			currentUser: CurrentUser
		});
		var tab4 = Titanium.UI.createTab({
			title: 'WS feed',
			window:win4
		});
		this.tabGroup.addTab(tab4);
 	},
 	// end of Initiate app
 
 	// initiate event listener
 	//
 	initEvents: function ()
 	{
 		Ti.App.addEventListener('didUpdateCurrentUser', _.bind(this.openTab, this));
 	},
 	
 	// open tab group
 	//
 	openTab: function() 
 	{
 		this.tabGroup.open();
 	},
};

app.init();


// check if need login
//

if(CurrentUser.getUsername().length == 0) {
	Ti.include("login_view.js");
}
else {
	app.openTab();
}
