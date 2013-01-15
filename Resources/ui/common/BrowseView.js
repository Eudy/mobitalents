// Parcourir les vidéos
var Paypal = require('ti.paypal');
var loginProfil = {
	idUser: '',
	envoie:'idl'
};
function BrowseView(winClose,winOpen) {

	var CHANNEL = "talenmobile";

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
		width: '100%',
		height: '100%',
		layout: 'vertical'
	});

	//create object instance, a parasitic subclass of Observable
	var hView = Ti.UI.createView({
		top: '5%',
		width: '100%',
		height: '80',
		layout: 'horizontal'
	});

	var logoutButton = Button("Déconnexion", '49%');
	logoutButton.addEventListener('click', function() {
		self.fireEvent('logoutSuccessful', {});
	});
	hView.add(logoutButton);
	var settingsButton = Button("Gérer mon compte", '49%', null, null, '1%');
	settingsButton.addEventListener('click', function(e) {
		self.fireEvent('settingSuccessful', {

		});
	});
	hView.add(settingsButton);

	self.add(hView);


	// Vue des vidéos
	//lireVideo(self);
	var videoUri = null;
	var recordButton = Button("Envoyer ma vidéo", '100%', null, '5%');
	recordButton.addEventListener('click', function(e) {
	   self.fireEvent('videoSuccessful', {

		});


	});
	self.add(recordButton);

	var achatVote = Button("Achat vote",'100%', null, '5%');
	achatVote.addEventListener('click', function(e) {
	   self.fireEvent('achatVoteSuccessful', {

		});


	});
	self.add(achatVote);




	var voirVideoButton = Button("Voir video",'100%', null, '5%');

	voirVideoButton.addEventListener('click', function(e) {
	   self.fireEvent('voirvideo', {

		});


	});
	self.add(voirVideoButton);
				
	
	


	

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
