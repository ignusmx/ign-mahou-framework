/**
 * @class MHButton
 * @memberof UIElements
 * @classdesc
 * A simple button to be rendered on an Mahou directive.
 * 
 * @property {function, string}		action 		- Function to be executed or ui-router state to transition when user clicks the button.
 *
 */
function MHButton(config)
{
	//inherit from MHUIElement
	MHAbstractUIElement.call(this, config);
	this.action = MHValidationHelper.safeClassAttribute(config, "action", [Function, String], null, false);
}

MHButton.prototype = Object.create(MHAbstractUIElement.prototype);
MHButton.prototype.constructor = MHButton;