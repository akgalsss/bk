pageBuilder.directive("tool", function(){
	var linkFn = function(scope, element, attrs) {       
		
		var button = element.find('button');        
		
		button.bind("click", function() {
			scope.toolTextBlock(scope.textBlockParams);
		});
		
	};
	return {
		link: linkFn,
		restrict: "E",
		template: "<button draggable>Tool Name</button>",
	}
});

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
