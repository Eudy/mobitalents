




function VainquerView(name, lien, region){
	
	
	
	
	
	
	
	
	
	
	
	
	
}



function Vue(region){
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
	
	
	
	
	var expenseTypePicker = Ti.UI.createPicker();

var expenseTypeData = [];
expenseTypeData[0]=Ti.UI.createPickerRow({title:'Food',custom_item:'Food'});
expenseTypeData[1]=Ti.UI.createPickerRow({title:'Gas',custom_item:'Gas'});
expenseTypeData[2]=Ti.UI.createPickerRow({title:'Misc',custom_item:'Misc'});

expenseTypePicker.selectionIndicator = true;
expenseTypePicker.add(expenseTypeData);
self.add(expenseTypePicker);
expenseTypePicker.setSelectedRow(0,0,false);

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
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
var saveVideo = {	
	envoie:'idl'
};



function SaveVideo(){

	var InfoUser = require('ui/mobi/InfoUser');	
	
	
 var InfoUser = require('ui/mobi/InfoUser');
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onerror = function(e)
	{
		var	err = 'HTTP Error (last state: saveDbVideo) (onerror: ' + e.error + ')';
		alert(err);
	};

xhr.onload = function(){
	
	 switch (saveVideo.envoie) {
    	case 'fait' :
    	 var json = JSON.parse(this.responseText);
    if (!json) {
        alert('Error - Null return!');
        return ;
    }
  
for(var i= 0; i < json.length; i++)
{
    alert(json[i].videoREGION);
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
		  	requete:'vainquer',		  	            
        };
    saveVideo.envoie= 'fait';     
    xhr.open('POST', 'http://ceriyves.byethost7.com/DbAction.php');
	xhr.send(params);
	
}




module.exports = VainquerView;