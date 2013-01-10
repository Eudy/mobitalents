function Geolocation(name, lien){	
	//alert("geo");
	
	// ******************************************************************************************
// start geocoding block
// ******************************************************************************************
Titanium.Geolocation.purpose = "Populate Address Fields Based on Your Location";
Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
var longitude, latitude, altitude, heading, accuracy, speed, timestamp, altitudeAccuracy, address, city, zip, regionVideo="";
var InfoUser = require('ui/mobi/InfoUser');	
var Save=require('ui/common/SaveVideo');



if (Titanium.Geolocation.locationServicesEnabled==false) {
	//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
	alert("gps pas branché");
	var n = Ti.UI.createNotification({message:"GPS is off"});
	n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
	n.show();
} else {
	// IF WE HAVE COMPASS GET THE HEADING
	if (Titanium.Geolocation.hasCompass) {
		//  TURN OFF ANNOYING COMPASS INTERFERENCE MESSAGE
		Titanium.Geolocation.showCalibration = false;

		// SET THE HEADING FILTER (THIS IS IN DEGREES OF ANGLE CHANGE)
		// EVENT WON'T FIRE UNLESS ANGLE CHANGE EXCEEDS THIS VALUE
		Titanium.Geolocation.headingFilter = 90;

		//  GET CURRENT HEADING - THIS FIRES ONCE
		Ti.Geolocation.getCurrentHeading(function(e) {
			if (e.error) {
				return;
			}
			var x = e.heading.x;
			var y = e.heading.y;
			var z = e.heading.z;
			var magneticHeading = e.heading.magneticHeading;
			accuracy = e.heading.accuracy;
			var trueHeading = e.heading.trueHeading;
			timestamp = e.heading.timestamp;
		});

		// EVENT LISTENER FOR COMPASS EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON HEADING FILTER)
		Titanium.Geolocation.addEventListener('heading',function(e) {
			if (e.error) {
				return;
			}
			var x = e.heading.x;
			var y = e.heading.y;
			var z = e.heading.z;
			var magneticHeading = e.heading.magneticHeading;
			accuracy = e.heading.accuracy;
			var trueHeading = e.heading.trueHeading;
			timestamp = e.heading.timestamp;
		});
	} else {
		alert("No Compass on device");
	}

	//  SET ACCURACY
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

	//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
	//  THIS VALUE IS IN METERS
	Titanium.Geolocation.distanceFilter = 10;

	// GET CURRENT POSITION - THIS FIRES ONCE
	/*Titanium.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			var n = Ti.UI.createNotification({message:"Waiting for GPS"});
			n.duration = Ti.UI.NOTIFICATION_DURATION_SHORT;
			n.show();
			return;
		}

		longitude = e.coords.longitude;
		latitude = e.coords.latitude;
		altitude = e.coords.altitude;
		heading = e.coords.heading;
		accuracy = e.coords.accuracy;
		speed = e.coords.speed;
		timestamp = e.coords.timestamp;
		altitudeAccuracy = e.coords.altitudeAccuracy;
		Titanium.Geolocation.reverseGeocoder(e.coords.latitude,e.coords.longitude,function(evt) {
			var places = evt.places;
			address = places[0].address;
			city = places[0].city;
			zip = places[0].postalCode;
//			Ti.API.info("One-time = "+JSON.stringify(evt));
		});
//		Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	});*/

	// EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
	Titanium.Geolocation.addEventListener('location',function(e) {
		if (e.error) {
			Titanium.API.info('location error');
			return;
		}
		longitude = e.coords.longitude;
		latitude = e.coords.latitude;
		altitude = e.coords.altitude;
		heading = e.coords.heading;
		accuracy = e.coords.accuracy;
		speed = e.coords.speed;
		timestamp = e.coords.timestamp;
		altitudeAccuracy = e.coords.altitudeAccuracy;
		// reverse geo
		Titanium.Geolocation.reverseGeocoder(e.coords.latitude,e.coords.longitude,function(evt) {
			var places = evt.places;
			address = places[0].address;
			city = places[0].city;
			zip = places[0].postalCode;

var region=address.split(",");

var regionV=region[3];
var save = new Save(name, lien, regionV);

		}); // end reverseGeocoder
		

	}); // end addEventListener
} 


return regionVideo;
	
	
}
module.exports = Geolocation;