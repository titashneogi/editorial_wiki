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
			.when('/setup', {
				templateUrl : 'pages/setup.html',
				controller  : 'setupController'
			})

	});

	// create the controller and inject Angular's $scope
	Editorial.controller('mainController', function($scope, $rootScope,$routeParams, $http, $stamplay, $uibModal) {
		var id = $routeParams.id;
		Stamplay.Object("draft_story").get({page: 1, per_page: 100,username: id}).then(function(res) {
			$scope.storylist = res.data;
			$rootScope.list = res.data;
			$scope.$apply();
		}, function(err) {
			console.log(err);
		})

		$scope.animationsEnabled = true;
		$scope.open = function (index) {
			$rootScope.index = index;
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				size: undefined
			});

			modalInstance.result.then(function (newstory) {
				$scope.storylist[$rootScope.index].description = newstory.description
			}, function () {
				console.log("modal closed")
			});
		};

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};
	});

	Editorial.controller('ModalInstanceCtrl', function($scope,$rootScope,$uibModalInstance,$filter) {
		var a = new Date($rootScope.list[$rootScope.index].eta);
		$scope.data= {};
		$scope.data= {
			storyTitle : $rootScope.list[$rootScope.index].storyTitle,
			storyDescription: $rootScope.list[$rootScope.index].description,
			eta: a
		};

		$scope.ok = function () {
			$scope.eta= $filter('date')($scope.data.eta, "yyyy-MM-dd");

			var updateData = {
				storyTitle : $scope.data.storyTitle,
				description: $scope.data.storyDescription,
				eta: $scope.eta
			};
			Stamplay.Object("draft_story").update([$rootScope.list[$rootScope.index].id], updateData).then(function(res) {
				console.log(res)
				$uibModalInstance.close(res);
			}, function(err) {
				// Handle Error
			})
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
	
	Editorial.controller('setupController', function($scope,$http) {
		console.log("+++++++++++++++++++++++++");
		$scope.save =function(){
			console.log($scope.data);
			$http({
			    url: 'http://localhost:3000/setup/',
			    dataType: 'json',
			    method: 'POST',
			    data: $scope.data,
			    headers: {
			        "Content-Type": "application/json"
			    }

			}).success(function(response){
				alert("you have changed the questions");

			}).error(function(error){
			    $scope.error = error;
			});
		}
	});
