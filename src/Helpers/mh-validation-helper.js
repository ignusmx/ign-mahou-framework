function MHValidationHelper()
{
}

MHValidationHelper.validateRequiredTags = function(mhUIElement, htmlElement)
{
	console.log(mhUIElement, mhUIElement.requiredTags, htmlElement.prop("tagName"), htmlElement)
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

    return attribute;
}

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

MHValidationHelper.validateTypes = function(propertiesArray, arrayName, types)
{
	for(var i=0; i < propertiesArray.length; i++)
	{
		MHValidationHelper.validateType(propertiesArray[i], arrayName +"["+i+"]", types);
	}
}