//data module
var budgetController = (function() {
  //private methods/variables

  //public function
  
})();

//ui module
var UIController = (function(){
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc (+) or exp (-)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },

    //exposes the private method to public so other controllers can use it
    getDOMstrings: function(){
      return DOMstrings;
    }
  };
  
})();

//app controller module
var controller = (function(budgetCtrl, UICtrl) {
  var DOM = UICtrl.getDOMstrings();

  var ctrlAddItem = function(){
    //get input field data
    var input = UICtrl.getInput();
    console.log(input);
    
    //add item to the budget controller

    //add new item to user interface

    //calculate the budget

    //display the budget on the user interface

  }

  //click event
  document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

  //keypress event
  document.addEventListener('keypress',function(event){
    if(event.keyCode === 13 || event.which === 13){
      ctrlAddItem();
    }
  });
  
})(budgetController, UIController);















