import {IClient, IGood, IFile, IBrand, ICategory, IOrder} from "../model/IDg";

export interface IFindArg {
  name:String,
  id:number
}

export interface PutFileStructureArg {
  file_id:number,
  file_structure_id:number
}

export interface ICategoryResource extends IClient, angular.resource.IResource<ICategory> {} 
export interface IBrandResource extends IClient, angular.resource.IResource<IBrand> {} 
export interface IClientResource extends IClient, angular.resource.IResource<IClient> {} 
export interface IGoodResource extends IGood, angular.resource.IResource<IGood> {} 
export interface IFileResource extends IFile, angular.resource.IResource<IFile> {}
export interface IOrderResource extends IFile, angular.resource.IResource<IOrder> {}

export interface IOrderResourceClass extends angular.resource.IResourceClass<IOrderResource> {
    findAll(success:Function, error:Function):IOrder[];
    findById({id: String}, success:Function, error:Function):IOrder;
    saveOrder(order: IOrder, success:Function, error:Function): IOrder;
    updateOrder(order: IOrder, success:Function, error:Function): void;
    deleteOrder(id: String, success: Function, error: Function): void;
}

export interface ICategoryResourceClass extends angular.resource.IResourceClass<ICategoryResource> {
    findAll(success:Function, error:Function):ICategory[];
    findById({id: String}, success:Function, error:Function):ICategory;
    createCategory(category:ICategory);
    updateCategory(category: ICategory, success:Function, error:Function): void;
    deleteCategory(id: String, success: Function, error: Function): void;
}

export interface IBrandResourceClass extends angular.resource.IResourceClass<IBrandResource> {
    findAll(success:Function, error:Function):IBrand[];
    findById({id: String}, success:Function, error:Function):IBrand;
    createBrand(brand:IBrand);
    updateBrand(brand: IBrand, success:Function, error:Function): void;
    deleteBrand(id: String, success: Function, error: Function): void;
}

export interface IClientResourceClass extends angular.resource.IResourceClass<IClientResource> {
    findAll(success:Function, error:Function):IClient[];
    findById({id: String}, success:Function, error:Function):IClient;
    createClient(client:IClient);
    updateClient(client: IClient, success:Function, error:Function): void;
    deleteClient(id: String, success: Function, error: Function): void;
}

export interface IGoodResourceClass extends angular.resource.IResourceClass<IGoodResource> {
    findAll(success:Function, error:Function):IGood[];
    findAllByBrand({brand: String}, success:Function, error:Function):IGood[];
    findAllByCategory({category: String}, success:Function, error:Function):IGood[];
    findById({id: String}, success:Function, error:Function):IGood;
    createGood(client:IGood);
    updateGood(client: IGood, success:Function, error:Function): void;
    deleteGood(id: String, success: Function, error: Function): void;
}

export interface IFileResourceClass extends angular.resource.IResourceClass<IFileResource> {
  putFileStructure(arg:PutFileStructureArg);
}
