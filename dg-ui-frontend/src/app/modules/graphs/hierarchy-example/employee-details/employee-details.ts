import * as angular from 'angular';

var component = angular.module('app.modules.graphs.employee-details', [
])
	.directive('employeeDetails', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				employee: '=?',
				nodes: '=?',
				onUpdated: '&?',
				onDeleted: '&?',
				onCancel: '&?'
			},
			bindToController: true,
			controller: function() {
				var ctrl = this;

				ctrl.onUpdatedLocal = function() {
					ctrl.onUpdated({ employee: ctrl.employee });
				};

				ctrl.onDeletedLocal = function() {
					ctrl.onDeleted({ id: ctrl.employee.id });
				};

				ctrl.onCancelLocal = function() {
					ctrl.onCancel();
				};
			},
			controllerAs: 'ctrl',
			template: require('./employee-details.html')
		};
	}).name;

export = component;
