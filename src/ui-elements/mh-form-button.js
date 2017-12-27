/**
 * @class MHFormButton
 * @memberof UIElements
 * @classdesc
 * A button to be rendered inside an {@link Directives.mhForm mhForm} Directive. Can be enabled and disabled depending on diferent {@link Directives.mhForm mhForm} states.
 * @property {string}  	disabledStatuses 	- string with a list of {@link Enumerators.MHFormStatus MHFormStatus} for which the button should remain disabled. (separated with commas).
 * @augments UIElements.MHButton
 *
 */
function MHFormButton(config)
{
	//inherit from MHButton
	MHButton.call(this, config);

	this.disabledStatuses = MHValidationHelper.safeClassAttribute(config, "disabledStatuses", String, null, false);
}

MHFormButton.prototype = Object.create(MHButton.prototype);
MHFormButton.prototype.constructor = MHFormButton;