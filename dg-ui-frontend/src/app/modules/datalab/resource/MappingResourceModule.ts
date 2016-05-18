import * as angular from 'angular';
import 'angular-resource';
import {IConceptResource, IMappingResource} from "./IMappingResource";

export var MappingResourceModule:angular.IModule = angular.module("atlas.mapping.resource", ["ngResource", "app.configs.endpoint"]); 

MappingResourceModule.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

MappingResourceModule.factory("ConceptResource", ["$resource", "endpoints", function($resource:angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["frd"];
    return $resource(endpoint + "/dictionary/:domainVersion/domains/:domainCode/concepts", null, {
        find : {
            url: endpoint + "/dictionary/:domainVersion/domains/:domainCode/concepts",
            method: "GET",
            isArray: true,
            params: {
                domainVersion: "@domainVersion",
                domainCode: "@domainCode"
            }
        }
    });
}]);

MappingResourceModule.factory("DomainResource", ["$resource", "endpoints", function($resource:angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["frd"];
    return $resource(endpoint + "/dictionary/domains", null, {
        findAll : {
            url: endpoint + "/dictionary/domains",
            method: "GET",
            isArray: true
        }
    });
}]);


MappingResourceModule.factory("MappingResource",["$resource", "endpoints", function ($resource: angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["mapping"];
    return $resource(endpoint + "/mappings", null, {
        getMappings: {
            url: endpoint + "/:domainVersion/domains/:domainCode/concepts/:conceptCode/mappings",
            method: "GET",
            isArray: true,
            params: {
                domainVersion: "@domainVersion",
                domainCode: "@domainCode",
                conceptCode: "@conceptCode"
            }
        },
        deleteMapping: {
            url: endpoint + "/mappings/:id",
            method: "DELETE",
            params: {
                id: "@id"
            }
        },
        update: {
            url:endpoint + "/mappings/:id",
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            params: {
                id: "@id"
            }
        }
    });
}]);

