(function () {
    var pilotController = function ($scope, $routeParams, $http, $location) {

        var onPilotsComplete = function (response) {
            $scope.pilots = response.data;
            $(".se-pre-con").hide("slow");
        };

        var onPilotComplete = function (response) {
            $scope.pilot = response.data;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.pilot = {}
        };
        var prepare = function (pilot) {
            $scope.editMode = true;
            $scope.pilot = angular.copy(pilot);
        }

        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_pilota === obj.id_pilota) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            if ($scope.pilots) {
                var i = contains($scope.pilots, $scope.pilot)
                if (i != -1) {
                    $scope.pilots[i] = $scope.pilot;
                }
            }
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
        var savePilot = function () {
            if (!$scope.formPilot.$invalid) {
                $("#exampleModal").modal('hide')
                $http.post('http://localhost:8080/piloci', $scope.pilot).then(onSavePilotComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var deletePilot = function (pilot) {
            $http.delete('http://localhost:8080/piloci/' + pilot.id_pilota).then(onDeletePilotComplete, onError)
        };

        var updatePilot = function () {
            if (!$scope.formPilot.$invalid) {
                $("#exampleModal").modal('hide')
                $http.put('http://localhost:8080/piloci/' + $scope.pilot.id_pilota, $scope.pilot).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };

        var detailPilot = function (id) {
            $http.get("http://localhost:8080/piloci/" + id).then(onPilotComplete, onError);

        }
        if ($location.url() == "/piloci")
            $http.get("http://localhost:8080/piloci").then(onPilotsComplete, onError);
        else
            detailPilot($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.savePilot = savePilot;
        $scope.deletePilot = deletePilot;
        $scope.updatePilot = updatePilot;
    };

    angular.module('myApp').controller("pilotController", ['$scope', '$routeParams', '$http', '$location', pilotController]);
}()) 