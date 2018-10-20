/**
 * Directives
 * @namespace Directives
*/

/**
 * Controllers
 * @namespace Controllers
*/

/**
 * Themes
 * @namespace Themes
*/

/**
 * UIElements
 * @namespace UIElements
*/

/**
 * Enumerators
 * @namespace Enumerators
*/

/**
 * Decorators
 * @namespace Decorators
*/

/**
 * Helpers
 * @namespace Helpers
*/

(function(){
	'use strict';
	/** @module Mahou
	@description Main module for including Mahou Framework to your angular app
	* #### **Usage**
	* Add the ign.Mahou module to your AnguarJS app
	* ```
	* angular.module('app', ['ign.Mahou'])
	* ```
	 */
	angular.module('ign.Mahou', []);

})();
/**
 * @class MHValidationHelper
 * @memberof Helpers
 * @classdesc
 * Helper used for data validation
 *
 */
function MHValidationHelper()
{
}

/** @memberof Helpers.MHValidationHelper
 * @param mhUIElement {MHAbstractUIElement} a Mahou UI Element
 * @param htmlElement {Object} a jQuery html element
 * @description validates that htmlElement is of a valid tag required by the mhUIElement
 */
MHValidationHelper.validateRequiredTags = function(mhUIElement, htmlElement)
{
	var conditionMet = false;
	var elementTag = htmlElement.prop("tagName").toLowerCase();

	if(mhUIElement.requiredTags == null)
	{
		conditionMet = true;
	}
	else if(typeof(mhUIElement.requiredTags) == "string")
	{
		conditionMet =  elementTag == mhUIElement.requiredTags.trim();
	}
	else if(typeof(mhUIElement.requiredTags) == "array")
	{
		for(var i = 0; i < mhUIElement.requiredTags.length; i++)
		{
			if(mhUIElement.requiredTags[i] == mhUIElement.requiredTags.trim())
			{
				conditionMet = true;
				break;
			}
		}
	} 

	if(!conditionMet)
	{
		throw new Error('required "'
                        +mhUIElement.requiredTags
                        +'" tags not met on htmlElement for ' 
                        + mhUIElement.constructor.name
                        +' with name "'+mhUIElement.name+'"');
	}
}

/** @memberof Helpers.MHValidationHelper
 * @param config 		{Object} 		the config object of the mhUIElement which contians the attribute to be validated 
 * @param attributeName {string} 		the name of the attribute to be validated
 * @param acceptedTypes {class|class[]} class or array of classes accepted by this parameter (must be native javascript classes)
 * @param rejectedTypes {class|class[]} class or array of classes not accepted by this parameter (must be native javascript classes)
 * @param required 		{boolean} 		sets this parameter as required
 * @param defaultValue  {Object} 		the default value if the parameter is required
 * @description validates attribute of an htmlElement
 */
MHValidationHelper.safeClassAttribute = function(config, attributeName, acceptedTypes, rejectedTypes, required, defaultValue)
{
	var attribute = config[attributeName];

	if(attribute == null)
	{
		if(required)
		{
			throw new Error( '"'+ attributeName +'" cannot be null');
		}
		else
		{
			if(defaultValue != null)
			{
				MHValidationHelper.validateType(defaultValue, attributeName, acceptedTypes, rejectedTypes);
			}
			
			attribute = defaultValue;
		}
	}
	else
	{
		MHValidationHelper.validateType(attribute, attributeName, acceptedTypes, rejectedTypes);
	}

    return attribute;
}

/** @memberof Helpers.MHValidationHelper
 * @param property 		{Object} 		the property to be validated
 * @param propertyName  {string} 		the name of the property to be displayed on the error stack trace
 * @param acceptedTypes {class|class[]} class or array of classes accepted by this property (must be native javascript classes)
 * @param rejectedTypes {class|class[]} class or array of classes not accepted by this property (must be native javascript classes)
 * @description validates if a property (object) is of a valid type and not of a rejected type.
 */
MHValidationHelper.validateType = function(property, propertyName, acceptedTypes, rejectedTypes)
{	
    function isOfType(property, type)
    {	
    	if(typeof(property) == "object")
		{
			return property instanceof type;
		}
		else
		{
			function functionName(fun) {
			  var ret = fun.toString();
			  ret = ret.substr('function '.length);
			  ret = ret.substr(0, ret.indexOf('('));
			  return ret.trim();
			}

			var className = functionName(type.prototype.constructor);
			return typeof(property) == className.toLowerCase();
		}
    }

    function validateAcceptedTypes()
    {
    	var foundValidProperty = false;
    	var invalidPropertyErrorMessage = '"'+propertyName +'" must be of type ';
    	var baseTypeErrorMessage = '"acceptedTypes" parameter must be a class or an array of classes.';
    	//allow multiple type validation
	    if(acceptedTypes instanceof Array)
	    {
	    	if(acceptedTypes.length == 0)
	    	{
	    		throw TypeError(baseTypeErrorMessage + ' Types array is empty.');
	    	}

	    	for(var i = 0; i < acceptedTypes.length; i++)
	    	{
	    		if(typeof(acceptedTypes[i]) == "object")
		    	{
		    		throw TypeError(baseTypeErrorMessage+' An object was found in the array.');
		    	}

	    		if(i > 0)
	    		{
	    			invalidPropertyErrorMessage += " or ";
	    		}

	    		invalidPropertyErrorMessage += acceptedTypes[i].prototype.constructor.name;
	    		foundValidProperty = isOfType(property, acceptedTypes[i]);

	    		if(foundValidProperty)
				{
					break;
				}
	    	}
	    }
	    else
	    {
	    	if(typeof(acceptedTypes) == "object")
	    	{
	    		throw TypeError(baseTypeErrorMessage+' Object given.');
	    	}

	    	foundValidProperty = isOfType(property, acceptedTypes);
	    	invalidPropertyErrorMessage += acceptedTypes.prototype.constructor.name;
	    }

		if(!foundValidProperty)
		{
			throw new TypeError( invalidPropertyErrorMessage );
		}
    }

    function validateRejectedTypes()
    {
    	var foundInvalidProperty = false;
    	var invalidPropertyErrorMessage = '"'+propertyName +'" cannot be of type ';
    	var baseTypeErrorMessage = '"rejectedTypes" parameter must be a class or an array of classes.';
    	//allow multiple type validation
	    if(rejectedTypes instanceof Array)
	    {
	    	for(var i = 0; i < rejectedTypes.length; i++)
	    	{
	    		if(typeof(rejectedTypes[i]) == "object")
		    	{
		    		throw TypeError(baseTypeErrorMessage+' An object was found in the array.');
		    	}

	    		if(i > 0)
	    		{
	    			invalidPropertyErrorMessage += " or ";
	    		}

	    		invalidPropertyErrorMessage += rejectedTypes[i].prototype.constructor.name;
	    		foundInvalidProperty = isOfType(property, rejectedTypes[i]);

	    		if(foundInvalidProperty)
				{
					break;
				}
	    	}
	    }
	    else
	    {
	    	if(typeof(rejectedTypes) == "object")
	    	{
	    		throw TypeError(baseTypeErrorMessage+' Object given.');
	    	}

	    	foundInvalidProperty = isOfType(property, rejectedTypes);
	    	invalidPropertyErrorMessage += rejectedTypes.prototype.constructor.name;
	    }

		if(foundInvalidProperty)
		{
			throw new TypeError( invalidPropertyErrorMessage );
		}
    }

    //rejectedTypes are optional, so we test them only if we receive them
    if(rejectedTypes != null)
    {
    	validateRejectedTypes();	
    }
    
    validateAcceptedTypes();
}

/** @memberof Helpers.MHValidationHelper
 * @param propertiesArray 		{object[]} array of properties to be validated 
 * @param arrayName  {string} 		the name of the array to be displayed on the error stack trace
 * @param acceptedTypes {class|class[]} class or array of classes accepted by this property (must be native javascript classes)
 * @param rejectedTypes {class|class[]} class or array of classes not accepted by this property (must be native javascript classes)
 * @description validates if properties in an array (objects) is of a valid type and not of a rejected type.
 */
MHValidationHelper.validateTypes = function(propertiesArray, arrayName, acceptedTypes, rejectedTypes)
{
	for(var i=0; i < propertiesArray.length; i++)
	{
		MHValidationHelper.validateType(propertiesArray[i], arrayName +"["+i+"]", acceptedTypes, rejectedTypes);
	}
}
/**
 * @class mhCompile
 * @memberof Directives
 * @classdesc
 * use this directive to compile and render a string with an angular expression and html
 * **directive types:** Attribute
 *
 * @description 
 * ### ** HTML declaration **
    <span mhCompile="{valueToCompile}"></span>
 * @property {string}                   mhCompile             - value to be compiled.
 */
angular.module('ign.Mahou').directive('mhCompile', ["$compile", function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.mhCompile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}]);
/**
 * @class mhCustomFieldValidation
 * @memberof Directives
 * @classdesc
 * use this directive to add custom validation to inputs in forms
 * **directive types:** Attribute
 *
 * @description 
 * ### ** HTML declaration **
    <input mhCustomFieldValidation="{function}">
 * @property {function}                   mhCustomFieldValidation  - function used as validator. Recieves modelValue as parameter. Must return true or false
 */
angular.module('ign.Mahou').directive('mhCustomFieldValidation', ["$compile", function ($compile) {
    return {
        restrict: 'A',
        require: "ngModel",
        scope: {
            mhCustomFieldValidation: "&"
        },
        link : function(scope, element, attributes, ngModel)
        {
            ngModel.$validators.customValidation = function(modelValue)
            {
                if(scope.mhCustomFieldValidation != null)
                {
                    var result = scope.mhCustomFieldValidation({modelValue : modelValue});
                    return result == null ? true : result;
                }

                return true;
            };
        }
    }
}]);
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
 * @param string {string} 	 	string 				- string value to be used as file source.
 * @property {string} 	 		thumbnailSize		- Object defining size of thumbnail. e.g. "{width: 100, height: 100, quality: 0.9, centerCrop:true}"
 * @description applies given attributes to root Element of the given string.
 */
MHDecorator.decorateFilePreview = function(string, thumbnailSize)
{
	thumbnailSize = thumbnailSize || {width: 100, height: 100, quality: 0.2, centerCrop:false};
	var attributes = {
						"ngf-thumbnail" : string, 
						"ngf-size" : JSON.stringify(thumbnailSize)
					};
	var html = MHDecorator.decorateAttributes(MHDecorator.decorateResponsiveImage(""),attributes);

	return MHDecorator.decorateCSS(html, null, {"width" : thumbnailSize.width, "height" : thumbnailSize.height});
}

/** @memberof Decorators.MHDecorator
 * @param element 	 	{$} jQuery element to be decorated
 * @param cssClasses 	{string} string with classes to be applied, separated by space
 * @param styles 		{object} object with list of all styles to be applied (e.g. { "minWidth" : "200px" })
 * @description decorates the root element of provided string with given classes and styles
 */
MHDecorator.decorateEltCSS = function(element, cssClasses, styles)
{
	element.addClass(cssClasses);
	for(var styleName in styles) 
	{
	    var styleValue = styles[styleName];
		element.css(styleName, styleValue);
	}
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

/** @memberof Decorators.MHDecorator
 * @param element 	 	{$} jQuery object to be decorated
 * @param attributes 	{object} object with the attributes to be added (e.g. { "data-some-attr" : "attribute value" })
 * @description applies given attributes to root Element of the given string.
 */
MHDecorator.decorateEltAttributes = function(element, attributes)
{
	for(var attributeName in attributes) 
	{
	    var attributeValue = attributes[attributeName];
		element.attr(attributeName, attributeValue);
	}
}
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
/**
 * @class MHFormBSRow
 * @memberof UIElements
 * @classdesc
 * A bootstrap row rendered inside a {@link Directives.mhForm mhForm} Directive with {@link Themes.mhFormThemeBs mhFormThemeBs} theme.
 * 
 * @property {MHFormBSCol[]}   	elements    - Array of {@link UIElement.MHFormBSCol MHFormBSCol} to be rendered inside this row.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFormBSRow(config)
{
	config = config || {};
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	this.elements = this.elements || [];

	//validate array DataTypes
	if(this.elements != null)
	{
		MHValidationHelper.validateTypes(this.elements, "elements", MHFormBSCol);
	}

	/** @function append
     * @memberof UIElements.MHFormBSRow
     * @instance
     * @param column {MHFormBSCol} a {@link UIElement.MHFormBSCol MHFormBSCol} to be appended to the elements list.
     * @returns {void} reference to itself for method chaining
     * @description appends a {@link UIElement.MHFormBSCol MHFormBSCol} to the elements list of the row.
     */
	this.append = function(column)
	{
		MHValidationHelper.validateType(column, "column", MHFormBSCol);
		this.elements.push(column);
		return this;
	};
}

