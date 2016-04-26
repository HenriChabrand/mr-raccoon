

function get(callback, parameters) {
  var request = require('request');
  
  var num_line = parameters.num_line;
  
  var result_value = {status : "ini"};
  console.log("res 0 ",result_value);
  request('http://api-ratp.pierre-grimaud.fr/v2/traffic/metros/'+num_ligne, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body)
          result_value = {result : info.response.message};
          callback(result_value.result + num_ligne); 

      }else{
          result_value = {status :"erro"};
          callback(result_value);
      }
      
  
    });
  };

exports.get = get;
