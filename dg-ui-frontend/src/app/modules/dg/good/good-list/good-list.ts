import * as angular from 'angular';


import {IGood} from "../../model/IGood";
import {IGoodResource} from "../../resource/IGoodResource";
import '../../services/good';
import goodService from '../../services/good';

var component = angular.module('app.modules.dg.good.list', [
    'app.modules.dg.services.good'
])
    .directive('goodList', ['goodService', function(goodService) {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {
                var ctrl = this;

                var attributesRequest: angular.IPromise<any>;

                ctrl.goodDefs = [
                    {
                        headerName: "Name",
                        field: "name"
                    },
                    {
                        headerName: "salePrice",
                        field: "salePrice"
                    }, 
                    {
                        headerName: "Description",
                        field: "description"
                    }
                ];


                ctrl.gridOptions = {
                    checkboxSelection: true,
                    rowSelection: 'simple',
                    columnDefs: ctrl.goodDefs,
                    rowData: [],
                    enableSorting: true,
                    onRowSelected: ctrl.selectGood
                };

                //Attributes
                ctrl.loadAttributes = function() {
                    ctrl.attributesLoading = true;


                    // Cancel previous request
                    if (attributesRequest) {
                        goodService.cancelRequest(attributesRequest);
                    }




                    // Create new request to the service
                    attributesRequest = goodService.getGoodList(function(response) {
                        ctrl.attributes = response;
                        ctrl.gridOptions.api.setRowData(response);
                        ctrl.gridOptions.onRowSelected = ctrl.selectGood;
                        ctrl.attributesLoading = false;
                    }, function(response) {
                        console.log("Error: " + response);
                    });

                };

                ctrl.loadAttributes();
            },
            controllerAs: 'ctrl',
            template: require('./good-list.html')
        }
    }]).name;

export = component;
