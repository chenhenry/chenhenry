import * as angular from 'angular';
import 'angular-ui-router';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';
import {CONSTANTS} from "./constants";

angular.module('app').config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider: IStateProvider,
		$urlRouterProvider: IUrlRouterProvider) {
		// App Routing
		$urlRouterProvider.otherwise('/dashboard');
 
 if(CONSTANTS.atlas.ui.frontendOnly){
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				template: '<dashboard></dashboard>',
				data: {
					menu: {
						name: 'Dashboard',
						icon: 'fa-dashboard'
					}
				}
			})
			// .state('page3', {
			// 	url: '/page3',
			// 	template: '<page3></page3>',
			// 	data: {
			// 		menu: {
			// 			name: 'Localization',
			// 			icon: 'fa-calculator'
			// 		}
			// 	}
			// });
        }}]);

//leave UX team sample for now - clean up later
import '../modules/graphs/graphs.routes.ts';
import '../modules/page4/page4.routes';

// Module Specific Routes
import '../modules/settings/settings.routes';
import '../modules/reporting-studio/reporting-studio.routes';
import '../modules/storage/storage.routes';
import '../modules/datalab/datalab.routes';

