import angular from 'angular';

import authModule from './modules/authModule';
import StaysCtrl from './controllers/StaysCtrl';
import ngRoute from 'angular-route';

let app = angular
            .module('LPC_app', ['ngRoute', authModule])
            .config(
              [
                '$routeProvider',
                function($routeProvider) {
                  $routeProvider
                    .when('/', {
                      template: require("./partials/home.html"),
                      controller: 'StaysCtrl'
                    })
                }
              ]
            )
            .controller('StaysCtrl',
              ['$scope', StaysCtrl])
