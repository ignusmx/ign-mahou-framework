/**
 * @class MHFormFieldInputNumber
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Number.
 * @augments UIElements.MHFormFieldInput 
 *
 */
function MHFormFieldInputNumber(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.NUMBER;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputNumber.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputNumber.prototype.constructor = MHFormFieldInputNumber;