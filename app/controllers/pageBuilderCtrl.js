function pageBuilderCtrl($scope, $compile, $templateCache, $http, sharedData) {

	// /* create json object */

	var make_json = function (obj) {
		var result_obj = {};

		// make clone obj to prevent refence links
		function make_clone_obj(source) {
			if (Object.prototype.toString.call(source) === '[object Array]') {
				var clone = [];
				for (var i=0; i<source.length; i++) {
					clone[i] = make_clone_obj(source[i]);
				}
				return clone;
			} else if (typeof(source)=="object") {
				var clone = {};
				for (var prop in source) {
					if (source.hasOwnProperty(prop)) {
						clone[prop] = make_clone_obj(source[prop]);
					}
				}
				return clone;
			} else {
				return source;
			}
		}

		// iterate through object and create it struct
		function itarate_object(main) {
			var result = {}, loop;

			loop = function(main) {
				var elempush, rslt = [], loopContinue = true;

				do {
					var elem = {};

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
						elem.style.padding = main[0]['style']['padding'];
						elem.style.border = main[0]['style']['border'];
						elem.data = main[0]['innerText'];
					}

					// add textBlock text to store
					if (elem.class.indexOf("toolImageBlock") > -1) {
						elem.data = main[0]['outerHTML'];
					}

					// if have children - create it struct
					if(main[0]['childElementCount']) {
						elem.child = loop(angular.element(main[0].firstElementChild).toArray());
					}

					elempush = make_clone_obj(elem);
					rslt.push(elempush);

					// clear prev version of obj
					elem = undefined;

					if (main[0]['nextElementSibling'] != null) {
						main = angular.element(main[0]['nextSibling']);
					} else { loopContinue = false;}

				} while (loopContinue);

				return rslt;
			}

			result = loop(main);

			return result;
		}

		result_obj = itarate_object(angular.element(obj).toArray());

		return result_obj;
	}


	// save page template
	$scope.save = function () {
		var template;

		template = angular.element("#page");
		template = make_json(template);
		//template = template[0];

		//create string from json obj
		template = JSON.stringify(template);

		//send template to server
		console.log('Send this template to server: ', template);
	}

	// show panel with properties
	$scope.showPropPanel = function () {

		var propTable = angular.element('#propTable'), activeTool = angular.element('.activeTool'), rows;

		activeTool = angular.element(activeTool).toArray();

		console.log(activeTool);


		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolTextBlock") > -1) {
			rows = "<tr><td class='prop'>width:</td><td class='value'>"+activeTool[0]['style']['width']+"</td></tr>";
			rows += "<tr><td class='prop'>height:</td><td class='value'>"+activeTool[0]['style']['height']+"</td></tr>";
			rows += "<tr><td class='prop'>backgroundColor:</td><td class='value'>"+activeTool[0]['style']['background-color']+"</td></tr>";
		}

		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolImageBlock") > -1) {
			rows = "<tr><td class='prop'>width:</td><td class='value'>"+activeTool[0]['width']+"</td></tr>";
			rows += "<tr><td class='prop'>height:</td><td class='value'>"+activeTool[0]['height']+"</td></tr>";
		}

		angular.element(propTable).html($compile(rows)($scope));

		sharedData.showPropPanel = true;
		$scope.$apply();
	}

	// hide panel with properties
	$scope.hidePropPanel = function () {
		sharedData.showPropPanel = false;
	}


	// /* tools function */

	// append rendered tool to page and display
	var appendRenderedToolToPage = function (tool) {

		var page = angular.element('#page');
		angular.element(page).append($compile(tool)($scope));
	}


	//text tool

	// render and display tool 
	var renderTextBlockTool = function (tool) {

		var template, style, attributes;

		attributes = (tool.draggable) ? " draggable" : " ";

		style = ((tool.style.backgroundColor)?"background-color: "+tool.style.backgroundColor +"; ":"");
		style += " width:"+tool.style.width+"; ";
		style += " height: "+tool.style.height+"; ";
		style += " padding:"+tool.style.padding+"; ";
		style += " border: "+tool.style.border+"; ";

		template = "<"+tool.tagName+" class='"+tool.class+"'"+attributes;
		template +=" style='"+style+"'>"+tool.data+"</"+tool.tagName+">";

		return template;
	}

	$scope.toolTextBlock = function () {
		var tool = {} ;

		$http.get('/data/textBlockTool.json').success(function(data) {
			tool = data;
			tool = renderTextBlockTool(tool);
			appendRenderedToolToPage (tool);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get text tool data - ", status);
		});
	}


	// image tool
	// render and display tool 
	var renderImageBlockTool = function (tool) {

		return tool.data;
	}

	$scope.toolImageBlock = function () {
		var tool = {} ;

		$http.get('/data/imageBlockTool.json').success(function(data) {
			tool = data;
			tool = renderImageBlockTool(tool);
			appendRenderedToolToPage (tool);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get image tool data - ", status);
		});;
	}
}
