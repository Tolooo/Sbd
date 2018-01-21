(function () {
    var trasaController = function ($scope, $routeParams, $http, $location,Session) {
        var onTrasyComplete = function (response) {
            $scope.trasy = response.data;
        };

        var onLotniskaComplete = function (response) {
            $scope.lotniska = response.data;
        };

        var onTrasaComplete = function (response) {
            $scope.trasa = response.data;
        };

        var onSaveTrasaComplete = function (response) {
            $scope.trasy.push(response.data);
        };

        var onDeleteTrasaComplete = function (response) {
            $scope.trasy = $scope.trasy.filter(function (el) { return el.id_trasy != response.data.id_trasy });
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.trasa = {}
        };

        var prepare = function (trasa) {
            $scope.editMode = true;
            $scope.trasa = trasa;
            if ($scope.lotniska !== undefined) {
                $scope.trasa.poczatek = $scope.lotniska.filter(function (lotnisko) {
                    return lotnisko.id_lotniska == $scope.trasa.poczatek.id_lotniska
                })[0]
                $scope.trasa.koniec = $scope.lotniska.filter(function (lotnisko) {
                    return lotnisko.id_lotniska == $scope.trasa.koniec.id_lotniska
                })[0]

            }
        }

        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveTrasa = function (poczatek, koniec) {
            $http.post('http://localhost:8080/trasy', $scope.trasa).then(onSaveTrasaComplete, onError);
        };
        var deleteTrasa = function (trasa) {
            $http.delete('http://localhost:8080/trasy/' + trasa.id_trasy).then(onDeleteTrasaComplete, onError)
        };

        var updateTrasa = function () {
            $http.put('http://localhost:8080/trasy/' + $scope.trasa.id_trasy, $scope.trasa);
        };

        var detailTrasa = function (id) {
            $http.get("http://localhost:8080/trasy/" + id).then(onTrasaComplete, onError);

        }
        if (Session.userRole == 'firmaLotnicza') {
            $http.get("http://localhost:8080/firmyLotnicze/" + Session.userId + "/trasy").then(onTrasyComplete, onError);
            $http.get("http://localhost:8080/lotniska").then(onLotniskaComplete, onError);
        }
        else if ($location.url() == "/trasy") {
            $http.get("http://localhost:8080/trasy").then(onTrasyComplete, onError);
            $http.get("http://localhost:8080/lotniska").then(onLotniskaComplete, onError);

        } else {
            detailTrasa($routeParams.id);
            $http.get("http://localhost:8080/lotniska").then(onLotniskaComplete, onError);
        }
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveTrasa = saveTrasa;
        $scope.deleteTrasa = deleteTrasa;
        $scope.updateTrasa = updateTrasa;
        $scope.detailTrasa = detailTrasa;
    };

    angular.module('myApp').controller("trasaController", ['$scope', '$routeParams', '$http', '$location','Session', trasaController]);
}()) 