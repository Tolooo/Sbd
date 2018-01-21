(function () {
  var LoginController = function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location, $cookies, Navbar) {

    $rootScope.setCurrentUser = function (user) {

      $rootScope.globals = {
        currentUser: {
          user_id: user.user_id,
          user_role: user.user_role,
          user_role_id: user.user_role_id
        }
      };


      // set default auth header for http requests
      // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

      // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
    }





    $scope.error = null;
    $scope.credentials = {
      user_name: '',
      user_password: '',
      user_role: ""
    };
    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function (user) {
        if (user !== null) {
          // console.log(user)
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $rootScope.setCurrentUser(user);
          $rootScope.loginSuccess = true;
          $location.path("/");
          Navbar.refreshNav();

        }
        else
          $scope.error = "Podano niepoprawne dane"
      }, function () {
        $scope.error = "Sprawdź czy dane zostały wpisane poprawnie, lub spróbuj ponownie później"
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
    $rootScope.logoutSuccess = false;

    if ($location.url() === "/logout") {
      if (AuthService.isAuthenticated()) {
        AuthService.logout();
        $location.path("/");
        $rootScope.logoutSuccess = true;
        $rootScope.globals = {};
        $cookies.remove('globals');
      }
      Navbar.refreshNav();

    }
  };

  angular.module('myApp').controller("LoginController", ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$location', "$cookies", "Navbar", LoginController]);
}()) 