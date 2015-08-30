app.controller("HomeController",
['$scope',
'ItemService',
function ($scope, ItemService) {
$scope.items = ItemService.items();
$scope.cats= ItemService.types();
$scope.cart= ItemService.cart();
$scope.addtoCart= function () {
  ItemService.addtoCart(this.item, this.quantity);
  console.log($scope.cart);
};

}]);
