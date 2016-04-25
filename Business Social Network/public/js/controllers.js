facebookSocialApi = {

};

var search = angular.module("searchApp", []);

search.controller('SearchBoxController', function($scope, $http){

  var userSearch;

  //dummy data for testing:

  var test1 = {
    name: "test1 bob",
    price: 200,
    seller: "H&M",
    review: "5 stars",
    tags: ["blue", "male", "jeans"]
  };

  var test2 = {
    name: "miho car",
    price: 1200,
    seller: "Zara",
    review: "2 stars",
    tags: ["red", "female", "sweater"]
  };

  var test3 = {
    name: "sami awy",
    price: 11900,
    seller: "Saturn",
    review: "5 stars",
    tags: ["black", "purple", "sweater"]
  };



  var allProducts = [test1, test2, test3];


  $scope.update = function(){   //this will run whenever the input changes

    userSearch = $scope.search_term;  //user search is the term the user entered in the search
    $scope.searchTerm = userSearch
    var userSearchArray = userSearch.split(" ")   //array of search terms entered by user


    var bestMatches = []    //the products to show (in this order)

    for(var i = 0; i<allProducts.length; i++){

      var productTags = allProducts[i].tags
      var productNameArray = allProducts[i].name.toLowerCase().split(" ")

      var tagCount = count(userSearchArray, productTags)
      var nameCount = count(userSearchArray, productNameArray)
      var matchPoints = tagCount + nameCount
      //match points indicate how much a product matches the search

      bestMatches.push([allProducts[i], matchPoints])

    };

    //sorts the array based on match points
    //and then flattens it to return only the product

    bestMatches = flatten(bestMatches.sort(function(a,b){
      return a[1] < b[1]
    }));

    //return the best matches in the correct order
    $scope.searchResults = bestMatches


  }

  //on button click
  $scope.search = function(){

    $scope.update()

  };

  //counts how many times the search terms occur in another array (name/tags)
  count = function(search, comp){

    var len = (search.length >= comp.length) ? search.length : comp.length
    var count = 0

    for(var i = 0; i<len; i++){

      if(comp.indexOf(search[i]) !== -1){
        count++
      }

    }
    return count
  };


  //flattens 2D array of strings and int [["cat", 34], ["dog", 5]..] etc
  //and only takes the first element

  flatten = function(array){

    var res = []
    for(var i = 0; i<array.length; i++){

      //this if condition prevents a product
      //that doesnt match at from being returned

      if((array[i])[1] !== 0){

        res.push((array[i])[0])

      }
    }
    return res
  };

});
