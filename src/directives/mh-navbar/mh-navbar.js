/**
 * @class mhNavbar
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional navbar menu.
 * Supports MHButtons and MHDropdownButtons
 * **directive types:** Element only
 *
 * @description 
 * #### ** Controller: ** {@link Controllers.MHNavbarCtrl MHNavbarCtrl}
 * ### ** HTML declaration **
    <mh-navbar {mh-navbar-theme-directive} 
        mh-navbar-elements="{arrayOfUIElements}">
        <!-- custom UI can be declared here using mhNavbarThemeCustom -->
    </mh-navbar>
 * ### **Theme customization**
 * mhNavbar UI can be customized any way you want it using Mahou's mh-navbar-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling mhNavbar directive. **
 *
 * #### **Available mhNavbar themes**
 * - **{@link Themes.mhNavbarThemeCustom mh-navbar-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhNavbarThemeBs mh-navbar-theme-bs}** (directive with bootstrap navbar UI)
 *
 * @property {MHAbstractUIElement[]}  mhNavbarElements        - An array of {@link UIElements.MHButton MHButton} or {@link Models.MHDropdownButton MHDropdownButton} objects.
 * @property {string}                 mhNavbarTitle           - title of the navbar to be displayed
 * @property {function|string}        mhNavbarTitleAction    - a function to be called or a ui-router state to transition to if user clicks navbar title
 */
angular.module('mahou').directive('mhNavbar', function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            mhNavbarElements : '=',
            mhNavbarTitle : '=',
            mhNavbarTitleAction : '='
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhNavbarTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhNavbar: no mhNavbarTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHNavbarCtrl',
        controllerAs : 'controller'
    };
});