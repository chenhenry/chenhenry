export interface IBrand{
    id?:number;
    name:String;
}

export interface ICategory{
    id?:number;
    name:String;
}

export interface IClient{
    id_dg_client:number;
    wxname:String;
    name:String;
    phone: String;
    address:String;
    address1:String;
    address2:String;
    description: String;
}

export interface IGoodHkPrice{
   id?: Number;
   price: Number;
   shopName: String;
   type: String ;
}

export interface IGoodTbPrice{
   id?: Number;
   price: Number;
   shopName: String;
   type: String ;
   url?: String ;
}

export interface IGood{
   id?: Number;
   name: String;
   description?: String;
   price?: Number ;
   brand?:String;
   category?:String;
   people?:String;
   size?:String;
   creator?: String;
   createTime?: Date;
   dgGoodHkPrices?: IGoodHkPrice[];
   dgGoodTbPrices?: IGoodTbPrice[];
}

export interface IOrder{
   id?: Number;
   clientName?: String;
   code?: String;
   phone?: String;
   address?: String;
   description?: String;
   totalSum?: Number ;
   creator?: String;
   createTime?: Date;
   clientId?:Number;
   dgOrderItems?: IOrderItem[];
}

export interface IOrderItem{
   id?: Number;
   name: String;
   number: Number ;
   sum: Number;
   price: Number;
   goodId:Number;
   category:String;
   brand: String;
}

export interface IFile {
    id:number;
    path: string;
    name: string;
    charset: string;
    expiration_date: Date;
    upload_date: Date;
    version: string;
    access_mode: string;
    id_file_structure: number;
    reporting_date: Date;
}