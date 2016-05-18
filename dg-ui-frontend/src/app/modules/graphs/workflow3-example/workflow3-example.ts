import '../../../common/components/graph/graph';
import '../edit-node/edit-node';

var component = angular.module('app.modules.graphs.workflow3-example', [
	'app.components.graph',
	'app.modules.graphs.edit-node'
])
	.directive('workflow3Example', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;

				ctrl.selectedNode = function() {
					return ctrl.node ? ctrl.node.id : null;
				};

				var nodeTemplate = '{{text}}';

				ctrl.nodes = [
					{ id: 1, shape: 'diamond', content: { text: 'User registered?' }, template: nodeTemplate },
					{ id: 2, shape: 'rect', content: { text: 'User is not registered' }, template: nodeTemplate },
					{ id: 3, shape: 'diamond', content: { text: 'Approve deletion?' }, template: nodeTemplate },
					{ id: 4, shape: 'rect', content: { text: 'Drop user' }, template: nodeTemplate },
					{ id: 5, shape: 'rect', content: { text: 'Reject deletion' }, template: nodeTemplate }
				];

				// from int
				// to int
				// type = string (normal/vee/undirected)
				// dashed = bool
				// label = string
				ctrl.edges = [
					{ from: 1, to: 2, type: 'vee', dashed: false },
					{ from: 1, to: 3, type: 'vee', dashed: false },
					{ from: 3, to: 4, type: 'vee', dashed: false },
					{ from: 3, to: 5, type: 'vee', dashed: false }

				];

				ctrl.onNodeSelected = function(id) {
					ctrl.node = null;
					ctrl.childEdges = null;

					for (var i = 0; i < ctrl.nodes.length; i++) {
						if (ctrl.nodes[i].id == id) {
							ctrl.node = angular.copy(ctrl.nodes[i]);

							// Set Current Child Edges
							ctrl.childEdges = [];
							for (var x = 0; x < ctrl.edges.length; x++) {
								if (ctrl.edges[x].from == ctrl.node.id) {
									ctrl.childEdges.push(angular.copy(ctrl.edges[x]));
								}
							}

							break;
						}
					}
				};

				ctrl.onNodeUpdated = function(node, childEdges) {
					// Update Edges
					for (var i = 0; i < ctrl.edges.length; i++) {
						if (ctrl.edges[i].from == node.id) {
							ctrl.edges.splice(i, 1);
							i--;
						}
					}

					for (var x = 0; x < childEdges.length; x++) {
						ctrl.edges.push(angular.copy(childEdges[x]));
					}

					var index = -1;

					// Find This Node
					for (var y = 0; y < ctrl.nodes.length; y++) {
						if (ctrl.nodes[y].id == node.id) {
							index = y;
						}
					}

					// Replace node	
					if (index > -1) {
						ctrl.nodes.splice(index, 1, angular.copy(node));
					}
				};

				ctrl.onNodeDeleted = function(id) {
					var index = -1;

					// Find Edges that need to be updated
					for (var i = 0; i < ctrl.edges.length; i++) {
						if (ctrl.edges[i].from == id || ctrl.edges[i].to == id) {
							ctrl.edges.splice(i, 1);
							i--;
						}
					}

					// Find This Node
					for (var x = 0; x < ctrl.nodes.length; x++) {
						if (ctrl.nodes[x].id == id) {
							index = x;
						}
					}

					if (index > -1) {
						// Delete this node
						ctrl.nodes.splice(index, 1);
					};

					ctrl.node = null;
					ctrl.childEdges = null;
				};

				ctrl.onNodeCreateChild = function(id) {
					var newId = Math.floor(100 + (1 + Math.random()) * 9999);
					ctrl.nodes.push({ id: newId, shape: 'rect', content: { text: 'New Node' }, template: nodeTemplate });
					ctrl.edges.push({ from: id, to: newId, type: 'vee', dashed: false });
				};

				ctrl.onNodeCancel = function() {
					ctrl.node = null;
					ctrl.childEdges = null;
				};
			},
			controllerAs: 'ctrl',
			template: require('./workflow3-example.html')
		};
	}).name;

export = component;
