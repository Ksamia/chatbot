const axios = require('axios');

const sharp = require('sharp');

const fs = require('fs');

const coordinates = {long:0, lat:0, img:''};

const overlay = "http://www.clker.com/cliparts/4/a/3/6/13673152381260660812free-global-security-satellite-th.png";

var overlayImg;

axios.get("http://www.clker.com/cliparts/4/a/3/6/13673152381260660812free-global-security-satellite-th.png", {responseType:"arraybuffer"})
	.then(function(rep){
		overlayImg = rep.data;
	}).catch(console.error);


module.exports.getImgLink = function getImgLink(callback){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			//console.log(rep.data.latitude);
			coordinates.long = rep.data.longitude;
			coordinates.lat = rep.data.latitude;
			coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			
			axios.get(coordinates.img,{ responseType:"arraybuffer" })
				.then(function(rep){
					console.log(overlayImg);
					var buff_image = sharp(rep.data).resize(500);
					callback(buff_image);
				}).catch(console.error);
		})
		.catch(console.error);
}



/*module.exports.Compose = function Compose(callback){
	console.log('coordinates.img '+coordinates.img);
	axios.get('http://staticmap.openstreetmap.de/staticmap.php?center=40.465476578251,68.987902965651&zoom=5size=400x300&maptype=mapnik&format=png&markers=40.465476578251,68.987902965651ltblu-pushpin',{ responseType:"arraybuffer" })
		.then(function(rep){
			sharp(rep.data)
				.overlayWith('./satelite.jpg')
				.png()
				.toBuffer()
				.then(function(output){
					callback(output);
				})
				.catch(console.error)
		}).catch(console.error);
}*/
