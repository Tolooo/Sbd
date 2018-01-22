(function () {
    var trasaController = function ($scope, $routeParams, $http, $location, Session) {
        var onTrasyComplete = function (response) {
            $scope.trasy = response.data;
            $(".se-pre-con").hide("slow");
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
            $scope.trasa = angular.copy(trasa);
            if ($scope.lotniska !== undefined) {
                $scope.trasa.poczatek = $scope.lotniska.filter(function (lotnisko) {
                    return lotnisko.id_lotniska == $scope.trasa.poczatek.id_lotniska
                })[0]
                $scope.trasa.koniec = $scope.lotniska.filter(function (lotnisko) {
                    return lotnisko.id_lotniska == $scope.trasa.koniec.id_lotniska
                })[0]

            }
        }
        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_trasy === obj.id_trasy) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            if ($scope.trasy) {
                var i = contains($scope.trasy, $scope.trasa)
                if (i != -1) {
                    $scope.trasy[i] = $scope.trasa;
                }
            }
        };

        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveTrasa = function (poczatek, koniec) {
            if (!$scope.formTrasa.$invalid) {
                $("#exampleModal").modal('hide')
                $http.post('http://localhost:8080/trasy', $scope.trasa).then(onSaveTrasaComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var deleteTrasa = function (trasa) {
            $http.delete('http://localhost:8080/trasy/' + trasa.id_trasy).then(onDeleteTrasaComplete, onError)
        };

        var updateTrasa = function () {
            if (!$scope.formTrasa.$invalid) {
                $("#exampleModal").modal('hide')
                $http.put('http://localhost:8080/trasy/' + $scope.trasa.id_trasy, $scope.trasa).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
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

    angular.module('myApp').controller("trasaController", ['$scope', '$routeParams', '$http', '$location', 'Session', trasaController]);
}()) 