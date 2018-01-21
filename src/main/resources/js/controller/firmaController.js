(function () {
    var firmaController = function ($scope, $routeParams, $http, $location) {

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
            $scope.firma = firma;
        }

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
            $http.post('http://localhost:8080/firmy', $scope.firma).then(onSaveFirmaComplete, onError);
        };
        var deleteFirma = function (firma) {
            $http.delete('http://localhost:8080/firmy/' + firma.id_firmy).then(onDeleteFirmaComplete, onError)
        };

        var updateFirma = function () {
            $http.put('http://localhost:8080/firmy/' + $scope.firma.id_firmy, $scope.firma);
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

    angular.module('myApp').controller("firmaController", ['$scope', '$routeParams', '$http', '$location', firmaController]);
}()) 