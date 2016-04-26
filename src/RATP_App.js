var request = require('request');
var info = function(num_ligne) {
  var res = {end : "end"};
  var result_value = {result_value};
  console.log("res 0 ",result_value);
  request('http://api-ratp.pierre-grimaud.fr/v2/traffic/metros/13', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
          result_value = {result : info.response.message};
          return  result_value;
      }else{
          result_value = {status :"erro"};
          return  result_value;
      }
      
  console.log("res 1 ",result_value);
    });
    
  console.log("res 2 ",result_value);
  };

module.exports.info = info;
