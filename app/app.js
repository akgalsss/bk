var pageBuilder = angular
	.module('pageBuilder', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		
		$routeProvider.when('/', {
			templateUrl: 'app/modules/views/pageBuilderView.html',
			controller: 'pageBuilderCtrl',
		});

		$routeProvider.when('/page', {
			templateUrl: 'app/modules/views/pageView.html',
			controller: 'pageCtrl',
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}]);
