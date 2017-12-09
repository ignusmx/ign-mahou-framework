/**
 * @class MHFormField
 * @memberof Models
 * @classdesc
 * A model used to setup and render a field on an MHForm.
 * 
 * @property {string}   name                - name of the field (html name attribute and data-mh-name attribute)
 * @property {string}   title          		- Title of the field (rendered on element with class mh-title)
 * @property {string}   model     			- Name of the inner property of the base model to be used as ngModel for this field
 * @property {string}   type   				- Type of input (html input type attribute) ({@link Enumerators.MHFormFieldType MHFormFieldType}).
 * @property {array}    options  			- array of strings to be used as options if input type is MHFormFieldType.SELECT
 * @property {string}   defaultOption		- a string defining the default option to be shown if no option has been selected
 * @property {boolean}  required 			- Sets the field as required
 * @property {string}   invalidMessage 		- Message to be displayed if the field fails to validate
 * @property {string}   invalidClass  		- class to be applied to the field input when validation fails
 *
 */
function MHFormField(name, title, model, type, options, defaulOption, required, invalidMessage, cssClasses)
{
	//inherit from MHUIElement
	var parent = new MHUIElement(cssClasses);
	this.__proto__ = Object.create(parent.__proto__);

	this.__proto__.name = name;
	this.__proto__.title = title;
	this.__proto__.model = model;
	this.__proto__.type = type;
	this.__proto__.options = options;
	this.__proto__.defaultOption = defaultOption;
	this.__proto__.required = required == null ? false : required;
	this.__proto__.invalidMessage = invalidMessage;
}

/** 
* Defines the types of an MHFormField
* @enum {string}
* @memberof Enumerators
*/
var MHFormFieldType = 
{
	/** value: "text" (sets 'input' type="text") */
	TEXT : "text",
	/** value: "email" (sets 'input' type="email")  */
	EMAIL : "email", 
	/** value: "password" (sets 'input' type="password")  */
	PASSWORD : "password",
	/** value: "number" (sets 'input' type="number") */
	NUMBER : "number",
	/** value: "select" (mhForm will search for an html of type 'select' and map and repeat inner 'option' based on MHFormField.options ) */
	SELECT : "select"
}