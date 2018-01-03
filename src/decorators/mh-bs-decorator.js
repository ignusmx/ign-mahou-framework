/**
 * @class MHDecorator
 * @memberof Decorators
 * @classdesc
 * Decorator used to decorate a string as different html objects
 *
 */
function MHDecorator()
{

}

/** @memberof Decorators.MHDecorator
 * @param string {string} a string to be decorated with an icon
 * @param cssClasses {string} classes to be used as icon
 * @param elementTag {Object} tag to be used for the icon
 * @description decorates a string with an icon on the left
 */
MHDecorator.decorateIcon = function(string, cssClasses, elementTag)
{
	var iconHtml = MHDecorator.decorateTag("", elementTag);
	var iconWithClassHtml = MHDecorator.decorateCSS(iconHtml, cssClasses);

	return iconWithClassHtml+" "+string;
}

/** @memberof Decorators.MHDecorator
 * @param string {string} string to be decorated
 * @description decorates a string as an image
 */
MHDecorator.decorateImage = function(string)
{
	var imgHtml = MHDecorator.decorateTag("", "img");
	return MHDecorator.decorateAttributes(imgHtml, { 'src' : string });
}

/** @memberof Decorators.MHDecorator
 * @param string {string} string to be decorated
 * @description decorates a string as bootstrap responsive Image.
 */
MHDecorator.decorateResponsiveImage = function(string)
{
	var imgHtml = MHDecorator.decorateTag("", "img");
	var responsiveImgHtml = MHDecorator.decorateCSS(imgHtml, "img-responsive");

	console.log(imgHtml);
	return MHDecorator.decorateAttributes(responsiveImgHtml, { 'src' : string });
}

/** @memberof Decorators.MHDecorator
 * @param string {string} string to be decorated
 * @description decorates a string as a value to be evaluated by AngularJS
 */
MHDecorator.decorateEval = function(string)
{
	return ("{{$eval('"+string.replace(/'/g, "\\'")+"')}}");
}

/** @memberof Decorators.MHDecorator
 * @param string 	 	{string} string to be decorated
 * @param cssClasses 	{string} string with classes to be applied, separated by space
 * @param styles 		{object} object with list of all styles to be applied (e.g. { "minWidth" : "200px" })
 * @description decorates the root element of provided string with given classes and styles
 */
MHDecorator.decorateCSS = function(string, cssClasses, styles)
{
	var rootElement = $(string);
	rootElement.addClass(cssClasses);

	var container = $("<div></div>");
	container.append(rootElement);

	for(var styleName in styles) 
	{
	    var styleValue = styles[styleName];
		rootElement.css(styleName, styleValue);
	}
	
	return container.html();
}

/** @memberof Decorators.MHDecorator
 * @param string 	 	{string} string to be decorated
 * @param tag 			{string} tag to be used for decoration
 * @description wraps a string inside a new element with the given html tag.
 */
MHDecorator.decorateTag = function(string, tag)
{
	var rootElement = $("<"+tag+"></"+tag+">");
	rootElement.html(string);

	var container = $("<div></div>");
	container.append(rootElement);

	return container.html();
}

/** @memberof Decorators.MHDecorator
 * @param string 	 	{string} string to be decorated
 * @param attributes 	{object} object with the attributes to be added (e.g. { "data-some-attr" : "attribute value" })
 * @description applies given attributes to root Element of the given string.
 */
MHDecorator.decorateAttributes = function(string, attributes)
{
	var rootElement = $(string);

	var container = $("<div></div>");
	container.append(rootElement);

	for(var attributeName in attributes) 
	{
	    var attributeValue = attributes[attributeName];
		rootElement.attr(attributeName, attributeValue);
	}
	
	return container.html();
}