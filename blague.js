const axios = require('axios');

module.exports = function(callback){
	axios.get('https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1')
		.then(function(rep){
			callback(rep.data[0].fact);
		}).catch(console.error);
};

