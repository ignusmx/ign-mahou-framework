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
	this.requiredTags = "select";
}

MHFormFieldSelect.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldSelect.prototype.constructor = MHFormFieldSelect;