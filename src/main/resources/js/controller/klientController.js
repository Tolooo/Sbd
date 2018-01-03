(function () {
    var klientController = function ($scope, $routeParams, $http, $location) {

        var onKlienciComplete = function (response) {
            $scope.klienci = response.data;
            $scope.klienci.forEach(klient => {
                klient.editMode = false;
            });
        };

        var onKlientComplete = function (response) {
            $scope.klient = response.data;
            $scope.klient.editMode = false;
        };
        var onSaveKlientComplete = function (response) {
            $scope.klienci.push(response.data);
        };

        var onDeleteKlientComplete = function (response) {
            $scope.klienci = $scope.klienci.filter(function (el) { return el.id_klienta != response.data.id_klienta });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveKlient = function (nazwisko, imie) {
            var klient = { id_klientu: null, nazwisko: nazwisko, imie: imie };
            $scope.klient = klient;
            $http.post('http://localhost:8080/klienci', klient).then(onSaveKlientComplete, onError);
        };
        var deleteKlient = function (klient) {
            $http.delete('http://localhost:8080/klienci/' + klient.id_klientu).then(onDeleteKlientComplete, onError)
        };

        var updateKlient = function (klient) {
            delete klient.editMode;
            $http.put('http://localhost:8080/klienci/' + klient.id_klientu, klient);
        };

        var detailKlient = function (id) {
            $http.get("http://localhost:8080/klienci/" + id).then(onKlientComplete, onError);

        }
        if ($location.url() == "/klienci")
            $http.get("http://localhost:8080/klienci").then(onKlienciComplete, onError);
        else
            detailKlient($routeParams.id);
        $scope.saveKlient = saveKlient;
        $scope.deleteKlient = deleteKlient;
        $scope.updateKlient = updateKlient;
    };

    angular.module('myApp').controller("klientController", ['$scope', '$routeParams', '$http', '$location', klientController]);
}()) 