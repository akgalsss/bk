// page directive functionality. Use: <page></page>
pageBuilder.directive("page",["$timeout", function(timer){
	var linkFn = ["scope", function(scope) {
		console.log("->page.js:4", "timer");
		timer(scope.getPageTemplate, 0);
	}];

	return {
		link: linkFn,
		restrict: "E",
		template: "<div class='page_background'><div id='page' class='ng-scope'></div></div>",
	}
}]);

