import * as angular from 'angular';
import '../../services/localization';
import LocalizationService from '../../services/localization';

var component = angular.module('app.components.language-selector', ['app.services.localization'])
	.directive('languageSelector', ['localizationService', function(localizationService: LocalizationService) {
		return {
			restrict: 'E',
			replace: true,
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;
				ctrl.locales = localizationService.getLocales();

				var localeGetter = function() {
					for (var i = 0; i < ctrl.locales.length; i++) {
						if (localizationService.getCurrentLocale() === ctrl.locales[i].code) {
							ctrl.currentLocale = ctrl.locales[i];
						}
					}
				};

				localeGetter();

				ctrl.changeLanguage = function(locale) {
					localizationService.setLocale(locale.code);
					localeGetter();
				};
			},
			controllerAs: 'ctrl',
			template: require('./language-selector.html')
		};
	}]).name;

export = component;
