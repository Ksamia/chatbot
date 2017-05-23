const axios = require('axios');

module.exports = function(city,id, callback){
	axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&mode=json&units=metric&cnt=2&appid=99a63ddd6a41fc62bc4399029cffad4c')
		.then(function(rep){
			console.log(rep.data.list);
			var forecast = "name : "+rep.data.city.name+", temperature : "+rep.data.list[0].temp.day+", weather : "+rep.data.list[0].weather[0].description;
			callback(forecast);
		}).catch(console.error);
	
};
