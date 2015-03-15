bkPageBuilder.service('bkPageService', function () {
  var page = [{ tagName:"DIV",id:"page",class:"",css:{width:"",height:"",backgroundColor:""}, child : []}];

  function getPageJSON() {
    return page;
  }

  function appendChild(obj, parentId) {
    // TODO: create finding method by parent id
    if (page[0].id == parentId) page[0].child.push(obj);
  }

  function appendToPage(obj) {
    page[0].child.push(obj);
  }

  function clearPage(obj) {
    page = [{ tagName:"DIV",id:"page",class:"",css:{width:"",height:"",backgroundColor:""}, child : []}];
  }

  return {
    getPageJSON  : getPageJSON,
    appendChild  : appendChild,
    appendToPage : appendToPage,
    clearPage    : clearPage
  }

});
