function pageBuilderCtrl($scope, $compile, $templateCache, $http) {

	// render and display tool 
	var renderTool = function (tool) {

		var page = $('#page'),
			template = "<div draggable class='"+tool.class+"' style='background-color: "+((tool.color)?tool.color:"")+"; width:"+tool.width+"; height: "
			+tool.height+"'>"+tool.data+"</div>";

		angular.element(page).append($compile(template)($scope));
	}


	$scope.toolTextBlock = function () {
		var tool = {} ;

		//--  mockup color generator
		var letters = '0123456789ABCDEF'.split(''),
			color = '#';

		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		} 
		//-- end mockup

		$http.get('/data/textBlockTool.json').success(function(data) {
			tool = data;
			tool.color = color;
			renderTool(tool);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get text tool data - ", status);
		});;
	}


	$scope.toolImageBlock = function () {
		var tool = {} ;

		$http.get('/data/imageBlockTool.json').success(function(data) {
			tool = data;
			renderTool(tool);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get image tool data - ", status);
		});;
	}




}
