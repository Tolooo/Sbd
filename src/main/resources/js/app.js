(function () {
    var app = angular.module('myApp', ['ngRoute', "ngCookies"]);

    app.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });
    app.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        klient: 'klient',
        firma: 'firma',
        firmaLotnicza: 'firmaLotnicza',
        pilot: 'pilot',
        lotnisko: 'lotnisko'
    });
    app.directive('pwCheck2', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }]);
    app.directive('pwCheck', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }]);
    
    app.service('Session', function () {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    })
    app.factory('Navbar', ["AuthService", "Session", function (AuthService, Session) {
        var navUrl = "templates/navs/anonymous";
        var id = 0;
        return {
            navUrl: function () { return navUrl; },
            id: function () { return id; },
            refreshNav: function () {
                if (AuthService.isAuthenticated()) {
                    id = Session.userId;
                    switch (Session.userRole) {
                        case "admin": navUrl = "templates/navs/admin"; break;
                        case "klient": navUrl = "templates/navs/klient"; break;
                        case "firma": navUrl = "templates/navs/firma"; break;
                        case "firmaLotnicza": navUrl = "templates/navs/firmaLotnicza"; break;
                        case "pilot": navUrl = "templates/navs/pilot"; break;
                        case "lotnisko": navUrl = "templates/navs/lotnisko"; break;
                    }
                }
                else
                    navUrl = "templates/navs/anonymous";
            }
        };
    }]);
    app.run(function ($rootScope, AUTH_EVENTS, AuthService, USER_ROLES, $location, $cookieStore, Session, Navbar) {
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {

            Session.create($rootScope.globals.currentUser.user_id, $rootScope.globals.currentUser.user_role_id,
                $rootScope.globals.currentUser.user_role);
        }
        // console.log($rootScope.globals.currentUser)
        // console.log(Session)
        Navbar.refreshNav();
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (AuthService.isAuthenticated() && ($location.path() == "/login" || $location.path() === "/register")) {
                $location.path("/")
                return
            }
            $rootScope.notAllowed = false;
            var authorizedRoles = next.data;
            // console.log(authorizedRoles)
            authorizedRoles = next.data.authorizedRoles;
            if (authorizedRoles.indexOf(USER_ROLES.all) === -1)
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    if (AuthService.isAuthenticated()) {
                        // user is not allowed
                        $rootScope.notAllowed = true;
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    } else {
                        if (next.templateUrl == "templates/login.html") {
                            // already going to #login, no redirect needed
                        } else {
                            // not going to #login, we should redirect now
                            $location.path("/login");
                        }
                        // user is not logged in
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }
        });
    })
    app.run(function ($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
    });
    app.config(['$routeProvider', 'USER_ROLES', function ($routeProvider, USER_ROLES) {
        $routeProvider
            .when('/', {
                controller: 'homeController',
                templateUrl: '/templates/home.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: '/templates/login.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .when('/logout', {
                controller: 'LoginController',
                templateUrl: '/templates/home.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .when('/register', {
                controller: 'LoginController',
                templateUrl: '/templates/register.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            }) 
            .when('/bilety', {
                controller: 'biletController',
                templateUrl: '/templates/bilety.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko]
                }
            })
            .when("/bilety/:id", {
                controller: 'biletController',
                templateUrl: "/templates/details/detailBilet.html",
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .when('/daty', {
                controller: 'dataLotuController',
                templateUrl: '/templates/datyLotu.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza]
                }
            })
            .when("/daty/:id", {
                controller: 'dataLotuController',
                templateUrl: "/templates/details/detailDataLotu.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .when('/firmy', {
                controller: 'firmaController',
                templateUrl: '/templates/firmy.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firma]
                }
            })
            .when("/firmy/:id", {
                controller: 'firmaController',
                templateUrl: "/templates/details/detailFirma.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firma]
                }
            })
            .when('/firmyLotnicze', {
                controller: 'firmaLotniczaController',
                templateUrl: '/templates/firmyLotnicze.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza]
                }
            })
            .when("/firmyLotnicze/:id", {
                controller: 'firmaLotniczaController',
                templateUrl: "/templates/details/detailFirmaLotnicza.html",
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .when('/klienci', {
                controller: 'klientController',
                templateUrl: '/templates/klienci.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko]
                }
            })
            .when("/klienci/:id", {
                controller: 'klientController',
                templateUrl: "/templates/details/detailKlient.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.klient]
                }
            })
            .when("/klienci/:id/bilety", {
                controller: 'klientController',
                templateUrl: "/templates/przegladBiletow.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.klient]
                }
            })
            .when("/firmy/:id/bilety", {
                controller: 'firmaController',
                templateUrl: "/templates/przegladBiletow.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firma]
                }
            })
            .when('/loty', {
                controller: 'lotController',
                templateUrl: '/templates/loty.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko, USER_ROLES.firmaLotnicza]
                }
            })
            .when('/przegladLotow', {
                controller: 'lotController',
                templateUrl: '/templates/przegladLotow.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.klient, USER_ROLES.firma]
                }
            })
            .when("/loty/:id", {
                controller: 'lotController',
                templateUrl: "/templates/details/detailLot.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.pilot, USER_ROLES.lotnisko, USER_ROLES.firmaLotnicza]
                }
            })
            .when("/loty/pilot/:id", {
                controller: 'lotController',
                templateUrl: "/templates/pilot/lotyPilota.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko, USER_ROLES.pilot, USER_ROLES.firmaLotnicza]
                }
            })
            .when('/lotniska', {
                controller: 'lotniskoController',
                templateUrl: '/templates/lotniska.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko]
                }
            })
            .when("/lotniska/:id", {
                controller: 'lotniskoController',
                templateUrl: "/templates/details/detailLotnisko.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko]
                }
            })
            .when("/lotniska/:id/bilety", {
                controller: 'biletController',
                templateUrl: "/templates/przegladBiletow.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko]
                }
            })
            .when("/lotniska/:id/firmyLotnicze", {
                controller: 'firmaLotniczaController',
                templateUrl: "/templates/firmyLotnicze.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko]
                }
            })
            .when('/piloci', {
                controller: 'pilotController',
                templateUrl: '/templates/piloci.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza, USER_ROLES.lotnisko]
                }
            })
            .when("/piloci/:id", {
                controller: 'pilotController',
                templateUrl: "/templates/details/detailPilot.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza, USER_ROLES.pilot, USER_ROLES.lotnisko]
                }
            })
            .when('/samoloty', {
                controller: 'samolotController',
                templateUrl: '/templates/samoloty.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza, USER_ROLES.lotnisko]
                }
            })
            .when('/firmyLotnicze/:id/samoloty', {
                controller: 'samolotController',
                templateUrl: '/templates/samoloty.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza, USER_ROLES.lotnisko]
                }
            })
            .when('/firmyLotnicze/:id/lotniska', {
                controller: 'lotniskoController',
                templateUrl: '/templates/firmaLotnicza/lotniska.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza]
                }
            })
            .when('/firmyLotnicze/:id/loty', {
                controller: 'lotController',
                templateUrl: '/templates/loty.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza]
                }
            })
            .when("/samoloty/:id", {
                controller: 'samolotController',
                templateUrl: "/templates/details/detailSamolot.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.firmaLotnicza]
                }
            })
            .when('/trasy', {
                controller: 'trasaController',
                templateUrl: '/templates/trasy.html',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko, USER_ROLES.firmaLotnicza]
                }
            })
            .when("/trasy/:id", {
                controller: 'trasaController',
                templateUrl: "/templates/details/detailTrasa.html",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.lotnisko, USER_ROLES.firmaLotnicza]
                }
            })
            .otherwise({
                redirectTo: '/',
                controller: 'homeController',
                templateUrl: '/templates/home.html',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })

    }])

}())