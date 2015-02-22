// get template directive functionality. Use: <templates></templates>
pageBuilder.directive("templates", function(){
	var linkFn = function(scope, element) {
		var what = 0; // mockup var

		element.bind("click", function() {
			// mockup for quick change template
			if (what) {
				scope.getPageTemplate('/data/templatePage1.json');
				what--;
			} else {
				scope.getPageTemplate();
				what++;
			}
		});
	};
	
	return {
		link: linkFn,
		restrict: "E",
		template: "<button class='toolItem getTemplate' title='Get Template'>Tpls</button>",
	}
});

