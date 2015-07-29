app.controllers.PromotionsCtrl = function ($scope, promotions, ModalsService, NotificationsService) {

  $scope.filterData = {
    page: 1
  };
  $scope.promotions = promotions;

  var fetchPromotions = function () {
    $scope.promotions.fetchPromotions($scope.filterData);
  };

  $scope.applyFilter = function (page) {
    if (page) {
      $scope.filterData.page = page;
    }
    fetchPromotions();
  };


  $scope.cancelPromotion = function (promotion) {
    ModalsService.confirm('Do you really want to cancel promotion? ')
      .then(
      function () {
        promotion.cancel().then(function () {
          NotificationsService.addSuccessMsg('Promotion was canceled successfully.');
          promotion.status = 'canceled';
        });
      }
    );
  };


  $scope.deletePromotion = function (promotion) {
    ModalsService.confirm('Do you really want to delete promotion? ')
      .then(
      function () {
        promotion.remove().then(function () {
          NotificationsService.addSuccessMsg('Promotion was deleted successfully.');
          fetchPromotions();
        });
      }
    );
  };

};

app.controller('PromotionsCtrl', app.controllers.PromotionsCtrl);
