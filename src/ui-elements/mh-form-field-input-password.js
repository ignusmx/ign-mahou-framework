/**
 * @class MHFormFieldInputPassword
 * @memberof UIElements
 * @classdesc
 * A form field of type HTML5 Password.
 * @augments UIElements.MHFormFieldInput 
 */
function MHFormFieldInputPassword(config)
{
	//inherit from MHFormField
	config.type = MHFormFieldInputType.PASSWORD;
	MHFormFieldInput.call(this, config);
}

MHFormFieldInputPassword.prototype = Object.create(MHFormFieldInput.prototype);
MHFormFieldInputPassword.prototype.constructor = MHFormFieldInputPassword;