/**
 * @class MHFormBSRow
 * @memberof UIElements
 * @classdesc
 * A bootstrap row rendered inside a {@link Directives.mhForm mhForm} Directive with {@link Themes.mhFormThemeBs mhFormThemeBs} theme.
 * 
 * @property {MHFormBSCol[]}   	elements    - Array of {@link UIElement.MHFormBSCol MHFormBSCol} to be rendered inside this row.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFormBSRow(config)
{
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.elements, "elements", MHFormBSCol);
}

MHFormBSRow.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSRow.prototype.constructor = MHFormBSRow;