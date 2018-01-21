(function () {
    var lotniskoController = function ($scope, $routeParams, $http, $location) {

        var onLotniskaComplete = function (response) {
            $scope.lotniska = response.data;
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
            $scope.lotnisko = lotnisko;
        }

        var onLotniskaBiletyComplete = function (response) {
            $scope.bilety = response.data.filter(function (bilet) {
                return bilet.lot.trasa.poczatek.id_lotniska == $routeParams.id || bilet.lot.trasa.koniec.id_lotniska == $routeParams.id
            });

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
            if ($location.url().indexOf("/firmyLotnicze") !== -1)//moglo przestac dzialac
                $http.post('http://localhost:8080/lotniska/firmyLotnicze/' + $routeParams.id, $scope.lotnisko).then(onSaveLotniskoComplete, onError);
            else
                $http.post('http://localhost:8080/lotniska', $scope.lotnisko).then(onSaveLotniskoComplete, onError);
        };
        var deleteLotnisko = function (lotnisko) {
            if ($location.url().indexOf("/firmyLotnicze") !== -1)
                $http.delete('http://localhost:8080/lotniska/' + lotnisko.id_lotniska + '/firmyLotnicze/' + $routeParams.id).then(onDeleteLotniskoComplete, onError);
            else
                $http.delete('http://localhost:8080/lotniska/' + lotnisko.id_lotniska).then(onDeleteLotniskoComplete, onError)
        };

        var updateLotnisko = function () {
            $http.put('http://localhost:8080/lotniska/' + $scope.lotnisko.id_lotniska, $scope.lotnisko);
        };

        var detailLotnisko = function (id) {
            $http.get("http://localhost:8080/lotniska/" + id).then(onLotniskoComplete, onError);

        }
        if ($location.url() == "/lotniska")
            $http.get("http://localhost:8080/lotniska").then(onLotniskaComplete, onError);
        else if ($location.url() == ("/firmyLotnicze/" + $routeParams.id + "/lotniska"))
            $http.get("http://localhost:8080/firmyLotnicze/" + $routeParams.id + "/lotniska").then(onLotniskaComplete, onError);
        else if ($location.url() == ("/lotniska/" + $routeParams.id + "/bilety"))
            $http.get("http://localhost:8080/bilety").then(onLotniskaBiletyComplete, onError);
        else if ($location.url() == ("/lotniska/" + $routeParams.id + "/firmyLotnicze"))
            $http.get("http://localhost:8080/lotniska/" + $routeParams.id + "/firmyLotnicze").then(onFirmyLotniczeComplete, onError);
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