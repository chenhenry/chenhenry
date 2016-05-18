import minute = d3.time.minute;
class StopRow
{
    stop: any;
    h1: any;
    h2: any;
    h3: any;
    h4: any;

    constructor(a_stop:any,
                a_h1:any,
                a_h2:any,
                a_h3:any,
                a_h4:any) {
        this.stop = a_stop;
        this.h1 = numberToDate(a_h1);
        this.h2 = numberToDate(a_h2);
        this.h3 = numberToDate(a_h3);
        this.h4 = numberToDate(a_h4);
    }
}

function numberToDate(value):String {
    var valueAsNumber = value;
    var date = new Date(1970, 0, 1);
    date.setSeconds(value);
    var hour:number = date.getHours();
    var minute:number = date.getMinutes();

    if(isNaN(hour) || isNaN(minute)) {
        return "/";
    }

    var hourPrefix = "";
    if(hour < 10)
    {
        hourPrefix = "0";
    }

    var minutePrefix = "";
    if(minute < 10)
    {
        minutePrefix = "0";
    }


    return hourPrefix + hour + ":" +  minutePrefix + minute;
};

/**
 * Sample Controller, only here for demo purpose
 */
export default class SampleController {


    /**
     * Constructor.
     */
    constructor() {
        this.json = JSON.parse("{}");
        this.gridData = [[], []];
        this.dataLoaded = false;
        this.linesLoaded = false;
        this.lines = [];
        this.directionList = [];

        this.gridOptions =
        {
            enableColResize: true,
            columnDefs: this.gridColumns,
            checkboxSelection: true,
            rowSelection: "multiple",
            enableSorting: false,
            enableFilter: false
        };
    }

    /**
     *
     * @returns {string} with Hello world ! is it not beautiful ?
     */
    public helloWorld():String {
        return "Hello World ! You are in Sample Controller !";
    }

    public loadListLines() {
        $.getJSON("http://data.metromobilite.fr/api/routers/default/index/routes",
            c => {
                this.lines = c;
                this.linesLoaded = true;

            });
    }

    public loadJsonForLine(line) {
        var n:Date = new Date();
        var toto:number = n.getTime() - 60 * 1000 * (n.getTimezoneOffset() + 1);

        this.gridData = [[], []];

        this.dataLoaded = false;

        this.directionList = [];
        var that = this;

        $.getJSON("http://data.metromobilite.fr/api/ficheHoraires/json?route=" + line.id + "&time=" + toto,
            c=> {

                var lastStop = "";
                this.json = c["0"];


                //parse data and fill the grid data
                angular.forEach(this.json["arrets"], function(value, key)
                {
                    this.gridData[0].push(new StopRow(value["stopName"],value["trips"][0],value["trips"][1],value["trips"][2],value["trips"][3]));
                    lastStop = value["stopName"];
                }, this);

                if(lastStop != "")
                {
                    this.directionList.push({name: lastStop, id:0});
                    this.currentDirection = {name: lastStop, id:0};
                }

                lastStop = "";

                this.json = c["1"];

                //parse data and fill the grid data
                angular.forEach(this.json["arrets"], function(value, key)
                {
                    this.gridData[1].push(new StopRow(value["stopName"],value["trips"][0],value["trips"][1],value["trips"][2],value["trips"][3]));
                    lastStop = value["stopName"];
                }, this);

                if(lastStop != "")
                {
                    this.directionList.push({name: lastStop, id:1});
                }


                // init column
                //init grid options


                //init options
                console.log("switch load data");
                this.switchGridData(0);
                console.log("data loaded");
                this.dataLoaded = true;
            });
    }

    public onDirectionChanged(direction)
    {
        this.switchGridData(parseInt(direction.id));
    }

    public switchGridData(index)
    {
        if(this.gridOptions.api){
            this.gridOptions.api.setRows(this.gridData[index]);
        }
    }
    
    public json: JSON;
    public gridData: Array<Array<StopRow>>;
    public gridColumns = [
        {
            headerName: "Stop",
            field: "stop"
        },
        {
            headerName: "h1",
            field: "h1"
        },
        {
            headerName: "h2",
            field: "h2"
        },
        {
            headerName: "h3",
            field: "h3"
        },
        {
            headerName: "h4",
            field: "h4"
        }

    ];
    public gridOptions:any;


    public dataLoaded:boolean;
    public linesLoaded:boolean;
    public now:Date;
    public lines: any;
    public currentLine: any;
    public currentDirection: any;
    public directionList: Array<any>;


}