import * as angular from 'angular';
import 'angular-mocks';
import 'modules/dashboard/bank-list/bank-list';

describe('bankList', function() {

	beforeEach(angular.mock.module('app.modules.dashboard.bank-list'));

	var $compile: angular.ICompileService;
	var $rootScope: angular.IRootScopeService;

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('should display the component', function() {
		// Compile a piece of HTML containing the directive
		var element = $compile('<bank-list></bank-list>')($rootScope);

		// fire all the watches
		$rootScope.$digest();

		// Check
		var html = element.html();
		expect(html).not.toBeFalsy();
	});

	it('should display the title', function() {
		// Compile a piece of HTML containing the directive
		var element = $compile('<bank-list data-title="Test String"></bank-list>')($rootScope);

		// fire all the watches
		$rootScope.$digest();

		// Check
		var html = element.html();
		expect(html).toContain('Test String');
	});

});
