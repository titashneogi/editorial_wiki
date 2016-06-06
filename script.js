	// create the module and name it Winnerz
	var Editorial = angular.module('Editorial', ['ngRoute','ngStamplay']);

	// configure our routes
	Editorial.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/storylist/:id', {
				templateUrl : 'pages/storylist.html',
				controller  : 'mainController'
			})

	});

	// create the controller and inject Angular's $scope
	Editorial.controller('mainController', function($scope, $routeParams, $http,$stamplay) {
		var id = $routeParams.id;
		Stamplay.Query('object','draft_story').equalTo('username', id).exec().then(function(response){
			console.log("======response==========",response);
			$scope.storylist = response.data;
			$scope.$apply();
			console.log($scope.storylist[0].storyTitle);
		}, function(error) {
			console.log("======error==========",error);
		})

	});