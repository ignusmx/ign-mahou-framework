function MHFormBSCol(config)
{
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.elements, "elements", MHAbstractUIElement, MHFormBSCol);

	this.colWidth = MHValidationHelper.safeClassAttribute(config, "colWidth", Number, null, false, 12);
	this.minHeight = MHValidationHelper.safeClassAttribute(config, "minHeight", Number, null, false);
	this.align = MHValidationHelper.safeClassAttribute(config, "align", String, null, false, "top");
	this.offset = MHValidationHelper.safeClassAttribute(config, "offset", Number, null, false, 0);
}

MHFormBSCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSCol.prototype.constructor = MHFormBSCol;