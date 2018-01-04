/**
 * @class MHDatagridCtrl
 * @memberof Controllers
 * @classdesc
 * Controller used by {@link Directives.mhDatagrid mhDatagrid} directive to compile and bind events to create a fully functional datagrid.
 * @description
 * #### ** Directive: ** {@link Directives.mhDatagrid mhDatagrid}
 *
 * @property {object}                 scope                                     - Isolated scope.
 * @property {boolean}                scope.mhEnableRowSelect                   - shows checkboxs and enable row selection. 
 * @property {MHDatagridCol[]}        scope.mhCols                              - An array of {@link UIElements.MHDatagridCol MHDatagridCol} to be used for display content.
 * @property {Object[]}               scope.mhCollection                        - an array of objects to be displayed on the datagrid.
 * @property {Function}               scope.mhSelectAllChange                   - callback action to be executed when "select all" checkbox is selected.
 * @property {Function}               scope.mhSelectRowChange                   - callback action to be executed when single row checkbox is selected.
 * @property {boolean}                allRowsSelected                           - true when all rows checkboxes are selected, false otherwise.
 * @property {object[]}               selectedRows                              - keeps the list of the selected rows (updated eachtime a checkbox is selected).
 * @property {object[]}               internalCollection                        - An internal collection used to keep all rows so we can mark them as selected without modifying the models of the original mhCollection.
 * @property {object}                 row                                       - A single row inside the internalCollection. 
 * @property {boolean}                row.selected                              - True if the row is currently selected, false otherwise.
 * @property {object}                 row.model                                 - A reference to the model of the original mhCollection.
 */
