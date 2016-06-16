import * as angular from 'angular';


import {IGood} from "../../model/IDg";
import '../../services/dg';
import dgService from '../../services/dg';

var component = angular.module('app.modules.dg.good.list', [
    'app.services.dg'
])
    .directive('goodList', ['$location', '$stateParams', 'dgService', function($location, $stateParams, dgService) {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                var ctrl = this;

                var attributesRequest: angular.IPromise<any>;

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


                ctrl.gridOptions = {
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
                    attributesRequest = dgService.getGoodList(function(response) {
                        ctrl.attributes = response;
                        ctrl.gridOptions.api.setRowData(response);
                        ctrl.gridOptions.onRowSelected = ctrl.selectGood;
                        ctrl.attributesLoading = false;
                    }, function(response) {
                        console.log("Error: " + response);
                    });

                };

                ctrl.selectGood = function(params) {
                    // Save selected datasource
                    ctrl.good = params.node.data;
                    $location.path('/dg/good/detail/' + ctrl.good.id);
                }

                ctrl.addGood = function() {
                    $location.path('/dg/good/detail/');
                }

                

                ctrl.loadAttributes();
            }],
            controllerAs: 'ctrl',
            template: require('./good-list.html')
        }
    }]).name;

export = component;
