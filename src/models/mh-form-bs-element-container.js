function MHFormBSElementContainer(config)
{
	this.elements = config.elements || [];
	this.cols = MHValidationHelper.safeClassAttribute(config, "cols", Number, false, 12);
	this.minHeight = MHValidationHelper.safeClassAttribute(config, "minHeight", Number, false);
	this.align = MHValidationHelper.safeClassAttribute(config, "align", String, false, "top");
	this.offset = MHValidationHelper.safeClassAttribute(config, "offset", Number, false, 0);
	this.linebreak = MHValidationHelper.safeClassAttribute(config, "linebreak", Boolean, false, false);

	console.log("elements:", typeof(this.elements[0]));
}