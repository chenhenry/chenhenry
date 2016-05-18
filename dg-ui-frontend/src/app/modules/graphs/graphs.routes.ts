import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';
import {CONSTANTS} from "../../common/constants";

if(CONSTANTS.atlas.ui.frontendOnly){
angular.module('app').config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider: IStateProvider,
		$urlRouterProvider: IUrlRouterProvider) {

		$urlRouterProvider.when('/graphs', '/graphs/hierarchy');

		$stateProvider
			.state('graphs', {
				url: '/graphs',
				template: '<graphs></graphs>',
				data: {
					menu: {
						name: 'Graph Examples',
						icon: 'fa-download',
						showSubmenu: true
					}
				}
			}).state('graphs.hierarchy', {
				url: '/hierarchy',
				template: '<hierarchy-example></hierarchy-example>',
				data: {menu: {
					name: 'Hierarchy'
				}
			}
			}).state('graphs.workflow1', {
				url: '/workflow1',
				template: '<workflow-example></workflow-example>',
				data: {
					menu: {
						name: 'Workflow 1'
					}
				}
			}).state('graphs.workflow2', {
				url: '/workflow2',
				template: '<workflow2-example></workflow2-example>',
				data: {
					menu: {
						name: 'Workflow 2'
					}
				}
			}).state('graphs.workflow3', {
				url: '/workflow3',
				template: '<workflow3-example></workflow3-example>',
				data: {
					menu: {
						name: 'Workflow 3'
					}
				}
			});
	}]);
}