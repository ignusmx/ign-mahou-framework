/**
 * A function in MyNamespace (MyNamespace.myFunction).
 * @class mhDatagrid
 * @memberof Directives
 */
angular.module('mahou').directive('mhDatagrid', function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            mhEnableRowSelect : "=",
            mhEnableRowButtons : "=",
            mhTemplateUrl : "=",
            mhCols : "=",
            mhRowButtons : "=",
            mhCollection : "=",
            mhSelectAllChange : "&",
            mhSelectRowChange : "&",
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
        controller: 'MHDatagridCtrl',
        controllerAs : 'controller'
    };
});