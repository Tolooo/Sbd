(function(){
 var dataLotuController = function ($scope,$routeParams,$http,$location) {

    var onDatesComplete = function (response) {
        $scope.dates = response.data; 
        $scope.dates.forEach(date => {
            date.editMode = false;
            date.wylot=new Date(date.wylot);
            date.przylot=new Date(date.przylot);
        });
    };
    var onDateComplete = function (response) {
        $scope.date = response.data;
        $scope.date.editMode = false; 
    };
    var onSaveDateComplete = function (response) {
        $scope.dates.push(response.data);
    };

    var onDeleteDateComplete = function (response) {
        $scope.dates = $scope.dates.filter(function (el) { return el.id_daty != response.data.id_daty });
    };


    var onError = function (response) {
        $scope.error = response.error;
    };
    var saveDate = function (departureDate, dateOfArrival) {
        var date = { id_daty: null, Wylot: departureDate, Przylot: dateOfArrival };
        $scope.date = date;
        $http.post('http://localhost:8080/daty', date).then(onSaveDateComplete, onError);
    };
    var deleteDate = function (date) { 
        $http.delete('http://localhost:8080/daty/' + date.id_daty).then(onDeleteDateComplete, onError)
    };

    var updateDate = function (date) {
        delete date.editMode;
        $http.put('http://localhost:8080/daty/' + date.id_daty, date);
    };
    var detailDate = function(id){
        $http.get("http://localhost:8080/daty/"+id).then(onDateComplete, onError);

    }

    if($location.url()=="/daty")
    $http.get("http://localhost:8080/daty").then(onDatesComplete, onError);
    else
    detailDate($routeParams.id);
    $scope.saveDate = saveDate;
    $scope.deleteDate = deleteDate;
    $scope.updateDate = updateDate;
};

angular.module('myApp').controller("dataLotuController", ['$scope','$routeParams','$http','$location', dataLotuController]);
}())