//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var Theme = require('ui/mobi/Theme');
	var InfoUser = require('ui/mobi/InfoUser');
	var LoginView = require('ui/common/LoginView');
	var BrowseView = require('ui/common/BrowseView');
	var RegisterView = require('ui/common/RegisterView');
	var SettingView = require('ui/common/SettingView');	
	var RecordVideoView = require('ui/common/RecordVideoView');	
	var AchatVoteView = require('ui/common/AchatVoteView');	
	var VoirVideoView = require('ui/common/VoirVideo');	
	
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		height: '400',
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
	loginView.addEventListener('loginSuccessful', function(e) {
		var userInfo = require('ui/mobi/InfoUser');	
		InfoUser.id=e.id;
   	InfoUser.pseudo=e.pseudo;
		browseWindow.add(browseView);
		browseWindow.open(); 
		
	});
	
	var settingWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
	//	exitOnClose:false
	});
	var settingView = new SettingView(settingWindow, browseWindow);
	
	var voirVideoWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
	//	exitOnClose:false
	});
	var voirVideoView = new VoirVideoView(voirVideoWindow, browseWindow);
	browseView.addEventListener('voirvideo', function(e) {
		voirVideoWindow.add(voirVideoView);
		voirVideoWindow.open();
	});
	
	
	
	
	var achatVoteWindow= Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
	//	exitOnClose:false
	});
	
	var achatVoteView= new AchatVoteView(achatVoteWindow, browseWindow)
	browseView.addEventListener('achatVoteSuccessful', function(e) {
		achatVoteWindow.add(achatVoteView);
		achatVoteWindow.open();
	});
	
	
	
	
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
		
	registerView.addEventListener('testSuccessful', function(e) {
		//alert('ICI2');
		testWindow.add(testView);
		testWindow.open();
	});
	
	
		loginWindow.open();
	
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
