/**
 * @class MHFormFieldBs
 * @memberof Models
 * @classdesc
 * A model used to setup and render a bootstrap field on an MHForm with a bootstrap mh-form-theme-bs-*.
 * 
 * @property {number}   cols  			- Width of the field container in columns 
 * (will add bootstrap col-md-{cols} class to field container).
 * @augments Models.MHFormField
 */
function MHFormFieldBs(name, title, model, type, options, defaulOption, required, invalidMessage)
{
	//inherit from MHFormField
	var parent = new MHFormField(name, title, model, type, options, defaulOption, required, invalidMessage);
	this.__proto__ = Object.create(parent.__proto__);

	//TODO: decorate this with a decorator
	//own properties
	this.__proto__.cols = 1;
}