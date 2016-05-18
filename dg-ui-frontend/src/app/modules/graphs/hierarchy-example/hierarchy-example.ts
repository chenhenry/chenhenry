import '../../../common/components/graph/graph';
import './employee-list/employee-list';
import './employee-details/employee-details';

var component = angular.module('app.modules.graphs.hierarchy-example', [
	'app.components.graph',
	'app.modules.graphs.employee-list',
	'app.modules.graphs.employee-details'
])
	.directive('hierarchyExample', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;

				var employeeTemplate = '<img class="icon" src="images/user-{{gender}}-icon.png" style="height: 46px; width: 46px;" />';
				employeeTemplate += '<div class="right-section"><div class="name">{{name}}</div>';
				employeeTemplate += '<div class="title">{{title}}</div><div class="location">{{location}}</div></div>';

				ctrl.nodes = [
					{ id: 1, content: { name: 'Employee 1', title: 'Managing Director', location: 'San Francisco', gender: 'male' },
					template: employeeTemplate },
					{ id: 2, content: { name: 'Employee 2', title: 'Senior Director', location: 'San Francisco', gender: 'female' },
					template: employeeTemplate },
					{ id: 3, content: { name: 'Employee 3', title: 'Director', location: 'San Francisco', gender: 'male' },
					template: employeeTemplate },
					{ id: 4, content: { name: 'Employee 4', title: 'Asc Director', location: 'Grenoble', gender: 'male' },
					template: employeeTemplate },
					{ id: 5, content: { name: 'Employee 5', title: 'Asc Director', location: 'Grenoble', gender: 'male' },
					template: employeeTemplate },
					{ id: 6, content: { name: 'Employee 6', title: 'Software Engineer', location: 'San Francisco', gender: 'female' },
					template: employeeTemplate, class: 'node-disabled' }
				];

				// from int
				// to int
				// type = string (normal/vee/undirected)
				// dashed = bool
				// label = string
				ctrl.edges = [
					{ from: 1, to: 2, type: 'vee', label: '', dashed: false },
					{ from: 2, to: 3, type: 'vee', label: '', dashed: false },
					{ from: 3, to: 4, type: 'vee', label: '', dashed: false },
					{ from: 3, to: 5, type: 'vee', label: '', dashed: false },
					{ from: 3, to: 6, type: 'vee', label: '', dashed: true }
				];

				ctrl.onEmployeeSelected = function(id) {
					ctrl.employee = null;

					for (var i = 0; i < ctrl.nodes.length; i++) {
						if (ctrl.nodes[i].id == id) {
							ctrl.employee = angular.copy(ctrl.nodes[i]);
							// ctrl.employee = ctrl.nodes[i];
							var parentEdge: any = _.find(ctrl.edges, { 'to': parseInt(id, 10) });
							if (parentEdge) {
								ctrl.employee.reportsTo = parentEdge.from.toString();
							}
							// ctrl.selectedNode = id;

							break;
						}
					}
				};

				ctrl.onEmployeeUpdated = function(employee) {
					// Update Edges
					var edgeUpdated = false;
					for (var i = 0; i < ctrl.edges.length; i++) {
						if (ctrl.edges[i].to == employee.id) {
							ctrl.edges[i].from = parseInt(employee.reportsTo, 10);
							edgeUpdated = true;
							break;
						}
					}

					// Create new edge if this node has no parent
					if (edgeUpdated === false) {
						ctrl.edges.push({ from: parseInt(employee.reportsTo, 10), to: employee.id, type: 'vee', label: '' });
					}

					// Update Node
					var index = -1;

					for (var x = 0; x < ctrl.nodes.length; x++) {
						if (ctrl.nodes[x].id == employee.id) {
							index = x;
						}
					}

					if (index > -1) {
						ctrl.nodes.splice(index, 1, angular.copy(employee)); // Replace employee			
					}
				};

				ctrl.onEmployeeDeleted = function(id) {
					var index = -1;

					for (var i = 0; i < ctrl.nodes.length; i++) {
						if (ctrl.nodes[i].id == id) {
							index = i;
						}
					}

					if (index > -1) {
						var parentEdge;

						// Find parent edge
						for (var y = 0; y < ctrl.edges.length; y++) {
							if (ctrl.edges[y].to == id) {
								parentEdge = ctrl.edges[y].from;
								ctrl.edges.splice(y, 1);
								y--;
								break;
							}
						}

						// Find edges that need to be updated
						for (var x = 0; x < ctrl.edges.length; x++) {
							if (ctrl.edges[x].from == id) {
								if (parentEdge !== null) {
									ctrl.edges[x].from = parentEdge;
								} else {
									ctrl.edges.splice(x, 1);
									x--;
								}
							} else if (ctrl.edges[x].to == id) {
								ctrl.edges.splice(x, 1);
								x--;
							}
						}

						// Delete this node
						ctrl.nodes.splice(index, 1);
					};

					ctrl.employee = null;
				};

				ctrl.onEmployeeCancel = function() {
					ctrl.employee = null;
				};
			},
			controllerAs: 'ctrl',
			template: require('./hierarchy-example.html')
		};
	}).name;

export = component;
