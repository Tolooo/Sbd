(function () {
    var firmaController = function ($scope, $rootScope, $routeParams, $http, $location) {

        var onFirmyComplete = function (response) {
            $scope.firmy = response.data;
        };

        var onFirmaComplete = function (response) {
            $scope.firma = response.data;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.firma = {}
        };
        var prepare = function (firma) {
            $scope.editMode = true;
            $scope.firma = angular.copy(firma);
        }

        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_firmy === obj.id_firmy) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            if ($scope.firmy) {
                var i = contains($scope.firmy, $scope.firma)
                if (i != -1) {
                    $scope.firmy[i] = $scope.firma;
                }
            }
        };

        var onSaveFirmaComplete = function (response) {
            $scope.firmy.push(response.data);
        };

        var onDeleteFirmaComplete = function (response) {
            $scope.firmy = $scope.firmy.filter(function (el) { return el.id_firmy != response.data.id_firmy });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveFirma = function () {
            if (!$scope.formFirma.$invalid) {
                $("#exampleModal").modal('hide')
                $http.post('http://localhost:8080/firmy', $scope.firma).then(onSaveFirmaComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };

        if ($rootScope.success) {
            $scope.success = $rootScope.success;
            $rootScope.success = "";
        }

        var deleteFirma = function (firma) {
            $http.delete('http://localhost:8080/firmy/' + firma.id_firmy).then(onDeleteFirmaComplete, onError)
        };

        var updateFirma = function () {
            if (!$scope.formFirma.$invalid) {
                $("#exampleModal").modal('hide')
                $http.put('http://localhost:8080/firmy/' + $scope.firma.id_firmy, $scope.firma).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };

        var detailFirma = function (id) {
            $http.get("http://localhost:8080/firmy/" + id).then(onFirmaComplete, onError);

        }

        var onBiletyComplete = function (response) {
            $scope.bilety = response.data;
        }

        if ($location.url() == "/firmy")
            $http.get("http://localhost:8080/firmy").then(onFirmyComplete, onError);
        else if ($location.url().indexOf("/bilety") !== -1)
            $http.get("http://localhost:8080/firmy/" + $routeParams.id + "/bilety").then(onBiletyComplete, onError);
        else
            detailFirma($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveFirma = saveFirma;
        $scope.deleteFirma = deleteFirma;
        $scope.updateFirma = updateFirma;
    };

    angular.module('myApp').controller("firmaController", ['$scope', '$rootScope', '$routeParams', '$http', '$location', firmaController]);
}()) 