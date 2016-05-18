import * as angular from 'angular';

angular.module('app').constant('LOCALES', {
	locales: [
		{ code: 'en-us', name: 'English' },
		{ code: 'fr-fr', name: 'Français' },
		{ code: 'ru-ru', name: 'Русский' },
		{ code: 'zh-cn', name: '中文' }
	],
	preferredLocale: 'en-us'
});
