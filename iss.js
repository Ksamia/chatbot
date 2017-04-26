const axios = require('axios');

const sharp = require('sharp');

var coordinates = {long:0, lat:0, img:''};

/*module.exports = function(callback){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			console.log(rep.data.latitude);
			coordinates.long = rep.data.longitude;
			coordinates.lat = rep.data.latitude;
			coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
			sharp(coordinates.img)
				.overlayWith('https://i.downloadatoz.com/download/icon2/c/9/5/e3c8de70b0e1170c327696c64c8bc59c.jpg', { top:coordinates.latitude, left:coordinates.longitude } )
			  	.toFile('output.jpg');
			callback(JSON.stringify(coordinates));
		})
		.catch(console.error);
}*/

function getImage(){
	axios.get('https://api.wheretheiss.at/v1/satellites/25544')
		.then(function(rep){
			console.log(rep.data.latitude);
			coordinates.long = rep.data.longitude;
			coordinates.lat = rep.data.latitude;
			coordinates.img = 'http://staticmap.openstreetmap.de/staticmap.php?center='+rep.data.latitude+','+rep.data.longitude+'&zoom=5size=400x300&maptype=mapnik&markers='+rep.data.latitude+','+rep.data.longitude+'ltblu-pushpin';
		})
		.catch(console.error);
}

module.exports = function(callback){
	axios.get('http://staticmap.openstreetmap.de/staticmap.php?center=40.465476578251,68.987902965651&zoom=5size=400x300&maptype=mapnik&markers=40.465476578251,68.987902965651ltblu-pushpin')
		.then(function(rep){
			sharp(rep)
				.overlayWith('https://i.downloadatoz.com/download/icon2/c/9/5/e3c8de70b0e1170c327696c64c8bc59c.jpg', { top:40.465476578251, left:68.987902965651} )
				.png
			  	.toBuffer()
				.then(function(buff){
					console.log(buff);
					console.log('lal')
				});
			
		})
	}
	
  
