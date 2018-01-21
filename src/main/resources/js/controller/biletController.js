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
            $scope.bilet = bilet;
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
            $scope.bilet.editMode = false;

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
            $scope.bilet.dataLotu = $scope.bilet.lot.dataLotu;
            $http.post('http://localhost:8080/bilety', $scope.bilet).then(onSaveBiletComplete, onError);
        };
        var deleteBilet = function (bilet) {
            $http.delete('http://localhost:8080/bilety/' + bilet.id_biletu).then(onDeleteBiletComplete, onError)
        };

        var updateBilet = function () {
            $scope.bilet.dataLotu = $scope.bilet.lot.dataLotu;
            $http.put('http://localhost:8080/bilety/' + $scope.bilet.id_biletu, $scope.bilet);
        };
        var detailBilet = function (id) {
            $http.get("http://localhost:8080/bilety/" + id).then(onBiletComplete, onError);

        }


        $http.get("http://localhost:8080/daty").then(onDatesComplete, onError);
        $http.get("http://localhost:8080/bilety").then(onBiletyComplete, onError);
        $http.get("http://localhost:8080/loty").then(onLotyComplete, onError);
        if ($location.url() == "/bilety") {

        }
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