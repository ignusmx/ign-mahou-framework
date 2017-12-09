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
function MHFormFieldInput(config)
{
	//inherit from MHFormField
	MHAbstractFormField.call(this, config);
	this.type = config.type;
}

MHFormFieldInput.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldInput.prototype.constructor = MHFormFieldInput;



/** 
* Defines the types of an MHFormField
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
	/** value: "select" (mhForm will search for an html of type 'select' and map and repeat inner 'option' based on MHFormField.options ) */
	DATE : "date"
}