import * as angular from 'angular';
import 'angular-ui-router';
import {IUrlRouterProvider} from 'angular-ui-router';

angular.module('app').config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider,
		$urlRouterProvider: IUrlRouterProvider) {

		// $urlRouterProvider.when('/settings', '/settings/page1');

		$stateProvider
			.state('settings', {
				url: '/settings',
				template: '<settings></settings>'
			}).state('settings.page1', {
				url: '/page1',
				template: '<settings-page1></settings-page1>'
			}).state('settings.page2', {
				url: '/page2',
				template: '<settings-page2></settings-page2>'
			});
	}]);
