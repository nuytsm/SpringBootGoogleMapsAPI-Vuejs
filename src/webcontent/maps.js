let map;
let geocoder;

var locations = [];

var app = new Vue({
  el: '#app',
  data: {
    locationnames: [],
	locationname: ""
  },
	methods: {
		addlocation: function() {
				console.log('addloc')
			this.locationnames.push(this.locationname)
				geocodeAddress(geocoder, map, this.locationname)
			this.locationname = "";
//			for (let loc of this.locationnames){
//			}
		},
		addloc: function(evt){
			if(event.key === 'Enter') {
			      this.addlocation()      
			    }
		},
		getlocs: function(){
			axios.get('http://localhost:8886/getlocations')
	            .then(function( response ){
	                for(loc of response.data){
						/*console.log(loc.lat)*/						
						gloc = new google.maps.LatLng(loc.lat, loc.lng)
						locations.push(gloc)
					}
	            }.bind(this));
		}	
	}, mounted() {
	  this.getlocs()
	 setTimeout(function () { drawlines() }, 3000)
			
	}, updated(){
		
	}
})



function initMap() {
	geocoder = new google.maps.Geocoder();
  const school = { lat: 51.218401, lng: 5.307320 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: school,
    zoom: 5,
  });
  new google.maps.Marker({
    position: school,
    map,
    title: "School!",
  });
  
	
	
//	geocodeAddress(geocoder, map, "Scotland")
//	geocodeAddress(geocoder, map, "Switzerland")
//	geocodeAddress(geocoder, map, "Singapore")
//	geocodeAddress(geocoder, map, "Bangkok")
//	geocodeAddress(geocoder, map, "San Fransisco")
//	geocodeAddress(geocoder, map, "Benin")
//	geocodeAddress(geocoder, map, "Tromsö")
	  
}

function drawlines(){
	const lijn = new google.maps.Polyline({
		    path: locations,
		    geodesic: true,
		    strokeColor: "#FF0000",
		    strokeOpacity: 0.9,
		    strokeWeight: 2,
	  		});
	  lijn.setMap(map);
	for (loc of locations){
		new google.maps.Marker({
		    position: loc,
		    map
		  });
	}
}

function geocodeAddress(geocoder, resultsMap, address) {
	console.log("geocode: " + address)
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
	
		var latlng = results[0].geometry.location
		console.log(latlng)
		
		locations.push(latlng);
		var request = 'http://localhost:8886/addlocation?lat='+ latlng.lat() + "&lng=" + latlng.lng() + "&locname=" + address;
		console.log("request: ", request)
		axios.get(request)
	            .then(function( response ){
	                
	            }.bind(this));
		drawlines()
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}


