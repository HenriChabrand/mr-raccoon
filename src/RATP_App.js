

function getResult(callback, parameters) {
  
  var result_value = {status : "ini"};
  console.log("res 0 ",result_value);
  
  var request = require('request');
  
  var num_line = parameters.num_line;
  
  
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

exports.getResult = getResult;
