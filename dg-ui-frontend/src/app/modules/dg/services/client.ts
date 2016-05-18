import * as angular from 'angular';
import '../resource/ClientResourceModule';
import {IClientResource} from "../resource/IClientResource";
import {IClient} from "../model/IClient";

angular.module('app.modules.dg.services.client', ['atlas.dg.resource']) 
    .factory('mappingService', [
        '$timeout',
        'ClientResource',
        function ($timeout:angular.ITimeoutService, clientResource: IClientResource) {
            return new ClientService($timeout, clientResource);
        }
    ]);

export default class ClientService {
    
    static $inject = ["$timeout", "clientResource"];


    constructor(private $timeout:angular.ITimeoutService, private clientResource: IClientResource) {
        
    }

    public cancelRequest(promise:angular.IPromise<any>) {
        this.$timeout.cancel(promise);
    }

    
    public createExpression(mapping:IClient, success:Function, error:Function):IClient {
        return this.clientResource.save(mapping, success,error);
    }
    

}