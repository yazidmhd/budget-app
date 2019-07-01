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

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      //create new id
      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      //create new item
      if(type === 'exp'){
        newItem = new Expense(ID,des,val);
      } else if(type === 'inc') {
        newItem = new Income(ID,des,val);
      }

      //push into data structure
      data.allItems[type].push(newItem);

      //return new item
      return newItem; 
    },

    testing: function() {
      console.log(data);
    }

  };
  
})();

//ui module
var UIController = (function(){
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc (+) or exp (-)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },

    addListItem: function(obj, type){
      var html, newHtml, element;
      //create html string with placeholder text
      if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if(type === 'exp'){
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
      }

      //replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //insert html into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function(){
      var fields,fieldsArr;

      //this will return a list, not an array
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      //use the Array object prototype slice method to convert list to array
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array){
        current.value = "";
      });

      fieldsArr[0].focus();

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
    var input, newItem;

    //get input field data
    input = UICtrl.getInput();
    
    //add item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    
    //add new item to user interface
    UICtrl.addListItem(newItem, input.type);

    //clear input fields
    UICtrl.clearFields();

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















