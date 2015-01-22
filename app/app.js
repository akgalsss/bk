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


pageBuilder.service('propPanelServ', function () {
	this.isActive = false;

	this.hidePropPanel = function () {
		this.isActive = false;
	}

	this.showPropPanel = function () {
		this.isActive = true;
	}

	this.checkIsActive = function () {
		return this.isActive;
	}

});