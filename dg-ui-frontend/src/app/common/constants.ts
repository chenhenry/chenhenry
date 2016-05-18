export var CONSTANTS = {
    "atlas": {
        "ui": {
            //change it to true in frontend development only mode 
            "frontendOnly": false,
            //Define services end-points as constants in frontendOnly mode
            mockedServiceEndpoints: {
                "dataconnector": "http://appatlas3:8081",
                "storage": "http://appatlas3:8080",
                "mapping": "http://appatlas3:8083",
                "frd": "http://appatlas3:8082"
            }
        }
    }

}