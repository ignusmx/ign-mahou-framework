/**
 * @class MHPaginatorCtrl
 * @memberof Controllers
 * @classdesc
 * controller used by {@link Directives.mhPaginator mhPaginator} directive to compile and bind events to create a fully functional paginator.
 * @description
 * #### ** Directive: ** {@link Directives.mhPaginator mhPaginator}
 *
 * @property {object}           scope                          - Isolated scope.
 * @property {number}           scope.mhPageGroupSize          - The number of pages per group.
 * @property {number}           scope.mhCurrentPage            - Current active page.
 * @property {number}           scope.mhLastPage               - Last available page.
 * @property {number}           scope.mhClassActive            - Class to be used for active elements.
 * @property {number}           scope.mhClassDisabled          - Class to be used for disabled elements.
 * @property {Function}         scope.mhOnPageSelected         - Function to be called when a page is selected.
 * @property {number}           groupInitPage                  - Holds the first page of the current group.
 * @property {number}           groupLastPage                  - Holds the last page of the current group.
 * @property {number}           pageGroup                      - Holds the number of the current group.
 * @property {number}           lastGroup                      - Holds the number of the last group.
 */
angular
.module('ign.Mahou')
.controller('MHPaginatorCtrl', 
    function MHPaginatorCtrl($scope, $element, $attrs, $compile)
    {
        var self = this;
        self.scope = $scope;
        self.groupInitPage = 0;
        self.groupLastPage = 0;
        self.pageGroup = 0;
        self.lastGroup = 0;

        /** @function compileTemplate
         * @memberof Controllers.MHPaginatorCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;
            
            groupPages();
            var pageButtonContainer = templateElem.find(".mh-page-button-container");
            pageButtonContainer.attr("ng-repeat", "page in mhPages");
            pageButtonContainer.attr("ng-class", "{'"+self.scope.mhClassActive+"' : page == mhCurrentPage}");
            pageButtonContainer.find(".mh-title").html("{{page}}");
            pageButtonContainer.find(".mh-page-button").attr("ng-click", "controller.setCurrentPage(page)");

            templateElem.find(".mh-prev-button").attr("ng-click", "controller.pageGroup > 0 && controller.setCurrentPage(controller.groupInitPage - 1)");
            templateElem.find(".mh-next-button").attr("ng-click", "controller.pageGroup < controller.lastGroup && controller.setCurrentPage(controller.groupLastPage + 1)");

            templateElem.find(".mh-prev-button-container").attr("ng-class", "{'"+self.scope.mhClassDisabled+"' : controller.pageGroup === 0}");
            templateElem.find(".mh-next-button-container").attr("ng-class", "{'"+self.scope.mhClassDisabled+"' : controller.pageGroup == controller.lastGroup}");
            
            directiveElem.append(templateElem);
            $compile(directiveElem.contents())(scope);
        }

        /** @function setCurrentPage
         * @memberof Controllers.MHPaginatorCtrl
         * @instance
         * @param page {number} number of the new page to be set.
         * @returns {void} Nothing
         * @description changes the paginator to a new page, recalculates current group and updates UI to reflect the changes.
         */
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
        }

        //PRIVATE
        function groupPages()
        {
            self.scope.mhLastPage = self.scope.mhLastPage || 1;
            self.scope.mhCurrentPage = self.scope.mhCurrentPage < 1 || self.scope.mhCurrentPage == null ? 1 : self.scope.mhCurrentPage;

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
            }
            
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

        function onCurrentPageUpdated()
        {
            groupPages();

            if(self.scope.mhOnPageSelected != null)
            {
                self.scope.mhOnPageSelected({page : self.scope.mhCurrentPage});
            }
        }

        $scope.$watch("mhLastPage", 
        function( newValue, oldValue ) 
        {
            groupPages();
        });

        $scope.$watch("mhCurrentPage", 
        function( newValue, oldValue ) 
        {
            onCurrentPageUpdated(newValue);
        });
    }
);