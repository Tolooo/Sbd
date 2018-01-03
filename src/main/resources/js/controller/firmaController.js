(function(){
var firmaController = function ($scope,$routeParams,$http,$location) {

    var onFirmyComplete = function (response) {
        $scope.firmy = response.data;
        $scope.firmy.forEach(firma => {
            firma.editMode = false;
        });
    };

    var onFirmaComplete = function (response) {
        $scope.firma = response.data;
        $scope.firma.editMode = false; 
    };

    var onSaveFirmaComplete = function (response) {
        $scope.firmy.push(response.data);
    };

    var onDeleteFirmaComplete = function (response) {
        $scope.firmy = $scope.firmy.filter(function (el) { return el.id_firmy != response.data.id_firmy });
    };


    var onError = function (response) {
        $scope.error = response.error;
    };
    var saveFirma  = function (nazwa,nip) {
        var firma = { id_firmy: null, nazwa: nazwa, nip: nip };
        $scope.firma = firma;
        $http.post('http://localhost:8080/firmy', firma).then(onSaveFirmaComplete, onError);
    };
    var deleteFirma = function (firma) {
        $http.delete('http://localhost:8080/firmy/' + firma.id_firmy).then(onDeleteFirmaComplete, onError)
    };

    var updateFirma = function (firma) {
        delete firma.editMode;
        $http.put('http://localhost:8080/firmy/' + firma.id_firmy, firma);
    };

    var detailFirma = function(id){
        $http.get("http://localhost:8080/firmy/"+id).then(onFirmaComplete, onError);

    }

    if($location.url()=="/firmy")
    $http.get("http://localhost:8080/firmy").then(onFirmyComplete, onError);
    else
    detailFirma($routeParams.id);
    $scope.saveFirma = saveFirma;
    $scope.deleteFirma = deleteFirma;
    $scope.updateFirma = updateFirma;
};

angular.module('myApp').controller("firmaController", ['$scope','$routeParams','$http','$location', firmaController]);
}()) 