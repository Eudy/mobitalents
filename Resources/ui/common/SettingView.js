//FirstView Component Constructor

var settingProfil = {
	idUser: '',
	envoie:'idl'
};
function SettingView(win, browseWindow) {
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
		hintText: 'Modifier Pseudo',
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
		hintText: 'Modifier ville',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT
	})

	self.add(villeField);



	var oldPasswordField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '1%',
		bottom: '1%',
		hintText: 'Ancien Mon mot de passe',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		passwordMask: true
	})

	self.add(oldPasswordField);

	var newPasswordField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '1%',
		bottom: '1%',
		hintText: 'Nouveau Mon mot de passe',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		passwordMask: true
	})

	self.add(newPasswordField);




	var adressMailField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		top: '1%',
		bottom: '1%',
		hintText: 'Modifier Adresse mail',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT
	})

	self.add(adressMailField);




	var cancelButton = Button("ANNULER");
	// Retour
	cancelButton.addEventListener('click', function(e) {
		win.close();
		browseWindow.open();
	});
	self.add(cancelButton);

	var validateButton = Button("VALIDER");
	// Connexion
	validateButton.addEventListener('click', function(e) {
		settingProfil.envoie='idl';
		settingUser(pseudoField, villeField, adressMailField, oldPasswordField, newPasswordField)
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




function settingUser(pseudo, ville, adressMail, oldPassword, newPassword){
	var InfoUser = require('ui/mobi/InfoUser');
	var xhr = Titanium.Network.createHTTPClient();
	alert("ici");
	if (settingProfil.envoie != 'idl') {
		alert( 'YouTube uploader already in use!');
		return;
	}
	xhr.onerror = function(e)
	{
		var	err = 'HTTP Error (last state: saveUser) (onerror: ' + e.error + ')';
		alert(err);
	};

xhr.onload = function(){
	alert("ici onload");
	 switch (settingProfil.envoie) {
    	case 'fait' :
    	 var json = JSON.parse(this.responseText);
    if (!json) {
        alert('Error - Null return!');
        return false;
    }
    	 if(json.Pseudo==true){
   		alert("Pseudo modifié");
   		
   		}
   		else if(json.Pseudo==false){}
   		else
   			alert(json.Pseudo);
   			
   	if(json.Mail==true){
   		alert("compte Mail ");
   		}
   	else if(json.Mail==false){}	
   	else
   		alert(json.Mail);
   			
   			
 if(json.PassW==true){
   		alert("Mot de passe modifié");
   		}
   		else if(json.PassW==false){}
   		else
   			alert(json.PassW);
   			
   			
   		 if(json.Ville==true){
   		alert("Ville Modifié");
   		}
   		
    	break;

    	default :
				Ti.API.info('Unknown state during YouTube upload!');
				var errormsg = 'Bad state ';
				Ti.App.fireEvent('youtube:error', {});
		break;
};
};
	var params = {
		  	requete:'settingUser',
		  	idPseudo:InfoUser.id,
            newPseudo: pseudo.value,
            villeU: ville.value,
            adressMailU:adressMail.value,
            oldPassword:oldPassword.value,
            newPassword:newPassword.value
        };
    settingProfil.envoie= 'fait';     
    xhr.open('POST', 'http://ceriyves.byethost7.com/DbAction.php');
	xhr.send(params);

}











module.exports = SettingView;
