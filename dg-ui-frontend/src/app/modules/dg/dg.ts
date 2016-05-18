import * as angular from 'angular';
import './client/client';
 
var component = angular.module('app.modules.dg', [
    'ers.components.all',
    'app.modules.dg.client'
])
    .directive('dg', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: function() {
                var ctrl = this;
            },
            controllerAs: 'ctrl',
            template: require('./dg.html')
        }
    }).name;

export = component;
