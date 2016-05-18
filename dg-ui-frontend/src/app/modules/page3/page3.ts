import * as angular from 'angular';

import '../../common/services/localization';
import LocalizationService from '../../common/services/localization';
import '../../common/components/language-selector/language-selector';



var component = angular.module('app.modules.page3', [
	'app.components.language-selector',
	'app.services.localization'
])
	.directive('page3', ['localizationService', function(localizationService: LocalizationService) {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;

				ctrl.currentLocale = localizationService.getCurrentLocale();
				ctrl.numberExample = 1000000;
				ctrl.dateExample = new Date();
			},
			controllerAs: 'ctrl',
			template: require('./page3.html')
		};
	}]).name;

export = component;
