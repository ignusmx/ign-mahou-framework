/**
 * @class MHFormFieldTextarea
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string} resize		- A string with a valid css resize value. (none|both|horizontal|vertical|initial|inherit)
 * @augments UIElements.MHAbstractFormField
 *
 */
function MHFormFieldTextArea(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);

	this.resize = MHValidationHelper.safeClassAttribute(config, "resize", String, null, false, 'none');
	this.requiredTags = "textarea";
}

MHFormFieldTextArea.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldTextArea.prototype.constructor = MHFormFieldTextArea;