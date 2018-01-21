(function () {
    var firmaLotniczaController = function ($scope, $routeParams, $http, $location) {

        var onFirmyLotniczeComplete = function (response) {
            $scope.firmyLotnicze = response.data;
        };

        var onFirmaLotniczaComplete = function (response) {
            $scope.firmaLotnicza = response.data;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.firmaLotnicza = {}
        };

        var prepare = function (firmaLotnicza) {
            $scope.editMode = true;
            $scope.firmaLotnicza = firmaLotnicza;
        }

        var onSaveFirmaLotniczaComplete = function (response) {
            $scope.firmyLotnicze.push(response.data);
        };

        var onDeleteFirmaLotniczaComplete = function (response) {
            $scope.firmyLotnicze = $scope.firmyLotnicze.filter(function (el) { return el.id_firmyLotniczej != response.data.id_firmyLotniczej });
        };

        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveFirmaLotnicza = function () {
            $http.post('http://localhost:8080/firmyLotnicze', $scope.firmaLotnicza).then(onSaveFirmaLotniczaComplete, onError);
        };
        var deleteFirmaLotnicza = function (firmaLotnicza) {
            $http.delete('http://localhost:8080/firmyLotnicze/' + firmaLotnicza.id_firmyLotniczej).then(onDeleteFirmaLotniczaComplete, onError)
        };

        var updateFirmaLotnicza = function () {
            $http.put('http://localhost:8080/firmyLotnicze/' + $scope.firmaLotnicza.id_firmyLotniczej, $scope.firmaLotnicza);
        };

        var detailFirmaLotnicza = function (id) {
            $http.get("http://localhost:8080/firmyLotnicze/" + id).then(onFirmaLotniczaComplete, onError);

        }
        if ($location.url() == "/firmyLotnicze")
            $http.get("http://localhost:8080/firmyLotnicze").then(onFirmyLotniczeComplete, onError);
        else
            detailFirmaLotnicza($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveFirmaLotnicza = saveFirmaLotnicza;
        $scope.deleteFirmaLotnicza = deleteFirmaLotnicza;
        $scope.updateFirmaLotnicza = updateFirmaLotnicza;
    };

    angular.module('myApp').controller("firmaLotniczaController", ['$scope', '$routeParams', '$http', '$location', firmaLotniczaController]);
}()) 