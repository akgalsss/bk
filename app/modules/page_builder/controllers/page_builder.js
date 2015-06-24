var bkPageBuilder = angular.module("bkPageBuilder", []);

bkPageBuilder.controller("bkPageBuilderController", [
  "$scope", "$compile", "$http", "bkPageService", "bkCreateToolService",
  function ($scope, $compile, $http, bkPageService, bkCreateToolService) {

  // save page template
  $scope.save = function () {
    var theme = {};

    //create string from json obj
    theme.template = JSON.stringify(bkPageService.getPageJSON());
    theme.cssUrl = bkPageService.getPageStyleCss();

    console.log("->page_builder.js:15 bkPageService.getPageDataJSON():", bkPageService.getPageDataJSON());

    //send template to server
    $http.post('save.php', {theme: theme}).
      success(function(data, status, headers, config) {
        console.log("BK_INFO: page saved ");
      }).
      error(function(data, status, headers, config) {
        console.log("BK_ERR: save data - ", status);
      });
  }

  // append rendered tool or block to page and display
  var appendRenderedToPage = function (tool) {
    var page = angular.element('#page');

    // compile tool and append to page
    page.append($compile(tool)($scope));
  }

  // clear page view (templates, tools, etc)
  var clearRenderedPage = function () {
    var page = angular.element('#page');

    bkPageService.clearPage();
    page.html("");
  }


  // /* Tools Function */

  // /* Text Tool */
  $scope.toolTextBlock = function () {
    var tool = {}, toolRendered;

    $http.get('/data/textBlockTool.json').success(function(data) {
      tool = data;
      toolRendered = bkCreateToolService.createTextBlockTool(tool);
      bkPageService.appendToPage(tool);
      appendRenderedToPage(toolRendered);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get text tool data - ", status);
    });
  }


  // /* Image Tool */
  $scope.toolImageBlock = function () {
    var tool = {}, toolRendered;

    $http.get('/data/imageBlockTool.json').success(function(data) {
      tool = data;
      toolRendered = bkCreateToolService.createImageBlockTool(tool);
      bkPageService.appendToPage(tool);
      appendRenderedToPage(toolRendered);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get image tool data - ", status);
    });

  }


  // /* Image wit Text Tool */
  $scope.toolImageTextBlock = function () {
    var tool = {}, toolRendered;

    $http.get('/data/imageTextBlockTool.json').success(function(data) {
      tool = data;
      toolRendered = bkCreateToolService.createImageTextBlockTool(tool);
      bkPageService.appendToPage(tool);
      appendRenderedToPage(toolRendered);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get image with text tool data - ", status);
    });

  }


  // /* Columns Block Tool */
  $scope.columnsBlock = function () {
    var tool = {}, toolRendered;

    $http.get('/data/columnsBlock.json').success(function(data) {
      tool = data;
      toolRendered = bkCreateToolService.createColumnsBlockTool(tool);
      bkPageService.appendToPage(tool);
      appendRenderedToPage(toolRendered);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get columns block tool data - ", status);
    });

  }


  // /* Nav Pills Block Tool */
  $scope.navPillsBlock = function () {
    var tool = {}, toolRendered;

    $http.get('/data/navPillsBlock.json').success(function(data) {
      tool = data;
      toolRendered = bkCreateToolService.createNavPillsBlockTool(tool);
      bkPageService.appendToPage(tool);
      appendRenderedToPage(toolRendered);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get nav pills block tool data - ", status);
    });

  }


  // /* Page Template*/
  // render and display page template
  var renderPageTemplate = function (data) {
    var page;

    createBlock = function (blocksData, parent) {
      var blockData;

      // go each elem from top to bottom
      while (blockData = blocksData.shift()) {
        var block;

        block = document.createElement(blockData['tagName']);

        if (blockData['draggable']) { block.setAttribute('draggable', ''); }
        if (blockData['canDropIn']) {
          block.setAttribute('droppable', '');
          block.setAttribute('drop', '');
        }

        block.setAttribute('id', blockData['id']);
        block.setAttribute('class', blockData['class']);
        if (blockData['cssString']) block.setAttribute('style', blockData['cssString']);


        // compille block and append to parent element
        parent.append($compile(block)($scope));

        if (blockData['child']) {
          createBlock(blockData['child'], angular.element(block));
        }
      }
    }

    bkPageService.appendToPage(data);
    page = angular.element("#page");
    createBlock(data, page);
  }

  // get template of the page
  $scope.getPageTemplate = function (url) {
    var page = {}, cssFile;

    url = typeof url !== 'undefined' ? url : '/data/templatePageBootstrap.json';

    $http.get(url).success(function(data) {
      // clear prev template beroge append new one
      clearRenderedPage();
      cssFile = data.cssUrl;
      page = data.template;
      page = renderPageTemplate(page);
      bkPageService.setPageStyleCss(cssFile);
      appendRenderedToPage("<link rel='stylesheet' href='"+cssFile+"'>");
      appendRenderedToPage(page);

    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get page template data - ", status);
    });
  }
}]);
