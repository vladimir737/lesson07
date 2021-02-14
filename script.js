'use strict';
let meaning = function checkNumMeaning(variable, info) {
    do {
      variable = +prompt('Введите ' + info);
    } while (!variable || variable <=0);
    return variable;
  };
  
  let moneyInfo = 'Ваш месячный доход?'; 
  let money;
  let start = function(){    
    money = meaning(money, moneyInfo);
  }
  let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 400000,
    period: 8,
    asking: function(){
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'квартплата, проездной, кредит');
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      let expense;
      let info = 'Во сколько это обойдется?';
      for (let i = 0; i < 2; i++) {
        let key = prompt('Введите обязательную статью расходов?');
        appData.expenses[key] = meaning(expense, info);
      }
    },
    budget: start(),
    getExpensesMonth: function(){
      let sum = 0;
      for (let key in appData.expenses) {
        sum += appData.expenses[key];
      }
      return sum;
    },  
    expensesMonth: function(){
      return appData.getExpensesMonth();
    },
    getBudget: function(){
      return money - appData.expensesMonth();
    },
    budgetMonth: function(){
      return appData.getBudget();
    },
    getTargetMonth: function() {
      return Math.ceil(appData.mission / appData.budgetMonth());
    },
    budgetDay: function(){
      return Math.floor(appData.getBudget() / 30);
    },
    getStatusIncome: function(){
      if(appData.getBudget() >= 1200) {
        return 'У вас высокий уровень дохода';
      } else if (appData.getBudget() < 1200 && appData.getBudget() >= 600) {
        return 'У вас средний уровень дохода';
      } else if (appData.getBudget() < 600 && appData.getBudget() >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
      } else {
        return 'Что то пошло не так';
      }
    },
    checkTarget: function() {
      let budget = appData.getBudget();
      if(budget <= 0){ 
        budget = 'Цель не будет достигнута';
      } else { 
        budget = `Цель будет достигнута за ${appData.getTargetMonth()} месяца(-ев)`;
      }
      return budget;
    }
  };
  appData.asking();
  
  console.log(`Цель заработать ${appData.mission} рублей`); 
  console.log(`Расходы за месяц: ${appData.getExpensesMonth()}`);
  console.log(appData.checkTarget());  
  console.log(appData.getStatusIncome());
  console.log('Наша программа включает в себя: ');
  for (let key in appData) {
    console.log(key + ' :' + appData[key]);
  }

 