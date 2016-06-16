import * as angular from 'angular';

import './order-list/order-list';
import './order-detail/order-detail';

var component = angular.module('app.modules.dg.order', [
    'app.modules.dg.order.list',
    'app.modules.dg.order.detail',
	'ers.components.all'
])
    .directive('order', [ function() {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {
               
            },
            controllerAs: 'ctrl',
            template: require('./order.html')
        }
    }]).name;

export = component;
