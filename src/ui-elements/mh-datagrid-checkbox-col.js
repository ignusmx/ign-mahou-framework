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
function MHDatagridCheckboxCol(config)
{
	//inherit from MHDatagridCol
	MHDatagridCol.call(this, config);
	this.content = null;
}

MHDatagridCheckboxCol.prototype = Object.create(MHDatagridCol.prototype);
MHDatagridCheckboxCol.prototype.constructor = MHDatagridCheckboxCol;