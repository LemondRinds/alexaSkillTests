'use strict';
const Alexa = require('alexa-sdk');
const tinyreq = require("tinyreq");
const AppId = require('appId');
const SKILL_NAME = 'bobsuruncle';
var spchOut = "";
const handlers = {
    'LaunchRequest': function(){
        this.response.speak('Test Launch Request received.');
        //this.response.shouldEndSession(true);
        this.emit(':responseReady');
    },
    'questionIntent': function(){
		this.response.speak('started intent');
        const theNumber = this.event.request.intent.slots.number.value;
        var query = parseInt(theNumber);
        if(theNumber == undefined || isNaN(query)){
            this.emit(":delegate");
        }
        this.response.speak(query);
        var url = 'http://temp.cloudwatch.net/wp-json/wp/v2/users/me'
        tinyreq({url:url}).then(body => {
            if(query == 1){
                HelloWorldA(this);
            }
            if(query == 2){
                HelloWorldB(this); 
            }
            var json = JSON.parse(body);
            this.response.speak(spchOut + ' then ' + json.message);
			// audio player snip
			//.audioPlayerPlay('REPLACE_ALL', 'https://feeds.soundcloud.com/stream/275202399-amazon-web-  services-306355661-amazon-web-services.mp3', '1', null, 0);
            this.emit(':responseReady');
        }).catch(err => {
            var json = JSON.parse(err);
            var err = json.data.status
            if(err == undefined){ err = 'Bad error'; }
            this.response.speak('catch ' + err);
            this.emit(':responseReady');
        });
    },
    'AMAZON.HelpIntent': function(){
        const speechOutput = "Help.";
        const reprompt = "I mean, no.";
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function(){
        this.response.speak("Canceled");
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function(){
        this.response.speak("Stopped");
        this.emit(':responseReady');
    }
};
exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = AppId.APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
function HelloWorldA(ths){
    spchOut += 'Did a.';
}
function HelloWorldB(ths){
    spchOut += 'Did b.';
}
/*function repGet(ths){
    reqOutHandle(ths, 'http://temp.cloudwatch.net/wp-json/wp/v2/users/me');
}
function reqGet(ths, url){
    reqOutHandle(ths, url, {}, {});
}
function reqGet(ths, url, headers){
    reqOutHandle(ths, url, headers, {});
}
function reqPost(ths, url, headers){
    reqOutHandle(ths, url, headers);
}
function reqPost(ths, url, headers, data){
    reqOutHandle(ths, url, headers, data);
}
function reqOutHandle(ths, url, headers, data){
    var opts = {url:url};
    if(headers.length > 0){
        opts.headers = headers;
    }
    if(data.length > 0){
        opts.data = data;
    }
    tinyreq(opts).then(body => {
       ths.response.speak('then');
       ths.emit(':responseReady');
    }).catch(err => {
       ths.response.speak('catch');
       ths.emit(':responseReady');
    });
}*/