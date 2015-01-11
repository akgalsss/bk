// made element draggabele. Use: <element dragable></element>
pageBuilder.directive('draggable', ['$document', function($document) {
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
				left:  x + 'px'
			});
		}

		function mouseup() {
			$document.off('mousemove', mousemove);
			$document.off('mouseup', mouseup);
		}
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
		template: "<button class='toolItem save'>S</button>",
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
		template: "<button class='toolItem textTool'>T</button>",
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
		template: "<button class='toolItem imageTool'>I</button>",
	}
});


// properties table directive functionality. Use: <prop-table></prop-table>
pageBuilder.directive("propTable", function($compile){
	var linkFn = function(scope, element, attrs) { };

	return {
		link: linkFn,
		restrict: "E",
		template: "<table><tr><td class='prop'>Width:</td><td class='value'>160</td></tr><tr><td class='prop'>Height:</td><td class='value'>120</td></tr></table>",
	}
});

