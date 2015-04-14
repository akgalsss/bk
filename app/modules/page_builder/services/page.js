bkPageBuilder.service('bkPageService', function () {
  var pageTemplate = new getPageTemplate(),
      page;


  function getPageTemplate() {
    return [{ tagName:"DIV",id:"page",class:"",css:{width:"",height:"",backgroundColor:""}, child : []}];
  }


  function getPageJSON() {
    return page;
  }


  function appendChild(objData, parentId) {
    // make copy of objData to prevent obj reference linking
    var obj = JSON.parse(JSON.stringify(objData)),
        parentId = page[0].child;

    parentId.push(obj);
  }


  function appendToPage(objData) {
    // make copy of objData to prevent obj reference linking
    var obj = JSON.parse(JSON.stringify(objData))

    if (page[0].child.length) {
      page[0].child.push(obj);
    } else {
      page[0].child = obj;
    }
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


  function canDropIn(child, parent){
    console.log("->page.js:41 child,parent:", child,parent);
    var childKey, parentKey;

    childKey = findObjKey(child,page);
    childKey = this[childKey];
    parentKey = findObjKey(parent,page);
    //parentKey = JSON.parse(parentKey);

    console.log("->page.js:60 : keys", childKey,parentKey);


    console.log(getPageJSON());
    return true;
  }


  return {
    getPageJSON  : getPageJSON,
    appendChild  : appendChild,
    appendToPage : appendToPage,
    clearPage    : clearPage,
    canDropIn    : canDropIn
  }
});
