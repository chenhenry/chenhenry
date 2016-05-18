import * as angular from 'angular';

export interface IReportingUniverse extends angular.resource.IResource<IReportingUniverse> {
    id: number;
    name: string;
    description: string;
    version: string;
    creator: string;
    createTime: string;
    updatedBy: string;
    updateTime: string;
}