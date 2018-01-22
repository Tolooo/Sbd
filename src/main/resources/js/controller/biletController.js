(function () {
    var biletController = function ($scope, $routeParams, $http, $location) {

        var onBiletyComplete = function (response) {
            $scope.bilety = response.data;
            $scope.bilety.forEach(bilet => {
                bilet.editMode = false;
            });
        };

        var onDatesComplete = function (response) {
            $scope.dates = response.data;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.bilet = {}
        };
        var prepare = function (bilet) {
            $scope.editMode = true;
            $scope.bilet = angular.copy(bilet);
            if ($scope.dates !== undefined)
                $scope.bilet.dataLotu = $scope.dates.filter(function (dataLotu) { return dataLotu.id_daty == $scope.bilet.dataLotu.id_daty; })[0];
            if ($scope.loty !== undefined)
                $scope.bilet.lot = $scope.loty.filter(function (lot) { return lot.id_lotu == $scope.bilet.lot.id_lotu; })[0];
        }

        var onLotyComplete = function (response) {
            $scope.loty = response.data;
        };


        var onBiletComplete = function (response) {
            $scope.bilet = response.data;
        };

        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_biletu === obj.id_biletu) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            var i = contains($scope.bilety, $scope.bilet)
            if (i != -1) {
                $scope.bilety[i] = $scope.bilet;
            }
        };
        var onLotniskaBiletyComplete = function (response) {
            $scope.bilety = response.data.filter(function (bilet) {
                return bilet.lot.trasa.poczatek.id_lotniska == $routeParams.id || bilet.lot.trasa.koniec.id_lotniska == $routeParams.id
            });
        };
        var onSaveBiletComplete = function (response) {
            $scope.bilety.push(response.data);
        };

        var onDeleteBiletComplete = function (response) {
            $scope.bilety = $scope.bilety.filter(function (el) { return el.id_biletu != response.data.id_biletu });
        };

        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveBilet = function () {
            if (!$scope.formBilet.$invalid) {
                $("#exampleModal").modal('hide')
                $scope.bilet.dataLotu = $scope.bilet.lot.dataLotu;
                $http.post('http://localhost:8080/bilety', $scope.bilet).then(onSaveBiletComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var deleteBilet = function (bilet) {
            $http.delete('http://localhost:8080/bilety/' + bilet.id_biletu).then(onDeleteBiletComplete, onError)
        };

        var updateBilet = function () {
            if (!$scope.formBilet.$invalid) {
                $("#exampleModal").modal('hide')
                $scope.bilet.dataLotu = $scope.bilet.lot.dataLotu;
                $http.put('http://localhost:8080/bilety/' + $scope.bilet.id_biletu, $scope.bilet).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var detailBilet = function (id) {
            $http.get("http://localhost:8080/bilety/" + id).then(onBiletComplete, onError);

        }


        $http.get("http://localhost:8080/daty").then(onDatesComplete, onError);
        $http.get("http://localhost:8080/bilety").then(onBiletyComplete, onError);
        $http.get("http://localhost:8080/loty").then(onLotyComplete, onError);
        if ($location.url() == "/bilety") {

        }
        else if ($location.url() == ("/lotniska/" + $routeParams.id + "/bilety"))
            $http.get("http://localhost:8080/bilety").then(onLotniskaBiletyComplete, onError);
        else
            detailBilet($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveBilet = saveBilet;
        $scope.deleteBilet = deleteBilet;
        $scope.updateBilet = updateBilet;
    };

    angular.module('myApp').controller("biletController", ['$scope', '$routeParams', '$http', '$location', biletController]);
}()) 