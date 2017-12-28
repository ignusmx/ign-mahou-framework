/**
 * @class mhForm
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional AngularJS form.<br>
 * Includes fields validation, events callbacks and UI customization using themes.
 *
 * **directive types:** Element only
 * @property {object}  ng-model           - The ngModel to be used with the form.
 * @property {string}  mh-form-name       - The name (HTML 'name' attribute) of the form.
 * @property {MHAbstractUIElement[]}   mh-form-layout - An array of {@link UIElements.MHAbstractUIElement MHAbstractUIElement} objects.
 * @property {string}   mh-class-invalid - A string of classes to be used when form is invalid
  * @property {string}  mh-on-form-init - A function to be executed when form is initialized. Used to expose the form API as parameter
 * @description 
 * #### ** Controller: ** {@link Controllers.MHFormCtrl MHFormCtrl}
 * ### ** HTML declaration **
    <mh-form {mh-form-theme-directive} 
        ng-model="{modelToBeUsed}" 
        mh-form-name="{formName}" 
        mh-form-layout="{arrayOfUIElements}" 
        mh-class-invalid="{nameOfCSSClass}"
        mh-on-form-init="{classToExposeFormAPI}" >
        <!-- custom UI can be declared here using mhFormThemeCustom -->
    </mh-form>
 * ### **Theme customization**
 * mhForm UI can be customized any way you want it using Mahou's mh-form-theme attribute directives.
 *
 * ** *A theme directive is required. If no theme is found, an error will be thrown when compiling mhForm directive. **
 *
 * #### **Available mhForm themes**
 * - **{@link Themes.mhFormThemeCustom mh-form-theme-custom}** (directive for custom UI html)
 * - ** {@link Themes.mhFormThemeBs mh-form-theme-bs}** (directive with bootstrap horizontal form UI)
 */
angular.module('mahou').directive('mhForm', function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            model : '=ngModel',
            mhFormName : "=",
            mhFormLayout : '=',
            mhClassInvalid : '=?',
            mhOnFormInit : '=?'
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

/** 
* Defines the status of an MHForm
* @enum {string}
* @memberof Enumerators
*/
var MHFormStatus = 
{
    /** value: "formValid" (form is valid) */
    FORM_VALID : "formValid",
    /** value: "formInvalid" (form is invalid)  */
    FORM_INVALID : "formInvalid", 
    /** value: "modelChanged" (model has changed)  */
    MODEL_CHANGED : "modelChanged",
    /** value: "modelUnchanged" (model has not changed) */
    MODEL_UNCHANGED : "modelUnchanged"
}