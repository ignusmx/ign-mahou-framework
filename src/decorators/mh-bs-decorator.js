/**
 * @class MHBsDecorator
 * @memberof Decorators
 * @classdesc
 * Decorator used to decorate a string as different html objects
 *
 */
function MHBsDecorator()
{

}

/** @memberof Decorators.MHBsDecorator
 * @param string {string} a string to be decorated with an icon
 * @param cssClass {string} classes to be used as icon
 * @param elementTag {Object} tag to be used for the icon
 * @description decorates a string with an icon on the left
 */
MHBsDecorator.decorateIcon = function(string, cssClass, elementTag)
{

	return '<'+elementTag+' class="'+cssClass+'"></'+elementTag+'> '+string;
	return mhTitle;
}

/** @memberof Decorators.MHBsDecorator
 * @param string {string} string to be decorated
 * @description decorates a string as an image
 */
MHBsDecorator.decorateImage = function(string)
{
	return '<img src="'+string+'"></img>';
}

/** @memberof Decorators.MHBsDecorator
 * @param string {string} string to be decorated
 * @description decorates a string as bootstrap responsive Image.
 */
MHBsDecorator.decorateResponsiveImage = function(string)
{
	return '<img class="img-responsive" src="'+string+'"></img>';
}

/** @memberof Decorators.MHBsDecorator
 * @param string {string} string to be decorated
 * @description decorates a string as a value to be evaluated by AngularJS
 */
MHBsDecorator.decorateEval = function(string)
{
	return ("{{$eval('"+string.replace(/'/g, "\\'")+"')}}");
}