var express = require('express');
var app = express();
app.use(express.static('www'))
var cors=require('cors');
var admin = require("firebase-admin");
app.set('port', (process.env.PORT || 5000));
var serviceAccount = require("./gupta-bansal-148011-firebase-adminsdk-1aoco-adba688b11.json");
app.use(cors());
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gupta-bansal-148011.firebaseio.com"
});

var password="gupta.bansal@1234"

var db=admin.app().database().ref();
var y={};
db.on("value", function(snapshot) {
  y=snapshot.val();
});

app.get('/users', function(req, res){
    res.send(y);
});
app.get('/user/:id', function(req, res){
  var uid=req.params.id;
  admin.auth().getUser(uid)
  .then(function(userRecord) {

    //console.log("Successfully fetched user data:", userRecord.toJSON().metadata);

    res.send(userRecord.toJSON());

  })
  .catch(function(error) {
    res.send(error);
    console.log("Error fetching user data:", error);
  });

});
app.get('/module.js', function(req, res){
    res.sendFile("module.js");
});
app.get('/login/:pwd', function(req, res){
    var pass = req.params.pwd;

    var rep;
    if(pass==password)
    {
      rep='true';
    }
    else {
      rep='false';
    }
    res.send(rep);
});
app.get('/control.js', function(req, res){
    res.sendFile("control.js");
});

app.get('/', function(req, res) {
       res.sendFile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
   });

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
