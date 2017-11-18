angular.module('mahou').directive('mhForm', function ( $templateRequest ) {

    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhConfigs : '=',
            mhTemplateUrl : '='
        },
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            return "";
        },
        link : function(scope, el, attrs, ctrl)
        {
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                ctrl.compileTemplate(scope, templateElem, el);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    ctrl.compileTemplate(scope, templateElem, el);                   
                });
            }
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})