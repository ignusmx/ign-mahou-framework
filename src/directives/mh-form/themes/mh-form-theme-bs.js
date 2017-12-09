angular.module('mahou').directive('mhFormThemeBs', function ( $templateRequest ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhForm', 'mhFormThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<form novalidate>\
                                            <div class="mh-form-inputs-container row">\
                                                <div class="form-group mh-input-container">\
                                                    <label class="mh-title"></label>\
                                                    <input class="form-control mh-input">\
                                                    <div class="mh-input-error-message invalid-feedback">mensaje de error</div>\
                                                </div>\
                                                <div class="form-group mh-select-container">\
                                                    <md-input-container>\
                                                      <label class="mh-title"></label>\
                                                      <md-select class="mh-input">\
                                                        <md-option class="mh-select-default-option"><em></em></md-option>\
                                                        <md-option class="mh-select-option">\
                                                        </md-option>\
                                                      </md-select>\
                                                      <div class="errors">\
                                                          <div class="mh-input-error-message" ng-message="required"></div>\
                                                        </div>\
                                                    </md-input-container>\
                                                </div>\
                                                <div class="form-group mh-date-container">\
                                                    <md-input-container>\
                                                        <label class="mh-title"></label>\
                                                        <md-datepicker class="mh-input" md-placeholder="Enter date"></md-datepicker>\
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
            
            formCtrl.scope.mhClassInvalid = 
            formCtrl.scope.mhClassInvalid == null ? 'is-invalid' : formCtrl.scope.mhClassInvalid;
            
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

                var dateContainer = inputsContainer.find(".mh-date-container");
                dateContainer.remove();

                var buttonsContainer = form.find(".mh-form-buttons-container");
                buttonsContainer.remove();

                var button = buttonsContainer.find("button");
                button.remove();

                var usedCols=0;
                for(var i = 0; i < formScope.mhFormFields.length; i++)
                {
                    var config = formScope.mhFormFields[i];
                    var newInputContainer = null;

                    if(config.type == "select")
                    {
                        newInputContainer = selectContainer.clone();
                    }
                    else if(config.type == "date")
                    {
                        newInputContainer = dateContainer.clone();
                        newInputContainer.find("md-datepicker").attr("md-placeholder", config.placeholder);
                    }
                    else
                    {
                        newInputContainer = inputContainer.clone();
                    }

                    var cols = config.cols == null ? 4 : config.cols;
                    var offset = config.offset == null ? 0 : config.offset;
                    usedCols += cols + offset;

                    console.log("used cols:", usedCols);

                    if(usedCols > 12)
                    {
                        inputsContainer.append('<div class="clearfix"></div>');
                        usedCols = cols+offset;
                    }
                    
                    newInputContainer.addClass("col-md-"+cols);
                    
                    if(offset > 0)
                    {
                        newInputContainer.addClass("col-md-offset-"+offset);
                    }

                    newInputContainer.attr("data-mh-name", config.name);
                    inputsContainer.append(newInputContainer);
                    if(config.linebreak)
                    {
                        inputsContainer.append('<div class="clearfix"></div>');
                    }
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