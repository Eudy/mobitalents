//FirstView Component Constructor
var loginProfil = {
	idUser: '',
	envoie:'idl'
};
function LoginView() {
	var Theme = require('ui/mobi/Theme');
	var Button = require('ui/mobi/Button');
	//var InfoUser = require('ui/mobi/InfoUser');	
	var Geo=require('ui/common/Geolocation');
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView({
		top: '7.5%',
		left: '5%',
		width: '90%',
		height: '100%',
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
if (Titanium.Network.online == false)
{
        var dlg = Titanium.UI.createAlertDialog({
        'title' : 'No Network',
        'message' : 'You are not connected to a network. ',
        'buttonNames' : [ 'OK' ]
    });
    dlg.show();
//Titanium.App.fireEvent('hide_indicator');
}
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
			connexi(loginField, passwordField,self);
		}
		else{
			alert("Veuillez renseigner tous les champs")
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
		var geo= new Geo();
		alert(geo);
		//self.fireEvent('videoSuccessful', {});
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

function connexi(login, password, self){
	var InfoUser = require('ui/mobi/InfoUser');
	var xhr = Titanium.Network.createHTTPClient();
	
	if (loginProfil.envoie != 'idl') {
		alert( 'YouTube uploader already in use!');
		return;
	}
		xhr.onerror = function(e)
	{
		var	err = 'HTTP Error (last state: saveUser) (onerror: ' + e.error + ')';
		alert(err);
	};
	
xhr.onload = function(){
	
	 switch (loginProfil.envoie) {
	 	case 'fait' :
	 	 var json = JSON.parse(this.responseText);
    if (!json) {
        alert('Error - Null return!');
        return false;
    }
    	 if(json.logged==true){
   
   	InfoUser.id=json.id;
   	InfoUser.pseudo=json.pseudo;
self.fireEvent('loginSuccessful', {});
}
   	else
   	alert("existe bad ");
	 	break;
	 	
	 	default :
				Ti.API.info('Unknown state during YouTube upload!');
				var errormsg = 'Bad state ';
				Ti.App.fireEvent('youtube:error', {});
		break;
	 };


    
  
   
};

	var params = {
		  	requete:'login',
            pseudoU: login.value,  
            passW: password.value 
        };  
     loginProfil.envoie='fait';   
    xhr.open('POST', 'http://ceriyves.byethost7.com/DbAction.php');    
	xhr.send(params);						
}




module.exports = LoginView;
