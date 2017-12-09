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
function MHDropdownButton(name, title, action, dropdownButtons, cssClasses)
{
	//inherit from MHFormField
	var parent = new MHButton(name, title, action, cssClasses);
	this.__proto__ = Object.create(parent.__proto__);

	//own properties
	this.__proto__.dropdownButtons = dropdownButtons;
}