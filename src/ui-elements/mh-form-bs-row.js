function MHFormBSRow(config)
{
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.elements, "elements", MHFormBSCol);
}

MHFormBSRow.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSRow.prototype.constructor = MHFormBSRow;