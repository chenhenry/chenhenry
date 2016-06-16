import {IGood} from "../model/IGood";

export interface IFindArg {
  name:String,
  id:number
}

export interface IGoodResource extends IGood, angular.resource.IResource<IGood> {} 

export interface IGoodResource extends angular.resource.IResourceClass<IGoodResource> {
    findAll(success:Function, error:Function):IGood[];
    findById(id: String, success:Function, error:Function):IGood;
    createGood(client:IGood);
    updateGood(client: IGood, success:Function, error:Function): void;
    deleteGood(id: String, success: Function, error: Function): void;
}

