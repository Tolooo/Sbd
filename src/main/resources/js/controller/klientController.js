(function () {
    var klientController = function ($scope, $routeParams, $http, $location) {

        var onKlienciComplete = function (response) {
            $scope.klienci = response.data;
        };

        var onKlientComplete = function (response) {
            $scope.klient = response.data;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.klient = {}
        };
        var prepare = function (klient) {
            $scope.editMode = true;
            $scope.klient = klient;
        }


        var onSaveKlientComplete = function (response) {
            $scope.klienci.push(response.data);
        };

        var onDeleteKlientComplete = function (response) {
            $scope.klienci = $scope.klienci.filter(function (el) { return el.id_klienta != response.data.id_klienta });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveKlient = function () {
            $http.post('http://localhost:8080/klienci', $scope.klient).then(onSaveKlientComplete, onError);
        };
        var deleteKlient = function (klient) {
            $http.delete('http://localhost:8080/klienci/' + klient.id_klienta).then(onDeleteKlientComplete, onError)
        };

        var updateKlient = function () {
            $http.put('http://localhost:8080/klienci/' + $scope.klient.id_klienta, $scope.klient);
        };

        var detailKlient = function (id) {
            $http.get("http://localhost:8080/klienci/" + id).then(onKlientComplete, onError);

        }

        var onBiletyComplete = function (response) {
            $scope.bilety = response.data;
        }

        if ($location.url() == "/klienci")
            $http.get("http://localhost:8080/klienci").then(onKlienciComplete, onError);
        else if ($location.url().indexOf("/bilety") !== -1)
            $http.get("http://localhost:8080/klienci/" + $routeParams.id + "/bilety").then(onBiletyComplete, onError);
        else
            detailKlient($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveKlient = saveKlient;
        $scope.deleteKlient = deleteKlient;
        $scope.updateKlient = updateKlient;
    };

    angular.module('myApp').controller("klientController", ['$scope', '$routeParams', '$http', '$location', klientController]);
}()) 