import * as angular from 'angular';
import 'angular-resource';
import {IGoodResource} from "./IGoodResource";

export var GoodResourceModule: angular.IModule = angular.module("atlas.dg.resource", ["ngResource", "app.configs.endpoint"]);

GoodResourceModule.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

GoodResourceModule.factory("GoodResource", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
    var endpoint: String = endpoints["dg"];
    return $resource(endpoint + "/lovtter/dg/good/:id", null, {
        findAll: {
            url: endpoint + "/lovtter/dg/good/",
            method: "GET",
            isArray: true
        },
        findById: {
            url: endpoint + "/lovtter/dg/good/:id",
            method: "GET",
            isArray: true,
            params: {
                id: "@id"
            }
        },
        createGood: {
            url: endpoint + "/lovtter/dg/good/",
            method: "POST"
        },
        updateGood: {
            url: endpoint + "/lovtter/dg/good/:id",
            method: "PUT",
            params: {
                id: '@id'
            }
        },
        deleteGood: {
            url: endpoint + "/lovtter/dg/good/:id",
            method: "DELETE",
            params: {
                id: "@id"
            }
        },
    });
}]);

