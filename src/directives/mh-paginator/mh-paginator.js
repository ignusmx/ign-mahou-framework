/**
 * @class mhPaginator
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional paginator.
 * **directive types:** Element only
 *
 * @description 
 * #### ** Controller: ** {@link Controllers.MHPaginatorCtrl MHPaginatorCtrl}
 * ### ** HTML declaration **
    <mh-paginator {mh-paginator-theme-directive} 
        mh-page-group-size="{sizeOfPageGoup}"
        mh-page-current-size="{theCurrentPageNumber}
        mh-last-page="{theLastPageNumber}"
        mh-on-page-selected="{callbackFunction(page)}">
    </mh-paginator>
 * ### **Theme customization**
 * mhPaginator UI can be customized any way you want it using Mahou's mh-navbar-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling mhPaginator directive. **
 *
 * #### **Available mhPaginator themes**
 * - **{@link Themes.mhPaginatorThemeCustom mh-paginator-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhPaginatorThemeBs mh-paginator-theme-bs}** (directive with bootstrap paginator UI)
 *
 * @property {number}           mhPageGroupSize          - The number of pages per group.
 * @property {number}           mhCurrentPage            - Current active page.
 * @property {number}           mhLastPage               - Last available page.
 * @property {number}           mhClassActive            - Class to be used for active elements.
 * @property {number}           mhClassDisabled          - Class to be used for disabled elements.
 * @property {Function}         mhOnPageSelected         - Function to be called when a page is selected.
 */
angular.module('mahou').directive('mhPaginator', function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        {
            mhPageGroupSize : '=',
            mhCurrentPage : '=',
            mhLastPage : '=',
            mhClassActive : '=?',
            mhClassDisabled : '=?',
            mhOnPageSelected : '&'
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhPaginatorTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhPaginator: no mhPaginatorTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHPaginatorCtrl',
        controllerAs : 'controller'
    };
});