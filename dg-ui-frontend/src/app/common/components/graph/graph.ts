
import '../../style/graph.scss';

import * as angular from 'angular';

var component = angular.module('app.components.graph', ['app.services.localization'])
	.directive('graph', ['$compile', function($compile) {
		return {
			replace: true,
			restrict: 'E',
			scope: {
				nodes: '=',
				edges: '=',
				autoResizeGraph: '@?',
				enableMouseWheelZoom: '@?',
				selectedNode: '=?',
				selectedEdge: '=?',
				height: '@?',
				onSelected: '&?',
				onEdgeSelected: '&?',
				direction: '@?',
				enableZoomButtons: '@?'
			},
			bindToController: true,
			controller: function($scope) {
				// var ctrl = this;
			},
			controllerAs: 'ctrl',
			link: function(scope, elem, attrs, ctrl) {
				// Removed for now
			},
			template: require('./graph.html')
		};
	}]).name;

export = component;
