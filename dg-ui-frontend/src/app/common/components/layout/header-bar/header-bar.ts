import * as angular from 'angular';

var component = angular.module('app.components.layout.header-bar', ['ers.components.all'])
	.directive('headerBar', [function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;

				ctrl.searchRows = [
					{ id: 1, name: 'User 1' },
					{ id: 2, name: 'User 2' },
					{ id: 3, name: 'User 3' }
				];
			},
			controllerAs: 'ctrl',
			template: require('./header-bar.html')
		};
	}]).name;

export = component;
