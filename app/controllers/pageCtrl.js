function pageCtrl($scope, $http) {

	// get page data 
	var getPageData = function () {

		$http.get('/data/page.json').success(function(data) {
			renderPage(data);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get page data - ", status);
		});
	}

	// render page
	var renderPage = function (data) {

		for (var p in data) {
			if( data.hasOwnProperty(p) ) {
				console.log(p, data[p]);
			}
		}

		console.log(data);
	}

	$scope.$on('$viewContentLoaded', function(){
		getPageData();
	});


}
