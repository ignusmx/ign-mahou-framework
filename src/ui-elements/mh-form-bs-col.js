function MHFormBSCol(config)
{
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.elements, "elements", MHAbstractUIElement, MHFormBSCol);

	this.colWidth = MHValidationHelper.safeClassAttribute(config, "colWidth", Number, null, false, 12);
	this.minHeight = MHValidationHelper.safeClassAttribute(config, "minHeight", Number, null, false);
	this.vAlign = MHValidationHelper.safeClassAttribute(config, "vAlign", String, null, false, "top");
	this.hAlign = MHValidationHelper.safeClassAttribute(config, "hAlign", String, null, false, "left");
	this.offset = MHValidationHelper.safeClassAttribute(config, "offset", Number, null, false, 0);
	this.flex = MHValidationHelper.safeClassAttribute(config, "flex", Boolean, null, false);
	this.fill = MHValidationHelper.safeClassAttribute(config, "fill", Boolean, null, false);
}

MHFormBSCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSCol.prototype.constructor = MHFormBSCol;