'use strict';

const apiai = require('apiai');
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const request = require('request');

const REST_PORT = (process.env.PORT || 5000);
const APIAI_ACCESS_TOKEN = '798d7a884de94566872e37c9959f1712';
const APIAI_LANG = process.env.APIAI_LANG || 'en';
const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

const apiAiService = apiai(APIAI_ACCESS_TOKEN, {language: APIAI_LANG, requestSource: "fb"});
const sessionIds = new Map();

function processEvent(event) {
    
    console.log("event",JSON.stringify(event));
    var sender = event.sender.id;

    if (event.message && event.message.text) {
        var text = event.message.text;
        // Handle a text message from this sender

        if (!sessionIds.has(sender)) {
            sessionIds.set(sender, uuid.v1());
        }

        console.log("Text", text);

        let apiaiRequest = apiAiService.textRequest(text,
            {
                sessionId: sessionIds.get(sender)
            });

        apiaiRequest.on('response', (response) => {
            if (isDefined(response.result)) {
                let responseText = response.result.fulfillment.speech;
                let responseData = response.result.fulfillment.data;
                let action = response.result.action;
                let actionIncomplete = response.result.actionIncomplete;
                let parameters = response.result.parameters;
                
                if (action&&!actionIncomplete){
                    
                    try {
                        console.log(action +" : start");
                        //sendFBMessage(sender, {text: "I ask "+action+"..."});
                        var action_module = require('./'+ action + '_App.js');
                        action_module.getResult(function(result) {
                            //console.log(action + " : " + result);
                            
                            var toText = JSON.stringify(result.trim());
                            
                            var splittedText = splitResponse(toText);
                        
                            for (var i = 0; i < splittedText.length; i++) {
                                sendFBMessage(sender, {text: splittedText[i]});
                            }
                            
                        },parameters);
                    
                    } catch(e) {
                        console.log(action +" is not found");
                    }
                    
                }else{
                    console.log("no action");
                    request({
                        //headers: {'content-type' : 'application/x-www-form-urlencoded'},
                        //url: 'http://mr-raccoon.com/api.php',
                        //method: 'POST',
                       // body:    "mes=heydude"
                        headers: {'content-type' : 'Content-Type: application/json'},
                       url: 'http://mr-raccoon.com/OneCall/api.php',
                          method: 'POST',
                          json: parameters
                    }, function (error, response, body) {
                       // console.log('body ----->: ',body);
                         
                        var json_step = JSON.parse(body);
                        console.log('step ----->: ',json_step);
                       
                        
                        if(json_step.statut=="200"){
                            var action_module = require('./'+ json_step.step[json_step.index].call_id + '.js');
                            action_module.getResult(function(result) {
                                //console.log('result ----->: ',result);
                                
                                request({
                        //headers: {'content-type' : 'application/x-www-form-urlencoded'},
                        //url: 'http://mr-raccoon.com/api.php',
                        //method: 'POST',
                       // body:    "mes=heydude"
                        headers: {'content-type' : 'Content-Type: application/json'},
                       url: 'http://mr-raccoon.com/OneCall/apiContext.php',
                          method: 'POST',
                          json: result
                    });
                                if(result.query){
                                    var query_array = result.query.split('.');
                                    var output = result.input;
                                    for (var i = 0; i < query_array.length; i++) {
                                        output = output[query_array[i]];
                                    }
                                    if (output) {
                                        var toText = JSON.stringify(output);
                                        var splittedText = splitResponse(toText);
                                        
                                        for (var i = 0; i < splittedText.length; i++) {
                                            sendFBMessage(sender, {text: splittedText[i]});
                                        }
                                    }
                                }else{
                                    var toText = JSON.stringify(result);
                                    console.log('result ----->: ',result);
                                    var splittedText = splitResponse(toText);
                                    
                                    for (var i = 0; i < splittedText.length; i++) {
                                        sendFBMessage(sender, {text: splittedText[i]});
                                    }
                                }
                            },json_step);
                        }else{
                            var noSolutionReprompt = "Nope. ";
                            if(json_step.query){
                                noSolutionReprompt += "I think some information are missing to give you the "+json_step.query+". See by yourself : " + JSON.stringify(json_step.input);
                            }else{
                                noSolutionReprompt += "I didn't understand what you are looking for...";
                            }
                            var splittedText = splitResponse(noSolutionReprompt);
                            
                            for (var i = 0; i < splittedText.length; i++) {
                                sendFBMessage(sender, {text: splittedText[i]});
                            }
                        }
                            
                        if (error) {
                            console.log('Error sending message: ', error);
                        } else if (response.body.error) {
                            console.log('Error: ', response.body.error);
                        }
                    });
                    
                    /*
                    if (isDefined(responseData) && isDefined(responseData.facebook)) {
                        try {
                            console.log('Response as formatted message');
                            sendFBMessage(sender, responseData.facebook);
                        } catch (err) {
                            sendFBMessage(sender, {text: err.message });
                        }
                    } else if (isDefined(responseText)) {
                        console.log('Response as text message');
                        // facebook API limit for text length is 320,
                        // so we split message if needed
                        var splittedText = splitResponse(responseText);
                        
                        for (var i = 0; i < splittedText.length; i++) {
                            sendFBMessage(sender, {text: splittedText[i]});
                        }
                    }    */  
                   
                    
                }

            }
        });

        apiaiRequest.on('error', (error) => console.error(error));
        apiaiRequest.end();
    }
}

function splitResponse(str) {
    if (str.length <= 320)
    {
        return [str];
    }

    var result = chunkString(str, 300);

    return result;

}

function chunkString(s, len)
{
    var curr = len, prev = 0;

    var output = [];

    while(s[curr]) {
        if(s[curr++] == ' ') {
            output.push(s.substring(prev,curr));
            prev = curr;
            curr += len;
        }
        else
        {
            var currReverse = curr;
            do {
                if(s.substring(currReverse - 1, currReverse) == ' ')
                {
                    output.push(s.substring(prev,currReverse));
                    prev = currReverse;
                    curr = currReverse + len;
                    break;
                }
                currReverse--;
            } while(currReverse > prev)
        }
    }
    output.push(s.substr(prev));
    return output;
}

function sendFBMessage(sender, messageData) {
    

    var to_string = JSON.stringify(messageData.text);
    var to_size = to_string.substring(0, 319);
    
    
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: FB_PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
            //message: {text : to_size } 
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function doSubscribeRequest() {
    request({
            method: 'POST',
            uri: "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=" + FB_PAGE_ACCESS_TOKEN
        },
        function (error, response, body) {
            if (error) {
                console.error('Error while subscription: ', error);
            } else {
                console.log('Subscription result: ', response.body);
            }
        });
}

function isDefined(obj) {
    if (typeof obj == 'undefined') {
        return false;
    }

    if (!obj) {
        return false;
    }

    return obj != null;
}

const app = express();
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", '*');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, accept");
    next();
});

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] == FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
        
        setTimeout(function () {
            doSubscribeRequest();
        }, 3000);
    } else {
        res.send('Error, wrong validation token');
    }
});

app.post('/webhook/', function (req, res) {
    try {
        var messaging_events = req.body.entry[0].messaging;
        for (var i = 0; i < messaging_events.length; i++) {
            var event = req.body.entry[0].messaging[i];
            processEvent(event);
        }
        return res.status(200).json({
            status: "ok"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            error: err
        });
    }

});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});

doSubscribeRequest();
