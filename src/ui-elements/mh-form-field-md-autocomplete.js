/**
 * @class MHFormFieldMDAutocomplete
 * @memberof UIElements
 * @classdesc
 * Renders a Material Design's Autocomplete input on an MHForm. Requires an md-autocomplete tag.
 * 
 * @property {function}   	searchQuery  - function returning an array or a promise of results to be queried from.
 * @property {string}   	itemText  	 - property of the current item to be shown in the autocomplete list. (e.g. item.name). 
 											Use 'item' to select the whole object as the itemText.
 * @property {string}   	minLength  	 - the min lenght user must type before performing the querySearch function.
 * @augments UIElements.MHAbstractFormField
 */
function MHFormFieldMDAutocomplete(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);
	this.searchQuery = MHValidationHelper.safeClassAttribute(config, "searchQuery", Function, null, true);
	this.searchText = MHValidationHelper.safeClassAttribute(config, "searchText", String, null, true);
	this.itemText = MHValidationHelper.safeClassAttribute(config, "itemText", String, null, true);
	this.minLength = MHValidationHelper.safeClassAttribute(config, "minLength", Number, null, false, 0);
	this.cache = MHValidationHelper.safeClassAttribute(config, "cache", Boolean, null, false, false);
	this.delay = MHValidationHelper.safeClassAttribute(config, "delay", Number, null, false, 0);
	this.requiredTags = "md-autocomplete";
}

MHFormFieldMDAutocomplete.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldMDAutocomplete.prototype.constructor = MHFormFieldMDAutocomplete;