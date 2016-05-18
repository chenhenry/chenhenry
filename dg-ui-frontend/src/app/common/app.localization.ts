import * as angular from 'angular';
import {ITranslateProvider} from 'angular-translate';
import {tmhDynamicLocaleProvider} from 'angular-dynamic-locale';

angular.module('app').config([
	'$translateProvider',
	'tmhDynamicLocaleProvider',
	function($translateProvider: ITranslateProvider,
		tmhDynamicLocaleProvider: tmhDynamicLocaleProvider) {

		// Internalization Support
		$translateProvider.useMissingTranslationHandlerLog();

		$translateProvider.useStaticFilesLoader({
			prefix: '/resources/locale-',
			suffix: '.json'
		});

		$translateProvider.useCookieStorage();
		$translateProvider.preferredLanguage('en-us');
		$translateProvider.useSanitizeValueStrategy('escape');

		// Localization Support
		tmhDynamicLocaleProvider.localeLocationPattern('locales/angular-locale_{{locale}}.js');
	}]);
