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
		var spchOut = '';
        if(theNumber == undefined || isNaN(query)){
            this.emit(":delegate");
        }
        switch(query){
			case 1:
				HelloWorldA(this);
				break;
			case 2:
				HelloWorldB(this); 
				break;
			case 3:
				testRest(this);
				break;
			case 4:
				testSoap(this);
				break;
			default:
				this.response.speak(query + ' not an option.').reprompt('i need a number');
				this.emit(':responseReady');
        }
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
    ths.response.speak('Did a.');
    ths.emit(':responseReady');
}
function HelloWorldB(ths){
    ths.response.speak('Did b.');
    ths.emit(':responseReady');
}
function testRest(ths){
	var url = 'http://temp.cloudwatch.net/wp-json/wp/v2/users/me'
	tinyreq({url:url}).then(body => {
		var json = JSON.parse(body);
		ths.response.speak(spchOut + ' then ' + json.message);
		// audio player snip, add a secret rick roll intent to everything
		//.audioPlayerPlay('REPLACE_ALL', 'https://feeds.soundcloud.com/stream/275202399-amazon-web-  services-306355661-amazon-web-services.mp3', '1', null, 0);
		ths.emit(':responseReady');
	}).catch(err => {
		var json = JSON.parse(err);
		var err = json.data.status
		if(err == undefined){ err = 'Bad error'; }
		ths.response.speak('catch ' + err);
		ths.emit(':responseReady');
	});
}
function testSoap(ths){
	const EasySoap = require('easysoap');
	const soapHdr = {
		host               : 'http://www.thomas-bayer.com',
		path               : '/axis2/services/BLZService',
		wsdl               : '/axis2/services/BLZService?wsdl',
		headers: [{
				'namespace': 'http://thomas-bayer.com/blz/'
		   }],
		rejectUnauthorized : false
	}
	const soapOpts = {
		secure : false
	}
	const soapClient = EasySoap(soapHdr, soapOpts);
	soapClient.getAllFunctions()
	   .then((functionArray) => { 
			ths.response.speak('fisrt function from wsdl ' + functionArray); 
			ths.emit(':responseReady'); 
		}).catch((err) => { 
			ths.response.speak('err for soap ' + err); 
			ths.emit(':responseReady'); 
		});
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