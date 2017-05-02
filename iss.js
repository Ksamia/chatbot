const axios = require('axios');

const sharp = require('sharp');

const fs = require('fs');

var coordinates = {long:0, lat:0, img:''};

module.exports = function(callback){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			console.log(rep.data.latitude);
			coordinates.long = rep.data.longitude;
			coordinates.lat = rep.data.latitude;
			coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			//callback(JSON.stringify(coordinates));
			axios.get(coordinates.img,{ responseType:"arraybuffer" })
			.then(function(rep){
				//console.log(rep.data)
				sharp(rep.data)
					.overlayWith('./satelite.jpg')
					.png()
					.then(function(output){
						console.log('png output')
						callback(output)
					})
					.catch(console.error);
			
			})
		})
		.catch(console.error);
}

