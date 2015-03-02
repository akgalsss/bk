pageBuilder.service('pageService', function () {
	var page = [{ tagName:"DIV",id:"page",class:"ng-scope",style:{width:"",height:"",backgroundColor:""}, child : []}];

	this.getPageJSON = function () {
		return page;
	}

	this.appendChild = function (obj, parentId) {
		// TODO: create finding method by parent id
		if (page[0].id == parentId) page[0].child.push(obj);
	}

	this.appendToPage = function (obj) {
		page[0].child.push(obj);
	}

	this.clearPage = function (obj) {
		page = [{ tagName:"DIV",id:"page",class:"ng-scope",style:{width:"",height:"",backgroundColor:""}, child : []}];
	}

});
