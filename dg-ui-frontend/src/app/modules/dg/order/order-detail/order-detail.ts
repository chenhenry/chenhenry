import * as angular from 'angular';


import {IOrder, IOrderItem, IGood} from "../../model/IDg";
import '../../services/dg';
import dgService from '../../services/dg';

var component = angular.module('app.modules.dg.order.detail', [
    'app.services.dg'
])
    .directive('orderDetail', ['ersModalService', '$location', '$stateParams', 'dgService',
        function(ersModalService, $location, $stateParams, dgService) {
            return {
                replace: true,
                restrict: 'E',
                scope: {},
                bindToController: {},
                controller: function() {
                    var ctrl = this;

                    ctrl.orderDefs = [
                        { headerName: "Name", width: 200, field: "name" },
                        { headerName: "price", width: 90, field: "price", editable:true },
                        { headerName: "Brand", width: 100, field: "brand" },
                        { headerName: "Category", width: 90, field: "category" },
                        { headerName: "Number", width: 90, field: "number", editable:true },
                        { headerName: "Sum", width: 90, field: "sum" }
                    ];


                    ctrl.gridOptions = {
                        checkboxSelection: true,
                        rowSelection: "multiple",
                        columnDefs: ctrl.orderDefs,
                        rowData: [],
                        enableSorting: true,
                        onRowSelected: ctrl.selectOrder,
                        enableFilter: true,
                        editable:true
                    };
                    
                    ctrl.itemColumns = ['Name', 'Price', 'Brand'];
                    ctrl.clientItemColumns = ['Name', 'Wxname'];
                    
                    ctrl.onchangeofclient = function(parameter){
                        ctrl.phone = parameter["phone"];
                        ctrl.address = parameter["address"];
                        ctrl.clientName = parameter["name"] + "(" +parameter["wxname"] + ")";
                        ctrl.clientId = parameter["id"];
                        console.log(ctrl.phone);
                    }
                   
                    ctrl.edit = function(params) {
                        var totalSum = 0
                        for (var i = 0; i < ctrl.gridOptions.rowData.length; i++) {
                            var value = ctrl.gridOptions.rowData[i];
                            var sum = value["price"]*value["number"];
                            value["sum"]=sum;
                            totalSum = totalSum + sum;
                        }
                        ctrl.totalSum = totalSum;
                        ctrl.gridOptions.api.refreshView();
                    }

                    ctrl.addItem = function() {
                        var CLOSE_BUTTON = {
                            label: "Close",
                            escapeChoice: true,
                            defaultChoice: false,
                            commitChoice: false,
                            id: "close",
                            value: "close"
                        };
                        var SAVE_BUTTON = {
                            label: "Save",
                            escapeChoice: false,
                            defaultChoice: true,
                            id: "save",
                            value: "save"
                        };
                        var modalOpts = {
                            instanceTemplate: 'template/createExpression.html',
                            title: "Create  Expression",
                            size: "lg",
                            buttons: [CLOSE_BUTTON, SAVE_BUTTON],
                            onBeforeModalClose: this.saveExpression.bind(this)
                        };

                        this.modalInstance = ersModalService.customDialog(modalOpts, 
                            { "goods": ctrl.goods, 
                                "onchangeofgood": ctrl.onchangeofgood,
                                "price":ctrl.price,
                                "itemColumns":ctrl.itemColumns });
                    };
                    
                    ctrl.onchangeofgood = function(parameter){
                        ctrl.selectedGood = parameter;
                    }
                    ctrl.selectedGoods = [];
                    ctrl.saveExpression = function(parameter) {
                        for (var i = 0; i < ctrl.selectedGood.length; i++) {
                            var value = ctrl.selectedGood[i];
                           value["number"] = 1;
                           value["sum"] = value["price"];
                           ctrl.selectedGoods.push(value);  
                        }
                        
                        ctrl.gridOptions.api.setRowData(ctrl.selectedGoods);
                        ctrl.gridOptions.onRowSelected = ctrl.selectOrder;
                        this.modalInstance.close(parameter);
                    };
                    
                    ctrl.deleteItem = function() {
                        //selectedRows
                        var values = ctrl.gridOptions.api.selectionController.selectedNodesById;
                       for(var value in values){  
                            console.log(value);
                            ctrl.selectedGoods.splice(value,1); 
                        }
                        ctrl.gridOptions.api.setRowData(ctrl.selectedGoods);
                    }



                       ctrl.createOrder = function() {
                           ctrl.edit();
                           ctrl.dgOrderItems = [];
                           for (var i = 0; i < ctrl.gridOptions.rowData.length; i++) {
                            var value = ctrl.gridOptions.rowData[i];
                            console.log(value);
                            var orderItem: IOrderItem = {
                                name: <string>(value["name"]),
                                price: <Number>(value["price"]),
                                goodId: <Number>(value["id"]),
                                number: <Number>(value["number"]),
                                sum: <Number>(value["sum"]),
                                brand: <String>(value["brand"]),
                                category:<String>(value["category"])
                            };
                           console.log(orderItem);
                           ctrl.dgOrderItems.push(orderItem);  
                        }
                        console.log(ctrl.dgOrderItems);
                        var order: IOrder = {
                            clientName: <string>(ctrl.clientName),
                            code: <string>(ctrl.code),
                            totalSum: <Number>(ctrl.totalSum),
                            clientId: <Number>(ctrl.clientId),
                            creator: "atlas",
                            dgOrderItems: ctrl.dgOrderItems,
                            description: <string>(ctrl.description),
                            phone:<string>(ctrl.phone),
                            address:<string>(ctrl.address)
                        };
                        console.log('to create:');
                        console.log(order);

                        dgService.saveOrder(order, () => {
                            alert('Created Order successfully!');

                        }, (error) => {
                            alert('Cannot create Order! Reason: ' + error.data.message);
                        });
                    }
                    
                    ctrl.updateOrder = function(){
                        ctrl.edit();
                           ctrl.dgOrderItems = [];
                           for (var i = 0; i < ctrl.gridOptions.rowData.length; i++) {
                            var value = ctrl.gridOptions.rowData[i];
                            console.log(value);
                            var orderItem: IOrderItem = {
                                name: <string>(value["name"]),
                                price: <Number>(value["price"]),
                                goodId: <Number>(value["id"]),
                                number: <Number>(value["number"]),
                                sum: <Number>(value["sum"]),
                                brand: <String>(value["brand"]),
                                category:<String>(value["category"])
                            };
                           console.log(orderItem);
                           ctrl.dgOrderItems.push(orderItem);  
                        }
                        console.log(ctrl.dgOrderItems);
                        var order: IOrder = {
                            id: ctrl.orderId,
                            clientName: <string>(ctrl.clientName),
                            code: <string>(ctrl.code),
                            totalSum: <Number>(ctrl.totalSum),
                            clientId: <Number>(ctrl.clientId),
                            creator: "atlas",
                            dgOrderItems: ctrl.dgOrderItems,
                            description: <string>(ctrl.description),
                            phone:<string>(ctrl.phone),
                            address:<string>(ctrl.address)
                        };
                        console.log('to create:');
                        console.log(order);

                        dgService.updateOrder(order, () => {
                            alert('Updated Order successfully!');

                        }, (error) => {
                            alert('Cannot update Order! Reason: ' + error.data.message);
                        });
                    }

                    ctrl.init = function() {
                        dgService.getGoodList(function(response) {
                            ctrl.goods = response;
                        }, function(response) {
                            console.log("Error: " + response);
                        });
                        
                        dgService.getClientList(function(response) {
                            ctrl.clients = response;
                        }, function(response) {
                            console.log("Error: " + response);
                        });

                        ctrl.orderId = $stateParams.id;
                        if (ctrl.orderId == undefined || ctrl.orderId == null || ctrl.orderId == "") {
                            ctrl.isCreate = true;
                        } else {
                            ctrl.loadDetail(ctrl.orderId);
                            ctrl.isCreate = false;
                        }

                    }

                    ctrl.loadDetail = function(orderId: String) {
                        var request = dgService.getOrderById(ctrl.orderId,
                            (response) => {
                                ctrl.order = response;
                                ctrl.code = ctrl.order.code;
                                ctrl.totalSum = ctrl.order.totalSum;
                                ctrl.phone = ctrl.order.phone;
                                ctrl.address = ctrl.order.address;
                                dgService.getClientById(ctrl.order.clientId, (result) => {
                                    ctrl.client = result;
                                }, (error) => {
                                    alert(error.data.message);
                                });
                                ctrl.temps = [];
                                console.log(ctrl.order.dgOrderItems);
                                for (var i = 0; i < ctrl.order.dgOrderItems.length; i++) {
                                    var value = ctrl.order.dgOrderItems[i];
                                    console.log(value);
                                    var good = {
                                        name: <string>(value["name"]),
                                        price: <Number>(value["price"]),
                                        brand: <string>(value["brand"]),
                                        sum: <Number>(value["sum"]),
                                        number: <Number>(value["number"]),
                                        category:<string>(value["category"]),
                                        id:<Number>(value["goodId"])
                                    };
                                    ctrl.temps.push(good);  
                                }
                                
                                ctrl.gridOptions.api.setRowData(ctrl.temps);
                            }, (error) => {
                                console.log("Error: " + error);
                            });
                        
                        
                        
                    }



                    ctrl.init();
                },
                controllerAs: 'ctrl',
                template: require('./order-detail.html')
            }
        }]).name;

export = component;
