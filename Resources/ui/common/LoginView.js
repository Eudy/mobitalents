//FirstView Component Constructor
function LoginView() {
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
	
	var logo = Ti.UI.createImageView({
		url: '/mgt-logo.png',
		width: '100%',
		bottom: '5%'
	});
	self.add(logo);	
	
	
	var newButton = Button("Créer un compte Mobitalents");
	self.add(newButton);
	
	//create object instance, a parasitic subclass of Observable
	var hView = Ti.UI.createView({
		top: '5%',
		width: '100%',
		height: '80',
		layout: 'horizontal'
	});	
	
	
	var loginField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '5%',
		hintText: 'Mon identifiant Mobitalents',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT
	})
	
	self.add(loginField);

	var passwordField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '1%',
		bottom: '1%',
		hintText: 'Mon mot de passe',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		passwordMask: true
	})
	
	self.add(passwordField);
	
	var loginButton = Button("Connexion");
	self.add(loginButton);
	
	Ti.Facebook.addEventListener('login', function(e) {
	    if (e.success) {
	        alert('Logged in');
	    }
	});
	Ti.Facebook.addEventListener('logout', function(e) {
	    alert('Logged out');
	});
		
	var facebookButton = Ti.Facebook.createLoginButton();
	
	facebookButton.addEventListener('click', function(e) {
  		Titanium.Facebook.authorize();
	});

	hView.add(facebookButton);
	
	var cameraButton = Button("Camera");
	cameraButton.addEventListener('click', function(e) {
	    var intent = Titanium.Android.createIntent({ action: 'android.media.action.VIDEO_CAPTURE' });
	    Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
	        if (e.error) {
	            Ti.UI.createNotification({
	                duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                message: 'Error: ' + e.error
	            }).show();
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
	self.add(cameraButton);
	
	self.add(hView);
	
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

module.exports = LoginView;
