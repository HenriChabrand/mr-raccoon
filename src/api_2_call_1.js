function getResult(callback, json) {
    var token = '5fe274f52b8b66a83b716c68ff4da61f';
    console.log('call_id : api_2_call_1');
    var input = json.input;
    var all_required = false;
    if (input.geoCode.lat && input.geoCode.lng) {
        all_required = true;
    }
    if (all_required) {
        var call = 'https://api.forecast.io/forecast/' + token + '/' + input.geoCode.lat + ',' + input.geoCode.lng + '?units=si';
        require('request')(call, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                
                //if(!json.input.has('temperature')){
                    json.input.temperature = {};
                    json.input.temperature.value = info.currently.temperature;
              //  }else{
                    //json.input.temperature.value = info.currently.temperature;
                //}
                
               // if(!json.input.has('temperature')){
                    json.input.temperature = {};
                    json.input.temperature.unit = "C";
                //}else{
               //     json.input.temperature.unit = "C";
              //  }
                
                json.index = json.index + 1;
                if (json.step[json.index].nb == 'end') {
                    callback(json.input[json.query]);
                } else {
                    var action_module = require('./' + json.step[json.index].call_id + '.js');
                    action_module.getResult(function(result) {
                        callback(result);
                    }, json);
                }
            } else {
                callback('the request failed');
            }
        });
    }
}
exports.getResult = getResult;
