/**
 * @class MHDatagridCol
 * @memberof UIElements
 * @classdesc
 * Defines a column to be renderedin a mhDatagrid directive.
 * 
 * @property {string}   value  	- data to be rendered inside the column (can be any angular expression including html). Use "row" inside value to access element being rendered on the current row
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHDatagridCol(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.value = MHValidationHelper.safeClassAttribute(config, "value", String, null, false);
}

MHDatagridCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHDatagridCol.prototype.constructor = MHDatagridCol;