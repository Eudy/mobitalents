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
	var db = Ti.Database.open('MobileTalent');
db.execute("CREATE TABLE IF NOT EXISTS users (userID INTEGER PRIMARY KEY, userPSEUDO TEXT, userVILLE INTEGER, userPASSW TEXT, userMAIL TEXT)");
db.execute("CREATE TABLE IF NOT EXISTS videos (videoID INTEGER PRIMARY KEY, videoNAME TEXT, videoUSERID INTEGER,videoREGION TEXT, videoVOTE INTEGER, videoVALIDATE INTEGER, videoLIEN TEXT, videoDate DATE, FOREIGN KEY(videoUSERID) REFERENCES users(userID))");

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
		//exitOnClose:true
	});
		
	//construct UI
	var loginView = new LoginView();
	self.add(loginView);
	
	
	var browseWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
		//exitOnClose:true
	});
	
	var browseView = new BrowseView(browseWindow, self);
	
	
	var registerWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		//navBarHidden:true,
		//exitOnClose:true
	});
	
	
	var registerView = new RegisterView(registerWindow, self);
	
		
	// Lorsque la connexion est réussie
	loginView.addEventListener('loginSuccessful', function(e) {
		browseWindow.add(browseView);
		browseWindow.open();
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
	
	
	
	

	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
