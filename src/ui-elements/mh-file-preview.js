/**
 * @class MHFilePreview
 * @memberof UIElements
 * @classdesc
 * Renders a preview from a Blob file. Wrap of ngf-thumbnail directive.
 * @property {Object[] | String[]}			file				- Blob File or string with image path to be previewed as thumbnail
 * @property {string} 	 				 	thumbnailSize		- Object defining size of thumbnail. e.g. "{width: 100, height: 100, quality: 0.9, centerCrop:true}"
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFilePreview(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.file = MHValidationHelper.safeClassAttribute(config, "file", [Object, String]);
	this.thumbnailSize = MHValidationHelper.safeClassAttribute(config, "thumbnailSize", Object, null, false, {width: 100, height: 100, quality: 0.9, centerCrop:true});
}

MHFilePreview.prototype = Object.create(MHAbstractUIElement.prototype);
MHFilePreview.prototype.constructor = MHFilePreview;