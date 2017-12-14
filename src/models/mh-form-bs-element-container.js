function MHFormBSElementContainer(config)
{
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	//validate array DataTypes
	console.log(config)
	MHValidationHelper.validateTypes(this.elements, "elements", MHAbstractUIElement);

	this.cols = MHValidationHelper.safeClassAttribute(config, "cols", Number, false, 12);
	this.minHeight = MHValidationHelper.safeClassAttribute(config, "minHeight", Number, false);
	this.align = MHValidationHelper.safeClassAttribute(config, "align", String, false, "top");
	this.offset = MHValidationHelper.safeClassAttribute(config, "offset", Number, false, 0);
	this.linebreak = MHValidationHelper.safeClassAttribute(config, "linebreak", Boolean, false, false);

	console.log("elements:", typeof(this.elements[0]));
}

MHFormBSElementContainer.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSElementContainer.prototype.constructor = MHFormBSElementContainer;