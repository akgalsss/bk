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

		activeTool = angular.element(activeTool).toArray();

		var createPropertyRow = function (prop, val, inputType) {
			inputType = inputType || 'text';
			min = (inputType == 'number') ? "min='50'" : "";

			return "<tr><td class='prop'>"+prop+":</td><td class='value'><input type='"+inputType+"' "+min+" value='"+val+"'/></td></tr>";
		}


		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolTextBlock") > -1) {
			rows = createPropertyRow("width",parseInt(activeTool[0]['style']['width']), 'number');
			rows += createPropertyRow("height",parseInt(activeTool[0]['style']['height']), 'number');
			rows += createPropertyRow("backgroundColor",activeTool[0]['style']['background-color']);
		}

		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolImageBlock") > -1) {
			rows = createPropertyRow("width",activeTool[0]['width'], 'number');
			rows += createPropertyRow("height",activeTool[0]['height'], 'number');
		}

		angular.element(propTable).html($compile(rows)($scope));

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
