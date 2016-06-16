"use strict";
import * as angular from 'angular';
import '../resource/DgResourceModule';

import {
    IClientResourceClass,
    IGoodResourceClass,
    IBrandResourceClass,
    ICategoryResourceClass,
    IOrderResourceClass
} from "../resource/IDgResource";
import {IClient, IGood, IBrand, ICategory, IOrder} from "../model/IDg";

angular.module('app.services.dg', ['atlas.dg.resource'])
    .factory('dgService', [
        'clientResourceClass',
        'goodResourceClass',
        'brandResourceClass',
        'categoryResourceClass',
        'orderResourceClass',
        function(clientResourceClass: IClientResourceClass,
            goodResourceClass: IGoodResourceClass,
            brandResourceClass: IBrandResourceClass,
            categoryResourceClass: ICategoryResourceClass,
            orderResourceClass: IOrderResourceClass) {
            return new DgService(clientResourceClass, goodResourceClass, brandResourceClass,
                categoryResourceClass, orderResourceClass);
        }
    ]);

export default class DgService {

    static $inject = ["clientResourceClass", "goodResourceClass", "brandResourceClass",
        "categoryResourceClass", "orderResourceClass"];

    constructor(private clientResourceClass: IClientResourceClass,
        private goodResourceClass: IGoodResourceClass,
        private brandResourceClass: IBrandResourceClass,
        private categoryResourceClass: ICategoryResourceClass,
        private orderResourceClass: IOrderResourceClass) {
    }

    public getCategoryList(success: Function, error: Function): Array<ICategory> {
        return this.categoryResourceClass.findAll(success, error);
    }

    public saveCategory(category: ICategory, success: Function, error: Function): ICategory {
        return this.categoryResourceClass.save(category, success, error);
    }

    public getCategoryById(id: String, success: Function, error: Function): ICategory {
        return this.categoryResourceClass.findById({ "id": id }, success, error);
    }

    public updateCategory(category: ICategory, success: Function, error: Function): void {
        this.categoryResourceClass.updateCategory(category, success, error);
    }

    public deleteCategory(id: String, success: Function, error: Function): void {
        this.categoryResourceClass.deleteCategory(id, success, error);
    }


    public getBrandList(success: Function, error: Function): Array<IBrand> {
        return this.brandResourceClass.findAll(success, error);
    }

    public saveBrand(brand: IBrand, success: Function, error: Function): IBrand {
        return this.brandResourceClass.save(brand, success, error);
    }

    public getBrandById(id: String, success: Function, error: Function): IBrand {
        return this.brandResourceClass.findById({ "id": id }, success, error);
    }

    public updateBrand(brand: IBrand, success: Function, error: Function): void {
        this.brandResourceClass.updateBrand(brand, success, error);
    }

    public deleteBrand(id: String, success: Function, error: Function): void {
        this.brandResourceClass.deleteBrand(id, success, error);
    }

    public getClientList(success: Function, error: Function): Array<IClient> {
        return this.clientResourceClass.findAll(success, error);
    }

    public saveClient(client: IClient, success: Function, error: Function): IClient {
        return this.clientResourceClass.save(client, success, error);
    }

    public getClientById(id: String, success: Function, error: Function): IClient {
        return this.clientResourceClass.findById({ "id": id }, success, error);
    }

    public updateClient(client: IClient, success: Function, error: Function): void {
        this.clientResourceClass.updateClient(client, success, error);
    }

    public deleteClient(id: String, success: Function, error: Function): void {
        this.clientResourceClass.deleteClient(id, success, error);
    }


    public getGoodList(success: Function, error: Function): Array<IGood> {
        return this.goodResourceClass.findAll(success, error);
    }

    public getGoodListByBrand(brand: String, success: Function, error: Function): Array<IGood> {
        return this.goodResourceClass.findAllByBrand({ "brand": brand }, success, error);
    }

    public getGoodListByCategory(category: String, success: Function, error: Function): Array<IGood> {
        return this.goodResourceClass.findAllByCategory({ "category": category }, success, error);
    }

    public saveGood(good: IGood, success: Function, error: Function): IGood {
        return this.goodResourceClass.save(good, success, error);
    }

    public getGoodById(id: String, success: Function, error: Function): IGood {
        return this.goodResourceClass.findById({ "id": id }, success, error);
    }

    public updateGood(good: IGood, success: Function, error: Function): void {
        this.goodResourceClass.updateGood(good, success, error);
    }

    public deleteGood(id: String, success: Function, error: Function): void {
        this.goodResourceClass.deleteGood(id, success, error);
    }

    public getOrderList(success: Function, error: Function): Array<IOrder> {
        return this.orderResourceClass.findAll(success, error);
    }

    public saveOrder(order: IOrder, success: Function, error: Function): IOrder {
        return this.orderResourceClass.saveOrder(order, success, error);
    }

    public getOrderById(id: String, success: Function, error: Function): IOrder {
        return this.orderResourceClass.findById({ "id": id }, success, error);
    }

    public updateOrder(order: IOrder, success: Function, error: Function): void {
        this.orderResourceClass.updateOrder(order, success, error);
    }

    public deleteOrder(id: String, success: Function, error: Function): void {
        this.orderResourceClass.deleteOrder(id, success, error);
    }
}