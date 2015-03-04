// left panel directive functionality. Use: <page></page>
pageBuilder.directive("leftPanel", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/left_panel.html",
	}
});

// tools panel directive functionality. Use: <tools-panel></tools-panel>
pageBuilder.directive("toolsPanel", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/tools_panel.html",
	}
});

// prop panel directive functionality. Use: <prop-panel></prop-panel>
pageBuilder.directive("propPanel", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/prop_panel.html",
	}
});

// page directive functionality. Use: <page></page>
pageBuilder.directive("page", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/page.html",
	}
});


// right panel directive functionality. Use: <right-panel></right-panel>
pageBuilder.directive("rightPanel", function(){
	return {
		restrict: "E",
		template: "<div id='right_panel'></div>",
	}
});
