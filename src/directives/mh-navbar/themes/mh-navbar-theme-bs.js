angular.module('mahou').directive('mhNavbarThemeBs', function ( $templateRequest, $parse ) {
    return {
        mhRawInnerTemplate : null,
        restrict: 'A',
        require : ['mhNavbar', 'mhNavbarThemeBs'],
        template : function(el)
        {
            this.mhRawInnerTemplate =  '<nav class="navbar navbar-default">\
                                            <div class="container-fluid">\
                                                <!-- Brand and toggle get grouped for better mobile display -->\
                                                <div class="navbar-header">\
                                                  <button type="button" class="navbar-toggle collapsed"\
                                                  data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\
                                                    <span class="sr-only">Toggle navigation</span>\
                                                    <span class="icon-bar"></span>\
                                                    <span class="icon-bar"></span>\
                                                    <span class="icon-bar"></span>\
                                                  </button>\
                                                  <a class="navbar-brand mh-brand" href="#"><span class="mh-title"></span></a>\
                                                </div>\
                                                <!-- Collect the nav links, forms, and other content for toggling -->\
                                                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\
                                                  <ul class="nav navbar-nav">\
                                                    <li>\
                                                        <a class="mh-navbar-button" href="#">\
                                                            <span class="mh-title"></span>\
                                                        </a>\
                                                    </li>\
                                                    <li class="dropdown">\
                                                      <a href="#" class="dropdown-toggle mh-navbar-button" \
                                                      data-toggle="dropdown" role="button" aria-haspopup="true" \
                                                      aria-expanded="false"><span class="mh-title"></span> <span class="caret"></span></a>\
                                                      <ul class="dropdown-menu">\
                                                        <li><a href="#" class="mh-navbar-button"><span class="mh-title"></span></a></li>\
                                                      </ul>\
                                                    </li>\
                                                  </ul>\
                                                  <ul class="nav navbar-nav navbar-right">\
                                                    <li>\
                                                        <a class="mh-navbar-button" href="#">\
                                                            <span class="mh-title"></span>\
                                                        </a>\
                                                    </li>\
                                                    <li class="dropdown">\
                                                      <a href="#" class="dropdown-toggle mh-navbar-button" \
                                                      data-toggle="dropdown" role="button" aria-haspopup="true" \
                                                      aria-expanded="false"><span class="mh-title"></span> <span class="caret"></span></a>\
                                                      <ul class="dropdown-menu">\
                                                        <li><a href="#" class="mh-navbar-button"><span class="mh-title"></span></a></li>\
                                                      </ul>\
                                                    </li>\
                                                  </ul>\
                                                </div><!-- /.navbar-collapse -->\
                                            </div><!-- /.container-fluid -->\
                                        </nav>';
            return "";
        },
        link : function(scope, el, attrs, ctrls)
        {
            var navbarCtrl = ctrls[0];
            var themeCtrl = ctrls[1];

            var bsNavbarPosition = attrs.mhNavbarPosition;
            var navbarPositionClass ="";
            switch(bsNavbarPosition)
            {
                case "fixed-top" : 
                navbarPositionClass = "navbar-fixed-top";
                break;
                case "fixed-bottom":
                navbarPositionClass = "navbar-fixed-bottom";
                break;
                case "static":
                navbarPositionClass = "navbar-static-top";
                break;
            }

            var inverse = attrs.mhNavbarInverse == null ? false : true;
            
            //extend navbar scope to add mhNavbarButtonsRight for this them
            var rightButtons = $parse(attrs.mhNavbarButtonsRight)(scope);

            var templateElem = 
            $(themeCtrl.renderTheme(this.mhRawInnerTemplate, navbarCtrl.scope, rightButtons, navbarPositionClass, inverse));

            //append the right buttons to navbarButtons array
            navbarCtrl.scope.mhNavbarButtons = navbarCtrl.scope.mhNavbarButtons.concat(rightButtons);

            navbarCtrl.compileTemplate(templateElem, el);
        },
        controller : function($scope, $element, $attrs)
        {
            function renderLIButtons(ul, buttons)
            {
                var simpleButtonContainer = ul.find("> li:not(.dropdown)");
                simpleButtonContainer.remove();

                var dropdownButtonContainer = ul.find("> li.dropdown");
                dropdownButtonContainer.remove();

                for(var i = 0; i < buttons.length; i++)
                {
                    var config = buttons[i];
                    var newButtonContainer = null;

                    if(config.dropdown_buttons != null && config.dropdown_buttons.length > 0)
                    {
                        newButtonContainer = dropdownButtonContainer.clone();

                        var innerUl = newButtonContainer.find("ul");
                        var innerSimpleButtonContainer = innerUl.find("li");
                        innerSimpleButtonContainer.remove();

                        newButtonContainer.find("> a.mh-navbar-button").attr("data-mh-name", config.name);
                        for(var j = 0; j < config.dropdown_buttons.length; j++)
                        {
                            var newInnerSimpleButtonContainer = innerSimpleButtonContainer.clone();
                            newInnerSimpleButtonContainer.find("a.mh-navbar-button").attr("data-mh-name", config.dropdown_buttons[j].name);
                            innerUl.append(newInnerSimpleButtonContainer);
                        }
                    }
                    else
                    {
                        newButtonContainer = simpleButtonContainer.clone();
                        newButtonContainer.find(".mh-navbar-button").attr("data-mh-name", config.name);
                    }
                    ul.append(newButtonContainer);
                }
            }

            this.renderTheme = function(template, navbarScope, rightButtons, navbarPositionClass, inverse)
            {
                var renderedTemplate = $("<div></div>");
                renderedTemplate.append(template);

                var navbar = renderedTemplate.find("nav");
                navbar.addClass(navbarPositionClass);

                if(inverse)
                {
                    navbar.removeClass("navbar-default");
                    navbar.addClass("navbar-inverse");
                }

                var ul = navbar.find("ul.nav:not(.navbar-right)");
                renderLIButtons(ul, navbarScope.mhNavbarButtons);

                var rightUl = navbar.find("ul.nav.navbar-right");
                renderLIButtons(rightUl, rightButtons);

                return renderedTemplate.html();
            }
        }
    };
})