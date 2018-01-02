(function () {
    var app = angular.module('myApp', ['ngRoute']);

    app.run(function ($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
    });
    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {
                controller: 'homeController',
                templateUrl: '/templates/home.html'
            })
            .when('/bilety', {
                controller: 'biletController',
                templateUrl: '/templates/bilety.html'
            })
            .when("/bilety/:id", {
                controller: 'biletController',
                templateUrl: "/templates/details/detailBilet.html"
            })
            .when('/daty', {
                controller: 'dataLotuController',
                templateUrl: '/templates/datyLotu.html'
            })
            .when("/daty/:id", {
                controller: 'dataLotuController',
                templateUrl: "/templates/details/detailDataLotu.html"
            })
            .when('/firmy', {
                controller: 'firmaController',
                templateUrl: '/templates/firmy.html'
            })
            .when("/firmy/:id", {
                controller: 'firmaController',
                templateUrl: "/templates/details/detailFirma.html"
            })
            .when('/firmyLotnicze', {
                controller: 'firmaLotniczaController',
                templateUrl: '/templates/firmyLotnicze.html'
            })
            .when("/firmyLotnicze/:id", {
                controller: 'firmaLotniczaController',
                templateUrl: "/templates/details/detailFirmaLotnicza.html"
            })
            .when('/klienci', {
                controller: 'klientController',
                templateUrl: '/templates/klienci.html'
            })
            .when("/klienci/:id", {
                controller: 'klientController',
                templateUrl: "/templates/details/detailKlient.html"
            })
            .when('/loty', {
                controller: 'lotController',
                templateUrl: '/templates/loty.html'
            })
            .when("/loty/:id", {
                controller: 'lotController',
                templateUrl: "/templates/details/detailLot.html"
            })
            .when('/lotniska', {
                controller: 'lotniskoController',
                templateUrl: '/templates/lotniska.html'
            })
            .when("/lotniska/:id", {
                controller: 'lotniskoController',
                templateUrl: "/templates/details/detailLotnisko.html"
            })
            .when('/piloci', {
                controller: 'pilotController',
                templateUrl: '/templates/piloci.html'
            })
            .when("/piloci/:id", {
                controller: 'pilotController',
                templateUrl: "/templates/details/detailPilot.html"
            })
            .when('/samoloty', {
                controller: 'samolotController',
                templateUrl: '/templates/samoloty.html'
            })
            .when("/samoloty/:id", {
                controller: 'samolotController',
                templateUrl: "/templates/details/detailSamolot.html"
            })
            .when('/trasy', {
                controller: 'trasaController',
                templateUrl: '/templates/trasy.html'
            })
            .when("/trasy/:id", {
                controller: 'trasaController',
                templateUrl: "/templates/details/detailTrasa.html"
            })
            .otherwise({
                redirectTo: '/'
            })

    }])
}())