const axios = require('axios');

const sharp = require('sharp');

const fs = require('fs');

static var coordinates = {long:0, lat:0, img:''};

module.exports.Compose = function Compose(callback){
	console.log('iss.js compose function');
	console.log(coordinates.img);
	axios.get('http://staticmap.openstreetmap.de/staticmap.php?center=40.465476578251,68.987902965651&zoom=5size=400x300&maptype=mapnik&format=png&markers=40.465476578251,68.987902965651ltblu-pushpin',{ responseType:"arraybuffer" })
		.then(function(rep){
			console.log('iss.js in compose axios.get');
			sharp(rep.data)
				.overlayWith('./satelite.jpg')
				.png()
				.toBuffer()
				.then(function(output){
					console.log('sharp then output '+output)
					callback(output);
				})
				.catch(console.error)
		})
}

module.exports.getImgLink = function getImgLink(callback){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			console.log(rep.data.latitude);
			coordinates.long = rep.data.longitude;
			coordinates.lat = rep.data.latitude;
			coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			callback(coordinates.img);
		})
		.catch(console.error);

	
}

