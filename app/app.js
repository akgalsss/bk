var pageBuilder = angular.module('pageBuilder', ['ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		
		$routeProvider.when('/', {
			templateUrl: 'app/modules/page_builder/templates/page_builder.html',
			controller: 'pageBuilder',
		});

		$routeProvider.when('/page', {
			templateUrl: 'app/modules/page/templates/page.html',
			controller: 'page',
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}]);
