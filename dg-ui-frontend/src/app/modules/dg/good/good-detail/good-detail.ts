import * as angular from 'angular';

var component = angular.module('app.modules.dg.good.detail', [
])
    .directive('goodDetail', [function() {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {

            },
            controllerAs: 'ctrl',
            template: require('./good-detail.html')
        }
    }]).name;

export = component;
