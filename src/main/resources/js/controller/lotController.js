(function(){
var lotController = function ($scope, $http) {

    var onLotComplete = function (response) {
        $scope.loty = response.data;
        $scope.loty.forEach(lot => {
            lot.editMode = false;
        });
    };

    var onSaveLotComplete = function (response) {
        $scope.loty.push(response.data);
    };

    var onDeleteLotComplete = function (response) {
        $scope.loty = $scope.loty.filter(function (el) { return el.id_lotu != response.data.id_lotu });
    };


    var onError = function (response) {
        $scope.error = response.error;
    };
    var saveLot  = function (klasa,nr_miejsca) {
        var lot = { id_lotu: null, klasa: klasa, nr_miejsca: nr_miejsca };
        $scope.lot = lot;
        $http.post('http://localhost:8080/loty', lot).then(onSaveLotComplete, onError);
    };
    var deleteLot = function (lot) {
        $http.delete('http://localhost:8080/loty/' + lot.id_lotu).then(onDeleteLotComplete, onError)
    };

    var updateLot = function (lot) {
        delete lot.editMode;
        $http.put('http://localhost:8080/loty/' + lot.id_lotu, lot);
    };


    $http.get("http://localhost:8080/loty").then(onLotComplete, onError);
    $scope.saveLot = saveLot;
    $scope.deleteLot = deleteLot;
    $scope.updateLot = updateLot;
};

angular.module('myApp').controller("lotController", ['$scope', '$http', lotController]);
}()) 