(function () {
    var pilotController = function ($scope, $routeParams, $http, $location) {

        var onPilotsComplete = function (response) {
            $scope.pilots = response.data;
            $scope.pilots.forEach(pilot => {
                pilot.editMode = false;
            });
        };

        var onPilotComplete = function (response) {
            $scope.pilot = response.data;
            $scope.pilot.editMode = false;
        };


        var onSavePilotComplete = function (response) {
            $scope.pilots.push(response.data);
        };

        var onDeletePilotComplete = function (response) {
            $scope.pilots = $scope.pilots.filter(function (el) { return el.id_pilota != response.data.id_pilota });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var savePilot = function (name, surname) {
            var pilot = { id_pilota: null, imie: name, nazwisko: surname };
            $scope.pilot = pilot;
            $http.post('http://localhost:8080/piloci', pilot).then(onSavePilotComplete, onError);
        };
        var deletePilot = function (pilot) {
            $http.delete('http://localhost:8080/piloci/' + pilot.id_pilota).then(onDeletePilotComplete, onError)
        };

        var updatePilot = function (pilot) {
            delete pilot.editMode;
            $http.put('http://localhost:8080/piloci/' + pilot.id_pilota, pilot);
        };

        var detailPilot = function (id) {
            $http.get("http://localhost:8080/piloci/" + id).then(onPilotComplete, onError);

        }
        if ($location.url() == "/piloci")
            $http.get("http://localhost:8080/piloci").then(onPilotsComplete, onError);
        else
            detailPilot($routeParams.id);
        $scope.savePilot = savePilot;
        $scope.deletePilot = deletePilot;
        $scope.updatePilot = updatePilot;
    };

    angular.module('myApp').controller("pilotController", ['$scope', '$routeParams', '$http', '$location', pilotController]);
}()) 