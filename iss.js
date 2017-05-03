const axios = require('axios');

const sharp = require('sharp');

const fs = require('fs');

var coordinates = {long:0, lat:0, img:''};

module.exports = function Compose(img, callback){
	console.log('iss.js compose function');
	console.log(img)
	axios.get(img,{ responseType:"arraybuffer" })
		.then(function(rep){
			console.log('iss.js in compose axios.get');
			sharp(rep.data)
				.overlayWith('./satelite.jpg')
				.png()
				.toBuffer(function(error,data,info){
					console.log('toBuffer data '+data);
					console.log(info);
				})
				.then(function(output){
					console.log('sharp then output '+output)
					callback(output);
				})
				.catch(console.error)
		})
}

module.exports = function getImgLink(){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			console.log(rep.data.latitude);
			coordinates.long = rep.data.longitude;
			coordinates.lat = rep.data.latitude;
			coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			return coordinates.img;
		})
		.catch(console.error);

	
}

