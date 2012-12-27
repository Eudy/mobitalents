//FirstView Component Constructor
function RegisterView(winClose, winOpen) {
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
		
	var pseudoField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '5%',
		hintText: 'Pseudo',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT
	})
	
	self.add(pseudoField);

	var villeField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '1%',
		bottom: '1%',
		hintText: 'Ville',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
	})
	
	self.add(villeField);
	
	var adressMailField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '1%',
		bottom: '1%',
		hintText: 'Adresse mail',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
	})
	
	self.add(adressMailField);
	
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
	
	

	
	
	
	var returnButton = Button("RETOUR");
	
	self.add(returnButton);
	
	var validateButton = Button("VALIDER");
	// Connexion
	validateButton.addEventListener('click', function(e) {
		var validate=validateForm(pseudoField, villeField, adressMailField, passwordField);
		if(validate == true){
			
			saveUser(pseudoField, villeField, adressMailField, passwordField);
			
		}
		
	});
	self.add(validateButton);
	
//	self.add(hView);
	
	
	
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

function validateForm(pseudoField, villeField, adressMailField, passwordField){
	alert(pseudoField.value);
	
	if (pseudoField.value == '' || villeField.value == '' || adressMailField.value == '' || passwordField.value == ''){
		validateForm = false;
		alert("veuillez remplir tous les champs");
	}
	else
		validateForm = true;
	
	
	return validateForm;
}

function saveUser(pseudo, ville, adressMail, password){
	var db = Ti.Database.open('MobileTalent');	
	var rows = db.execute('SELECT userPSEUDO FROM users');
	existPseudo=false;
	while (rows.isValidRow()) {
			if(pseudo.value == rows.fieldByName('userPSEUDO'))
				existPseudo=true;
			rows.next();
		}
		rows.close();
	if(existPseudo==false){
		db.execute('INSERT INTO users (userPSEUDO, userVILLE, userPASSW, userMAIL) values (?, ?, ?, ?)', pseudo.value, ville.value, adressMail.value, password.value);
		
		alert("fait");
	}
	db.close();
}







module.exports = RegisterView;
