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
$scope.cart = ItemService.cart();
console.log($scope.cart);
}]);
