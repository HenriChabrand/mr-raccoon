function getResult(callback, parameters) {

    parameters.lat = 48.856614;
    parameters.lng = 2.352221;
    
    var action_module = require('./Google_Geocoding_App.js');
    action_module.getResult(function(newParameters) {
        console.log("Weather -> Geocode : " + newParameters);
        
        if(newParameters){
            
            console.log("Weather : " + newParameters.lat);
             console.log("Weather : " + newParameters.lng);
        //Put your action here
        require('request')('https://api.forecast.io/forecast/5fe274f52b8b66a83b716c68ff4da61f/'+newParameters.lat+','+newParameters.lng, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              callback(JSON.stringify(info.currently.summary)); 
            }else{
                callback("the request failed");
            }
          });
          
        }else{
                console.log("Weather : erro" + newParameters);
            callback("parameters are missing");
        }
    },parameters);   
    
    
    
    
    
    
}

exports.getResult = getResult;
