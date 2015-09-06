var app = angular.module("MichaelJackson", ['ngRoute']);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      }).when('/cart', {
        templateUrl:'partials/cart.html',
        controller: 'CartController'
      });

      $locationProvider.html5Mode(true);
  });

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

// app.directives("weirdScale", function () {
//   return{
//     restrict:"A",
//     scope:{
//       item:"=itemScale"
//     },
//     link: function(scope, element, attrs) {
//
//   var oldColor = element.css('background-color');
//
//   element.on('mouseenter', function(event) {
//     element.css('background-color', color);
//   });
//
//   element.on('mouseleave', function(event) {
//     element.css('background-color', oldColor);
//   });
// }
// };
// });

app.factory('ItemService', function () {
var save = false;
var cart= {quantity: 0, items: [], orderTotal:0};
var items = [
  {
      _id: "55c8ee82152165d244b98300",
      name: "The Glove",
      description: "The 'King of Pop,' Michael Jackson, is widely known for wearing a single white glove that was almost as iconic as his moonwalk. Buy this baby and you will be able to moonwalk too.",
      weirdScale: 35,
      price: 2005900,
      inStock: true,
      rating: 4,
      imageUrl: "http://images2.laweekly.com/imager/necessities/u/original/4240756/michael_jackson_bad_tour_glove.jpg",
      __v: 0,
      categories: [ "sparkly", "iconic", "apparel"]
  },

  {
      _id: "55c8ee82152165d244b98301",
      name: "Bubbles",
      description: "Bubbles slept in a crib in Jackson's bedroom, used the singer's toilet and ate candy in the Neverland movie theater.  You can own him today",
      weirdScale: 100,
      price: 1004800,
      inStock: true,
      rating: 3,
      imageUrl: "http://cdnstatic.visualizeus.com/thumbs/98/d9/bubblesthechimp,bubblesthemonkey,kingofpop,michaeljackson-98d916a2c8eedf750ecfa6e5bef38704_h.jpg",
      __v: 0,
      categories: ["animal", "alive"]
  },
  {
      _id: "55c8ee82152165d244b98302",
      name: "Neverland Ranch",
      description: "The 12,000 square-foot home where Michael Jackson and his numerous exotic animals once lived is now on the market. You'd be getting a steal on this 2,700 acre property",
      weirdScale: 90,
      price: 89910000,
      inStock: true,
      rating: 5,
      imageUrl: "http://imgsrv.legends1027.com/image/wlgz/UserFiles/Image/Wiki%20Corner/Neverland1.jpg",
      __v: 0,
      categories: ["house", "iconic", "party"]
  },
  {
      _id: "55c8ee82152165d244b98303",
      name: "The Jackson 4",
      description: "Michael Jackson may not be included but the other 4 Jackson's matter too.  This would be a perfect addition to your son's bar mitzvah",
      weirdScale: 86,
      price: 54960,
      inStock: true,
      rating: 1,
      imageUrl: "http://www.latimes.com/media/photo/2009-12/51009909.jpg",
      __v: 0,
      categories: ["old", "alive", "party", "celeb", "music"]
  },
  {
      _id: "55c8ee82152165d244b98304",
      name: "Thriller Jacket",
      description: "With this black and red jacket, you can become a creature of the night just like Michael Jackson himself!",
      weirdScale: 20,
      price: 244500,
      inStock: false,
      rating: 3,
      imageUrl: "http://www.leathertechint.com/image/cache/data/mj_thriller-900x900.jpg",
      __v: 0,
      categories: ["iconic", "apparel"]
  },
  {
      _id: "55c8ee82152165d244b98305",
      name: "A date with Lisa Maria Presley",
      description: "Now that Michael and Lisa are divorced she is single and ready to mingle.  Maybe she will even take you to her father's Jungle Room",
      weirdScale: 100,
      price: 44860000,
      inStock: true,
      rating: 3,
      imageUrl: "http://img0.ndsstatic.com/wallpapers/d925cab6c790c4ed30b17ccd03eb7eda_large.jpeg",
      __v: 0,
      categories: ["alive","elvis","celeb"]
  },
  {
      _id: "55c8ee82152165d244b98306",
      name: "Beatles Music Catalog",
      description: "Since 1985 Michael has owned rights to the Beatles Catalog.  This profitable investment could be yours today!",
      weirdScale: 15,
      price: 69730000000,
      inStock: false,
      rating: 5,
      imageUrl: "http://media2.s-nbcnews.com/i/MSNBC/Components/Video/__NEW/tdy_beatles_140127.jpg",
      __v: 0,
      categories: ["music"]
  },
  {
      _id: "55c8ee82152165d244b98307",
      name: "Michael Jackson Pepsi Can",
      description: "In 1984 Jackson was a spokesman for Pepsi, when a commercial shoot went awry his hair caught on fire but you will definitely want this can!!",
      weirdScale: 12,
      price: 60,
      inStock: true,
      rating: 2,
      imageUrl: "http://media.washtimes.com.s3.amazonaws.com/media/image/2012/05/03/pepsi-michael-jackson_live.jpg",
      __v: 0,
      categories: ["pepsi","hair"]
  },
  {
      _id: "55c8ee82152165d244b98308",
      name: "Edward Scissorhands' Scissorhands",
      description: "This is a once in a lifetime opportunity!  Purchase Michael Jackson's own memoriabila from the famous movie Edward Scissorhands...just dont get them close to your waterbed.",
      weirdScale: 96,
      price: 1374000,
      inStock: true,
      rating: 3,
      imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSz2_l80dpIBnONpLaHdq18x7Wiwjj1y8l_GSGoJumEoVo_O99sDQ",
      __v: 0,
      categories: ["sharp","hair"]
  },
  {
      _id: "55c8ee82152165d244b98309",
      name: "Jackson Medical Mask",
      description: "Purchase this one of a kind, exact replica of a medical mask Jackson use to frequently sport.  Plus who knows when SARS will make a comeback.",
      weirdScale: 80,
      price: 48,
      inStock: true,
      rating: 1,
      imageUrl: "http://i4.mirror.co.uk/incoming/article389163.ece/ALTERNATES/s615/michael-jackson-pic-xposure-294345795.jpg",
      __v: 0,
      categories: ["iconic", "sick"]
  }
];

var obj = {

  addtoCart: function (item, num) {
    cart.orderTotal = Number(cart.orderTotal) + (Number(item.price) * Number(num)) || (Number(item.price) * Number(num));
    cart.quantity=Number(cart.quantity) + Number(num) || Number(num);
    item.quantity=Number(item.quantity) + Number(num) || Number(num);
    if(cart.items.indexOf(item)===-1){
    cart.items.push(item);
  }
  },

  removefromCart: function (item) {
    cart.orderTotal = Number(cart.orderTotal) - (Number(item.price)*Number(item.quantity));
    cart.quantity = Number(cart.quantity) - (Number(item.quantity));
    item.quantity = 0;
    var index = cart.items.indexOf(item);
    cart.items.splice(index,1);
  },

  editQuantity: function (item, num) {
     cart.orderTotal =  Number(cart.orderTotal) - (Number(item.price)*Number(item.quantity)) + (Number(num)*Number(item.price));
     cart.quantity = Number(cart.quantity) - Number(item.quantity) + Number(num);
     item.quantity = Number(num);
     console.log(cart);
  },

  // cartCount:function(cart) {
  //   var sum=0;
  //   if(cart.length>0){
  //     for(var i=0; i<cart.length;i++){
  //       sum+=cart[i].quantity;
  //     }
  //   } else{
  //     sum="Empty";
  //   }
  //   return sum;
  // },

  items: function () {
    return items;
  },

  cart: function () {
    return cart;
  },

  types: function () {
    var catarray=[];
    for (var i = 0; i < items.length; i++) {
      for (var j = 0; j < items[i].categories.length; j++) {
      if(catarray.indexOf(items[i].categories[j])===-1){
        catarray.push(items[i].categories[j]);
      }
    }
  } return catarray;
},


}; return obj;
});

app.filter('trueorFalse', function () {
  return function(input){
    if(input===true){
      return "Yes";
    }else{
    return "No";
    }
  };
});

