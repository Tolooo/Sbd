(function () {
    var samolotController = function ($scope, $routeParams, $http, $location) {

        var onSamolotyComplete = function (response) {
            $scope.samoloty = response.data;
        };

        var onFirmyLotniczeComplete = function (response) {
            $scope.firmyLotnicze = response.data;
        };

        var onSamolotComplete = function (response) {
            $scope.samolot = response.data;
        };

        var onSaveSamolotComplete = function (response) {
            $scope.samoloty.push(response.data);
        };

        var onDeleteSamolotComplete = function (response) {
            $scope.samoloty = $scope.samoloty.filter(function (el) { return el.id_samolotu != response.data.id_samolotu });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.samolot = {}
        };
        var prepare = function (samolot) {
            $scope.editMode = true;
            $scope.samolot = angular.copy(samolot);
            if ($scope.firmyLotnicze !== undefined)
                $scope.samolot.firmaLotnicza = $scope.firmyLotnicze.filter(function (firmaLotnicza) {
                    return firmaLotnicza.id_firmyLotniczej == $scope.samolot.firmaLotnicza.id_firmyLotniczej
                })[0]
        }
        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_samolotu === obj.id_samolotu) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            if ($scope.samoloty) {
                var i = contains($scope.samoloty, $scope.samolot)
                if (i != -1) {
                    $scope.samoloty[i] = $scope.samolot;
                }
            }
        };

        var saveSamolot = function () {
            if (!$scope.formSamolot.$invalid) {
                $("#exampleModal").modal('hide')
                if ($location.url() == ("/firmyLotnicze/" + $routeParams.id + "/samoloty"))
                    $http.post('http://localhost:8080/samoloty/firmyLotnicze/' + $routeParams.id, $scope.samolot).then(onSaveSamolotComplete, onError);
                else {
                    //moglo przestac dzialac xD
                    if ($scope.firmaLotnicza !== undefined) {
                        $http.post('http://localhost:8080/samoloty/firmyLotnicze/' + $scope.firmaLotnicza, $scope.samolot).then(onSaveSamolotComplete, onError);
                        //$http.post('http://localhost:8080/samoloty', samolot).then(onSaveSamolotComplete, onError);
                    }
                }
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var deleteSamolot = function (samolot) {
            $http.delete('http://localhost:8080/samoloty/' + samolot.id_samolotu).then(onDeleteSamolotComplete, onError)
        };

        var updateSamolot = function () {
            if (!$scope.formSamolot.$invalid) {
                $("#exampleModal").modal('hide')
                $http.put('http://localhost:8080/samoloty/' + $scope.samolot.id_samolotu, $scope.samolot).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };

        var detailSamolot = function (id) {
            $http.get("http://localhost:8080/samoloty/" + id).then(onSamolotComplete, onError);

        }
        $http.get("http://localhost:8080/firmyLotnicze").then(onFirmyLotniczeComplete, onError);
        if ($location.url() == "/samoloty") {
            $http.get("http://localhost:8080/samoloty").then(onSamolotyComplete, onError);
        }
        else if ($location.url() == ("/firmyLotnicze/" + $routeParams.id + "/samoloty"))
            $http.get("http://localhost:8080/firmyLotnicze/" + $routeParams.id + "/samoloty").then(onSamolotyComplete, onError);
        else {
            detailSamolot($routeParams.id);
        }
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveSamolot = saveSamolot;
        $scope.deleteSamolot = deleteSamolot;
        $scope.updateSamolot = updateSamolot;
    };

    angular.module('myApp').controller("samolotController", ['$scope', '$routeParams', '$http', '$location', samolotController]);
}()) 