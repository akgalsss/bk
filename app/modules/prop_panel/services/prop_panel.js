bkPageBuilder.service('bkPropPanelService', function () {
  this.isActive = false;
  this.needUpdate = 0;

  var observerCallbacks = [];

  //register an observer
  this.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  //call this when you know 'foo' has been changed
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  this.hidePropPanel = function () {
    this.isActive = false;
    this.needUpdate = 0;
    angular.element(".toolTextBlock ").removeClass("activeTool");
  }

  this.showPropPanel = function () {
    if (this.isActive) {
      this.needUpdate++;
    } else {
      this.isActive = true;
    }

    notifyObservers();
  }

  this.checkIsActive = function () {
    return this.isActive;
  }

  this.checkNeedUpdate = function () {
    return this.needUpdate;
  }

});
