//data module
var budgetController = (function() {
  //private methods/variables

  //public function
  
})();

//ui module
var UIController = (function(){
  //private

  //public
  
})();

//app controller module
var controller = (function(budgetCtrl, UICtrl) {
  //private
  var ctrlAddItem = function(){
    //get input field data
    
    //add item to the budget controller

    //add new item to user interface

    //calculate the budget

    //display the budget on the user interface
    console.log('function works');
  }

  //click event
  document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

  //keypress event
  document.addEventListener('keypress',function(event){
    if(event.keyCode === 13 || event.which === 13){
      ctrlAddItem();
    }
  });

  //public
  
})(budgetController, UIController);















