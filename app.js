//data module
var budgetController = (function() {
  //private methods/variables
  var x = 23;
  var add = function(a){
    return x+a;
  }

  //public function
  return {
    publicTest: function(b){
      return add(b);
    }
  }
})();

//ui module
var UIController = (function(){
  //private


  //public
  return {

  }
})();

//app controller module
var controller = (function(budgetCtrl, UICtrl) {
  //private
  var z = budgetCtrl.publicTest(10);

  //public
  return {
    another: function(){
      console.log(z);
    }
  }
})(budgetController, UIController);