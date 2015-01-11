function propPanelCtrl($scope, sharedData) {

	// hide panel with properties
	$scope.hidePropPanel = function () {
		sharedData.showPropPanel = false;
	}

	$scope.isActive = function() {
		return sharedData.showPropPanel == true;
	}

}
