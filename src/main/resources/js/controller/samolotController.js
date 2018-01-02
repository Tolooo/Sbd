(function(){
var samolotController = function ($scope, $http) {

    var onSamolotComplete = function (response) {
        $scope.samoloty = response.data;
        $scope.samoloty.forEach(samolot => {
            samolot.editMode = false;
        });
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
    var saveSamolot  = function (typ,iloscMiejsc) {
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


    $http.get("http://localhost:8080/samoloty").then(onSamolotComplete, onError);
    $scope.saveSamolot = saveSamolot;
    $scope.deleteSamolot = deleteSamolot;
    $scope.updateSamolot = updateSamolot;
};

angular.module('myApp').controller("samolotController", ['$scope', '$http', samolotController]);
}()) 