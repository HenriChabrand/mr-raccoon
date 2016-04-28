function getResult(callback, parameters) {

   
    
    var action_module = require('./Google_Geocoding_App.js');
    action_module.getResult(function(newParameters) {
        console.log("Weather -> Geocode : " + newParameters);
        console.log("Weather -> Geocode lat : " + newParameters.lat);
        
        if(newParameters){
            console.log("Weather all : " + newParameters);
            console.log("Weather lat : " + newParameters.lat);
             console.log("Weather lng : " + newParameters.lng);
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
