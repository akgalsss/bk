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
		template: "<div id='right_panel' droppable drop='rightPanelDrop()'></div>",
	}
});

bkPageBuilder.directive('draggable', function() {
  return function(scope, element) {
      var el = element[0];

      el.draggable = true;

      el.addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.clearData('Text');
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      }, false);

      el.addEventListener('dragend', function(e) {
        this.classList.remove('drag');
        return false;
      }, false);
    }
});

bkPageBuilder.directive('droppable', function() {
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
        return false;
      }, false);

      el.addEventListener('dragenter', function(e) {
        this.classList.add('over');
        return false;
      }, false);

      el.addEventListener('dragleave', function(e) {
        this.classList.remove('over');
        return false;
      }, false);

      el.addEventListener('drop', function(e) {
        if (e.stopPropagation) e.stopPropagation(); // Stops some browsers from redirecting.
        this.classList.remove('over');

        var item = document.getElementById(e.dataTransfer.getData('Text'));
        this.appendChild(item);

        scope.$apply('drop()');

        return false;
      }, false);
    }
  }
});
