"use strict";
import * as angular from 'angular';
import '../resource/StorageResourceModule';

import {
    IDataAssetResource,
    IDataAssetResourceClass,
    IDataAssetFieldResourceClass,
    IDataSourceResourceClass,
    IWorkspaceResourceClass,
    IDataAssetLinkResourceClass
} from "../resource/IDataAssetResource";
import {IDataAsset, IDataAssetField, IDataSource, IWorkspace, IDataAssetDataSetComp, IDataAssetLink} from "../model/IDataAsset";

angular.module('app.services.dataasset', ['atlas.storage.resource'])
    .factory('dataassetService', [
        'dataAssetResourceClass',
        'dataAssetFieldResourceClass',
        'dataSourceResourceClass',
        'workspaceResourceClass',
        'dataAssetLinkResourceClass',
        function(dataAssetResourceClass: IDataAssetResourceClass, dataAssetFieldResourceClass: IDataAssetFieldResourceClass,
            dataSourceResourceClass: IDataSourceResourceClass, workspaceResourceClass: IWorkspaceResourceClass, dataAssetLinkResourceClass: IDataAssetLinkResourceClass) {
            return new DataAssetService(dataAssetResourceClass, dataAssetFieldResourceClass, dataSourceResourceClass, workspaceResourceClass, dataAssetLinkResourceClass);
        }
    ]);

export default class DataAssetService {

    static $inject = ["dataAssetResourceClass", "dataAssetFieldResourceClass", "dataSourceResourceClass", "workspaceResourceClass", "dataAssetLinkResourceClass"];

    constructor(private dataAssetResourceClass: IDataAssetResourceClass,
        private dataAssetFieldResourceClass: IDataAssetFieldResourceClass,
        private dataSourceResourceClass: IDataSourceResourceClass,
        private workspaceResourceClass: IWorkspaceResourceClass,
        private dataAssetLinkResourceClass: IDataAssetLinkResourceClass) {
    }

    public getDataAssetList(success: Function, error: Function): Array<IDataAsset> {
        return this.dataAssetResourceClass.findAll(success, error);
    }

    public getDataAssetListBySourceNameAndType(sourceName: String, type: String, success: Function, error: Function): Array<IDataAsset> {
        return this.dataAssetResourceClass.findBySourceNameAndType({ "sourceName": sourceName, "type": type }, success, error);
    }

    public importDataAssets(sourceName: String): String {
        return this.dataAssetResourceClass.importDataAssets(sourceName);
    }

    public getFields(sourceName: String, assetName: String): IDataAssetField[] {
        return this.dataAssetFieldResourceClass.getFields({ sourceName: sourceName, assetName: assetName });
    }

    public create(dataasset: IDataAsset, success?: Function, error?: Function): void {
        this.dataAssetResourceClass.save(dataasset, success, error);
    }

    public getDataSources(): Array<IDataSource> {
        return this.dataSourceResourceClass.getDataSources();
    }

    public getAssignedLinks(sourceName: String, assetName: String, success: Function, error: Function): IDataAssetLink[] {
        return this.dataSourceResourceClass.getAssignedLinks({ sourceName: sourceName, "assetName": assetName }, success, error);
    }

    public getWorkspaces(sourceName: String, success: Function, error: Function): IWorkspace[] {
        return this.workspaceResourceClass.getWorkspaces({ "sourceName": sourceName }, success, error);
    }

    public getAassignedFiles(sourceName: String, workspace: String, success: Function, error: Function): IDataAssetLink[] {
        return this.dataAssetLinkResourceClass.getUnassignedFiles({ "sourceName": sourceName, "workspace": workspace, "assetName": null, "dataSet": null }, success, error);
    }

    public unassignDataAssetLink(sourceName: String, workspace: String, assetName: String, dataSet: String, success: Function, error: Function): void {
        return this.dataAssetLinkResourceClass.unassignDataAssetLink({ "sourceName": sourceName, "workspace": workspace, "assetName": assetName, "dataSet": dataSet }, success, error);
    }

    public assignDataAssetLink(sourceName: String, assetName: String, links: IDataAssetLink[], success: Function, error: Function): void {
        return this.dataAssetLinkResourceClass.assignDataAssetLink({ sourceName: sourceName, "assetName": assetName }, links, success, error);
    }

    public unassignDataAssetLinks(sourceName: String, assetName: String, linkIds: String, success: Function, error: Function): void {
        return this.dataSourceResourceClass.unassignDataAssetLinks({ sourceName: sourceName, "assetName": assetName, "linkIds": linkIds }, success, error);
    }

    public getDataAssetDetail(sourceName: String, assetName: String, success: Function, error: Function): IDataAsset {
        return this.dataAssetResourceClass.getDataAssetDetail({ sourceName: sourceName, assetName: assetName }, success, error);
    }

    public deleteDataAsset(sourceName: String, assetName: String, success: Function, error: Function): void {
        this.dataAssetResourceClass.deleteDataAsset({ sourceName: sourceName, "assetName": assetName }, success, error);
    }

    public getDatasetStructure(datasetComp: IDataAssetDataSetComp, success: Function, error: Function): void {
        this.dataAssetResourceClass.getDatasetStructure(datasetComp, success, error);
    }

    public getDatasetFields(datasetComp: IDataAssetDataSetComp, success: Function, error: Function): void {
        this.dataAssetResourceClass.getDatasetFields(datasetComp, success, error);
    }

    public getDataStructuresSummary(sourceName: String, success: Function, error: Function): IDataAsset[] {
        return this.dataAssetResourceClass.getDataStructuresSummary({ "sourceName": sourceName }, success, error);
    }

    public updateDataAssetSummary(dataAsset: IDataAsset, success: Function, error: Function): void {
        return this.dataAssetResourceClass.updateDataAssetSummary(dataAsset, success, error);
    }
}