// left panel directive functionality. Use: <page></page>
pageBuilder.directive("leftPanel", function(){
	return {
		restrict: "E",
		template: "<div id='left_panel'><tools-panel></tools-panel><prop-panel></prop-panel></div>",
	}
});

// tools panel directive functionality. Use: <tools-panel></tools-panel>
pageBuilder.directive("toolsPanel", function(){
	return {
		restrict: "E",
		template: "<div id='toolsPanel'><text-tool></text-tool><image-tool></image-tool><hr/><templates></templates><hr/><save></save><show-page></show-page></div>",
	}
});

// prop panel directive functionality. Use: <prop-panel></prop-panel>
pageBuilder.directive("propPanel", function(){
	return {
		restrict: "E",
		template: "<div id='propPanel' ng-controller='propPanelController' ng-class='{ active: isActive()}'><div ng-click='hidePropPanel()' class='close_button'>x</div><prop-table></prop-table></div>",
	}
});

// page directive functionality. Use: <page></page>
pageBuilder.directive("page", function(){
	return {
		restrict: "E",
		template: "<div class='page_background'><div id='page' class='ng-scope'></div></div>",
	}
});


// right panel directive functionality. Use: <right-panel></right-panel>
pageBuilder.directive("rightPanel", function(){
	return {
		restrict: "E",
		template: "<div id='right_panel'></div>",
	}
});
