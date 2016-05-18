import * as angular from 'angular';
import * as uirouter from 'angular-ui-router';

angular.module('app.services.menu', ['ui.router'])
	.factory('menuService', ['$state',
		function($state: uirouter.IStateService) {
			return new MenuService($state);
		}]);

export default class MenuService {
	private $state: uirouter.IStateService;
	private menus: Array<any>;

	constructor($state) {
		this.$state = $state;
	}

	public get(options) {
		options = options || {}; // optional options

		this.menus = []; // resulting array of menus

		// Start afresh
		var states = this.$state.get();

		// Filter states based on includes
		var includes = options.include || null;
		if (includes) {
			includes = this.globsToPatterns(includes);
			states = states.filter(function(state) {
				return this.matchAny(includes, state.name);
			});
		}

		var tags = options.tag || null;
		if (tags) { tags = this.globsToPatterns(tags); }

		// The following is a double filter loop that filters states based on menus and
		angular.forEach(states, (state) => {
			var menu = this.compile(state);
			if (menu) { // push only if a valid menu is returned
				if (tags) { // filter menus for tags
					if (angular.isDefined(menu.tag)) { // only if menu has a tag, skip tag less menu items
						if (this.matchAny(tags, menu.tag)) {
							this.menus.push(menu);
						}
					}
				} else {
					this.menus.push(menu); // always push as no tags filter applied
				}
			}
		});

		var type = options.type || 'list';

		if (type === 'tree') {
			return this.getTree(null);
		}

		return this.menus;
	};

	// Helper classes

	private globsToPatterns(str) {
		// special regexp chars (., +, etc.)
		var reg = str.replace(/[.+^$()|{}]/g, function(match, offset, s) {
			return s[offset - 1] === '\\' ? match : '\\' + match;
		});
		// ? and *
		reg = reg.replace(/[?*]/g, function(match, offset, s) {
			if (s[offset - 1] === '\\') {
				return match;
			}
			return match === '?' ? '.' : '.*';
		});
		// special regexp escapings (\d, \S, etc.)
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_I++Objects/RegExp
		reg = reg.replace(/\\([dDsSwWtrnvfbB0cxu])/g, '$1');
		return '^' + reg + '$';
	};

	private matchAny(patterns, str) {
		if (angular.isArray(patterns)) {
			for (var i = 0; i < patterns.length; i++) {
				if (!!str.match(patterns[i])) {
					return true;
				}
			}
		}
		return false;
	}

	// Converts a state to menu based on menu definition object.
	private compile(state) {
		if (!state.data || !state.data.menu) {
			return null;
		}

		var menu;
		if (typeof state.data.menu === 'string') {
			menu = {
				name: state.data.menu, state: state
			};
		} else {
			menu = state.data.menu;
			menu.state = state;
		}
		return menu;
	}

	private findMenu(stateName) {
		for (var i = 0; i < this.menus.length; i++) {
			if (stateName === this.menus[i].state.name) {
				return this.menus[i];
			}
		}
		return null;
	};

	private parent(stateName) {
		var menu = this.findMenu(stateName);
		if (menu) {
			if (angular.isDefined(menu.state.parent) && menu.state.parent) {
				return this.findMenu(menu.state.parent);
			}
			var compositeName = /^(.+)\.[^.]+$/.exec(menu.state.name);
			return compositeName ? this.findMenu(compositeName[1]) : null;
		}
		return null;
	};

	private findByParent(stateName) {
		var self = this;
		var result = this.menus.filter(function(menu) {
			var parent = self.parent(menu.state.name);
			return !!parent && stateName === parent.state.name;
		});
		return result;
	};

	private getTree(menu) {
		var self = this, nodes;
		if (!menu) {
			nodes = this.menus.filter(function(item) {
				return !self.parent(item.state.name);
			});
		} else {
			nodes = this.findByParent(menu.state.name);
		}
		angular.forEach(nodes, function(node: any) {
			node.children = self.getTree(node);
			node.hasChild = angular.isDefined(node.children) && angular.isArray(node.children)
				? !!node.children.length
				: false;
		});
		return nodes;
	};
}
