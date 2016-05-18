import * as angular from 'angular';

var component = angular.module('app.modules.page4.tab2', [
])
	.directive('page4Tab2', function() {
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
			template: require('./tab2.html')
		};
	}).name;

export = component;
