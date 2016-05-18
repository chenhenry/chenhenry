import * as angular from 'angular';

var component = angular.module('app.modules.graphs.edit-node', [
])
	.directive('editNode', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				node: '=',
				nodes: '=',
				edges: '=',
				onUpdated: '&?',
				onDeleted: '&?',
				onCancel: '&?',
				onCreateChild: '&?'
			},
			bindToController: true,
			controller: function() {
				var ctrl = this;

				ctrl.onUpdatedLocal = function() {
					ctrl.onUpdated({ node: ctrl.node, childEdges: ctrl.edges });
				};

				ctrl.onDeletedLocal = function() {
					ctrl.onDeleted({ id: ctrl.node.id });
				};

				ctrl.onCancelLocal = function() {
					ctrl.onCancel();
				};

				ctrl.onCreateChildLocal = function() {
					ctrl.onCreateChild({ id: ctrl.node.id });
				};

				ctrl.onCreateEdgeLocal = function() {
					ctrl.edges.push({ from: ctrl.node.id, to: ctrl.node.id, type: 'vee', dashed: false });
				};

				ctrl.onDeleteEdgeLocal = function(edge) {
					ctrl.edges.splice(ctrl.edges.indexOf(edge), 1);
				};
			},
			controllerAs: 'ctrl',
			template: require('./edit-node.html')
		};
	}).name;

export = component;
