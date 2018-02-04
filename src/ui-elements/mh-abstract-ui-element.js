/**
 * @class MHAbstractUIElement
 * @memberof UIElements
 * @classdesc
 * This is the base abstract class used to create rendereable UI elements within the Mahou Framework.
 * 
 * @property {string}   	   		name             	- name of the UI element.
 * @property {string}   	   		title          		- title of the element.
 * @property {string}   	   	   	cssClasses			- additional css classes to be applied to the element (separeted by single space or comma)
 * @property {object}   	   	   	styles				- object with additional styles to be applied to the element
 * @property {string|string[]}   	requiredTags		- some elements require to be rendered under specific HTML tags. Use this to specify those tags. (can be a string of a single tag or an array of tags. e.g: "span" or ["span", "div", "p"])
 *
 */
function MHAbstractUIElement(config)
{
	if (this.constructor === MHAbstractUIElement)
	{
      throw new Error("Can't instantiate abstract MHAbstractUIElement");
    }

    this.name = MHValidationHelper.safeClassAttribute(config, "name", String, null, false);
	this.title = MHValidationHelper.safeClassAttribute(config, "title", String, null, false);
	this.cssClasses = MHValidationHelper.safeClassAttribute(config, "cssClasses", String, null, false);
	this.styles = MHValidationHelper.safeClassAttribute(config, "styles", Object, null, false);
	this.requiredTags = MHValidationHelper.safeClassAttribute(config, "requiredTags", [String, Array], null, false);
	this.attributes = MHValidationHelper.safeClassAttribute(config, "attributes", Object, null, false);
}