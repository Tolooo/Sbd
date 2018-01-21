(function () {
    var mainController = function ($scope, Navbar) {

$scope.Navbar=Navbar; 
    }

    angular.module('myApp').controller("mainController", ['$scope', 'Navbar', mainController]);
}()) 