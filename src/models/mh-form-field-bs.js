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
function MHFormFieldBs(config)
{
	//inherit from MHFormField
	var parent = new MHFormField(config);
	var constructor = this.__proto__.constructor;
	this.__proto__ = Object.create(parent.__proto__);
	this.__proto__.constructor = constructor;

	//own properties
	this.__proto__.cols = config.cols;
	this.__proto__.offset = config.offset;
}