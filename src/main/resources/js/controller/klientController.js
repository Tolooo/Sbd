(function(){
var klientController = function ($scope, $http) {

    var onKlientComplete = function (response) {
        $scope.klienci = response.data;
        $scope.klienci.forEach(klient => {
            klient.editMode = false;
        });
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
    var saveKlient  = function (nazwisko,imie) {
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


    $http.get("http://localhost:8080/klienci").then(onKlientComplete, onError);
    $scope.saveKlient = saveKlient;
    $scope.deleteKlient = deleteKlient;
    $scope.updateKlient = updateKlient;
};

angular.module('myApp').controller("klientController", ['$scope', '$http', klientController]);
}()) 