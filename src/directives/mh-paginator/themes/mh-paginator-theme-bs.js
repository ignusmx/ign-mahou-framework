angular.module('mahou').directive('mhPaginatorThemeBs', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhPaginator', 'mhPaginatorThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =   '<nav aria-label="Page navigation">\
                                          <ul class="pagination">\
                                            <li class="mh-prev-button-container">\
                                              <a href="#" aria-label="Previous" class="mh-prev-button">\
                                                <span aria-hidden="true">&laquo;</span>\
                                              </a>\
                                            </li>\
                                            <li class="mh-page-button-container">\
                                                <a class="mh-page-button" href="#">\
                                                    <span class="mh-title"></span>\
                                                </a>\
                                            </li>\
                                            <li class="mh-next-button-container">\
                                              <a href="#" aria-label="Next" class="mh-next-button">\
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