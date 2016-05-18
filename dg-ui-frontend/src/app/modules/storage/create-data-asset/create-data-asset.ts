import * as angular from 'angular';
import '../services/dataasset';
import dataAssetService from '../services/dataasset';


var component = angular.module('app.modules.storage.create-data-asset', [
'app.services.dataasset','ers.components.modal'
])
.directive('createDataAsset', ['dataassetService', 'ersModalService', function(dataassetService: dataAssetService, ersModalService) {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: function(ersModalService) {
                var ctrl = this;
                ctrl.importDataAssets = function(){
                    var sourceName = ctrl.selected;
                    this.info = "The process for creating the data assets for the RiskFoundation data source " + sourceName;
                    this.info += " started. Once the process is finished, the data assets will appear in the Data Catalog.";
                    ersModalService.informationDialog("Create Data Assets", this.info);
                    var result = dataassetService.importDataAssets(sourceName);

                };
                 ctrl.loadDataSources = function () {
                    this.datasources = dataassetService.getDataSources();
                 };

                 ctrl.loadDataSources();
               
            },
            controllerAs: 'ctrl',
            template: require('./create-data-asset.html')
        }
    }]).name;

export = component;