MHFormBSRow.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSRow.prototype.constructor = MHFormBSRow;
/**
 * @class MHFormBSCol
 * @memberof UIElements
 * @classdesc
 * A bootstrap column rendered inside a {@link Directives.mhForm mhForm} Directive with {@link Themes.mhFormThemeBs mhFormThemeBs} theme.
 * 
 * @property {MHAbstractUIElement[]|!MHFormBSCol[]}   	elements	- Array of {@link UIElement.MHAbstractUIElement MHAbstractUIElement} (except {@link UIElement.MHFormBSCol MHFormBSCol}) to be rendered inside this column. add a {@link UIElement.MHFormBSRow MHFormBSRow} inside to create a new grid system inside the column.
 * @property {number}   								colWidth	- length of the column measured in bs cols (max 12).
 * @property {number} 									minHeight 	- minimum col height in pixels.
 * @property {string} 									vAlign 		- if flex is enabled, elements inside this col will be vertically aligned to a valid alignment {@link Enumerators.MHVerticalAlign MHVerticalAlign}.
 * @property {string} 									hAlign 		- if flex is enabled, elements inside this col will be horizontally aligned to a valid alignment: {@link Enumerators.MHHorizontalAlign MHHorizontalAlign}.
 * @property {number} 									offset 		- use this property to offset this column as many cols as you want.
 * @property {boolean} 									flex 		- if enabled, elements inside col will be rendered inside a flexbox and aligned acording vAling and hAlign properties.
 * @property {boolean} 									fill		- if enabled and flex is also enabled, elements will be streched to fill with the same proportion the 100% of the column's width.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFormBSCol(config)
{
	config = config || {};
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	this.elements = this.elements || [];
	
	//validate array DataTypes
	if(this.elements != null)
	{
		MHValidationHelper.validateTypes(this.elements, "elements", MHAbstractUIElement, MHFormBSCol);
	}

	this.colWidth = MHValidationHelper.safeClassAttribute(config, "colWidth", Number, null, false, 12);
	this.vAlign = MHValidationHelper.safeClassAttribute(config, "vAlign", String, null, false, "top");
	this.hAlign = MHValidationHelper.safeClassAttribute(config, "hAlign", String, null, false, "left");
	this.offset = MHValidationHelper.safeClassAttribute(config, "offset", Number, null, false, 0);
	this.flex = MHValidationHelper.safeClassAttribute(config, "flex", Boolean, null, false);
	this.fill = MHValidationHelper.safeClassAttribute(config, "fill", Boolean, null, false);

	/** @function append
     * @memberof UIElements.MHFormBSCol
     * @instance
     * @param element {MHAbstractUIElement|!MHFormBSCol} a {@link UIElement.MHAbstractUIElement MHAbstractUIElement} except {@link UIElement.MHFormBSCol MHFormBSCol} to be appended to the elements list.
     * @returns {void} reference to itself for method chaining
     * @description appends a {@link UIElement.MHAbstractUIElement MHAbstractUIElement} except {@link UIElement.MHFormBSCol MHFormBSCol} to the elements list of the col.
     */
	this.append = function(element)
	{
		MHValidationHelper.validateType(element, "element", MHAbstractUIElement, MHFormBSCol);
		this.elements.push(element);
		return this;
	};
}

MHFormBSCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSCol.prototype.constructor = MHFormBSCol;

/** 
* Defines the vertical alignment of elements inside an {@link UIElements.MHFormBSCol MHFormBSCol}
* @enum {string}
* @memberof Enumerators
*/
var MHVerticalAlign = 
{
	/** value: "top" */
	TOP : "top",
	/** value: "middle"  */
	MIDDLE : "middle", 
	/** value: "bottom"  */
	BOTTOM : "bottom"
}

/** 
* Defines the horizontal alignment of elements inside an {@link UIElements.MHFormBSCol MHFormBSCol}
* @enum {string}
* @memberof Enumerators
*/
var MHHorizontalAlign = 
{
	/** value: "left" */
	LEFT : "left",
	/** value: "center"  */
	CENTER : "center", 
	/** value: "right"  */
	RIGHT : "right"
}
/**
 * @class MHFormLabel
 * @memberof UIElements
 * @classdesc
 * Renders a label inside an MHForm. requires "label" tag
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFormLabel(config)
{
	MHAbstractUIElement.call(this, config);
	this.requiredTags = "label";
}

MHFormLabel.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormLabel.prototype.constructor = MHFormLabel;
/**
 * @class MHButton
 * @memberof UIElements
 * @classdesc
 * A simple button to be rendered on an Mahou directive.
 * 
 * @property {function|string}	action 	- Function to be executed or ui-router state to transition when user clicks the button.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHButton(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.action = MHValidationHelper.safeClassAttribute(config, "action", [Function, String], null, false);
}

MHButton.prototype = Object.create(MHAbstractUIElement.prototype);
MHButton.prototype.constructor = MHButton;
/**
 * @class MHDropdownButton
 * @memberof UIElements
 * @classdesc
 * A dropdown button with children rendered over a mhNavbar directive.
 * 
 * @property {MHButton[]}   dropdownButtons		- list of {@link UIElements.MHButton MHButton} to be rendered inside dropdown button.
 * @augments UIElements.MHButton
 */
function MHDropdownButton(config)
{
	//inherit from MHUIElement
	MHButton.call(this, config);

	//own properties
	this.dropdownButtons  = MHValidationHelper.safeClassAttribute(config, "dropdownButtons", Array, null, false);
	//validate array DataTypes
	if(this.dropdownButtons != null)
	{
		MHValidationHelper.validateTypes(this.dropdownButtons, "dropdownButtons", MHButton, MHDropdownButton);
	}
}

MHDropdownButton.prototype = Object.create(MHButton.prototype);
MHDropdownButton.prototype.constructor = MHDropdownButton;
/**
 * @class MHFormButton
 * @memberof UIElements
 * @classdesc
 * A button to be rendered inside an {@link Directives.mhForm mhForm} Directive. Can be enabled and disabled depending on diferent {@link Directives.mhForm mhForm} states.
 * @property {string}  	disabledStatuses 	- string with a list of {@link Enumerators.MHFormStatus MHFormStatus} for which the button should remain disabled. (separated with commas).
 * @augments UIElements.MHButton
 *
 */
function MHFormButton(config)
{
	//inherit from MHButton
	MHButton.call(this, config);

	this.disabledStatuses = MHValidationHelper.safeClassAttribute(config, "disabledStatuses", Array, null, false);
}

MHFormButton.prototype = Object.create(MHButton.prototype);
MHFormButton.prototype.constructor = MHFormButton;
/**
 * @class MHAbstractFormField
 * @memberof UIElements
 * @classdesc
 * An abstract form field used to inherit and render a concrete field in an {@link Directives.mhForm mhForm}  Directive
 * 
 * @property {string}   model     			- Name of the inner property of the base model used in the {@link Directives.mhForm mhForm} to be used as ngModel for this field.
 * @property {string}   placeholder			- a string defining the placeholder for the field.
 * @property {boolean}  required 			- Defines if the field is required or not.
 * @property {string}   invalidMessage 		- Message to be displayed if the field fails to validate.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHAbstractFormField(config)
{
	if (this.constructor === MHAbstractFormField)
	{
      throw new Error("Can't instantiate abstract MHAbstractFormField");
    }
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);

	this.model = MHValidationHelper.safeClassAttribute(config, "model", String, null, false);
	this.placeholder = MHValidationHelper.safeClassAttribute(config, "placeholder", String, null, false);
	this.required = MHValidationHelper.safeClassAttribute(config, "required", [Boolean, String], null, false);
	this.customValidation = MHValidationHelper.safeClassAttribute(config, "customValidation", Function, null, false);
	this.invalidMessage = MHValidationHelper.safeClassAttribute(config, "invalidMessage", String, null, false);
}

MHAbstractFormField.prototype = Object.create(MHAbstractUIElement.prototype);
MHAbstractFormField.prototype.constructor = MHAbstractFormField;
/**
 * @class MHFormFieldInput
 * @memberof UIElements
 * @classdesc
 * A field to be rendered on an MHForm.
 * 
 * @property {string}   type   	- Type of input (html input type attribute) ({@link Enumerators.MHFormFieldInputType MHFormFieldInputType}).
 * @augments UIElements.MHAbstractFormField
 */
function MHFormFieldInput(config)
{
	//inherit from MHFormField
	MHAbstractFormField.call(this, config);
	this.type = MHValidationHelper.safeClassAttribute(config, "type", String, null, true);
	this.requiredTags = "input";
}

MHFormFieldInput.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldInput.prototype.constructor = MHFormFieldInput;



/** 
* Defines the types of an {@link UIElements.MHFormFieldInput MHFormFieldInput}
* @enum {string}
* @memberof Enumerators
*/
var MHFormFieldInputType = 
{
	/** value: "text" (sets 'input' type="text") */
	TEXT : "text",
	/** value: "email" (sets 'input' type="email")  */
	EMAIL : "email", 
	/** value: "password" (sets 'input' type="password")  */
	PASSWORD : "password",
	/** value: "number" (sets 'input' type="number") */
	NUMBER : "number",
	/** value: "date" (sets 'input' type="date") */
	DATE : "date"
}
/**
 * @class MHFormFieldInputText
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Text.
 * @augments UIElements.MHFormFieldInput
 */
function MHFormFieldInputText(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.TEXT;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputText.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputText.prototype.constructor = MHFormFieldInputText;
/**
 * @class MHFormFieldInputPassword
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Password.
 * @augments UIElements.MHFormFieldInput 
 */
function MHFormFieldInputPassword(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.PASSWORD;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputPassword.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputPassword.prototype.constructor = MHFormFieldInputPassword;
/**
 * @class MHFormFieldInputEmail
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Email.
 * @augments UIElements.MHFormFieldInput 
 */
function MHFormFieldInputEmail(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.EMAIL;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputEmail.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputEmail.prototype.constructor = MHFormFieldInputEmail;
/**
 * @class MHFormFieldInputNumber
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Number.
 * @augments UIElements.MHFormFieldInput 
 *
 */
function MHFormFieldInputNumber(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.NUMBER;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputNumber.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputNumber.prototype.constructor = MHFormFieldInputNumber;
/**
 * @class MHFormFieldInputDate
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Date.
 * @augments UIElements.MHFormFieldInput 
 *
 */
function MHFormFieldInputDate(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.DATE;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputDate.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputDate.prototype.constructor = MHFormFieldInputDate;
/**
 * @class MHFormFieldTextarea
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string} resize		- A string with a valid css resize value. (none|both|horizontal|vertical|initial|inherit)
 * @augments UIElements.MHAbstractFormField
 *
 */
function MHFormFieldTextArea(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);

	this.resize = MHValidationHelper.safeClassAttribute(config, "resize", String, null, false, 'none');
	this.requiredTags = "textarea";
}

MHFormFieldTextArea.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldTextArea.prototype.constructor = MHFormFieldTextArea;
/**
 * @class MHFormFieldSelect
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string[]|number[]|Object[]} 	options			- Array of values, can be strings, numbers or objects.
 * @property {string}				 	 	emptyOption		- if set, string to be shown as an option with empty value.
 * @property {string} 	 				 	value			- the property of the option to be used as value (e.g: "option.property"). Default is "option" itself.
 * @property {string} 	 				 	text			- the property of the option to be used as text (e.g: "option.property"). Default is "option" itself.
 * @property {Function}				 	 	onChange		- function to be called when select option changes.
 * @augments UIElements.MHAbstractFormField
 *
 */
function MHFormFieldSelect(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);

	config.options = config.options || [];
	//validate main DataType
	this.options = MHValidationHelper.safeClassAttribute(config, "options", Array);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.options, "options", [String, Number, Object]);

	this.emptyOption = MHValidationHelper.safeClassAttribute(config, "emptyOption", String, null, false);
	this.value = MHValidationHelper.safeClassAttribute(config, "value", String, null, false, "option");
	this.text = MHValidationHelper.safeClassAttribute(config, "text", String, null, false, "option");
	this.onChange = MHValidationHelper.safeClassAttribute(config, "onChange", Function);
	this.trackBy = MHValidationHelper.safeClassAttribute(config, "trackBy", String, null, false, "id");
	this.requiredTags = "select";
}

MHFormFieldSelect.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldSelect.prototype.constructor = MHFormFieldSelect;
/**
 * @class MHFormFieldMDSelect
 * @memberof UIElements
 * @classdesc
 * renders a Material Design's Select. Requires "md-select" tag.
 * @augments UIElements.MHFormFieldSelect
 *
 */
function MHFormFieldMDSelect(config)
{
	//inherit from MHFormFieldSelect
	MHFormFieldSelect.call(this, config);
	this.requiredTags = "md-select";
}

MHFormFieldMDSelect.prototype = Object.create(MHFormFieldSelect.prototype);
MHFormFieldMDSelect.prototype.constructor = MHFormFieldMDSelect;
/**
 * @class MHFormFieldMDDate
 * @memberof UIElements
 * @classdesc
 * Renders a Material Design's Date on an MHForm. Requires "md-datepicker" tag.
 * @augments UIElements.MHAbstractFormField
 */
function MHFormFieldMDDate(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);
	this.requiredTags = "md-datepicker";
}

MHFormFieldMDDate.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldMDDate.prototype.constructor = MHFormFieldMDDate;
/**
 * @class MHFormFieldMDAutocomplete
 * @memberof UIElements
 * @classdesc
 * Renders a Material Design's Autocomplete input on an MHForm. Requires an md-autocomplete tag.
 * 
 * @property {function}   	searchQuery  - function returning an array or a promise of results to be queried from.
 * @property {string}   	itemText  	 - property of the current item to be shown in the autocomplete list. (e.g. item.name). 
 											Use 'item' to select the whole object as the itemText.
 * @property {string}   	minLength  	 - the min lenght user must type before performing the querySearch function.
 * @augments UIElements.MHAbstractFormField
 */
function MHFormFieldMDAutocomplete(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);
	this.searchQuery = MHValidationHelper.safeClassAttribute(config, "searchQuery", Function, null, true);
	this.searchText = MHValidationHelper.safeClassAttribute(config, "searchText", String, null, true);
	this.itemText = MHValidationHelper.safeClassAttribute(config, "itemText", String, null, true);
	this.minLength = MHValidationHelper.safeClassAttribute(config, "minLength", Number, null, false, 0);
	this.cache = MHValidationHelper.safeClassAttribute(config, "cache", Boolean, null, false, false);
	this.delay = MHValidationHelper.safeClassAttribute(config, "delay", Number, null, false, 0);
	this.requiredTags = "md-autocomplete";
}

