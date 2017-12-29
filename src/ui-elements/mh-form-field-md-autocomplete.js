/**
 * @class MHFormFieldMDAutocomplete
 * @memberof UIElements
 * @classdesc
 * Renders a Material Design's Autocomplete input on an MHForm. Requires an md-autocomplete tag.
 * 
 * @property {string}   querySearch  - function returning an array or a promise of results to be queried from.
 * @property {string}   itemText  	 - property of the current item to be shown in the autocomplete list.
 * @property {string}   minLength  	 - the min lenght user must type before performing the querySearch function.
 * @augments UIElements.MHAbstractFormField
 */
function MHFormFieldMDAutocomplete(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);
	this.querySearch = MHValidationHelper.safeClassAttribute(config, "querySearch", Function, null, true);
	this.itemText = MHValidationHelper.safeClassAttribute(config, "itemText", String, null, true);
	this.minLength = MHValidationHelper.safeClassAttribute(config, "minLength", Number, null, false, 0);
	this.requiredTags = "md-autocomplete";
}

MHFormFieldMDAutocomplete.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldMDAutocomplete.prototype.constructor = MHFormFieldMDAutocomplete;