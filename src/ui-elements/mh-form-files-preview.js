/**
 * @class MHFormFilesPreview
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string[]|number[]|Object[]} 	defaultValue	- Array of values, can be strings, numbers or objects.
 * @property {string}				 	 	emptyOption		- if set, string to be shown as an option with empty value.
 * @property {string} 	 				 	value			- the property of the option to be used as value (e.g: "option.property"). Default is "option" itself.
 * @property {string} 	 				 	text			- the property of the option to be used as text (e.g: "option.property"). Default is "option" itself.
 * @augments UIElements.MHAbstractFormField
 *
 */
function MHFormFilesPreview(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);
	this.defaultValue = MHValidationHelper.safeClassAttribute(config, "defaultValue", String);
}

MHFormFilesPreview.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFilesPreview.prototype.constructor = MHFormFilesPreview;