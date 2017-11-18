angular.module('mahou').directive('mhForm', function ( $compile, $templateRequest ) {

    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhConfigs : '=',
            mhTemplateUrl : '='
        },
        template : function(el){
            this.mhRawInnerTemplate = el.html();
            return "";
        },
       
        link: function(scope, el, attrs)
        {
            function compileTemplate(templateElem)
            {
                templateElem.find("md-checkbox").attr("ng-change", "change()");
                templateElem.find("md-checkbox").html("{{test}}");
                return templateElem;
            }

            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                var compiledTemplateElem = compileTemplate(templateElem);
                el.replaceWith($compile(compiledTemplateElem)(scope));
            }
            else
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
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})