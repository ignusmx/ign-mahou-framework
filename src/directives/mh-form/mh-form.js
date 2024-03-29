 /**
 * @class mhForm
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional AngularJS form.<br>
 * Includes fields validation, events callbacks and UI customization using themes.
 * This directive uses ng-form internally therefore you can use multiple mhForm in a single view.
 * Wrap multiples mhForms inside a regular <form> tag to connect multiple forms.
 * This allows you to split a complex form into small mhForms with custom html in between.
 * Since the parent from is shared among mhForm, form buttons can be disabled or enabled depending of parent form state.
 * **directive types:** Element only
 *
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
 *
 * @property {object}                   ngModel             - The ngModel to be used with the form.
 * @property {string}                   mhFormName          - The name (HTML 'name' attribute) of the form.
 * @property {MHAbstractUIElement[]}    mhFormLayout        - An array of {@link UIElements.MHAbstractUIElement MHAbstractUIElement} objects used to display, edit and update the ngModel.
 * @property {string}                   mhClassInvalid      - A string of classes to be added to fields when form is invalid.
 * @property {Function}                 mhOnFormInit        - A function to be executed when form is initialized. Used to expose the form API as parameter
 */
angular.module('ign.Mahou').directive('mhForm', function ( $templateRequest ) {
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
        require : ["?^form"],
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

            return  function(scope, el, attrs, ctrls)
            {
                scope.parentForm = ctrls[0];
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
    /** value: "parentFormValid" (parentForm is valid) */
    PARENT_FORM_VALID : "parentFormValid",
    /** value: "parentFormInvalid" (parentForm is invalid)  */
    PARENT_FORM_INVALID : "parentFormInvalid",
    /** value: "modelChanged" (model has changed)  */
    MODEL_CHANGED : "modelChanged",
    /** value: "modelUnchanged" (model has not changed) */
    MODEL_UNCHANGED : "modelUnchanged"
}