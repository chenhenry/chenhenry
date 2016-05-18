import * as angular from 'angular';
import '../resource/MappingResourceModule';
import {IConceptResource, IMappingResource,IDomainResource} from "../resource/IMappingResource";
import {IConcept, IMapping, IResponseModel,IDomainModel} from "../model/IMapping";
import {IDataAssetResourceClass, IDataAssetFieldResourceClass} from "../../storage/resource/IDataAssetResource";
import {IDataAsset, IDataAssetField} from "../../storage/model/IDataAsset";

angular.module('app.modules.datalab.services.mapping', ['atlas.mapping.resource']) 
    .factory('mappingService', [
        '$timeout',
        'ConceptResource',
        'DomainResource',
        'MappingResource',
        'dataAssetResourceClass',
        'dataAssetFieldResourceClass',
        function ($timeout:angular.ITimeoutService, conceptResource: IConceptResource, domainResource: IDomainResource, mappingResource: IMappingResource, 
            dataAssetResource: IDataAssetResourceClass, dataAssetFieldResource: IDataAssetFieldResourceClass) {
            return new MappingService($timeout, conceptResource,domainResource, mappingResource, dataAssetResource, dataAssetFieldResource);
        }
    ]);

export default class MappingService {
    
    static $inject = ["$timeout", "conceptResource","domainResource", "mappingResource","dataAssetResource", "dataAssetFieldResource"];


    constructor(private $timeout:angular.ITimeoutService, private conceptResource: IConceptResource, 
    private domainResource: IDomainResource, 
    private mappingResource: IMappingResource,
    private dataAssetResource:IDataAssetResourceClass, 
    private dataAssetFieldResource: IDataAssetFieldResourceClass) {
        
    }

    public cancelRequest(promise:angular.IPromise<any>) {
        this.$timeout.cancel(promise);
    }

    // Returns a promise. Emulates a web service call.
    public getAttributesAsync(domainCode: String, domainVersion: String, success:Function, error:Function):angular.IPromise<any> {
        return this.$timeout(() => {
            return this.conceptResource.find({"domainCode": domainCode, "domainVersion": domainVersion}, success,error);
        }, Math.floor(Math.random() * 1500) + 500);
    }

    public getDataAssetList(success:Function, error:Function):angular.IPromise<any>  {
        return this.$timeout(() => {
            return this.dataAssetResource.findAll(success,error);
        }, Math.floor(Math.random() * 2500) + 500);
    }
    
    public getFields(sourceName:String, assetName:String): IDataAssetField[] {
        return this.dataAssetFieldResource.getFields({sourceName:sourceName, assetName:assetName});
    }
    
    public getMappings(domainVersion:String, domainCode:String, conceptCode:String):angular.IPromise<any> {
        return this.$timeout(() => {
            return this.mappingResource.getMappings({domainVersion: domainVersion,domainCode: domainCode, conceptCode:conceptCode});
        }, Math.floor(Math.random() * 1500) + 500);
    }
    
    public createExpression(mapping:IMapping, success:Function, error:Function):IMapping {
        return this.mappingResource.save(mapping, success,error);
    }
    
    public updateExpression(mapping:IMapping, success:Function, error:Function):void {
        this.mappingResource.update(mapping, success,error);
    }
    
    public deleteExpression(mapping:IMapping, success:Function, error:Function):IResponseModel {
        return this.mappingResource.deleteMapping(mapping, success,error);
    }
    
    public getAllDomains(success:Function, error:Function):IDomainModel[] {
        return this.domainResource.findAll(success,error);
    }
}