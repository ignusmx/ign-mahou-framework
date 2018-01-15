/**
 * @class MHFilePreview
 * @memberof UIElements
 * @classdesc
 * Renders a preview from a Blob file.
 * 
 * @property {string[]|number[]|Object[]} 	defaultThumbnail	- Default image to be placed if no thumbnail is available.
 * @property {string} 	 				 	thumbnailSize		- Object defining size of thumbnail.
 * @augments UIElements.MHAbstractUIElement
 *
 */
function MHFilePreview(config)
{
	//inherit from MHAbstractUIElement
	MHAbstractUIElement.call(this, config);
	this.defaultThumbnail = MHValidationHelper.safeClassAttribute(config, "defaultThumbnail", String);
	this.file = MHValidationHelper.safeClassAttribute(config, "file", [Object, String]);
	this.previewType = MHValidationHelper.safeClassAttribute(config, "previewType", String);
	this.thumbnailSize = MHValidationHelper.safeClassAttribute(config, "thumbnailSize", Object, null, false, {width: 100, height: 100, quality: 0.9, centerCrop:true});
}

MHFilePreview.prototype = Object.create(MHAbstractUIElement.prototype);
MHFilePreview.prototype.constructor = MHFormFilesPreview;