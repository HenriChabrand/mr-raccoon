

function getResult(callback, parameters) {

if(isDefined(parameters.num_line){
    //Put your action here
    var num_line = parameters.num_line;
    
    require('request')('http://api-ratp.pierre-grimaud.fr/v2/traffic/metros/'+num_line, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          callback(info.response.message); 
        }else{
            callback({erro :"the request failed"});
        }
      });
      
    };
    
}else{
    callback({erro :"parameters are missing"});
}

exports.getResult = getResult;
