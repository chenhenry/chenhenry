export interface IDataAssetField {
    name:String;
    index: Number;
    type:String;
    nullable: Boolean;
}

export interface IDataAssetStructure {
    id?: Number;
    delimiter: String;
    header: Number;
    quote: String;
    escape: String;
    charset: String;
    comment: Boolean;
    nullValue: String;
    dateFormat: String;
    decimalSeparator: String;
    recordDelimiter: String;
    valueDelimiter: String;
}

export interface IDataAsset { 
   id?: Number;
   name: String;
   description?: String;
   type: String ;
   sourceName: String;
   creator?: String;
   createTime?: Date;
   structure?: IDataAssetStructure;
   fields?: IDataAssetField[];
   links?: IDataAssetLink[];
}

export interface IDataSource { 
   name: String;
   type: String;
}

export interface IWorkspace {
    id: String;
    name: String;
    path: String;
}

export interface IDataAssetLink {
    id?: Number;
    source: String;
    dataSetComp: IDataAssetDataSetComp;
    description?: String;
    creator?: String;
    createTime?: Date;
}

export interface IDataAssetDataSetComp {
    sourceName: String;
    workspace: String;
    dataSet:String;
    path:String;
}

export interface IDatasetFileStructure {
    field_separator: String,
    value_delimiter: String,
    record_delimiter: String,
    decimal_separator: String,
    date_format: String,
    has_headers: Boolean,
    format: String
}

export interface IDatasetField {
    data_type: String,
    name: String,
    nullable: Boolean,
    order: number
}
