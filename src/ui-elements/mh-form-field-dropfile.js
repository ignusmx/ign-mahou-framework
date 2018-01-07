/**
 * @class MHFormFieldDropfile
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
function MHFormFieldDropfile(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);

	this.dragOverClass = MHValidationHelper.safeClassAttribute(config, "dragOverClass", String);
	this.multiple = MHValidationHelper.safeClassAttribute(config, "multiple", Boolean);
	this.allowDir = MHValidationHelper.safeClassAttribute(config, "allowDir", Boolean);
	this.pattern = MHValidationHelper.safeClassAttribute(config, "pattern", String);
	this.requiredTags = "ngf-drop";
}

MHFormFieldDropfile.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldDropfile.prototype.constructor = MHFormFieldDropfile;