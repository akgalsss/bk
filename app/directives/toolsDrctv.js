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


// text tool directive functionality. Use: <text-tool></text-tool>
pageBuilder.directive("textTool", function($compile){
	var linkFn = function(scope, element, attrs) {       
		
		element.bind("click", function() {
			scope.toolTextBlock(scope.textBlockParams);
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
			scope.toolImageBlock(scope.textBlockParams);
		});
		
	};
	
	return {
		link: linkFn,
		restrict: "E",
		template: "<button class='toolItem imageTool'>I</button>",
	}
});
