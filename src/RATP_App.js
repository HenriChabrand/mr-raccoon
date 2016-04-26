

function info(callback, num_ligne) {
  var request = require('request');
  
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

exports.info = info;
