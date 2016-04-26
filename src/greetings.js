var x = 'Parameters : ';
var addX = function(value) {
  
  request({
        url: 'http://api-ratp.pierre-grimaud.fr/v2/metros/8/stations/275',
        method: 'GET',
        json: {
            destination : 23
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
        
        console.log(SON.stringify(response));
    });
    
    return  x + JSON.stringify(value) +" to prosses";
};


    
module.exports.x = x;
module.exports.get = addX;
