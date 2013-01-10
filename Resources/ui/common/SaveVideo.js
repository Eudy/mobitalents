var saveVideo = {	
	envoie:'idl'
};





function SaveVideo(name, lien, region){
	//INSERT INTO matable (date) VALUES (NOW()) 
	var InfoUser = require('ui/mobi/InfoUser');	
	/*var Geo=require('ui/common/Geolocation');	
	var region = new Geo();*/
	alert("address "+InfoUser.region);
 var InfoUser = require('ui/mobi/InfoUser');
	var xhr = Titanium.Network.createHTTPClient();
//	alert("ici");
	if (saveVideo.envoie != 'idl') {
		alert( 'YouTube uploader already in use!');
		return;
	}
	xhr.onerror = function(e)
	{
		var	err = 'HTTP Error (last state: saveDbVideo) (onerror: ' + e.error + ')';
		alert(err);
	};

xhr.onload = function(){
	//alert("ici onload");
	 switch (saveVideo.envoie) {
    	case 'fait' :
    	 var json = JSON.parse(this.responseText);
    if (!json) {
        alert('Error - Null return!');
        return ;
    }
    if(json.save==true){
   	alert("video en cours de validation");  	
   }
   else
   	alert("video non enregistrer");
   		
    	break;

    	default :
				Ti.API.info('Unknown state during YouTube upload!');
				var errormsg = 'Bad state ';
				Ti.App.fireEvent('youtube:error', {});
		break;
};
};
	var params = {
		  	requete:'saveVideo',		  	
            nameVideo: name,
            idPseudo:InfoUser.id,
            regionVideo: region,          
            lienVideo:lien          
        };
    saveVideo.envoie= 'fait';     
    xhr.open('POST', 'http://ceriyves.byethost7.com/DbAction.php');
	xhr.send(params);
	
}

module.exports = SaveVideo;




