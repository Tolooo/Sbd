(function () {
    var lotniskoController = function ($scope, $routeParams, $http, $location) {

        var onLotniskaComplete = function (response) {
            $scope.lotniska = response.data;
            $scope.lotniska.forEach(lotnisko => {
                lotnisko.editMode = false;
            });
        };

        var onLotniskoComplete = function (response) {
            $scope.lotnisko = response.data;
            $scope.lotnisko.editMode = false;
        };


        var onSaveLotniskoComplete = function (response) {
            $scope.lotniska.push(response.data);
        };

        var onDeleteLotniskoComplete = function (response) {
            $scope.lotniska = $scope.lotniska.filter(function (el) { return el.id_lotniska != response.data.id_lotniska });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveLotnisko = function (iata, miejscowosc) {
            var lotnisko = { id_lotniska: null, iata: iata, miejscowosc: miejscowosc };
            $scope.lotnisko = lotnisko;
            $http.post('http://localhost:8080/lotniska', lotnisko).then(onSaveLotniskoComplete, onError);
        };
        var deleteLotnisko = function (lotnisko) {
            $http.delete('http://localhost:8080/lotniska/' + lotnisko.id_lotniska).then(onDeleteLotniskoComplete, onError)
        };

        var updateLotnisko = function (lotnisko) {
            delete lotnisko.editMode;
            $http.put('http://localhost:8080/lotniska/' + lotnisko.id_lotniska, lotnisko);
        };

        var detailLotnisko = function (id) {
            $http.get("http://localhost:8080/lotniska/" + id).then(onLotniskoComplete, onError);

        }
        if ($location.url() == "/lotniska")
            $http.get("http://localhost:8080/lotniska").then(onLotniskaComplete, onError);
        else
            detailLotnisko($routeParams.id);
        $scope.saveLotnisko = saveLotnisko;
        $scope.deleteLotnisko = deleteLotnisko;
        $scope.updateLotnisko = updateLotnisko;
    };

    angular.module('myApp').controller("lotniskoController", ['$scope', '$routeParams', '$http', '$location', lotniskoController]);
}()) 