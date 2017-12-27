/**
 * @class MHFormFieldInputEmail
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Email.
 * @augments UIElements.MHFormFieldInput 
 */
function MHFormFieldInputEmail(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.EMAIL;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputEmail.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputEmail.prototype.constructor = MHFormFieldInputEmail;