/**
 * @class mhCompile
 * @memberof Directives
 * @classdesc
 * use this directive to compile and render a string with an angular expression and html
 * **directive types:** Attribute
 *
 * @description 
 * ### ** HTML declaration **
    <span mhCompile="{valueToCompile}"></span>
 * @property {string}                   mhCompile             - value to be compiled.
 */
angular.module('ign.Mahou').directive('mhCompile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.mhCompile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
});