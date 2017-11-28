/**
 * @class mhFormThemeCustom
 * @memberof Themes
 * @classdesc
 * use this directive to customize UI theme for mhForm.<br>
 *
 * **directive types:** Attribute only
 * @property {object}  scope                - Isolated scope.
 * @property {object}  scope.model          - The ngModel to be used with the form.
 * @property {string}  scope.mhFormName     - The name (HTML 'name' attribute) of the form.
 * @property {array}   scope.mhFormFields   - An array of mhFormFields.
 * @property {number}  scope.mhFormButtons  - How much gold the party starts with.
 * @property {object}  controller - an {@link Controllers.MHFormCtrl MHFormCtrl} used to compile directive.
 * @description  
 *
 * ** *Requires mhForm directive to work. If no mhForm is found, an error will be thrown when compiling directive. **
 *
 * #### **base theme structure**
    <form>
        <div class="mh-input-container" data-mh-name="{nameOfMhFormField}">
            <input class="mh-input">
            <div class="mh-form-error-message">{error message}</div>
        </div>
        <button class="mh-form-button" data-mh-name="{mhFormButtonName}">
            <span class="mh-title"></span>
        </button>
    </form>
 */
angular.module('mahou').directive('mhFormThemeCustom', function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhForm'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            console.log(this.mhRawInnerTemplate)
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var ctrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                ctrl.compileTemplate(templateElem, el);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    ctrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
})