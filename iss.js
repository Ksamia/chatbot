const axios = require('axios');

const sharp = require('sharp');

var request = require('request').defaults({ encoding: null })

var link;
var outputImg;
module.exports = function(callback){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			var link = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			axios.get(link,{ responseType:"arraybuffer" })
				.then(function(rep){
					sharp(rep.data).overlayWith('./iss.png')
						.toBuffer()
						.then(function(buff){
							callback(buff);
						});
				}).catch(console.error);
		})
		.catch(console.error);
}


