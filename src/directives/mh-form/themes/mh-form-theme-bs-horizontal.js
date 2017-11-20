angular.module('mahou').directive('mhFormThemeBsHorizontal', function ( $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhForm', 'mhFormThemeBsHorizontal'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<form name="testForm">\
                                            <div class="mh-form-inputs-container row">\
                                                <div class="form-group mh-input-container">\
                                                    <label class="mh-title"></label>\
                                                    <input class="form-control mh-input">\
                                                </div>\
                                                <div class="form-group mh-select-container">\
                                                    <md-input-container>\
                                                      <label class="mh-title"></label>\
                                                      <md-select class="mh-input">\
                                                        <md-option class="mh-select-default-option"><em></em></md-option>\
                                                        <md-option class="mh-select-option">\
                                                        </md-option>\
                                                      </md-select>\
                                                    </md-input-container>\
                                                </div>\
                                            </div>\
                                            <div class="form-group mh-form-buttons-container">\
                                                <button class="btn btn-default mh-form-button" style="margin-left:5px; margin-right:5px">\
                                                    <span class="mh-title"></span>\
                                                </button>\
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
                var inputsContainer = form.find(".mh-form-inputs-container");
                
                var inputContainer = inputsContainer.find(".mh-input-container");
                inputContainer.remove();

                var selectContainer = inputsContainer.find(".mh-select-container");
                selectContainer.remove();

                var buttonsContainer = form.find(".mh-form-buttons-container");
                buttonsContainer.remove();

                var button = buttonsContainer.find("button");
                button.remove();

                for(var i = 0; i < formScope.mhFormFields.length; i++)
                {
                    var config = formScope.mhFormFields[i];
                    var newInputContainer = null;

                    if(config.type == "select")
                    {
                        newInputContainer = selectContainer.clone();
                    }
                    else
                    {
                        newInputContainer = inputContainer.clone();
                    }
                    
                    var cols = config.cols == null ? 4 : config.cols;
                    newInputContainer.addClass("col-md-"+cols);
                    newInputContainer.attr("data-mh-name", config.name);
                    inputsContainer.append(newInputContainer);
                }
                
                for(var i = 0; i < formScope.mhFormButtons.length; i++)
                {
                    var config = formScope.mhFormButtons[i];
                    var newButton = button.clone();
                    newButton.attr("data-mh-name", config.name);
                    buttonsContainer.append(newButton);
                }

                form.append(buttonsContainer);

                return renderedTemplate.html();
            }
        }
    };
})