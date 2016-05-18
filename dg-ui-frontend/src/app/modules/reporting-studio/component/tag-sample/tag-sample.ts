import * as angular from 'angular';
import './tag-sample-controller';
import TagSampleController from './tag-sample-controller';


var component = angular.module('app.modules.reporting-studio.tag-sample', ['ers.components.grid'
    ])
    .directive('tagSample', [function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: TagSampleController,
            controllerAs: 'ctrl',
            template: require('./tag-sample.html')
        }
    }]).name;

export = component;