MHFormFieldMDAutocomplete.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldMDAutocomplete.prototype.constructor = MHFormFieldMDAutocomplete;
/**
 * @class MHFormFieldDropfile
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string} 		dragOverClass	- Class to be applied when user drags files over the container.
 * @property {boolean}		multiple		- Single or multiple file selection.
 * @property {boolean} 		allowDir 		- Allow items to be droppped.
 * @property {string} 	 	accept			- string used to limit files to specific formats.
 * @augments UIElements.MHAbstractFormField
 *
 */
function MHFormFieldDropfile(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);

	this.dragOverClass = MHValidationHelper.safeClassAttribute(config, "dragOverClass", String);
	this.multiple = MHValidationHelper.safeClassAttribute(config, "multiple", Boolean);
	this.allowDir = MHValidationHelper.safeClassAttribute(config, "allowDir", Boolean);
	this.accept = MHValidationHelper.safeClassAttribute(config, "accept", String);
	this.requiredTags = "ngf-drop";
}

MHFormFieldDropfile.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldDropfile.prototype.constructor = MHFormFieldDropfile;
/**
 * @class MHFilePreview
 * @memberof UIElements
 * @classdesc
 * Renders a preview from a Blob file. Wrap of ngf-thumbnail directive.
 * @property {Object[] | String[]}			file				- Blob File or string with image path to be previewed as thumbnail
 * @property {string} 	 				 	thumbnailSize		- Object defining size of thumbnail. e.g. "{width: 100, height: 100, quality: 0.9, centerCrop:true}"
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFilePreview(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.file = MHValidationHelper.safeClassAttribute(config, "file", [Object, String]);
	this.thumbnailSize = MHValidationHelper.safeClassAttribute(config, "thumbnailSize", Object, null, false, {width: 100, height: 100, quality: 0.9, centerCrop:true});
}

MHFilePreview.prototype = Object.create(MHAbstractUIElement.prototype);
MHFilePreview.prototype.constructor = MHFilePreview;
/**
 * @class MHDatagridCol
 * @memberof UIElements
 * @classdesc
 * Defines a column to be renderedin a mhDatagrid directive.
 * 
 * @property {string}   content  	- data to be rendered inside the column. Can be a string (with any angular expression including html) 
 									  or an object or array of objects of supported {@link UIElements.MHAbstractUIElement MHAbstractUIElement} classes 
 									  ({@link UIElements.MHButton MHButton}, {@link UIElements.MHFilePreview MHFilePreview}). Use "row" inside value to access element being rendered on the current row.
 * @property {boolean}	visible     - sets column visibility.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHDatagridCol(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.content = MHValidationHelper.safeClassAttribute(config, "content", [String, MHButton, MHFilePreview, Array], null, false);
	this.visible = MHValidationHelper.safeClassAttribute(config, "visible", Boolean, null, false, true);

	if(this.content instanceof Array)
	{
		MHValidationHelper.validateTypes(this.content, "elements", [MHButton, MHFilePreview]);
	}
}

MHDatagridCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHDatagridCol.prototype.constructor = MHDatagridCol;
/**
 * @class MHDatagridCol
 * @memberof UIElements
 * @classdesc
 * Defines a column with a checkbox to be rendered in a mhDatagrid directive.
 * 
 * @property {string}   content  	- this is null, since this column's content is a checkbox.
 * @property {boolean}	visible     - sets column visibility.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHDatagridCheckboxCol(config)
{
	//inherit from MHDatagridCol
	MHDatagridCol.call(this, config);
	this.content = null;
}

MHDatagridCheckboxCol.prototype = Object.create(MHDatagridCol.prototype);
MHDatagridCheckboxCol.prototype.constructor = MHDatagridCheckboxCol;
/**
 * @class mhBsPanel
 * @memberof Directives
 * @classdesc
 * use this directive to render a bootstrap panel with some content inside.
 *
 * **directive types:** Element only
 *
 * @description 
 * ### ** HTML declaration **
    <mh-bs-panel
        mh-header-title="{headerTitleString}"
        mh-footer-title="{footerTitleString}">
        <!-- custom content can be placed here -->
    </mh-bs-panel>
 * @property {string}                   mhHeaderTitle             - Title to be displayed on the panel's header.
 * @property {string}                   mhFooterTitle             - Title to be displayed on the panel's footer.
 */
angular.module('ign.Mahou').directive('mhBsPanel', ["$compile", "$templateRequest", function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope:{ 
            mhHeaderTitle : "=",
            mhFooterTitle : "=",
        },
        transclude:true,
        template :  '<div class="panel panel-default">\
                        <div class="panel-heading" ng-if="mhHeaderTitle != null">\
                            <h3 class="panel-title">\
                                {{mhHeaderTitle}}\
                            </h3>\
                        </div>\
                        <div class="panel-body">\
                            <div ng-transclude></div>\
                        </div>\
                        <div class="panel-footer" \
                                ng-if="mhFooterTitle != null">\
                                {{mhFooterTitle}}\
                        </div>\
                    </div>'
    };
}]);
/**
 * @class MHDatagridCtrl
 * @memberof Controllers
 * @classdesc
 * Controller used by {@link Directives.mhDatagrid mhDatagrid} directive to compile and bind events to create a fully functional datagrid.
 * @description
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 *
 * @property {object}                 scope                                     - Isolated scope.
 * @property {MHDatagridCol[]}        scope.mhCols                              - An array of {@link UIElements.MHDatagridCol MHDatagridCol} to be used for display content.
 * @property {Object[]}               scope.mhCollection                        - an array of objects to be displayed on the datagrid.
 * @property {Function}               scope.mhRowsSelectedChange                - callback action to be executed when one or more row checkbox have been selected.
 * @property {String}                 scope.mhRowClasses                        - css classes to be added to rows
 * @property {boolean}                allRowsSelected                           - true when all rows checkboxes are selected, false otherwise.
 * @property {object[]}               selectedRows                              - keeps the list of the selected rows (updated eachtime a checkbox is selected).
 * @property {object[]}               internalCollection                        - An internal collection used to keep all rows so we can mark them as selected without modifying the models of the original mhCollection.
 * @property {object}                 row                                       - A single row inside the internalCollection. 
 * @property {boolean}                row.selected                              - True if the row is currently selected, false otherwise.
 * @property {object}                 row.model                                 - A reference to the model of the original mhCollection.
 */
