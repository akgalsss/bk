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
		var result_obj = {}; 

		function itarate_object(main) {
			var result = {}, loop;

			loop = function(main) {
				var elem = {}, rslt = [];

				do {
					// set needed values of obj
					elem.className = main[0]['className'];
					elem.width = main[0]['clientWidth'];
					elem.height = main[0]['clientHeight'];
					elem.draggable = (main[0]['draggable'] !== "undefine") ? true : false;
					//elem.inline_style = $(main[0]['innerHTML']).attr('style');
					//elem.data = main[0]['innerText'];

					// if have children - create it struct
					if(main[0]['childElementCount']) {
						elem.child = loop($(main[0].firstElementChild).toArray());
					}
					rslt.push(elem);
					console.log(rslt);
				} while (main = main.nextSibling);

				return elem;
			}

			result = loop(main);

			return result;
		}

		result_obj = itarate_object($(obj).toArray());
		
		return result_obj;
	}


	// save page template
	$scope.save = function () {
		var template;

		template = $("#page");

		console.log(template);

		template = make_json(template);

		//send template to server
		console.log(template);
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
