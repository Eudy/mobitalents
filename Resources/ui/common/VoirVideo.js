
var loginProfil = {
	idUser: '',
	envoie:'idl'
};

function VoirVideo(){
	
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
		height: '200%',
		layout: 'vertical'
	});

	//create object instance, a parasitic subclass of Observable

var otherRegionsButton = Button("Par régions");
	self.add(otherRegionsButton);
	var allVideosButton = Button("Toutes les vidéos");
self.add(allVideosButton);
var list;
	 allVideosButton.addEventListener('click', function(e) {

list=lireVideo(self);

});



 otherRegionsButton.addEventListener('click', function(e) {

if (list) {
        self.remove(list);
        list = null;
    }

});










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


function lireVideo(self){

	var videos = [];
	var CHANNEL = "talenmobile";
	var tableView = Titanium.UI.createTableView({data: videos});
	self.add(tableView);
	var test="djaber";
	var xhr = Titanium.Network.createHTTPClient();

	var searchUrl = "http://gdata.youtube.com/feeds/api/videos?alt=rss&author=" + escape(CHANNEL) + "&orderby=published&max-results=25&v=2";
	xhr.open("GET", searchUrl);
	
	
		xhr.onerror = function(e)
	{
		var	err = 'HTTP Error (last state: saveUser) (onerror: ' + e.error + ')';
		alert(err);
	};
	
	
	
	xhr.onload = function() {


	
		try {
			var document;
			if(!this.responseXML) {
				document = Titanium.XML.parseString(this.responseText).documentElement;
			} else {
				document = this.responseXML.documentElement;
				//alert(document);
			}
			// On récupère la liste des vidéos
			var videos = document.getElementsByTagName("item");
			alert(videos.item.length);
			for(var i=0;videos.length;i++) {
				var video = videos.item(i);
				// On récupère le titre
				var title = video.getElementsByTagName("title").item(0).text;
				// On récupère le lien de la vidéo
				var link = "";
				if (video.getElementsByTagName("link"))
				{
					link = video.getElementsByTagName("link").item(0).text;
				}
				var guid = link.substring(link.indexOf("?v=")+3);
				guid = guid.substring(0,guid.indexOf("&"));
				var thumbnail = "http://i.ytimg.com/vi/" + guid + "/2.jpg";

				var row = Titanium.UI.createTableViewRow({title:title,height:120});
				row.link = link;
				row.guid = guid;
				row.videotitle = title;
				//
				var labelTitle = Ti.UI.createLabel({
					text:title,
					left:170,
					top:10,
					height:120,
					color:"#FFFFFF"
				});
				row.add(labelTitle);

				// Vignette
				var img = Ti.UI.createImageView({
					url:thumbnail,
					left:0,
					height:120,
					width:160
				});
				row.add(img);
				test="re";
				 var Button = Titanium.UI.createButton({
				 	 title: 'Vote',
				 	  left:300,
				 	   width:80,
				 	    height:80
				 	 });
				 Button.addEventListener('click',function(e){
				 	alert("vote");
				 	
				 });
				 
				 
				 
				row.add(Button);
				
				
				
				row.addEventListener('click',function(e)
{

Titanium.Platform.openURL('http://www.youtube.com/watch?v=' + e.row.guid);
});
			//	tableView.appendRow(Button);
				tableView.appendRow(row);
				
			}
		} catch(e) {
			Ti.API.info(e);
		}
	
	 }


	loginProfil.envoie='fait';
	
	xhr.send();




//	alert(test);



}



module.exports = VoirVideo;









