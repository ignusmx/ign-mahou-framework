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
function MHFormFieldSelect(config)
{
	//inherit from MHUIElement
	MHAbstractFormField.call(this, config);

	//validate main DataType
	this.options = MHValidationHelper.safeClassAttribute(config, "options", Array);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.options, "options", [String, Number]);

	this.defaultOption = MHValidationHelper.safeClassAttribute(config, "defaultOption", String, false);
	this.requiredTags = "select";
}

MHFormFieldSelect.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldSelect.prototype.constructor = MHFormFieldSelect;