angular
.module('ign.Mahou')
.controller('MHDatagridCtrl', 
    ["$scope", "$element", "$attrs", "$compile", "$state", function MHDatagridCtrl($scope, $element, $attrs, $compile, $state) 
    {
        var self = this;
        $scope.mhCollection = $scope.mhCollection || [];
        $scope.mhCols = $scope.mhCols || [];
        self.scope = $scope;
        self.allRowsSelected = false;
        self.collection = $scope.mhCollection;
        self.selectedRows = [];
        self.internalCollection = [];

        for(var i = 0; i < this.collection.length; i++)
        {
            this.internalCollection.push({ selected : false, model : this.collection[i]});
        }

        $scope.$watchCollection("mhCollection", 
            function( newCollection, oldCollection ) 
            {
                var tempInternalCollection = [];
                if(newCollection != null)
                {
                    for(var i = 0; i < newCollection.length; i++)
                    {
                        var existingRow = null;
                        for(var j = 0; j < self.internalCollection.length; j++)
                        {
                            var internalRow = self.internalCollection[j];
                            var internalModel = internalRow.model;
                            if(internalModel === newCollection[i])
                            {
                                existingRow = internalRow;
                                break;
                            }
                        }

                        if(existingRow == null)
                        {
                            tempInternalCollection.push({ selected : false, model : newCollection[i]});
                        }
                        else
                        {
                            existingRow.selected = false;
                            tempInternalCollection.push(existingRow);
                        }
                    }
                }

                self.internalCollection  = tempInternalCollection;
                self.selectedRows = [];
                updateAllRowsSelected();
            });
        
        /** @function toggleSelectAll
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @returns {void} Nothing
         * @description selects or unselects all rows in the internalCollection and triggers the mhSelectAllChange if exists.
         */
        this.toggleSelectAll = function()
        {
            if(self.allRowsSelected)
            {
                self.selectedRows = [];
                for(var i=0; i< self.internalCollection.length; i++)
                {
                    self.selectedRows.push(self.internalCollection[i]);
                }
            }
            else
            {
                self.selectedRows = [];
            }

            for(var i = 0; i < self.internalCollection.length; i++)
            {
                self.internalCollection[i].selected = self.allRowsSelected;
            }

            $scope.mhRowsSelectedChange({rows : self.selectedRows});
        }

        /** @function toggleRowSelect
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @param row {object} the row selected.
         * @returns {void} Nothing
         * @description adds a row to the selectedRows array and triggers the mhSelectRowChange callback if exists.
         */
        this.toggleRowSelect = function(row)
        {
            if(row.selected)
            {
                self.selectedRows.push(row);
            }
            else
            {
                var index = self.selectedRows.indexOf(row);
                self.selectedRows.splice(index,1);
            }

            updateAllRowsSelected();
            $scope.mhRowsSelectedChange({rows:self.selectedRows});
        }

        /** @function compileTemplate
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;

            var row = templateElem.find(".mh-datagrid-row");

            var headerContentTemplates = templateElem.find(".mh-header-content-templates");
            headerContentTemplates.remove();

            var titleHeaderContainer = headerContentTemplates.find(".mh-title-header-container");
            titleHeaderContainer.remove();

            var checkboxHeaderContainer = headerContentTemplates.find(".mh-checkbox-header-container");
            checkboxHeaderContainer.remove();

            var cellContentTemplates = templateElem.find(".mh-cell-content-templates");
            cellContentTemplates.remove();

            var cellCheckboxContainer = cellContentTemplates.find(".mh-cell-checkbox-container");
            cellCheckboxContainer.remove();

            var cellContent = cellContentTemplates.find(".mh-cell-content");
            cellContent.remove();

            var cellElementsContainer = cellContentTemplates.find(".mh-cell-elements-container");
            cellElementsContainer.remove();

            var cellButton = cellElementsContainer.find(".mh-button");
            cellButton.remove();

            var imageFilePreview = cellElementsContainer.find(".mh-image-file-preview");
            imageFilePreview.remove();


            //validate colTypes:
            for(var i = 0; i < scope.mhCols.length; i++)
            {
                var col = scope.mhCols[i];
                MHValidationHelper.validateType(col, col.name, MHDatagridCol);

                var colHeader = templateElem.find(".mh-datagrid-header[data-mh-name="+col.name+"]");
                var colHeaderContainer = null;

                if(col instanceof MHDatagridCheckboxCol)
                {
                    colHeaderContainer = checkboxHeaderContainer.clone();
                    var selectAllCheckbox = colHeaderContainer.find(".mh-input");
                    selectAllCheckbox.attr("ng-change","controller.toggleSelectAll()");
                    selectAllCheckbox.attr("ng-model","controller.allRowsSelected");
                    selectAllCheckbox.attr("ng-show", "controller.internalCollection.length > 0");
                }
                else
                {
                    colHeaderContainer = titleHeaderContainer.clone();                    
                }

                var colHeaderTitle = colHeaderContainer.find(".mh-title");
                colHeaderTitle.attr("mh-compile","mhCols["+i+"].title");

                colHeader.append(colHeaderContainer);
                colHeader.attr("ng-show","mhCols["+i+"].visible !== false");

                var colCell = row.find(".mh-datagrid-cell[data-mh-name="+col.name+"]");

                if(col.content instanceof MHButton || col.content instanceof MHFilePreview)
                {
                    col.content =[col.content];
                }

                if(col.content instanceof Array)
                {
                    var colCellElementsContainer = cellElementsContainer.clone();

                    for(var j = 0; j < col.content.length; j++)
                    {
                        var contentElement = col.content[j];
                        MHValidationHelper.validateType(contentElement, contentElement.name, [MHButton, MHFilePreview]);

                        var newElement = null;
                        if(contentElement instanceof MHButton)
                        {
                            var button = contentElement;
                            var colCellButton = cellButton.clone();
                            colCellButton.attr("data-mh-name", button.name);
                            colCellButton.attr("ng-click", "controller.executeStateOrAction(mhCols["+i+"].content["+j+"].action, row.model)");
                            colCellButton.find(".mh-title").attr("mh-compile", "mhCols["+i+"].content["+j+"].title");
                            newElement = colCellButton;
                        }
                        else if(contentElement instanceof MHFilePreview)
                        {
                            var filePreview = contentElement;
                            var colFilePreview = imageFilePreview.clone();
                            colFilePreview.attr("data-mh-name", filePreview.name);

                            colFilePreview.attr("ngf-thumbnail", "mhCols["+i+"].content["+j+"].file");
                            colFilePreview.css("width", filePreview.thumbnailSize.width+"px");
                            colFilePreview.css("height", filePreview.thumbnailSize.height+"px");
                            colFilePreview.attr("ngf-size", JSON.stringify(filePreview.thumbnailSize));
                            newElement = colFilePreview;
                        }

                        MHDecorator.decorateEltCSS(newElement, contentElement.cssClasses, contentElement.styles);
                        MHDecorator.decorateEltAttributes(newElement, contentElement.attributes);

                        MHDecorator.decorateEltCSS(colCellElementsContainer, col.cssClasses, col.styles);
                        MHDecorator.decorateEltAttributes(colCellElementsContainer, col.attributes);
                        colCellElementsContainer.append(newElement);
                    }

                    colCell.append(colCellElementsContainer);
                }
                else if(col instanceof MHDatagridCheckboxCol)
                {
                    var colCellCheckboxContainer = cellCheckboxContainer.clone();
                    var rowCheckbox = colCellCheckboxContainer.find(".mh-input");
                    rowCheckbox.attr("ng-change","controller.toggleRowSelect(row)");
                    rowCheckbox.attr("ng-model", "row.selected");

                    colCell.append(colCellCheckboxContainer);
                }
                else
                {
                    var colCellContent = cellContent.clone();
                    MHDecorator.decorateEltCSS(colCellContent, col.cssClasses, col.styles);
                    colCellContent.attr("mh-compile", "mhCols["+i+"].content");
                    colCell.append(colCellContent);
                }

                colCell.attr("ng-show","mhCols["+i+"].visible !== false");
            }

            var row = templateElem.find(".mh-datagrid-row");
            row.attr("ng-repeat", "row in controller.internalCollection");
            row.addClass(self.scope.mhRowClasses);      

            directiveElem.append(templateElem);
            $compile(directiveElem.contents())(scope);
        }

        /** @function executeStateOrAction
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @param action {function | string} the action to execute or state to transition
         * @returns {void} Nothing
         * @description executes a function or transitions to an ui-router state
         */
        this.executeStateOrAction = function(action, model)
        {
            if(typeof(action) == "string")
            {
                $state.go(action);
            }
            else if(typeof(action) == "function")
            {
                action(model);
            }
        }

        //private functions
        function updateAllRowsSelected()
        {
            if(self.selectedRows.length == self.internalCollection.length)
            {
                self.allRowsSelected = true;
            }
            else
            {
                self.allRowsSelected = false;
            }
        }
    }]
);
/**
 * @class mhDatagrid
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional datagrid to display collections.
 * Supports MHButtons
 * **directive types:** Element only
 *
 * @description 
 * #### ** Controller: ** {@link Controllers.MHDatagridCtrl MHDatagridCtrl}
 * ### ** HTML declaration **
    <mh-datagrid {mh-datagrid-theme-directive} 
        mh-cols="{DatagridColsArray}"
        mh-collection="{dataArray}"
        mh-rows-selected-change="{rowsSelectedChangeCallback(rows)}">
        <!-- custom UI can be declared here using mhDatagridThemeCustom -->
    </mh-datagrid>
 * ### **Theme customization**
 * mhDatagrid UI can be customized any way you want it using Mahou's mh-datagrid-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling directive. **
 *
 * #### **Available mhDatagrid themes**
 * - **{@link Themes.mhDatagridThemeCustom mh-datagrid-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhDatagridThemeBs mh-datagrid-theme-bs}** (directive with bootstrap table UI)
 *
 * @property {MHDatagridCol[]}        mhCols                   - An array of {@link UIElements.MHDatagridCol MHDatagridCol} to be used for display content
 * @property {Object[]}               mhCollection             - an array of objects to be displayed on the datagrid
 * @property {String}                 mhRowClasses             - css classes to be added to rows
 * @property {Function}               mhRowsSelectedChange     - callback action to be executed when one or more row checkbox have been selected
 */
angular.module('ign.Mahou').directive('mhDatagrid', ["$compile", "$templateRequest", function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            mhCols : "=",
            mhCollection : "=",
            mhRowClasses : "=",
            mhRowsSelectedChange : "&"
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhDatagridTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhDatagrid: no mhDatagridTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHDatagridCtrl',
        controllerAs : 'controller'
    };
}]);
 /**
 * @class mhDatagridThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhDatagrid mhDatagrid} directive. Used to define a custom UI for the datagrid.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 * ### ** HTML declaration **
    <mh-datagrid mh-datagrid-theme-custom
        {datagrid-attributes}
        mh-tempalte-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-datagrid>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
 */
angular.module('ign.Mahou').directive('mhDatagridThemeCustom', ["$templateRequest", function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhDatagrid'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var ctrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                ctrl.compileTemplate(templateElem, el);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    ctrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
}])
 /**
 * @class mhDatagridThemeBs
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhDatagrid mhDatagrid} directive. Used to define a bootstrap table theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 * ### ** HTML declaration **
    <mh-datagrid mh-datagrid-theme-bs
        {datagrid-attributes}
        mh-responsive="{boolean}">
    </mh-datagrid>
 * @property {boolean}      mhResponsive     - if true, theme will add an extra div container with the bootstrap class "table-responsive"
 */
angular.module('ign.Mahou').directive('mhDatagridThemeBs', ["$templateRequest", "$parse", function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhDatagrid', 'mhDatagridThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<div class="mh-responsive-table-container">\
                                            <table class="table">\
                                                <thead>\
                                                    <tr class="mh-datagrid-headers-container">\
                                                        <th class="mh-datagrid-header">\
                                                        </th>\
                                                    </tr>\
                                                </thead>\
                                                <tbody>\
                                                    <tr class="mh-datagrid-row">\
                                                        <td class="mh-datagrid-cell">\
                                                        </td>\
                                                    </tr>\
                                                </tbody>\
                                            </table>\
                                            <div class="mh-header-content-templates">\
                                                <div class="mh-title-header-container">\
                                                    <span class="mh-title"></span>\
                                                </div>\
                                                <div class="mh-checkbox-header-container">\
                                                    <span class="mh-title"></span> <input type="checkbox" class="mh-input">\
                                                </div>\
                                            </div>\
                                            <div class="mh-cell-content-templates">\
                                                <div class="mh-cell-checkbox-container">\
                                                    <input type="checkbox" class="mh-input">\
                                                </div>\
                                                <div class="mh-cell-content"></div>\
                                                <div class="mh-cell-elements-container">\
                                                    <span class="mh-button">\
                                                        <span class="mh-title"></span>\
                                                    </span>\
                                                    <img class="mh-image-file-preview">\
                                                </div>\
                                            </div>\
                                        </div>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var directiveCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            var isResponsiveTable = attrs.mhResponsive;
            
            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate, directiveCtrl.scope, isResponsiveTable));
            directiveCtrl.compileTemplate(templateElem, el, themeCtrl.formElements);
        },
        controller : ["$scope", "$element", "$attrs", function($scope, $element, $attrs)
        {
            var self = this;
            self.formElements = [];

            this.renderTheme = function(template, scope, isResponsiveTable)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var headersContainer = renderedTemplate.find(".mh-datagrid-headers-container");
                var headerTemplate = headersContainer.find(".mh-datagrid-header");
                headerTemplate.remove();

                var row = renderedTemplate.find(".mh-datagrid-row");
                var cellTemplate = row.find(".mh-datagrid-cell");
                cellTemplate.remove();

                var responsiveTableContainer = renderedTemplate.find(".mh-responsive-table-container");
                if(isResponsiveTable != "false")
                {
                    responsiveTableContainer.addClass("table-responsive");
                }

                for(var i = 0; i < scope.mhCols.length; i++)
                {
                    var col = scope.mhCols[i];
                    MHValidationHelper.validateType(col, col.name, MHDatagridCol);

                    if(col.content instanceof Array)
                    {
                        for(var j = 0; j < col.content.length; j++)
                        {
                            col.content[j].styles = col.content[j].styles || {};
                            angular.extend(col.content[j].styles, { cursor : "pointer" });
                        }
                    }

                    var colHeaderTemplate = headerTemplate.clone();
                    colHeaderTemplate.attr("data-mh-name", col.name);
                    headersContainer.append(colHeaderTemplate);

                    var colCellTemplate = cellTemplate.clone();
                    colCellTemplate.attr("data-mh-name", col.name);
                    row.append(colCellTemplate);
                }

                return renderedTemplate.html();
            }
        }]
    };
}])
 /**
 * @class mhDatagridThemeMosaic
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhDatagrid mhDatagrid} directive. Used to define a mosaic grid theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 * ### ** HTML declaration **
    <mh-datagrid mh-datagrid-theme-mosaic
        {datagrid-attributes}
        mh-responsive="{boolean}">
    </mh-datagrid>
 */
