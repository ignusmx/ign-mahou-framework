function MHValidationHelper()
{
}

MHValidationHelper.validateRequiredTags = function(mhUIElement, htmlElement)
{
	console.log(mhUIElement, mhUIElement.requiredTags, htmlElement.prop("tagName"))
	var conditionMet = mhUIElement.requiredTags == null 
	||  (mhUIElement.requiredTags != null && mhUIElement.requiredTags.indexOf(htmlElement.prop("tagName").toLowerCase()) != -1);

	if(!conditionMet)
	{
		throw new Error('required "'
                        +mhUIElement.requiredTags
                        +'" tags not met on htmlElement for ' 
                        + mhUIElement.constructor.name
                        +' with name "'+mhUIElement.name+'"');
	}
}

MHValidationHelper.safeClassAttribute = function(config, attributeName, type, required, defaultValue)
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
				MHValidationHelper.validateType(defaultValue, attributeName, type);
			}
			
			attribute = defaultValue;
		}
	}

    return attribute;
}

MHValidationHelper.validateType = function(property, propertyName, type)
{	
    var foundValidProperty = false;
    var invalidPropertyErrorMessage = '"'+propertyName +'" must be of type ';
    var baseTypeErrorMessage = '"type" parameter must be a class or an array of classes.';

    function isValidProperty(property, type)
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

    //allow multiple type validation
    if(type instanceof Array)
    {
    	if(type.length == 0)
    	{
    		throw TypeError(baseTypeErrorMessage + ' Types array is empty.');
    	}

    	for(var i = 0; i < type.length; i++)
    	{
    		if(typeof(type[i]) == "object")
	    	{
	    		throw TypeError(baseTypeErrorMessage+' An object was found in the array.');
	    	}

    		if(i > 0)
    		{
    			invalidPropertyErrorMessage += " or ";
    		}

    		invalidPropertyErrorMessage += type[i].prototype.constructor.name;
    		foundValidProperty = isValidProperty(property, type[i]);

    		if(foundValidProperty)
			{
				break;
			}
    	}
    }
    else
    {
    	if(typeof(type) == "object")
    	{
    		throw TypeError(baseTypeErrorMessage+' Object given.');
    	}

    	foundValidProperty = isValidProperty(property, type);
    	invalidPropertyErrorMessage += type.prototype.constructor.name;
    }

	if(!foundValidProperty)
	{
		throw new TypeError( invalidPropertyErrorMessage );
	}
}

MHValidationHelper.validateTypes = function(propertiesArray, arrayName, types)
{
	for(var i=0; i < propertiesArray.length; i++)
	{
		MHValidationHelper.validateType(propertiesArray[i], arrayName +"["+i+"]", types);
	}
}