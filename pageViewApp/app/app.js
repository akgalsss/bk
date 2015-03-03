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

				// add imageBlock text to store
				if (elemData['class'].indexOf("toolImageBlock") > -1) {

					var str2DOMElement = function(html) {
						var frame = document.createElement('iframe');
						frame.style.display = 'none';
						document.body.appendChild(frame);
						frame.contentDocument.open();
						frame.contentDocument.write(html);
						frame.contentDocument.close();
						var el = frame.contentDocument.body.firstChild;
						document.body.removeChild(frame);
						return el;
					}

					elem = str2DOMElement(elemData['content']);

					parent.appendChild(elem);
					continue;
				}

				elem = document.createElement(elemData['tagName']);
				elem.setAttribute('id', elemData['id']);
				elem.setAttribute('class', elemData['class']);
				elem.style['width'] = elemData['css']['width'];
				elem.style.height = elemData['css']['height'];
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
		createElem(data, document.body);
	}

	// when page is loaded get start rendering data
		getPageData();

}]);
