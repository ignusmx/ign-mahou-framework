angular.module('mahou').directive('mhPaginatorThemeCustom', function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhPaginator'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            console.log(this.mhRawInnerTemplate);
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var formCtrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                formCtrl.compileTemplate(templateElem, el, scope.mhFormLayout);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    formCtrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
})