import * as angular from 'angular';

angular.module('app.services.authenication', [
])
    .factory('authenticationService', [
        '$timeout',
        '$http',
        function($timeout: angular.ITimeoutService, $http: angular.IHttpService) {
            return new AuthenticationService($timeout, $http);
        }
    ]);

export interface UserInfo {
    authenticated: boolean;
    principal;
    name: String;
}

export class AuthenticationService {
    private $timeout: angular.ITimeoutService;
    private $http: angular.IHttpService;

    constructor($timeout: angular.ITimeoutService, $http: angular.IHttpService) {
        this.$timeout = $timeout;
        this.$http = $http;
    }

    public isUserAuthenticated(user: UserInfo): boolean {
        return (user != undefined) && (user.authenticated);
      }

    public getUser() {
        var promise = this.$http.get('/user').then(function(response) {
            return response.data;
        });
        return promise;
    }

}