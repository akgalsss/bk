var pageBuilder = angular
	.module('pageBuilder', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		
		$routeProvider.when('/', {
			templateUrl: '/views/pageBuilderView.html',
			controller: 'pageBuilderCtrl',
		});

		$routeProvider.when('/page', {
			templateUrl: '/views/pageView.html',
			controller: 'pageCtrl',
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}]);
