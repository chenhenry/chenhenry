import {IReportingUniverse} from "../model/IReportingUniverse";

export interface IReportingUniverseResource extends angular.resource.IResourceClass<IReportingUniverse> {
    findAll():IReportingUniverse[];

    addReportingUniverse(reportingUniverse:IReportingUniverse):String;
}