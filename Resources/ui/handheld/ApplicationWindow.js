//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var Theme = require('ui/mobi/Theme');
	var LoginView = require('ui/common/LoginView');
	var BrowseView = require('ui/common/BrowseView');
	var RegisterView = require('ui/common/RegisterView');
		
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
	
	var RegisterView = new RegisterView();
	var RegisterWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});
		
	// Lorsque la connexion est réussie
	loginView.addEventListener('loginSuccessful', function(e) {
		browseWindow.add(browseView);
		browseWindow.open();
	});
	
	// formulaire d'inscription
	RegisterView.addEventListener('createAccountSuccessful', function(e) {
		RegisterWindow.add(RegisterView);
		RegisterWindow.open();
	});
	
	
	
	// Déconnexion
	browseView.addEventListener('logoutSuccessful', function(e) {
		Ti.App.info('Fire logout');
		self.add(loginView);
		self.open();
	});
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
