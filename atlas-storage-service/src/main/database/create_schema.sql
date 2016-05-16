CREATE TABLE DATA_ASSET_STRUCTURE
(
   id_data_asset_structure serial PRIMARY KEY,
   header integer,
   delimiter text,
   quote text,
   escape text,
   charset text,
   comment boolean,
   null_value text,
   date_format text,
   decimal_separator text,
   value_delimiter text,
   record_delimiter text
);



CREATE TABLE DATA_ASSET
(
   id_data_asset serial PRIMARY KEY,
   name text UNIQUE,
   source_name text,
   type text,
   description text,
   creator text,
   create_time timestamp without time zone,
   update_by text,
   update_time timestamp without time zone,
   id_data_asset_structure integer references data_asset_structure(id_data_asset_structure)
);

CREATE TABLE DATA_ASSET_FIELD
(
   id_data_asset_field serial PRIMARY KEY,
   id_data_asset integer references data_asset(id_data_asset),
   name text,
   index integer,
   data_type text,
   nullable boolean
);

CREATE TABLE DATA_ASSET_LINK
(
   id_data_asset_link serial PRIMARY KEY,
   id_data_asset integer references data_asset(id_data_asset),
   source_name text,
   workspace text,
   dataset text,
   description text,
   creator text,
   create_time timestamp without time zone
);