//DATA MODULE
var budgetController = (function() {
  //Expense constructor
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expense.prototype.calcPercentage = function(totalIncome){
    if(totalIncome > 0){
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  }

  Expense.prototype.getPercentage = function(){
    return this.percentage;
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
    },
    budget: 0,
    percentage: -1
  }

  var calculateTotal = function(type){
    var sum = 0;

    data.allItems[type].forEach(function(current, index, array){
      sum += current.value;
    });

    data.totals[type] = sum;
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

    deleteItem: function(type, id){
      var ids, index;

      ids = data.allItems[type].map(function(current,index,array){
        return current.id;
      });

      index = ids.indexOf(id);

      if(index !== -1){
        data.allItems[type].splice(index, 1);
      }

    },

    calculateBudget: function(){
      //calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      //calculate budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //calculate percentage of income that have been spend
      if(data.totals.inc > 0){
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
      
    },

    calculatePercentages: function(){
      data.allItems.exp.forEach(function(current,index,array){
        current.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function(){
      var allPercentages = data.allItems.exp.map(function(current){
        return current.getPercentage();
      });

      return allPercentages;
    },

    getBudget: function(){
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function() {
      console.log(data);
    }

  };
  
})();

//UI MODULE
var UIController = (function(){
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage'
  }

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc (+) or exp (-)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function(obj, type){
      var html, newHtml, element;
      //create html string with placeholder text
      if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if(type === 'exp'){
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
      }

      //replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      //insert html into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function(selectorId){
      var el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
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

    displayBudget: function(obj){
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
      
      if(obj.percentage > 0){
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }

    },

    displayPercentages: function(percentages){
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      //forEach method for list
      var nodeListForEach = function(list, callback){
        for(var i = 0; i < list.length; i++){
          callback(list[i], i);
        }
      }
      
      nodeListForEach(fields, function(current, index){
        if(percentages[index] > 0){
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });

    },

    //exposes the private method to public so other controllers can use it
    getDOMstrings: function(){
      return DOMstrings;
    }
  };
  
})();

//APP CONTROLLER MODULE
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);


  }

  var updateBudget = function(){
    //calculate the budget
    budgetCtrl.calculateBudget();

    //return the budget
    var budget = budgetCtrl.getBudget();

    //display the budget on the user interface
    UICtrl.displayBudget(budget);

  }

  var updatePercentages = function(){
    //calculate percentages
    budgetCtrl.calculatePercentages();

    //read from budgetController
    var percentages = budgetCtrl.getPercentages();

    //update the UI with new percentages
    UICtrl.displayPercentages(percentages);
  }

  //function where add new items
  var ctrlAddItem = function(){
    var input, newItem;

    //get input field data
    input = UICtrl.getInput();

    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
      //add item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
          
      //add new item to user interface
      UICtrl.addListItem(newItem, input.type);

      //clear input fields
      UICtrl.clearFields();

      //calculate and update budget
      updateBudget();

      //calculate and update percentages
      updatePercentages();
    }
  }

  var ctrlDeleteItem = function(event){
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID){
      //inc-1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //delete item from data structure
      budgetCtrl.deleteItem(type,ID);

      //delete item on the UI
      UICtrl.deleteListItem(itemID);

      //update and display new budget
      updateBudget();

      //calculate and update percentages
      updatePercentages();

    }
  }


  return {
    init: function(){
      console.log('Application started..');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  }

})(budgetController, UIController);

//start the application
controller.init();















