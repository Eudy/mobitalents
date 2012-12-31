// Parcourir les vidéos
function BrowseView(winClose,winOpen) {
	var Theme = require('ui/mobi/Theme');
	var Button = require('ui/mobi/Button');
	var LoginView = require('ui/common/LoginView');
	var SettingView = require('ui/common/SettingView');

	var loginView = new LoginView();
	var loginWindow = Ti.UI.createWindow({
		backgroundColor: Theme.backgroundColor,
		navBarHidden:true,
		exitOnClose:true
	});




	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView({
		top: '7.5%',
		left: '5%',
		width: '90%',
		height: '95%',
		layout: 'vertical'
	});

	//create object instance, a parasitic subclass of Observable
	var hView = Ti.UI.createView({
		top: '5%',
		width: '100%',
		height: '80',
		layout: 'horizontal'
	});

	var logoutButton = Button("Déconnexion", '39%');
	logoutButton.addEventListener('click', function() {
	//loginWindow.open();
	//winClose.close();
		 Ti.UI.createNotification({
        duration: Ti.UI.NOTIFICATION_DURATION_LONG,
        message: 'Saved to: '
    }).show();



	});
	hView.add(logoutButton);



	var settingsButton = Button("Gérer mon compte", '59%', null, null, '2%');
	settingsButton.addEventListener('click', function(e) {
		self.fireEvent('settingSuccessful', {

		});
	});


	var nameButton = Button("name", '59%', null, null, '2%');


	hView.add(settingsButton);
	self.add(nameButton);


	self.add(hView);
	var videoUri = null;
	var recordButton = Button("Envoyer ma vidéo", '100%', null, '5%');
	recordButton.addEventListener('click', function(e) {
	   self.fireEvent('videoSuccessful', {
			
		});


	});
	self.add(recordButton);



	nameButton.addEventListener('click', function() {
    Ti.UI.createNotification({
        duration: Ti.UI.NOTIFICATION_DURATION_LONG,
        message: 'Saved to: '
    }).show();
});







	//create object instance, a parasitic subclass of Observable
	var othersVideosView = Ti.UI.createView({
		top: '5%',
		width: '100%',
		height: '80',
		layout: 'horizontal'
	});

	var otherRegionsButton = Button("Autres régions", '39%');
	othersVideosView.add(otherRegionsButton);
	var allVideosButton = Button("Toutes les vidéos", '59%', null, null, '2%');
	othersVideosView.add(allVideosButton);

	self.add(othersVideosView);

	var footer = Ti.UI.createView({
		bottom: 0,
		height: '50'
	})

	var footerMentions = Ti.UI.createView({
		layout: 'vertical'
	})

	var author = Ti.UI.createLabel({
		width: '100%',
		color: '#555',
		text: 'Créé par Daniel Seng et Djaber Bouzekoula',
		textAlign: 'center',
		font:{
			textSize: '14'
		}
	})

	var mentionCeri = Ti.UI.createLabel({
		width: '100%',
		color: '#555',
		text: 'CERI - M2ALINFO E-commerce',
		textAlign: 'center',
		font:{
			textSize: '14'
		}
	})

	footerMentions.add(author);
	footerMentions.add(mentionCeri);
	footer.add(footerMentions);

	self.add(footer);

	return self;
}








module.exports = BrowseView;
