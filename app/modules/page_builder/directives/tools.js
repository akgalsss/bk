// show page directive. Use: <show-page></show-page>
pageBuilder.directive("showPage", function(){
	var linkFn = function(scope, element, attrs) {
		
		element.bind("click", function() {
			scope.save();
		});
	};
	
	return {
		link: linkFn,
		restrict: "E",
		template: "<a href='/pageViewApp/' target='_blank'><button class='toolItem show_page' title='View result page'>V</button></a>",
	}
});


// text tool directive functionality. Use: <text-tool></text-tool>
pageBuilder.directive("textTool", function(){
	var linkFn = function(scope, element, attrs) {
		
		element.bind("click", function() {
			scope.toolTextBlock();
		});
	};

	return {
		link: linkFn,
		restrict: "E",
		template: "<button class='toolItem textTool' title='Add Text Block'>T</button>",
	}
});


// image tool directive functionality. Use: <image-tool></image-tool>
pageBuilder.directive("imageTool", function(){
	var linkFn = function(scope, element, attrs) {
		
		element.bind("click", function() {
			scope.toolImageBlock();
		});
	};

	return {
		link: linkFn,
		restrict: "E",
		template: "<button class='toolItem imageTool' title='Add Image'>I</button>",
	}
});
