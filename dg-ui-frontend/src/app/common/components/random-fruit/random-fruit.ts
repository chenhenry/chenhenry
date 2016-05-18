import * as angular from 'angular';
import '../../services/random-word';
import RandomWordService from '../../services/random-word';

var component = angular.module('app.components.random-fruit', ['app.services.random-word'])
	.directive('randomFruit', ['randomWordService', function(randomWordService: RandomWordService) {
		return {
			replace: true,
			restrict: 'E',
			scope: {},
			bindToController: {
			},
			controller: function() {
				var ctrl = this;
				var request: angular.IPromise<Array<String>>;

				ctrl.refresh = function() {
					ctrl.loading = true;

					// Cancel previous request
					if (request) {
						randomWordService.cancelRequest(request);
					}

					// Create new request to the service
					request = randomWordService.getWordListAsync();

					// Update the data once request returns
					request.then(function(data) {
						ctrl.words = data;
						ctrl.loading = false;
					});
				};

				// Init
				ctrl.refresh();
			},
			controllerAs: 'ctrl',
			template: require('./random-fruit.html')
		};
	}]).name;

export = component;
