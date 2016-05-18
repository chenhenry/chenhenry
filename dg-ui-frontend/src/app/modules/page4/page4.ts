import * as angular from 'angular';

import '../../common/components/random-fruit/random-fruit';
import './tab1/tab1';
import './tab2/tab2';

var component = angular.module('app.modules.page4', [
	'app.components.random-fruit',
	'app.modules.page4.tab1',
	'app.modules.page4.tab2',
	'ers.components.all'
])
	.directive('page4', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				// var ctrl = this;
			},
			controllerAs: 'ctrl',
			template: require('./page4.html')
		};
	}).name;

export = component;
