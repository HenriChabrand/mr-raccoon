function getResult(callback, json) {
    
    console.log("Call made : api_2_call_2");
     
    var res = 'yolo';
    
    json.index = json.index+1;
    if(json.step[json.index].end){
         callback(res); 
     }else{
         var action_module = require('./'+ json.step[json.index].call_id + '.js');
         action_module.getResult(function(result) {
             console.log(json.step[json.index].call_id + " : " + result);
             callback(result); 
             
         },json);
     }     
}

exports.getResult = getResult;
