/**
 * @class MHFormField
 * @memberof Models
 * @description
 * A model used to setup and render a field on an MHForm.
 *
 * **directive types:** Element only
 * 
 * @property {object}  scope                - Isolated scope.
 * @property {object}  scope.model          - The ngModel to be used with the form.
 * @property {string}  scope.mhFormName     - The name (HTML 'name' attribute) of the form.
 * @property {array}   scope.mhFormFields   - An array of mhFormFields.
 * @property {number}  scope.mhFormButtons  - How much gold the party starts with.
 * @property {object}  controller - an {@link Controllers.MHFormCtrl MHFormCtrl} used to compile directive.
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