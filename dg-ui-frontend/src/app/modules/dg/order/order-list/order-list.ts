import * as angular from 'angular';


import {IOrder} from "../../model/IDg";
import '../../services/dg';
import dgService from '../../services/dg';

var component = angular.module('app.modules.dg.order.list', [
    'app.services.dg'
])
    .directive('orderList', ['$location', '$stateParams', 'dgService', function($location, $stateParams, dgService) {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                var ctrl = this;

                var attributesRequest: angular.IPromise<any>;

                ctrl.orderDefs = [
                    { headerName: "Code", width: 100, field: "code" },
                    { headerName: "Name(WxName)", width: 150, field: "clientName" },
                    { headerName: "CreateTime", width: 100, 
                        cellRenderer: (param) => {
                            var createTime  = param.data.createTime;
                            var date = new Date(createTime);
                            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                        }},
                    { headerName: "TotalSum", width: 100, field: "totalSum" },
                    { headerName: "Phone", width: 100, field: "phone" },
                    { headerName: "Address", width: 300, field: "address" }
                ];


                ctrl.gridOptions = {
                    checkboxSelection: true,
                    rowSelection: "multiple",
                    columnDefs: ctrl.orderDefs,
                    rowData: [],
                    enableSorting: true,
                    onRowSelected: ctrl.selectOrder,
                    enableFilter: true
                };

                //Attributes
                ctrl.loadAttributes = function() {
                    ctrl.attributesLoading = true;

                    // Create new request to the service
                    attributesRequest = dgService.getOrderList(function(response) {
                        ctrl.attributes = response;
                        ctrl.gridOptions.api.setRowData(response);
                        ctrl.gridOptions.onRowSelected = ctrl.selectOrder;
                        ctrl.attributesLoading = false;
                    }, function(response) {
                        console.log("Error: " + response);
                    });

                };

                ctrl.selectOrder = function(params) {
                    ctrl.order = params.node.data;
                    $location.path('/dg/order/detail/' + ctrl.order.id);
                }

                ctrl.addOrder = function() {
                    $location.path('/dg/order/detail/');
                }

                ctrl.loadAttributes();
            }],
            controllerAs: 'ctrl',
            template: require('./order-list.html')
        }
    }]).name;

export = component;
