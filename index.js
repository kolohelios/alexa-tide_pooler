'use strict';

var Alexa = require('alexa-sdk'); 1

require('dotenv').config(); 2

var SKILL_NAME = 'Tide Pooler'; 3

exports.handler = function(event, context, callback) { 4
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () { 5
        this.emit('AMAZON.HelpIntent');
    },
    'GetTideIntent': function () {
        var citySlot = this.event.request.intent.slots.City; 6
        var cityName;
        if (citySlot && citySlot.value) { 7
            cityName = citySlot.value;

            var cardTitle = SKILL_NAME + " High Tide For - " + cityName; 8
            var time = "5:00pm";
            var speechOutput = "It will be high tide in " +
                               cityName + " at " + time;
            this.emit(':tellWithCard', speechOutput, SKILL_NAME, 9
                      cardTitle, time);

          } else { 10
            var speechOutput =
                'I\'m sorry, I don\'t know when high tide is for that location';
            this.emit(':tell', speechOutput);
          }
    },
    'AMAZON.HelpIntent': function () { 11
        var speechOutput = "You can say when is high tide in city name, or, " +
                           "you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () { 12
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
