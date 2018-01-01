 /**
 * @class mhDatagridThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhDatagrid mhDatagrid} directive. Used to define a custom UI for the datagrid.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 * ### ** HTML declaration **
    <mh-datagrid mh-datagrid-theme-custom
        {datagrid-attributes}
        mh-tempalte-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-datagrid>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
 */
angular.module('mahou').directive('mhDatagridThemeCustom', function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhDatagrid'],
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