bkPageBuilder.service('bkPageService', function () {
  var pageStyleCssFile, page, currentDragElement = "";


  function getPageTemplate() {
    return [{ tagName:"DIV",id:"page",class:"container-fluid",css:{width:"",height:"",backgroundColor:""}, child : []}];
  }


  function getPageJSON() {
    return page;
  }


  function appendChild(parentKey, childKey) {
    parent = bkEval(parentKey);
    child = bkEval(childKey);
    if (parent.child) { parent.child.push(child); }
      else { parent.child = [child];}

    console.log("BK :: Append : Success", getPageJSON());
  }


  function appendToPage(objData) {
    // make copy of objData to prevent obj reference linking
    var obj = bkCloneObj(objData)

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


  function bkEval(key) {
    return eval(key);
  }


  function bkCloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }


  /* -- Page Styles -- */
  function setPageStyleCss(url) {
    pageStyleCssFile = url;
  }


  function getPageStyleCss() {
    return pageStyleCssFile;
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
  /* ---- */


  /* -- Drag Element -- */
  function setCurrentDragElement(id) {
    currentDragElement = id;
  }


  function getCurrentDragElement() {
    return currentDragElement;
  }


  function clearCurrentDragElement() {
    currentDragElement = '';
  }


  function findObjKey(objId) {
    var key = '', found = false;

    function objKeyIterator(objId, keyBegin) {
          key = (keyBegin) ? keyBegin: '';
          found = false;
      var i,
          findTree = (keyBegin) ? bkEval(keyBegin):'';
          findTree = (keyBegin) ? findTree.child : page;

      for (i = findTree.length - 1; i >= 0; --i) {
        if (findTree[i]['id'] === objId ) {
          key += ".child["+i+"]";
          found = true;
          break;
        }
      }

      // if child iterate it
      for (i = findTree.length - 1; i >= 0; --i) {
        if ((!found)&&(findTree[i].child)&&(findTree[i].child.length >= 0)) {
          if (findTree[i]['id'] === 'page' ) {
            key = "page["+i+"]" } else { key = keyBegin + ".child["+i+"]" }
          arguments.callee(objId, key);
        }
      }
    }

    objKeyIterator(objId);

    return found ? key : false;
  }


  function canDrop(parent_id) {
    var childKey = findObjKey(currentDragElement,page),
        childObj = bkEval(childKey),
        parentKey = findObjKey(parent_id,page),
        parentObj = bkEval(parentKey);

    if (parentObj.canDropIn) return canDropIn(parentObj.canDropIn, childObj.class);

    return false;
  }


  function canDropIn(parent, classList) {
    var i,j, classArr = classList.split(" ");

    for (i = classArr.length - 1; i >= 0; --i)
      for (j = parent.length - 1; j >= 0; --j) {
        if (classArr[i] === parent[j] ) { return true; }
    }
    return false;
  }


  function makeDropTools(parent, child) {
    var child = (child) ? child: currentDragElement;

    switch (child) {
      case 'toolsPanel':
      case 'propPanel':
            switch (parent) {
              case 'right_panel':
              case 'left_panel':
                    return true;
              default:
                    return false;
            }
      default:
            return false;
    }
  }


  function makeDrop(parent, child) {
    var child = (child) ? child : currentDragElement;

    switch (child) {
      case 'toolsPanel':
      case 'propPanel':
            console.log("BK :: Drop: Can't drop Page tools to Page markup",getPageJSON());
            return false;
    }

    var childKey = findObjKey(child,page),
        childObj = bkEval(childKey),
        parentKey = findObjKey(parent,page),
        parentObj = bkEval(parentKey);

    if (parentObj.canDropIn&&canDropIn(parentObj.canDropIn, childObj.class)) {
      deleteClass("initToolStyles", childObj);
      appendChild(parentKey, childKey);
      removeChild(childKey);
      console.log("BK :: Drop: Success",getPageJSON());
      return true;
    } else {
      console.log("BK :: Drop: Can't drop this tool here",getPageJSON());
      return false;
    }
  }

  /* ---- */


  return {
    getPageJSON             : getPageJSON,
    appendChild             : appendChild,
    appendToPage            : appendToPage,
    clearPage               : clearPage,
    setPageStyleCss         : setPageStyleCss,
    getPageStyleCss         : getPageStyleCss,
    makeDropTools           : makeDropTools,
    makeDrop                : makeDrop,
    canDrop                 : canDrop,
    setCurrentDragElement   : setCurrentDragElement,
    getCurrentDragElement   : getCurrentDragElement,
    clearCurrentDragElement : clearCurrentDragElement
  }
});
