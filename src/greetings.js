var x = 'Parameters : ';
var addX = function(value) {
  return  x + JSON.stringify(value) +" to prosses";
};
module.exports.x = x;
module.exports.get = addX;
