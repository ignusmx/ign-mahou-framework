angular
.module('mahou')
.controller('MHPaginatorCtrl', 
    function MHPaginatorCtrl($scope, $element, $attrs, $compile)
    {
        var self = this;
        self.scope = $scope;
        self.groupInitPage = 0;
        self.groupLastPage = 0;
        self.pageGroup = 0;
        self.lastGroup = 0;

        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;
            
            groupPages();
            var pageButtonContainer = templateElem.find(".mh-page-button-container");
            pageButtonContainer.attr("ng-repeat", "page in mhPages");
            pageButtonContainer.attr("ng-class", "{'"+self.scope.mhClassActive+"' : page == mhCurrentPage}")
            pageButtonContainer.find(".mh-title").html("{{page}}");
            pageButtonContainer.find(".mh-page-button").attr("ng-click", "controller.setCurrentPage(page)")

            templateElem.find(".mh-prev-button").attr("ng-click", "controller.setCurrentPage(controller.groupInitPage - 1)");
            templateElem.find(".mh-next-button").attr("ng-click", "controller.setCurrentPage(controller.groupLastPage + 1)");

            templateElem.find(".mh-prev-button-container").attr("ng-class", "{'"+self.scope.mhClassDisabled+"' : controller.pageGroup === 0}");
            templateElem.find(".mh-next-button-container").attr("ng-class", "{'"+self.scope.mhClassDisabled+"' : controller.pageGroup == controller.lastGroup}");
            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        this.setCurrentPage = function(page)
        {
            self.scope.mhCurrentPage = page;

            if(self.scope.mhCurrentPage < 1)
            {
                self.scope.mhCurrentPage = 1;
            }
            else if(self.scope.mhCurrentPage > self.scope.mhLastPage)
            {
                self.scope.mhCurrentPage = self.scope.mhLastPage;
            }

            groupPages();

            if(self.scope.mhOnPageSelected != null)
            {
                self.scope.mhOnPageSelected(self.scope.mhCurrentPage);
            }
        }

        function groupPages()
        {
            var pages=[];
            var pagesPerGroup = self.scope.mhPageGroupSize < 1 ? 1 : self.scope.mhPageGroupSize;
            var pagesGroupsCount = self.scope.mhLastPage > 0 ? Math.ceil(self.scope.mhLastPage / pagesPerGroup) : 1;
            var pagePosition =  (self.scope.mhCurrentPage-1) / (pagesGroupsCount*pagesPerGroup);
            var pageGroup = Math.floor(pagePosition * pagesGroupsCount);

            var groupInit = pageGroup * pagesPerGroup;
            var groupEnd = groupInit + pagesPerGroup;

            if(groupEnd > self.scope.mhLastPage)
            {
                groupEnd = self.scope.mhLastPage;
            };

            var i;
            for(i=groupInit; i<groupEnd; i++)
            {
                pages.push(i+1);
            };

            self.scope.mhPages = pages;
            self.groupInitPage = groupInit + 1;
            self.groupLastPage = groupEnd;
            self.pageGroup = pageGroup;
            self.lastGroup = pagesGroupsCount-1;
        }
    }
);