// Global map variable
var map;


var mtdemoFirebaseRef = new Firebase("https://mtdemo.firebaseio.com/");
var usersRef = mtdemoFirebaseRef.child('users');
var campaignsRef = mtdemoFirebaseRef.child('campaigns');
var GeomapRef = mtdemoFirebaseRef.child('geomap');
var usersGeoFireRef = GeomapRef.child('users');
var campaignsGeoFireRef = mtdemoFirebaseRef.child('campaigns');
// Create a new GeoFire instance, pulling data from the public transit data
var usersGeoFire = new GeoFire(usersGeoFireRef);
var campaignsGeoFire = new GeoFire(campaignsGeoFireRef);


var usersInQuery={};
var campaignsInQuery={};


/*****************/
/*  GOOGLE MAPS  */
/*****************/ 
/* Initializes Google Maps */
function initializeMap() {


  // Create the Google Map
  map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: new google.maps.LatLng(32.05704846095407, 34.81048583984375),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
  usersRef.on("value",function(snapshot){
    var allUsers=[];
     snapshot.forEach(function(refChild) {
                allUsers.push(refChild.val());
                    });
             for (var user of allUsers) {
                   if(user.location)
                    createUserMarker(user);
                 }
             
  })
    campaignsRef.on("value",function(snapshot){
    var allCampaigns=[];
     snapshot.forEach(function(refChild) {
                allCampaigns.push(refChild.val());
                    });
             for (var campaign of allCampaigns) {
                     if(campaign.location){
                        createCampaignMarker(campaign);
                        createCampaignRadius(campaign);
                     }
                 }
             
  })
  

  
}

/**********************/
/*  HELPER FUNCTIONS  */
/**********************/
/* Adds a marker for the inputted vehicle to the map */
function createUserMarker(user) {
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    icon: user.convManager.status!="idle"? iconBase + 'rec_phone.png':iconBase + 'man_maps.png',
    position: new google.maps.LatLng(user.location.lat, user.location.lon),
    optimized: true,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content:JSON.stringify(user, null, '\n')
  
           
    });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });
  return marker;
}
function createCampaignMarker(campaign) {
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var marker = new google.maps.Marker({
    icon: iconBase + 'dollar_maps.png',
    position: new google.maps.LatLng(campaign.location.lat, campaign.location.lon),
    optimized: true,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content:JSON.stringify(campaign, null, '\n')
  
           
    });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    });
  return marker;
}
function createCampaignRadius(campaign) {
 
  var circle = new google.maps.Circle({
    strokeColor: "#6D3099",
    strokeOpacity: 0.7,
    strokeWeight: 1,
    fillColor: "#B650FF",
    fillOpacity: 0.35,
    map: map,
    center: new google.maps.LatLng(campaign.location.lat, campaign.location.lon),
    radius: parseInt(campaign.location.radius),
    draggable: false
  });

  return circle;
}




/* Returns true if the two inputted coordinates are approximately equivalent */
function coordinatesAreEquivalent(coord1, coord2) {
  return (Math.abs(coord1 - coord2) < 0.000001);
}

/* Animates the Marker class (based on https://stackoverflow.com/a/10906464) */
google.maps.Marker.prototype.animatedMoveTo = function(newLocation) {
  var toLat = newLocation[0];
  var toLng = newLocation[1];

  var fromLat = this.getPosition().lat();
  var fromLng = this.getPosition().lng();

  if (!coordinatesAreEquivalent(fromLat, toLat) || !coordinatesAreEquivalent(fromLng, toLng)) {
    var percent = 0;
    var latDistance = toLat - fromLat;
    var lngDistance = toLng - fromLng;
    var interval = window.setInterval(function () {
      percent += 0.01;
      var curLat = fromLat + (percent * latDistance);
      var curLng = fromLng + (percent * lngDistance);
      var pos = new google.maps.LatLng(curLat, curLng);
      this.setPosition(pos);
      if (percent >= 1) {
        window.clearInterval(interval);
      }
    }.bind(this), 50);
  }
};




