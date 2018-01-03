(function(){
var biletController = function ($scope,$routeParams,$http,$location) {

    var onBiletyComplete = function (response) {
        $scope.bilety = response.data;
        $scope.bilety.forEach(bilet => {
            bilet.editMode = false;
        });
    };

    var onBiletComplete = function (response) {
        $scope.bilet = response.data;
        $scope.bilet.editMode = false; 
    };
    var onSaveBiletComplete = function (response) {
        $scope.bilety.push(response.data);
    };

    var onDeleteBiletComplete = function (response) {
        $scope.bilety = $scope.bilety.filter(function (el) { return el.id_biletu != response.data.id_biletu });
    };


    var onError = function (response) {
        $scope.error = response.error;
    };
    var saveBilet  = function (klasa,nr_miejsca) {
        var bilet = { id_biletu: null, klasa: klasa, nr_miejsca: nr_miejsca };
        $scope.bilet = bilet;
        $http.post('http://localhost:8080/bilety', bilet).then(onSaveBiletComplete, onError);
    };
    var deleteBilet = function (bilet) {
        $http.delete('http://localhost:8080/bilety/' + bilet.id_biletu).then(onDeleteBiletComplete, onError)
    };

    var updateBilet = function (bilet) {
        delete bilet.editMode;
        $http.put('http://localhost:8080/bilety/' + bilet.id_biletu, bilet);
    };
    var detailBilet = function(id){
        $http.get("http://localhost:8080/bilety/"+id).then(onBiletComplete, onError);

    }

    if($location.url()=="/bilety")
    $http.get("http://localhost:8080/bilety").then(onBiletyComplete, onError);
    else
    detailBilet($routeParams.id);
    $scope.saveBilet = saveBilet;
    $scope.deleteBilet = deleteBilet;
    $scope.updateBilet = updateBilet;
};

angular.module('myApp').controller("biletController", ['$scope','$routeParams','$http','$location', biletController]);
}()) 