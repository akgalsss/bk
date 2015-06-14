// left panel directive functionality. Use: <page></page>
bkPageBuilder.directive("leftPanel", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/left_panel.html",
	}
});

// tools panel directive functionality. Use: <tools-panel></tools-panel>
bkPageBuilder.directive("toolsPanel", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/tools_panel.html",
	}
});

// prop panel directive functionality. Use: <prop-panel></prop-panel>
bkPageBuilder.directive("propPanel", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/prop_panel.html",
	}
});

// page directive functionality. Use: <page></page>
bkPageBuilder.directive("page", function(){
	return {
		restrict: "E",
		templateUrl: "app/modules/page_builder/templates/page.html",
	}
});


// right panel directive functionality. Use: <right-panel></right-panel>
bkPageBuilder.directive("rightPanel", function(){
	return {
		restrict: "E",
		template: "<div id='right_panel' droppable drop></div>",
	}
});


// draggable directive
bkPageBuilder.directive('draggable', ['bkPropPanelService', 'bkPageService', function(bkPropPanelService, bkPageService) {
  return function(scope, element) {
    var el = element[0];
    el.draggable = true;
    el.addEventListener('dragstart', function(e) {
      e.stopPropagation();
      e.dataTransfer.effectAllowed = 'move';
      bkPageService.setCurrentDragElement(this.id);
      this.classList.add('drag');
      return false;
    }, false);

    el.addEventListener('dragend', function(e) {
      this.classList.remove('drag');
      return false;
    }, false);

    // add possibility to show prop panel on all draggabe tools
    el.addEventListener("dblclick", function(e) {
      if (e.stopPropagation) e.stopPropagation();
      // TODO: need put in seperate method
      if ((this.classList.contains("toolColumns"))||(this.classList.contains("toolTextBlock"))||(this.classList.contains("toolImageBlock"))) {
        angular.element(".toolTextBlock, .toolImageBlock, .toolColumns").removeClass("activeTool");

        this.classList.add('activeTool');
        bkPropPanelService.showPropPanel();
      }
      return false;
    }, false);
  }
}]);


// droppable directive
bkPageBuilder.directive('droppable', ['bkPageService', function(bkPageService) {
  return {
    scope: {
      drop: '&',
    },
    link: function(scope, element, attributes) {
      var el = element[0];

      el.addEventListener('dragover', function(e) {
        e.dataTransfer.dropEffect = 'move';
        if (e.preventDefault) e.preventDefault(); // allows us to drop
        this.classList.add('over');
        if (bkPageService.makeDropTools(this.id)) {
           this.classList.add('can_drop');
           return false;
        }
        if (bkPageService.canDrop(this.id)) { this.classList.add('can_drop'); }
        return false;
      }, false);

      el.addEventListener('dragenter', function(e) {
        this.classList.add('over');
        return false;
      }, false);

      el.addEventListener('dragleave', function(e) {
        this.classList.remove('over');
        this.classList.remove('can_drop');
        return false;
      }, false);

      el.addEventListener('drop', function(e) {
        if (e.stopPropagation) e.stopPropagation(); // Stops some browsers from redirecting.
        angular.element(".over").removeClass("over");
        angular.element(".can_drop").removeClass("can_drop");

        var item = document.getElementById(bkPageService.getCurrentDragElement());

        if (bkPageService.makeDropTools(this.id)) {
           this.appendChild(item);
           return false;
        }

        if (bkPageService.makeDrop(this.id)) { this.appendChild(item); }

        bkPageService.clearCurrentDragElement();

        return false;
      }, false);
    }
  }
}]);


// movable directive
bkPageBuilder.directive('movable',[ "$document", function($document) {
  return function(scope, element, attr) {
      var startX, startY, x=0, y=0, maxX, maxY, parent = element.parent();

      element.css({
       position: 'absolute',
       cursor: 'pointer',
       display: 'block',
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.screenX - x;
        startY = event.screenY - y;
        maxX   = parent.width() - element.width();
        maxY   = parent.height() - element.height();

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.screenY - startY;
        x = event.screenX - startX;

        // prevent moving text abroad image container
        if (x<0) { x = 0; }
        if (x>maxX) { x = maxX; }
        if (y<0) { y = 0; }
        if (y>maxY) { y = maxY; }

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
