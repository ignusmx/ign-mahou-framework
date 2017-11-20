angular.module('mahou').directive('mhtpFormBsHorizontal', function ( $templateRequest ) {
    return {
        restrict: 'E',
        require : ["^^mhForm"],
        template : function(el)
        {
            console.log("child template")
            return '<form name="testForm">\
                        <div class="input-container user_name">\
                            <input name="user_name" required>\
                            <input name="mail">\
                            <div class="question">????</div>\
                            <md-checkbox aria-label="No Ink Effects" ng-model="asd">\
                              {{5+5}}\
                            </md-checkbox>\
                            <div class="mh-form-error-message" name="user_name">mensaje de error</div>\
                        </div>\
                    </form>';
        },
        link : function(scope, el, attrs, ctrls)
        {

            console.log("dir!");
        }
    };
})