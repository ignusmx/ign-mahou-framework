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
function MHAbstractUIElement(config)
{
	if (this.constructor === MHAbstractUIElement)
	{
      throw new Error("Can't instantiate abstract MHAbstractUIElement");
    }

    this.name = MHValidationHelper.safeClassAttribute(config, "name", String, false);
	this.title = MHValidationHelper.safeClassAttribute(config, "title", String, false);
	this.cssClasses = MHValidationHelper.safeClassAttribute(config, "cssClasses", String, false);
	this.requiredTags = MHValidationHelper.safeClassAttribute(config, "requiredTags", String, false);
}