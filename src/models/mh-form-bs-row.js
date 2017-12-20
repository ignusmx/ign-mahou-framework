function MHFormBSRow(config)
{
	MHAbstractUIElement.call(this, config);

	console.log("rowElems:",config.elements);
	//validate main DataType
	this.elements = MHValidationHelper.safeClassAttribute(config, "elements", Array, null, false, []);
	//validate array DataTypes
	MHValidationHelper.validateTypes(this.elements, "elements", MHFormBSCol);
}

MHFormBSRow.prototype = Object.create(MHAbstractUIElement.prototype);
MHFormBSRow.prototype.constructor = MHFormBSRow;