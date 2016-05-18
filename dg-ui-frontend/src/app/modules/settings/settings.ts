import * as angular from 'angular';

var component = angular.module('app.modules.settings', [
])
	.directive('settings', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;

				ctrl.states = [{ name: 'California', value: 'CA' }, { name: 'New York', value: 'NY' }];

				ctrl.user = {};
				ctrl.user.firstname = 'John';
				ctrl.user.lastname = 'Smith';
				ctrl.user.email = 'john.smith@moodys.com';
				ctrl.user.phone = '555-123-3456';
				ctrl.user.city = 'San Francisco';
				ctrl.user.state = ctrl.states[0];
				ctrl.user.zip = '94105';
			},
			controllerAs: 'ctrl',
			template: require('./settings.html')
		};
	}).name;

export = component;
