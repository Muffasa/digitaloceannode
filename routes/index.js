var express = require('express');
var twilio = require('twilio');
var fs = require('fs');
var Firebase=require('firebase');
var router = express.Router();


router.get('/CampaignsMap', function(req, res) {
    
        res.render('CampaignsMap.ejs');
    

 
});
router.get('/CreateCampaign', function(req, res) {
    
        res.render('CreateCampaign.ejs', {
        token:'lolz',
        userName:'kevin'
       });
    


});
router.post('/PostCampaign', function(req, res) {
    
    var raw = req.body;
    var test2= req.file;
    var test3= req.files;
var test = encodeURI(req.files.audio[0].filename)
    var campaign = {
        name:req.body.name,
        company:req.body.company,
        budget:req.body.budget,
        pps:req.body.pps,
        ppfl:req.body.ppfl,
        audio:{
            src:global.service_address+encodeURI(req.files.audio[0].filename) ,
            duration:req.body.audioDuration? req.body.audioDuration:10 ,
            language:"heb",
            binary:req.files.audio
        }
    };
    if(req.files.image){
        campaign.image={
            src:global.service_address+encodeURI(req.files.image[0].filename) ,
            binary:req.files.image
        }
    }
    if(req.body.latitude)
    {
        campaign.location={
            lat:req.body.latitude,
            lon:req.body.longitude,
            radius:req.body.radius
        };
    }
        




    var CampiagnsRef = new Firebase("https://mtdemo.firebaseio.com/campaigns/");
       var newCampaignRef =  CampiagnsRef.push();
       campaign.cid = newCampaignRef.key();
       newCampaignRef.set(campaign,function(error){
           if(error){
               console.log("an error occured the campain did not add to the DB, error:" ,+error);
               res.send("an error occured the campain did not add to the DB, error:" ,+error);
               return false;
           }
           else{
               console.log("campain succssesfuly added to the DB");
               res.send("campain succssesfuly added to the DB");
               return true;
           }
       });

});






module.exports = router;