function getResult(callback, json) {
     
    console.log("Call made : api_1_call_1");
    var input = json.input;
    
    if(input.city){
        //Put your action here
        var city = input.city;
        var country = 'FR';
        require('request')('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDLGejsdWAYT5BKgqqvmRQUoWtT34OWfE8&address='+city+','+country, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var info = JSON.parse(body);
              json.input.geoCode = info.results[0].geometry.location;
              
              
              
              json.index = json.index+1;
              if(json.step[json.index].nb=="end"){
                  callback(json.input[json.query]);
              }else{
                   var action_module = require('./'+ json.step[json.index].call_id + '.js');
                   action_module.getResult(function(result) {
                      callback(result); 
                   },json);
               }          
                        
            }else{
                callback("the request failed");
            }
          });
          
    }else{
            
        callback("parameters are missing");
    }
    
}

exports.getResult = getResult;
