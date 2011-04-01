// #### The app singleton handling app startup

var app = {
    // Version number - used in database handling
    version: '1.0',
    
    // Initiate app
    init: function(){// this sets the background color of the master UIView (when there are no windows/tab groups on it)
    Titanium.UI.setBackgroundColor('#000');
    
    // setup window size
    var win_width=Titanium.Platform.displayCaps.platformWidth;
    var win_height=Titanium.Platform.displayCaps.platformHeight;
    var viewContainerHEIGHT=(Ti.Platform.osname!='android')?win_height*(3/4):win_height*(6/7);
    Ti.API.info('Ti.Platform.osname:\t'+Ti.Platform.osname);
    
    // create tab group
    var tabGroup = Titanium.UI.createTabGroup();
    
    //
	// create base UI tab and root window
	//
	var win1 = Titanium.UI.createWindow({  
		url:'main_windows/feed.js',
 	   	title:'Waves',
 	   	backgroundImage: 'pics/BG.png',
 	   	barColor:'#222',
   	 	navBarHidden: true
	});
	var tab1 = Titanium.UI.createTab({  
		title:'Waves',
	    icon:'pics/tab_1.png',
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
  	  icon:'pics/tab_2.png',
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
	    icon:'pics/tab_3.png',
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
 },// end of Initiate app
 
};

app.init();
