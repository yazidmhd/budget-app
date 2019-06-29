//data module
var budgetController = (function() {
  //Expense constructor
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  //Income constructor
  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }
  
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
  //function where all event listeners will be placed 
  var setupEventListeners = function(){
    var DOM = UICtrl.getDOMstrings();

    //click event
    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

    //keypress event
    document.addEventListener('keypress',function(event){
      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }
    });
  }

  //function where add new items
  var ctrlAddItem = function(){
    //get input field data
    var input = UICtrl.getInput();
    
    //add item to the budget controller

    //add new item to user interface

    //calculate the budget

    //display the budget on the user interface

  };

  return {
    init: function(){
      console.log('Application started..')
      setupEventListeners();
    }
  }

})(budgetController, UIController);

//start the application
controller.init();















