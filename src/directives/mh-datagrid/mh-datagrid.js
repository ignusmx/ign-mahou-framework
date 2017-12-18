/**
 * A function in MyNamespace (MyNamespace.myFunction).
 * @class mhDatagrid
 * @memberof Directives
 */
angular.module('mahou').directive('mhDatagrid', function ( $compile, $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'E',
        scope: 
        { 
            mhEnableRowSelect : "=",
            mhEnableRowButtons : "=",
            mhCols : "=",
            mhRowButtons : "=",
            mhCollection : "=",
            mhSelectAllChange : "&",
            mhSelectRowChange : "&",
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