todoApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '/app/components/todo/todoView.html',
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);