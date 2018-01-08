/**
 * @class MHFormFieldDropfile
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string} 		dragOverClass	- Class to be applied when user drags files over the container.
 * @property {boolean}		multiple		- Single or multiple file selection.
 * @property {boolean} 		allowDir 		- the property of the option to be used as value (e.g: "option.property"). Default is "option" itself.
 * @property {pattern} 	 	pattern			- pattern to filter files to specific formats.
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