/**
 * @class MHDatagridCol
 * @memberof UIElements
 * @classdesc
 * Defines a column to be renderedin a mhDatagrid directive.
 * 
 * @property {string}   content  	- data to be rendered inside the column. Can be a string (with any angular expression including html) 
 									  or an object or array of objects of supported {@link UIElements.MHAbstractUIElement MHAbstractUIElement} classes 
 									  ({@link UIElements.MHButton MHButton}, {@link UIElements.MHFilePreview MHFilePreview}). Use "row" inside value to access element being rendered on the current row.
 * @property {boolean}	visible     - sets column visibility.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHDatagridCol(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.content = MHValidationHelper.safeClassAttribute(config, "content", [String, MHButton, MHFilePreview, Array], null, false);
	this.visible = MHValidationHelper.safeClassAttribute(config, "visible", Boolean, null, false, true);

	if(this.content instanceof Array)
	{
		MHValidationHelper.validateTypes(this.content, "elements", [MHButton, MHFilePreview]);
	}
}

MHDatagridCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHDatagridCol.prototype.constructor = MHDatagridCol;