function getResult(callback, parameters) {

    parameters.lat = 48.856614;
    parameters.lng = 2.352221;
    
    var action_module = require('./Google_Geocoding_App.js');
    action_module.getResult(function(result) {
        console.log("Weather -> Geocode : " + result);
        parameters = result;
        if(parameters.lat&&parameters.lng){
            
            console.log("Weather : " + parameters.lat);
             console.log("Weather : " + parameters.lng);
        //Put your action here
        require('request')('https://api.forecast.io/forecast/5fe274f52b8b66a83b716c68ff4da61f/'+parameters.lat+','+parameters.lng, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              callback(JSON.stringify(info.currently.summary)); 
            }else{
                callback("the request failed");
            }
          });
          
        }else{
                console.log("Weather : erro" + parameters);
            callback("parameters are missing");
        }
    },parameters);   
    
    
    
    
    
    
}

exports.getResult = getResult;
