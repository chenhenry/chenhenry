import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';

angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider: IStateProvider,
        $urlRouterProvider: IUrlRouterProvider) {

        $urlRouterProvider.when('/dg', '/dg/client');
        $urlRouterProvider.when('/dg/good', '/dg/good/list');
        $urlRouterProvider.when('/dg/order', '/dg/order/list');

        $stateProvider
            .state('dg', {
                url: '/dg',
                template: '<dg></dg>',
                data : {
                    menu: {
                        name: 'Data Labs',
                        icon: 'glyphicon-inbox',
                        showSubmenu: true
                    }
                }
            }).state('dg.client', {
                url: '/client',
                template: '<client></client>',
                data : {
                    menu: {
                        name: 'Client Manage'
                    }
                }
            }).state('dg.good', {
                url: '/good',
                template: '<good></good>',
                data: {
                    menu: {
                        name: 'Good Manage',
                        icon: 'fa-folder-open'
                    }
                }
            }).state('dg.good.list', {
                url: '/list',
                template: '<good-list></good-list>',
                data: {
                    menu: {
                        name: 'Tab 1'
                    }
                }
            }).state('dg.good.detail', {
                url: '/detail/:id',
                template: '<good-detail></good-detail>',
                data: {
                    menu: {
                        name: 'Tab 2'
                    }
                }
            }).state('dg.order', {
                url: '/order',
                template: '<order></order>',
                data: {
                    menu: {
                        name: 'Order Manage'
                    }
                }
             }).state('dg.order.list', {
                url: '/list',
                template: '<order-list></order-list>',
                data: {
                    menu: {
                        name: 'Order List'
                    }
                }
            }).state('dg.order.detail', {
                url: '/detail/:id',
                template: '<order-detail></order-detail>',
                data: {
                    menu: {
                        name: 'Tab 2'
                    }
                }
            }).state('dg.brand', {
                url: '/brand',
                template: '<brand></brand>',
                data: {
                    menu: {
                        name: 'Brand Manage'
                    }
                }
            }).state('dg.category', {
                url: '/category',
                template: '<category></category>',
                data: {
                    menu: {
                        name: 'Category Manage'
                    }
                }
            });
            
    }]);
