import * as angular from 'angular';
import './mapping/mapping';
 
var component = angular.module('app.modules.datalab', [
    'ers.components.all',
    'app.modules.datalab.mapping'
])
    .directive('datalab', function() {
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
            template: require('./datalab.html')
        }
    }).name;

export = component;
