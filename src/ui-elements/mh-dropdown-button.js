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
function MHDropdownButton(config)
{
	//inherit from MHUIElement
	MHButton.call(this, config);

	//own properties
	this.dropdownButtons = config.dropdownButtons;
}

MHDropdownButton.prototype = Object.create(MHButton.prototype);
MHDropdownButton.prototype.constructor = MHDropdownButton;