/**
 * @class mhPaginatorThemeCustom
 * @memberof Themes
 * @classdesc
 * A theme for {@link Directives.mhPaginator mhPaginator} directive. Used to define a custom UI for the paginator.
 * **directive types:** Attribute only
 *
 * @description 
 * #### ** Directive: ** {@link Directives.mhPaginator mhPaginator}
 * ### ** HTML declaration **
    <mh-paginator mh-paginator-theme-custom
        {navbar-attributes}
        mh-tempalte-url="{urlOfExternalHtml}">
        <!-- TODO: place an example of a custom UI -->
    </mh-paginator>
 * @property {html}     mhRawInnerTemplate          - html template defined inside the directive.
 * @property {string}   mhTemplateUrl               - url of the html template to be loaded. (If specified, mhRawInnerTemplate will be ignored).
 */
angular.module('ign.Mahou').directive('mhPaginatorThemeCustom', function ( $templateRequest )
{
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhPaginator'],
        template : function(el)
        {
            this.mhRawInnerTemplate = el.html();
            console.log(this.mhRawInnerTemplate);
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var formCtrl = ctrls[0];
            if(attrs.mhTemplateUrl == null)
            {
                var templateElem = $(this.mhRawInnerTemplate);
                formCtrl.compileTemplate(templateElem, el, scope.mhFormLayout);
            }
            else
            {
                $templateRequest(attrs.mhTemplateUrl)
                .then(function (response) 
                { 
                    var templateElem = $(response);
                    formCtrl.compileTemplate(templateElem, el);                   
                });
            }
        }
    };
})