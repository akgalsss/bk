// made element draggabele. Use: <element dragable></element>
pageBuilder.directive('draggable', ['$document', 'propPanelServ', function($document, propPanelServ) {
	return function(scope, element, attr) {
		var startX = 0, startY = 0, x = 0, y = 0;

		element.css({
		 position: 'relative',
		 cursor: 'pointer'
		});

		element.on('mousedown', function(event) {
			// Prevent default dragging of selected content
			event.preventDefault();

			startX = event.pageX - x;
			startY = event.pageY - y;
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});

		function mousemove(event) {
			y = event.pageY - startY;
			x = event.pageX - startX;

			element.css({
				top: y + 'px',
				left: x + 'px'
			});
		}

		function mouseup() {
			$document.off('mousemove', mousemove);
			$document.off('mouseup', mouseup);
		}

		element.bind("dblclick", function() {
			angular.element(".ng-scope").removeClass("activeTool");
			element.addClass("activeTool");
			propPanelServ.showPropPanel();
			scope.$apply();
		});
	};
}]);


// save directive functionality. Use: <save></save>
pageBuilder.directive("save", function($compile){
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
pageBuilder.directive("showPage", function($compile){
	var linkFn = function(scope, element, attrs) {
		
		element.bind("click", function() {
			scope.save();
		});
	};
	
	return {
		link: linkFn,
		restrict: "E",
		template: "<a href='#/page' target='_blank'><button class='toolItem show_page' title='View result page'>V</button></a>",
	}
});


// text tool directive functionality. Use: <text-tool></text-tool>
pageBuilder.directive("textTool", function($compile){
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
pageBuilder.directive("imageTool", function($compile){
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


// properties table directive functionality. Use: <prop-table></prop-table>
pageBuilder.directive("propTable", function($compile){
	var linkFn = function(scope, element, attrs) { };

	return {
		link: linkFn,
		restrict: "E",
		template: "<table id='propTable'></table>",
	}
});

