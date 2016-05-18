import * as angular from 'angular';
import 'angular-resource';

export var ReportingStudioResourceModule:angular.IModule = angular.module("atlas.reporting-studio.resource", ["ngResource"]);

ReportingStudioResourceModule.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

ReportingStudioResourceModule.factory("ReportingUniverseResource", ["$resource", function($resource:angular.resource.IResourceService) {
    return $resource("http://localhost:8080/reporting/reportingstudio/universes/", null, {
        findAll : {
            url: "http://localhost:8080/reporting/reportingstudio/universes/",
            method: "GET",
            isArray: true
        },
        addReportingUniverse : {
            url: "http://localhost:8080/reporting/reportingstudio/universes/",
            isArray:false,
            method:"POST",
            headers: {'Content-Type': 'application/json'}
        }
    });
}]);