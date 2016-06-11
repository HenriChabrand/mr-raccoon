function getResult(callback, json) {
    
    console.log("Call made : api_2_call_2");
     
    var input = json.input;
    
    var all_required = false;
    if(input.geoCode&&input.date){
        var date = input.date;
        var lat = input.geoCode.lat;
        var lng = input.geoCode.lng;
        
        all_required = true;
    }
    
    if(all_required){
        
        var date_ISO_8601 = date + 'T';
        
        if(input.time){
            var time = input.time;
            date_ISO_8601 += time;
            
            var hour_min_sec_str = time.split(":");
            var hour_str = hour_min_sec_str[0];
            var hour = parseInt(hour_str,10);
        }else{
            date_ISO_8601 += '00:00:00';
        }
        
        date_ISO_8601 += 'Z';
        
        
        
        json.input.date_ISO_8601 = date_ISO_8601;
        
        if(input.time){
             json.input.hour = hour;
        }
        
        var call = 'https://api.forecast.io/forecast/5fe274f52b8b66a83b716c68ff4da61f/'+lat+','+lng+','+date_ISO_8601;
        
        require('request')(call, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  json.input.timezone = info.timezone;
              
              
              
                json.index = json.index+1;
                if(json.step[json.index].nb=="end"){
                    callback(json.input);
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
        
          
    } 
}

exports.getResult = getResult;
