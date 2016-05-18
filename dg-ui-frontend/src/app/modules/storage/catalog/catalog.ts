
import * as angular from 'angular';
import {IDataAsset} from "../model/IDataAsset";
import '../services/dataasset';
import './structure/structure';
import './unstructuredfiles/unstructuredfiles';
import './datasource-drawer/datasource-drawer';

var component = angular.module('app.modules.storage.catalog', [
    'app.modules.storage.catalog.structure',
    'app.modules.storage.catalog.unstructuredfiles',
    'app.modules.storage.catalog.datasourceDrawer',
    'app.services.dataasset',
    'atlas.storage.resource'
])
    .directive('catalog', ['$location', 'dataassetService', function($location, dataassetService) {
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


            }],
            controllerAs: 'ctrl',
            template: require('./catalog.html')
        }
    }]).name;


export = component;
