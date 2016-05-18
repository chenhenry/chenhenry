import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';

angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider: IStateProvider,
        $urlRouterProvider: IUrlRouterProvider) {

        $urlRouterProvider.when('/datalab', '/datalab/mapping');

        $stateProvider
            .state('datalab', {
                url: '/datalab',
                template: '<datalab></datalab>',
                data : {
                    menu: {
                        name: 'Data Labs',
                        icon: 'glyphicon-inbox',
                        showSubmenu: true
                    }
                }
            }).state('datalab.mapping', {
                url: '/mapping',
                template: '<mapping></mapping>',
                data : {
                    menu: {
                        name: 'Mapping & Transformation'
                    }
                }
            });
            
    }]);
