var request = require('request');
var num_ligne = 3;

var info = function(num_ligne) {
  
  (function (exports) {
  'use strict';
 
  var Sequence = exports.Sequence || require('sequence').Sequence
    , sequence = Sequence.create()
    , err
    ;
 
  sequence
    .then(function (next) {
      setTimeout(function () {
        next(err, "Hi", "World!");
      }, 120);
      console.log("Text", "then 1");
    })
    .then(function (next, err, a, b) {
      setTimeout(function () {
        next(err, "Hello", b);
      }, 270);
      console.log("Text", "then 2");
    })
    .then(function (next, err, a, b) {
      setTimeout(function () {
        console.log(a, b);
        next();
      }, 50);
       console.log("Text", "then 3");
    });
 
// so that this example works in browser and node.js 
}('undefined' !== typeof exports && exports || new Function('return this')()));
  
  
  return { end : "end"};
  };


module.exports.num_ligne = num_ligne;
module.exports.info = info;
