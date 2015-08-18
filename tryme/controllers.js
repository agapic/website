function HackerCtrl($scope,$http){

     $http.get('http://www.andrewgapic.com/tryme/hackers.json')
       .success(function(data){
          $scope.hackers = data;            
        });

    
$scope.addRow = function(text){	
    
    var row = {
        name: $scope.name,
        time: getTimeStamp(),
        //time: new Date().getTime(),
    };

$scope.update = function() {
    $http.put('http://www.andrewgapic.com/tryme/hackers.json', { "name":$scope.name, "time":getTimeStamp() });
};
    
	$scope.hackers.push({"name":$scope.name, "time":getTimeStamp() });

};
};

    
  $scope.export = function(){
    console.log(hackers);
    return hackers;
}


	

	