var request = require('request');
var num_ligne = 3;

var info = function(num_ligne) {
  
  var result_value = {status :"ini"};
  
  request('http://api-ratp.pierre-grimaud.fr/v2/traffic/metros/13', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      
        result_value = info.response.message;
    }else{
        
        result_value = {status :"erro"};
    }
  });

    return  result_value;
};


module.exports.num_ligne = num_ligne;
module.exports.info = info;
