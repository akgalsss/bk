bkPageBuilder.service('bkPageService', function () {
  var pageTemplate = new getPageTemplate(),
      page;


  function getPageTemplate() {
    return [{ tagName:"DIV",id:"page",class:"",css:{width:"",height:"",backgroundColor:""}, child : []}];
  }


  function getPageJSON() {
    return page;
  }


  function appendChild(childKey, parentKey) {
    parent = bkEval(parentKey);
    child = bkEval(childKey);
    if (parent.child) { parent.child.push(child); }
      else { parent.child = [child];}
  }


  function appendToPage(objData) {
    // make copy of objData to prevent obj reference linking
    var obj = JSON.parse(JSON.stringify(objData))

    if (page[0].child.length) {
      page[0].child.push(obj);
    } else {
      page[0].child = obj;
    }

    console.log("Append To Page: Success",getPageJSON());
  }


  function removeChild(objId,findTree) {
    for (var i = findTree.length - 1; i >= 0; i--) {
      if (findTree[i]['id'] === objId ) {
        findTree.splice(i,1);
        return true;
      }

      if (findTree[i]['child']) {
        removeChild(objId, findTree[i]['child']);}
    };
  }


  function clearPage(obj) {
    page = new getPageTemplate();
  }


  function findObjKey(objId, findTree) {
    var key="",i;

    for (i = findTree.length - 1; i >= 0; i--) {
      if (findTree[i]['id'] === objId ) {
        key += ".child["+i+"]";
        break;
      }

      if (findTree[i]['child']) {
        if (findTree[i]['id'] === 'page' ) {
          key = "page["+i+"]" } else { key += ".child["+i+"]" }
        key += findObjKey(objId, findTree[i]['child']);}
    };

    return key;
  }


  function checkCanDropIn(classList,parent) {
    var i,j;
    classArr = classList.split(" ");
    for (i = classArr.length - 1; i >= 0; i--)
      for (j = parent.length - 1; j>=0; j--) {
        if (classArr[i] === parent[j] ) {
          return true;
        }
      }

    return false;
  }

  function deleteClass(classList,objKey) {
    var obj = bkEval(objKey), objClassArr = obj.class;

    classArr = classList.split(" ");
    objClassArr = objClassArr.split(" ");
    classArr.map(function(delClass){
      objClassArr.map(function(objClass,j){
        if (delClass === objClass ) {
          objClassArr.splice(j,1);
        }
      });
    });
    obj.class = objClassArr.join(" ");
    angular.element("#"+obj.id).removeClass(classList);
  }


  function canDropIn(child, parent) {
    childKey = findObjKey(child,page);
    childObj = bkEval(childKey);
    parentKey = findObjKey(parent,page);
    parentObj = bkEval(parentKey);

    if (checkCanDropIn(childObj.class, parentObj.canDropIn)) {
      deleteClass("initToolStyles", childKey);
      appendChild(childKey, parentKey);
      removeChild(child,page);
      console.log("Drop: Success",getPageJSON());
      return true; }
    else {
      console.log("Drop: Can't drop this tool here");
      return false; }
  }

  function bkEval(key) {
    return eval(key);
  }


  return {
    getPageJSON  : getPageJSON,
    appendChild  : appendChild,
    appendToPage : appendToPage,
    clearPage    : clearPage,
    canDropIn    : canDropIn
  }
});
