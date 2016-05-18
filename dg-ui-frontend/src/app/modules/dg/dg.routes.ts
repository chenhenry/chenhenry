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
                        name: '客户管理'
                    }
                }
            });
            
    }]);