angular.module('ign.Mahou').directive('mhDatagridThemeMosaic', ["$templateRequest", "$parse", function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhDatagrid', 'mhDatagridThemeMosaic'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<div class="mh-responsive-table-container">\
                                            <div class="row">\
                                                <div class="col-md-12">\
                                                    <div class="mh-datagrid-headers-container">\
                                                        <div class="mh-datagrid-header">\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="mh-rows-container">\
                                                <div class="mh-datagrid-row">\
                                                    <div style="padding:10px">\
                                                        <div class="mh-datagrid-cell">\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="mh-header-content-templates">\
                                                <div class="mh-title-header-container">\
                                                    <span class="mh-title"></span>\
                                                </div>\
                                                <div class="mh-checkbox-header-container">\
                                                    <input type="checkbox" class="mh-input"> <span class="mh-title"></span>\
                                                </div>\
                                            </div>\
                                            <div class="mh-cell-content-templates">\
                                                <div class="mh-cell-checkbox-container">\
                                                    <input type="checkbox" class="mh-input">\
                                                </div>\
                                                <div class="mh-cell-content"></div>\
                                                <div class="mh-cell-elements-container">\
                                                    <a class="mh-button">\
                                                        <span class="mh-title"></span>\
                                                    </a>\
                                                    <img class="mh-image-file-preview">\
                                                </div>\
                                            </div>\
                                        </div>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var directiveCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            var direction = attrs.mhDirection;
            
            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate, directiveCtrl.scope, direction));
            directiveCtrl.compileTemplate(templateElem, el, themeCtrl.formElements);
        },
        controller : ["$scope", "$element", "$attrs", function($scope, $element, $attrs)
        {
            var self = this;
            self.formElements = [];

            this.renderTheme = function(template, scope, direction)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var headersContainer = renderedTemplate.find(".mh-datagrid-headers-container");
                var headerTemplate = headersContainer.find(".mh-datagrid-header");
                headerTemplate.remove();

                var rowsContainer = renderedTemplate.find(".mh-rows-container");
                var row = rowsContainer.find(".mh-datagrid-row");
                var cellTemplate = row.find(".mh-datagrid-cell");
                var cellTemplateParent = cellTemplate.parent();

                cellTemplate.remove();

                if(direction == MHDatagridMosaicDirection.VERTICAL)
                {
                    rowsContainer.css("flex-direction", "column");
                }
                else
                {
                    rowsContainer.css("flex-direction", "row");
                }

                for(var i = 0; i < scope.mhCols.length; i++)
                {
                    var col = scope.mhCols[i];
                    MHValidationHelper.validateType(col, col.name, MHDatagridCol);

                    if(col.content instanceof Array)
                    {
                        for(var j = 0; j < col.content.length; j++)
                        {
                            col.content[j].styles = col.content[j].styles || {};
                            angular.extend(col.content[j].styles, { cursor : "pointer" });
                        }
                    }

                    if(col instanceof MHDatagridCheckboxCol)
                    {
                        var colHeaderTemplate = headerTemplate.clone();
                        colHeaderTemplate.attr("data-mh-name", col.name);
                        headersContainer.append(colHeaderTemplate);
                    }

                    var colCellTemplate = cellTemplate.clone();
                    colCellTemplate.attr("data-mh-name", col.name);
                    cellTemplateParent.append(colCellTemplate);
                }

                return renderedTemplate.html();
            }
        }]
    };
}]);

 /** 
* Defines the type of preview of {@link Themes.mhDatagridThemeBs mhDatagridThemeBs}
* @enum {string}
* @memberof Enumerators
*/
var MHDatagridMosaicDirection = 
{
    /** value: "horizontal" (align items horizontally) */
    HORIZONTAL : "horizontal",
    /** value: "vertical" (align items vertically)  */
    VERTICAL : "vertical", 
}
/**
 * @class MHFormCtrl
 * @memberof Controllers
 * @classdesc
 * controller used by mhForm directive to compile and bind events to create a fully functional angularJS form.
 * @description
 * #### ** Directive: ** {@link Directives.mhForm mhForm}
 *
 * @property {object}                   scope                       - Isolated scope.
 * @property {object}                   scope.ngModel               - The ngModel to be used with the form.
 * @property {string}                   scope.mhFormName            - The name (HTML 'name' attribute) of the form.
 * @property {MHAbstractUIElement[]}    scope.mhFormLayout          - An array of {@link UIElements.MHAbstractUIElement MHAbstractUIElement} objects used to display, edit and update the ngModel.
 * @property {string}                   scope.mhClassInvalid        - A string of classes to be added to fields when form is invalid.
 * @property {Function}                 scope.mhOnFormInit          - A function to be executed when form is initialized. Used to expose the form API as parameter.
 * @property {object}                   modelCopy                   - A copy of the model to detect if model has changed or not.
 * @property {MHAbstractUIElement[]}    formElements                - List of all rendereable form elements.
 */
angular
.module('ign.Mahou')
.controller('MHFormCtrl', 
    ["$scope", "$element", "$attrs", "$compile", "$state", function MHFormCtrl($scope, $element, $attrs, $compile, $state)
    {
        var self = this;
        self.scope = $scope;
        self.modelCopy = angular.copy(self.scope.model);
        self.formElements = null;

        /** @function executeStateOrAction
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @param action {function | string} the action to execute or state to transition
         * @param model {Object} the form ng-model to be passed as parameter to the action function
         * @param formName {string} the name of the form to be passed as parameter to the action function
         * @returns {void} Nothing
         * @description executes a function or transitions to an ui-router state
         */
        this.executeStateOrAction = function(action, model, formName)
        {
            if(typeof(action) == "string")
            {
                $state.go(action);
            }
            else if(typeof(action) == "function")
            {
                action(model, formName);
            }
        }

        /** @function compileTemplate
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @param formElements {MHAbstractUIElement[]} array with all the elements in the form.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem, formElements)
        {
            var scope = self.scope;
            var formName = self.scope.mhFormName;
            self.formElements = formElements;

            templateElem.attr("name", self.scope.mhFormName);
            
        	for(var i = 0; i < self.formElements.length; i++)
        	{
        		var formElement = self.formElements[i];
                MHValidationHelper.validateType(formElement, formElement.name, [MHFormLabel, MHAbstractFormField, MHFormButton]);

                var elementTemplate = templateElem.find("[data-mh-name="+formElement.name+"]");
                elementTemplate.find(".mh-title").html(formElement.title);

                if(formElement instanceof MHAbstractFormField)
                {
                    renderField(formElement, elementTemplate, formName, i);
                }
                else if(formElement instanceof MHFormButton)
                {
                    renderFormButton(formElement, elementTemplate, formName, i);
                }
        	}

            directiveElem.append(templateElem);
            $compile(directiveElem.contents())(scope);
            
            if(scope.mhOnFormInit != null)
             {
                scope.mhOnFormInit({ disableForm: function(){
                    //console.log("disable form!", directiveElem);
                    //templateElem.remove("asd");
                }});
             }
        }

        /** @function fieldIsInvalid
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @param field {Object} the field passed from the angular directive view
         * @param form {Object} the form passed from the angular directive view
         * @return {boolean} returns if field is invalid
         * @description validates field
         */
        this.fieldIsInvalid = function(field, form)
		{
            if(field == null)
            {
                return false;
            }

			return field.$invalid && (field.$dirty || field.$touched || form.$submitted ||  (self.scope.parentForm != null && self.scope.parentForm.$submitted));
		}

        /** @function modelChanged
         * @memberof Controllers.MHFormCtrl
         * @instance
         * @return {boolean} returns if model has changed
         * @description checks if form model has changed
         */
        this.modelChanged = function()
        {
            return !angular.equals(self.scope.model, self.modelCopy);
        }

        //private functions

        /** 
         * @memberof Controllers.MHFormCtrl
         * @param model {string} the model property as string to be converted to array style
         * @description converts a dot notation access to array style
         * @access private
         */
        function getModelAsHash(model)
        {
            if(model == null)
            {
                return null;
            }

            var modelTree = model.split(".");
            var hashedTree = "";
            for(var i = 0; i < modelTree.length; i++)
            {
                hashedTree += "['"+modelTree[i]+"']";
            }

            return hashedTree;
        }

        /** 
         * @memberof Controllers.MHFormCtrl
         * @param field {MHAbstractFormField} the field to be rendered
         * @param elementTemplate {Object} a jQuery html element to be used as template for rendering the field
         * @param formName {string} the name of the form, used for adding field validations
         * @param elementIndex {number} the field position inside the elements array
         * @description renders an {@link UIElements.MHAbstractFormField MHAbstractFormField}
         * @access private
         */
        function renderField(field, elementTemplate, formName, elementIndex)
        {
            var inputElem = elementTemplate.find(".mh-input");
            MHDecorator.decorateEltCSS(inputElem, field.cssClasses, field.styles);
            MHDecorator.decorateEltAttributes(inputElem, field.attributes);

            MHValidationHelper.validateRequiredTags(field, inputElem);

            if(!(field instanceof MHFormFieldMDAutocomplete))
            {            
                inputElem.attr("ng-model", "model"+getModelAsHash(field.model));
            }

            var inputErrorMessage = elementTemplate.find(".mh-input-error-message");
            if(field.required || field.customValidation)
            {
                inputErrorMessage.html("{{controller.formElements["+elementIndex+"].invalidMessage}}")
                inputErrorMessage.attr("ng-show", "controller.fieldIsInvalid("+formName+"."+field.name+", "+formName+") && controller.formElements["+elementIndex+"].invalidMessage != null");
                inputElem.attr("ng-required", field.required);

                if(!(field instanceof MHFormFieldMDAutocomplete))
                {
                    inputElem.attr("mh-custom-field-validation", "controller.formElements["+elementIndex+"].customValidation(modelValue)");    
                }
                
                if(self.scope.mhClassInvalid != null)
                {
                    elementTemplate.attr("ng-class", 
                    "{'"+self.scope.mhClassInvalid+"' : controller.fieldIsInvalid("+formName+"."+field.name+", "+formName+")}");
                }
            }
            else
            {
                inputErrorMessage.remove();
            }
            
            inputElem.attr("name", field.name);

            if(field instanceof MHFormFieldInput
                && field.type != null && field.type.length > 0)
            {
                inputElem.attr("type", field.type);
                inputElem.attr("placeholder", field.placeholder);
            }
            else if(field instanceof MHFormFieldMDAutocomplete)
            {
                inputElem.attr("md-selected-item", "model"+getModelAsHash(field.model));
                inputElem.attr("md-search-text", field.searchText);
                inputElem.attr("md-items", "item in controller.formElements["+elementIndex+"].searchQuery("+field.searchText+")");
                inputElem.attr("md-item-text", field.itemText);
                inputElem.attr("md-min-length", field.minLength);
                inputElem.attr("placeholder", field.placeholder);
                inputElem.attr("md-require-match", field.required);
                inputElem.attr("md-input-name", field.name);
                inputElem.attr("md-no-cache", !field.cache);
                inputElem.attr("md-delay", field.delay);
                inputElem.find("md-item-template > span").html("{{"+field.itemText+"}}");
            }
            else if(field instanceof MHFormFieldSelect)
            {
                inputElem.attr("ng-change", "controller.formElements["+elementIndex+"].onChange(model"+getModelAsHash(field.model)+")");
                if(field.emptyOption == null || field instanceof MHFormFieldMDSelect)
                {
                    inputElem.find(".mh-select-empty-option").remove();
                }
                else
                {
                    inputElem.find(".mh-select-empty-option").attr("value", "");
                    inputElem.find(".mh-select-empty-option").html("{{controller.formElements["+elementIndex+"].emptyOption}}");
                }
                
                if(field instanceof MHFormFieldMDSelect)
                {
                    inputElem.attr("ng-model-options", "{trackBy: '$value."+field.trackBy+"'}");
                    inputElem.find(".mh-select-option").attr("ng-repeat","option in controller.formElements["+elementIndex+"].options");
                    inputElem.find(".mh-select-option").attr("ng-value","$eval(controller.formElements["+elementIndex+"].value)");
                    inputElem.find(".mh-select-option").html("{{$eval(controller.formElements["+elementIndex+"].text)}}");
                }
                else
                {
                    inputElem.attr("ng-options", field.value+" as "+field.text+" for option in controller.formElements["+elementIndex+"].options track by option."+field.trackBy); 
                }
            }
            else if(field instanceof MHFormFieldTextArea)
            {
                inputElem.attr("placeholder", field.placeholder);
                MHDecorator.decorateEltCSS(inputElem, null, { resize: field.resize });
            }
            else if(field instanceof MHFormFieldDropfile)
            {
                inputElem.attr("ngf-drag-over-class", field.dragOverClass);
                inputElem.attr("ngf-multiple", field.multiple);
                inputElem.attr("ngf-allow-dir", field.allowDir);
                inputElem.attr("accept", field.accept);
                inputElem.find(".mh-placeholder").html(field.placeholder);
            }
        }

        /** 
         * @memberof Controllers.MHFormCtrl
         * @param button {MHFormButton} the button to be rendered
         * @param elementTemplate {Object} a jQuery html element to be used as template for rendering the button
         * @param formName {string} the name of the form, used for adding button validations
         * @param elementIndex {number} the button position inside the elements array
         * @description renders an {@link UIElements.MHFormButton MHFormButton}
         * @access private
         */
        function renderFormButton(button, elementTemplate, formName, elementIndex)
        {
            var buttonElement = elementTemplate.find(".mh-form-button");
            MHDecorator.decorateEltCSS(buttonElement, button.cssClasses, button.styles);
            MHDecorator.decorateEltAttributes(buttonElement, button.attributes);

            if(button.disabledStatuses != null)
            {
                var disabledExpression = "";

                for(var j = 0; j < button.disabledStatuses.length; j++)
                {
                    if(j > 0)
                    {
                        disabledExpression +=" || ";
                    }

                    switch(button.disabledStatuses[j].trim())
                    {
                        case MHFormStatus.FORM_VALID : disabledExpression += formName+".$valid";
                        break;
                        case MHFormStatus.FORM_INVALID : disabledExpression += formName+".$invalid";
                        break;
                        case MHFormStatus.PARENT_FORM_VALID : disabledExpression += "(parentForm == null || parentForm.$valid)";
                        break;
                        case MHFormStatus.PARENT_FORM_INVALID : disabledExpression += "(parentForm != null && parentForm.$invalid)";
                        break;
                        case MHFormStatus.MODEL_CHANGED : disabledExpression += "controller.modelChanged()";
                        break;
                        case MHFormStatus.MODEL_UNCHANGED : disabledExpression += "!controller.modelChanged()";
                        break;
                    }
                }
                
                var ngDisabledAttrVal = buttonElement.attr("ng-disabled");

                if(ngDisabledAttrVal)
                {
                    buttonElement.attr("ng-disabled", ngDisabledAttrVal + " || " + disabledExpression); 
                }
                else
                {
                    buttonElement.attr("ng-disabled", disabledExpression); 
                }   
            }
            
            buttonElement.attr("ng-click", "controller.executeStateOrAction(controller.formElements["+elementIndex+"].action, model, "+formName+")");
        }
    }]
);
 /**
 * @class mhForm
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional AngularJS form.<br>
 * Includes fields validation, events callbacks and UI customization using themes.
 * This directive uses ng-form internally therefore you can use multiple mhForm in a single view.
 * Wrap multiples mhForms inside a regular <form> tag to connect multiple forms.
 * This allows you to split a complex form into small mhForms with custom html in between.
 * Since the parent from is shared among mhForm, form buttons can be disabled or enabled depending of parent form state.
 * **directive types:** Element only
 *
 * @description 
 * #### ** Controller: ** {@link Controllers.MHFormCtrl MHFormCtrl}
 * ### ** HTML declaration **
    <mh-form {mh-form-theme-directive} 
        ng-model="{modelToBeUsed}" 
        mh-form-name="{formName}" 
        mh-form-layout="{arrayOfUIElements}" 
        mh-class-invalid="{nameOfCSSClass}"
        mh-on-form-init="{classToExposeFormAPI}" >
        <!-- custom UI can be declared here using mhFormThemeCustom -->
    </mh-form>
 * ### **Theme customization**
 * mhForm UI can be customized any way you want it using Mahou's mh-form-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling mhForm directive. **
 *
 * #### **Available mhForm themes**
 * - **{@link Themes.mhFormThemeCustom mh-form-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhFormThemeBs mh-form-theme-bs}** (directive with bootstrap horizontal form UI)
 *
 * @property {object}                   ngModel             - The ngModel to be used with the form.
 * @property {string}                   mhFormName          - The name (HTML 'name' attribute) of the form.
 * @property {MHAbstractUIElement[]}    mhFormLayout        - An array of {@link UIElements.MHAbstractUIElement MHAbstractUIElement} objects used to display, edit and update the ngModel.
 * @property {string}                   mhClassInvalid      - A string of classes to be added to fields when form is invalid.
 * @property {Function}                 mhOnFormInit        - A function to be executed when form is initialized. Used to expose the form API as parameter
 */
