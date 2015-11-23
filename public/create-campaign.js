(function(){
        $(document).ready(function() {
          $('#pinMap').hide();
          $('#locationButton').click(function () {
              $('#pinMap').toggle();
              if($('#pinMap').is(":visible")){
                  initialize();
              }
          })
          
        function initialize() {
		var $latitude = document.getElementById('latitude');
		var $longitude = document.getElementById('longitude');
		var $radius = document.getElementById('radius');
		var latitude = 32.05704846095407;
		var longitude = 34.81048583984375;
		var radius = 1000;
		var zoom = 12;
		
		var LatLng = new google.maps.LatLng(latitude, longitude);
		
		var mapOptions = {
			zoom: zoom,
			center: LatLng,
			panControl: true,
			zoomControl: true,
			scaleControl: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}	
		
		var map = new google.maps.Map(document.getElementById('map'),mapOptions);
      
		$latitude.value = latitude;
		$longitude.value = longitude;
		$radius.value = radius;
		var marker = new google.maps.Marker({
			position: LatLng,
			map: map,
			title: 'Drag Me!',
			draggable: true
		});
		
		google.maps.event.addListener(marker, 'dragend', function(marker){
			var latLng = marker.latLng;
			$latitude.value = latLng.lat();
			$longitude.value = latLng.lng();
			circle.setCenter(new google.maps.LatLng($latitude.value, $longitude.value));
		});
		google.maps.event.addListener(map,'dblclick', function(event){
		    var clickLat = event.latLng.lat();
            var clickLon = event.latLng.lng();
            $latitude.value = clickLat;
			$longitude.value = clickLon;
			marker.latLng=new google.maps.LatLng(clickLat, clickLon);
		});
		
		var circle = new google.maps.Circle({
                strokeColor: "#6D3099",
                strokeOpacity: 0.7,
                strokeWeight: 1,
                fillColor: "#B650FF",
                fillOpacity: 0.35,
                map: map,
                center: LatLng,
                radius: parseInt($('#radius').val())>0? parseInt($('#radius').val()):1000,
                draggable: false
              });
		
		
		$('#radius').keyup(function(){
		    circle.setRadius(parseInt($('#radius').val()));
		})
		
	}
	
		
	
	
          
          $('#form').submit(function(){
               var duration = $("#audio-preview").find('audio')[0].duration;
                var input = $("<input>")
                               .attr("type", "hidden")
                               .attr("name", "audioDuration").val(duration);
                var input2 = $("<input>")
                               .attr("type", "hidden")
                               .attr("filename", "fileName").val(duration);               
                $('#form').append($(input));
                
               // $('#location-show').
          });
      });  
}())

           








    

    
    

