import * as angular from 'angular';

angular.module('app.services.random-word', [])
	.factory('randomWordService', ['$timeout',
		function($timeout: angular.ITimeoutService) {
			return new RandomWordService($timeout);
		}
	]);

export default class RandomWordService {
	private $timeout: angular.ITimeoutService;
	private words: Array<String> = ['Apple', 'Orange', 'Banana', 'Pineapple', 'Mango', 'Cherry'];

	constructor($timeout: angular.ITimeoutService) {
		this.$timeout = $timeout;
	}

	public cancelRequest(promise: angular.IPromise<Array<String>>): boolean {
		return this.$timeout.cancel(promise);
	}

	// Returns a promise. Emulates a web service call.
	public getWordAsync(): angular.IPromise<String> {
		return this.$timeout(() => {
			return this.words[Math.floor(Math.random() * this.words.length)];
		}, Math.floor(Math.random() * 2000) + 500);
	}

	// Returns a promise. Emulates a web service call.
	public getWordListAsync(): angular.IPromise<Array<String>> {
		return this.$timeout(() => {
			return this.shuffle(this.words);
		}, Math.floor(Math.random() * 2000) + 500);
	}

	private shuffle(input: Array<String>): Array<String> {
		var output = input.slice(0);
		for (var j, x, i = output.length; i; j = Math.floor(Math.random() * i), x = output[--i], output[i] = output[j], output[j] = x) {
			// No code
		}
		return output.slice(0, 3);
	}
}
