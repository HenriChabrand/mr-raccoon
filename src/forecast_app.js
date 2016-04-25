// Require the module 
var Forecast = require('forecast.io');
 
// Initialize 
var forecast = new Forecast({
  service: 'forecast.io',
  key: '5fe274f52b8b66a83b716c68ff4da61f',
  units: 'celcius', // Only the first letter is parsed 
  cache: true,      // Cache API requests? 
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
    minutes: 27,
    seconds: 45
    }
});
 
// Retrieve weather information from coordinates (Sydney, Australia) 
forecast.get([-33.8683, 151.2086], function(err, weather) {
  if(err) return console.dir(err);
  console.dir(weather);
});
 
// Retrieve weather information, ignoring the cache 
forecast.get([-33.8683, 151.2086], true, function(err, weather) {
  if(err) return console.dir(err);
  console.dir(weather);
});

var x = 'Parameters : ';
var addX = function(value) {
  return  x + JSON.stringify(value) +" to prosses";
};
module.exports.x = x;
module.exports.get = addX;
