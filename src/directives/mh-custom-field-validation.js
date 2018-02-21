/**
 * @class mhCustomFieldValidation
 * @memberof Directives
 * @classdesc
 * use this directive to add custom validation to inputs in forms
 * **directive types:** Attribute
 *
 * @description 
 * ### ** HTML declaration **
    <input mhCustomFieldValidation="{function}">
 * @property {function}                   mhCustomFieldValidation  - function used as validator. Recieves modelValue as parameter. Must return true or false
 */
angular.module('ign.Mahou').directive('mhCustomFieldValidation', function ($compile) {
    return {
        restrict: 'A',
        require: "ngModel",
        scope: {
            mhCustomFieldValidation: "&"
        },
        link : function(scope, element, attributes, ngModel)
        {
            ngModel.$validators.customValidation = function(modelValue)
            {
                if(scope.mhCustomFieldValidation != null)
                {
                    var result = scope.mhCustomFieldValidation({modelValue : modelValue});
                    return result == null ? true : result;
                }

                return true;
            };
        }
    }
});