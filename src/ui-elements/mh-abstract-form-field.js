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