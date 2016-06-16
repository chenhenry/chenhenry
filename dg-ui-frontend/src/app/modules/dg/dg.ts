import * as angular from 'angular';
import './client/client';
import './good/good';
import './order/order';
import './brand/brand';
import './category/category';
 
var component = angular.module('app.modules.dg', [
    'ers.components.all',
    'app.modules.dg.client',
    'app.modules.dg.good',
    'app.modules.dg.order',
    'app.modules.dg.brand',
    'app.modules.dg.category'
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
