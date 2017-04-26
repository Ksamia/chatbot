const axios = require('axios');

module.exports = function(searchString,callback){
	axios.get("https://api.imgur.com/3/gallery/search/?q=" + searchString, {headers : {'Authorization': "Client-ID e3ca79d47a9f4d5"}})
		.then(function(rep){
			//console.log(rep);
			//var forecast = "name : "+rep.data.city.name+", temperature : "+rep.data.list[0].temp.day+", weather : "+rep.data.list[0].weather[0].description;
			callback(rep);
		})
	
};