angular
.module('ign.Mahou')
.controller('MHDatagridCtrl', 
    function MHDatagridCtrl($scope, $element, $attrs, $compile, $state) 
    {
        var self = this;
        self.scope = $scope;
        self.allRowsSelected = false;
        self.collection = $scope.mhCollection;
        self.selectedRows = [];
        self.internalCollection = [];

        for(var i = 0; i < this.collection.length; i++)
        {
            this.internalCollection.push({ selected : false, model : this.collection[i]});
        }

        $scope.$watchCollection("mhCollection", 
            function( newCollection, oldCollection ) 
            {
                var tempInternalCollection = [];
                for(var i = 0; i < newCollection.length; i++)
                {
                    var existingRow = null;
                    for(var j = 0; j < self.internalCollection.length; j++)
                    {
                        var internalRow = self.internalCollection[j];
                        var internalModel = internalRow.model;
                        if(internalModel === newCollection[i])
                        {
                            existingRow = internalRow;
                            break;
                        }
                    }

                    if(existingRow == null)
                    {
                        tempInternalCollection.push({ selected : false, model : newCollection[i]});
                    }
                    else
                    {
                        tempInternalCollection.push(existingRow);
                    }
                }

                self.internalCollection  = tempInternalCollection;
                updateAllRowsSelected();
            });
        
        /** @function toggleSelectAll
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @returns {void} Nothing
         * @description selects or unselects all rows in the internalCollection and triggers the mhSelectAllChange if exists.
         */
        this.toggleSelectAll = function()
        {
            if(self.allRowsSelected)
            {
                self.selectedRows = [];
                for(var i=0; i< self.internalCollection.length; i++)
                {
                    self.selectedRows.push(self.internalCollection[i]);
                }
            }
            else
            {
                self.selectedRows = [];
            }

            for(var i = 0; i < self.internalCollection.length; i++)
            {
                self.internalCollection[i].selected = self.allRowsSelected;
            }

            $scope.mhSelectAllChange({selectedRows : self.selectedRows});
        }

        /** @function toggleRowSelect
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @param row {object} the row selected.
         * @returns {void} Nothing
         * @description adds a row to the selectedRows array and triggers the mhSelectRowChange callback if exists.
         */
        this.toggleRowSelect = function(row)
        {
            if(row.selected)
            {
                self.selectedRows.push(row);
            }
            else
            {
                var index = self.selectedRows.indexOf(row);
                self.selectedRows.splice(index,1);
            }

            updateAllRowsSelected();
            $scope.mhSelectRowChange({row:row});
        }

        /** @function compileTemplate
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @param templateElem {Object} jQuery element with the template provided by the theme directive.
         * @param directiveElem {Object} default jQuery element created for this directive which will be replaced with theme template.
         * @returns {void} Nothing
         * @description compiles the directive theme and setups all elements (this method should be called from the theme directive itself).
         */
        this.compileTemplate = function(templateElem, directiveElem)
        {
            var scope = self.scope;

            //retrieve elements to be cloned
            var headersContainer = templateElem.find(".mh-datagrid-headers-container");
            var header = headersContainer.find(".mh-datagrid-header");
            header.remove();

            var row = templateElem.find(".mh-datagrid-row");
            var cell = row.find(".mh-datagrid-cell");
            cell.remove();

            var cellContent = cell.find(".mh-cell-content");
            cellContent.remove();

            var cellButtonsContainer = cell.find(".mh-cell-buttons-container")
            cellButtonsContainer.remove();

            var cellButton = cellButtonsContainer.find(".mh-button");
            cellButton.remove();


            //validate colTypes:
            for(var i = 0; i < scope.mhCols.length; i++)
            {
                var col = scope.mhCols[i];
                MHValidationHelper.validateType(col, col.name, MHDatagridCol);

                var colHeader = header.clone();
                colHeader.find(".mh-title").attr("mh-compile","mhCols["+i+"].title");
                colHeader.attr("ng-show","mhCols["+i+"].visible !== false");
                headersContainer.append(colHeader);

                var colCell = cell.clone();
                if(col.content instanceof Array)
                {
                    var colCellButtonsContainer = cellButtonsContainer.clone();

                    for(var j = 0; j < col.content.length; j++)
                    {
                        var button = col.content[j];
                        MHValidationHelper.validateType(button, button.name, MHButton);
                        var colCellButton = cellButton.clone();
                        MHDecorator.decorateEltCSS(colCellButton, button.cssClasses, button.styles);
                        colCellButton.attr("data-mh-name", button.name);
                        colCellButton.attr("ng-click", "controller.executeStateOrAction(mhCols["+i+"].content["+j+"].action, row.model)");
                        colCellButton.find(".mh-title").attr("mh-compile", "mhCols["+i+"].content["+j+"].title");
                        colCellButtonsContainer.append(colCellButton);
                    }

                    colCell.append(colCellButtonsContainer);
                }
                else
                {
                    var colCellContent = cellContent.clone();
                    colCellContent.attr("mh-compile", "mhCols["+i+"].content");
                    colCell.append(colCellContent);
                }

                colCell.attr("ng-show","mhCols["+i+"].visible !== false");
                row.append(colCell);
            }

            var checkboxHeader = templateElem.find(".mh-datagrid-checkbox-header");
            checkboxHeader.attr("ng-if","mhEnableRowSelect !== false");

            var selectAllCheckbox = templateElem.find(".mh-input");
            selectAllCheckbox.attr("ng-change","controller.toggleSelectAll()");
            selectAllCheckbox.attr("ng-model","controller.allRowsSelected");
            selectAllCheckbox.attr("ng-show", "controller.internalCollection.length > 0");

            var row = templateElem.find(".mh-datagrid-row");
            row.attr("ng-repeat", "row in controller.internalCollection");

            var checkboxCell = templateElem.find(".mh-datagrid-checkbox-cell");
            checkboxCell.attr("ng-if","mhEnableRowSelect !== false");

            var rowCheckbox = templateElem.find(".mh-datagrid-row-checkbox");
            rowCheckbox.attr("ng-change","controller.toggleRowSelect(row)");
            rowCheckbox.attr("ng-model", "row.selected");            

            directiveElem.replaceWith($compile(templateElem)(scope));
        }

        /** @function executeStateOrAction
         * @memberof Controllers.MHDatagridCtrl
         * @instance
         * @param action {function | string} the action to execute or state to transition
         * @returns {void} Nothing
         * @description executes a function or transitions to an ui-router state
         */
        this.executeStateOrAction = function(action, model)
        {
            if(typeof(action) == "string")
            {
                $state.go(action);
            }
            else if(typeof(action) == "function")
            {
                action(model);
            }
        }

        //private functions
        function updateAllRowsSelected()
        {
            if(self.selectedRows.length == self.internalCollection.length)
            {
                self.allRowsSelected = true;
            }
            else
            {
                self.allRowsSelected = false;
            }
        }
    }
);