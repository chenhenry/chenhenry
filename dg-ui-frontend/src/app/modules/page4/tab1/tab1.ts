import * as angular from 'angular';

var component = angular.module('app.modules.page4.tab1', [
])
	.directive('page4Tab1', function() {
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
			template: require('./tab1.html')
		};
	}).name;

export = component;
