/**
 * Created by zingrafj on 4/14/2016.
 */

import * as angular from 'angular';
import * as fs from 'fs';

angular.module('app.modules.reporting-studio.services.fake-data-service', [])
    .factory('fakeDataService', ['$timeout',
        function($timeout: angular.ITimeoutService) {
            return new FakeDataService($timeout);
        }
    ]);

export default class FakeDataService {
    private $timeout: angular.ITimeoutService;
    private bestAnswers: Array<String> = ["Have you clean your cash ?" ,
                                    'It works on my computer',
                                    'In doubt, reboot !',
                                    'Do you check the log ?',
                                    'Do you have a debug version ?',
                                    "It's not in the features description !"];

    constructor($timeout: angular.ITimeoutService) {
        this.$timeout = $timeout;
    }

    public cancelRequest(promise: angular.IPromise<Array<String>>): boolean {
        return this.$timeout.cancel(promise);
    }

    // Returns a promise. Emulates a web service call.
    public getWordAsync(): angular.IPromise<String> {
        return this.$timeout(() => {
            return this.bestAnswers[Math.floor(Math.random() * this.bestAnswers.length)];
        }, Math.floor(Math.random() * 2000) + 500);
    }

    // Returns a promise. Emulates a web service call.
    public getWordListAsync(): angular.IPromise<Array<String>> {
        return this.$timeout(() => {
            return this.shuffle(this.bestAnswers);
        }, Math.floor(Math.random() * 2000) + 500);
    }

    private shuffle(input: Array<String>): Array<String> {
        var output = input.slice(0);
        for (var j, x, i = output.length; i; j = Math.floor(Math.random() * i), x = output[--i], output[i] = output[j], output[j] = x) {
            // No code
        }
        return output.slice(0, 3);
    }

    //TODO :
    // Load data from REST Service

    // Load data from JSON File
    public getDataFromJSONFile(filePath:string):any {
        var fileContent:string;
        //check file exist
        if (fs.exists(filePath)) {
            fileContent = fs.readFileSync(filePath,'utf8');
        } else {
            fileContent = "File Don't Exist";
        }
        return fileContent;
    }
}
