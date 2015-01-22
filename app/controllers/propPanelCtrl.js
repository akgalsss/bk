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

		var propTable = angular.element('#propTable'), activeTool = angular.element('.activeTool'), rows;

		activeTool = angular.element(activeTool).toArray();

		console.log(activeTool);

		var createPropertyRow = function (prop, val) {
			return "<tr><td class='prop'>"+prop+":</td><td class='value'>"+val+"</td></tr>";
		}


		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolTextBlock") > -1) {
			rows = createPropertyRow("width",activeTool[0]['style']['width']);
			rows += createPropertyRow("height",activeTool[0]['style']['height']);
			rows += createPropertyRow("backgroundColor",activeTool[0]['style']['background-color']);
		}

		if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolImageBlock") > -1) {
			rows = createPropertyRow("width",activeTool[0]['width']);
			rows += createPropertyRow("height",activeTool[0]['height']);
		}

		console.log(rows);

		angular.element(propTable).html($compile(rows)($scope));
		//$scope.$apply();


	}

	$scope.$watch(function () {
		return propPanelServ.checkIsActive();
	},
	function(newVal, oldVal) {
		if (newVal) { $scope.showPropPanel(); };
			console.log('changed', newVal, oldVal);
	}, true);

}
