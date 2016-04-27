function getResult(callback, parameters) {

    if(parameters.geo-city){
        //Put your action here
        var city = parameters.geo-city;
        
        require('request')('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDLGejsdWAYT5BKgqqvmRQUoWtT34OWfE8&address='+city, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              callback({lat : info.results[0].geometry.location.lat, lng : info.results[0].geometry.location.lng}); 
            }else{
                callback({erro :"the request failed"});
            }
          });
          
    }else{
            
        callback({erro :"parameters are missing"});
    }
    
}

exports.getResult = getResult;
