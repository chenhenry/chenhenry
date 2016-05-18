import * as angular from 'angular';

var component = angular.module('app.modules.graphs.edit-edge', [

])
	.directive('editEdge', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				edge: '=',
				onUpdate: '&?',
				onDelete: '&?',
				onCancel: '&?'
			},
			bindToController: true,
			controller: function() {
				var ctrl = this;

				ctrl.onUpdatedLocal = function() {
					ctrl.onUpdate({ edge: ctrl.edge });
				};

				ctrl.onDeletedLocal = function() {
					ctrl.onDelete({ edge: ctrl.edge });
				};

				ctrl.onCancelLocal = function() {
					ctrl.onCancel();
				};
			},
			controllerAs: 'ctrl',
			template: require('./edit-edge.html')
		};
	}).name;

export = component;
