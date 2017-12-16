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
function MHAbstractFormField(config)
{
	if (this.constructor === MHAbstractFormField)
	{
      throw new Error("Can't instantiate abstract MHAbstractFormField");
    }
	//inherit from MHUIElement
	MHAbstractUIElement.call(this, config);

	this.model = MHValidationHelper.safeClassAttribute(config, "model", String, null, false);
	this.placeholder = MHValidationHelper.safeClassAttribute(config, "placeholder", String, null, false);
	this.required = MHValidationHelper.safeClassAttribute(config, "required", Boolean, false, null, false);
	this.invalidMessage = MHValidationHelper.safeClassAttribute(config, "invalidMessage", String, null, false);
}

MHAbstractFormField.prototype = Object.create(MHAbstractUIElement.prototype);
MHAbstractFormField.prototype.constructor = MHAbstractFormField;