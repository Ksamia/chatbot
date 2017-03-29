const axios = require('axios');

module.exports = function(msg,id, callback){
	var content = msg.split(" ");
	if(content[0].trim() == '!meteo'){
		if(content.length < 2){
			callback('Message incompris');
			return;
		}
		var city = msg.replace('<@'+client.user.id+'>','').trim();
		axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&mode=json&units=metric&cnt=1&appid=99a63ddd6a41fc62bc4399029cffad4c')
		.then(function(rep){
			var forecast = "name : "+rep.data.city.name+", temperature : "+rep.data.list[0].temp.day+", weather : "+rep.data.list[0].weather[0].description;
			callback(forecast);
		}).catch(console.error);
	}
	
};
