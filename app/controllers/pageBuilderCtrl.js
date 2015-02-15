function pageBuilderCtrl($scope, $compile, $templateCache, $http, propPanelServ) {

	// /* create json object from passed obj, for example #page dom elem */

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
						width : parseInt(main[0]['style']['width']),
						height : parseInt(main[0]['style']['height']),
						backgroundColor : main[0]['style']['background-color']
					};

					// add textBlock text to store
					if (elem.class.indexOf("toolTextBlock") > -1) {
						elem.style.color = main[0]['style']['color'],
						elem.style.padding = main[0]['style']['padding'];
						elem.style.border = main[0]['style']['border'];
						elem.style.top = main[0]['style']['top'];
						elem.style.left = main[0]['style']['left'];
						elem.data = main[0]['innerText'];
					}

					// add imageBlock data to store
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

					if ((main[0]['nextElementSibling'] != null )&&(main[0]['nextElementSibling']['id'].indexOf("right_panel") != 0)) {
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

		//create string from json obj
		template = JSON.stringify(template);

		//send template to server
		$http.post('save.php', {template: template}).
			success(function(data, status, headers, config) {
				console.log("BK_INFO: page saved ");
			}).
			error(function(data, status, headers, config) {
				console.log("BK_ERR: save data - ", status);
			});
	}

	// append rendered tool or block to page and display
	var appendRenderedToPage = function (tool) {
		var page = angular.element('#page');

		angular.element(page).append($compile(tool)($scope));
	}


	// /* Tools Function */

	// /* Text Tool */

	// render and display tool 
	var renderTextBlockTool = function (tool) {
		var template, style, attributes;

		attributes = (tool.draggable) ? " draggable" : " ";

		style = ((tool.style.color)?"color: "+tool.style.color +"; ":"");
		style += ((tool.style.backgroundColor)?"background-color: "+tool.style.backgroundColor +"; ":"");
		style += " width:"+tool.style.width+"; ";
		style += " height: "+tool.style.height+"; ";
		style += " padding:"+tool.style.padding+"; ";
		style += " border: "+tool.style.border+"; ";
		style += " position: "+tool.style.position+"; ";
		style += " top:"+tool.style.top+"; ";
		style += " left: "+tool.style.left+"; ";

		template = "<"+tool.tagName+" class='"+tool.class+"'"+attributes;
		template +=" style='"+style+"'>"+tool.data+"</"+tool.tagName+">";

		return template;
	}

	$scope.toolTextBlock = function () {
		var tool = {};

		$http.get('/data/textBlockTool.json').success(function(data) {
			tool = data;
			tool = renderTextBlockTool(tool);
			appendRenderedToPage (tool);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get text tool data - ", status);
		});
	}


	// /* Image Tool */

	// render and display tool 
	var renderImageBlockTool = function (tool) {

		return tool.data;
	}

	$scope.toolImageBlock = function () {
		var tool = {};

		$http.get('/data/imageBlockTool.json').success(function(data) {
			tool = data;
			tool = renderImageBlockTool(tool);
			appendRenderedToPage (tool);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get image tool data - ", status);
		});

	}


	// /* Page Template*/

	// render and display page template 
	var renderPageTemplate = function (data) {
		var page;

		createBlock = function (blocksData, parent) {
			var blockData;

			// go each elem from top to bottom
			while (blockData = blocksData.shift()) {

				var block;

				block = document.createElement(blockData['tagName']); 

				block.setAttribute('id', blockData['id']);
				block.setAttribute('style', blockData['css']);
				block.style.width = blockData['width'];
				block.style.height = blockData['height'];

				parent.append(block);

				if (blockData['child']) {
					createBlock(blockData['child'], angular.element(block));
				}

			}

		}

		page = angular.element("#page");
		createBlock(data, page);
	}

	// get template of the page
	var getPageTemplate = function (url) {
		var page = {};

		url = typeof url !== 'undefined' ? url : '/data/templatePage.json';

		$http.get(url).success(function(data) {
			page = data;
			page = renderPageTemplate(page);
			appendRenderedToPage (page);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get page template data - ", status);
		});
	}

	// when page is loaded get default template
	$scope.$on('$viewContentLoaded', function(){
		getPageTemplate();
		// getPageTemplate('/data/templatePage1.json');
	});


}
