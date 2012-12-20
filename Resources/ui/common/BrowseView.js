// Parcourir les vidéos
function BrowseView() {
	var Theme = require('ui/mobi/Theme');
	var Button = require('ui/mobi/Button');
		
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
		Ti.API.info('Click on logout');
		Ti.App.fireEvent('logoutSuccessful', {
			
		});
	});
	hView.add(logoutButton);
	
	var settingsButton = Button("Gérer mon compte", '59%', null, null, '2%');
	hView.add(settingsButton);
	
	self.add(hView);
	
	var recordButton = Button("Envoyer ma vidéo", '100%', null, '5%');
	recordButton.addEventListener('click', function(e) {
	    var intent = Titanium.Android.createIntent({ action: 'android.media.action.VIDEO_CAPTURE' });
	    Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
	        if (e.error) {
	            Ti.UI.createNotification({
	                duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                message: 'Error: ' + e.error
	            }).show();
	        // S'il n'y a pas d'erreur on sauvegarde la vidéo
	        } else {
	            if (e.resultCode === Titanium.Android.RESULT_OK) {
	                videoUri = e.intent.data;
	                Ti.UI.createNotification({
	                    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                    message: 'Video captured; now share or save it!'
	                }).show();
	                // note that this isn't a physical file! it's a URI in to the MediaStore.
	                shareButton.visible = true;
	                saveButton.visible = true;
	            } else {
	                Ti.UI.createNotification({
	                    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                    message: 'Canceled/Error? Result code: ' + e.resultCode
	                }).show();
	            }
	        }
	    });
	});	
	self.add(recordButton);
	
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
