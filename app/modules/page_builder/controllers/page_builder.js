var bkPageBuilder = angular.module("bkPageBuilder", []);

bkPageBuilder.controller("bkPageBuilderController", [
  "$scope", "$compile", "$http", "bkPageService", "bkCreateToolService",
  function ($scope, $compile, $http, bkPageService, bkCreateToolService) {

  // save page template
  $scope.save = function () {
    var template;

    //create string from json obj
    template = JSON.stringify(bkPageService.getPageJSON());

    //send template to server
    $http.post('save.php', {template: template}).
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
    var tool = {};

    $http.get('/data/textBlockTool.json').success(function(data) {
      tool = data;
      tool = bkCreateToolService.createTextBlockTool(tool);
      bkPageService.appendToPage(data);
      appendRenderedToPage(tool);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get text tool data - ", status);
    });
  }


  // /* Image Tool */
  $scope.toolImageBlock = function () {
    var tool = {};

    $http.get('/data/imageBlockTool.json').success(function(data) {
      tool = data;
      tool = bkCreateToolService.createImageBlockTool(tool);
      bkPageService.appendToPage(data);
      appendRenderedToPage(tool);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get image tool data - ", status);
    });

  }


  // /* Image wit Text Tool */
  $scope.toolImageTextBlock = function () {
    var tool = {};

    $http.get('/data/imageTextBlockTool.json').success(function(data) {
      tool = data;
      tool = bkCreateToolService.createImageTextBlockTool(tool);
      bkPageService.appendToPage(data);
      appendRenderedToPage(tool);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get image with text tool data - ", status);
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
        if (blockData['droppable']) {
          block.setAttribute('droppable', '');
         }

        block.setAttribute('id', blockData['id']);
        block.setAttribute('class', blockData['class']);
        block.setAttribute('style', blockData['cssString']);
        block.style.width = blockData['css']['width'];
        block.style.height = blockData['css']['height'];
        block.style.backgroundColor = blockData['css']['backgroundColor'];

        // compille block and append to parent element
        parent.append($compile(block)($scope));
        // push block to page stuct
        bkPageService.appendChild(blockData, parent[0].id);

        if (blockData['child']) {
          createBlock(blockData['child'], angular.element(block));
        }
      }
    }

    page = angular.element("#page");
    createBlock(data, page);
  }

  // get template of the page
  $scope.getPageTemplate = function (url) {
    var page = {};

    url = typeof url !== 'undefined' ? url : '/data/templatePage.json';

    $http.get(url).success(function(data) {
      // clear prev template beroge append new one
      clearRenderedPage();

      page = data;
      page = renderPageTemplate(page);
      appendRenderedToPage (page);
    }).
    error(function(data, status, headers, config) {
      console.log("BK_ERR: get page template data - ", status);
    });
  }
}]);
