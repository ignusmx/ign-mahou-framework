function MHFormLabel(config)
{
	MHAbstractUIElement.call(this, config);
	this.requiredTags = "label";
}

MHFormLabel.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormLabel.prototype.constructor = MHFormLabel;