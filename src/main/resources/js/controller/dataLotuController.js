(function(){
 var dataLotuController = function ($scope, $http) {

    var onDateComplete = function (response) {
        $scope.dates = response.data; 
        $scope.dates.forEach(date => {
            date.editMode = false;
            date.wylot=new Date(date.wylot);
            date.przylot=new Date(date.przylot);
        });
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


    $http.get("http://localhost:8080/daty").then(onDateComplete, onError);
    $scope.saveDate = saveDate;
    $scope.deleteDate = deleteDate;
    $scope.updateDate = updateDate;
};

angular.module('myApp').controller("dataLotuController", ['$scope', '$http', dataLotuController]);
}())