 /**
 * @class mhFormThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhForm mhForm} directive. Used to define a custom UI for the form.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhForm mhForm}
 * ### ** HTML declaration **
    <mh-form mh-form-theme-custom
        {mh-form-attributes}
        mh-template-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-form>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
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
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var ctrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                ctrl.compileTemplate(templateElem, el, scope.mhFormLayout);
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