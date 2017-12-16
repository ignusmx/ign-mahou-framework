/**
 * @class mhFormThemeCustom
 * @memberof Themes
 * @classdesc
 * use this directive to customize UI theme for mhForm.<br>
 *
 * **directive types:** Attribute only
 * @property {string}  mhTemplateUrl - Url of the file containing the html of the template to be used (use this intead of template).
 * @description  
 * #### ** Controller: ** {@link Controllers.MHFormCtrl MHFormCtrl} (inherited from mhForm)
 * ** *Requires mhForm directive to work. If no mhForm is found, an error will be thrown when compiling directive. **
 *
 * #### **Base theme structure**
    <form>
        <div class="mh-input-container" data-mh-name="{nameOfMhFormField}">
            <input class="mh-input">
            <div class="mh-form-error-message">{error message}</div>
        </div>
        <button class="mh-form-button" data-mh-name="{mhFormButtonName}">
            <span class="mh-title"></span>
        </button>
    </form>
 * #### ** A custom theme requires as minimum: **
 * * A form tag with the following inside:
 * * A div with class mh-input-container for each mhFormField with the name of the field as data-mh-name attribute
 * * An html tag with class mh-input inside mh-input-container which will be the element to be used as input for that mhFormField
 * * **(optional)** a div with class mh-form-error-message where the mhFormField.invalidMessage will be shown if validation fails
 * * A button tag with class mh-form-button for each mhFormButton with the name of the button as data-mh-name attribute
 * * A span with class mh-title inside the button where the mhFormButton.title will be displayed
 *
 * **Theme's html can be placed inside the mhForm tag itself, or you can provide an url for the theme using the mhTempalteUrl attribute**
 * @example <caption>Javascript Code</caption>
 *
 var user = { 
                name: "John", last_name: "Doe", mail : "jdoe@mail.com", 
                address : 
                { 
                    city : "Guadalajara", country: "México"
                } 
            };

 var nameField = new MHFormField();
 nameField.name = "name";
 nameField.title = "Name";
 nameField.model = "name";
 namefield.type = "text";
 namefield.required = true;
 namefield.invalidMessage = "The name field is required";

 var emailField = new MHFormField();
 emailField.name = "email";
 emailField.title = "E-Mail";
 emailField.model = "mail";
 emailField.type = "email";
 emailField.required = true;
 emailField.invalidMessage = "The email field is required";

 var cityField = new MHFormField();
 cityField.name = "city";
 cityField.title = "City";
 cityField.model = "address.city";
 cityField.type = "text";
 cityField.required = true;
 cityField.invalidMessage = "The city field is required";

 var formFields = [nameField, emailField, cityField];

 * @example <caption>HTML Code (Using inline template)</caption>
 *
<mh-form mh-form-theme-custom 
    ng-model="user" 
    mh-form-name="'userForm'" 
    mh-form-fields="formFields" 
    mh-form-buttons="formButton">
        <form>
            <div class="mh-input-container" data-mh-name="name">
                <label class="mh-title"></label>
                <input class="mh-input">
                <div class="mh-form-error-message"></div>
            </div>
            <div class="mh-input-container" data-mh-name="email">
                <label class="mh-title"></label>
                <input class="mh-input">
                <div class="mh-form-error-message"></div>
            </div>
            <div class="mh-input-container" data-mh-name="city">
                <label class="mh-title"></label>
                <input class="mh-input">
                <div class="mh-form-error-message"></div>
            </div>
            <button class="mh-form-button" data-mh-name="{mhFormButtonName}">
                <span class="mh-title"></span>
            </button>
        </form>
</mh-form>
* @example <caption>HTML Code (Using mhTemplateUrl)</caption>
*
<mh-form mh-form-theme-custom 
    ng-model="user" 
    mh-form-name="'userForm'" 
    mh-form-fields="formFields" 
    mh-form-buttons="formButton"
    mh-template-url="path/to/template.html">
</mh-form>
 */
angular.module('mahou').directive('mhPaginatorThemeCustom', function ( $templateRequest )
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