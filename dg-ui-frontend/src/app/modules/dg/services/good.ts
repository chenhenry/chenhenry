import * as angular from 'angular';
import '../resource/GoodResourceModule';
import {IGoodResource} from "../resource/IGoodResource";
import {IGood} from "../model/IGood";

angular.module('app.modules.dg.services.good', ['atlas.dg.resource']) 
    .factory('goodService', [
        '$timeout',
        'GoodResource',
        function ($timeout:angular.ITimeoutService, goodResource: IGoodResource) {
            return new GoodService($timeout, goodResource);
        }
    ]);

export default class GoodService {
    
    static $inject = ["$timeout", "goodResource"];


    constructor(private $timeout:angular.ITimeoutService, private goodResource: IGoodResource) {
        
    }

    public cancelRequest(promise:angular.IPromise<any>) {
        this.$timeout.cancel(promise);
    }
    
    public getGoodList(success: Function, error: Function): Array<IGood> {
        return this.goodResource.findAll(success, error);
    }

    public saveGood(good:IGood, success:Function, error:Function):IGood {
        return this.goodResource.save(good, success,error);
    }
    
    public getGoodById(id:String, success:Function, error:Function):IGood {
        return this.goodResource.findById(id, success,error);
    }
    
    public updateGood(good: IGood, success:Function, error:Function): void{
        this.goodResource.updateGood(good, success, error);
    }
    
    public deleteGood(id: String, success: Function, error: Function): void{
        this.goodResource.deleteGood(id, success, error);
    }


}