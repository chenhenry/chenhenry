import * as angular from 'angular';
import {ITranslateService} from 'angular-translate';
import {tmhDynamicLocaleService} from 'angular-dynamic-locale';

angular.module('app.services.localization', ['pascalprecht.translate', 'tmh.dynamicLocale'])
	.factory('localizationService', ['$translate', 'tmhDynamicLocale', 'LOCALES',
		function($translateProvider: ITranslateService, tmhDynamicLocale: tmhDynamicLocaleService, LOCALES: any) {
			return new LocalizationService($translateProvider, tmhDynamicLocale, LOCALES);
		}
	]);

interface ILocale {
	code: string;
	name: string;
}

export default class LocalizationService {
	private $translateProvider: ITranslateService;
	private tmhDynamicLocale: tmhDynamicLocaleService;
	private locales: ILocale[];
	private preferredLocale: string;
	private currentLocale: string;

	constructor($translateProvider: ITranslateService, tmhDynamicLocale: tmhDynamicLocaleService, LOCALES: any) {
		this.$translateProvider = $translateProvider;
		this.tmhDynamicLocale = tmhDynamicLocale;
		this.locales = LOCALES.locales;
		this.preferredLocale = LOCALES.preferredLocale;
		this.currentLocale = this.$translateProvider.proposedLanguage();
		this.setLocale(this.getCurrentLocale());
	}

	public getLocales(): ILocale[] {
		return this.locales;
	}

	public getCurrentLocale(): string {
		return this.currentLocale ? this.currentLocale : this.preferredLocale;
	}

	public isValidLocale(locale: string): boolean {
		var isValid = false;

		angular.forEach(this.getLocales(), function(item) {
			if (item.code === locale) {
				isValid = true;
			}
		});

		return isValid;
	}

	public setLocale(locale: string): void {
		if (!this.isValidLocale(locale)) {
			console.error('Locale name "' + locale + '" is invalid.');
		}

		this.currentLocale = locale;
		document.documentElement.setAttribute('lang', locale); // Set language on HTML doc
		this.$translateProvider.use(locale); // Set angular-translate to locale
		this.tmhDynamicLocale.set(locale); // Set dynamic-locale to locale
	}
}
