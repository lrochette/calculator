 // NOTE: 
// This is the final source code file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

var calculate = function calculate(n1, operator, n2) {
  var result = '';
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};

var calculator = document.querySelector('.calculator');
var display = calculator.querySelector('.calculator__display');
var keys = calculator.querySelector('.calculator__keys');

keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    var key = e.target;
    var action = key.dataset.action;
    var keyContent = key.textContent;
    var displayedNum = display.textContent;
    var previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children).
    forEach(function (k) {return k.classList.remove('is-depressed');});

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (action === 'decimal') {
      display.textContent = displayedNum + '.';
    }

    if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide')
    {
      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === 'clear') {
      console.log('clear key!');
    }

    if (action === 'calculate') {
      var firstValue = calculator.dataset.firstValue;
      var operator = calculator.dataset.operator;
      var secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
});