import * as angular from 'angular';

import './good-list/good-list';
import './good-detail/good-detail';

var component = angular.module('app.modules.dg.good', [
    'app.modules.dg.good.list',
    'app.modules.dg.good.detail',
	'ers.components.all'
])
    .directive('good', [ function() {

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {
               
            },
            controllerAs: 'ctrl',
            template: require('./good.html')
        }
    }]).name;

export = component;
