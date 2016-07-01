(function(){
  'use strict'

  var exchangeTableApp = angular.module('exchangeTableApp', []);

  exchangeTableApp.controller('AppCtrl', function($scope, $filter, $http){

    var _getExchangeInfoData = function(){
      // Ajax요청
      $http.get('/api/exchange').success(function(data){
        $scope.exchangeInfoData = data;

        $scope.selectedCurrencyBefore = $scope.exchangeInfoData[1];
        $scope.selectedCurrencyAfter =  $scope.exchangeInfoData[0];
        $scope.leftValue = 1;
        $scope.rightValue = $filter('number')($scope.leftValue *  $scope.exchangeInfoData[1].rate, 2);
      });
    }

    _getExchangeInfoData();

    var _caculate = function(){
      $scope.rightValue = $filter('number')($scope.leftValue * $scope.selectedCurrencyBefore.rate / $scope.selectedCurrencyAfter.rate, 2);
    }

    $scope.getCurrencyLabel = function(currencyInfo){
      return currencyInfo.country + ' ' + currencyInfo.unit + ' ' + currencyInfo.currency;
    }

    $scope.enterLeftValue = function(){
      _caculate();
    }

    $scope.enterRightValue = function(){
      $scope.leftValue = $filter('number')($scope.rightValue * $scope.selectedCurrencyAfter.rate / $scope.selectedCurrencyBefore.rate, 2);
    }

    $scope.changeLeftCurrency = function(){
      $scope.leftValue = 1;
      _caculate();

    }

    $scope.changeRightCurrency = function(){
      _caculate();
    }
  });
})();
