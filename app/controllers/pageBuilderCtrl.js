function pageBuilderCtrl($scope, $compile, $templateCache, $http) {

	// render and display tool 
	var renderTool = function (tool) {

		var page = $('#page'),
			template = "<div draggable class='"+tool.class+"' style='background-color: "+((tool.color)?tool.color:"")+"; width:"+tool.width+"; height: "
			+tool.height+"'>"+tool.data+"</div>";

		angular.element(page).append($compile(template)($scope));
	}


	// create json object 
	var make_json = function (obj) {
console.log("make_json", obj);
		var result_obj = {}; 

		function itarate_object(main) {
			var result = {},
				loop = function(main) {
				do {
					console.log("main", main);
					result.className = main[0]['className'];
					result.width = main[0]['clientWidth'];
					result.height = main[0]['clientHeight'];
					result.draggable = main[0]['draggable'];

					if(main[0]['childElementCount']) {
						console.log("child");
						console.log("child_first", $(main[0].firstElementChild).toArray());
						result.child = loop($(main[0].firstElementChild).toArray());

					}
				}
				while (main = main.nextSibling);
			}
			loop(main);

			return result;
		}


		result_obj = itarate_object($(obj).toArray());

		console.log("result_obj", result_obj);
		
		return result_obj;
	}


	// save page template
	$scope.save = function () {
		var template;

		template = $("#page");
		template = make_json(template);
	}


	// tools function

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
