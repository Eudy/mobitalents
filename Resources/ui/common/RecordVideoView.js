
var youtube = {
	authToken: '',
	location:  '',
	developerKey: 'AI39si7AAPQhCNPeKBJ8OorqABACHYd7-3OHbY_MNYPGecDyusF46gDetrl261mNOsPFQI-H4N_B-WVz8s6nkZdRhHKK0NQawQ',
	state: 'idle',
	errormsg: '',
	xhr: null,
	date:'',
	name:'',
	region:''
};


function RecordVideoView() {
    var Theme = require('ui/mobi/Theme');
    var Button = require('ui/mobi/Button');
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

    var recordButton = Titanium.UI.createButton({
        top: 10,
        left: 10,
        right: 10,
        height: 80,
        title: 'Record Video',
        color:Theme.buttonTextColor,
        backgroundColor:Theme.buttonBackgroundColor,
        font:{
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 26
}
    });
    self.add(recordButton);
    var shareButton = Titanium.UI.createButton({
      //  top: 50,
        left: 10,
        right: 10,
        height: 80,
        title: 'Envoyer la video à un ami',
        visible: false

    });
    self.add(shareButton);
   
    var nameVideoField = Ti.UI.createTextField({
		color: Theme.textColor,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		width: '100%',
		height: '80',
		//top: 60,
		hintText: 'Nom de la video',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		visible: false
	})

	self.add(nameVideoField);
var regionTypeLabel = Ti.UI.createLabel({
	text: 'Choisissez une région',
	font: {
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 22
},
	color:'#a10000',
	width: '100%',
	height: 'auto',
	left: 5,
	visible: false
});
self.add(regionTypeLabel);	
	

 var saveButton = Titanium.UI.createButton({
     //   top: 100,
        left: 10,
        right: 10,
        height: 80,

        title: 'Envoyer la video',
        visible: false

    });

    self.add(saveButton);
    var videoUri = null;


    recordButton.addEventListener('click', function() {
        var intent = Ti.Android.createIntent({
            action: 'android.media.action.VIDEO_CAPTURE'
        });
        var dur="android.intent.extra.durationLimit";
		intent.putExtra(dur, 10);

		 Ti.UI.createNotification({

                    duration: Ti.UI.NOTIFICATION_DURATION_LONG,

                    message: 'Error: ' + intent.hasExtra("android.intent.extra.durationLimit")

                }).show();


		var test = Ti.Android.createIntentChooser(intent, "Envoie ami");
        Titanium.Android.currentActivity.startActivityForResult(test, function(e) {

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
                        message: 'Video enregistrer; partager ou jouer au jeu!'
                    }).show();
                    
                    shareButton.visible = true;
                    
                    nameVideoField.visible = true;
                    regionTypeLabel.visible = true;
                  
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
    shareButton.addEventListener('click', function() {
    	alert(youtube.authToken);
        var intent = Titanium.Android.createIntent({
            action: Titanium.Android.ACTION_SEND,
            type: 'application/octet-stream'
        });
        intent.putExtraUri(Titanium.Android.EXTRA_STREAM, videoUri);

        Titanium.Android.currentActivity.startActivity(

            Titanium.Android.createIntentChooser(intent, 'Envoyer Video via'));

    });

    saveButton.addEventListener('click', function() {

        var source = Ti.Filesystem.getFile(videoUri);
        if (nameVideoField.value == ''){		
		alert("veuillez renseigner tous les champs");
	}
	else{
		youtube.name=nameVideoField.value;		
		youtubeUpload (source, self);
		
}
        Ti.UI.createNotification({


            duration: Ti.UI.NOTIFICATION_DURATION_LONG,

            message: 'Saved to: '
        }).show();

    });

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
};

function youtubeUpload (source1, self)
{
var Geo=require('ui/common/Geolocation');
	var ind=Titanium.UI.createProgressBar({
	top: 75,
	width:200,
	height:50,
	min:0,
	max:3,
	value:0,
	style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
	top:10,
	message:'Uploading image',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#888'
});

self.add(ind);
ind.show();





var i=0;
	/* Sanity check */
	if (!youtube.xhr) {
		youtube.xhr = Titanium.Network.createHTTPClient();
		youtube.xhr.setTimeout(60000);
	}

	/* Load our previously inited one */
	var xhr = youtube.xhr;

	if (youtube.state != 'idle') {
		alert( 'YouTube uploader already in use!');
		return;
	}

	xhr.onerror = function(e)
	{

			//alert('HTTP Error (last state:' + youtube.state + ')' + '(onerror: ' + e.error + ')');

		Ti.API.info('HTTP Error (last state:' + youtube.state + ')' + '(onerror: ' + e.error + ')');
		youtube.errormsg = 'HTTP Error (last state:' + youtube.state + ')' + '(onerror: ' + e.error + ')';
		youtube.state = 'error';
		alert(youtube.errormsg);
	};

	xhr.onsendstream = function(e)
	{
		ind.value = e.progress ;
		//alert("aaaaa");
//		Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
	};


	xhr.onload = function()
	{
		Ti.API.info("XHR status response is " + xhr.status + " and state is " + youtube.state);
		var start;
		switch (youtube.state) {
			case 'getauth' :
				start = xhr.responseText.indexOf('Auth=');
				if (start == -1) {
					Ti.API.info('Could not find valid Auth in response [' + xhr.responseText + ']');
					youtube.state = 'error';
					youtube.errormsg = 'Invalid authorization attempt';
					Ti.App.fireEvent('youtube:error', {});
				}
				else{
					ind.value =1;
					start += 5;

					youtube.authToken = xhr.responseText.substring(start, xhr.responseText.length-1);
					Ti.API.info('Our Auth token is [' + youtube.authToken + ']');
					youtube.state = 'gotauth';
					youtube.state = 'getlocation';
					xhr.open('POST', 'http://uploads.gdata.youtube.com/resumable/feeds/api/users/talenmobile/uploads');
					xhr.setRequestHeader('Authorization', 'GoogleLogin auth=' + youtube.authToken);
					xhr.setRequestHeader('GData-Version', '2');
					xhr.setRequestHeader('X-GData-Key', 'key=' + youtube.developerKey);
					xhr.setRequestHeader('Slug', youtube.name);
					xhr.setRequestHeader('Content-Type', 'multipart/related; boundary=\"f93dcbA3\"');
					xhr.setRequestHeader('Content-Length', '1941255');
					xhr.setRequestHeader('Connection', 'close');
					xhr.setRequestHeader('Content-Type', 'application/atom+xml; charset=UTF-8');
					xhr.setRequestHeader('Content-Type', 'video/mp4');
					xhr.setRequestHeader('Content-Transfer-Encoding', 'binary');
					xhr.send("--f93dcbA3Content-Type: application/atom+xml; charset=UTF-8<?xml version=\"1.0\"?><entry xmlns=\"http://www.w3.org/2005/Atom\"xmlns:media=\"http://search.yahoo.com/mrss/\"xmlns:yt=\"http://gdata.youtube.com/schemas/2007\"><media:group><media:title type=\"plain\">Bad Wedding Toast</media:title><media:description type=\"plain\">I gave a bad toast at my friend's wedding.</media:description><media:categoryscheme=\"http://gdata.youtube.com/schemas/2007/categories.cat\">People</media:category><media:keywords>toast, wedding</media:keywords></media:group></entry>--f93dcbA3--f93dcbA3--");

				}

				break;
			case 'getlocation' :

				youtube.location = xhr.getResponseHeader('Location');
				if (youtube.location != '') {

				ind.value =2;
					youtube.state = 'uploading';
					Ti.API.info("Attempting PUT");
					xhr.open('PUT', youtube.location);
					xhr.setRequestHeader('Content-Type', 'video/mpeg');
				xhr.setRequestHeader('Content-Length', '124905');
					xhr.send(source1);
				}
				else {
					youtube.state = 'error';
					youtube.errormsg = 'Invalid location returned';
					alert(youtube.errormsg);
				}
				break;
			/* Get the returned location */
			case 'uploading' :
				Ti.API.info("Got uploading completed....");
				youtube.state = 'idle';
				var search = "media:player url='http://www.youtube.com/watch?v=";
				var shortlink;
				var end;
				//alert(xhr.responseText);
				start = xhr.responseText.indexOf(search);
				if (start) {
					start += search.length;
					end = xhr.responseText.indexOf("&amp", start);
					if (end) {
						shortlink = xhr.responseText.substring(start, end);
					}
				}
				if (shortlink) {
					alert("lien vers votre video: http://www.youtube.com/watch?v="+shortlink);					
				//	saveDbVideo(youtube.name, shortlink);
					var region = new Geo(youtube.name, shortlink);
					ind.value =3;					
					ind.hide();
				}
				else {
					youtube.errormsg = 'Could not find YouTube link!';
					Ti.App.fireEvent('youtube:error', {});
				}
				break;
			default :
				Ti.API.info('Unknown state during YouTube upload!');
				youtube.errormsg = 'Bad state ' + youtube.state;
				Ti.App.fireEvent('youtube:error', {});
				break;
		}
	};
	youtube.state = 'getauth';
	youtube.errormsg = '';
	youtube.authToken = '';
	youtube.location = '';
	xhr.open('POST','https://www.google.com/accounts/ClientLogin');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send({
		Email: 'talenmobile',
		Passwd: 'danidjab',
		service: 'youtube',
		source: 'youApp'
	});


}


module.exports = RecordVideoView;