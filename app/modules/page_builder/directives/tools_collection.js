// save directive functionality. Use: <save></save>
pageBuilder.directive("save", function(){
	var linkFn = function(scope, element, attrs) {
		
		element.bind("click", function() {
			scope.save();
		});
	};
	
	return {
		link: linkFn,
		restrict: "E",
		template: "<button class='toolItem save' title='Save results'>S</button>",
	}
});


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


