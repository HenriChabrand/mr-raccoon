function getResult(callback, json) {
    var token = '';
    console.log('call_id : api_5_call_2');
    var input = json.input;
    var all_required = false;
    if (input.spotify.artist.id) {
        all_required = true;
    }
    if (all_required) {
        var call = 'https://api.spotify.com/v1/artists/' + input.spotify.artist.id + '/top-tracks?country=FR';
        require('request')(call, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                if (!json.input.spotify) {
                    json.input.spotify = {};
                }
                if (!json.input.spotify.track) {
                    json.input.spotify.track = {};
                }
                json.input.spotify.track.previewUrl = info.tracks[0].preview_url;
                json.index = json.index + 1;
                if (json.step[json.index].nb == 'end') {
                    console.log('result : api_5_call_2 :',json.input);
                    var query_array = json.query.split('.');
                    var output = json.input;
                    for(var i= 0; i < query_array.length; i++){
                        output = output[query_array[i]];
                    }
                     if(output){
                         callback(output);
                     }else{
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
