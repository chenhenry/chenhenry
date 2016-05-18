import '../../../services/menu';
import MenuService from '../../../services/menu';
import * as angular from 'angular';

var component = angular.module('app.components.layout.left-nav', [
	'app.services.menu'
]).directive('leftNav', ['menuService', function(menuService: MenuService) {
	return {
		replace: true,
		restrict: 'E',
		scope: {
			collapsed: '=?'
		},
		bindToController: true,
		controller: function() {
			var ctrl = this;

			ctrl.menuItems = menuService.get({ type: 'tree' });

			ctrl.toggleMenu = function() {
				ctrl.collapsed = !ctrl.collapsed;
			};
		},
		controllerAs: 'ctrl',
		template: require('./left-nav.html')
	};
}]).name;

export = component;
