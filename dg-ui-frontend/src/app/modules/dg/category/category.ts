import * as angular from 'angular';


import {ICategory} from "../model/IDg";
import '../services/dg';
import dgService from '../services/dg';

var component = angular.module('app.modules.dg.category', [
    'app.services.dg'
])
    .directive('category', ['dgService', function(dgService) {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {
                var ctrl = this;

                var attributesRequest: angular.IPromise<any>;

                ctrl.categoryDefs = [
                    {
                        headerName: "名称",
                        width: 170,
                        field: "name"
                    }
                ];


                ctrl.gridOptions = {
                    enableColResize: true,
					checkboxSelection: true,
					rowSelection: "multiple",
					columnDefs: ctrl.categoryDefs,
					rowData: [],
					enableSorting: true,
					enableFilter: true
                };

                var sortByName = [
                    { colId: 'name', sort: 'desc' }
                ];
                
                 ctrl.goodDefs = [
                    { headerName: "Name", width: 200, field: "name" },
                    { headerName: "price", width: 90, field: "price" },
                    { headerName: "Brand", width: 100, field: "brand" },
                    { headerName: "Category", width: 90, field: "category" },
                    { headerName: "People", width: 90, field: "people" },
                    { headerName: "HK Min Price", width:110, 
                      cellRenderer: (param) => {
                           var dgGoodHkPrices  = param.data.dgGoodHkPrices;
                           var a = [];
                           for(var i = 0; i < dgGoodHkPrices.length; i++){
                               a[i] = dgGoodHkPrices[i].price;
                           }
                            return Math.min.apply(null, a).toFixed(2);
                        } },
                    { headerName: "TB Avg Price", width:110, 
                      cellRenderer: (param) => {
                            var dgGoodTbPrices  = param.data.dgGoodTbPrices;
                           var sum = 0;
                           for(var i = 0; i < dgGoodTbPrices.length; i++){
                               sum += dgGoodTbPrices[i].price;
                           }
                            return (sum/dgGoodTbPrices.length).toFixed(2);
                        } },
                        { headerName: "TB Max Price", width: 110, 
                      cellRenderer: (param) => {
                            var dgGoodTbPrices  = param.data.dgGoodTbPrices;
                          var a = [];
                           for(var i = 0; i < dgGoodTbPrices.length; i++){
                               a[i] = dgGoodTbPrices[i].price;
                           }
                            return Math.max.apply(null, a).toFixed(2);
                        } }
                ];


                ctrl.gridOptionsOfGood = {
                    checkboxSelection: true,
                    rowSelection: "multiple",
                    columnDefs: ctrl.goodDefs,
                    rowData: [],
                    enableSorting: true,
                    onRowSelected: ctrl.selectGood,
                    enableFilter: true
                };
                

                //Attributes
                ctrl.loadAttributes = function() {
                    ctrl.attributesLoading = true;

                    // Create new request to the service
                    attributesRequest = dgService.getCategoryList(function(response) {
                        ctrl.attributes = response;
                        ctrl.gridOptions.onRowSelected = ctrl.selectCategory;
                        ctrl.gridOptions.api.setRowData(response);
                        // Sort data
                        ctrl.gridOptions.api.setSortModel(sortByName);
                        ctrl.attributesLoading = false;
                    }, function(response) {
                        console.log("Error: " + response);
                    });

                };

                ctrl.selectCategory = function(params) {
                    ctrl.category = params.node.data;
                    dgService.getGoodListByCategory(ctrl.category.name, function(response) {
                        ctrl.gridOptionsOfGood.api.setRowData(response);
                    }, function(response) {
                        console.log("Error: " + response);
                    });
                };

                ctrl.submit = function() {
                    if(ctrl.category.id == null){
                        dgService.saveCategory(ctrl.category, (result) => {
                            ctrl.isEditing = true;
                            ctrl.loadAttributes();
                            ctrl.category = null;
                        }, (error) => {
                            alert(error.data.message);
                        });
                    }
                    var toupdate = angular.copy(ctrl.category);
                    console.log(toupdate);
                    dgService.updateCategory(toupdate, (result) => {
                        ctrl.isEditing = true;
                        ctrl.loadAttributes();
                    }, (error) => {
                        alert(error.data.message);
                    });
                }

                ctrl.enableEdit = function() {
                    ctrl.isEditing = true;
                    ctrl.originCategory = angular.copy(ctrl.category);
                }

                ctrl.cancelEdit = function() {
                    ctrl.isEditing = true;
                    console.log(ctrl.originCategory);
                    angular.copy(ctrl.originCategory, ctrl.category);
                }


                // Init
                ctrl.loadAttributes();
                ctrl.isEditing = true;
            },
            controllerAs: 'ctrl',
            template: require('./category.html')
        }
    }]).name;

export = component;
