const axios = require('axios');

const sharp = require('sharp');

var request = require('request').defaults({ encoding: null })

var link;
var outputImg;
imgLink = function(){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			var link = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			/*axios.get(link,{ responseType:"arraybuffer" })
				.then(function(rep){
					var buff_image = sharp(rep.data).overlayWith('./iss.png');
					callback(buff_image);
				}).catch(console.error);*/
		})
		.catch(console.error);
}

module.exports = function(callback){
	request.get(link, function (err, res, body) {
              sharp(body).overlayWith('./iss.png').toBuffer().then(function(buff){outputImg = buff});
		
		callback(outputImg)
	});
}

