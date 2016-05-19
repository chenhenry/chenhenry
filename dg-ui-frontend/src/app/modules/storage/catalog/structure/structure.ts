import * as angular from 'angular';
import {IDataAsset} from "../../model/IDataAsset";
import '../../services/dataasset';
import dataAssetService from '../../services/dataasset';

var component = angular.module('app.modules.storage.catalog.structure', [
    'app.services.dataasset'
])
    .directive('structure', ['$location', '$stateParams', 'dataassetService', function($location, $stateParams, dataassetService) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                var ctrl = this;

                ctrl.structuresColumnDefs = [
                    {
                        headerName: "Label",
                        field: "name"
                    },
                    {
                        headerName: "Position",
                        cellStyle: { textAlign: "center" },
                        field: "index"
                    },
                    {
                        headerName: "Data Type",
                        field: "type"
                    },
                    {
                        headerName: "Data Format",
                        field: "files"
                    },
                    { 
                        headerName: "Description",
                        field: "structure"
                    }
                ];

                ctrl.fileDefs = [
                    {
                        headerName: "File Name",
                        cellRenderer: (param) => {
                            return param.data.dataSetComp.dataSet;
                        }
                    },
                    {
                        headerName: "Path",
                        width: 700,
                        cellRenderer: (param) => {
                            return param.data.dataSetComp.path;
                        }
                    }
                ];

                ctrl.selectDataStructure = function(params) {

                };

                ctrl.assignedFiles = function(params) {
                    ctrl.loadDetail(ctrl.selectedDataSource, ctrl.structure_name);
                };

                ctrl.structureConfig = function(params) {
                };

                ctrl.refresh = function() {
                    ctrl.loadDetail(ctrl.selectedDataSource, ctrl.structure_name);
                }

                ctrl.assignOtherStructure = function() {
                    ctrl.loadDetail(ctrl.selectedDataSource, ctrl.structure_name);
                }

                ctrl.deleteDataAsset = function() {
                    var r = confirm("Are you sure to delete the structure?");
                        if (r == true) {
                         
                            dataassetService.deleteDataAsset(ctrl.selectedDataSource, ctrl.structure_name,
                                (result) => {
                                    console.log("Delete structure successfully!");
                                    $location.path('/storage/catalog/unstructuredfiles/' + ctrl.selectedDataSource);
                                }, (error) => {
                                    console.log("Cannot delete structure! Reason: " + error.data.message);
                                    $location.path('/storage/catalog/unstructuredfiles/' + ctrl.selectedDataSource);
                                });
                        }
                }

                ctrl.removeAssignedStructure = function() {
                    var values = ctrl.gridFileOptions.api.selectionController.selectedRows;

                    if(values.length == 0){
                        console.log("No files selected!");
                        return;
                    }
                    var linkIds = [];
                    for (var i = 0; i < values.length; i++) {
                        linkIds[i] = values[i].id;
                    }
                    
                    dataassetService.unassignDataAssetLinks(ctrl.selectedDataSource, ctrl.structure_name, linkIds.join(","),
                        (result) => {
                            console.log("Remove files successfully!");
                            ctrl.loadDetail(ctrl.selectedDataSource, ctrl.structure_name);
                        }, (error) => {
                            console.log("An error occured during remove files");
                        });
                };


                ctrl.loadDetail = function(sourceName:String, dataAssetName: String) {
                    var request = dataassetService.getDataAssetDetail(sourceName, dataAssetName,
                        (response) => {
                          
                            ctrl.structure = response;
                            if (ctrl.structure.type != "ORACLE") {
                                ctrl.isDataLake = true;
                                
                                response.structure.recordDelimiter = response.structure.recordDelimiter.replace('\r', '\\r').replace('\n','\\n');
                                console.log(response.structure.recordDelimiter);
                            } else {
                                ctrl.isDataLake = false;
                               
                            }

                            ctrl.gridOptions.api.setRowData(response["fields"]);
                            // ctrl.gridFileOptions.api.setRowData(response["links"]);
                            dataassetService.getAssignedLinks(sourceName, dataAssetName,
                                (response) => {
                                    ctrl.gridFileOptions.api.setRowData(response);
                                }, (error) => {
                                    console.log("Error: " + error);
                                });
                        }, (error) => {
                            console.log("Error: " + error);
                        });
                }

                ctrl.init = function() {
                    ctrl.structure_name = $stateParams.structureName;
                    ctrl.selectedDataSource = $stateParams.sourceName;
                    ctrl.gridOptions = {
                        checkboxSelection: true,
                        rowSelection: 'simple',
                        columnDefs: ctrl.structuresColumnDefs,
                        rowData: [],
                        onRowSelected: ctrl.selectDataStructure
                    };
                    ctrl.gridFileOptions = {
                        checkboxSelection: true,
                        rowSelection: 'multiple',
                        columnDefs: ctrl.fileDefs,
                        rowData: []
                    };
                    ctrl.loadDetail(ctrl.selectedDataSource, ctrl.structure_name);
                };
                
                ctrl.enableEdit = function() {
                    ctrl.isEditing = true;
                    ctrl.originStructure = angular.copy(ctrl.structure);
                }
                
                ctrl.cancelEdit = function() {
                    ctrl.isEditing = false;
                    console.log(ctrl.originStructure);
                    angular.copy(ctrl.originStructure, ctrl.structure);
                }

                ctrl.init(); 
                ctrl.submit = function () {
                    var toupdate = angular.copy(ctrl.structure);
                    toupdate.structure.recordDelimiter = ctrl.structure.structure.recordDelimiter.replace('\\r', '\r').replace('\\n','\n');
                    console.log(toupdate);
                    dataassetService.updateDataAssetSummary(toupdate, (result) => {
                        ctrl.isEditing = false;
                    }, (error)=>{
                        alert(error.data.message);
                    });
                }
                
                ctrl.isEditing = false;
            }],
            controllerAs: 'ctrl',
            template: require('./structure.html')
        }
    }]).name;

export = component;
