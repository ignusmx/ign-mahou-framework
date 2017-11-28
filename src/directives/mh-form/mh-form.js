/**
 * @class mhForm
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional AngularJS form.<br>
 * Includes fields validation, events callbacks and UI customization using themes.
 *
 * **directive types:** Element only
 * @property {object}  scope                - Isolated scope.
 * @property {object}  scope.model          - The ngModel to be used with the form.
 * @property {string}  scope.mhFormName     - The name (HTML 'name' attribute) of the form.
 * @property {array}   scope.mhFormFields   - An array of mhFormFields.
 * @property {number}  scope.mhFormButtons  - How much gold the party starts with.
 * @property {object}  controller - an {@link Controllers.MHFormCtrl MHFormCtrl} used to compile directive.
 * @description 
 * ### ** HTML declaration **
    <mh-form {mh-form-theme-directive} 
        ng-model="{modelToBeUsed}" 
        mh-form-name="'{formName}'" 
        mh-form-fields="{arrayOfFormFields}" 
        mh-form-buttons="{arrayOfFormButton}">
        <!-- custom UI can be declared here using mhFormThemeCustom -->
    </mh-form>
 * ### **Theme customization**
 * mhForm UI can be customized any way you want it using Mahou's mh-form-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling mhForm directive. **
 *
 * #### **Available mhForm themes**
 * - **{@link Themes.mhFormThemeCustom mh-form-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhFormThemeBsHorizontal mh-form-theme-bs-horizontal}** (directive with bootstrap horizontal form UI)
 */

angular.module('mahou').directive('mhForm', function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhFormName : "=",
            mhFormFields : '=',
            mhFormButtons : '='
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhFormTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhForm: no mhFormTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})