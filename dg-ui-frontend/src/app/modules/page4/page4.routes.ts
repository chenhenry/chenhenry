import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';

import {CONSTANTS} from "../../common/constants";

if (CONSTANTS.atlas.ui.frontendOnly) {
    angular.module('app').config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider: IStateProvider,
            $urlRouterProvider: IUrlRouterProvider) {

            $urlRouterProvider.when('/page4', '/page4/tab1');

            $stateProvider
                .state('page4', {
                    url: '/page4',
                    template: '<page4></page4>',
                    data: {
                        menu: {
                            name: 'Module Example',
                            icon: 'fa-folder-open',
                            showSubmenu: true
                        }
                    }
                }).state('page4.tab1', {
                    url: '/tab1',
                    template: '<page4-tab1></page4-tab1>',
                    data: {
                        menu: {
                            name: 'Tab 1'
                        }
                    }
                }).state('page4.tab2', {
                    url: '/tab2',
                    template: '<page4-tab2></page4-tab2>',
                    data: {
                        menu: {
                            name: 'Tab 2'
                        }
                    }
                });
        }]);
}