angular.module('ign.Mahou').directive('mhForm', ["$templateRequest", function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhFormName : "=",
            mhFormLayout : '=',
            mhClassInvalid : '=?',
            mhOnFormInit : '=?'
        },
        require : ["?^form"],
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhFormTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhForm: no mhFormTheme directive was found. Please specify one.");
            }

            return  function(scope, el, attrs, ctrls)
            {
                scope.parentForm = ctrls[0];
            }
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
}])

/** 
* Defines the status of an MHForm
* @enum {string}
* @memberof Enumerators
*/
var MHFormStatus = 
{
    /** value: "formValid" (form is valid) */
    FORM_VALID : "formValid",
    /** value: "formInvalid" (form is invalid)  */
    FORM_INVALID : "formInvalid",
    /** value: "parentFormValid" (parentForm is valid) */
    PARENT_FORM_VALID : "parentFormValid",
    /** value: "parentFormInvalid" (parentForm is invalid)  */
    PARENT_FORM_INVALID : "parentFormInvalid",
    /** value: "modelChanged" (model has changed)  */
    MODEL_CHANGED : "modelChanged",
    /** value: "modelUnchanged" (model has not changed) */
    MODEL_UNCHANGED : "modelUnchanged"
}
 /**
 * @class mhFormThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhForm mhForm} directive. Used to define a custom UI for the form.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhForm mhForm}
 * ### ** HTML declaration **
    <mh-form mh-form-theme-custom
        {mh-form-attributes}
        mh-template-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-form>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
 */
angular.module('ign.Mahou').directive('mhFormThemeCustom', ["$templateRequest", function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhForm'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var ctrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                ctrl.compileTemplate(templateElem, el, scope.mhFormLayout);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    ctrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
}])
 /**
 * @class mhFormThemeBs
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhForm mhForm} directive. Used to define a bootstrap form theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhForm mhForm}
 * ### ** HTML declaration **
    <mh-form mh-form-theme-bs
        {mh-form-attributes}
        mhFormLayout={ArrayOfUIElements}>
    </mh-form>
 * @property {MHFormBSRow[]}      mhFormLayout     - array composed of {@link UIElement.MHFormBSRow MHFormBSRow} with columns and elements inside.
 */
angular.module('ign.Mahou').directive('mhFormThemeBs', ["$templateRequest", "$parse", function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhForm', 'mhFormThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<ng-form class="form-horizontal" novalidate>\
                                            <div class="mh-form-elements-container">\
                                                <div class="form-group mh-form-row">\
                                                    <div class="mh-form-col"></div>\
                                                </div>\
                                                <label class="mh-label"><span class="mh-title"></span></label>\
                                                <div class="mh-input-container">\
                                                    <label class="mh-title"></label>\
                                                    <input class="form-control mh-input">\
                                                    <div class="mh-input-error-message help-block"></div>\
                                                </div>\
                                                <div class="mh-textarea-container">\
                                                    <label class="mh-title"></label>\
                                                    <textarea class="form-control mh-input">\
                                                    </textarea>\
                                                    <div class="mh-input-error-message help-block"></div>\
                                                </div>\
                                                <div class="mh-select-container">\
                                                    <label class="mh-title"></label>\
                                                    <select class="form-control mh-input">\
                                                        <option class="mh-select-empty-option"></option>\
                                                    </select>\
                                                    <div class="errors">\
                                                        <div class="mh-input-error-message" ng-message="required"></div>\
                                                    </div>\
                                                </div>\
                                                <div class="mh-md-select-container">\
                                                    <md-input-container style="margin-bottom:0px; width:100%">\
                                                        <label class="mh-title"></label>\
                                                        <md-select class="mh-input">\
                                                            <md-option class="mh-select-empty-option"></md-option>\
                                                            <md-option class="mh-select-option">\
                                                            </md-option>\
                                                        </md-select>\
                                                        <div class="errors">\
                                                            <div class="mh-input-error-message" ng-message="required"></div>\
                                                        </div>\
                                                    </md-input-container>\
                                                </div>\
                                                <div class="mh-date-container">\
                                                    <md-input-container style="margin-bottom:0px; width:100%">\
                                                        <label class="mh-title"></label>\
                                                        <md-datepicker class="mh-input" md-placeholder="Enter date"></md-datepicker>\
                                                    </md-input-container>\
                                                </div>\
                                                <div class="mh-md-autocomplete-container">\
                                                    <label class="mh-title"></label>\
                                                    <md-autocomplete class="mh-input form-control" style="min-width: inherit;">\
                                                        <md-item-template>\
                                                          <span></span>\
                                                        </md-item-template>\
                                                  </md-autocomplete>\
                                                  <div class="mh-input-error-message help-block">mensaje de error</div>\
                                                </div>\
                                                <div class="mh-dropfiles-container">\
                                                    <label class="mh-title"></label>\
                                                    <ngf-drop ngf-select class="mh-bs-dropfile mh-input">\
                                                        <span class="mh-placeholder"></span>\
                                                    </ngf-drop>\
                                                    <div ngf-no-file-drop class="mh-input-error-message"></div>\
                                                </div>\
                                                <div class="mh-button-container">\
                                                    <button class="btn btn-default mh-form-button">\
                                                        <span class="mh-title"></span>\
                                                    </button>\
                                                </div>\
                                            </div>\
                                        </ng-form>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var formCtrl = ctrls[0];
            var themeCtrl = ctrls[1];
            
            formCtrl.scope.mhClassInvalid = 
            formCtrl.scope.mhClassInvalid == null ? 'has-error' : formCtrl.scope.mhClassInvalid;
            
            var templateElem = 
            $(themeCtrl.renderFormTheme(this.mhRawInnerTemplate, formCtrl.scope));
            formCtrl.compileTemplate(templateElem, el, themeCtrl.formElements);
        },
        controller : ["$scope", "$element", "$attrs", function($scope, $element, $attrs)
        {
            var self = this;
            self.formElements = [];

            this.renderFormTheme = function(template, formScope)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var form = renderedTemplate.find("ng-form");
                var elementsContainer = form.find(".mh-form-elements-container");

                var formRow = form.find(".mh-form-row");
                formRow.remove();

                var formCol = formRow.find(".mh-form-col");
                formCol.remove();
                
                var inputContainer = elementsContainer.find(".mh-input-container");
                inputContainer.remove();

                var textareaContainer = elementsContainer.find(".mh-textarea-container");
                textareaContainer.remove();

                var selectContainer = elementsContainer.find(".mh-select-container");
                selectContainer.remove();

                var mdSelectContainer = elementsContainer.find(".mh-md-select-container");
                mdSelectContainer.remove();

                var mdDateContainer = elementsContainer.find(".mh-date-container");
                mdDateContainer.remove();

                var mdAutocompleteContainer = elementsContainer.find(".mh-md-autocomplete-container");
                mdAutocompleteContainer.remove();

                var ngfDropContainer = elementsContainer.find(".mh-dropfiles-container");
                ngfDropContainer.remove();

                var buttonContainer = form.find(".mh-button-container");
                buttonContainer.remove();

                var label = form.find(".mh-label");
                label.remove();

                //RENDER LAYOUT
                formScope.mhFormLayout = formScope.mhFormLayout || [];
                for(var i = 0; i < formScope.mhFormLayout.length; i++)
                {
                    var element = formScope.mhFormLayout[i];
                    recursivelyIndexAndRenderElement(element, elementsContainer);
                }

                function recursivelyIndexAndRenderElement(element, group, parent)
                {
                    if(element instanceof MHFormBSRow)
                    {
                        var rowContainer = element;
                        var newFormRow = formRow.clone();
                        MHDecorator.decorateEltCSS(newFormRow, element.cssClasses, element.styles);
                        MHDecorator.decorateEltAttributes(newFormRow, element.attributes);
                        group.append(newFormRow);

                        if(rowContainer.elements != null)
                        {
                            for(var i = 0; i < rowContainer.elements.length; i++)
                            {
                                recursivelyIndexAndRenderElement(rowContainer.elements[i], newFormRow, rowContainer);
                            }
                        }  
                    }
                    else if(element instanceof MHFormBSCol)
                    {
                        var usedCols = 0;
                        var container  = element;
                        var newFormCol = formCol.clone();
                        MHDecorator.decorateEltCSS(newFormCol, element.cssClasses, element.styles);
                        MHDecorator.decorateEltAttributes(newFormCol, element.attributes);
                        if(element.flex)
                        {
                            var flexAlign = 'flex-start';
                            var flexJustify = 'flex-start';
                            switch(container.vAlign)
                            {
                                case 'top' : flexAlign = 'flex-start';
                                break;
                                case 'middle' : flexAlign = 'center';
                                break;
                                case 'bottom' : flexAlign = 'flex-end';
                                break;
                            }

                            switch(container.hAlign)
                            {
                                case 'left' : flexJustify = 'flex-start';
                                break;
                                case 'center' : flexJustify = 'center';
                                break;
                                case 'right' : flexJustify = 'flex-end';
                                break;
                            }

                            newFormCol.css("display", "flex");
                            newFormCol.css("align-items", flexAlign);
                            newFormCol.css("justify-content", flexJustify);
                        }
                        
                        var cols = container.colWidth;
                        var offset = container.offset;
                        
                        newFormCol.addClass("col-md-"+cols);
                        
                        if(offset > 0)
                        {
                            newFormCol.addClass("col-md-offset-"+offset);
                        }
                        
                        group.append(newFormCol);

                        if(container.elements != null)
                        {
                            for(var i = 0; i < container.elements.length; i++)
                            {
                                recursivelyIndexAndRenderElement(container.elements[i], newFormCol, container);
                            }
                        }
                    }
                    else
                    {
                        var newElementContainer = renderElementContainer(element, parent);
                        group.append(newElementContainer);
                        //add element to elements array
                        self.formElements.push(element);
                    }   
                }

                function renderElementContainer(element, parent)
                {
                    var newElementContainer = null;

                    if(element instanceof MHFormFieldMDSelect)
                    {
                        newElementContainer = mdSelectContainer.clone();
                    }
                    else if(element instanceof MHFormFieldSelect)
                    {
                        newElementContainer = selectContainer.clone();
                    }
                    else if(element instanceof MHFormFieldMDDate)
                    {
                        newElementContainer = mdDateContainer.clone();
                        newElementContainer.find("md-datepicker").attr("md-placeholder", element.placeholder);
                    }
                    else if(element instanceof MHFormFieldMDAutocomplete)
                    {
                        newElementContainer = mdAutocompleteContainer.clone();
                    }
                    else if(element instanceof MHFormButton)
                    {
                        newElementContainer = buttonContainer.clone();
                    }
                    else if(element instanceof MHFormLabel)
                    {
                        newElementContainer = label.clone();
                    }
                    else if(element instanceof MHFormFieldTextArea)
                    {
                        newElementContainer = textareaContainer.clone();
                    }
                    else if(element instanceof MHFormFieldDropfile)
                    {
                        if(element.dragOverClass == null)
                        {
                            element.dragOverClass = "'mh-bs-dropfile-dragover'";
                        }

                        newElementContainer = ngfDropContainer.clone();
                    }
                    else
                    {
                        newElementContainer = inputContainer.clone();
                    }

                    if(element.title == null)
                    {
                        newElementContainer.find("label").remove();
                    }

                    newElementContainer.attr("data-mh-name", element.name);
                    newElementContainer.css("float", "left");
                    newElementContainer.css("padding-left", "5px");
                    newElementContainer.css("padding-right", "5px");

                    if(parent.fill)
                    {
                        newElementContainer.css("width", "100%");
                    }
                    
                    return newElementContainer;
                }

                return renderedTemplate.html();
            }
        }]
    };
}])
angular.module('ign.Mahou').directive('mhSideNavbar', ["$compile", "$templateRequest", function ( $compile, $templateRequest ) {
    return {
        restrict: 'E',
        scope:{ 
            mhTitle : "=",
            mhLocked : "=?"
        },
        transclude: true,
        template :  '<md-sidenav class="md-sidenav-left" md-component-id="left"\
                        md-disable-backdrop md-whiteframe="1" md-is-locked-open="mhLocked || false">\
                        <md-toolbar class="md-theme-indigo">\
                          <h1 class="md-toolbar-tools">{{mhTitle}}</h1>\
                        </md-toolbar>\
                        <md-content>\
                          <div ng-transclude></div>\
                        </md-content>\
                      </md-sidenav>'
    };
}]);
/**
 * @class MHNavbarCtrl
 * @memberof Controllers
 * @classdesc
 * controller used by {@link Directives.mhNavbar mhNavbar} directive to compile and bind events to create a fully functional navbar.
 * @description
 * #### ** Directive: ** {@link Directives.mhNavbar mhNavbar}
 *
 * @property {object}                           scope                       - Isolated scope.
 * @property {MHButton[] | MHDropDownButton[]}  scope.mhNavbarElements      - An array of {@link UIElements.MHButton MHButton} or {@link UIElements.MHDropDownButton MHDropDownButton}
 * @property {string}                           scope.mhNavbarTitle         - Title to be displayed on the navbar (can be decorated to show an image using {@link Decorators.MHBsDecorator MHBsDecorator})
 * @property {function|string}                  scope.mhNavbarTitleAction   - a function to be called or a ui-router state to transition when user clicks on the title.
 * @property {MHButton[] | MHDropDownButton[]}  allNavbarElements           - An array of {@link UIElements.MHButton MHButton} or {@link UIElements.MHDropDownButton MHDropDownButton}. If theme extends elements, they should be concatenated here.
 */
