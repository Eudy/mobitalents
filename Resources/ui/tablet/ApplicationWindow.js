//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var Theme = require('ui/mobi/Theme');
	var userInfo = require('ui/mobi/InfoUser');	
	var LoginView = require('ui/common/LoginView');
	var BrowseView = require('ui/common/BrowseView');
	var RegisterView = require('ui/common/RegisterView');
	var SettingView = require('ui/common/SettingView');	
	var RecordVideoView = require('ui/common/RecordVideoView');	
	
	var userSession = JSON.parse(Ti.App.Properties.getString("userSession"));	
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
		//exitOnClose:true
	});
		
	//construct UI
	var loginWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor
	});
	var loginView = new LoginView(loginWindow, self);
	loginWindow.add(loginView);
	
	var browseWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
		//exitOnClose:true
	});
	
	var browseView = new BrowseView(browseWindow, self);
	browseWindow.add(browseView);
	
	var registerWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
		//exitOnClose:true
	});
	
	
	var registerView = new RegisterView(registerWindow, Theme.id);
		
	// Lorsque la connexion est réussie
	loginView.addEventListener('loginSuccessful', function(user) {
		// Si l'utilisateur n'a pas enregistré ses informations de connexion
		if(!userSession) {
			// On sauvegarde dans les propriétés que la connexion est réussie
			Ti.App.Properties.setString("userSession", JSON.stringify(user));
		}
		browseWindow.open(); 
		
	});
	
	// Lorsque la deconnexion est réussie
	browseView.addEventListener('logoutSuccessful', function() {
		if(userSession) {
			// On sauvegarde dans les propriétés que la connexion est réussie
			Ti.App.Properties.removeProperty("userSession");
		}
		loginWindow.add(loginView);
		loginWindow.open();
	});
	
	var settingWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
	//	exitOnClose:false
	});
	var settingView = new SettingView(settingWindow, browseWindow);
	
	
	browseView.addEventListener('settingSuccessful', function(e) {
		settingWindow.add(settingView);
		settingWindow.open();
	});
	
	
	
	// formulaire d'inscription
	loginView.addEventListener('createAccountSuccessful', function(e) {
		//alert('ICI2');
		registerWindow.add(registerView);
		registerWindow.open();
	});
	
	var recordView = new RecordVideoView();
	var recordWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
	//	exitOnClose:true
	});
	
	
	loginView.addEventListener('videoSuccessful', function(e) {
		//alert('ICI2');
		recordWindow.add(recordView);
		recordWindow.open();
	});
	
	browseView.addEventListener('videoSuccessful', function(e) {
		//alert('ICI2');
		recordWindow.add(recordView);
		recordWindow.open();
	});
	
	/*var testView = new TestView();
	var testWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});*/
	
	registerView.addEventListener('testSuccessful', function(e) {
		//alert('ICI2');
		testWindow.add(testView);
		testWindow.open();
	});
	
	/*testView.addEventListener('logoutSuccessful', function(e) {
		alert('ICI2');
		//registerWindow.close();
		registerWindow.add(registerView);
		registerWindow.show();
	});*/
	
	
	// Si l'utilisateur est déjà logué on l'amene a la page des vidéos
	if(userSession!=null) {
		browseWindow.open();
	} else {
		loginWindow.open();
	}
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
