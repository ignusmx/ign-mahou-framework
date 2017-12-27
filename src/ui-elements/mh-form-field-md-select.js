/**
 * @class MHFormFieldMDSelect
 * @memberof UIElements
 * @classdesc
 * renders a Material Design's Select. Requires "md-select" tag.
 * @augments UIElements.MHFormFieldSelect
 *
 */
function MHFormFieldMDSelect(config)
{
	//inherit from MHFormFieldSelect
	MHFormFieldSelect.call(this, config);
	this.requiredTags = "md-select";
}

MHFormFieldMDSelect.prototype = Object.create(MHFormFieldSelect.prototype);
MHFormFieldMDSelect.prototype.constructor = MHFormFieldMDSelect;