var request = require('request');
var num_ligne = 3;

var info = function(num_ligne) {
  
  var result_value = {status :"ini"};
  
  console.log("RATP : ", 'Ini Global');
  request('http://api-ratp.pierre-grimaud.fr/v2/traffic/metros/13', function (error, response, body) {
    console.log("RATP : ", 'Ini request');
    if (!error && response.statusCode == 200) {
      console.log("RATP : ", 'Ini if');
       
      var info = JSON.parse(body)
      console.log("RATP : IF :", info.response.message);
        result_value = {result : info.response.message};
        callback(result_value);
        console.log("RATP : result 1 :", result_value);
    }else{
        console.log("RATP : ", 'Ini else');
        result_value = {status :"erro"};
        callback(result_value);
    }
  });
console.log("RATP : result 2 :", result_value);
    return  result_value;
};


module.exports.num_ligne = num_ligne;
module.exports.info = info;
