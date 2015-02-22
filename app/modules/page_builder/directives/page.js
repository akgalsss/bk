// page directive functionality. Use: <page></page>
pageBuilder.directive("page", function(){
	return {
		restrict: "E",
		template: "<div class='page_background'><div id='page' class='ng-scope'></div></div>",
	}
});

