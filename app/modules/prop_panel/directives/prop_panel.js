// properties table directive functionality. Use: <prop-table></prop-table>
bkPageBuilder.directive("propTable", function($compile){
	var linkFn = function(scope, element, attrs) { };

	return {
		link: linkFn,
		restrict: "E",
		template: "<table id='propTable'></table>",
	}
});

