function propPanelCtrl($scope, $compile, propPanelServ) {
	// check if need show propPanel
	$scope.isActive = function() {
		return propPanelServ.checkIsActive();
	}


	// hide panel with properties
	$scope.hidePropPanel = function () {
		propPanelServ.hidePropPanel();
	}


	// show panel with properties
	$scope.showPropPanel = function () {

		var propTable = angular.element('#propTable'),
			activeTool = angular.element('.activeTool'),
			rows;


		var createPropertyRow = function (prop, val, inputType) {
			inputType = inputType || 'text';
			min = (inputType == 'number') ? "min='50'" : "";

			return "<tr><td class='prop'>"+prop+":</td><td class='value'><input ng-change='updatePageView(\"width\")' type='"+inputType+"' "+min+" value='"+val+"'/></td></tr>";
		}


		// convert 'rgb(255,255,255)' string to #ffffff color
		var rgbStringToHex = function (rgbString) {
			var a = rgbString.split("(")[1].split(")")[0];
				a = a.split(",");

			var b = a.map(function(x) {					//For each array element
					x = parseInt(x).toString(16);		//Convert to a base16 string

					return (x.length==1) ? "0"+x : x;	//Add zero if we get only one character
				});

			return "#"+b.join("");
		}


		activeTool = activeTool.toArray();

		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolTextBlock") > -1) {
			rows = createPropertyRow("width",parseInt(activeTool[0]['style']['width']), 'number');
			rows += createPropertyRow("height",parseInt(activeTool[0]['style']['height']), 'number');
			rows += createPropertyRow("backgroundColor",rgbStringToHex(activeTool[0]['style']['background-color']), 'color');
		}

		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolImageBlock") > -1) {
			rows = createPropertyRow("width",activeTool[0]['width'], 'number');
			rows += createPropertyRow("height",activeTool[0]['height'], 'number');
		}

		angular.element(propTable).html($compile(rows)($scope));

	}

	// update page when change style properth
	$scope.updatePageView = function () {
		var activeTool = angular.element('.activeTool');
	}


	// show prop panel when set active tool
	$scope.$watch(function () {
		return propPanelServ.checkIsActive();
	},
	function(newVal, oldVal) {
		if (newVal) { $scope.showPropPanel(); };
	}, true);


	// show updated prop panel when set anouther active tool
	$scope.$watch(function () {
		return propPanelServ.checkNeedUpdate();
	},
	function(newVal, oldVal) {
		if (newVal) { $scope.showPropPanel(); };
	}, true);

}
