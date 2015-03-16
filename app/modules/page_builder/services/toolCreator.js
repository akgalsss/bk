bkPageBuilder.service('bkCreateToolService', function () {
  var toolTempalte, toolData, idNum=0;

  function createTool(contentToAppend) {
    var attributes="", styles ="",
        content = ((contentToAppend)?contentToAppend:toolData.content);

    idNum++;

    if (toolData.attributes) attributes = getAttributes();
    if (toolData.css) styles = getStyles();

    toolTempalte = "<"+toolData.tagName+" id='bkTool_"+idNum+"' "+toolData.class+" "+attributes;
    toolTempalte +=styles+">"+content+"</"+toolData.tagName+">";

    return toolTempalte;
  }

  function getAttributes() {
    var attr;

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
    return toolJson.content;
  }

  function createImageTextBlockTool (toolJson) {
    var child;

    toolData = toolJson.appendChild;
    child = createTool();

    toolData = toolJson;
    return createTool(child);
  }

  return {
    createTextBlockTool : createTextBlockTool,
    createImageBlockTool : createImageBlockTool,
    createImageTextBlockTool : createImageTextBlockTool
  }

});
