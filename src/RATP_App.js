

function getResult(callback, parameters) {
  
  var num_line = parameters.num_line;
  
  require('request')('http://api-ratp.pierre-grimaud.fr/v2/traffic/metros/'+num_line, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        callback(info.response.message + num_line); 
      }else{
          callback({status :"erro"});
      }
    });
    
  };

exports.getResult = getResult;
