function MHFormBSElementContainer(config)
{
	this.elements = config.elements || [];
	this.cols = config.cols || 12;
	this.minHeight = config.minHeight;
	this.align = config.align || "top";
	this.offset = config.offset || 0;
	this.linebreak = config.linebreak  || false;
}