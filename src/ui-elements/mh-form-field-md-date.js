/**
 * @class MHFormFieldMDDate
 * @memberof UIElements
 * @classdesc
 * Renders a Material Design's Date on an MHForm. Requires "md-datepicker" tag.
 * @augments UIElements.MHAbstractFormField
 */
function MHFormFieldMDDate(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);
	this.requiredTags = "md-datepicker";
}

MHFormFieldMDDate.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFieldMDDate.prototype.constructor = MHFormFieldMDDate;