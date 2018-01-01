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
        mh-enable-row-select="{boolean}"
        mh-cols="{DatagridColsArray}"
        mh-collection="{dataArray}"
        mh-select-all-change="{selectAllChangeCallback(selectedRows)}"
        mh-select-row-change="{selectRowChangeCallback(row)}">
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
 * @property {boolean}                mhEnableRowSelect        - shows checkboxs and enable row selection. 
 * @property {MHDatagridCol[]}        mhCols                   - An array of {@link UIElements.MHDatagridCol MHDatagridCol} to be used for display content
 * @property {Object[]}               mhCollection             - an array of objects to be displayed on the datagrid
 * @property {Function}               mhSelectAllChange        - callback action to be executed when "select all" checkbox is selected
 * @property {Function}               mhSelectRowChange        - callback action to be executed when single row checkbox is selected
 */
angular.module('mahou').directive('mhDatagrid', function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            mhEnableRowSelect : "=",
            mhCols : "=",
            mhCollection : "=",
            mhSelectAllChange : "&",
            mhSelectRowChange : "&"
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