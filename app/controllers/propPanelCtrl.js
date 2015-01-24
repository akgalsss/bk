function propPanelCtrl($scope, $compile, propPanelServ) {
	// check if need show propPanel
	$scope.isActive = function() {
		return propPanelServ.checkIsActive();
	}


	// hide panel with properties
	$scope.hidePropPanel = function () {
		propPanelServ.hidePropPanel();
	}

	// active tool model
	$scope.activeToolModel = {};


	// show panel with properties
	$scope.showPropPanel = function () {

		var propTable = angular.element('#propTable'),
			activeTool = angular.element('.activeTool'),
			rows;


		var createPropertyRow = function (prop, val, inputType) {
			inputType = inputType || 'text';
			min = (inputType == 'number') ? "min='50'" : "";

			return "<tr><td class='prop'>"+prop+":</td><td class='value'><input ng-model='activeToolModel."+prop+"' ng-change='updatePageView(\""+prop+"\")' type='"+inputType+"' "+min+" value='"+val+"'/></td></tr>";
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
			$scope.activeToolModel.width = parseInt(activeTool[0]['style']['width']);
			rows = createPropertyRow("width",$scope.activeToolModel.width, 'number');

			$scope.activeToolModel.height = parseInt(activeTool[0]['style']['height']);
			rows += createPropertyRow("height",$scope.activeToolModel.height, 'number');

			$scope.activeToolModel.backgroundColor = rgbStringToHex(activeTool[0]['style']['background-color']);
			rows += createPropertyRow("backgroundColor",$scope.activeToolModel.backgroundColor, 'color');
		}

		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolImageBlock") > -1) {
			$scope.activeToolModel.width = parseInt(activeTool[0]['width']);
			rows = createPropertyRow("width",$scope.activeToolModel.width, 'number');

			$scope.activeToolModel.height = parseInt(activeTool[0]['height']);
			rows += createPropertyRow("height",$scope.activeToolModel.height, 'number');
		}

		angular.element(propTable).html($compile(rows)($scope));

	}

	// update page when change style properth
	$scope.updatePageView = function (propertyToUpdate) {
		var activeTool = angular.element('.activeTool');

		angular.element('.activeTool').css(propertyToUpdate, $scope.activeToolModel.propertyToUpdate);

		console.log('call_update', activeTool, propertyToUpdate);
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
