import * as angular from 'angular';
import DataAssetService from '../../services/dataasset';
import {IDataAsset, IDataAssetField, IDataAssetStructure, IDatasetField} from "../../model/IDataAsset";

'use strict';

var CreateStructureModalController = ['$scope', '$uibModalInstance', 'data', function ($scope, $uibModalInstance, data) {
    var name = data.dataSet;
    var idx = name.lastIndexOf('.');
    if (idx != -1) {
        name = name.substr(0, idx);
    }

    var structure = data.structure;

    var recordDelimiterStr = structure.record_delimiter;
    //change the line separator to its displaying form.
    recordDelimiterStr = recordDelimiterStr.replace('\r', '\\r').replace('\n', '\\n');

    $scope.newStructure = {
        name: name,
        description: "",
        fileFormat: structure.format,
        valueSeparator: structure.value_delimiter,
        decimalSeparator: structure.decimal_separator,
        fieldSeparator: structure.field_separator,
        recordSeparator: recordDelimiterStr,
        dateFormat: structure.date_format,
        header: structure.has_headers ? 1 : 0
    }

    $scope.ok = function (redirect) {
        $scope.newStructure.recordSeparator = $scope.newStructure.recordSeparator.replace('\\r','\r').replace('\\n','\n'),
        $uibModalInstance.close({ redirect: redirect, data: $scope.newStructure});
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}];

var AssignStructureModalController = ['$scope', '$uibModalInstance', 'items', function ($scope, $uibModalInstance, items) {

    $scope.submit = function (redirect) {
        console.log('form submitted');
        dataassetService.assignDataAssetLink($scope.structureSelected.sourceName, $scope.structureSelected.name, selectedFiles, () => {
            alert("Assigned File successfully!");
            $scope.ok(redirect);
        }, (error) => {
            console.log("Error: " + error.data.message);
            alert("Cannot assigne file! Reason: " + error.data.message);
        });
    }

    $scope.ok = function (redirect) {
        $uibModalInstance.close({ redirect: redirect, data: $scope.structureSelected });
    }

    $scope.cancel = function () {
        console.log("window canceled");
        $uibModalInstance.dismiss('cancel');
    }

    $scope.structureChanged = function (structureSelected: Object) {
        $scope.structureSelected = structureSelected;
    }

    $scope.type = items.type;
    var selectedFiles = items.selectedFiles;
    var selectedSourceName = items.selectedSourceName;
    var dataassetService: DataAssetService = items.dataassetService;

    var loadStructures = function () {
        //send request to get structures
        dataassetService.getDataAssetListBySourceNameAndType(selectedSourceName, $scope.type, (result) => {
            $scope.structures = result;
        }, (error) => {
            console.log("Error: " + error);
        });

    }

    loadStructures();
}];


var component = angular.module('app.modules.storage.catalog.unstructuredfiles', [
    'app.services.dataasset',
    'ui.bootstrap'
])
    .directive('unstructuredfiles', ['$stateParams', 'dataassetService', '$location', function ($stateParams, dataassetService: DataAssetService, $location) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: ['$compile', '$scope', '$uibModal', function ($compile, $scope, $uibModal) {
                var ctrl = this;

                ctrl.showWorkspace = true;
                ctrl.selectedSourceName = $stateParams.sourceName;
                ctrl.loadColumnDefs = function (showWorkspace) {
                    return [
                        {
                            headerName: "Type",
                            field: "",
                            width: 50,
                            cellStyle: {
                                "text-align": "center"
                            },
                            cellRenderer: (param) => {
                                var icon = showWorkspace ? "folder" : "preview";
                                return $compile("<ers-icon name='" + icon + "'></ers-icon>")($scope)[0];
                            }
                        },
                        {
                            headerName: "Name",
                            width: 1500,
                            cellRenderer: (param) => {
                                return showWorkspace ? param.data.path : param.data.dataSetComp.dataSet;
                            }
                        }
                    ]
                };

                ctrl.loadGridOption = function (showWorkspace) {
                    return {
                        checkboxSelection: true,
                        rowSelection: 'multiple',
                        // enableRowSelection: false,  // no useful
                        columnDefs: ctrl.loadColumnDefs(showWorkspace),
                        rowData: [],
                        enableColResize: true,                  
                        // beforeSelectionChange: function (rowItem, event) {
                        //     alert("beforeSelectionChange");
                        //     return false;
                        // },
                        onRowSelected: ctrl.selectRow
                    };
                };

                ctrl.loadDatasets = function () {
                    // var selectedSourceName = ctrl.selectedSourceName;
                    dataassetService.getAassignedFiles(ctrl.selectedSourceName, ctrl.selectedWorkspace.id,
                        (result) => {
                            ctrl.gridOptionsDataSet.rowData = result;
                            if (angular.isDefined(ctrl.gridOptionsDataSet.api)) {
                                ctrl.gridOptionsDataSet.api.setRowData(result);
                            }
                        }, (error) => {
                            console.log("Error: " + error);
                        }
                    );
                    ctrl.gridOptionsDataSet.rowData = ctrl.datasetRowData;
                }

                ctrl.initDatasetsGrid = function () {
                    ctrl.showWorkspace = false;
                    ctrl.gridOptionsDataSet = ctrl.loadGridOption(ctrl.showWorkspace);
                    ctrl.loadDatasets();
                }

                ctrl.selectRow = function (params) {
                    if (ctrl.showWorkspace) {
                        // Save selected structure
                        ctrl.selectedWorkspace = params.node.data;
                        ctrl.initDatasetsGrid();
                    } else {
                        var type = getFileExtensionType(params.node.data.dataSetComp.dataSet);
                        if (ctrl.gridOptionsDataSet.api.getSelectedRows().length == 0) {
                            ctrl.selectedDataSetType = type;
                        }
                    }
                }

                function getFileExtensionType(dataset) {
                    return dataset.substr(dataset.lastIndexOf(".") + 1).toUpperCase();
                }

                ctrl.selectOnlyOneRow = function () {
                    if (!ctrl.gridOptionsDataSet || !ctrl.gridOptionsDataSet.api) return "disabled";
                    var flag = (ctrl.gridOptionsDataSet.api.getSelectedRows().length == 1) ? "" : "disabled";
                    return flag;
                }

                ctrl.workspaceChanged = function (workspaceSelected: Object) {
                    ctrl.selectedWorkspace = workspaceSelected;
                    ctrl.loadDatasets();
                }


                ctrl.loadWorkspaces = function () {

                    // Send Request to get all Workspaces
                    dataassetService.getWorkspaces(ctrl.selectedSourceName, (result) => {
                        ctrl.workspaces = result;
                        ctrl.gridOptionsWorkspace.rowData = result;
                        if (angular.isDefined(ctrl.gridOptionsWorkspace.api)) {
                            ctrl.gridOptionsWorkspace.api.setRowData(result);
                        }
                    }, (error) => {
                        console.log("Error: " + error);
                    });

                }

                ctrl.showCreateStructureModal = function () {

                    var selected = ctrl.gridOptionsDataSet.api.getSelectedRows()[0];

                    dataassetService.getDatasetStructure(selected.dataSetComp, (_structure) => {
                        console.log('structure of dataset')
                        console.log(_structure);
                        
                        dataassetService.getDatasetFields(selected.dataSetComp, (_fields: IDatasetField[]) => {
                            var assetFields: IDataAssetField[] = _fields.map((f, idx, array) => <IDataAssetField>{name: f.name, index: f.order, type: f.data_type, nullable: f.nullable})
                            var modalInstance = $uibModal.open({
                                templateUrl: 'createStructureModalContent.html',
                                controller: CreateStructureModalController,
                                size: 'lg',
                                backdrop: 'static',
                                resolve: {
                                    data: { structure: _structure, dataSet: selected.dataSetComp.dataSet }
                                }
                            });

                            modalInstance.result.then((result) => {
                                var structure = result.data;
                                var asset: IDataAsset = {
                                    name: <string>(structure.name),
                                    description: <string>(structure.description),
                                    type: <string>(structure.fileFormat),
                                    sourceName: <string>(selected.dataSetComp.sourceName),
                                    creator: "atlas",
                                    structure: {
                                        delimiter: <String>(structure.fieldSeparator),
                                        header: <number>(structure.header),
                                        quote: '',
                                        escape: '',
                                        charset: "UTF-8",
                                        comment: false,
                                        nullValue: '',
                                        dateFormat: <String>(structure.dateFormat),
                                        decimalSeparator: <String>(structure.decimalSeparator),
                                        recordDelimiter: <String>(structure.recordSeparator),
                                        valueDelimiter: <String>(structure.valueSeparator)
                                    },
                                    fields: assetFields,
                                    links: [selected]
                                };
                                console.log('to create:');
                                console.log(asset);

                                dataassetService.create(asset, () => {
                                    alert('Created structure successfully!');
                                    if (result.redirect) {
                                        $location.path('/storage/catalog/structure/' + ctrl.selectedSourceName + '/' + structure.name);
                                    }else {
                                        ctrl.loadDatasets();
                                    }
                                }, (error) => {
                                    alert('Cannot create data asset! Reason: ' + error.data.message);
                                });

                            });
                        }, (error) => {
                            console.log(error);
                        });
                    }, (error) => {
                        console.log(error);
                    });
                }

                ctrl.showAssignStructureModal = function () {
                    var selectedRows = ctrl.gridOptionsDataSet.api.getSelectedRows();
                    for (var index = 0; index < selectedRows.length; index++) {
                        var element = selectedRows[index];
                        if (getFileExtensionType(element.dataSetComp.dataSet) != ctrl.selectedDataSetType) {
                            alert("Selected files not in the same extension type");
                            return;
                        }
                    }
                    var modalInstance = $uibModal.open({
                        templateUrl: 'assignStructureModalContent.html',
                        controller: AssignStructureModalController,
                        bindToController: true,
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            items: {
                                selectedSourceName: ctrl.selectedSourceName,
                                type: ctrl.selectedDataSetType,
                                selectedFiles: ctrl.gridOptionsDataSet.api.getSelectedRows(),
                                dataassetService: dataassetService
                            }
                        }
                    });

                    modalInstance.result.then((result) => {
                        var structure = result.data;
                        if (result.redirect) {
                            $location.path('/storage/catalog/structure/' + ctrl.selectedSourceName + '/' + structure.name);
                        }
                        else {
                            ctrl.loadDatasets();
                        }
                    });
                }

                ctrl.gridOptionsWorkspace = ctrl.loadGridOption(ctrl.showWorkspace);
                ctrl.loadWorkspaces();

            }],
            controllerAs: 'ctrl',
            template: require('./unstructuredfiles.html')
        }
    }]).name;

export = component;
