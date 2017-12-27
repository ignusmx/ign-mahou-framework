/**
 * @class MHFormLabel
 * @memberof UIElements
 * @classdesc
 * Renders a label inside an MHForm. requires "label" tag
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFormLabel(config)
{
	MHAbstractUIElement.call(this, config);
	this.requiredTags = "label";
}

MHFormLabel.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormLabel.prototype.constructor = MHFormLabel;