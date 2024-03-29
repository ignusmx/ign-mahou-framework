/**
 * @class MHFormFieldDropfile
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string} 		dragOverClass	- Class to be applied when user drags files over the container.
 * @property {boolean}		multiple		- Single or multiple file selection.
 * @property {boolean} 		allowDir 		- Allow items to be droppped.
 * @property {string} 	 	accept			- string used to limit files to specific formats.
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
	this.accept = MHValidationHelper.safeClassAttribute(config, "accept", String);
	this.requiredTags = "ngf-drop";
}

MHFormFieldDropfile.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldDropfile.prototype.constructor = MHFormFieldDropfile;