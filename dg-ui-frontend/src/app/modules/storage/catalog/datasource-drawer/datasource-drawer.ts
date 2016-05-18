import * as angular from 'angular';
import {IDataAsset} from "../../model/IDataAsset";
import '../../services/dataasset';
import dataAssetService from '../../services/dataasset';

var component = angular.module('app.modules.storage.catalog.datasourceDrawer', [
    'app.services.dataasset'
])
    .directive('datasourceDrawer', ['$location', '$stateParams', 'dataassetService', function($location, $stateParams, dataassetService) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                var ctrl = this;


                ctrl.dataassets = dataassetService.getDataAssetList((result) => {
                }, (error) => {
                    console.log("Error: " + error);
                });


                ctrl.fields = [];

                ctrl.loadDetail = function(dataAssetName: String) {
                    ctrl.fields = dataassetService.getFields(dataAssetName);
                }

                ctrl.createDataAsset = function() {
                    var dataAsset: IDataAsset = { name: "abc", type: "CSV", description: "mocked", sourceName: "oblix-qa" };
                    dataassetService.create(dataAsset);
                }


                var dataSourcesColumnDefs = [
                    { headerName: "Data Source", field: "name", colId: 'name', width: 240, cellRenderer: function(params) { return '<span class="long-label" title="' + params.value + '">' + params.value + '</span>'; } },
                    { headerName: "Source Type", field: "type", width: 100 },
                    { headerName: "Item Count", field: "dataAssetCount", width: 117 }
                ];

                var structuresRfoColumnDefs = [
                    { headerName: "Data Structure", field: "name", colId: 'name', width: 457 }
                ];

                var structuresDataLakeColumnDefs = [
                    { headerName: "Data Structure", field: "name", colId: 'name', width: 340, cellRenderer: function(params) { return '<span class="long-label" title="' + params.value + '">' + params.value + '</span>'; } },
                    { headerName: "File Count", field: "linkCount", width: 117 }
                ];

                var sortByName = [
                    { colId: 'name', sort: 'asc' }
                ];

                ctrl.drawerPanelHeader = "Data Sources";
                ctrl.showStructure = true;

                ctrl.selectDataStructure = function(params) {
                    // Save selected structure
                    ctrl.selectedDataStructure = params.node.data;

                    $location.path('/storage/catalog/structure/' + ctrl.selectedDataSource.name + '/' + ctrl.selectedDataStructure.name);
                    ctrl.catalog_collapsed = true;
                }

                ctrl.loadDataStructures = function() {
                    if (ctrl.selectedDataSource.type === 'rfo')
                        ctrl.gridOptions.api.setColumnDefs(structuresRfoColumnDefs);
                    else
                        ctrl.gridOptions.api.setColumnDefs(structuresDataLakeColumnDefs);
                    ctrl.gridOptions.api.setRowData([]);

                    var orignalSelectedDataSource = ctrl.selectedDataSource;

                    ctrl.gridOptions.api.showLoadingOverlay();

                    var dataStructuresRequest = dataassetService.getDataStructuresSummary(ctrl.selectedDataSource.name,
                        (response) => {
                            if (orignalSelectedDataSource === ctrl.selectedDataSource) {
                                ctrl.gridOptions.api.setRowData(response);

                                // Sort data
                                ctrl.gridOptions.api.setSortModel(sortByName);

                                ctrl.gridOptions.api.sizeColumnsToFit();
                                ctrl.gridOptions.api.hideOverlay()
                                ctrl.gridOptions.onRowSelected = ctrl.selectDataStructure;
                            }
                        }, (error) => {
                            console.log("Error: " + error);
                        });
                };

                ctrl.selectDataSource = function(params) {
                    // Save selected datasource
                    ctrl.selectedDataSource = params.node.data;

                    // Update panel Title to selected datasource
                    ctrl.drawerPanelHeader = ctrl.selectedDataSource.name;

                    // Change the table data & behavior from Data Sources -> Data Structures

                    ctrl.loadDataStructures();

                    ctrl.gridOptions.onRowSelected = ctrl.selectDataStructure;
                    $location.path('/storage/catalog/unstructuredfiles/' + ctrl.selectedDataSource.name);
                }

                ctrl.goBackToDataSourceList = function() {
                    ctrl.selectedDataSource = undefined;
                    ctrl.selectedDataStructure = undefined;
                    ctrl.drawerPanelHeader = "Data Sources";

                    ctrl.gridOptions.api.setColumnDefs(dataSourcesColumnDefs);
                    ctrl.gridOptions.api.setRowData(ctrl.dataSourcesGridRowData);   // Careful! Doesn't refresh data sources list
                    ctrl.gridOptions.onRowSelected = ctrl.selectDataSource;
                }

                ctrl.goToUnstructuredFiles = function() {
                    ctrl.selectedDataStructure = undefined;
                    ctrl.showBroswer = true;
                    ctrl.showStructure = false;
                    ctrl.catalog_collapsed = true;
                    $location.path('/storage/catalog/unstructuredfiles/' + ctrl.selectedDataSource.name);
                }


                // Loads Data Sources into ag-grid
                ctrl.loadDataSources = function() {

                    // Send Request to get all Data Sources
                    var dataSourcesRequest = dataassetService.getDataSources();

                    // When we receive the list of data sources...
                    dataSourcesRequest.$promise.then(function(response) {
                        ctrl.dataSourcesGridRowData = response;
                        ctrl.gridOptions.api.setRowData(response);
                        ctrl.gridOptions.api.setSortModel(sortByName);                       
                    });
                };



                ctrl.gridOptions = {
                    rowSelection: 'single',
                    columnDefs: dataSourcesColumnDefs,
                    enableSorting: true,
                    onRowSelected: ctrl.selectDataSource
                };

                // Init
                ctrl.loadDataSources();

            }],
            controllerAs: 'ctrl',
            template: require('./datasource-drawer.html')
        }
    }]).name;

export = component;
