var express = require('express');
var app = express();
app.use(express.static('www'))
var cors=require('cors');
var admin = require("firebase-admin");
var serviceAccount = require("./bookapp-146604-firebase-adminsdk-jo6x6-de1b464e86.json");
app.use(cors());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookapp-146604.firebaseio.com/"
});

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

app.get('/control.js', function(req, res){
    res.sendFile("control.js");
});

app.get('/', function(req, res) {
       res.sendFile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
   });

app.listen(3000);
