(function () {
    var homeController = function ($scope, $rootScope, USER_ROLES,
        AuthService) {

        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
        if ($rootScope.logoutSuccess) {
        $scope.logoutSuccess = true;
            $rootScope.logoutSuccess = false;
        }
        else
            $scope.logoutSuccess = false;
        if ($rootScope.loginSuccess) {
        $scope.loginSuccess = true;
            $rootScope.loginSuccess = false;
        }
        else
            $scope.loginSuccess = false;

    };
    angular.module('myApp').controller("homeController", ["$scope", "$rootScope", "USER_ROLES",
        "AuthService", homeController]);
}())