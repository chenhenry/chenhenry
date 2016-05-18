import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';

angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider: IStateProvider,
        $urlRouterProvider: IUrlRouterProvider) {

        $urlRouterProvider.when('/storage', '/storage/dataasset');
        $urlRouterProvider.when('/storage/catalog', '/storage/catalog');

        $stateProvider
            .state('storage', {
                url: '/storage',
                template: '<storage></storage>',
                data : {
                    menu: {
                        name: 'Source Data',
                        icon: 'glyphicon-inbox',
                        showSubmenu: true
                    }
                }
            })
            .state('storage.createdataasset', {
                url: '/createdataasset',
                template: '<create-data-asset></create-data-asset>',
                data : {
                    menu: {
                        name: 'Create RFo Data Assets'
                    }
                }
            })
            .state('storage.catalog', {
				url: '/catalog',
				template: '<catalog></catalog>',
				data: {
					menu: {
						name: 'Data Catalog',
                        icon: 'glyphicon-inbox',
                        showSubmenu: true
					}
				}
			}).state('storage.catalog.structure', {
                url: '/structure/:sourceName/:structureName',
                template: '<structure></structure>',
                data: {
                    menu: {
                        name: 'File Browser'
                    }
                }
            }).state('storage.catalog.unstructuredfiles', {
                url: '/unstructuredfiles/:sourceName',
                template: '<unstructuredfiles></unstructuredfiles>',
                data: {
                    menu: {name: 'Unstructured Files'}
                }
            }).state('storage.catalog.createstructure', {
                url: '/createstructure',
                template: '<createstructure></createstructure>',
                data: {
                    menu: {name: 'Create Structure'}
                }
            });                             
            
    }]);