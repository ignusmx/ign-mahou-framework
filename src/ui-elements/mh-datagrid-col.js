/**
 * @class MHFormButton
 * @memberof Models
 * @classdesc
 * A model used to setup and render a button on an MHForm.
 * 
 * @property {string}   name                - name of the button (data-mh-name attribute)
 * @property {string}   title          		- Title of the button (rendered on element with class mh-title)
 * @property {function} action  			- function to be used as callback when ngClick has occurred on the button
 * @property {string}   cssClasses			- additional classes to be applied to the button (separeted by single space)
 * @property {string}  	disabledStatuses 	- string with a list of {@link Enumerators.MHFormStatus MHFormStatus} for which the button should remain disabled. (separated with commas).
 * @property {string}   invalidMessage 		- Message to be displayed if the field fails to validate
 * @property {string}   invalidClass  		- class to be applied to the field input when validation fails
 *
 */
function MHDatagridCol(config)
{
	//inherit from MHUIElement
	MHAbstractUIElement.call(this, config);
	this.value = MHValidationHelper.safeClassAttribute(config, "value", String, null, false);
}

MHDatagridCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHDatagridCol.prototype.constructor = MHDatagridCol;