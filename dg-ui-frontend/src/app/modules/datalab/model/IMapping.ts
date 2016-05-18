export interface IConcept extends angular.resource.IResource<IConcept> {
    id:number;
    code:String;
    label: String;
    dataType:String;
    description: String;
}

export interface IMapping extends angular.resource.IResource<IMapping> { 
    expression: String;
    id: Number;
    source_asset_code: String;
    target_concept_code: String;
    target_domain_code: String;
    target_domain_version: String;
}

export interface IResponseModel extends angular.resource.IResource<IResponseModel> { 
    code: Number;
    message: String;
    status: String;
}

export interface IDomainModel extends angular.resource.IResource<IDomainModel> { 
    id: Number;
    code: String;
    version:String;
    description: String;
}