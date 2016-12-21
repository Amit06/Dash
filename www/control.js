
mainApp.controller("studentController", function($scope,$window,$http,$window,$cookies) {

$scope.user={'pass':""};
var token="xxbbzzgg1234@gbweb";
var uids;

$scope.init = function(){
  $scope.ischeck=false;



   if( $cookies['gbwebStat']==token)
   {
     $scope.isw8=true;
     $scope.connected=true;

     $scope.dates={};
      var url = "/users";
      $http.get(url).success( function(response) {
        $scope.isw8=false;
         $scope.students = response.users;
           uids=Object.keys(response.users);

      },function(err)
        {
          $scope.isw8=false;
          alert("Error !Check logs for details")
          console.log(err);
      });
   }
   else {
     $scope.connected=false;
   }
}

$scope.logout = function()
{
  $cookies['gbwebStat']="";
  $scope.connected=false;
  $scope.$apply();
}
  $scope.submit = function()
  {


    var url="/login/"+$scope.user.pass;
    $scope.user.pass="";
    $http.get(url).success( function(response) {
      if(response=="true")
      {

        $scope.connected=true;


      $cookies['gbwebStat']= token;

      window.location.reload();
      }
      else {
        $scope.showError="WRONG PASSWORD";
         $cookies['gbwebStat']= "";
        $scope.connected=false;
      }
    },function(err)
      {
          $scope.connected=false;
        alert("Error !Check logs for details")
        console.log(err);
    });
  }



   $scope.check=function(uid)
   {
     $scope.ischeck=true;
     $window.scrollTo(0, 0);
     $scope.isAsk="Wait.. Getting Info";
     var x=uids[uid];
    var url = "/user/"+x;
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
