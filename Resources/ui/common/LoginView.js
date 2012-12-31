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
	// Connexion
	loginButton.addEventListener('click', function(e) {
		logPass=false;
		if(loginField.value != '' && passwordField != ''){
			logPass=connexi(loginField, passwordField)
		}
		else{
			alert("Veuillez renseigner tous les champs")
		}
	//	logPass = true;
		if(logPass == true){			
		self.fireEvent('loginSuccessful', {
			
		});
		}
	});
	self.add(loginButton);
	
	var createAccountButton = Button("Créer un compte Mobitalent");
	createAccountButton.addEventListener('click', function(e) {
		self.fireEvent('createAccountSuccessful', {
			
		});
	});
	
	self.add(createAccountButton);
	
	var videoButton = Button("video");
	videoButton.addEventListener('click', function(e) {
		self.fireEvent('videoSuccessful', {
			
		});
	});
	
	self.add(videoButton);
	
	
	
	
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

function connexi(login, password){
	var db = Ti.Database.open('MobileTalent');	
	var rows = db.execute('SELECT userPSEUDO, userPASSW FROM users');
	logPass=false;
	while (rows.isValidRow()) {
		/*alert("pseudo "+rows.fieldByName('userPSEUDO')+" passW="+rows.fieldByName('userPASSW'));
		alert("pseudo1 "+login.value+" passW1="+password.value);*/
			if(login.value == rows.fieldByName('userPSEUDO') && password.value == rows.fieldByName('userPASSW'))
				logPass=true;
			rows.next();
		}
		rows.close();
	
	db.close();
	return logPass;
}




module.exports = LoginView;
