/**
 * @class mhForm
 * @memberof Directives
 * @description
 * use this directive to create a fully functional AngularJS form.<br>
 * Includes fields validation, events callbacks and UI customization using themes.
 *
 * **directive types:** Element only
 * 
 * @property {object}  scope                - Isolated scope.
 * @property {object}  scope.model          - The ngModel to be used with the form.
 * @property {string}  scope.mhFormName     - The name (HTML 'name' attribute) of the form.
 * @property {array}   scope.mhFormFields   - An array of mhFormFields.
 * @property {number}  scope.mhFormButtons  - How much gold the party starts with.
 * @property {object}  controller - an {@link Controllers.MHFormCtrl MHFormCtrl} used to compile directive.
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
        controller: 'MHFormCtrl',
        controllerAs : 'controller'
    };
})