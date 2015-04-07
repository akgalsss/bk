bkPageBuilder.service('bkPageService', function () {
  var pageTemplate = new getPageTemplate();


  function getPageTemplate() {
    return [{ tagName:"DIV",id:"page",class:"",css:{width:"",height:"",backgroundColor:""}, child : []}];
  }


  function getPageJSON() {
    return page;
  }


  function appendChild(obj, parentId) {
    // TODO: create finding method by parent id
    if (page[0].id == parentId) page[0].child.push(obj);
  }


  function appendToPage(objData) {
    // make copy of objData to prevent obj reference linking
    var obj = JSON.parse(JSON.stringify(objData))

    if (page[0].child.length) {
      page[0].child.push(obj);
    } else {
      page[0].child = obj;
    }

    console.log("->page.js:31 page:", getPageJSON());
  }


  function clearPage(obj) {
    page = new getPageTemplate();
  }


  function canDropIn(child, parent){
    console.log("->page.js:41 child,parent:", child,parent);
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
