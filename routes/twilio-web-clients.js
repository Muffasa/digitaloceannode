var express = require('express');
var twilio = require('twilio');
var fs = require('fs');
var Firebase=require('firebase');
var router = express.Router();


router.get('/kevin', function(req, res) {
    

    var capability = new twilio.Capability(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );
    // Give the capability generator permission to accept incoming
    // calls to the ID "kevin"
    capability.allowClientIncoming('kevin');
    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
    //capability.allowClientOutgoing('APf38c10befb847d3dba5fbda4c290f000');//origin first
    capability.allowClientOutgoing('AP1cadf539a83d36562bdd268bd96b8903');//ionic
    // Render an HTML page which contains our capability token
    res.render('index.ejs', {
        token:capability.generate(),
        userName:'kevin'
    });

});






router.get('/tom', function(req, res) {
    
    /*var capability = new twilio.Capability(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );*/
    var capability = new twilio.Capability(
       'AC13c8bc5cde5613c706cde6638665d2db',
        'bb96487cff1af4f655fd2068a0287b6a'
    );
    // Give the capability generator permission to accept incoming
    // calls to the ID "kevin"
    capability.allowClientIncoming('+972-tom');
    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
        //capability.allowClientOutgoing('APf38c10befb847d3dba5fbda4c290f000');//origin first
    capability.allowClientOutgoing('AP1cadf539a83d36562bdd268bd96b8903');//ionic
 
    // Render an HTML page which contains our capability token
    res.render('index.ejs', {
        token:capability.generate(),
        userName:'+972-tom'
    });

});

router.get('/ohad', function(req, res) {
    
    var capability = new twilio.Capability(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );
    // Give the capability generator permission to accept incoming
    // calls to the ID "kevin"
    capability.allowClientIncoming('+972-ohad');
    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
        //capability.allowClientOutgoing('APf38c10befb847d3dba5fbda4c290f000');//origin first
    capability.allowClientOutgoing('AP1cadf539a83d36562bdd268bd96b8903');//ionic
 
    // Render an HTML page which contains our capability token
    res.render('index.ejs', {
        token:capability.generate(),
        userName:'+972-ohad'
    });

});


module.exports = router;