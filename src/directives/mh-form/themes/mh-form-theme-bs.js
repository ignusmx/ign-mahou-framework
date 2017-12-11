angular.module('mahou').directive('mhFormThemeBs', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhForm', 'mhFormThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<form novalidate>\
                                            <div class="mh-form-elements-container row">\
                                                <div class="form-group mh-form-md-group">\
                                                </div>\
                                                <div class="mh-input-container">\
                                                    <label class="mh-title"></label>\
                                                    <input class="form-control mh-input">\
                                                    <div class="mh-input-error-message invalid-feedback">mensaje de error</div>\
                                                </div>\
                                                <div class="mh-select-container">\
                                                    <label class="mh-title"></label>\
                                                    <select class="form-control mh-input">\
                                                        <option class="mh-select-default-option"><em></em></option>\
                                                        <option class="mh-select-option">\
                                                        </option>\
                                                    </select>\
                                                    <div class="errors">\
                                                        <div class="mh-input-error-message" ng-message="required"></div>\
                                                    </div>\
                                                </div>\
                                                <div class="mh-md-select-container">\
                                                    <md-input-container style="margin-bottom:0px">\
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
                                                <div class="mh-date-container">\
                                                    <md-input-container style="margin-bottom:0px">\
                                                        <label class="mh-title"></label>\
                                                        <md-datepicker class="mh-input" md-placeholder="Enter date"></md-datepicker>\
                                                    </md-input-container>\
                                                </div>\
                                                <div class="mh-button-container">\
                                                    <button class="btn btn-default mh-form-button">\
                                                        <span class="mh-title"></span>\
                                                    </button>\
                                                </div>\
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

            //extend navbar scope to add layout for this theme
            var elementContainers = $parse(attrs.mhFormElementContainers)(scope);

            for(var i = 0; i < elementContainers.length; i++)
            {
                var container = elementContainers[i];
                MHValidationHelper.validateType(container, "container", [MHFormBSElementContainer]);
            }

            formCtrl.scope.mhFormElementContainers = elementContainers;
            
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
                var elementsContainer = form.find(".mh-form-elements-container");

                var elementGroup = form.find(".mh-form-md-group");
                elementGroup.remove();
                
                var inputContainer = elementsContainer.find(".mh-input-container");
                inputContainer.remove();

                var selectContainer = elementsContainer.find(".mh-select-container");
                selectContainer.remove();

                var mdSelectContainer = elementsContainer.find(".mh-md-select-container");
                mdSelectContainer.remove();

                var mdDateContainer = elementsContainer.find(".mh-date-container");
                mdDateContainer.remove();

                var buttonContainer = form.find(".mh-button-container");
                buttonContainer.remove();

                ////CREATE DEFAULT ELEMENT CONTAINERS IF NO CONTAINER IS FOUND
                for(var i = 0; i < formScope.mhFormElements.length; i++)
                {
                    var hasContainer = false;
                    var element = formScope.mhFormElements[i];
                    for(var j = 0; j < formScope.mhFormElementContainers.length; j++)
                    {
                        var container = formScope.mhFormElementContainers[j];

                        for(var k = 0; k < container.elements.length; k++)
                        {
                            console.log("container");
                            if(container.elements[k] == element)
                            {
                                console.log("has container!", element);
                                hasContainer = true;
                                break;
                            }
                        }

                        if(hasContainer)
                        {
                            break;
                        }
                    }

                    if(!hasContainer)
                    {
                        //TODO: aqui me quedé 
                        //(estandarizar y mover buttons, selects, date e inputs a un mismo container
                        //en el template)
                        formScope.mhFormElementContainers.push(new MHFormBSElementContainer({elements:[element], cols:4, offset:0}));
                    }
                }

                console.log("containers:", formScope.mhFormElementContainers);
                var usedCols = 0;
                for(var i = 0; i < formScope.mhFormElementContainers.length; i++)
                {
                    var container  = formScope.mhFormElementContainers[i];
                    var newElementGroup = elementGroup.clone();
                    var flexAlign = 'flex-start';

                    switch(container.align)
                    {
                        case 'top' : flexAlign = 'flex-start';
                        break;
                        case 'middle' : flexAlign = 'center';
                        break;
                        case 'bottom' : flexAlign = 'flex-end';
                        break;
                    }

                    newElementGroup.css("display", "flex");
                    newElementGroup.css("align-items", flexAlign);

                    if(container.minHeight != null)
                    {
                        newElementGroup.css("min-height", container.minHeight+"px");
                    }

                    for(var j = 0; j < container.elements.length; j++)
                    {
                        var newElementContainer = renderElementContainer(container.elements[j]);
                        newElementGroup.append(newElementContainer);
                    }

                    var cols = container.cols;
                    var offset = container.offset;
                    usedCols += cols + offset;

                    if(usedCols > 12)
                    {
                        elementsContainer.append('<div class="clearfix"></div>');
                        usedCols = cols+offset;
                    }
                    
                    newElementGroup.addClass("col-md-"+cols);
                    
                    if(offset > 0)
                    {
                        newElementGroup.addClass("col-md-offset-"+offset);
                    }

                    
                    elementsContainer.append(newElementGroup);
                    if(container.linebreak)
                    {
                        elementsContainer.append('<div class="clearfix"></div>');
                    }
                }

                function renderElementContainer(element)
                {
                    var newElementContainer = null;

                    if(element instanceof MHFormFieldMDSelect)
                    {
                        newElementContainer = mdSelectContainer.clone();
                    }
                    else if(element instanceof MHFormFieldSelect)
                    {
                        newElementContainer = selectContainer.clone();
                    }
                    else if(element instanceof MHFormFieldMDDate)
                    {
                        newElementContainer = mdDateContainer.clone();
                        newElementContainer.find("md-datepicker").attr("md-placeholder", element.placeholder);
                    }
                    else if(element instanceof MHFormButton)
                    {
                        newElementContainer = buttonContainer.clone();
                    }
                    else
                    {
                        newElementContainer = inputContainer.clone();
                    }

                    newElementContainer.attr("data-mh-name", element.name);
                    newElementContainer.css("float", "left");
                    newElementContainer.css("margin-left", "5px");
                    newElementContainer.css("margin-right", "5px");
                    return newElementContainer;
                }

                return renderedTemplate.html();
            }
        }
    };
})