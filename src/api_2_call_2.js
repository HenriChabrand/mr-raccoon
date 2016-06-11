function getResult(callback, json) {
    
    console.log("Call made : api_2_call_2");
     
   
    json.input.temperature = 23;
    json.input.humidity = 0.67;
    
    json.index = json.index+1;
    if(json.step[json.index].nb=="end"){
        callback(json);
    }else{
         var action_module = require('./'+ json.step[json.index].call_id + '.js');
         action_module.getResult(function(result) {
            callback(result); 
         },json);
     }  
     
}

exports.getResult = getResult;
