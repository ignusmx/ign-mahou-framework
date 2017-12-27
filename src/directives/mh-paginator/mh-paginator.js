angular.module('mahou').directive('mhPaginator', function ( $templateRequest ) {
    return {
        restrict: 'E',
        scope: 
        {
            mhPageGroupSize : '=',
            mhCurrentPage : '=',
            mhLastPage : '=',
            mhClassActive : '=?',
            mhClassDisabled : '=?',
            mhOnPageSelected : '='
        },
        compile : function(elem,attrs)
        {
            //search for a theme directive for proper compiling
            var themeExists = false;
            for ( var prop in attrs )
            {
                if(prop.indexOf("mhPaginatorTheme") !== -1)
                {
                    themeExists = true;
                    break;
                }
            }

            //throw error if no theme found
            if(!themeExists)
            {
                throw new Error("Could not compile mhPaginator: no mhPaginatorTheme directive was found. Please specify one.");
            }
        },
        controller: 'MHPaginatorCtrl',
        controllerAs : 'controller'
    };
});