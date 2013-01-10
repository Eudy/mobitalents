/**************************************************************************************************** 
** 
**  youtube.js
** 
**  Date: June 2011
**  Author: Chris Moore
**  Desc: YouTube uploader
**
**
**************************************************************************************************/

/*********************************************************************************************************
 **		
 ** Youtube API object to interface with YouTube.
 **
 *********************************************************************************************************/

var youtube = {

	/* You get this when you connect with a valid username/password to YouTube for uploading
	 *  note that there is an expiry so you may need to get a new one if you take to long to use 
	 */
	authToken: '',
	
	/* The resumable upload path/location */
	location:  '', 
	
	/* You get this from when you sign up to YouTube Data API */
	developerKey: 'AI39si7AAPQhCNPeKBJ8OorqABACHYd7-3OHbY_MNYPGecDyusF46gDetrl261mNOsPFQI-H4N_B-WVz8s6nkZdRhHKK0NQawQ',

	/* State: idle, getauth, gotauth, getlocation, gotlocation, uploading, error */
	state: 'idle',
	errormsg: '',
	
	/* HTTP client re-use */
	xhr: null
	
};

/*********************************************************************************************************
 **		
 ** Function: Upload a movie to YouTube
 ** Notes: Check your uploads on YouTube...
 **        http://code.google.com/apis/youtube/dashboard/       -- Register and get keys
 **
 *********************************************************************************************************/

function youtubeUpload ()
{

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
		if(app.account.isStaging) {
			alert('HTTP Error (last state:' + youtube.state + ')' + '(onerror: ' + e.error + ')');
		}
		Ti.API.info('HTTP Error (last state:' + youtube.state + ')' + '(onerror: ' + e.error + ')');
		youtube.errormsg = 'HTTP Error (last state:' + youtube.state + ')' + '(onerror: ' + e.error + ')';
		youtube.state = 'error';
		alert(youtube.errormsg);
	};

	/*xhr.onsendstream = function(e)
	{
		if (request.progress) {
			request.progress(e.progress);
		}

//		Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
	};*/


	xhr.onload = function()
	{
		/*
		 * State machine for uploading to youtube
		 */
		Ti.API.info("XHR status response is " + xhr.status + " and state is " + youtube.state);
		var start;
		
		switch (youtube.state) {
			
			/* Was attempting the first phase which is to get an auth string */
			case 'getauth' :
			
//				Ti.API.info('Response: ' + xhr.responseText);
			
				/* Extract the response which includes our AUTH string */
				start = xhr.responseText.indexOf('Auth=');
				if (start == -1) {
					Ti.API.info('Could not find valid Auth in response [' + xhr.responseText + ']');
					youtube.state = 'error';
					youtube.errormsg = 'Invalid authorization attempt';
					Ti.App.fireEvent('youtube:error', {});
				}
				else {
					
					/* Skip 'Auth=' */
					start += 5;
					
					/* Extract the token to end of the string excluding the cr/lr */
					youtube.authToken = xhr.responseText.substring(start, xhr.responseText.length-1);
					Ti.API.info('Our Auth token is [' + youtube.authToken + ']');
					youtube.state = 'gotauth';

					/* New state */
					youtube.state = 'getlocation';
			
					/* This is for a resumable upload */
					xhr.open('POST', 'http://uploads.gdata.youtube.com/resumable/feeds/api/users/default/uploads');
			
					xhr.setRequestHeader('Authorization', 'GoogleLogin auth=' + youtube.authToken);
					xhr.setRequestHeader('GData-Version', '2');
					xhr.setRequestHeader('X-GData-Key', 'key=' + youtube.developerKey);
					if (Ti.Platform.osname != 'android') {
						xhr.setRequestHeader('Content-Length', '0');
					}
					xhr.setRequestHeader('Slug', 'movie.mov');
			
					// send the data
					xhr.send();

				}
			
				break;
				
			/* Get the returned location */
			case 'getlocation' :
			
//				Ti.API.info("Got the location........ possibly");
				
				youtube.location = xhr.getResponseHeader('Location');

				if (youtube.location) {

					/* New state */
					youtube.state = 'uploading';
					
					Ti.API.info("Attempting PUT");
			
					xhr.open('PUT', youtube.location);
					xhr.setRequestHeader('Content-Type', 'application/octet-stream');
								
//					var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, request.file);
//					var contents = file.read();
//					Ti.API.info("File is " + file + " and length is " + file.size);
//					xhr.setRequestHeader('Content-Length', file.size);
//					xhr.send(contents);

					xhr.send(request.file);

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
				
//				Ti.API.info('Response: ' + xhr.responseText);

				/*
				 * Extract the Youtube link from response - Its XML, but just search for the link type instead of instantiating the XML 
				 *  parser for just this.
				 */

				var search = "media:player url='http://www.youtube.com/watch?v=";
				var shortlink;
				var end;
				
				start = xhr.responseText.indexOf(search);

				if (start) {
					start += search.length;
					end = xhr.responseText.indexOf("&amp", start);
					if (end) {
						shortlink = xhr.responseText.substring(start, end);
					}
				}

				if (shortlink) {
					request.success({url: 'http://www.youtube.com/watch?v=' + shortlink});
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

	/*
	 * State: Get the auth token for a user/password combination 
	 */
	
	youtube.state = 'getauth';
	youtube.errormsg = '';
	youtube.authToken = '';
	youtube.location = '';
		
	/* Trigger the first part of the process which is to get an Authorization token */
	xhr.open('POST','https://www.google.com/accounts/ClientLogin');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send({
		Email: request.username,
		Passwd: request.password,
		service: 'youtube',
		source: 'YourAppName'
	});


	/*
	 * State: Error
	 */

	Ti.App.addEventListener('youtube:error', function(e) {
		//alert("Error: " + youtube.errormsg);
		youtube.state = 'idle';
		request.failure({reason: youtube.errormsg});
	});

};



	
	


	
	
	
	
	
	
	
	
	
	
