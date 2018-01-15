/**
 * @class MHDatagridCol
 * @memberof UIElements
 * @classdesc
 * Defines a column to be renderedin a mhDatagrid directive.
 * 
 * @property {string}   content  	- data to be rendered inside the column (can be a string with any angular expression including html or an array of MHButtons). Use "row" inside value to access element being rendered on the current row
 * @property {boolean}	visible     - sets column visibility.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHDatagridCol(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.content = MHValidationHelper.safeClassAttribute(config, "content", [String, Array], null, false);
	this.visible = MHValidationHelper.safeClassAttribute(config, "visible", Boolean, null, false, true);

	if(this.content instanceof Array)
	{
		MHValidationHelper.validateTypes(this.content, "elements", [MHButton, MHFilePreview]);
	}
}

MHDatagridCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHDatagridCol.prototype.constructor = MHDatagridCol;