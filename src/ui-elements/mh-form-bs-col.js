/**
 * @class MHFormBSCol
 * @memberof UIElements
 * @classdesc
 * A bootstrap column rendered inside a {@link Directives.mhForm mhForm} Directive with {@link Themes.mhFormThemeBs mhFormThemeBs} theme.
 * 
 * @property {MHAbstractUIElement[]|!MHFormBSCol[]}   	elements	- Array of {@link UIElement.MHAbstractUIElement MHAbstractUIElement} (except {@link UIElement.MHFormBSCol MHFormBSCol}) to be rendered inside this column. add a {@link UIElement.MHFormBSRow MHFormBSRow} inside to create a new grid system inside the column.
 * @property {number}   								colWidth	- length of the column measured in bs cols (max 12).
 * @property {number} 									minHeight 	- minimum col height in pixels.
 * @property {string} 									vAlign 		- if flex is enabled, elements inside this col will be vertically aligned to a valid alignment {@link Enumerators.MHVerticalAlign MHVerticalAlign}.
 * @property {string} 									hAlign 		- if flex is enabled, elements inside this col will be horizontally aligned to a valid alignment: {@link Enumerators.MHHorizontalAlign MHHorizontalAlign}.
 * @property {number} 									offset 		- use this property to offset this column as many cols as you want.
 * @property {boolean} 									flex 		- if enabled, elements inside col will be rendered inside a flexbox and aligned acording vAling and hAlign properties.
 * @property {boolean} 									fill		- if enabled and flex is also enabled, elements will be streched to fill with the same proportion the 100% of the column's width.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFormBSCol(config)
{
	config = config || {};
	MHAbstractUIElement.call(this, config);

	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array);
	this.elements = this.elements || [];
	
	//validate array DataTypes
	if(this.elements != null)
	{
		MHValidationHelper.validateTypes(this.elements, "elements", MHAbstractUIElement, MHFormBSCol);
	}

	this.colWidth = MHValidationHelper.safeClassAttribute(config, "colWidth", Number, null, false, 12);
	this.minHeight = MHValidationHelper.safeClassAttribute(config, "minHeight", Number, null, false);
	this.vAlign = MHValidationHelper.safeClassAttribute(config, "vAlign", String, null, false, "top");
	this.hAlign = MHValidationHelper.safeClassAttribute(config, "hAlign", String, null, false, "left");
	this.offset = MHValidationHelper.safeClassAttribute(config, "offset", Number, null, false, 0);
	this.flex = MHValidationHelper.safeClassAttribute(config, "flex", Boolean, null, false);
	this.fill = MHValidationHelper.safeClassAttribute(config, "fill", Boolean, null, false);

	/** @function append
     * @memberof UIElements.MHFormBSCol
     * @instance
     * @param element {MHAbstractUIElement|!MHFormBSCol} a {@link UIElement.MHAbstractUIElement MHAbstractUIElement} except {@link UIElement.MHFormBSCol MHFormBSCol} to be appended to the elements list.
     * @returns {void} reference to itself for method chaining
     * @description appends a {@link UIElement.MHAbstractUIElement MHAbstractUIElement} except {@link UIElement.MHFormBSCol MHFormBSCol} to the elements list of the col.
     */
	this.append = function(element)
	{
		MHValidationHelper.validateType(element, "element", MHAbstractUIElement, MHFormBSCol);
		this.elements.push(element);
		return this;
	};
}

MHFormBSCol.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSCol.prototype.constructor = MHFormBSCol;

/** 
* Defines the vertical alignment of elements inside an {@link UIElements.MHFormBSCol MHFormBSCol}
* @enum {string}
* @memberof Enumerators
*/
var MHVerticalAlign = 
{
	/** value: "top" */
	TOP : "top",
	/** value: "middle"  */
	MIDDLE : "middle", 
	/** value: "bottom"  */
	BOTTOM : "bottom"
}

/** 
* Defines the horizontal alignment of elements inside an {@link UIElements.MHFormBSCol MHFormBSCol}
* @enum {string}
* @memberof Enumerators
*/
var MHHorizontalAlign = 
{
	/** value: "left" */
	LEFT : "left",
	/** value: "center"  */
	CENTER : "center", 
	/** value: "right"  */
	RIGHT : "right"
}