function pageBuilderCtrl($scope, $compile) {

	$scope.textBlockParams = {
		width  : "250px",
		height : "120px"
	}


	$scope.toolTextBlock = function (params1) {
		var tool = {} ;

		tool.params = params1;
		renderTool(tool);
	}

	var renderTool = function (tool) {
		console.log("render");

		var page = $('#page'),
			template = "<div draggable class='toolTextBlock' style='width:{{tool.params.width}}; height: {{tool.params.height}}' ></div>";

		angular.element(page).append($compile(template)($scope));
	}
}
