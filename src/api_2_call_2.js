function getResult(callback, json) {
     console.log("json", json);
      json.output[json.query] = '12';
    callback(json); 
            
    
}

exports.getResult = getResult;
