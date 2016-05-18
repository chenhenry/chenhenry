import './hierarchy-example/hierarchy-example';
import './workflow-example/workflow-example';
import './workflow2-example/workflow2-example';
import './workflow3-example/workflow3-example';

var component = angular.module('app.modules.graphs', [
	'app.modules.graphs.hierarchy-example',
	'app.modules.graphs.workflow-example',
	'app.modules.graphs.workflow2-example',
	'app.modules.graphs.workflow3-example'
])
	.directive('graphs', function() {
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
			template: require('./graphs.html')
		};
	}).name;

export = component;
