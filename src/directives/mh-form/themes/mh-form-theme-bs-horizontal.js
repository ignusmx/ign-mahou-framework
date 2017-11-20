angular.module('mahou').directive('mhFormThemeBsHorizontal', function ( $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['^mhForm', 'mhFormThemeBsHorizontal'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<form name="testForm">\
                                            <div class="form-group mh-input-container">\
                                                <label></label>\
                                                <input class="form-control mh-input">\
                                            </div>\
                                            <div class="form-group mh-select-container">\
                                                <md-input-container>\
                                                  <label></label>\
                                                  <md-select class="mh-input">\
                                                    <md-option class="mh-select-default-option"><em></em></md-option>\
                                                    <md-option class="mh-select-option">\
                                                    </md-option>\
                                                  </md-select>\
                                                </md-input-container>\
                                            </div>\
                                        </form>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var formCtrl = ctrls[0];
            var themeCtrl = ctrls[1];
            console.log(ctrls);
            
            var templateElem = 
            $(themeCtrl.renderFormTheme(this.mhRawInnerTemplate, formCtrl.scope));
            formCtrl.compileTemplate(templateElem, el);
        },
        controller : function($scope, $element, $attrs)
        {
            this.renderFormTheme = function(template, formScope)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var form = renderedTemplate.find("form");
                
                var inputContainer = form.find(".mh-input-container");
                inputContainer.remove();

                var selectContainer = form.find(".mh-select-container");
                selectContainer.remove();

                for(var i = 0; i < formScope.mhConfigs.length; i++)
                {
                    var config = formScope.mhConfigs[i];
                    var newInputContainer = null;

                    if(config.type == "select")
                    {
                        newInputContainer = selectContainer.clone();
                    }
                    else
                    {
                        newInputContainer = inputContainer.clone();
                    }
                    
                    newInputContainer.attr("data-mh-name", config.name);
                    form.append(newInputContainer);
                }
                console.log(renderedTemplate.html())
                return renderedTemplate.html();
            }
        }
    };
})