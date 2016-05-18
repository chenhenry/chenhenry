import * as angular from 'angular';


import {IClient} from "../model/IClient";
import {IClientResource} from "../resource/IClientResource";
import '../services/client';
import clientService from '../services/client';

var component = angular.module('app.modules.dg.client', [
    'app.modules.dg.services.client'
])
    .directive('client', ['clientService',  function (clientService) {

        return {
            replace: true, 
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: function() {
               
            },
            controllerAs: 'ctrl',
            template: require('./client.html')
        }
    }]).name;

export = component;
