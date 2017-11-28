/**
 * @class MHFormField
 * @memberof Models
 * @classdesc
 * A model used to setup and render a field on an MHForm.
 *
 * **directive types:** Element only
 * 
 * @property {string}   name                - name of the field (html name attribute and data-mh-name attribute)
 * @property {string}   title          		- Title of the field (rendered on element with class mh-form-)
 * @property {string}   model     			- Name of the inner property of the base model to be used as ngModel for this field
 * @property {string}   type   				- Type of input (html input type attribute) (text, password, email, number).
 * @property {number}   cols  				- Number of cols
 * @property {boolean}  required 			- Sets the field as required
 * @property {string}   invalidMessage 		- Message to be displayed if the field fails to validate
 *
 */
function MHFormField()
{
	this.name = '';
	this.title = '';
	this.model = '';
	this.type = '';
	this.cols = 1;
	this.required = false;
	this.invalidMessage = '';
}