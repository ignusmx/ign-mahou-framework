function MHFormBSLabel(config)
{
	MHAbstractUIElement.call(this, config);
	this.requiredTags = "label";
}

MHFormBSLabel.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSLabel.prototype.constructor = MHFormBSLabel;