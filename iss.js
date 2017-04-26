const axios = require('axios');

var coordinates = {long:0, lat:0, img:''};

function getCoordinate(){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			coordinates.long = rep.longitude;
			coordinates.lat = rep.latitude;
		})
		.catch(console.error);
}

module.exports = function(callback){
	axios.get('http://staticmap.openstreetmap.de/staticmap.php?center='+coordinates.lat+','+coordinates.long+'&zoom=5size=400x300&maptype=mapnik&markers='+coordinates.lat+','+coordinates.long+'ltblu-pushpin')
		.then(function(rep){
			callback(rep);
		}).catch(console.error);
	
};
