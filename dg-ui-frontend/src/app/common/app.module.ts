// CSS
import './style/default.scss';
import './style/metadata.scss';

// Angular Libs

import 'angular';
import 'angular-ui-router';
import 'ui-router-extras';
import 'angular-cookies';
import 'angular-animate';
import 'angular-file-upload';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-dynamic-locale';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-translate-handler-log';
import 'angular-translate-storage-cookie';

// Galileo Components

import 'lodash';
import 'file?name=jquery.min.js!jquery/dist/jquery.min.js';
import 'angular-ui-bootstrap';
import 'ag-grid/dist/ag-grid.js';
import 'ers-bootstrap-dropdown';
import 'ers-ui-components/ers-ui-components-with-tpls.js';

// App Components
import 'components/layout/header-bar/header-bar';
import 'components/layout/left-nav/left-nav';

// App Modules

import 'modules/dashboard/dashboard';
import 'modules/page3/page3';
import 'modules/page4/page4';
import 'modules/settings/settings';
import 'modules/reporting-studio/reporting-studio';
import 'modules/dg/dg';
import './endpoints';
import {CONSTANTS} from "./constants";


function getAppModules(): string[] {
    var requiredModules = [
		// Vendor
		'ui.router',
		'ngCookies',
		'ngAnimate',
		'pascalprecht.translate',
		'tmh.dynamicLocale',
		// App Components
		'app.components.layout.header-bar',
		'app.components.layout.left-nav'];


    var uxSampleModules = [
        'app.modules.dashboard',
        'app.modules.page3',
        'app.modules.page4',
        'app.modules.settings',
    ];

    var atlasAppModules = [
        'app.modules.reporting-studio',
        'app.modules.dg'];

    var allModules = requiredModules.concat(atlasAppModules);
    allModules = allModules.concat(uxSampleModules);


    return allModules;
}

var app = angular.module('app', getAppModules());

//boot app manually to assure that the end points is loaded from server before the application started

if (!CONSTANTS.atlas.ui.frontendOnly) {
	console.log("not frontendOnly - get configuration from server....");
	angular.element(document).ready(function () {
		$.get("/uiconfig").done(function (resp) {
			angular.module("app.configs.endpoint").constant("endpoints", resp.services.endpoints);
			angular.bootstrap(document, ['app']);
		}).fail(function () {
			throw "Unable to load endpoints from server side";
		})
	});
}
else {
	console.log(" frontendOnly - mock constant uiconfig....");
	angular.element(document).ready(function () {
		angular.module("app.configs.endpoint").constant("endpoints", CONSTANTS.atlas.ui.mockedServiceEndpoints);
		angular.bootstrap(document, ['app']);
	});

}

exports = app.name;