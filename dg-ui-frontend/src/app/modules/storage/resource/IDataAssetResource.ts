import {IDataAsset, IDataAssetField, IDataSource, IWorkspace, IDataAssetLink, IDataAssetDataSetComp, IDatasetFileStructure} from "../model/IDataAsset";

export interface IDataAssetUnassignedArg {
    sourceName: String,
    workspace: String,
    assetName: String,
    dataSet: String
}

export interface IDataAssetUnassignedArgs {
    assetName: String,
    dataAssetDataSetComps: IDataAssetDataSetComp[]
}

export interface IDataAssetFindArgs {
    sourceName: String,
    type: String
}

export interface IDataAssetArgs {
    sourceName: String,
    assetName:String
}


export interface IDataAssetResource extends IDataAsset, angular.resource.IResource<IDataAsset> {} 

export interface IDataAssetFieldResource extends IDataAssetField, angular.resource.IResource<IDataAssetField> {}

export interface IDataSourceResource extends IDataSource, angular.resource.IResource<IDataSource> {}

export interface IWorkspaceResource extends IWorkspace, angular.resource.IResource<IWorkspace> {}

export interface IDataAssetLinkResource extends IDataAssetLink, angular.resource.IResource<IDataAssetLink> {}

export interface IDataAssetResourceClass extends angular.resource.IResourceClass<IDataAssetResource> {
    findAll(success:Function, error:Function):IDataAsset[];
    importDataAssets(sourceName:String): String;
    findBySourceNameAndType(arg: IDataAssetFindArgs,success:Function, error:Function):IDataAsset[];
    createDataAsset(dataAsset:IDataAsset);
    updateDataAssetSummary(dataAsset: IDataAsset, success:Function, error:Function): void;
    getDataAssetDetail(arg: IDataAssetArgs, success: Function, error: Function): IDataAsset;
    deleteDataAsset(arg: IDataAssetArgs, success: Function, error: Function): void;
    getDatasetStructure(datasetComp: IDataAssetDataSetComp, success: Function, error: Function): void;
    getDatasetFields(datasetComp: IDataAssetDataSetComp, success: Function, error: Function): void;
    getDataStructuresSummary({sourceName: String}, success: Function, error: Function): IDataAsset[];
}
    
export interface IDataAssetFieldResourceClass extends angular.resource.IResourceClass<IDataAssetFieldResource> {
    getFields(arg: IDataAssetArgs): IDataAssetField[];
}


export interface IDataSourceResourceClass extends angular.resource.IResourceClass<IDataSourceResource> {
    getDataSources(): IDataSource[];
    getAssignedLinks(arg: IDataAssetArgs, success: Function, error: Function): IDataAssetLink[];
    unassignDataAssetLinks({sourceName, assetName:String, linkIds}, success: Function, error: Function): void;
}

export interface IWorkspaceResourceClass extends angular.resource.IResourceClass<IWorkspaceResource> {
    getWorkspaces({sourceName: String}, success: Function, error: Function): IWorkspace[];
}

export interface IDataAssetLinkResourceClass extends angular.resource.IResourceClass<IDataAssetLinkResource> {
    getUnassignedFiles(arg: IDataAssetUnassignedArg, success: Function, error: Function): IDataAssetLink[];
    unassignDataAssetLink(arg: IDataAssetUnassignedArg, success: Function, error: Function): void;
    unassignDataAssetLinks({sourceName, assetName:String, linkIds}, success: Function, error: Function): void;
    assignDataAssetLink(arg: IDataAssetArgs,links:IDataAssetLink[], success: Function, error: Function):void;
}

