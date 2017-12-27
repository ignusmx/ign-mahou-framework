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