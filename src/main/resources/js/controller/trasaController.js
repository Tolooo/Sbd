(function(){
var trasaController = function ($scope,$routeParams,$http,$location) { 
    var onTrasyComplete = function (response) {
        $scope.trasy = response.data;
        $scope.trasy.forEach(trasa => {
            trasa.editMode = false;
        });
    };

    var onTrasaComplete = function (response) {
        $scope.trasa = response.data;
        $scope.trasa.editMode = false; 
    };

    var onSaveTrasaComplete = function (response) {
        $scope.trasy.push(response.data);
    };

    var onDeleteTrasaComplete = function (response) {
        $scope.trasy = $scope.trasy.filter(function (el) { return el.id_trasy != response.data.id_trasy });
    };


    var onError = function (response) {
        $scope.error = response.error;
    };
    var saveTrasa  = function (poczatek,koniec) {
        var trasa = { id_trasy: null, poczatek: poczatek, koniec: koniec };
        $scope.trasa = trasa;
        $http.post('http://localhost:8080/trasy', trasa).then(onSaveTrasaComplete, onError);
    };
    var deleteTrasa = function (trasa) {
        $http.delete('http://localhost:8080/trasy/' + trasa.id_trasy).then(onDeleteTrasaComplete, onError)
    };

    var updateTrasa = function (trasa) {
        delete trasa.editMode;
        $http.put('http://localhost:8080/trasy/' + trasa.id_trasy, trasa);
    };

    var detailTrasa = function(id){
        $http.get("http://localhost:8080/trasy/"+id).then(onTrasaComplete, onError);

    }

if($location.url()=="/trasy")
    $http.get("http://localhost:8080/trasy").then(onTrasyComplete, onError);
else
detailTrasa($routeParams.id);
    $scope.saveTrasa = saveTrasa;
    $scope.deleteTrasa = deleteTrasa;
    $scope.updateTrasa = updateTrasa;
    $scope.detailTrasa = detailTrasa;
    console.log()
};

angular.module('myApp').controller("trasaController", ['$scope','$routeParams','$http','$location', trasaController]);
}()) 