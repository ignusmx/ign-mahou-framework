/**
 * @class MHDatagridCol
 * @memberof UIElements
 * @classdesc
 * Defines a column with a checkbox to be rendered in a mhDatagrid directive.
 * 
 * @property {string}   content  	- this is null, since this column's content is a checkbox.
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