angular
.module('ign.Mahou')
.controller('MHNavbarCtrl', 
    ["$scope", "$element", "$attrs", "$compile", "$state", function MHNavbarCtrl($scope, $element, $attrs, $compile, $state)
    {
        var self = this;
        self.scope = $scope;
        self.allNavbarElements = self.scope.mhNavbarElements;
        if(self.allNavbarElements == null)
        {
            self.allNavbarElements = [];
        }

        MHValidationHelper.validateType(self.allNavbarElements, "mhNavbarElements", Array);

        if(self.scope.mhNavbarTitleAction != null)
        {
            MHValidationHelper.validateType(self.scope.mhNavbarTitleAction, "mhNavbarTitleAction", [Function, String]);
        }

        /** @function compileTemplate
         * @memberof Controllers.MHNavbarCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;
            var brand = templateElem.find(".mh-brand");
            brand.attr("ng-click", "controller.executeStateOrAction(mhNavbarTitleAction)");
            var brandTitle = brand.find(".mh-title");
            brandTitle.attr("mh-compile","mhNavbarTitle");

            for(var i = 0; i < self.allNavbarElements.length; i++)
            {
                var config = self.allNavbarElements[i];
                //render button
                MHValidationHelper.validateType(config, "controller.allNavbarElements["+i+"]", MHButton);
                var button = templateElem.find(".mh-navbar-button[data-mh-name="+config.name+"]");

                //render only if button has been found
                if(button.length > 0)
                {
                    MHDecorator.decorateEltCSS(button, config.cssClasses, config.styles);
                    MHDecorator.decorateEltAttributes(button, config.attributes);
                    MHValidationHelper.validateRequiredTags(config, button);

                    button.attr("ng-click", "controller.executeStateOrAction(controller.allNavbarElements["+i+"].action)");
                    button.find(".mh-title").attr("mh-compile", "controller.allNavbarElements["+i+"].title");
                    
                    //if button has dropdownButtons, render dropdownButtons as well
                    if(config.dropdownButtons != null && config.dropdownButtons.length > 0)
                    {
                        for(var j = 0; j < config.dropdownButtons.length; j++)
                        {
                            var dropdownConfig = config.dropdownButtons[j];
                            var button = templateElem.find(".mh-navbar-button[data-mh-name="+dropdownConfig.name+"]");
                            //render only if button has been found
                            if(button.length > 0)
                            {
                                MHDecorator.decorateEltCSS(button, dropdownConfig.cssClasses, dropdownConfig.styles);
                                MHDecorator.decorateEltAttributes(button, dropdownConfig.attributes);
                                MHValidationHelper.validateRequiredTags(dropdownConfig, button);
                                button.attr("ng-click", "controller.executeStateOrAction(controller.allNavbarElements["+i+"].dropdownButtons["+j+"].action)");
                                button.find(".mh-title").attr("mh-compile","controller.allNavbarElements["+i+"].dropdownButtons["+j+"].title");
                            }
                        }
                    } 
                }               
            }
            
            directiveElem.append(templateElem);
            $compile(directiveElem.contents())(scope);
        }

        /** @function executeStateOrAction
         * @memberof Controllers.MHNavbarCtrl
         * @instance
         * @param action {function | string} the action to execute or state to transition
         * @returns {void} Nothing
         * @description executes a function or transitions to an ui-router state
         */
        this.executeStateOrAction = function(action)
        {
            if(typeof(action) == "string")
            {
                $state.go(action);
            }
            else if(typeof(action) == "function")
            {
                action();
            }
        }
    }]
);
/**
 * @class mhNavbar
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional navbar menu.
 * Supports MHButtons and MHDropdownButtons
 * **directive types:** Element only
 *
 * @description 
 * #### ** Controller: ** {@link Controllers.MHNavbarCtrl MHNavbarCtrl}
 * ### ** HTML declaration **
    <mh-navbar {mh-navbar-theme-directive} 
        mh-navbar-elements="{arrayOfUIElements}">
        <!-- custom UI can be declared here using mhNavbarThemeCustom -->
    </mh-navbar>
 * ### **Theme customization**
 * mhNavbar UI can be customized any way you want it using Mahou's mh-navbar-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling mhNavbar directive. **
 *
 * #### **Available mhNavbar themes**
 * - **{@link Themes.mhNavbarThemeCustom mh-navbar-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhNavbarThemeBs mh-navbar-theme-bs}** (directive with bootstrap navbar UI)
 *
 * @property {MHAbstractUIElement[]}  mhNavbarElements        - An array of {@link UIElements.MHButton MHButton} or {@link Models.MHDropdownButton MHDropdownButton} objects.
 * @property {string}                 mhNavbarTitle           - title of the navbar to be displayed
 * @property {function|string}        mhNavbarTitleAction    - a function to be called or a ui-router state to transition to if user clicks navbar title
 */
angular.module('ign.Mahou').directive('mhNavbar', ["$templateRequest", function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            mhNavbarElements : '=',
            mhNavbarTitle : '=',
            mhNavbarTitleAction : '='
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhNavbarTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhNavbar: no mhNavbarTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHNavbarCtrl',
        controllerAs : 'controller'
    };
}]);
 /**
 * @class mhNavbarThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhNavbar mhNavbar} directive. Used to define a custom UI for the navbar.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhNavbar mhNavbar}
 * ### ** HTML declaration **
    <mh-navbar mh-navbar-theme-custom
        {navbar-attributes}
        mh-tempalte-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-navbar>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
 */
angular.module('ign.Mahou').directive('mhNavbarThemeCustom', ["$templateRequest", function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhNavbar'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var ctrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $("<div></div>");
                templateElem.append(this.mhRawInnerTemplate);      
                ctrl.compileTemplate(templateElem, el);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    ctrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
}])
 /**
 * @class mhNavbarThemeBs
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhNavbar mhNavbar} directive. Used to define a bootstrap navbar theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhNavbar mhNavbar}
 * ### ** HTML declaration **
    <mh-navbar mh-navbar-theme-bs
        {navbar-attributes}
        mh-navbar-elements-right="{arrayOfUIElements}"
        mh-navbar-position="{navbarPositionString}"
        mh-navbar-inverse="{boolean}">
    </mh-navbar>
 * @property {MHAbstractUIElement[]}  mhNavbarElementsRight     - An array of {@link UIElements.MHButton MHButton} or {@link Models.MHDropdownButton MHDropdownButton} objects.
 * @property {string}                 mhNavbarPosition          - position of the bootstrap navbar ({@link Enumerators.MHNavbarBSPosition MHNavbarBSPosition}).
 * @property {boolean}                mhNavbarInverse           - defines if bootstrap should render regular navbar or inverse style.
 */
angular.module('ign.Mahou').directive('mhNavbarThemeBs', ["$templateRequest", "$parse", function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhNavbar', 'mhNavbarThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<nav class="navbar navbar-default">\
                                            <div class="container-fluid">\
                                                <!-- Brand and toggle get grouped for better mobile display -->\
                                                <div class="navbar-header">\
                                                  <button type="button" class="navbar-toggle collapsed"\
                                                  data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\
                                                    <span class="sr-only">Toggle navigation</span>\
                                                    <span class="icon-bar"></span>\
                                                    <span class="icon-bar"></span>\
                                                    <span class="icon-bar"></span>\
                                                  </button>\
                                                  <a class="navbar-brand mh-brand" href="#" onclick="return false;"><span class="mh-title"></span></a>\
                                                </div>\
                                                <!-- Collect the nav links, forms, and other content for toggling -->\
                                                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\
                                                  <ul class="nav navbar-nav">\
                                                    <li>\
                                                        <a class="mh-navbar-button" href="#" onclick="return false;">\
                                                            <span class="mh-title"></span>\
                                                        </a>\
                                                    </li>\
                                                    <li class="dropdown">\
                                                      <a href="#" onclick="return false;" class="dropdown-toggle mh-navbar-button" \
                                                      data-toggle="dropdown" role="button" aria-haspopup="true" \
                                                      aria-expanded="false"><span class="mh-title"></span> <span class="caret"></span></a>\
                                                      <ul class="dropdown-menu">\
                                                        <li><a href="#" onclick="return false;" class="mh-navbar-button"><span class="mh-title"></span></a></li>\
                                                      </ul>\
                                                    </li>\
                                                  </ul>\
                                                  <ul class="nav navbar-nav navbar-right">\
                                                    <li>\
                                                        <a class="mh-navbar-button" href="#" onclick="return false;">\
                                                            <span class="mh-title"></span>\
                                                        </a>\
                                                    </li>\
                                                    <li class="dropdown">\
                                                      <a href="#" onclick="return false;" class="dropdown-toggle mh-navbar-button" \
                                                      data-toggle="dropdown" role="button" aria-haspopup="true" \
                                                      aria-expanded="false"><span class="mh-title"></span> <span class="caret"></span></a>\
                                                      <ul class="dropdown-menu">\
                                                        <li><a href="#" onclick="return false;" class="mh-navbar-button"><span class="mh-title"></span></a></li>\
                                                      </ul>\
                                                    </li>\
                                                  </ul>\
                                                </div><!-- /.navbar-collapse -->\
                                            </div><!-- /.container-fluid -->\
                                        </nav>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var navbarCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            var bsNavbarPosition = attrs.mhNavbarPosition;
            var navbarPositionClass ="";
            switch(bsNavbarPosition)
            {
                case MHNavbarBSPosition.FIXED_BOTTOM :
                navbarPositionClass = "navbar-fixed-bottom";
                break;
                case MHNavbarBSPosition.STATIC:
                navbarPositionClass = "navbar-static-top";
                break;
                case MHNavbarBSPosition.FIXED_TOP : 
                default:
                navbarPositionClass = "navbar-fixed-top";
                break;
            }

            var inverse = attrs.mhNavbarInverse == null ? false : true;

            var rightElements = $parse(attrs.mhNavbarElementsRight)(scope);

            if(rightElements != null)
            {
                //extend navbar scope to add mhNavbarButtonsRight for this theme 
                MHValidationHelper.validateType(rightElements, "mhNavbarElementsRight", Array);
            }else
            {
                rightElements = [];
            }

            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate, navbarCtrl.allNavbarElements, rightElements, navbarPositionClass, inverse));

            //append the right buttons to navbarButtons array
            navbarCtrl.allNavbarElements = navbarCtrl.allNavbarElements.concat(rightElements);
            navbarCtrl.compileTemplate(templateElem, el);
        },
        controller : ["$scope", "$element", "$attrs", function($scope, $element, $attrs)
        {
            function renderLIButtons(ul, buttons)
            {
                var simpleButtonContainer = ul.find("> li:not(.dropdown)");
                simpleButtonContainer.remove();

                var dropdownButtonContainer = ul.find("> li.dropdown");
                dropdownButtonContainer.remove();

                for(var i = 0; i < buttons.length; i++)
                {
                    var config = buttons[i];
                    var newButtonContainer = null;

                    if(config.dropdownButtons != null && config.dropdownButtons.length > 0)
                    {
                        newButtonContainer = dropdownButtonContainer.clone();

                        var innerUl = newButtonContainer.find("ul");
                        var innerSimpleButtonContainer = innerUl.find("li");
                        innerSimpleButtonContainer.remove();

                        var navBarButton = newButtonContainer.find("> a.mh-navbar-button");
                        navBarButton.attr("data-mh-name", config.name);

                        for(var j = 0; j < config.dropdownButtons.length; j++)
                        {
                            var newInnerSimpleButtonContainer = innerSimpleButtonContainer.clone();
                            var innerButton = newInnerSimpleButtonContainer.find("> a.mh-navbar-button");
                            innerButton.attr("data-mh-name", config.dropdownButtons[j].name);
                            innerUl.append(newInnerSimpleButtonContainer);
                        }
                    }
                    else
                    {
                        newButtonContainer = simpleButtonContainer.clone();
                        newButtonContainer.find(".mh-navbar-button").attr("data-mh-name", config.name);
                    }
                    ul.append(newButtonContainer);
                }
            }

            this.renderTheme = function(template, leftElements, rightElements, navbarPositionClass, inverse)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var navbar = renderedTemplate.find("nav");
                navbar.addClass(navbarPositionClass);

                if(inverse)
                {
                    navbar.removeClass("navbar-default");
                    navbar.addClass("navbar-inverse");
                }

                var ul = navbar.find("ul.nav:not(.navbar-right)");
                renderLIButtons(ul, leftElements);

                var rightUl = navbar.find("ul.nav.navbar-right");
                renderLIButtons(rightUl, rightElements);

                return renderedTemplate.html();
            }
        }]
    };
}])

