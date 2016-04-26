var x = 'Parameters : ';
var addX = function(value) {
  
  request({
        url: 'http://api-ratp.pierre-grimaud.fr/v2/metros/8/stations/275',
        method: 'GET',
        json: {
            destination : 23
        }
    });
    
    return  x + JSON.stringify(value) +" to prosses";
};


    
module.exports.x = x;
module.exports.get = addX;
