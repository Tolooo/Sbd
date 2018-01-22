(function () {
    var lotController = function ($scope, $rootScope, $routeParams, $http, $location, Session) {

        $scope.loty = null
        var onLotniskaComplete = function (response) {
            $scope.lotniska = response.data;
            $(".se-pre-con").hide("slow");
        };

        var onLotyComplete = function (response) {
            $scope.loty = response.data;
            $(".se-pre-con").hide("slow");
        };

        var onDatesComplete = function (response) {
            $scope.dates = response.data;

        };


        var onPilotsComplete = function (response) {
            $scope.pilots = response.data;

        };
        var onSamolotyComplete = function (response) {
            $scope.samoloty = response.data;

        };
        var onTrasyComplete = function (response) {
            $scope.trasy = response.data;

        };

        var prepareNew = function () {
            $scope.editMode = false;
            $scope.lot = {}
        };

        var prepare = function (lot) {
            $scope.editMode = true;
            $scope.lot = angular.copy(lot);
            if ($scope.dates !== undefined) {
                $scope.lot.dataLotu = $scope.dates.filter(function (dataLotu) {
                    return dataLotu.id_daty == $scope.lot.dataLotu.id_daty
                })[0]
                $scope.lot.dataLotu.wylot = new Date($scope.lot.dataLotu.wylot);
                $scope.lot.dataLotu.przylot = new Date($scope.lot.dataLotu.przylot);
            }
            if ($scope.pilots !== undefined)
                $scope.lot.pilot = $scope.pilots.filter(function (pilot) {
                    return pilot.id_pilota == $scope.lot.pilot.id_pilota
                })[0]
            if ($scope.samoloty !== undefined)
                $scope.lot.samolot = $scope.samoloty.filter(function (samolot) {
                    return samolot.id_samolotu == $scope.lot.samolot.id_samolotu
                })[0]
            if ($scope.trasy !== undefined)
                $scope.lot.trasa = $scope.trasy.filter(function (trasa) {
                    return trasa.id_trasy == $scope.lot.trasa.id_trasy
                })[0]
        }

        var contains = function (a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i].id_lotu === obj.id_lotu) {
                    return i;
                }
            }
            return -1;
        }
        var onUpdateComplete = function (response) {
            if ($scope.loty) {
                var i = contains($scope.loty, $scope.lot)
                if (i != -1) {
                    $scope.loty[i] = $scope.lot;
                }
            }
        };

        var onPilotaLotyComplete = function (response) {
            $scope.loty = response.data;
            $(".se-pre-con").hide("slow");
        };

        var onLotComplete = function (response) {
            $scope.lot = response.data;
            $scope.lot.dataLotu.wylot = new Date($scope.lot.dataLotu.wylot);
            $scope.lot.dataLotu.przylot = new Date($scope.lot.dataLotu.przylot);
        };

        var onSaveLotComplete = function (response) {
            let lot = response.data;
            lot.dataLotu.wylot = new Date(lot.dataLotu.wylot);
            lot.dataLotu.przylot = new Date(lot.dataLotu.przylot);
            $scope.loty.push(lot);
            $scope.dates.push(lot.dataLotu);
        };

        var onDeleteLotComplete = function (response) {
            $scope.loty = $scope.loty.filter(function (el) { return el.id_lotu != response.data.id_lotu });
        };


        var onError = function (response) {
            $scope.error = response.error;
        };
        var saveLot = function () {
            if (!$scope.formLot.$invalid) {
                $("#exampleModal").modal('hide')
                $http.post('http://localhost:8080/loty', $scope.lot).then(onSaveLotComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };
        var deleteLot = function (lot) {
            $http.delete('http://localhost:8080/loty/' + lot.id_lotu).then(onDeleteLotComplete, onError)
        };

        var updateLot = function () {
            if (!$scope.formLot.$invalid) {
                $("#exampleModal").modal('hide')
                $http.put('http://localhost:8080/loty/' + $scope.lot.id_lotu, $scope.lot).then(onUpdateComplete, onError);
            }
            else {
                $("#exampleModal").modal({ show: true });
            }
        };

        var detailLot = function (id) {
            $http.get("http://localhost:8080/loty/" + id).then(onLotComplete, onError);

        }
        var lotyPilota = function (id) {
            $http.get("http://localhost:8080/loty/pilot/" + id).then(onPilotaLotyComplete, onError);
        }

        var onBuyResult = function (response) {
            if (response.data !== null) {
                $rootScope.success = "Zakup przeprowadzono pomyślnie!"
                if (Session.userRole == "klient") {
                    $location.path("/klienci/" + Session.userId + "/bilety");
                } else {
                    $location.path("/firmy/" + Session.userId + "/bilety");
                }
            }
        }


        var filterResult = function (response) {
            $scope.loty = response.data.filter(function (lot) {
                return (lot.trasa.poczatek.id_lotniska == $scope.lotnisko1)
            })
                .filter(function (lot) {
                    return lot.trasa.koniec.id_lotniska == $scope.lotnisko2
                })
            // .filter(function(lot){return lot.klasa==$scope.klasa}) 
            if ($scope.loty.length === 0) {
                $scope.loty = null
                $scope.info = "Nie znaleziono takich połączeń!"
            }
            $(".se-pre-con").hide("slow");
        };
        var search = function () {
            // $("#alert").hide();
            $(".se-pre-con").show("slow");
            $scope.info = ""
            $http.get("http://localhost:8080/loty").then(filterResult, onError)
        };
        var kupBilet = function (lot) {
            if (Session.userRole == "klient") {
                $http.post("http://localhost:8080/klienci/" + Session.userId + "/kupBilet", lot).then(onBuyResult, onError)
            }
            else {
                $http.post("http://localhost:8080/firmy/" + Session.userId + "/kupBilet", lot).then(onBuyResult, onError)

            }
        };

        if ($location.url() === "/loty" || $location.url() === "/loty/" + $routeParams.id) {
            $http.get("http://localhost:8080/loty").then(onLotyComplete, onError);
            $http.get("http://localhost:8080/samoloty").then(onSamolotyComplete, onError);
            $http.get("http://localhost:8080/piloci").then(onPilotsComplete, onError);
            $http.get("http://localhost:8080/trasy").then(onTrasyComplete, onError);
            $http.get("http://localhost:8080/daty").then(onDatesComplete, onError);

        }
        else if ($location.url() === "/loty/pilot/" + $routeParams.id) {
            lotyPilota($routeParams.id);
        }
        else if ($location.url() === "/przegladLotow") {
            $http.get("http://localhost:8080/lotniska").then(onLotniskaComplete, onError);
        }
        else if ($location.url().indexOf("/firmyLotnicze") !== -1) {
            $http.get("http://localhost:8080/firmyLotnicze/" + $routeParams.id + "/loty").then(onLotyComplete, onError);
            $http.get("http://localhost:8080/firmyLotnicze/" + $routeParams.id + "/samoloty").then(onSamolotyComplete, onError);
            $http.get("http://localhost:8080/piloci").then(onPilotsComplete, onError);
            $http.get("http://localhost:8080/firmyLotnicze/" + $routeParams.id + "/trasy").then(onTrasyComplete, onError);
            $http.get("http://localhost:8080/daty").then(onDatesComplete, onError);
            // $http.get("http://localhost:8080/firmyLotnicze/" + $routeParams.id + "/lotniska").then(onLotniskaComplete, onError);
        }
        if ($location.url() === "/loty/" + $routeParams.id)
            detailLot($routeParams.id);
        $scope.prepare = prepare;
        $scope.prepareNew = prepareNew;
        $scope.search = search;
        $scope.kupBilet = kupBilet;
        $scope.saveLot = saveLot;
        $scope.deleteLot = deleteLot;
        $scope.updateLot = updateLot;
    };

    angular.module('myApp').controller("lotController", ['$scope', '$rootScope', '$routeParams', '$http', '$location', 'Session', lotController]);
}()) 