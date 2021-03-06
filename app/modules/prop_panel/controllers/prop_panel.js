bkPageBuilder.controller("propPanelController", ["$scope", "$compile", "bkPropPanelService", 'bkPageService',
function ($scope, $compile, bkPropPanelService, bkPageService) {
  // check if need show propPanel
  $scope.isActive = function() {
    return bkPropPanelService.checkIsActive();
  }


  // hide panel with properties
  $scope.hidePropPanel = function () {
    bkPropPanelService.hidePropPanel();
  }

  // active tool model
  $scope.activeToolModel = {};


  // show panel with properties
  $scope.showPropPanel = function () {

    var propTable = angular.element('#propTable'),
      activeTool = angular.element('.activeTool'),
      rows = "";


    var createInputPropertyRow = function (prop, val, inputType) {
      inputType = inputType || 'text';
      min = (inputType == 'number') ? "min='42'" : "";

      return "<tr><td class='prop'>"+prop+":</td><td class='value'><input ng-model='activeToolModel."+prop+"' ng-change='updatePageView(\""+prop+"\")' type='"+inputType+"' "+min+" value='"+val+"'/></td></tr>";
    }


    // convert 'rgb(255,255,255)' string to #ffffff color
    var rgbStringToHex = function (rgbString) {
      var a = rgbString.split("(")[1].split(")")[0];
        a = a.split(",");

      var b = a.map(function(x) {         //For each array element
          x = parseInt(x).toString(16);   //Convert to a base16 string

          return (x.length==1) ? "0"+x : x; //Add zero if we get only one character
        });

      return "#"+b.join("");
    }


    activeTool = activeTool.toArray();
    $scope.activeToolModel.id = activeTool[0]['id'];

    function cssPropWidth() {
      $scope.activeToolModel.width = activeTool[0]['width'];
      rows = createInputPropertyRow("width",$scope.activeToolModel.width);
    }

    function cssPropHeight() {
      $scope.activeToolModel.height = activeTool[0]['height'];
      rows += createInputPropertyRow("height",$scope.activeToolModel.height);
    }

    function cssPropColor() {
      $scope.activeToolModel.color = rgbStringToHex(activeTool[0]['style']['color']);
      rows += createInputPropertyRow("color",$scope.activeToolModel.color, 'color');
    }

    function cssPropBackgroundColor() {
      $scope.activeToolModel.backgroundColor = rgbStringToHex(activeTool[0]['style']['background-color']);
      rows += createInputPropertyRow("backgroundColor",$scope.activeToolModel.backgroundColor, 'color');
    }

    function cssPropPadding() {
      $scope.activeToolModel.padding = activeTool[0]['style']['padding'];
      rows += createInputPropertyRow("padding",$scope.activeToolModel.color, 'padding');
    }

    function toolTextBlockProp() {
      cssPropWidth();
      cssPropHeight();
      cssPropColor();
      cssPropBackgroundColor();
      cssPropPadding();

      $scope.activeToolModel.dataText = activeTool[0]['innerText'];
      rows += createInputPropertyRow("dataText",$scope.activeToolModel.dataText);
    }

    function toolImageBlockProp() {
      cssPropWidth();
      cssPropHeight();
    }

    function toolColumnsProp() {
      cssPropBackgroundColor();
    }

    function navPillsBlockProp() {
      //cssPropBackgroundColor();
    }

    function navPillsItemProp() {
      //cssPropColor();
      //cssPropBackgroundColor();
      //cssPropPadding();

      $scope.activeToolModel.dataText = activeTool[0]['innerText'];
      rows += createInputPropertyRow("dataText",$scope.activeToolModel.dataText);
    }


    // case tools prop
    if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolTextBlock") > -1) {
      toolTextBlockProp();
    }

    if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolImageBlock") > -1) {
      toolImageBlockProp();
    }

    if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("toolColumns") > -1) {
      toolColumnsProp();
    }

    if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("navPillsBlock") > -1) {
      navPillsBlockProp();
    }

    if (activeTool[0]['attributes']['class']['nodeValue'].indexOf("nav-pills-item") > -1) {
      navPillsItemProp();
    }

    angular.element(propTable).html($compile(rows)($scope));

  }

  // update page when change style properth
  $scope.updatePageView = function (propertyToUpdate) {
    var activeTool = angular.element('.activeTool');

    // check if need update text - update text else update css
    if (propertyToUpdate == "dataText") {
      activeTool.html($scope.activeToolModel[propertyToUpdate]);
      bkPageService.setToolData($scope.activeToolModel.id, $scope.activeToolModel[propertyToUpdate]);
    } else {
      activeTool.css(propertyToUpdate, $scope.activeToolModel[propertyToUpdate]);
      bkPageService.setCssRule($scope.activeToolModel.id, propertyToUpdate, $scope.activeToolModel[propertyToUpdate]);
    }
  }


  bkPropPanelService.registerObserverCallback($scope.showPropPanel);

}]);
