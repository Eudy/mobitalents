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
	
	var browseView = new BrowseView();
	var browseWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});
	
	browseWindow.add(browseView);
		
	// Lorsque la connexion est réussie
	loginView.addEventListener('loginSuccessful', function(e) {
		var current = Titanium.UI.currentWindow;
		current.close();
		browseWindow.open();
	});
	
	// Déconnexion
	browseView.addEventListener('logoutSuccessful', function(e) {
		var current = Titanium.UI.currentWindow;
		current.close();
		Ti.API.log('Logout Successful');
		self.open();
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
