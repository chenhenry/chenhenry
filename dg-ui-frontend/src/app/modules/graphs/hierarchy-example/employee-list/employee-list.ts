import * as angular from 'angular';

var component = angular.module('app.modules.graphs.employee-list', [
])
	.directive('employeeList', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				nodes: '=?',
				selectedNode: '=?',
				onSelected: '&?'
			},
			bindToController: true,
			controller: function() {
				var ctrl = this;

				ctrl.onSelectedLocal = function(id) {
					ctrl.onSelected({ id });
				};
			},
			controllerAs: 'ctrl',
			template: require('./employee-list.html')
		};
	}).name;

export = component;
