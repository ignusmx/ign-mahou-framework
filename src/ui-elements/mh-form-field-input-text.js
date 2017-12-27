/**
 * @class MHFormFieldInputText
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Text.
 * @augments UIElements.MHFormFieldInput
 */
function MHFormFieldInputText(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.TEXT;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputText.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputText.prototype.constructor = MHFormFieldInputText;