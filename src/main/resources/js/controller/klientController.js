(function () {
    var klientController = function ($scope, $rootScope, $routeParams, $http, $location) {

        var onKlienciComplete = function (response) {
            $scope.klienci = response.data;
            $(".se-pre-con").hide("slow");
        };

        var onKlientComplete = function (response) {
            $scope.klient = response.data;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.klient = {}
        };
        var prepare = function (klient) {
            $scope.editMode = true;
            $scope.klient = angular.copy(klient);
        }
        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_klienta === obj.id_klienta) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            if ($scope.klienci) {
                var i = contains($scope.klienci, $scope.klient)
                if (i != -1) {
                    $scope.klienci[i] = $scope.klient;
                }
            }
        };

        var onSaveKlientComplete = function (response) {
            $scope.klienci.push(response.data);
        };

        var onDeleteKlientComplete = function (response) {
            $scope.klienci = $scope.klienci.filter(function (el) { return el.id_klienta != response.data.id_klienta });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveKlient = function () {
            if (!$scope.formKlient.$invalid) {
                $("#exampleModal").modal('hide')
                $http.post('http://localhost:8080/klienci', $scope.klient).then(onSaveKlientComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var deleteKlient = function (klient) {
            $http.delete('http://localhost:8080/klienci/' + klient.id_klienta).then(onDeleteKlientComplete, onError)
        };

        if ($rootScope.success) {
            $scope.success = $rootScope.success;
            $rootScope.success = "";
        }

        var updateKlient = function () {
            if (!$scope.formKlient.$invalid) {
                $("#exampleModal").modal('hide')
                $http.put('http://localhost:8080/klienci/' + $scope.klient.id_klienta, $scope.klient).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };

        var detailKlient = function (id) {
            $http.get("http://localhost:8080/klienci/" + id).then(onKlientComplete, onError);

        }

        var onBiletyComplete = function (response) {
            $scope.bilety = response.data;
            $(".se-pre-con").hide("slow");
        }

        if ($location.url() == "/klienci")
            $http.get("http://localhost:8080/klienci").then(onKlienciComplete, onError);
        else if ($location.url().indexOf("/bilety") !== -1)
            $http.get("http://localhost:8080/klienci/" + $routeParams.id + "/bilety").then(onBiletyComplete, onError);
        else
            detailKlient($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveKlient = saveKlient;
        $scope.deleteKlient = deleteKlient;
        $scope.updateKlient = updateKlient;
    };

    angular.module('myApp').controller("klientController", ['$scope', '$rootScope', '$routeParams', '$http', '$location', klientController]);
}()) 