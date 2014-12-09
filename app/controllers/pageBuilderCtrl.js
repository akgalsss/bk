function pageBuilderCtrl($scope) {
	var textBlockParams = {
		width  : "250px",
		height : "120px"
	}

	var toolTextBlock = function (params) {
		var tool;

		tool.params = params;

		renderTool(tool);
	}

	var renderTool = function (tool) {
	//	angular.element(document.getElementById('page')).append("<div class='toolTextBlock' style='width:" + tool.params.width "height:" + tool.params.height "' ></div>");
	}
}