package springbootgooglemapsapi;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class LocationController {
	
	@Autowired
	LocationRepository locrepo;
	
	@RequestMapping("/addlocation")
	public void addlocation(@RequestParam("lat") String lat,@RequestParam("lng") String lng, @RequestParam("locname") String locname) {
		Location l = new Location();
		l.setLat(lat);
		l.setLng(lng);
		Location save = locrepo.save(l);
		System.out.println("location: " + save);
		System.out.println("locname: " + locname);
	}
	
	@RequestMapping("/getlocations")
	public Iterable<Location> getLocations() {
		Iterable<Location> locs = locrepo.findAll();
		return locs;
		//format: {lat: -34, lng: 151}
//		List<String> locstrings = new ArrayList<>();
//		for (Location l : locs) {
//			locstrings.add("{lat: "+ l.getLat() + ", lng: " + l.getLng() + "}");
//		}
//		return locstrings;
	}
	

}
