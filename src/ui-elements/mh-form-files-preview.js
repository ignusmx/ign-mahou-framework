/**
 * @class MHFormFilesPreview
 * @memberof UIElements
 * @classdesc
 * Renders a Select field on an MHForm.
 * 
 * @property {string[]|number[]|Object[]} 	defaultThumbnail	- Default image to be placed if no thumbnail is available.
 * @property {string}				 	 	previewType			- One of {@link Enumerators.MHFormFilesPreviewType MHFormFilesPreviewType} types. Defines how to preview files.
 * @property {string} 	 				 	thumbnailSize		- Object defining size of thumbnail.
 * @property {string} 	 				 	direction			- One of {@link Enumerators.MHFormFilesPreviewDirection MHFormFilesPreviewDirection} types. Defines direction to place previews.
 * @augments UIElements.MHAbstractFormField
 *
 */
function MHFormFilesPreview(config)
{
	//inherit from MHAbstractFormField
	MHAbstractFormField.call(this, config);
	this.defaultThumbnail = MHValidationHelper.safeClassAttribute(config, "defaultThumbnail", String);
	this.previewType = MHValidationHelper.safeClassAttribute(config, "previewType", String);
	this.thumbnailSize = MHValidationHelper.safeClassAttribute(config, "thumbnailSize", Object, null, false, {width: 100, height: 100, quality: 0.9, centerCrop:true});
	this.direction = MHValidationHelper.safeClassAttribute(config, "direction", String);
}

MHFormFilesPreview.prototype = Object.create(MHAbstractFormField.prototype);
MHFormFilesPreview.prototype.constructor = MHFormFilesPreview;

/** 
* Defines the type of preview of {@link UIElements.MHFormFilesPreview MHFormFilesPreview}
* @enum {string}
* @memberof Enumerators
*/
var MHFormFilesPreviewType = 
{
	/** value: "thumbnail" (show only an image thumbnail. if no image available, defaultThumb property will be used) */
	THUMBNAIL : "thumbnail",
	/** value: "filename" (show only file name.)  */
	TITLE : "title", 
	/** value: "detailed" (show filename and thumbnail)  */
	DETAILED : "detailed",
}

/** 
* Defines the type of preview of {@link UIElements.MHFormFilesPreview MHFormFilesPreview}
* @enum {string}
* @memberof Enumerators
*/
var MHFormFilesPreviewDirection = 
{
	/** value: "horizontal" (align items horizontally) */
	HORIZONTAL : "horizontal",
	/** value: "filename" (align items vertically)  */
	VERTICAL : "vertical", 
}