function getResult(callback, json) {
    var token = '5fe274f52b8b66a83b716c68ff4da61f';
    console.log('call_id : api_2_call_1');
    var input = json.input;
    var all_required = false;
    if (geoCode.lat && geoCode.lng) {
        all_required = true;
    }
    if (all_required) {
        var call = 'https://api.forecast.io/forecast/' + token + '/' + geoCode.lat + ',' + geoCode.lng + '?units=si';
        require('request')(call, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                var data = info.currently;
                json.input.temperature = {
                    'value': data.temperature,
                    'unit': 'Cel'
                };
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
