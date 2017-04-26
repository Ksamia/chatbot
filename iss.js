const axios = require('axios');

var coordinates = {long:0, lat:0, img:''};

module.exports = function(callback){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			console.log(rep.data.latitude);
			//coordinates.long = rep.longitude;
			//coordinates.lat = rep.latitude;
			//coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.latitude+','+rep.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.latitude+','+rep.longitude+'ltblu-pushpin';
			callback(JSON.stringify(coordinates));
		})
		.catch(console.error);
}
