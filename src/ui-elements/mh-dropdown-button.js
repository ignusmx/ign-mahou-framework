/**
 * @class MHDropdownButton
 * @memberof UIElements
 * @classdesc
 * A dropdown button with children rendered over a mhNavbar directive.
 * 
 * @property {MHButton[]}   dropdownButtons		- list of {@link UIElements.MHButton MHButton} to be rendered inside dropdown button.
 * @augments UIElements.MHButton
 */
function MHDropdownButton(config)
{
	//inherit from MHUIElement
	MHButton.call(this, config);

	//own properties
	this.dropdownButtons  = MHValidationHelper.safeClassAttribute(config, "dropdownButtons", Array, null, false);
	//validate array DataTypes
	if(this.dropdownButtons != null)
	{
		MHValidationHelper.validateTypes(this.dropdownButtons, "dropdownButtons", MHButton, MHDropdownButton);
	}
}

MHDropdownButton.prototype = Object.create(MHButton.prototype);
MHDropdownButton.prototype.constructor = MHDropdownButton;