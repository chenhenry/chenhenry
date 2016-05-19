import * as angular from 'angular';


import {IClient} from "../model/IClient";
import {IClientResource} from "../resource/IClientResource";
import '../services/client';
import clientService from '../services/client';

var component = angular.module('app.modules.dg.client', [
    'app.modules.dg.services.client'
])
    .directive('client', ['clientService', function(clientService) {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {
                var ctrl = this;

                var attributesRequest: angular.IPromise<any>;

                ctrl.clientDefs = [
                    {
                        headerName: "名称",
                        field: "name"
                    },
                    {
                        headerName: "地址",
                        field: "address"
                    },
                    {
                        headerName: "电话",
                        field: "phone"
                    }
                ];


                ctrl.gridOptions = {
                    checkboxSelection: true,
                    rowSelection: 'simple',
                    columnDefs: ctrl.clientDefs,
                    rowData: [],
                    onRowSelected: ctrl.selectClient
                };

                //Attributes
                ctrl.loadAttributes = function() {
                    ctrl.attributesLoading = true;


                    // Cancel previous request
                    if (attributesRequest) {
                        clientService.cancelRequest(attributesRequest);
                    }




                    // Create new request to the service
                    attributesRequest = clientService.getClientList(function(response) {
                        ctrl.attributes = response;
                        ctrl.gridOptions.api.setRowData(response);
                        ctrl.gridOptions.onRowSelected = ctrl.selectClient;
                        ctrl.attributesLoading = false;
                    }, function(response) {
                        console.log("Error: " + response);
                    });

                };

                ctrl.selectClient = function(params) {
                    // Save selected datasource
                    ctrl.client = params.node.data;
                };

                ctrl.submit = function() {
                    var toupdate = angular.copy(ctrl.client);
                    console.log(toupdate);
                    clientService.updateClient(toupdate, (result) => {
                        ctrl.isEditing = false;
                    }, (error) => {
                        alert(error.data.message);
                    });
                }

                ctrl.enableEdit = function() {
                    ctrl.isEditing = true;
                    ctrl.originClient = angular.copy(ctrl.client);
                }

                ctrl.cancelEdit = function() {
                    ctrl.isEditing = false;
                    console.log(ctrl.originClient);
                    angular.copy(ctrl.originClient, ctrl.client);
                }


                // Init
                ctrl.loadAttributes();
                ctrl.isEditing = false;
            },
            controllerAs: 'ctrl',
            template: require('./client.html')
        }
    }]).name;

export = component;
