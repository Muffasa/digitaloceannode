
var twilio = require('twilio'),
    express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var path = require("path"); 
var app = express();
global.service_address="http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'campaigns-data')
     /* if(file.fieldname=='image')
    cb(null, '/campaigns-data/campaigns-images')
    else
    cb(null, '/campaigns-data/campaigns-audios')*/
  },
  filename: function (req, file, cb) {
    cb(null,req.body.name + '-' + file.fieldname +'.' +file.mimetype.split('/')[1])
  }
});

 app.use(express.static(path.join(process.cwd(), 'ringtons')));
 app.use(express.static(path.join(process.cwd(), 'public')));
 app.use(express.static(path.join(process.cwd(), 'js')));
 app.use(express.static(path.join(process.cwd(), 'campaigns-data')));
 

app.use(multer({ storage: storage}).fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(allowCrossDomain);

app.use('/', require('./routes/index'));
app.use('/', require('./routes/twilio-web-clients'));
app.listen(parseInt(process.env.SERVER_PORT));


process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});

console.log('Server Service on '+ global.service_address);
