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
                if (!json.input.timeZone) {
                    json.input.timeZone = {};
                }
                json.input.timeZone.name = info.timezone;
                if (!json.input.timeZone) {
                    json.input.timeZone = {};
                }
                json.input.timeZone.offset = info.offset;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                json.input.weather.summary = info.currently.summary;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                if (!json.input.weather.precipitation) {
                    json.input.weather.precipitation = {};
                }
                json.input.weather.precipitation.intensity = info.currently.precipIntensity;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                if (!json.input.weather.precipitation) {
                    json.input.weather.precipitation = {};
                }
                json.input.weather.precipitation.probability = info.currently.precipProbability;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                if (!json.input.weather.temperature) {
                    json.input.weather.temperature = {};
                }
                json.input.weather.temperature.value = info.currently.temperature;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                if (!json.input.weather.temperature) {
                    json.input.weather.temperature = {};
                }
                json.input.weather.temperature.apparent = info.currently.apparentTemperature;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                if (!json.input.weather.humidity) {
                    json.input.weather.humidity = {};
                }
                json.input.weather.humidity.percent = info.currently.humidity;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                if (!json.input.weather.windSpeed) {
                    json.input.weather.windSpeed = {};
                }
                json.input.weather.windSpeed.value = info.currently.windSpeed;
                if (!json.input.weather) {
                    json.input.weather = {};
                }
                if (!json.input.weather.visibility) {
                    json.input.weather.visibility = {};
                }
                json.input.weather.visibility.value = info.currently.visibility;
                json.index = json.index + 1;
                if (json.step[json.index].nb == 'end') {
                    var query_array = json.query.split('.');
                    var output = json.input;
                     console.log('api_2_call_1 :  res : ',output);
                    for (var i = 0; i < query_array.length; i++) {
                        output = output[query_array[i]];
                        console.log('api_2_call_1 :  res : ',i,output);
                    }
                    if (output) {
                        callback(json);
                    } else {
                        callback(json.input);
                    }
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
