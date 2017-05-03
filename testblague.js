var b = require('./blague');

//b(console.log);

var meteo = require('./meteo.js');

var iss = require('./iss.js');

var iss2 = require('./iss_bck.js');

console.log('index.js if iss condition');
iss.getImgLink(console.log);
console.log('display compose return value');
iss.Compose(console.log);
