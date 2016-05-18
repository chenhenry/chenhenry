import * as angular from 'angular';
import 'angular-mocks';
import 'components/random-fruit/random-fruit';

describe('randomFruit', function() {

	beforeEach(angular.mock.module('app.components.random-fruit'));

	var $compile: angular.ICompileService;
	var $rootScope: angular.IRootScopeService;
	var $q: angular.IQService;
	var randomWordService;

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$q_, _randomWordService_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		randomWordService = _randomWordService_;
	}));

	it('should display the component', function() {
		// Compile a piece of HTML containing the directive
		var element = $compile('<random-fruit></random-fruit>')($rootScope);

		// fire all the watches
		$rootScope.$digest();

		// Check
		var html = element.html();
		expect(html).not.toBeFalsy();
	});

	it('should display the title', function() {
		// Compile a piece of HTML containing the directive
		var element = $compile('<random-fruit></random-fruit>')($rootScope);

		// fire all the watches
		$rootScope.$digest();

		// Check
		var html = element.html();
		expect(html).toContain('Random Fruit');
	});

	it('should display 3 items', function() {
		spyOn(randomWordService, 'getWordListAsync').and.returnValue($q.when(['item 1', 'item 2', 'item 3']));

		// Compile a piece of HTML containing the directive
		var element = $compile('<random-fruit></random-fruit>')($rootScope);

		// fire all the watches
		$rootScope.$digest();

		// Check		
		var items = element.find('li').length;
		expect(items).toBe(3);

		var html = element.html();
		expect(html).toContain('item 1');
		expect(html).toContain('item 2');
		expect(html).toContain('item 3');
	});

});
