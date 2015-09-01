app.controller("HomeController",
['$scope',
'ItemService',
'$location',
function ($scope, ItemService, $location) {
$scope.items = ItemService.items();
$scope.cats= ItemService.types();
$scope.cart= ItemService.cart();
$scope.addtoCart= function () {
  ItemService.addtoCart(this.item, this.quantity);
  console.log($scope.cart);
};

$scope.newPage = function (path){
    $location.path(path);
};

}]);

app.controller("CartController",
['$scope',
'ItemService',
function ($scope, ItemService, $location) {
$scope.save = false;
$scope.cart = ItemService.cart();
console.log($scope.cart);

$scope.removefromCart = function () {
  ItemService.removefromCart(this.item);
  console.log($scope.cart);
};

$scope.toggleButton = function (item) {
  this.save = !this.save;
};

$scope.editQuantity = function () {
  ItemService.editQuantity(this.item, this.quantity);
};

}]);
