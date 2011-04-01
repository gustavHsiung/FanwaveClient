// #### The app singleton handling app startup

Ti.include("utils/utils.app.js");
Ti.include("shared_instance/current_user.js");

var app = {
    // Version number - used in database handling
    version: '1.0',
    
    // Initiate app
    init: function()
    {
    	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
    	Titanium.UI.setBackgroundColor('#000');
    	
    	this.initEvents();
    
    	// setup window size
   		var win_width = Titanium.Platform.displayCaps.platformWidth;
    	var win_height = Titanium.Platform.displayCaps.platformHeight;
    	var viewContainerHEIGHT=(Ti.Platform.osname!='android')?win_height*(3/4):win_height*(6/7);
    	Ti.API.info('Ti.Platform.osname:\t'+Ti.Platform.osname);
    
    	// create tab group
    	this.tabGroup = Titanium.UI.createTabGroup();
    
    	//
		// create base UI tab and root window
		//
		var win1 = Titanium.UI.createWindow({  
			url:'main_windows/feed.js',
 	   		title:'Waves',
 	   		backgroundImage: 'pics/BG.png',
 	   		barColor:'#222',
   	 		navBarHidden: true,
   	 		currentUser: CurrentUser
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
 	   		navBarHidden: true,
 	   		currentUser: CurrentUser
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
   	 		navBarHidden: true,
   	 		currentUser: CurrentUser
		});
		var tab3 = Titanium.UI.createTab({  
	    	title:'Hot',
	    	window:win3
		});


		//
		//  add tabs
		//
		this.tabGroup.addTab(tab1);  
		this.tabGroup.addTab(tab2);  
		this.tabGroup.addTab(tab3);
 	},
 	// end of Initiate app
 
 	initEvents: function ()
 	{
 		Ti.App.addEventListener('didUpdateCurrentUser', _.bind(this.openTab, this));
 	},
 	
 	openTab: function() 
 	{
 		this.tabGroup.open();
 	},
};

app.init();


// check if need login
//
if(CurrentUser.getUsername() == undefined) {
	Ti.include("views/login_view.js");
}
else {
	app.openTab();
}
