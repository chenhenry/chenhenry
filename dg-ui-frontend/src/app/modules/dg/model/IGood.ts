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
   url: String ;
}

export interface IGood{
   id?: Number;
   name: String;
   description?: String;
   salePrice: Number ;
   creator?: String;
   createTime?: Date;
   dgGoodHkPrices?: IGoodHkPrice[];
   dgGoodTbPrices?: IGoodTbPrice[];
}
