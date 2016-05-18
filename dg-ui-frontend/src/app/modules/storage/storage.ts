import * as angular from 'angular';

import './create-data-asset/create-data-asset';
import './catalog/catalog';

var component = angular.module('app.modules.storage', [
    'ers.components.all',
    'app.modules.storage.create-data-asset',
    'app.modules.storage.catalog'
    
])
    .directive('storage', function() {
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
            template: require('./storage.html')
        }
    }).name;

export = component;