bkPageBuilder.service('bkCreateToolService', function () {
  var toolTempalte, toolData, idNum=0;

  function createTool(contentToAppend) {
    var attributes="", styles ="", id="", classes="",
        content = ((contentToAppend)?contentToAppend:toolData.content);

    if (toolData.id) id = getId();
    if (toolData.attributes) attributes = getAttributes();
    if (toolData['canDropIn']) { attributes += " droppable drop"; }
    if (toolData.css) styles = getStyles();
    if (toolData.class) classes="class='"+toolData.class+"'";

    toolTempalte  = "<"+toolData.tagName+" "+id+" "+classes+" "+attributes;
    toolTempalte +=styles+">"+content+"</"+toolData.tagName+">";

    return toolTempalte;
  }

  function getId() {
    idNum++;
    toolData.id = toolData.id+idNum;
    return "id='"+toolData.id+"'";
  }

  function getAttributes() {
    var attr="";

    if (toolData.attributes.draggable) { attr  = " draggable"; }
    if (toolData.attributes.movable) {   attr += " movable"; }

    return attr;
  }

  function getStyles() {
    var style = " style='";

    style += ((toolData.css.color)?"color: "+toolData.css.color +"; ":"");
    style += ((toolData.css.backgroundColor)?"background-color: "+toolData.css.backgroundColor +"; ":"");
    style += ((toolData.css.backgroundImage)?"background-image: url("+toolData.css.backgroundImage +"); ":"");
    style += ((toolData.css.width)?" width:"+toolData.css.width+"; ":"");
    style += ((toolData.css.height)?" height: "+toolData.css.height+"; ":"");
    style += ((toolData.css.padding)?" padding:"+toolData.css.padding+"; ":"");
    style += ((toolData.css.position)?" position: "+toolData.css.position+"; ":"");
    style += ((toolData.css.top)?" top:"+toolData.css.top+"; ":"");
    style += ((toolData.css.left)?" left: "+toolData.css.left+"; ":"");

    return style+"'";
  }

  function createTextBlockTool (toolJson) {
    toolData = toolJson;

    return createTool();
  }

  function createImageBlockTool (toolJson) {
    var attributes="", id="";

    toolData = toolJson;

    if (toolData.id) id = getId();
    if (toolData.attributes) attributes = getAttributes();

    toolTempalte  = "<img "+id+" class='"+toolData.class+"' "+attributes;
    toolTempalte +=" style='"+toolData.style+" alt='"+toolData.alt;
    toolTempalte +=" width='"+toolData.width+" height='"+toolData.height;
    toolTempalte +=" src='"+toolData.src+"'/>";

    return toolTempalte;
  }

  function createImageTextBlockTool (toolJson) {
    var child;

    toolData = toolJson.appendChild;
    child = createTool();

    toolData = toolJson;
    return createTool(child);
  }

  function createColumnsBlockTool (toolJson) {
    var left, right;

    toolData = toolJson.child[0];
    left = createTool();

    toolData = toolJson.child[1];
    right = createTool();

    left = left + right;

    toolData = toolJson;
    return createTool(left);
  }

  function createNavPillsBlockTool (toolJson) {
    var buttons = "";
    toolJson.child.forEach(function(item) {
      toolData = item;
      buttons += createTool();
    });

    toolData = toolJson;
    return createTool(buttons);

  }

  return {
    createTextBlockTool      : createTextBlockTool,
    createImageBlockTool     : createImageBlockTool,
    createImageTextBlockTool : createImageTextBlockTool,
    createColumnsBlockTool   : createColumnsBlockTool,
    createNavPillsBlockTool  : createNavPillsBlockTool
  }

});
