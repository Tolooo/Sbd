(function () {
  var LoginController = function ($scope, $rootScope, $http, AUTH_EVENTS, AuthService, $location, $cookies, Navbar) {

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

    var onCheckUserName = function (response) {
      if (!response.data) {
        $("#" + $scope.user_role).modal({ show: true });
      }
      else {
        $('#username').one('input', function () {
          $scope.error = ""
          $("#alert").hide();
        });
        $scope.error = "Użytkownik z podaną nazwą już istnieje. Wybierz inną nazwę!";
      }
    }
    $scope.prepare = function (user_name, pass1, pass2, user_role) {
      if (!$scope.registerForm.$invalid) {
        // console.log("valid")
        $http.post('http://localhost:8080/users/' + user_name).then(onCheckUserName, onError);
        return true;
      }
      else {

        return false;
      }
    }

    $scope.register = function (user_name, pass1, pass2, user_role, user_role_id) {
      let credentials = {
        user_name: user_name,
        user_password: pass1,
        user_role: user_role,
        user_role_id: user_role_id
      }
      AuthService.register(credentials).then(function (user) {
        if (user !== null) {
          // console.log(user)
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $rootScope.setCurrentUser(user);
          $rootScope.success = "Zarejestrowano pomyślnie!";
          $location.path("/");
          Navbar.refreshNav();

        }
        else
          $scope.error = "Podano niepoprawne dane!"
      }, function (error) {
        $scope.error = error;
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    }


    $scope.login = function (credentials) {
      if (!$scope.loginForm.$invalid)
        AuthService.login(credentials).then(function (user) {
          if (user !== null) {
            // console.log(user)
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $rootScope.setCurrentUser(user);
            $rootScope.success = "Zalogowano pomyślnie!";
            $location.path("/");
            Navbar.refreshNav();

          }
          else
            $scope.error = "Podano niepoprawne dane!"
        }, function () {
          $scope.error = "Sprawdź czy dane zostały wpisane poprawnie, lub spróbuj ponownie później."
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
    $rootScope.logoutSuccess = false;

    $scope.saveFirma = function () {
      if (!$scope.registerForm.$invalid && !$scope.formFirma.$invalid) {
        $("#" + $scope.user_role).modal('hide');
        $http.post('http://localhost:8080/firmy', $scope.firma).then(onSaveFirmaComplete, onError);
      } else {
        return false;
      }
    };

    var onSaveFirmaComplete = function (response) {
      $scope.register($scope.user_name, $scope.pass1, $scope.pass2, $scope.user_role, response.data.id_firmy)
    }

    $scope.saveFirmaLotnicza = function () {
      if (!$scope.registerForm.$invalid && !$scope.formFirmaLotnicza.$invalid) {
        $("#" + $scope.user_role).modal('hide');
        $http.post('http://localhost:8080/firmyLotnicze', $scope.firmaLotnicza).then(onSaveFirmaLotniczaComplete, onError);
      } else {

        return false;
      }
    };

    var onSaveFirmaLotniczaComplete = function (response) {
      $scope.register($scope.user_name, $scope.pass1, $scope.pass2, $scope.user_role, response.data.id_firmyLotniczej)
    }

    $scope.saveKlient = function () {
      if (!$scope.registerForm.$invalid && !$scope.formKlient.$invalid) {
        $("#" + $scope.user_role).modal('hide');
        $http.post('http://localhost:8080/klienci', $scope.klient).then(onSaveKlientComplete, onError);
      } else {

        return false;
      }
    };

    var onSaveKlientComplete = function (response) {
      $scope.register($scope.user_name, $scope.pass1, $scope.pass2, $scope.user_role, response.data.id_klienta)
    }

    $scope.saveLotnisko = function () {
      if (!$scope.registerForm.$invalid && !$scope.formLotnisko.$invalid) {
        $("#" + $scope.user_role).modal('hide');
        $http.post('http://localhost:8080/lotniska', $scope.lotnisko).then(onSaveLotniskoComplete, onError);
      } else {

        return false;
      }
    };

    var onSaveLotniskoComplete = function (response) {
      $scope.register($scope.user_name, $scope.pass1, $scope.pass2, $scope.user_role, response.data.id_lotniska)
    }

    $scope.savePilot = function () {
      if (!$scope.registerForm.$invalid && !$scope.formPilot.$invalid) {
        $("#" + $scope.user_role).modal('hide');
        $http.post('http://localhost:8080/piloci', $scope.pilot).then(onSavePilotComplete, onError);
      } else {

        return false;
      }
    };

    var onSavePilotComplete = function (response) {
      $scope.register($scope.user_name, $scope.pass1, $scope.pass2, $scope.user_role, response.data.id_pilota)
    }

    var onError = function (response) {
      $scope.error = response.error;
    };

    if ($location.url() === "/logout") {
      if (AuthService.isAuthenticated()) {
        AuthService.logout();
        $location.path("/");
        $rootScope.success = "Wylogowano pomyślnie!";
        $rootScope.globals = {};
        $cookies.remove('globals');
      }
      Navbar.refreshNav();

    }
  };

  angular.module('myApp').controller("LoginController", ['$scope', '$rootScope', '$http', 'AUTH_EVENTS', 'AuthService', '$location', "$cookies", "Navbar", LoginController]);
}()) 