/** 
* Defines the positions of the bootstrap navbar used in theme {@link Themes.mhNavbarThemeBs mhNavbarThemeBs}
* @enum {string}
* @memberof Enumerators
*/
var MHNavbarBSPosition = 
{
    /** value: "fixed-top" */
    FIXED_TOP : "fixed-top",
    /** value: "fixed-bottom"  */
    FIXED_BOTTOM : "fixed-bottom", 
    /** value: "static"  */
    STATIC : "static"
}
/**
 * @class MHPaginatorCtrl
 * @memberof Controllers
 * @classdesc
 * controller used by {@link Directives.mhPaginator mhPaginator} directive to compile and bind events to create a fully functional paginator.
 * @description
 * #### ** Directive: ** {@link Directives.mhPaginator mhPaginator}
 *
 * @property {object}           scope                          - Isolated scope.
 * @property {number}           scope.mhPageGroupSize          - The number of pages per group.
 * @property {number}           scope.mhCurrentPage            - Current active page.
 * @property {number}           scope.mhLastPage               - Last available page.
 * @property {number}           scope.mhClassActive            - Class to be used for active elements.
 * @property {number}           scope.mhClassDisabled          - Class to be used for disabled elements.
 * @property {Function}         scope.mhOnPageSelected         - Function to be called when a page is selected.
 * @property {number}           groupInitPage                  - Holds the first page of the current group.
 * @property {number}           groupLastPage                  - Holds the last page of the current group.
 * @property {number}           pageGroup                      - Holds the number of the current group.
 * @property {number}           lastGroup                      - Holds the number of the last group.
 */
angular
.module('ign.Mahou')
.controller('MHPaginatorCtrl', 
    ["$scope", "$element", "$attrs", "$compile", function MHPaginatorCtrl($scope, $element, $attrs, $compile)
    {
        var self = this;
        self.scope = $scope;
        self.groupInitPage = 0;
        self.groupLastPage = 0;
        self.pageGroup = 0;
        self.lastGroup = 0;

        /** @function compileTemplate
         * @memberof Controllers.MHPaginatorCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;
            
            groupPages();
            var pageButtonContainer = templateElem.find(".mh-page-button-container");
            pageButtonContainer.attr("ng-repeat", "page in mhPages");
            pageButtonContainer.attr("ng-class", "{'"+self.scope.mhClassActive+"' : page == mhCurrentPage}");
            pageButtonContainer.find(".mh-title").html("{{page}}");
            pageButtonContainer.find(".mh-page-button").attr("ng-click", "controller.setCurrentPage(page)");

            templateElem.find(".mh-prev-button").attr("ng-click", "controller.pageGroup > 0 && controller.setCurrentPage(controller.groupInitPage - 1)");
            templateElem.find(".mh-next-button").attr("ng-click", "controller.pageGroup < controller.lastGroup && controller.setCurrentPage(controller.groupLastPage + 1)");

            templateElem.find(".mh-prev-button-container").attr("ng-class", "{'"+self.scope.mhClassDisabled+"' : controller.pageGroup === 0}");
            templateElem.find(".mh-next-button-container").attr("ng-class", "{'"+self.scope.mhClassDisabled+"' : controller.pageGroup == controller.lastGroup}");
            
            directiveElem.append(templateElem);
            $compile(directiveElem.contents())(scope);
        }

        /** @function setCurrentPage
         * @memberof Controllers.MHPaginatorCtrl
         * @instance
         * @param page {number} number of the new page to be set.
         * @returns {void} Nothing
         * @description changes the paginator to a new page, recalculates current group and updates UI to reflect the changes.
         */
        this.setCurrentPage = function(page)
        {
            self.scope.mhCurrentPage = page;

            if(self.scope.mhCurrentPage < 1)
            {
                self.scope.mhCurrentPage = 1;
            }
            else if(self.scope.mhCurrentPage > self.scope.mhLastPage)
            {
                self.scope.mhCurrentPage = self.scope.mhLastPage;
            }
        }

        //PRIVATE
        function groupPages()
        {
            self.scope.mhLastPage = self.scope.mhLastPage || 1;
            self.scope.mhCurrentPage = self.scope.mhCurrentPage < 1 || self.scope.mhCurrentPage == null ? 1 : self.scope.mhCurrentPage;

            var pages=[];
            var pagesPerGroup = self.scope.mhPageGroupSize < 1 ? 1 : self.scope.mhPageGroupSize;
            var pagesGroupsCount = self.scope.mhLastPage > 0 ? Math.ceil(self.scope.mhLastPage / pagesPerGroup) : 1;
            var pagePosition =  (self.scope.mhCurrentPage-1) / (pagesGroupsCount*pagesPerGroup);
            var pageGroup = Math.floor(pagePosition * pagesGroupsCount);

            var groupInit = pageGroup * pagesPerGroup;
            var groupEnd = groupInit + pagesPerGroup;

            if(groupEnd > self.scope.mhLastPage)
            {
                groupEnd = self.scope.mhLastPage;
            }
            
            var i;
            for(i=groupInit; i<groupEnd; i++)
            {
                pages.push(i+1);
            };

            self.scope.mhPages = pages;
            self.groupInitPage = groupInit + 1;
            self.groupLastPage = groupEnd;
            self.pageGroup = pageGroup;
            self.lastGroup = pagesGroupsCount-1;
        }

        function onCurrentPageUpdated()
        {
            groupPages();

            if(self.scope.mhOnPageSelected != null)
            {
                self.scope.mhOnPageSelected({page : self.scope.mhCurrentPage});
            }
        }

        $scope.$watch("mhLastPage", 
        function( newValue, oldValue ) 
        {
            if(newValue != oldValue)
            {
                groupPages();
            }
        });

        $scope.$watch("mhCurrentPage", 
        function( newValue, oldValue ) 
        {
            if(newValue != oldValue)
            {
                onCurrentPageUpdated(newValue);
            }
        });
    }]
);
/**
 * @class mhPaginator
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional paginator.
 * **directive types:** Element only
 *
 * @description 
 * #### ** Controller: ** {@link Controllers.MHPaginatorCtrl MHPaginatorCtrl}
 * ### ** HTML declaration **
    <mh-paginator {mh-paginator-theme-directive} 
        mh-page-group-size="{sizeOfPageGoup}"
        mh-page-current-size="{theCurrentPageNumber}
        mh-last-page="{theLastPageNumber}"
        mh-on-page-selected="{callbackFunction(page)}">
    </mh-paginator>
 * ### **Theme customization**
 * mhPaginator UI can be customized any way you want it using Mahou's mh-navbar-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling mhPaginator directive. **
 *
 * #### **Available mhPaginator themes**
 * - **{@link Themes.mhPaginatorThemeCustom mh-paginator-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhPaginatorThemeBs mh-paginator-theme-bs}** (directive with bootstrap paginator UI)
 *
 * @property {number}           mhPageGroupSize          - The number of pages per group.
 * @property {number}           mhCurrentPage            - Current active page.
 * @property {number}           mhLastPage               - Last available page.
 * @property {number}           mhClassActive            - Class to be used for active elements.
 * @property {number}           mhClassDisabled          - Class to be used for disabled elements.
 * @property {Function}         mhOnPageSelected         - Function to be called when a page is selected.
 */
angular.module('ign.Mahou').directive('mhPaginator', ["$templateRequest", function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        {
            mhPageGroupSize : '=',
            mhCurrentPage : '=',
            mhLastPage : '=',
            mhClassActive : '=?',
            mhClassDisabled : '=?',
            mhOnPageSelected : '&'
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhPaginatorTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhPaginator: no mhPaginatorTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHPaginatorCtrl',
        controllerAs : 'controller'
    };
}]);
/**
 * @class mhPaginatorThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhPaginator mhPaginator} directive. Used to define a custom UI for the paginator.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhPaginator mhPaginator}
 * ### ** HTML declaration **
    <mh-paginator mh-paginator-theme-custom
        {navbar-attributes}
        mh-tempalte-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-paginator>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
 */
angular.module('ign.Mahou').directive('mhPaginatorThemeCustom', ["$templateRequest", function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhPaginator'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var formCtrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                formCtrl.compileTemplate(templateElem, el, scope.mhFormLayout);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    formCtrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
}])
 /**
 * @class mhPaginatorThemeBs
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhPaginator mhPaginator} directive. Used to define a bootstrap paginator theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhPaginator mhPaginator}
 * ### ** HTML declaration **
    <mh-paginator mh-paginator-theme-bs
        {navbar-attributes}>
    </mh-paginator>
 */
angular.module('ign.Mahou').directive('mhPaginatorThemeBs', ["$templateRequest", "$parse", function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhPaginator', 'mhPaginatorThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =   '<nav aria-label="Page navigation">\
                                          <ul class="pagination">\
                                            <li class="mh-prev-button-container">\
                                              <a href="#" onclick="return false;" aria-label="Previous" class="mh-prev-button">\
                                                <span aria-hidden="true">&laquo;</span>\
                                              </a>\
                                            </li>\
                                            <li class="mh-page-button-container">\
                                                <a class="mh-page-button" href="#" onclick="return false;">\
                                                    <span class="mh-title"></span>\
                                                </a>\
                                            </li>\
                                            <li class="mh-next-button-container">\
                                              <a href="#" onclick="return false;" aria-label="Next" class="mh-next-button">\
                                                <span aria-hidden="true">&raquo;</span>\
                                              </a>\
                                            </li>\
                                          </ul>\
                                        </nav>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var paginatorCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            paginatorCtrl.scope.mhClassActive = "active";
            paginatorCtrl.scope.mhClassDisabled = "disabled";

            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate));
            paginatorCtrl.compileTemplate(templateElem, el);
        },
        controller : ["$scope", "$element", "$attrs", function($scope, $element, $attrs)
        {   
            this.renderTheme = function(template)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);
                return renderedTemplate.html();
            }
        }]
    };
}])