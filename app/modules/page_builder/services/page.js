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
// console.log("->page.js:34 apend:" );
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
    var i;
    obj = bkEval(objKey);
    parent = bkEval(objKey);
    parentChild = parent.child;
    // console.log("->page.js:59 remove:", obj, parent, parentChild.length);

    for (i= parentChild.length-1; i >= 0; i--) {
      if (parentChild[i]['id'] === obj['id'] ) {
        parentChild.splice(i,1);
        // console.log("->page.js:62 findTree FOUND:", parentChild.length);

        if (!parentChild.length) {
          // console.log("->page.js:71 need delete:" );
          delete parent.child;
          // console.log("->page.js:74 parent:", parent);
        }
        // console.log("->page.js:62 findTree:", parent);
        return true;
      }
    };

    return false;
  }


  function clearPage(obj) {
    page = new getPageTemplate();
  }


  function findObjKey(objId, findTree) {
    var key;
    function objKeyIterator(objId, findTree, keyBegin) {
      var key= (keyBegin) ? keyBegin: "", i,
          found=false;
      console.log("->page.js: key:", objId, findTree);
      for (i = findTree.length - 1; i >= 0; i--) {
        if (findTree[i]['id'] === objId ) {
          key += ".child["+i+"]";
          found = true;
          return key;
        }
      }

      if (!found) {
        for (i = findTree.length - 1; i >= 0; i--) {
          if ((findTree[i].child)&&(findTree[i].child.length >= 0)) {
            if (findTree[i]['id'] === 'page' ) {
              key = "["+i+"]" } else { key += ".child["+i+"]" }
              console.log("->page.js:106 i:", i);
            return key = arguments.callee(objId, findTree[i]['child'], key);
          }
        }
      }
      console.log("->page.js:109 key:", key, objId, findTree);
      return found?key:false;
    }

    return objKeyIterator(objId, findTree);
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
    // console.log("->page.js:120 delete class in:" );
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
    // console.log("->page.js:137 ================================:" );
    childKey = findObjKey(child,page);
    childObj = bkEval(childKey);
    parentKey = findObjKey(parent,page);
    parentObj = bkEval(parentKey);
    console.log("BK_DEV :: Child - Id, Key :", child, childKey);
    console.log("BK_DEV :: Parent - Id, Key :", parent, parentKey);

    if (parentObj.canDropIn&&checkCanDropIn(childObj.class, parentObj.canDropIn)) {
      deleteClass("initToolStyles", childKey);
      appendChild(childKey, parentKey);
      removeChild(childKey);
      // console.log("->page.js:153 getPageJSON():", getPageJSON());
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
