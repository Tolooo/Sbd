(function () {
    var samolotController = function ($scope, $routeParams, $http, $location) {

        var onSamolotyComplete = function (response) {
            $scope.samoloty = response.data;
            $scope.samoloty.forEach(samolot => {
                samolot.editMode = false;
            });
        };


        var onSamolotComplete = function (response) {
            $scope.samolot = response.data;
            $scope.samolot.editMode = false;
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
        var saveSamolot = function (typ, iloscMiejsc) {
            var samolot = { id_samolotu: null, typ: typ, iloscMiejsc: iloscMiejsc };
            $scope.samolot = samolot;
            $http.post('http://localhost:8080/samoloty', samolot).then(onSaveSamolotComplete, onError);
        };
        var deleteSamolot = function (samolot) {
            $http.delete('http://localhost:8080/samoloty/' + samolot.id_samolotu).then(onDeleteSamolotComplete, onError)
        };

        var updateSamolot = function (samolot) {
            delete samolot.editMode;
            $http.put('http://localhost:8080/samoloty/' + samolot.id_samolotu, samolot);
        };

        var detailSamolot = function (id) {
            $http.get("http://localhost:8080/samoloty/" + id).then(onSamolotComplete, onError);

        }
        if ($location.url() == "/samoloty")
            $http.get("http://localhost:8080/samoloty").then(onSamolotyComplete, onError);
        else
            detailSamolot($routeParams.id);
        $scope.saveSamolot = saveSamolot;
        $scope.deleteSamolot = deleteSamolot;
        $scope.updateSamolot = updateSamolot;
    };

    angular.module('myApp').controller("samolotController", ['$scope', '$routeParams', '$http', '$location', samolotController]);
}()) 