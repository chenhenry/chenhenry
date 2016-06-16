import * as angular from 'angular';
// import 'angular-resource';

export var DgResourceModule:angular.IModule = angular.module("atlas.dg.resource", ["ngResource", "app.configs.endpoint"]);

DgResourceModule.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]).config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }]);;
  
DgResourceModule.factory("fileResourceClass", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
  var endpoint: String = endpoints["dg"];
  return $resource(endpoint + "/lovtter/dg/upload/:id", null, {
    putFileStructure: {
      url:endpoint + "/lovtter/dg/upload" + "/:file_id/file-structure/:file_structure_id",
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      params: {
        file_id: "@file_id",
        file_structure_id: "@file_structure_id"
      }
    }
  });
}]);


DgResourceModule.factory("goodResourceClass", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
    var endpoint: String = endpoints["dg"];
    return $resource(endpoint + "/lovtter/dg/good/:id", null, {
        findAll: {
            url: endpoint + "/lovtter/dg/good/",
            method: "GET",
            isArray: true
        },
        findAllByBrand: {
            url: endpoint + "/lovtter/dg/good/brand/:brand",
            method: "GET",
            isArray: true
        },
        findAllByCategory: {
            url: endpoint + "/lovtter/dg/good/category/:category",
            method: "GET",
            isArray: true
        },
        findById: {
            url: endpoint + "/lovtter/dg/good/:id",
            method: "GET",
            isArray: false
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


DgResourceModule.factory("clientResourceClass", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
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
            isArray: false
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


DgResourceModule.factory("brandResourceClass", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
    var endpoint: String = endpoints["dg"];
    return $resource(endpoint + "/lovtter/dg/brand/:id", null, {
        findAll: {
            url: endpoint + "/lovtter/dg/brand/",
            method: "GET",
            isArray: true
        },
        findById: {
            url: endpoint + "/lovtter/dg/brand/:id",
            method: "GET",
            isArray: false
        },
        createBrand: {
            url: endpoint + "/lovtter/dg/brand/",
            method: "POST"
        },
        updateBrand: {
            url: endpoint + "/lovtter/dg/brand/:id",
            method: "PUT",
            params: {
                id: '@id'
            }
        },
        deleteBrand: {
            url: endpoint + "/lovtter/dg/brand/:id",
            method: "DELETE",
            params: {
                id: "@id"
            }
        },
    });
}]);

DgResourceModule.factory("categoryResourceClass", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
    var endpoint: String = endpoints["dg"];
    return $resource(endpoint + "/lovtter/dg/category/:id", null, {
        findAll: {
            url: endpoint + "/lovtter/dg/category/",
            method: "GET",
            isArray: true
        },
        findById: {
            url: endpoint + "/lovtter/dg/category/:id",
            method: "GET",
            isArray: false
        },
        createCategory: {
            url: endpoint + "/lovtter/dg/category/",
            method: "POST"
        },
        updateCategory: {
            url: endpoint + "/lovtter/dg/category/:id",
            method: "PUT",
            params: {
                id: '@id'
            }
        },
        deleteCategory: {
            url: endpoint + "/lovtter/dg/category/:id",
            method: "DELETE",
            params: {
                id: "@id"
            }
        },
    });
}]);

DgResourceModule.factory("orderResourceClass", ["$resource", "endpoints", function($resource: angular.resource.IResourceService, endpoints: {}) {
    var endpoint: String = endpoints["dg"];
    return $resource(endpoint + "/lovtter/dg/order/:id", null, {
        findAll: {
            url: endpoint + "/lovtter/dg/order/",
            method: "GET",
            isArray: true
        },
        findById: {
            url: endpoint + "/lovtter/dg/order/:id",
            method: "GET",
            isArray: false
        },
        saveOrder: {
            url: endpoint + "/lovtter/dg/order/",
            method: "POST"
        },
        updateOrder: {
            url: endpoint + "/lovtter/dg/order/:id",
            method: "PUT",
            params: {
                id: '@id'
            }
        },
        deleteOrder: {
            url: endpoint + "/lovtter/dg/order/:id",
            method: "DELETE",
            params: {
                id: "@id"
            }
        },
    });
}]);
