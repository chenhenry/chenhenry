import * as angular from 'angular';


import {IGood, IGoodHkPrice, IGoodTbPrice} from "../../model/IDg";
import '../../services/dg';
import dgService from '../../services/dg';

var component = angular.module('app.modules.dg.good.detail', [
    'app.services.dg',
    "app.configs.endpoint",
    "angularFileUpload"
])
    .directive('goodDetail', ['$location', '$stateParams', 'dgService', "endpoints", 'FileUploader',
        function($location, $stateParams, dgService, endpoints: {}, FileUploader) {
            return {
                replace: true,
                restrict: 'E',
                scope: {},
                bindToController: {},
                controller: function() {
                    var ctrl = this;
                    var endpoint: String = endpoints["dg"];
                    ctrl.dgGoodHkPrices = [
                        { shopName: "屈臣氏&万宁", price: 0, type: "COUNTER" },
                        { shopName: "SaSa&卓越&美莱卡", price: 0, type: "COUNTER" },
                        { shopName: "仁峰&智文&国诚", price: 0, type: "COUNTER" }
                    ];

                    ctrl.dgGoodTbPrices = [
                        { shopName: "店铺1", price: 0, url: "COUNTER" },
                        { shopName: "店铺2", price: 0, url: "COUNTER" },
                        { shopName: "店铺3", price: 0, url: "COUNTER" }
                    ];

                    //ctrl.brands = [{ name: "雅思兰黛" }, { name: "雪花秀" }];
                    //ctrl.types = [{ name: "面膜" }, { name: "洗发水" }];
                    ctrl.peoples = [{ name: "女士" }, { name: "儿童" }, { name: "男士" }, { name: "老人" }];

                    ctrl.updateGood = function() {
                        var good: IGood = {
                            id: ctrl.goodId,
                            name: <string>(ctrl.good.name),
                            price: <Number>(ctrl.good.price),
                            creator: "atlas",
                            dgGoodHkPrices: ctrl.dgGoodHkPrices,
                            dgGoodTbPrices: ctrl.dgGoodTbPrices,
                            brand: <string>(ctrl.good.brand.name),
                            category: <string>(ctrl.good.category.name),
                            people:<string>(ctrl.good.people.name),
                            size:<string>(ctrl.good.size)
                        };
                        console.log(good);
                        dgService.updateGood(good, () => {
                            alert('Updated good successfully!');
                        }, (error) => {
                            alert('Cannot create good! Reason: ' + error.data.message);
                        });
                    }

                    ctrl.createGood = function() {
                        var good: IGood = {
                            name: <string>(ctrl.good.name),
                            price: <Number>(ctrl.good.price),
                            creator: "atlas",
                            dgGoodHkPrices: ctrl.dgGoodHkPrices,
                            dgGoodTbPrices: ctrl.dgGoodTbPrices,
                            brand: <string>(ctrl.good.brand.name),
                            category: <string>(ctrl.good.category.name),
                            people:<string>(ctrl.good.people.name),
                            size:<string>(ctrl.good.size)
                        };
                        console.log('to create:');
                        console.log(good);

                        dgService.saveGood(good, () => {
                            alert('Created good successfully!');

                        }, (error) => {
                            alert('Cannot create good! Reason: ' + error.data.message);
                        });
                    }

                    ctrl.init = function() {
                        dgService.getBrandList(function(response) {
                            ctrl.brands = response;
                        }, function(response) {
                            console.log("Error: " + response);
                        });
                        
                        // Create new request to the service
                        dgService.getCategoryList(function(response) {
                            ctrl.categorys = response;
                        }, function(response) {
                            console.log("Error: " + response);
                        });
                        
                        ctrl.goodId = $stateParams.id;
                        if (ctrl.goodId == undefined || ctrl.goodId == null || ctrl.goodId == "") {
                            ctrl.isCreate = true;
                        } else {
                            ctrl.loadDetail(ctrl.goodId);
                            ctrl.isCreate = false;

                        }

                    }

                    ctrl.loadDetail = function(goodId: String) {
                        var request = dgService.getGoodById(ctrl.goodId,
                            (response) => {
                                ctrl.good = response;
                                ctrl.dgGoodHkPrices = ctrl.good.dgGoodHkPrices;
                                ctrl.dgGoodTbPrices = ctrl.good.dgGoodTbPrices;
                                ctrl.good.brand = {"name":ctrl.good.brand};
                                ctrl.good.category = {"name":ctrl.good.category};
                                ctrl.good.people = {"name":ctrl.good.people};
                                console.log(ctrl.good);
                            }, (error) => {
                                console.log("Error: " + error);
                            });
                    }

                    ctrl.uploader = new FileUploader({
                        url: endpoint + '/lovtter/dg/upload/newDocument'
                    });

                    ctrl.uploader.filters.push({
                        name: 'customFilter',
                        fn: function(item /*{File|FileLikeObject}*/, options) {
                            return this.queue.length < 10;
                        }
                    });

                    // CALLBACKS

                    ctrl.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                        console.info('onWhenAddingFileFailed', item, filter, options);
                    };
                    ctrl.uploader.onAfterAddingFile = function(fileItem) {
                        console.info('onAfterAddingFile', fileItem);
                    };
                    ctrl.uploader.onAfterAddingAll = function(addedFileItems) {
                        console.info('onAfterAddingAll', addedFileItems);
                    };
                    ctrl.uploader.onBeforeUploadItem = function(item) {
                        console.info('onBeforeUploadItem', item);
                    };
                    ctrl.uploader.onProgressItem = function(fileItem, progress) {
                        console.info('onProgressItem', fileItem, progress);
                    };
                    ctrl.uploader.onProgressAll = function(progress) {
                        console.info('onProgressAll', progress);
                    };
                    ctrl.uploader.onSuccessItem = function(fileItem, response, status, headers) {
                        console.info('onSuccessItem', fileItem, response, status, headers);
                    };
                    ctrl.uploader.onErrorItem = function(fileItem, response, status, headers) {
                        console.info('onErrorItem', fileItem, response, status, headers);
                    };
                    ctrl.uploader.onCancelItem = function(fileItem, response, status, headers) {
                        console.info('onCancelItem', fileItem, response, status, headers);
                    };
                    ctrl.uploader.onCompleteItem = function(fileItem, response, status, headers) {
                        console.info('onCompleteItem', fileItem, response, status, headers);
                    };
                    ctrl.uploader.onCompleteAll = function() {
                        console.info('onCompleteAll');
                    };

                    console.info('uploader', ctrl.uploader);

                    
                    ctrl.init();
                },
                controllerAs: 'ctrl',
                template: require('./good-detail.html')
            }
        }]).name;

export = component;
