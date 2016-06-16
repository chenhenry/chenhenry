import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';

angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider: IStateProvider,
        $urlRouterProvider: IUrlRouterProvider) {

        $urlRouterProvider.when('/dg', '/dg/client');

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
                url: '/detail',
                template: '<good-detail></good-detail>',
                data: {
                    menu: {
                        name: 'Tab 2'
                    }
                }
            });
            
    }]);
