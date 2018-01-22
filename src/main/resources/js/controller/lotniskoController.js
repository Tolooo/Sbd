(function () {
    var lotniskoController = function ($scope, $routeParams, $http, $location) {

        var onLotniskaComplete = function (response) {
            $scope.lotniska = response.data;
        };
        var onAllLotniskaComplete = function (response) {
            $scope.all_lotniska = response.data;
        };

        var onFirmyLotniczeComplete = function (response) {
            $scope.firmyLotnicze = response.data;
        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.lotnisko = {}
        };

        var prepare = function (lotnisko) {
            $scope.editMode = true;
            $scope.lotnisko = angular.copy(lotnisko);
        }

        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_lotniska === obj.id_lotniska) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            if ($scope.lotniska) {
                var i = contains($scope.lotniska, $scope.lotnisko)
                if (i != -1) {
                    $scope.lotniska[i] = $scope.lotnisko;
                }
            }
        };

        var onLotniskoComplete = function (response) {
            $scope.lotnisko = response.data;
        };


        var onSaveLotniskoComplete = function (response) {
            $scope.lotniska.push(response.data);
        };

        var onDeleteLotniskoComplete = function (response) {
            $scope.lotniska = $scope.lotniska.filter(function (el) { return el.id_lotniska != response.data.id_lotniska });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveLotnisko = function () {
            if (!$scope.formLotnisko.$invalid) {
                $("#exampleModal").modal('hide')
                if ($location.url().indexOf("/firmyLotnicze") !== -1)//moglo przestac dzialac
                    $http.post('http://localhost:8080/lotniska/firmyLotnicze/' + $routeParams.id, $scope.lotnisko).then(onSaveLotniskoComplete, onError);
                else
                    $http.post('http://localhost:8080/lotniska', $scope.lotnisko).then(onSaveLotniskoComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var deleteLotnisko = function (lotnisko) {
            if ($location.url().indexOf("/firmyLotnicze") !== -1)
                $http.delete('http://localhost:8080/lotniska/' + lotnisko.id_lotniska + '/firmyLotnicze/' + $routeParams.id).then(onDeleteLotniskoComplete, onError);
            else
                $http.delete('http://localhost:8080/lotniska/' + lotnisko.id_lotniska).then(onDeleteLotniskoComplete, onError)
        };

        var updateLotnisko = function () {
            if (!$scope.formLotnisko.$invalid) {
                $("#exampleModal").modal('hide')
                $http.put('http://localhost:8080/lotniska/' + $scope.lotnisko.id_lotniska, $scope.lotnisko).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };

        var detailLotnisko = function (id) {
            $http.get("http://localhost:8080/lotniska/" + id).then(onLotniskoComplete, onError);

        }
        if ($location.url() == "/lotniska")
            $http.get("http://localhost:8080/lotniska").then(onLotniskaComplete, onError);
        else if ($location.url() == ("/firmyLotnicze/" + $routeParams.id + "/lotniska")) {
            $http.get("http://localhost:8080/lotniska").then(onAllLotniskaComplete, onError);
            $http.get("http://localhost:8080/firmyLotnicze/" + $routeParams.id + "/lotniska").then(onLotniskaComplete, onError);
        }
        else
            detailLotnisko($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.saveLotnisko = saveLotnisko;
        $scope.deleteLotnisko = deleteLotnisko;
        $scope.updateLotnisko = updateLotnisko;
    };

    angular.module('myApp').controller("lotniskoController", ['$scope', '$routeParams', '$http', '$location', lotniskoController]);
}()) 