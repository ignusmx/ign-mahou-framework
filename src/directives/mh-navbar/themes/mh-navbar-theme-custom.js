 /**
 * @class mhNavbarThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhNavbar mhNavbar} directive. Used to define a custom UI for the navbar.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhNavbar mhNavbar}
 * ### ** HTML declaration **
    <mh-navbar mh-navbar-theme-custom
        {navbar-attributes}
        mh-tempalte-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-navbar>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
 */
angular.module('mahou').directive('mhNavbarThemeCustom', function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhNavbar'],
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
                var templateElem = $("<div></div>");
                templateElem.append(this.mhRawInnerTemplate);      
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