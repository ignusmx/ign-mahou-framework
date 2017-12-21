/**
 * A function in MyNamespace (MyNamespace.myFunction).
 * @class mhDatagrid
 * @memberof Directives
 */
angular.module('mahou').directive('mhBsPanel', function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope:{ 
            mhHeaderTitle : "=",
            mhFooterTitle : "=",
        },
        transclude:true,
        template :  '<div class="panel panel-default">\
                        <div class="panel-heading" ng-if="mhHeaderTitle != null">\
                            <h3 class="panel-title">\
                                {{mhHeaderTitle}}\
                            </h3>\
                        </div>\
                        <div class="panel-body">\
                            <div ng-transclude></div>\
                        </div>\
                        <div class="panel-footer" \
                                ng-if="mhFooterTitle != null">\
                                {{mhFooterTitle}}\
                        </div>\
                    </div>'
    };
});