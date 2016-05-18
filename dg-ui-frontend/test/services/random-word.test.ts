import * as angular from 'angular';
import 'angular-mocks';
import RandomWordService from '../../src/app/common/services/random-word';

describe('randomWordService', function() {

	beforeEach(angular.mock.module('app.services.random-word'));

	var $timeout: angular.ITimeoutService;
	var service: RandomWordService;

	beforeEach(angular.mock.inject(function(_$timeout_, randomWordService) {
		$timeout = _$timeout_;
		service = randomWordService;
	}));

	it('can get an instance of the service', function() {
		expect(service).toBeDefined();
	});

	it('can get an instance of the timeout service', function() {
		expect($timeout).toBeDefined();
	});

});
