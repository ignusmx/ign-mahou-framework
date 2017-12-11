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

MHValidationHelper.validateClasses = function(mhUIElement, requiredClasses)
{
	var validClass = false;
	var classesString = '';
	for(var i = 0; i < requiredClasses.length; i++)
	{
		var requiredClass = requiredClasses[i];
		if(mhUIElement instanceof requiredClass)
	    {
	    	validClass = true;
	    }

		classesString +='"'+requiredClass.prototype.constructor.name+'"';

		if(i>0 && i < requiredClasses.length-1)
		{
			classesString+" or ";
		}
	}

	if(!validClass)
	{
		throw new Error('Element "'
			+mhUIElement.name
			+'" must be of type '
			+classesString
			+' or one of its childrens');
	}
}

MHValidationHelper.safeClassAttribute = function(config, attributeName, type, required, defaultValue)
{
	var attribute = config[attributeName];

	if(attribute == null)
	{
		if(required)
		{
			throw new Error( 'property "'+ attributeName +'" cannot be null');
		}
		else
		{
			return defaultValue;
		}
	}

    var foundValidAttribute = false;
    var invalidAttributeErrorMessage = 'property "'+ attributeName +'" must be of type ';
    var baseTypeErrorMessage = '"type" parameter must be a class or an array of classes.';

    function isValidAttribute(attribute, type)
    {

    	if(typeof(attribute) == "object")
		{
			return attribute instanceof type;
		}
		else
		{
			return typeof(attribute) == type.prototype.constructor.name.toLowerCase();
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
    			invalidAttributeErrorMessage += " or ";
    		}

    		invalidAttributeErrorMessage += type[i].prototype.constructor.name;
    		foundValidAttribute = isValidAttribute(attribute, type[i]);

    		if(foundValidAttribute)
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

    	foundValidAttribute = isValidAttribute(attribute, type);
    	invalidAttributeErrorMessage += type.prototype.constructor.name;
    }

	if(!foundValidAttribute)
	{
		throw new TypeError( invalidAttributeErrorMessage );
	}

    return attribute;
}



MHValidationHelper.safeClassArrayAttribute = function(config, attributeName, type, required, defaultValue)
{
	var arrayAttribute = config[attributeName];

	if(arrayAttribute == null)
	{
		return null;
	}

	for(var i = 0; i < arrayAttribute.length; i++)
	{
		try
		{
			MHValidationHelper.safeClassAttribute(arrayAttribute, i, type);
		}
		catch(e)
		{
			throw new TypeError( 'property "'+ attributeName +'['+i+']" must be of type '+ type.prototype.constructor.name );
		}
	}

	return arrayAttribute;
}