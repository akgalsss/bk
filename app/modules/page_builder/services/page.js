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

    console.log("BK :: Append : Success", getPageJSON());
  }


  function appendToPage(objData) {
    // make copy of objData to prevent obj reference linking
    var obj = JSON.parse(JSON.stringify(objData))

    if (page[0].child.length) {
      page[0].child.push(obj);
    } else {
      page[0].child = obj;
    }

    console.log("BK :: Append To Page: Success",getPageJSON());
  }


  function removeChild(objKey) {
    var i,
        child = bkEval(objKey),
        parentKey = objKey.replace(/\.child\[\d+\]$/, ''),
        parent = bkEval(parentKey),
        parentChild = parent.child;

    for (i= parentChild.length-1; i >= 0; --i) {
      if (parentChild[i]['id'] === child['id'] ) {
        parentChild.splice(i,1);

        if (!parentChild.length) {
          delete parent.child;
        }
        return true;
      }
    };

    return false;
  }


  function clearPage(obj) {
    page = new getPageTemplate();
  }


  function findObjKey(objId) {
    function objKeyIterator(objId, findTree, keyBegin) {
      var key= (keyBegin) ? keyBegin: "", i,
          found=false;

      for (i = findTree.length - 1; i >= 0; --i) {
        if (findTree[i]['id'] === objId ) {
          key += ".child["+i+"]";
          found = true;
          return key;
        }
      }

      if (!found) {
        for (i = findTree.length - 1; i >= 0; --i) {
          if ((findTree[i].child)&&(findTree[i].child.length >= 0)) {
            if (findTree[i]['id'] === 'page' ) {
              key = "page["+i+"]" } else { key += ".child["+i+"]" }
            return key = objKeyIterator(objId, findTree[i]['child'], key);
          }
        }
      }

      return found?key:false;
    }

    return objKeyIterator(objId, page);
  }


  function checkCanDropIn(classList,parent) {
    var i,j;
    classArr = classList.split(" ");
    for (i = classArr.length - 1; i >= 0; --i)
      for (j = parent.length - 1; j >= 0; --j) {
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
    var childKey = findObjKey(child,page),
        childObj = bkEval(childKey),
        parentKey = findObjKey(parent,page),
        parentObj = bkEval(parentKey);

    console.log("BK_DEV :: Child - Id, Key :", child, childKey);
    console.log("BK_DEV :: Parent - Id, Key :", parent, parentKey);

    if (parentObj.canDropIn&&checkCanDropIn(childObj.class, parentObj.canDropIn)) {
      deleteClass("initToolStyles", childKey);
      appendChild(childKey, parentKey);
      removeChild(childKey);
      console.log("BK :: Drop: Success",getPageJSON());
      return true; }
    else {
      console.log("BK :: Drop: Can't drop this tool here",getPageJSON());
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
