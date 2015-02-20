var pageBuilder = angular.module('pageBuilder', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		
		$routeProvider.when('/', {
			templateUrl: 'app/modules/page_builder/templates/page_builder.html',
			controller: 'pageBuilderController',
		});

		$routeProvider.when('/page', {
			templateUrl: 'app/modules/page/templates/page.html',
			controller: 'pageController',
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}]);
