//----------Global Variable that filled with data from json---------------------
var itemContainer = {};

//-----------------------------------MODULE-------------------------------------
var myApp = angular.module('shopModule', ['ngRoute'])

        //------------------configuration of route------------------------------- 
        .config(function ($routeProvider) {
          $routeProvider.when('/home', {templateUrl: 'tpl/home.html', title: 'Home Page', controller: 'HomeController'})
                  .when('/about', {templateUrl: 'tpl/about.html', title: 'About our Company', controller: 'AboutController'})
                  .when('/contact', {templateUrl: 'tpl/contact.html', title: 'Contact us', controller: 'ContactController'})
                  .when('/selected/:itemID', {templateUrl: 'tpl/selected.html', title: '', controller: 'ItemController'})
                  .otherwise({redirectTo: '/home', controller: 'MainController'});
        })

        //--------------------Main Controller------------------------------------
        .controller('MainController', function ($scope, $rootScope, $http) {
          $scope.searchby = "+name";
          $http.get("js/comp.json").then(function (res) {
            $rootScope.items = res.data;
            $scope.pictureArray = getImages($rootScope.items);
            
          });
          
          $scope.quantity = 4;
          //----------------start image index with 0----------------------------
          $scope._index = 0;

          //----------------check if curent is the same as requested------------
          $scope.isActive = function (index) {
            return $scope._index === index;
          };

          //----------------next Image------------------------------------------
          $scope.showNext = function () {
            return $scope._index = (($scope._index >= $scope.pictureArray.length - 1) ? 0 : ++$scope._index);
          };

          //----------------prev Image------------------------------------------
          $scope.showPrev = function () {
            return $scope._index = (($scope._index < 1) ? $scope.pictureArray.length - 1 : --$scope._index);
          };

          //---------------curent Image Show------------------------------------
          $scope.showImage = function (index) {
            $scope._index = index;
          };
        })

        //-------------------Home Controller-------------------------------------  
        .controller('HomeController', function ($scope, $rootScope, $http, $route) {
          $http.get('js/comp.json').then(function (res) {
            $rootScope.items = itemContainer = res.data;
            $scope.categories = getCategories($rootScope.items);
            $rootScope.title = $route.current.$$route.title;
          });

          //---------------reset price sort links color-------------------------
          $scope.clearPrice = function () {
            $scope.links = document.querySelectorAll('#OrederBy ul li a');
            for (var i = 0; i < $scope.links.length; i++) {
              $scope.links[i].className = '';
            }
          };

          //--------------set price sort link color to white if active---------- 
          $scope.priceSort = function (op) {
            if (op === 'High to Low') {
              $scope.searchby = '-price';
              $scope.clearPrice();
              $scope.links[0].className = 'orange';
            } else if (op === 'Low to High') {
              $scope.searchby = '+price';
              $scope.clearPrice();
              $scope.links[1].className = 'orange';
            }
          };

          //-------------fill data  by selected categories----------------------  
          $scope.curentCategories = function () {
            this.clearPrice();
            var DB = [];
            for (var i = 0; i < $scope.categories.length; i++)
            {
              for (var j = 0; j < itemContainer.length; j++)
              {
                if (($scope.categories[i] === itemContainer[j].category) && ($scope[$scope.categories[i]] === true)) {
                  {
                    DB.push(itemContainer[j]);
                  }
                }
              }
            }
            $scope.items = (DB.length > 0) ? DB : itemContainer;
          };
          
          
        })
        
          

        //-------------------------About us Controller--------------------------
        .controller('AboutController', function ($scope, $rootScope, $route) {
          $rootScope.title = $route.current.$$route.title;
        })

        //-------------------------Contact Controller---------------------------
        .controller('ContactController', function ($scope, $rootScope, $route) {
          $rootScope.title = $route.current.$$route.title;
  
         //------------------------Check if user want to clear all fields-------
           $scope.alert=function(){
            var answ = confirm('Are you shure ?');
             if(answ){
               $scope.text1=$scope.text2=$scope.text3='';
             }
           };
        })
        
        

        //-------------------------Selected Item Controller---------------------
        .controller('ItemController', function ($scope, $rootScope, $http, $route, $routeParams) {
          $http.get("js/comp.json").then(function (res) {
            $rootScope.items = res.data;
            $scope.pictureArray = getImages($rootScope.items);

            $rootScope.curent_item = currentItem($rootScope.items, $routeParams);
            if($rootScope.curent_item){
            $route.current.$$route.title = $rootScope.curent_item.name
            ;}
            $rootScope.title = 'Arima | ' + $route.current.$$route.title;
            $rootScope.$apply;
          });


        });

//---------------------------------FUNCTIONS------------------------------------

//---------------------------------Get all Categories---------------------------
var getCategories = function (items)
{
  var catArr = new Array();
  for (var i = 0; i < items.length; i++)
  {
    if (catArr.indexOf(items[i].category) === -1)
    {
      catArr.push(items[i].category);
    }
  }
  return catArr;
};

//---------------------------------Get current Item-----------------------------
var currentItem = function (itemArr, id) {

  var DB = {};
  DB = itemArr;
  for (var i = 0; i < DB.length; i++)
  {
    if (DB[i].itemID == id.itemID) {
      return DB[i];
    }
  }

};

//-------------------------------Get all Images---------------------------------
var getImages = function (itemArr) {
  var temp = [];
  for (var i = 0; i < itemArr.length; i++)
  {
    temp[i] = {image: 'images/' + itemArr[i].image, desc: 'Image ' + [i], name: itemArr[i].name, price: itemArr[i].price, itemID: itemArr[i].itemID};
  }
  return temp;
};









