
var resp="<!DOCTYPE html><html><head><style>table, th, td {border: 1px solid black;}</style></head><body><table style=\"width:100%\">"+
 "<tr>"+
   "<th>Name</th>"+
   "<th>Email</th>"+
   "<th>Phone</th>"+
   "<th>Designation</th>"+
   "<th>Institution Details</th>"+
 "</tr>";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookapp-146604.firebaseio.com/"
});
var x;
var c=0;
var db=admin.app().database().ref();
console.log("Wait . . .")
db.on("value", function(snapshot) {
  y=snapshot.val();


console.log(y);
    /*for(x in y.users)
    {

      resp+="<tr>"+
      "<td>"+y.users[x].name+"</td>"+
      "<td>"+y.users[x].email+"</td>"+
      "<td>"+y.users[x].phone+"</td>"+
      "<td>"+y.users[x].choice+"</td>"+
      "<td> <b>NAME : </b>"+y.users[x].institute.name+"<br> <b>STATE : </b>"+
      y.users[x].institute.state+"<br> <b>PINCODE : </b>"+
      y.users[x].institute.pincode+"</td>"+
    "</tr>"
    }

    Serve();
    resp+="</body></html>"*/
  //createTable(x,c);

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  console.log("Are you connected to internet.");
  console.log("Try Again");
});
