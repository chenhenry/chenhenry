import * as angular from 'angular';
import './component/reporting-universe/reporting-universe';
import './component/tag-sample/tag-sample';
import './component/sample/sample';

var component = angular.module('app.modules.reporting-studio', [
        'ers.components.all',
        'app.modules.reporting-studio.reporting-universe',
        'app.modules.reporting-studio.sample',
        'app.modules.reporting-studio.tag-sample'

    ])
    .directive('reportingStudio', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: function() {
                var ctrl = this;
            },
            controllerAs: 'ctrl',
            template: require('./reporting-studio.html')
        }
    }).name;

export = component;