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

