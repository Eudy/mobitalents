//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var Theme = require('ui/mobi/Theme');
	var LoginView = require('ui/common/LoginView');
	var BrowseView = require('ui/common/BrowseView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});
		
	//construct UI
	var loginView = new LoginView();
	self.add(loginView);
	
	loginView.addEventListener('loginSuccessful', function(e) {
		var browseView = new BrowseView();
		var browseWindow = Ti.UI.createWindow({
			backgroundColor: Theme.backgroundColor,
			navBarHidden:true,
			exitOnClose:true
		});
		browseWindow.add(browseView);
		browseWindow.open();
	});
	
	// TEST
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
