import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';

angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider: IStateProvider,
             $urlRouterProvider: IUrlRouterProvider) {

        $urlRouterProvider.when('/reporting-studio', '/reporting-studio/reporting-universe');

        $stateProvider
            .state('reporting-studio', {
                url: '/reporting-studio',
                template: '<reporting-studio></reporting-studio>',
                data : {
                    menu: {
                        name: 'Reporting Studio',
                        icon: 'glyphicon-inbox',
                        showSubmenu: true
                    }
                }
            })
            .state('reporting-studio.reporting-universe', {
                url: '/reporting-universe',
                template: '<reporting-universe></reporting-universe>',
                data : {
                    menu: {
                        name: 'Reporting Universe'
                    }
                }
            })
            .state('reporting-studio.tag-sample', {
                url: '/tag-sample',
                template: '<tag-sample></tag-sample>',
                data : {
                    menu: {
                        name: 'Tag Sample'
                    }
                }
            })
            .state('reporting-studio.sample', {
                url: '/sample',
                template: '<sample></sample>',
                data: {
                    menu: {
                        name: 'Reporting Sample'
                    }
                }
            })
    }]);
