/**
 * @class mhBsPanel
 * @memberof Directives
 * @classdesc
 * use this directive to render a bootstrap panel with some content inside.
 *
 * **directive types:** Element only
 *
 * @description 
 * ### ** HTML declaration **
    <mh-bs-panel
        mh-header-title="{headerTitleString}"
        mh-footer-title="{footerTitleString}">
        <!-- custom content can be placed here -->
    </mh-bs-panel>
 * @property {string}                   mhHeaderTitle             - Title to be displayed on the panel's header.
 * @property {string}                   mhFooterTitle             - Title to be displayed on the panel's footer.
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