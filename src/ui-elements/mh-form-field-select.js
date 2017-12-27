/**
 * @class MHFormFieldSelect
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string[]|number[]} options		- Array of values, can be strings or numbers
 * @property {string|number} 	 defaultOption	- a string or number with the default selected value
 * @augments UIElements.MHAbstractFormField
 *
 */
function MHFormFieldSelect(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);

	//validate main DataType
	this.options = MHValidationHelper.safeClassAttribute(config, "options", Array);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.options, "options", [String, Number]);

	this.defaultOption = MHValidationHelper.safeClassAttribute(config, "defaultOption", [String, Number], null, false);
	this.requiredTags = "select";
}

MHFormFieldSelect.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldSelect.prototype.constructor = MHFormFieldSelect;