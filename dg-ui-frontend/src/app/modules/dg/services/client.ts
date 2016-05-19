import * as angular from 'angular';
import '../resource/ClientResourceModule';
import {IClientResource} from "../resource/IClientResource";
import {IClient} from "../model/IClient";

angular.module('app.modules.dg.services.client', ['atlas.dg.resource']) 
    .factory('clientService', [
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
    
    public getClientList(success: Function, error: Function): Array<IClient> {
        return this.clientResource.findAll(success, error);
    }

    public saveClient(client:IClient, success:Function, error:Function):IClient {
        return this.clientResource.save(client, success,error);
    }
    
    public getClientById(id:String, success:Function, error:Function):IClient {
        return this.clientResource.findById(id, success,error);
    }
    
    public updateClient(client: IClient, success:Function, error:Function): void{
        this.updateClient(client, success, error);
    }
    
    public deleteClient(id: String, success: Function, error: Function): void{
        this.deleteClient(id, success, error);
    }


}