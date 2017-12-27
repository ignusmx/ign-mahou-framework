/**
 * @class MHValidationHelper
 * @memberof Helpers
 * @classdesc
 * Helper used for data validation
 *
 */
function MHValidationHelper()
{
}

/** @memberof Helpers.MHValidationHelper
 * @param mhUIElement {MHAbstractUIElement} a Mahou UI Element
 * @param htmlElement {Object} a jQuery html element
 * @description validates that htmlElement is of a valid tag required by the mhUIElement
 */
MHValidationHelper.validateRequiredTags = function(mhUIElement, htmlElement)
{
	var conditionMet = false;
	var elementTag = htmlElement.prop("tagName").toLowerCase();

	if(mhUIElement.requiredTags == null)
	{
		conditionMet = true;
	}
	else if(typeof(mhUIElement.requiredTags) == "string")
	{
		conditionMet =  elementTag == mhUIElement.requiredTags.trim();
	}
	else if(typeof(mhUIElement.requiredTags) == "array")
	{
		for(var i = 0; i < mhUIElement.requiredTags.length; i++)
		{
			if(mhUIElement.requiredTags[i] == mhUIElement.requiredTags.trim())
			{
				conditionMet = true;
				break;
			}
		}
	} 

	if(!conditionMet)
	{
		throw new Error('required "'
                        +mhUIElement.requiredTags
                        +'" tags not met on htmlElement for ' 
                        + mhUIElement.constructor.name
                        +' with name "'+mhUIElement.name+'"');
	}
}

/** @memberof Helpers.MHValidationHelper
 * @param config 		{Object} 		the config object of the mhUIElement which contians the attribute to be validated 
 * @param attributeName {string} 		the name of the attribute to be validated
 * @param acceptedTypes {class|class[]} class or array of classes accepted by this parameter (must be native javascript classes)
 * @param acceptedTypes {class|class[]} class or array of classes not accepted by this parameter (must be native javascript classes)
 * @param required 		{boolean} 		sets this parameter as required
 * @param defaultValue  {Object} 		the default value if the parameter is required
 * @description validates attribute of an htmlElement
 */
MHValidationHelper.safeClassAttribute = function(config, attributeName, acceptedTypes, rejectedTypes, required, defaultValue)
{
	var attribute = config[attributeName];

	if(attribute == null)
	{
		if(required)
		{
			throw new Error( '"'+ attributeName +'" cannot be null');
		}
		else
		{
			if(defaultValue != null)
			{
				MHValidationHelper.validateType(defaultValue, attributeName, acceptedTypes, rejectedTypes);
			}
			
			attribute = defaultValue;
		}
	}
	else
	{
		MHValidationHelper.validateType(attribute, attributeName, acceptedTypes, rejectedTypes);
	}

    return attribute;
}

/** @memberof Helpers.MHValidationHelper
 * @param property 		{Object} 		the property to be validated
 * @param propertyName  {string} 		the name of the property to be displayed on the error stack trace
 * @param acceptedTypes {class|class[]} class or array of classes accepted by this property (must be native javascript classes)
 * @param acceptedTypes {class|class[]} class or array of classes not accepted by this property (must be native javascript classes)
 * @description validates if a property (object) is of a valid type and not of a rejected type.
 */
MHValidationHelper.validateType = function(property, propertyName, acceptedTypes, rejectedTypes)
{	
    function isOfType(property, type)
    {	
    	if(typeof(property) == "object")
		{
			return property instanceof type;
		}
		else
		{
			return typeof(property) == type.prototype.constructor.name.toLowerCase();
		}
    }

    function validateAcceptedTypes()
    {
    	var foundValidProperty = false;
    	var invalidPropertyErrorMessage = '"'+propertyName +'" must be of type ';
    	var baseTypeErrorMessage = '"acceptedTypes" parameter must be a class or an array of classes.';
    	//allow multiple type validation
	    if(acceptedTypes instanceof Array)
	    {
	    	if(acceptedTypes.length == 0)
	    	{
	    		throw TypeError(baseTypeErrorMessage + ' Types array is empty.');
	    	}

	    	for(var i = 0; i < acceptedTypes.length; i++)
	    	{
	    		if(typeof(acceptedTypes[i]) == "object")
		    	{
		    		throw TypeError(baseTypeErrorMessage+' An object was found in the array.');
		    	}

	    		if(i > 0)
	    		{
	    			invalidPropertyErrorMessage += " or ";
	    		}

	    		invalidPropertyErrorMessage += acceptedTypes[i].prototype.constructor.name;
	    		foundValidProperty = isOfType(property, acceptedTypes[i]);

	    		if(foundValidProperty)
				{
					break;
				}
	    	}
	    }
	    else
	    {
	    	if(typeof(acceptedTypes) == "object")
	    	{
	    		throw TypeError(baseTypeErrorMessage+' Object given.');
	    	}

	    	foundValidProperty = isOfType(property, acceptedTypes);
	    	invalidPropertyErrorMessage += acceptedTypes.prototype.constructor.name;
	    }

		if(!foundValidProperty)
		{
			throw new TypeError( invalidPropertyErrorMessage );
		}
    }

    function validateRejectedTypes()
    {
    	var foundInvalidProperty = false;
    	var invalidPropertyErrorMessage = '"'+propertyName +'" cannot be of type ';
    	var baseTypeErrorMessage = '"rejectedTypes" parameter must be a class or an array of classes.';
    	//allow multiple type validation
	    if(rejectedTypes instanceof Array)
	    {
	    	for(var i = 0; i < rejectedTypes.length; i++)
	    	{
	    		if(typeof(rejectedTypes[i]) == "object")
		    	{
		    		throw TypeError(baseTypeErrorMessage+' An object was found in the array.');
		    	}

	    		if(i > 0)
	    		{
	    			invalidPropertyErrorMessage += " or ";
	    		}

	    		invalidPropertyErrorMessage += rejectedTypes[i].prototype.constructor.name;
	    		foundInvalidProperty = isOfType(property, rejectedTypes[i]);

	    		if(foundInvalidProperty)
				{
					break;
				}
	    	}
	    }
	    else
	    {
	    	if(typeof(rejectedTypes) == "object")
	    	{
	    		throw TypeError(baseTypeErrorMessage+' Object given.');
	    	}

	    	foundInvalidProperty = isOfType(property, rejectedTypes);
	    	invalidPropertyErrorMessage += rejectedTypes.prototype.constructor.name;
	    }

		if(foundInvalidProperty)
		{
			throw new TypeError( invalidPropertyErrorMessage );
		}
    }

    //rejectedTypes are optional, so we test them only if we receive them
    if(rejectedTypes != null)
    {
    	validateRejectedTypes();	
    }
    
    validateAcceptedTypes();
}

/** @memberof Helpers.MHValidationHelper
 * @param propertiesArray 		{object[]} array of properties to be validated 
 * @param arrayName  {string} 		the name of the array to be displayed on the error stack trace
 * @param acceptedTypes {class|class[]} class or array of classes accepted by this property (must be native javascript classes)
 * @param acceptedTypes {class|class[]} class or array of classes not accepted by this property (must be native javascript classes)
 * @description validates if properties in an array (objects) is of a valid type and not of a rejected type.
 */
MHValidationHelper.validateTypes = function(propertiesArray, arrayName, acceptedTypes, rejectedTypes)
{
	for(var i=0; i < propertiesArray.length; i++)
	{
		MHValidationHelper.validateType(propertiesArray[i], arrayName +"["+i+"]", acceptedTypes, rejectedTypes);
	}
}