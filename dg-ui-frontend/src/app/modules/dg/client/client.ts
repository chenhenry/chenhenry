import * as angular from 'angular';


import {IClient} from "../model/IDg";
import '../services/dg';
import dgService from '../services/dg';

var component = angular.module('app.modules.dg.client', [
    'app.services.dg'
])
    .directive('client', ['dgService', function(dgService) {

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
                        headerName: "微信名称",
                        width: 90,
                        field: "wxname"
                    },
                    {
                        headerName: "名称",
                        width: 70,
                        field: "name"
                    },
                    {
                        headerName: "地址",
                        width: 340,
                        field: "address"
                    },
                    {
                        headerName: "电话",
                        field: "phone"
                    }
                ];


                ctrl.gridOptions = {
                    enableColResize: true,
					checkboxSelection: true,
					rowSelection: "multiple",
					columnDefs: ctrl.clientDefs,
					rowData: [],
					enableSorting: true,
					enableFilter: true
                };

                var sortByName = [
                    { colId: 'name', sort: 'desc' }
                ];

                //Attributes
                ctrl.loadAttributes = function() {
                    ctrl.attributesLoading = true;

                    // Create new request to the service
                    attributesRequest = dgService.getClientList(function(response) {
                        ctrl.attributes = response;
                        ctrl.gridOptions.onRowSelected = ctrl.selectClient;
                        ctrl.gridOptions.api.setRowData(response);
                        // Sort data
                        ctrl.gridOptions.api.setSortModel(sortByName);
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
                    if(ctrl.client.id == null){
                        dgService.saveClient(ctrl.client, (result) => {
                            ctrl.isEditing = true;
                            ctrl.loadAttributes();
                        }, (error) => {
                            alert(error.data.message);
                        });
                    }
                    
                    var toupdate = angular.copy(ctrl.client);
                    console.log(toupdate);
                    dgService.updateClient(toupdate, (result) => {
                        ctrl.isEditing = true;
                        ctrl.loadAttributes();
                    }, (error) => {
                        alert(error.data.message);
                    });
                }

                ctrl.enableEdit = function() {
                    ctrl.isEditing = true;
                    ctrl.originClient = angular.copy(ctrl.client);
                }

                ctrl.cancelEdit = function() {
                    ctrl.isEditing = true;
                    console.log(ctrl.originClient);
                    angular.copy(ctrl.originClient, ctrl.client);
                }


                // Init
                ctrl.loadAttributes();
                ctrl.isEditing = true;
            },
            controllerAs: 'ctrl',
            template: require('./client.html')
        }
    }]).name;

export = component;
