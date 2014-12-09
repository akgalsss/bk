function pageBuilderCtrl($scope) {

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
	}
}