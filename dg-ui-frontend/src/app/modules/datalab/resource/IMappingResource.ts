import {IConcept, IMapping, IResponseModel, IDomainModel} from "../model/IMapping";

export interface IFindByDomainCodeVersionArg {
  domainCode:String,
  domainVersion:String
}

export interface IConceptResource extends angular.resource.IResourceClass<IConcept> {
    find(arg: IFindByDomainCodeVersionArg, success:Function, error:Function):IConcept[];
}

export interface IFindArg {
  domainVersion:String;
  domainCode:String;
  conceptCode:String;
}

export interface IMappingResource extends angular.resource.IResourceClass<IMapping> {
    getMappings(arg: IFindArg): IMapping[];
    deleteMapping(mapping:IMapping, success:Function, error:Function): IResponseModel;
    update(mapping:IMapping, success:Function, error:Function);
}

export interface IDomainResource extends angular.resource.IResourceClass<IDomainModel> {
    findAll(success:Function, error:Function): IDomainModel[];
}
