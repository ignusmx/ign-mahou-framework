function MHBsDecorator()
{

}

MHBsDecorator.decorateIcon = function(string, cssClass, elementTag)
{

	return '<'+elementTag+' class="'+cssClass+'"></'+elementTag+'> '+string;
	return mhTitle;
}

MHBsDecorator.decorateImage = function(string)
{
	return '<img src="'+string+'"></img>';
}

MHBsDecorator.decorateResponsiveImage = function(string)
{
	return '<img class="img-responsive" src="'+string+'"></img>';
}

MHBsDecorator.decorateEval = function(string)
{
	return ("{{$eval('"+string.replace(/'/g, "\\'")+"')}}");
}