import * as angular from 'angular';
import '../resource/ReportingStudioResourceModule';
//import {reportingResourceModule} from '../resource/ReportingStudioResourceModule';
import {IReportingUniverseResource} from "../resource/IReportingUniverseResource";
import {IReportingUniverse} from "../model/IReportingUniverse";

angular.module('app.services.reporting-universe', ['atlas.reporting-studio.resource'])
    .factory('reportingUniverseService', [
        'ReportingUniverseResource',
        function(reportingUniverseResource: IReportingUniverseResource) {
            return new ReportingUniverseService(reportingUniverseResource);
        }
    ]);

export default class ReportingUniverseService {

    static $inject = ["reportingUniverseResource"];

    constructor(private reportingUniverseResource: IReportingUniverseResource) {
    }

    public getReportingUniverseList(): IReportingUniverse[]  {
        return this.reportingUniverseResource.findAll();
    }

    public createReportingUniverse(universeName:string,universeDesc:string ): String {
        var reportingUniverse = <IReportingUniverse> {
            createTime: "2016-04-07T13:09:56.485Z",
            creator: "Xavier",
            description: universeDesc,
            id: 0,
            name: universeName,
            updateTime: "2016-04-07T13:09:56.486Z",
            updatedBy: "Xavier"
        };
        return this.reportingUniverseResource.addReportingUniverse(reportingUniverse);
    }

}