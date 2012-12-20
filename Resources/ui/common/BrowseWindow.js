//Application Window Component Constructor
function BrowseWindow() {
	//load component dependencies
	var Theme = require('ui/mobi/Theme');
	var LoginView = require('ui/common/LoginView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});
	
	var browseView = new BrowseView();
	self.add(browseView);	
	
	return self;
}

//make constructor function the public component interface
module.exports = BrowseWindow;
