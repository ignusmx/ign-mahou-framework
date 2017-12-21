angular.module('mahou').directive('mhSideNavbar', function ( $compile, $templateRequest ) {
    return {
        restrict: 'E',
        scope:{ 
            mhTitle : "=",
            mhLocked : "=?"
        },
        transclude: true,
        template :  '<md-sidenav class="md-sidenav-left" md-component-id="left"\
                        md-disable-backdrop md-whiteframe="1" md-is-locked-open="mhLocked || false">\
                        <md-toolbar class="md-theme-indigo">\
                          <h1 class="md-toolbar-tools">{{mhTitle}}</h1>\
                        </md-toolbar>\
                        <md-content>\
                          <div ng-transclude></div>\
                        </md-content>\
                      </md-sidenav>'
    };
});