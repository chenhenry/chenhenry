import '../../../common/components/graph/graph';
import '../edit-node/edit-node';
import '../edit-edge/edit-edge';

var component = angular.module('app.modules.graphs.workflow-example', [
	'app.components.graph',
	'app.modules.graphs.edit-node',
	'app.modules.graphs.edit-edge'
])
	.directive('workflowExample', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;

				var nodeTemplate = '<div style="min-width: 80px;" class="text-center">{{text}}</div>';

				ctrl.nodes = [
					{ id: 1, shape: 'ellipse', content: { text: 'Start' }, template: nodeTemplate },
					{ id: 2, shape: 'rect', content: { text: 'Square' }, template: nodeTemplate },
					{ id: 3, shape: 'diamond', content: { text: 'Split (A)' }, template: nodeTemplate },
					{ id: 4, shape: 'rect', content: { text: 'Square (A)' }, template: nodeTemplate },
					{ id: 5, shape: 'rect', content: { text: 'Square (A)' }, template: nodeTemplate },
					{ id: 6, shape: 'rect', content: { text: 'Square (A)' }, template: nodeTemplate },
					{ id: 7, shape: 'diamond', content: { text: 'Join (A)' }, template: nodeTemplate },
					{ id: 8, shape: 'rect', content: { text: 'Square' }, template: nodeTemplate },
					{ id: 9, shape: 'ellipse', content: { text: 'End' }, template: nodeTemplate }
				];

				// from int
				// to int
				// type = string (normal/vee/undirected)
				// dashed = bool
				// label = string
				ctrl.edges = [
					{ from: 1, to: 2, type: 'vee', dashed: false },
					{ from: 2, to: 3, type: 'vee', dashed: false },
					{ from: 3, to: 4, type: 'vee', dashed: false },
					{ from: 3, to: 5, type: 'vee', dashed: false },
					{ from: 3, to: 6, type: 'vee', dashed: false },
					{ from: 4, to: 7, type: 'vee', dashed: false },
					{ from: 5, to: 7, type: 'vee', dashed: false },
					{ from: 6, to: 7, type: 'vee', dashed: false },
					{ from: 7, to: 8, type: 'vee', dashed: false },
					{ from: 8, to: 9, type: 'vee', dashed: false }
				];

				ctrl.filteredNodes = ctrl.nodes;

				ctrl.filter = function() {
					var searchString = ctrl.searchInput.trim();

					if (!ctrl.searchInput || searchString.length === 0) {
						ctrl.filteredNodes = ctrl.nodes;
					} else {
						ctrl.filteredNodes = [];
						for (var i = 0; i < ctrl.nodes.length; i++) {
							var node = ctrl.nodes[i];
							if (node.id == searchString || node.content.text.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
								ctrl.filteredNodes.push(ctrl.nodes[i]);
							}
						}
					}
				};

				ctrl.onNodeSelected = function(id) {
					ctrl.onEdgeCancel();
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
					// Update Edges (make this better - try to avoid changing the order of nodes)
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
					};
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

				ctrl.createNode = function() {
					var newId = Math.floor(100 + (1 + Math.random()) * 9999);
					ctrl.nodes.push({ id: newId, shape: 'rect', content: { text: 'New Node' }, template: nodeTemplate });
				};

				ctrl.onNodeCreateChild = function(id) {
					var newId = Math.floor(100 + (1 + Math.random()) * 9999);
					ctrl.nodes.push({ id: newId, shape: 'rect', content: { text: 'New Node' }, template: nodeTemplate });
					ctrl.edges.push({ from: id, to: newId, type: 'vee', dashed: false });
					ctrl.onNodeSelected(id);
				};

				ctrl.onNodeCancel = function() {
					ctrl.node = null;
					ctrl.childEdges = null;
				};

				ctrl.onEdgeSelected = function(edge) {
					ctrl.onNodeCancel();
					ctrl.edge = null;

					for (var i = 0; i < ctrl.edges.length; i++) {
						if (ctrl.edges[i].from == edge.from && ctrl.edges[i].to == edge.to) {
							ctrl.edge = angular.copy(ctrl.edges[i]);
							break;
						}
					}
				};

				ctrl.onEdgeCancel = function() {
					ctrl.edge = null;
				};

				ctrl.onEdgeUpdate = function(edge) {
					for (var i = 0; i < ctrl.edges.length; i++) {
						if (ctrl.edges[i].from == edge.from && ctrl.edges[i].to == edge.to) {
							ctrl.edges.splice(i, 1, angular.copy(edge));
							break;
						}
					}
				};

				ctrl.onEdgeDelete = function(edge) {
					for (var i = 0; i < ctrl.edges.length; i++) {
						if (ctrl.edges[i].from == edge.from || ctrl.edges[i].to == edge.to) {
							ctrl.edges.splice(i, 1);
							break;
						}
					}
				};
			},
			controllerAs: 'ctrl',
			template: require('./workflow-example.html')
		};
	}).name;

export = component;
