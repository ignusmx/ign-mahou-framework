/**
 * @class mhNavbar
 * @memberof Directives
 * @classdesc
 * use this directive to create a fully functional AngularJS form.<br>
 * Includes fields validation, events callbacks and UI customization using themes.
 *
 * **directive types:** Element only
 * @property {number}  mh-navbar-buttons    - An array of {@link Models.MHNavbarButton MHNavbarButton} objects.
 * @description 
 * #### ** Controller: ** {@link Controllers.MHFormCtrl MHNavbarCtrl}
 * ### ** HTML declaration **
    <mh-navbar {mh-navbar-theme-directive} 
        mh-form-buttons="{arrayOfNavbarButton}">
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
 * ### **Directive instantiation flow**
 * There are two steps on the instantiation of this directive:
 * * **Compilation**
 * * **Event binding**
 *
 * #### **Compilation**
 * This is the process where all properties passed through attributes are mapped into the defined html template and a finall UI is rendered.
 * The compilation process performs the following tasks:
 * * Directive iterates through all mhFormFields and will search for an html element on the template with class 'mh-input-container' and data-mh-name == mhFormField.name
 * * If a container element is found for the current field, it will search for inner element with class 'mh-input' to render the field and assign to the 'mh-input' element the ng-model specified in mhFormField.model
 * * note that mhFormField.model should be a string defining an existing property of the ngModel used by the mhForm. 
 * * It will also search for an element with class 'mh-title' to render the mhFormField.title (usually a label element).
 * * If the 'mh-input' element is of type 'input' it will try to assign its attribute 'type' to the mhFormField.type value.
 * * If the 'mh-input' element is not of type 'input' and the mhFormField.type is of type SELECT, it will try to find an inner element with class 'mh-select-option' and will apply ng-repeat for each option in mhFormField.options.
 * * Aditionally, for SELECT type, if mhFormField.defaultOption is present, it will search for an inner element with class 'mh-select-default-option' and try to set its value to mhFormField.defaultOption (useful if you want to show a default empty option if no option has been selected).
 * * It will also try to find an element with class 'mh-form-error-message' inside the container element to render on it the mhFormField.invalidMessage.
 * * Directive iterates through all mhFormButtons and will search for an html element on the template with tag 'button' and class 'mh-form-button' and data-mh-name == mhFormButton.name.
 * * If a button is found, it will search for a span inside with class 'mh-title', if it's found, it will render inside of it the mhFormButton.title value.
 * * If mhFormButton.disabledStatuses are present, it will add ng-disabled rule with all disabledStatuses conditions.
 *
 * #### **Events binding**
 * This is the process where all events are binded: fields, validations and buttons events.
 * The Event binding process performs the following tasks:
 * * Bind the mhFormButton.action function to be executed when user performs ngClick on each button.
 * * add functions to validate mhFormStatuses, required fields validations and all mhForm functionallity.
 */

angular.module('mahou').directive('mhNavbar', function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        { 
            mhNavbarButtons : '='
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