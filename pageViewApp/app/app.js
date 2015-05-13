var pageView = angular.module('pageView', []);

pageView.controller("pageController", ["$scope", "$http",
	function ($scope, $http) {
	// get page data
	var getPageData = function () {
		$http.get('/data/page.json').success(function(data) {
			renderPage(data);
		}).
		error(function(data, status, headers, config) {
			console.log("BK_ERR: get page data - ", status);
		});
	}

	// render page
	var renderPage = function (data) {
		createElem = function (pageData, parent) {
			var elemData;

			// go each elem from top to bottom
			while (elemData = pageData.shift()) {
				var elem;

				elem = document.createElement(elemData['tagName']);
				elem.setAttribute('id', elemData['id']);
				elem.setAttribute('class', elemData['class']);

				// add imageBlock text to store
				if (elemData['class'].indexOf("toolImageBlock") > -1) {
					elem.setAttribute('src', elemData['src']);
					parent.appendChild(elem);
					continue;
				}

				elem.style['width'] = elemData['css']['width'];
				elem.style.minHeight = elemData['css']['height'];
				elem.style.backgroundColor = elemData['css']['backgroundColor'];

				// add textBlock text to store
				if (elemData['class'].indexOf("toolTextBlock") > -1) {
					elem.appendChild(document.createTextNode(elemData['content']));
					elem.style.color = elemData['css']['color'];
					elem.style.padding = elemData['css']['padding'];
					elem.style.border = elemData['css']['border'];
					elem.style.top = elemData['css']['top'];
					elem.style.left = elemData['css']['left'];
					elem.style.position = elemData['css']['position'];
				}

				parent.appendChild(elem);

				if (elemData['child']) {
					createElem(elemData['child'], elem);
				}
			}
		}

		document.body.innerHTML = "";
		var css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('href', data.cssUrl);
		document.getElementsByTagName('head')[0].appendChild(css);
		createElem(JSON.parse(data.template), document.body);
	}

	// when page is loaded get start rendering data
		getPageData();

}]);
