 /**
 * @class mhPaginatorThemeBs
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhPaginator mhPaginator} directive. Used to define a bootstrap paginator theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhPaginator mhPaginator}
 * ### ** HTML declaration **
    <mh-paginator mh-paginator-theme-bs
        {navbar-attributes}>
    </mh-paginator>
 */
angular.module('ign.Mahou').directive('mhPaginatorThemeBs', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhPaginator', 'mhPaginatorThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =   '<nav aria-label="Page navigation">\
                                          <ul class="pagination">\
                                            <li class="mh-prev-button-container">\
                                              <a href="#" onclick="return false;" aria-label="Previous" class="mh-prev-button">\
                                                <span aria-hidden="true">&laquo;</span>\
                                              </a>\
                                            </li>\
                                            <li class="mh-page-button-container">\
                                                <a class="mh-page-button" href="#" onclick="return false;">\
                                                    <span class="mh-title"></span>\
                                                </a>\
                                            </li>\
                                            <li class="mh-next-button-container">\
                                              <a href="#" onclick="return false;" aria-label="Next" class="mh-next-button">\
                                                <span aria-hidden="true">&raquo;</span>\
                                              </a>\
                                            </li>\
                                          </ul>\
                                        </nav>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var paginatorCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            paginatorCtrl.scope.mhClassActive = "active";
            paginatorCtrl.scope.mhClassDisabled = "disabled";

            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate));
            paginatorCtrl.compileTemplate(templateElem, el);
        },
        controller : function($scope, $element, $attrs)
        {   
            this.renderTheme = function(template)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);
                return renderedTemplate.html();
            }
        }
    };
})