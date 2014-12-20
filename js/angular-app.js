var app = angular.module('app', []);

app.controller('MainController', ['$scope',
  function ($scope) {
    "use strict";
    $scope.items = [{
      title: 'Cost for first coat',
      a: {
        ppl: 13,
        dft: 600,
        vs: 98,
        factor: 10
      },
      b: {
        ppl: 12,
        dft: 50,
        vs: 72,
        factor: 10
      }
    }, {
      title: 'Cost for second coat',
      a: {
        ppl: 13,
        dft: 600,
        vs: 98,
        factor: 10
      },
      b: {
        ppl: 5.2,
        dft: 130,
        vs: 74,
        factor: 10
      }
    }, {
      title: 'Cost for third coat',
      a: {
        ppl: 0,
        dft: 0,
        vs: 1,
        factor: 10
      },
      b: {
        ppl: 7.3,
        dft: 60,
        vs: 63,
        factor: 10
      }
    }, {
      title: 'Cost for fourth coat',
      a: {
        ppl: 0,
        dft: 0,
        vs: 1,
        factor: 10
      },
      b: {
        ppl: 0,
        dft: 0,
        vs: 1,
        factor: 10
      }
    }];


    $scope.calculations = {
      a: {
        otherCost_1: 10000,
        numDays_1: 2,

        otherCost_2: 5000,
        numDays_2: 2,

        otherCost_3: 0,
        numDays_3: 0,

        otherCost_4: 0,
        numDays_4: 0,

        shutDownPerDay: 40000,
        shutDownNoOfDays: 0,
        maintenancePercent: [0, 0, 0, 0, 0, 0]
      },
      b: {
        otherCost_1: 10000,
        numDays_1: 4,

        otherCost_2: 5000,
        numDays_2: 2,

        otherCost_3: 0,
        numDays_3: 0,

        otherCost_4: 0,
        numDays_4: 0,

        shutDownPerDay: 40000,
        shutDownNoOfDays: 4,
        maintenancePercent: [5, 5, 5, 5, 0, 0]
      }
    };

    $scope.calculator = {
      a: {
        scopeInM2: 10000,
        washDownPrep: 4,
        blasting: 9.26,
        lc_1: 3.5,
        lc_2: 3,
        lc_3: 0,
        lc_4: 0,
        lifetime: 30,
        touchUps: 0

      },
      b: {
        scopeInM2: 10000,
        washDownPrep: 4,
        blasting: 9.26,
        lc_1: 2.5,
        lc_2: 2.3,
        lc_3: 2,
        lc_4: 0,
        lifetime: 20,
        touchUps: 4
      }
    };

    $scope.evaluate = function (item) {
      return (item.ppl * item.dft) / (item.vs * item.factor);
    };

    $scope.getTotalCostForOtherCost = function (system) {
      var item = $scope.calculations[system];
      if (item) {
        var cost = (item.otherCost_1 * item.numDays_1) +
          (item.otherCost_2 * item.numDays_2) +
          (item.otherCost_3 * item.numDays_3) +
          (item.otherCost_4 * item.numDays_4);

        cost = cost / $scope.calculator[system].scopeInM2;

        return cost;
      }
    }

    $scope.getInitialTotalCost = function (system) {
      var calculator = $scope.calculator[system];
      var cost = calculator.washDownPrep + calculator.blasting +
        calculator.lc_1 + calculator.lc_2 + calculator.lc_3 +
        calculator.lc_4;

      var costPerM2Total = 0;
      for (var i = 0; i < $scope.items.length; i++) {
        var item = $scope.items[i];
        costPerM2Total += $scope.evaluate(item[system]);
      }

      cost += costPerM2Total;
      cost += $scope.getTotalCostForOtherCost(system);

      return cost;
    };

    $scope.getTotalShutdownCost = function (system) {
      var calculation = $scope.calculations[system];
      var sizeOfProj = $scope.calculator[system].scopeInM2;

      return (calculation.shutDownPerDay * calculation.shutDownNoOfDays) / (sizeOfProj);
    };

    $scope.getMaintenanceCost = function (system) {
      return 0.55 * $scope.getInitialTotalCost(system);
    };

    $scope.getTotalMaintenanceTouchupCost = function (system) {
      var costs = $scope.calculations[system].maintenancePercent;
      var scope = $scope.calculator[system].scopeInM2;
      var maintenanceTouchupCost = $scope.getMaintenanceCost(system);

      var result = 0;
      for (var i = 0; i < costs.length; i++) {
        result += costs[i] / 100 * scope * maintenanceTouchupCost;
      }

      return result;
    };

    $scope.getLifetimeMaintenanceTouchupCost = function (system) {
      return $scope.getTotalMaintenanceTouchupCost(system) / $scope.calculator[system].scopeInM2;
    }


    $scope.getTotalCostPerSqM = function (system) {
      return $scope.getTotalShutdownCost(system) + $scope.getInitialTotalCost(system) +
        $scope.getLifetimeMaintenanceTouchupCost(system);
    };
    
    $scope.getProjectCost = function(system) {
      return $scope.getTotalCostPerSqM(system) * $scope.calculator[system].scopeInM2;
    };
    
    $scope.getLifecycleCost = function(system, numOfYears) {
      return numOfYears * ($scope.getProjectCost(system) / $scope.calculator[system].lifetime);
    };
  }
]);