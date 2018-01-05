 /**
 * @class mhFormThemeBs
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhForm mhForm} directive. Used to define a bootstrap form theme.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhForm mhForm}
 * ### ** HTML declaration **
    <mh-form mh-form-theme-bs
        {mh-form-attributes}
        mhFormLayout={ArrayOfUIElements}>
    </mh-form>
 * @property {MHFormBSRow[]}      mhFormLayout     - array composed of {@link UIElement.MHFormBSRow MHFormBSRow} with columns and elements inside.
 */
angular.module('ign.Mahou').directive('mhFormThemeBs', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhForm', 'mhFormThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<form class="form-horizontal" novalidate>\
                                            <div class="mh-form-elements-container">\
                                                <div class="form-group mh-form-row">\
                                                    <div class="mh-form-col"></div>\
                                                </div>\
                                                <label class="mh-label"><span class="mh-title"></span></label>\
                                                <div class="mh-input-container">\
                                                    <label class="mh-title"></label>\
                                                    <input class="form-control mh-input">\
                                                    <div class="mh-input-error-message help-block"></div>\
                                                </div>\
                                                <div class="mh-textarea-container">\
                                                    <label class="mh-title"></label>\
                                                    <textarea class="form-control mh-input">\
                                                    </textarea>\
                                                    <div class="mh-input-error-message help-block"></div>\
                                                </div>\
                                                <div class="mh-select-container">\
                                                    <label class="mh-title"></label>\
                                                    <select class="form-control mh-input">\
                                                        <option class="mh-select-default-option"></option>\
                                                        <option class="mh-select-option">\
                                                        </option>\
                                                    </select>\
                                                    <div class="errors">\
                                                        <div class="mh-input-error-message" ng-message="required"></div>\
                                                    </div>\
                                                </div>\
                                                <div class="mh-md-select-container">\
                                                    <md-input-container style="margin-bottom:0px; width:100%">\
                                                        <label class="mh-title"></label>\
                                                        <md-select class="mh-input">\
                                                            <md-option class="mh-select-default-option"></md-option>\
                                                            <md-option class="mh-select-option">\
                                                            </md-option>\
                                                        </md-select>\
                                                        <div class="errors">\
                                                            <div class="mh-input-error-message" ng-message="required"></div>\
                                                        </div>\
                                                    </md-input-container>\
                                                </div>\
                                                <div class="mh-date-container">\
                                                    <md-input-container style="margin-bottom:0px; width:100%">\
                                                        <label class="mh-title"></label>\
                                                        <md-datepicker class="mh-input" md-placeholder="Enter date"></md-datepicker>\
                                                    </md-input-container>\
                                                </div>\
                                                <div class="mh-md-autocomplete-container">\
                                                    <md-autocomplete class="mh-input form-control" style="min-width: inherit;">\
                                                    <md-item-template>\
                                                      <span></span>\
                                                    </md-item-template>\
                                                    <md-not-found>\
                                                      No states matching "{{ctrl.searchText}}" were found.\
                                                      <a ng-click="ctrl.newState(ctrl.searchText)">Create a new one!</a>\
                                                    </md-not-found>\
                                                  </md-autocomplete>\
                                                  <div class="mh-input-error-message help-block">mensaje de error</div>\
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
            formCtrl.scope.mhClassInvalid == null ? 'has-error' : formCtrl.scope.mhClassInvalid;
            
            var templateElem = 
            $(themeCtrl.renderFormTheme(this.mhRawInnerTemplate, formCtrl.scope));
            formCtrl.compileTemplate(templateElem, el, themeCtrl.formElements);
        },
        controller : function($scope, $element, $attrs)
        {
            var self = this;
            self.formElements = [];

            this.renderFormTheme = function(template, formScope)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var form = renderedTemplate.find("form");
                var elementsContainer = form.find(".mh-form-elements-container");

                var formRow = form.find(".mh-form-row");
                formRow.remove();

                var formCol = formRow.find(".mh-form-col");
                formCol.remove();
                
                var inputContainer = elementsContainer.find(".mh-input-container");
                inputContainer.remove();

                var textareaContainer = elementsContainer.find(".mh-textarea-container");
                textareaContainer.remove();

                var selectContainer = elementsContainer.find(".mh-select-container");
                selectContainer.remove();

                var mdSelectContainer = elementsContainer.find(".mh-md-select-container");
                mdSelectContainer.remove();

                var mdDateContainer = elementsContainer.find(".mh-date-container");
                mdDateContainer.remove();

                var mdAutocompleteContainer = elementsContainer.find(".mh-md-autocomplete-container");
                mdAutocompleteContainer.remove();

                var buttonContainer = form.find(".mh-button-container");
                buttonContainer.remove();

                var label = form.find(".mh-label");
                label.remove();

                //RENDER LAYOUT
                for(var i = 0; i < formScope.mhFormLayout.length; i++)
                {
                    var element = formScope.mhFormLayout[i];
                    recursivelyIndexAndRenderElement(element, elementsContainer);
                }

                function recursivelyIndexAndRenderElement(element, group, parent)
                {
                    if(element instanceof MHFormBSRow)
                    {
                        var rowContainer = element;
                        var newFormRow = formRow.clone();
                        group.append(newFormRow);

                        if(rowContainer.elements != null)
                        {
                            for(var i = 0; i < rowContainer.elements.length; i++)
                            {
                                recursivelyIndexAndRenderElement(rowContainer.elements[i], newFormRow, rowContainer);
                            }
                        }  
                    }
                    else if(element instanceof MHFormBSCol)
                    {
                        var usedCols = 0;
                        var container  = element;
                        var newFormCol = formCol.clone();

                        if(element.flex)
                        {
                            var flexAlign = 'flex-start';
                            var flexJustify = 'flex-start';
                            switch(container.vAlign)
                            {
                                case 'top' : flexAlign = 'flex-start';
                                break;
                                case 'middle' : flexAlign = 'center';
                                break;
                                case 'bottom' : flexAlign = 'flex-end';
                                break;
                            }

                            switch(container.hAlign)
                            {
                                case 'left' : flexJustify = 'flex-start';
                                break;
                                case 'center' : flexJustify = 'center';
                                break;
                                case 'right' : flexJustify = 'flex-end';
                                break;
                            }

                            newFormCol.css("display", "flex");
                            newFormCol.css("align-items", flexAlign);
                            newFormCol.css("justify-content", flexJustify);
                        }
                        
                        if(container.minHeight != null)
                        {
                            newFormCol.css("min-height", container.minHeight+"px");
                        }

                        var cols = container.colWidth;
                        var offset = container.offset;
                        
                        newFormCol.addClass("col-md-"+cols);
                        
                        if(offset > 0)
                        {
                            newFormCol.addClass("col-md-offset-"+offset);
                        }
                        
                        group.append(newFormCol);

                        if(container.elements != null)
                        {
                            for(var i = 0; i < container.elements.length; i++)
                            {
                                recursivelyIndexAndRenderElement(container.elements[i], newFormCol, container);
                            }
                        }
                    }
                    else
                    {
                        var newElementContainer = renderElementContainer(element, parent);
                        group.append(newElementContainer);
                        //add element to elements array
                        self.formElements.push(element);
                    }   
                }

                function renderElementContainer(element, parent)
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
                    else if(element instanceof MHFormFieldMDAutocomplete)
                    {
                        newElementContainer = mdAutocompleteContainer.clone();
                    }
                    else if(element instanceof MHFormButton)
                    {
                        newElementContainer = buttonContainer.clone();
                    }
                    else if(element instanceof MHFormLabel)
                    {
                        newElementContainer = label.clone();
                    }
                    else if(element instanceof MHFormFieldTextArea)
                    {
                        newElementContainer = textareaContainer.clone();
                    }
                    else
                    {
                        newElementContainer = inputContainer.clone();
                        if(element.title == null)
                        {
                            newElementContainer.find("label").remove();
                        }
                    }

                    newElementContainer.attr("data-mh-name", element.name);
                    newElementContainer.css("float", "left");
                    newElementContainer.css("padding-left", "5px");
                    newElementContainer.css("padding-right", "5px");

                    if(parent.fill)
                    {
                        newElementContainer.css("width", "100%");
                    }
                    
                    return newElementContainer;
                }

                return renderedTemplate.html();
            }
        }
    };
})