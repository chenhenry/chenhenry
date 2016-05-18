import {IClient} from "../model/IClient";

export interface IFindArg {
  name:String,
  id:number
}

export interface IClientResource extends IClient, angular.resource.IResource<IClient> {} 

export interface IClientResource extends angular.resource.IResourceClass<IClientResource> {
    find(arg: IFindArg, success:Function, error:Function):IClient[];
}

