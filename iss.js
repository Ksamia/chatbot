const axios = require('axios');

const sharp = require('sharp');

const fs = require('fs');

const coordinates = {long:0, lat:0, img:''};

module.exports.getImgLink = function getImgLink(callback){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			coordinates.long = rep.data.longitude;
			coordinates.lat = rep.data.latitude;
			coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			axios.get(coordinates.img,{ responseType:"arraybuffer" })
				.then(function(rep){
					var buff_image = sharp(rep.data).resize(100).overlayWith('./iss.png');
					callback(buff_image);
				}).catch(console.error);
		})
		.catch(console.error);
}

