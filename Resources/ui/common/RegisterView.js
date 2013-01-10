//FirstView Component Constructor

var createProfil = {
	reussi: false,
	envoie:'idl'
};
function RegisterView(winClose, winOpen) {
	var Theme = require('ui/mobi/Theme');
	var Button = require('ui/mobi/Button');
	var LoginView = require('ui/common/LoginView');
	var InfoUser = require('ui/mobi/InfoUser');	

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
		value:'',
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
		value:'',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT
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
		value:'',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT
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
		value:'',
		passwordMask: true
	})
	
	self.add(passwordField);
	
	var returnButton = Button("RETOUR");
	returnButton.addEventListener('click', function(e) {
		alert(createProfil.reussi);
	/*		pseudoField.value='';
           villeField.value='';
            adressMailField.value='';
            passwordField.value='' ;        
			winOpen.open();		
			winClose.close();*/				
		
	});
	self.add(returnButton);
	
	var validateButton = Button("VALIDER");
	// Connexion
	validateButton.addEventListener('click', function(e) {
		var validate=validateForm(pseudoField, villeField, adressMailField, passwordField);
		if(validate == true){	
		
		saveUser(pseudoField, villeField, adressMailField, passwordField);
			pseudoField.value='';
           villeField.value='';
            adressMailField.value='';
            passwordField.value='' ;        
		//	winOpen.open();		
		//	winClose.close();				
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
	if (pseudoField.value == '' || villeField.value == '' || adressMailField.value == '' || passwordField.value == ''){
		validateForm = false;
		alert("veuillez remplir tous les champs");
	}
	else
		validateForm = true;
	
	
	return validateForm;
}





function saveUser(pseudo, ville, adressMail, password){
	
	var xhr = Titanium.Network.createHTTPClient();
	if (createProfil.envoie != 'idl') {
		alert( 'YouTube uploader already in use!');
		return;
	}
	xhr.onerror = function(e)
	{			
		var	err = 'HTTP Error (last state: saveUser) (onerror: ' + e.error + ')';		
		alert(err);
	};	
xhr.onload = function(){
    
    switch (createProfil.envoie) {
    	
    	case 'fait' :
    	
    	 var json = JSON.parse(this.responseText);
    if (!json) { 
        alert('Error - Null return!'); 
        return false;
    }
    	alert("ici1");
    	createProfil.reussi=true;
    	createProfil.envoie='recu';
    	   	
    	break;
    	
    	case 'recu' :
    	
    	alert("ici2");
    	if(json.createAccount==true){
   	alert("compte crée avec succès ");
   	createProfil.reussi=true;
   	
   }
   	else{
   	alert("compte existe déja ");
   	
   	}	
   	createProfil.envoie='idl';
    	break;
    	
    	default :
				Ti.API.info('Unknown state during YouTube upload!');
				var errormsg = 'Bad state ';
				Ti.App.fireEvent('youtube:error', {});
				break;
    	
    	
    }
    
};
	var params = {
		  	requete:'createUser',
            pseudoU: pseudo.value,  
            villeU: ville.value,
            adressMailU:adressMail.value,
            passwordU:password.value             
        };  
        createProfil.envoie='fait';
        xhr.open('POST', 'http://ceriyves.byethost7.com/DbAction.php');	
	xhr.send(params);
	
}







module.exports = RegisterView;
