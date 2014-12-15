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
		
		tool.params.backgroundColor = ""

		var letters = '0123456789ABCDEF'.split('');
    	var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }

		var page = $('#page'),
			template = "<div draggable class='toolTextBlock' style='background-color: "+color+"; width:"+tool.params.width+"; height: "+tool.params.height+"' ></div>";

		angular.element(page).append($compile(template)($scope));
	}
}
