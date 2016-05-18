import * as angular from 'angular';
import './service/ReportingUniverseService';
import ReportingUniverseService from './service/ReportingUniverseService';

var component = angular.module('app.modules.reporting-studio.reporting-universe', [
        'app.services.reporting-universe'
    ])
    .directive('reportingUniverse', ['reportingUniverseService', 'ReportingUniverseResource', function(reportingUniverseService: ReportingUniverseService) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: function() {
                var ctrl = this;

                ctrl.reportingUniverses = reportingUniverseService.getReportingUniverseList();

                ctrl.model = {
                    universeName: undefined,
                    universeDesc: undefined
                };
                ctrl.initialModel = angular.copy(ctrl.model);

                /** Function to execute when the form submit button is clicked. */
                ctrl.submit = function () {
                    reportingUniverseService.createReportingUniverse(ctrl.model.universeName,ctrl.model.universeDesc);
                    ctrl.model = angular.copy(ctrl.initialModel);
                };

                /**
                 * Reset current model to initial model!
                 */
                ctrl.reset = function () {
                    // restore values from initial model
                    ctrl.model = angular.copy(ctrl.initialModel);
                };

            },
            controllerAs: 'ctrl',
            template: require('./reporting-universe.html')
        }
    }]).name;


export = component;