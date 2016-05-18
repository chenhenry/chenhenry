import * as angular from 'angular';
// import 'angular-resource';

export var StorageResourceModule:angular.IModule = angular.module("atlas.storage.resource", ["ngResource", "app.configs.endpoint"]);

StorageResourceModule.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]).config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }]);;

StorageResourceModule.factory("dataAssetResourceClass", ["$resource", "endpoints", function($resource:angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["storage"];
    return $resource(endpoint + "/storage/dataassets/", {assetName: "@name"}, {
        findAll : {
            url: endpoint + "/storage/dataassets/",
            method: "GET",
            isArray: true
        },
        findByName: {
            url: endpoint + "/storage/dataassets/:assetName",
            method: "GET",
            isArray: false 
        },
        findBySourceNameAndType: {
            url:endpoint + "/storage/ui/dataStructuresSummary/:sourceName/:type/",
            method: "GET",
            isArray: true,
            params: {
                sourceName: "@sourceName",
                workspace: "@type"
            }
        },
        importDataAssets: {
            url: endpoint + "/storage/dataassets/importDataAssets/",
            method:"POST",
            isArray: false,
            headers: {'Content-Type': 'application/json'}
        },
        getDataAssetDetail: {
            url: endpoint + "/storage/dataassets/:sourceName/:assetName",
            method: "GET",
            isArray: false,
            params: {
                sourceName: "@sourceName",
                assetName: "@assetName"
            } 
        },
        deleteDataAsset: {
            url: endpoint + "/storage/dataassets/:sourceName/:assetName",
            method:"DELETE",
            params: {
                sourceName: "@sourceName",
                assetName: "@assetName"
            } 
        },
        createDataAsset: {
            url: endpoint + "/storage/dataassets/",
            method: "POST"
        },
        updateDataAssetSummary: {
          url: endpoint + "/storage/dataassets/:sourceName/:assetName",
          method: "PUT",
          params: {
              sourceName: "@sourceName",
              assetName: '@name'
          }
        },
        getDatasetStructure: {
            url: endpoint + "/storage/dataassets/dataconnector/:sourceName/:workspace/:dataSet/structure",
            method: "GET", 
            params: {
                sourceName: "@sourceName",
                workspace: "@workspace",
                dataSet:"@dataSet"
            }
        },     
        getDatasetFields: {
            url: endpoint + "/storage/dataassets/dataconnector/:sourceName/:workspace/:dataSet/fields",
            method: "GET", 
            isArray: true,
            params: {
                sourceName: "@sourceName",
                workspace: "@workspace",
                dataSet:"@dataSet"
            }
        },       
        getDataStructuresSummary: {
            url: endpoint + "/storage/ui/dataStructuresSummary/:sourceName/",
            method:"GET",
            isArray: true
        }
    });
}]);

StorageResourceModule.factory("dataAssetFieldResourceClass",["$resource", "endpoints", function ($resource: angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["storage"];
    return $resource(endpoint + "/storage/dataassets/", null, {
        getFields: {
            url: endpoint + "/storage/dataassets/:sourceName/:assetName/fields",
            method: "GET",
            isArray: true,
            params: {
                sourceName: "@sourceName",
                assetName: '@assetName'
            }
        }
    });
}]);

StorageResourceModule.factory("dataSourceResourceClass",["$resource", "endpoints", function ($resource: angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["storage"];
    return $resource(endpoint + "/storage/ui/dataSourcesSummary/", null, {
        getDataSources: {
            url: endpoint + "/storage/ui/dataSourcesSummary/",
            method: "GET",
            isArray: true
        },
        getAssignedLinks: {
            url: endpoint + "/storage/ui/:sourceName/:assetName/assignedLinks/",
            method: "GET",
            isArray: true,
            params: {
                sourceName: "@sourceName",
                assetName: '@assetName'
            }
        },
        unassignDataAssetLinks: {
            url: endpoint + "/storage/ui/:sourceName/:assetName/dataLinks/:linkIds",
            method: "DELETE",
            params: {
                sourceName: "@sourceName",
                assetName:"@assetName",
                linkIds:"@linkIds"
            }
        }
    });
}]);

StorageResourceModule.factory("workspaceResourceClass",["$resource", "endpoints", function ($resource: angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["storage"];
    return $resource(endpoint + "/storage/dataassets/dataSources/:sourceName/workspaces/", null, {
        getWorkspaces: {
            url: endpoint + "/storage/dataassets/dataSources/:sourceName/workspaces/",
            method: "GET",
            isArray: true
        }
    });
}]);

StorageResourceModule.factory("dataAssetLinkResourceClass",["$resource", "endpoints", function ($resource: angular.resource.IResourceService, endpoints:{}) {
    var endpoint:String = endpoints["storage"];
    return $resource(endpoint + "/storage/dataassets/:sourceName/:workspace/unassigned/", null, {
        getUnassignedFiles: {
            url: endpoint + "/storage/dataassets/:sourceName/:workspace/unassigned/",
            method: "GET",
            isArray: true,
            params: {
                sourceName: "@sourceName",
                workspace: "@workspace"
            }
        },
        unassignDataAssetLink: {
            url: endpoint + "/storage/dataassets/:sourceName/:assetName/data/:workspace/:dataSet",
            method: "DELETE",
            params: {
                sourceName: "@sourceName",
                workspace: "@workspace",
                assetName:"@assetName",
                dataSet:"@dataSet"
            }
        },
        assignDataAssetLink: {
            url: endpoint + "/storage/dataassets/:sourceName/:assetName/data/",
            method: "POST",
            params: {
                sourceName: "@sourceName",
                assetName: '@assetName'
            }
        }
    });
}]);
