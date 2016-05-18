/**
 * Created by zingrafj on 4/19/2016.
 */
import * as angular from 'angular';

angular.module('app.modules.reporting-studio.sample', ['ers.components.grid'
    ])
    .directive('sample', [function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: SampleController,
            controllerAs: 'ctrl',
            template: require('./sample.html')
        }
    }]).name;

/**
 * Sample Controller, only here for demo purpose
 */
export class SampleController {

    // public fileContent:string;
    // public dataLoaded:boolean;

    /**
     * Constructor.
     */
    constructor() {
    }

    /**
     *
     * @returns {string} with Hello world ! is it not beautiful ?
     */
    public helloWorld():String {
        return "Hello World ! You are in Sample Controller !";
    }

    // public displayFileContent(filePath:string):void {
    //     this.fileContent = FakeDataService.getDataFromJSONFile(filePath);
    //     this.dataLoaded = true;
    // }
}