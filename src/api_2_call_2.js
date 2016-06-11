function getResult(callback, json) {
    
    console.log("Call made : api_2_call_2");
     
    var input = json.input;
    
    var all_required = false;
    if(input.geoCode&&input.date){
        var date = input.date;
        var geoCode = input.geoCode;
        all_required = true;
    }
    
    if(all_required){
        
        var date_ISO_8601 = date + 'T';
         console.log("input api_2_call_2 : ", input);
        /*
        if(input.time){
            console.log("input api_2_call_2 : ", input);
            console.log("time api_2_call_2 : ");
            //var time = input.time;
            //date_ISO_8601 += time.toString();
        }else{
            date_ISO_8601 += '00:00:00';
        }
        */
        date_ISO_8601 += 'Z';
        
        
        
        json.input.date_ISO_8601 = date_ISO_8601;
        
        json.index = json.index+1;
        if(json.step[json.index].nb=="end"){
            callback(json.input);
        }else{
             var action_module = require('./'+ json.step[json.index].call_id + '.js');
             action_module.getResult(function(result) {
                callback(result); 
             },json);
        }  
    } 
}

exports.getResult = getResult;
