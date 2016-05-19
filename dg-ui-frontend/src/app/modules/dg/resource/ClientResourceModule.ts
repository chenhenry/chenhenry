import * as angular from 'angular';
import 'angular-resource';
import {IClientResource} from "./IClientResource";

export var ClientResourceModule: angular.IModule = angular.module("atlas.dg.resource", ["ngResource", "app.configs.endpoint"]);

ClientResourceModule.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

ClientResourceModule.factory("ClientResource", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
    var endpoint: String = endpoints["dg"];
    return $resource(endpoint + "/lovtter/dg/client/:id", null, {
        findAll: {
            url: endpoint + "/lovtter/dg/client/",
            method: "GET",
            isArray: true
        },
        findById: {
            url: endpoint + "/lovtter/dg/client/:id",
            method: "GET",
            isArray: true,
            params: {
                id: "@id"
            }
        },
        createClient: {
            url: endpoint + "/lovtter/dg/client/",
            method: "POST"
        },
        updateClient: {
            url: endpoint + "/lovtter/dg/client/:id",
            method: "PUT",
            params: {
                id: '@id'
            }
        },
        deleteClient: {
            url: endpoint + "/lovtter/dg/client/:id",
            method: "DELETE",
            params: {
                id: "@id"
            }
        },
    });
}]);

