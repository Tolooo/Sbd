(function () {
  var AuthService = function ($http, Session, $log) {

    var authService = {};
    authService.login = function (credentials) {
      return $http
        .post('http://localhost:8080/users/login', credentials)
        .then(function (res) {
          if (res.data === "")
            return null;
          Session.create(res.data.user_id, res.data.user_role_id,
            res.data.user_role);
          return res.data;
        });
    };

    authService.register = function (credentials) {
      return $http
        .post('http://localhost:8080/users/register', credentials)
        .then(function (res) {
          if (res.data === "")
            return null;
          Session.create(res.data.user_id, res.data.user_role_id,
            res.data.user_role);
          return res.data;
        });
    };

    authService.logout = function () {
      Session.destroy();
    }

    authService.isAuthenticated = function () {
      return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;

  }





  angular.module('myApp').factory("AuthService", ["$http", "Session", '$log', AuthService]);
}()) 