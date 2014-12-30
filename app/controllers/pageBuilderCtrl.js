function pageBuilderCtrl($scope, $compile, $templateCache, $http) {

	// render and display tool 
	var renderTool = function (tool) {

		var page = $('#page'), template = " ", style =" ", attributes = " ";

		attributes = (tool.draggable) ? attributes+" draggable" : attributes;
		style = "background-color: "+((tool.style.color)?tool.style.color:"")+"; width:"+tool.style.width+"; height: "
			+tool.style.height;

		if (tool.class.indexOf("toolImageBlock") > -1) {
			template = tool.data 
		} else {
			template = "<"+tool.tagName+attributes+" class='"+tool.class+"' style='"+style+"''>"+tool.data+"</"+tool.tagName+">";
		}

		angular.element(page).append($compile(template)($scope));
	}


	// create json object 
	var make_json = function (obj) {
		var result_obj = {}; 

		function itarate_object(main) {
			var result = {}, loop;

			loop = function(main) {
				var elem = {}, rslt = [], loopContinue = true;
				
				do {
					// set needed values of obj
					elem.tagName = main[0]['nodeName'];
					elem.id = main[0]['id'];
					elem.class = main[0]['attributes']['class']['nodeValue'];
					elem.draggable = (main[0]['attributes']['draggable'] !== undefined) ? main[0]['attributes']['draggable']['specified'] : false;
					elem.style = {
						width : main[0]['style']['width'],
						height : main[0]['style']['height'],
						backgroundColor : main[0]['style']['background-color']
					};

					// add textBlock text to store
					if (elem.class.indexOf("toolTextBlock") > -1) {
						elem.data = main[0]['innerText'];
					}

					// if have children - create it struct
					if(main[0]['childElementCount']) {
						elem.child = loop($(main[0].firstElementChild).toArray());
					}
					rslt.push(elem);

					if (main[0]['nextElementSibling'] != null) {
						main = $(main[0]['nextSibling']);
					} else { loopContinue = false;}

				} while (loopContinue);

				return rslt;
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
		template = template[0];

		//send template to server
		console.log('send this template to server: ', template);
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
			tool.style.color = color;
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
