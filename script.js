	// create the module and name it Winnerz
	var Editorial = angular.module('Editorial', ['ngRoute','ngStamplay','ui.bootstrap']);

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
		Stamplay.Object("draft_story").get({page: 1, per_page: 100,username: id}).then(function(res) {
			$scope.storylist = res.data;
			$scope.$apply();
			console.log(res);
		}, function(err) {
			console.log(err);
		})
	});