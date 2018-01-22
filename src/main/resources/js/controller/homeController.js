(function () {
    var homeController = function ($scope, $rootScope, USER_ROLES,
        AuthService) {

        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.isAuthenticated=AuthService.isAuthenticated();
        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };
        if ($rootScope.success) {
            $scope.success = $rootScope.success;
            $rootScope.success = "";
        }
    };
    angular.module('myApp').controller("homeController", ["$scope", "$rootScope", "USER_ROLES",
        "AuthService", homeController]);
}())