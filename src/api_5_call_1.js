function getResult(callback, json) {
    var token = '';
    console.log('call_id : api_5_call_1');
    var input = json.input;
    var all_required = false;
    if (input.artistLike) {
        all_required = true;
    }
    if (all_required) {
        var call = 'https://api.spotify.com/v1/search?q=' + input.artistLike + '&type=artist';
        require('request')(call, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                if (!json.input.artist) {
                    json.input.artist = {};
                }
                json.input.artist.genre = info.json.artists.items[0].genres[0];
                if (!json.input.spotify) {
                    json.input.spotify = {};
                }
                if (!json.input.spotify.artist) {
                    json.input.spotify.artist = {};
                }
                json.input.spotify.artist.id = info.json.artists.items[0].id;
                if (!json.input.artist) {
                    json.input.artist = {};
                }
                json.input.artist.pictureUrl = info.json.artists.items[0].images[0].url;
                if (!json.input.artist) {
                    json.input.artist = {};
                }
                json.input.artist.name = info.json.artists.items[0].name;
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
