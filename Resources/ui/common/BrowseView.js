// Parcourir les vidéos


function BrowseView(winClose,winOpen) {

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

	var userSession = JSON.parse(Ti.App.Properties.getString("userSession"));	

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

	var logoutButton = Button("Déconnexion", '49%');
	logoutButton.addEventListener('click', function() {
		self.fireEvent('logoutSuccessful', {});
	});
	hView.add(logoutButton);
	var settingsButton = Button("Gérer mon compte", '49%', null, null, '1%');
	settingsButton.addEventListener('click', function(e) {
		self.fireEvent('settingSuccessful', {

		});
	});
	hView.add(settingsButton);

	self.add(hView);
	  
	
	// Vue des vidéos
	var videos = [];
	var tableView = Titanium.UI.createTableView({data: videos});
	self.add(tableView);
	
	var xhr = Titanium.Network.createHTTPClient();
	
	var searchUrl = "http://gdata.youtube.com/feeds/api/videos?alt=rss&author=" + escape(CHANNEL) + "&orderby=published&max-results=25&v=2";
	xhr.open("GET", searchUrl);
	
	xhr.onload = function() {
		try {
			var document;
			if(!this.responseXML) {
				document = Titanium.XML.parseString(this.responseText).documentElement;
			} else {
				document = this.responseXML.documentElement;
			}
			// On récupère la liste des vidéos
			var videos = document.getElementsByTagName("item");
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
				
				tableView.appendRow(row);
			}
		} catch(e) {
			Ti.API.info(e);
		}
	} 
	
	xhr.send();
	
	var videoUri = null;
	var recordButton = Button("Envoyer ma vidéo", '100%', null, '5%');
	recordButton.addEventListener('click', function(e) {
	   self.fireEvent('videoSuccessful', {
			
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

	var otherRegionsButton = Button("Autres régions", '49%');
	othersVideosView.add(otherRegionsButton);
	var allVideosButton = Button("Toutes les vidéos", '49%', null, null, '1%');
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
