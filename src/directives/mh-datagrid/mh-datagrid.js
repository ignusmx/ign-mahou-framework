/**
 * @class mhDatagrid
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional datagrid to display collections.
 * Supports MHButtons
 * **directive types:** Element only
 *
 * @description 
 * #### ** Controller: ** {@link Controllers.MHDatagridCtrl MHDatagridCtrl}
 * ### ** HTML declaration **
    <mh-datagrid {mh-datagrid-theme-directive} 
        mh-cols="{DatagridColsArray}"
        mh-collection="{dataArray}"
        mh-rows-selected-change="{rowsSelectedChangeCallback(rows)}">
        <!-- custom UI can be declared here using mhDatagridThemeCustom -->
    </mh-datagrid>
 * ### **Theme customization**
 * mhDatagrid UI can be customized any way you want it using Mahou's mh-datagrid-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling directive. **
 *
 * #### **Available mhDatagrid themes**
 * - **{@link Themes.mhDatagridThemeCustom mh-datagrid-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhDatagridThemeBs mh-datagrid-theme-bs}** (directive with bootstrap table UI)
 *
 * @property {MHDatagridCol[]}        mhCols                   - An array of {@link UIElements.MHDatagridCol MHDatagridCol} to be used for display content
 * @property {Object[]}               mhCollection             - an array of objects to be displayed on the datagrid
 * @property {String}               mhRowClasses             - css classes to be added to rows
 * @property {Function}               mhRowsSelectedChange     - callback action to be executed when one or more row checkbox have been selected
 */
angular.module('ign.Mahou').directive('mhDatagrid', function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            mhCols : "=",
            mhCollection : "=",
            mhRowClasses : "=",
            mhRowsSelectedChange : "&"
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhDatagridTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhDatagrid: no mhDatagridTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHDatagridCtrl',
        controllerAs : 'controller'
    };
});