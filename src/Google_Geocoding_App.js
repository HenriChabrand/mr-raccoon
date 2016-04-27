function getResult(callback, parameters) {

    if(parameters.geo_city){
        //Put your action here
        var city = parameters.geo_city;
        var country = 'FR';
        require('request')('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDLGejsdWAYT5BKgqqvmRQUoWtT34OWfE8&address='+city+','+country, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              callback(JSON.stringify(info.results[0].geometry.location)); 
            }else{
                callback({erro :"the request failed"});
            }
          });
          
    }else{
            
        callback({erro :"parameters are missing"});
    }
    
}

exports.getResult = getResult;
