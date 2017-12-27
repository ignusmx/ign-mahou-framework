angular.module('mahou').directive('mhNavbarThemeCustom', function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhNavbar'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            console.log(this.mhRawInnerTemplate);
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var ctrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);                
                ctrl.compileTemplate(templateElem, el);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    ctrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
})