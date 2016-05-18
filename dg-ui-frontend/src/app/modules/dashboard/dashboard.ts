import * as angular from 'angular';
import '../../common/components/random-fruit/random-fruit';
import './bank-list/bank-list';

var component = angular.module('app.modules.dashboard', [
	'app.components.random-fruit',
	'app.modules.dashboard.bank-list'
])
	.directive('dashboard', function() {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;

				ctrl.chartData = {
					chart: {
						caption: 'Top 5 Stores by Revenue',
						numberPrefix: '\u0024',
						theme: 'zune'
					},
					data: [{
						label: 'Bakersfield Central',
						value: '880000'
					},
						{
							label: 'Garden Groove harbour',
							value: '730000'
						},
						{
							label: 'Los Angeles Topanga',
							value: '590000'
						},
						{
							label: 'Compton-Rancho Dom',
							value: '520000'
						},
						{
							label: 'Daly City Serramonte',
							value: '330000'
						}]
				};
			},
			controllerAs: 'ctrl',
			template: require('./dashboard.html')
		};
	}).name;

export = component;
