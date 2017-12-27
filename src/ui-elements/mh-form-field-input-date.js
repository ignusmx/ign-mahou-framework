/**
 * @class MHFormFieldInputDate
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Date.
 * @augments UIElements.MHFormFieldInput 
 *
 */
function MHFormFieldInputDate(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.DATE;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputDate.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputDate.prototype.constructor = MHFormFieldInputDate;