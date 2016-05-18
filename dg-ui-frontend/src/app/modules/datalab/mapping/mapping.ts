import * as angular from 'angular';


import {IMapping} from "../model/IMapping";
import {IMappingResource} from "../resource/IMappingResource";
import '../services/mapping';
import mappingService from '../services/mapping';

var component = angular.module('app.modules.datalab.mapping', [
    'app.modules.datalab.services.mapping'
])
    .directive('mapping', ['mappingService', 'MappingResource','ConceptResource', function (mappingService:mappingService, Mapping: IMappingResource) {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {
                var ctrl = this;
                var domainCode;
                var domainVersion;
                var attributesRequest:angular.IPromise<any>;

                //Attributes
                ctrl.loadAttributes = function() {
                    ctrl.attributesLoading = true;

                    // Cancel previous request
                    if (attributesRequest) {
                        mappingService.cancelRequest(attributesRequest);
                    }
                    
                    mappingService.getAllDomains(function (response) {
                        if(response.length != 0){
                            ctrl.domain = response[0];
                            ctrl.domainCode = response[0].code;
                            ctrl.domainVersion = response[0].version;
                            domainCode = ctrl.domainCode;
                            domainVersion = ctrl.domainVersion;
                            // Create new request to the service
                            attributesRequest = mappingService.getAttributesAsync(ctrl.domainCode, ctrl.domainVersion, function(response) {
                                ctrl.attributes = response;
                                ctrl.attributesLoading = false;
                            }, function(response) {
                                console.log("Error: " + response);
                            });
                        }
                    }, function(response) {
                        console.log("Error: " + response);
                    });
                };

                var columns = [
                    {
                        headerName: "Field Name",
                        field: "name"
                    }
                ];

                ctrl.gridOptions = {
                    rowSelection: 'single',
                    columnDefs: columns,
                    rowData: null,
                    enableSorting: true,
                    enableFilter: true,
                    onRowSelected: function name(params) {
                        ctrl.selectedField = params.node.data.name;
                        ctrl.selectField(params.node.data.name);
                    }
                };

                var attributeDetailsRequest: angular.IPromise<any>;

                //Attributes details
                ctrl.loadAttributeDetails = function(attribute: any) {
                    ctrl.selectedAttribute = attribute.id;
                    ctrl.attributeDetailsLoading = true;
                    ctrl.attributeDetails = attribute;
                    ctrl.attributeDetailsLoading = false;
                    ctrl.selectedExpressionId = "";
                    ctrl.refresh(ctrl.attributeDetails.code);
                };

                var expressionRequest: angular.IPromise<any>;

                //Attributes details
                ctrl.refresh = function(code: string) {
                    ctrl.expressionLoading = true;
                    if (code == undefined) {
                        code = ctrl.attributeDetails.code;
                    }
                };

                //Attributes details
                ctrl.refresh = function (code:string) {
                    ctrl.expressionLoading = true;
                    if(code == undefined){
                        code = ctrl.attributeDetails.code;
                    }
                    // Cancel previous request
                    if (expressionRequest) {
                        mappingService.cancelRequest(expressionRequest);
                    }

                    // Create new request to the service
                    expressionRequest = mappingService.getMappings(domainVersion, domainCode, code);

                    // Update the data once request returns                              
                    expressionRequest.then(function(response: IMapping[]) {
                        response.$promise.then(function(data) {
                            if (data.length > 0) {
                                ctrl.hasExpression = true;
                                ctrl.currentExpression = data[0];         // Assumes there is only one expression                       
                                ctrl.expressionParameter = ctrl.currentExpression.expression;
                            } else {
                                ctrl.hasExpression = false;
                                ctrl.currentExpression = undefined;
                                ctrl.expressionParameter = null;
                            }
                            ctrl.expressionLoading = false;
                        });
                    }, function(response) {
                        console.log("Error: " + response);
                    });
                };


                //Expression
                ctrl.expressionEditMode = false;

                ctrl.toggleExpressionEditMode = function(edit?: boolean) {
                    if (edit != undefined) {
                        ctrl.expressionEditMode = edit;
                    } else {
                        ctrl.expressionEditMode = !ctrl.expressionEditMode;
                    }
                }

                ctrl.processExpressionEdit = function() {
                    if (ctrl.hasExpression) {
                        ctrl.updateExpression();
                    } else {
                        ctrl.saveExpression();
                    }
                }

                ctrl.saveExpression = function() {
                    if (ctrl.selectedDataAssetName === undefined) {
                        alert('Please select a Data Asset for this Expression.');
                        return;
                    }

                    var mapping: IMapping = new Mapping({
                        expression: ctrl.expressionParameter,
                        source_asset_code: ctrl.selectedDataAssetName,
                        target_concept_code: ctrl.attributeDetails.code,
                        target_domain_code: ctrl.domainCode,
                        target_domain_version: ctrl.domainVersion
                    });

                    mappingService.createExpression(mapping, (result) => {
                        console.log("mapping added : " + result);
                        ctrl.refresh(ctrl.attributeDetails.code);
                        ctrl.toggleExpressionEditMode(false);
                    }, (error) => {
                        console.log("unable to add mapping : " + error);
                    });
                };

                ctrl.updateExpression = function() {
                    ctrl.currentExpression.expression = ctrl.expressionParameter;

                    mappingService.updateExpression(ctrl.currentExpression, (result) => {
                        console.log("mapping updated : " + result);
                        ctrl.toggleExpressionEditMode(false);
                        ctrl.refresh(ctrl.attributeDetails.code);
                    }, (error) => {
                        console.log("unable to update mapping : " + error);
                    });
                };

                ctrl.deleteExpression = function() {
                    mappingService.deleteExpression(ctrl.currentExpression, function(response) {
                        ctrl.toggleExpressionEditMode(false);
                        ctrl.refresh(ctrl.attributeDetails.code);
                    }, function(response) {
                        console.log("Error: " + response);
                    });
                };

              
                ctrl.delete= function () {
                    if(ctrl.radio=="" || ctrl.radio== undefined){
                        alert("Please select a expression to delete.")
                        return;
                    }else{
                        mappingService.deleteExpression(ctrl.radio, function (response) {
                            ctrl.refresh(ctrl.attributeDetails.code);
                        }, function (response) {
                            console.log("Error: " + response);
                        });
                    }
                };
                
                //Data catalog

                var attributeDataassetsRequest: angular.IPromise<any>;
                ctrl.loadAttributeDataassets = function() {
                    ctrl.attributeDataassetsLoading = true;

                    // Cancel previous request
                    if (attributeDataassetsRequest) {
                        mappingService.cancelRequest(attributeDataassetsRequest);
                    }

                    // Create new request to the service
                    attributeDataassetsRequest = mappingService.getDataAssetList((result) => {
                        ctrl.attributeDataassets = result;
                        ctrl.attributeDataassetsLoading = false;
                    }, (error) => {
                        console.log("Error: " + error);
                    });
                };

                ctrl.selectDataAsset = function(selectedItem) {
                    ctrl.selectedDataAssetName = selectedItem.name;
                    ctrl.selectedDataAsset = selectedItem;
                    ctrl.selectedField = undefined;
                    var request = mappingService.getFields(selectedItem.sourceName, selectedItem.name);
                    ctrl.gridOptions.api.setRowData(null);
                    request.$promise.then(function(response) {
                        ctrl.gridOptions.api.setRowData(response);
                    });
                };

                ctrl.selectField = function(name: string) {
                    ctrl.selectedField = name;
                };

                // Init
                ctrl.loadAttributes();
                ctrl.loadAttributeDataassets();
            },
            controllerAs: 'ctrl',
            template: require('./mapping.html')
        }
    }]).name;

export = component;
