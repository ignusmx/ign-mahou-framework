angular.module('mahou').directive('mhForm', function ( $compile, $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhConfigs : '=',
            mhTemplateUrl : '='
        },
        template : function(el){
            return el.html();
        },
       
        compile : function(el, attrs)
        {
            function compileTemplate(templateElem)
            {
                templateElem.find("md-checkbox").attr("ng-change", "change()");
                templateElem.find("md-checkbox").html("{{test}}");
                return templateElem;
            }

            compileTemplate(el);

            return {
                post: function(scope, el, attrs)
                {
                    if(attrs.mhTemplateUrl != null)
                    {
                        $templateRequest(attrs.mhTemplateUrl)
                        .then(function (response) 
                        { 
                            var templateRaw = response;
                            var templateElem = $(templateRaw);

                            var compiledTemplateElem = compileTemplate(templateElem);
                            el.replaceWith($compile(compiledTemplateElem)(scope));                   
                        });
                    } 
                }
            }
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})