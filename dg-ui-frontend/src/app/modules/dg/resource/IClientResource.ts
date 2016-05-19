import {IClient} from "../model/IClient";

export interface IFindArg {
  name:String,
  id:number
}

export interface IClientResource extends IClient, angular.resource.IResource<IClient> {} 

export interface IClientResource extends angular.resource.IResourceClass<IClientResource> {
    findAll(success:Function, error:Function):IClient[];
    findById(id: String, success:Function, error:Function):IClient;
    createClient(client:IClient);
    updateClient(client: IClient, success:Function, error:Function): void;
    deleteClient(id: String, success: Function, error: Function): void;
}

