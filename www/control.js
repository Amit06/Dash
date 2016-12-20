mainApp.controller("studentController", function($scope,$window,$http) {

  var uids;
  $scope.dates={};
   var url = "http://localhost:3000/users";
   $http.get(url).success( function(response) {
      $scope.students = response.users;
        uids=Object.keys(response.users);
      console.log($scope.students);
   },function(err)
     {
       alert("Error !Check logs for details")
       console.log(err);
   });

   $scope.check=function(uid)
   {
     $window.scrollTo(0, 0);
     $scope.isAsk="Wait.. Getting Info";
     var x=uids[uid];
    var url = "http://localhost:3000/user/"+x;
     $http.get(url).success( function(response) {
       var x= response.metadata.lastSignedInAt;
       var y=new Date(x);
       $scope.isAsk="Last Sign in for user #"+(uid+1)+" :   "+y;
       },function(err)
       {
         $scope.isAsk="Error ! Check logs";
         alert("Check logs for error");
         console.log(err);
     });


   }

});
