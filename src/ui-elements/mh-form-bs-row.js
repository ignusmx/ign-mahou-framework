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
	config = config || {};
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	this.elements = this.elements || [];

	//validate array DataTypes
	if(this.elements != null)
	{
		MHValidationHelper.validateTypes(this.elements, "elements", MHFormBSCol);
	}

	/** @function append
     * @memberof UIElements.MHFormBSRow
     * @instance
     * @param column {MHFormBSCol} a {@link UIElement.MHFormBSCol MHFormBSCol} to be appended to the elements list.
     * @returns {void} reference to itself for method chaining
     * @description appends a {@link UIElement.MHFormBSCol MHFormBSCol} to the elements list of the row.
     */
	this.append = function(column)
	{
		MHValidationHelper.validateType(column, "column", MHFormBSCol);
		this.elements.push(column);
		return this;
	};
}

MHFormBSRow.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSRow.prototype.constructor = MHFormBSRow;