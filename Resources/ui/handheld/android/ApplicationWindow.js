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
	var loginWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});
	loginWindow.add(loginView);
	loginWindow.open();
	
	var browseView = new BrowseView();
	var browseWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});
	
	browseWindow.add(browseView);	
		
	// Lorsque la connexion est réussie
	Ti.App.addEventListener('loginSuccessful', function(e) {
		Ti.API.info('Login Successful')
		browseWindow.open();
	});
	
	// Déconnexion
	Ti.App.addEventListener('logoutSuccessful', function(e) { 
		Ti.API.info('Logout Successful');
		loginWindow.open();
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
